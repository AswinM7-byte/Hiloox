const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// Exercise the actual runtime with deterministic browser scheduling.
function surface(rect) {
  const listeners = new Map(), values = new Map();
  return {
    listeners, values,
    style: { setProperty: (key, value) => values.set(key, value) },
    classList: { add() {}, remove() {} },
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: name => listeners.delete(name),
    getBoundingClientRect: () => rect,
    emit(name, event = {}) { listeners.get(name)?.(event); },
  };
}
for (const width of [276, 316, 435]) {
  const rect = { left: 40, top: 80, width, height: width * .84 + 20 };
  const stage = surface(rect), head = surface();
  const mascot = surface({ ...rect, left: rect.left + width * .12, width: width * .76, height: width * .76 * 523 / 477 });
  const panel = { querySelector: selector => ({ '.contact-character-stage': stage, '.contact-mascot-head': head, '.contact-mascot': mascot })[selector] };
  const preference = surface(), fine = surface(), document = surface();
  preference.matches = false; fine.matches = true; document.hidden = false;
  let id = 0, time = 0, disconnected = false;
  const frames = new Map(), timers = new Map();
  const context = {
    document, matchMedia: query => query.includes('reduced') ? preference : fine,
    requestAnimationFrame: fn => { frames.set(++id, fn); return id; },
    cancelAnimationFrame: key => frames.delete(key),
    setTimeout: fn => { timers.set(++id, fn); return id; },
    clearTimeout: key => timers.delete(key),
    performance: { now: () => 0 }, // Glitter rate limit isolates tracking tests.
    IntersectionObserver: class { observe() {} disconnect() { disconnected = true; } },
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('src/lib/contact-bunny-motion.js', 'utf8').replace('export function', 'function') + '\nthis.attach = attachBunnyMotion;', context);
  const cleanup = context.attach(panel);
  const settle = () => {
    let count = 0;
    while (frames.size && count++ < 200) {
      const pending = [...frames.values()]; frames.clear(); time += 16;
      pending.forEach(fn => fn(time));
    }
    assert.equal(frames.size, 0, 'RAF must stop when settled');
  };
  const move = (x, y, pointerType = 'mouse') => stage.emit('pointermove', { pointerType, clientX: rect.left + x * rect.width, clientY: rect.top + y * rect.height });
  for (const [x, y] of [[.5,0],[0,.5],[1,.5],[.5,.35],[.5,1],[0,0],[1,0],[0,1],[1,1]]) {
    move(x,y); settle();
    for (const eye of ['left','right']) {
      const dx = parseFloat(head.values.get(`--gaze-${eye}-x`));
      const dy = parseFloat(head.values.get(`--gaze-${eye}-y`));
      assert.ok(Number.isFinite(dx) && Number.isFinite(dy));
      assert.ok(Math.hypot(dx/3.2,dy/2.4) <= 1.001, 'pupils stay inside elliptical bounds');
    }
    assert.notEqual(head.style.transform, undefined);
  }
  move(.45,.4); settle();
  assert.notEqual(head.values.get('--gaze-left-x'), head.values.get('--gaze-right-x'), 'eyes have independent origins');
  stage.emit('pointerleave'); settle();
  assert.ok(Math.abs(parseFloat(head.values.get('--gaze-left-x'))) < .01);
  assert.equal(timers.size, 0, 'leave cancels blink');
  move(1,1,'touch'); assert.equal(frames.size, 0);
  move(1,1); preference.matches = true; preference.emit('change');
  assert.equal(frames.size, 0); assert.equal(timers.size, 0);
  assert.equal(head.values.get('--gaze-right-x'), '0px');
  cleanup();
  assert.equal(stage.listeners.size, 0); assert.equal(document.listeners.size, 0);
  assert.equal(preference.listeners.size, 0); assert.equal(fine.listeners.size, 0);
  assert.ok(disconnected);
}
console.log('PASS: bunny ears, edges, face, body and corners at three sizes; independent clamped eyes; settling, leave, touch, reduced motion and cleanup.');
