const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('src/components/ContactBunny.jsx', 'utf8');
const body = source.slice(source.indexOf('    const panel ='), source.indexOf('\n  }, []);'));
function media(matches) {
  return { matches, listeners: new Map(), addEventListener(n,f) { this.listeners.set(n,f); }, removeEventListener(n) { this.listeners.delete(n); } };
}
const reduced = media(false), fine = media(true), doc = media(false);
doc.hidden = false;
const props = {};
const head = { style: { setProperty(k,v) { props[k] = v; } } };
const panel = { ...media(false), querySelector: () => head, querySelectorAll: () => [], getBoundingClientRect: () => ({left:0,top:0,width:500,height:600}) };
let frames = new Map(), next = 0, disconnected = false;
const cleanup = vm.runInNewContext(`(() => {${body}})()`, {
  root: {current:panel}, matchMedia: query => query.includes('reduced') ? reduced : fine,
  document:doc, Math, clearInterval() {}, setInterval() { return 1; },
  requestAnimationFrame: fn => { frames.set(++next,fn); return next; },
  cancelAnimationFrame: id => frames.delete(id),
  IntersectionObserver: class { observe() {} disconnect() { disconnected = true; } }
});
let time=0;
function settle() { let count=0; while(frames.size && count++<200) { const [id,fn]=frames.entries().next().value; frames.delete(id); fn(time+=16); } assert.equal(frames.size,0,'animation settles'); }
const move = panel.listeners.get('pointermove');
move({pointerType:'touch',clientX:500,clientY:600}); assert.equal(frames.size,0,'touch stays static');
move({pointerType:'mouse',clientX:5000,clientY:-2000}); settle();
assert.ok(Number.parseFloat(props['--gaze-x']) <=5); assert.ok(Number.parseFloat(props['--gaze-y']) >=-4);
assert.ok(Number.parseFloat(props['--gaze-x']) >4.9,'right gaze');
move({pointerType:'mouse',clientX:0,clientY:600}); settle();
assert.ok(Number.parseFloat(props['--gaze-x']) <-4.9,'left gaze');
panel.listeners.get('pointerleave')(); settle();
assert.ok(Math.abs(Number.parseFloat(props['--gaze-x']))<.01,'returns to rest');
move({pointerType:'mouse',clientX:500,clientY:600});
reduced.matches=true; reduced.listeners.get('change')();
assert.equal(frames.size,0,'reduced motion cancels frames'); assert.equal(props['--gaze-x'],'0px');
move({pointerType:'mouse',clientX:500,clientY:600}); assert.equal(frames.size,0);
cleanup(); assert.equal(panel.listeners.size,0); assert.equal(reduced.listeners.size,0); assert.equal(doc.listeners.size,0); assert.ok(disconnected);
console.log('PASS: clamped gaze, both pointer directions, return to rest, touch fallback, reduced motion, and unmount cleanup.');
