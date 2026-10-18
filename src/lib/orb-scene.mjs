import { clamp, constrain, stepBodies } from "./orb-physics.mjs";

const TAU = Math.PI * 2;
const origins = [[0.19, 0.3], [0.81, 0.38], [0.61, 0.8]];

/** Canvas and DOM animation runtime. No React updates occur inside the loop. */
export function createOrbScene(canvas, stage, lights) {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return null;
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const lowPower = coarse || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  const sphereCount = lowPower ? 900 : 1400;
  const rows = lowPower ? 14 : 18;
  const columns = lowPower ? 96 : 112;
  const sphere = Array.from({ length: sphereCount }, (_, i) => {
    const y = 1 - (i / (sphereCount - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const angle = i * 2.399963;
    return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
  });
  const bodies = origins.map(([x, y], i) => ({ x, y, vx: 8 - i * 5, vy: 4 + i * 2, radius: 22, held: false }));
  let width = 1, height = 1, time = 0, frame = 0, last = 0;
  let visible = false, disposed = false, paused = false, reduced = media.matches;
  let pointer = null, drag = null, burst = 0, entrance = true;
  let tilt = 0;

  function paintLights() {
    lights.forEach((node, i) => {
      if (!node) return;
      node.style.left = `${bodies[i].x - 22}px`;
      node.style.top = `${bodies[i].y - 22}px`;
    });
  }

  function dot(x, y, radius, alpha, color = "255,248,255") {
    ctx.fillStyle = `rgba(${color},${alpha})`;
    ctx.beginPath(); ctx.arc(x, y, radius, 0, TAU); ctx.fill();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const size = Math.min(width, height);
    const cx = width / 2, cy = height * 0.49;
    const r = size * 0.253;
    const phase = reduced ? 0.4 : time * 0.19;
    const enter = reduced ? 1 : Math.min(1, time / 0.9);
    const spread = 1 + (1 - enter) * 0.07;
    const glow = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, size * 0.51);
    glow.addColorStop(0, "rgba(158,112,255,.31)");
    glow.addColorStop(0.65, "rgba(140,98,234,.12)");
    glow.addColorStop(1, "rgba(140,98,234,0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);

    function wave(front) {
      for (let row = 0; row < rows; row++) {
        const lane = row / (rows - 1);
        for (let col = 0; col < columns; col += width < 380 ? 2 : 1) {
          const a = col / columns * TAU;
          const z = Math.sin(a + 0.3);
          if ((z > 0) !== front) continue;
          const fold = Math.sin(a * 5 + phase * 2 + lane * 2.5) * 0.035;
          const radius = size * (0.31 + lane * 0.12 + fold) * spread;
          const x = cx + Math.cos(a + tilt) * radius;
          const y = cy + Math.sin(a + tilt) * radius * 0.78 + Math.sin(lane * Math.PI + a * 3 + phase) * size * 0.065;
          const alpha = (front ? 0.68 : 0.48) + (Math.sin(a + phase) + 1) * 0.14;
          dot(x, y, lowPower ? 1.05 : 1.1 + lane * 0.3, alpha * enter);
        }
      }
    }
    wave(false);
    const ball = ctx.createRadialGradient(cx + r * 0.38, cy - r * 0.55, r * 0.04, cx, cy, r * 1.12);
    ball.addColorStop(0, "#fff6ff"); ball.addColorStop(0.17, "#e7c8ff");
    ball.addColorStop(0.43, "#aa72ef"); ball.addColorStop(0.69, "#5836c8");
    ball.addColorStop(1, "#231049");
    ctx.fillStyle = ball; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fill();
    ctx.strokeStyle = "rgba(239,215,255,.58)"; ctx.lineWidth = 1; ctx.stroke();
    const sin = Math.sin(phase + tilt), cos = Math.cos(phase + tilt);
    for (let index = 0; index < sphere.length; index += width < 380 ? 2 : 1) {
      const [x, y, z] = sphere[index];
      const px = x * cos + z * sin, pz = z * cos - x * sin;
      if (pz < -0.1) continue;
      dot(cx + px * r, cy + y * r, 0.75 + (pz + 1) * 0.35, 0.32 + (pz + 1) * 0.28);
    }
    wave(true);
    // Translucent orbital ribbons, drawn as narrow, overlapping ellipses.
    for (let ring = 0; ring < 3; ring++) {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.5 + ring * 0.6 + Math.sin(phase) * 0.05);
      for (let line = 0; line < 3; line++) {
        ctx.strokeStyle = `rgba(244,221,255,${line === 0 ? 0.35 : 0.1})`;
        ctx.lineWidth = line === 0 ? 0.8 : 3;
        ctx.beginPath(); ctx.ellipse(0, 0, r * (1.52 + line * 0.012), r * (0.55 + ring * 0.07), 0, 0, TAU); ctx.stroke();
      }
      ctx.restore();
    }
    for (let i = 0; i < 24; i++) {
      const a = i * 2.39996 + phase * 0.25;
      const orbit = size * (0.37 + (i % 5) * 0.021);
      const x = cx + Math.cos(a) * orbit, y = cy + Math.sin(a) * orbit * 0.86;
      dot(x, y, i % 5 === 0 ? 2 : 0.9, 0.35 + (1 + Math.sin(time * 0.7 + i)) * 0.17);
    }
    if (burst > 0 && !reduced) {
      const progress = 1 - burst;
      for (let i = 0; i < 34; i++) {
        const angle = i / 34 * TAU + i * 0.03;
        const distance = r * (1 + progress * (0.6 + (i % 5) * 0.13));
        const x = cx + Math.cos(angle) * distance, y = cy + Math.sin(angle) * distance;
        ctx.save(); ctx.translate(x, y); ctx.rotate(angle + progress);
        ctx.fillStyle = `rgba(${i % 3 ? "234,213,255" : "255,255,255"},${burst * 0.65})`;
        ctx.fillRect(-1, -1, i % 3 ? 2 : 6, 2); ctx.restore();
      }
    }
    paintLights();
  }

  function active() { return !disposed && visible && !document.hidden && !paused && !reduced; }
  function animate(now) {
    frame = 0;
    if (!active()) return;
    if (!last) last = now;
    if (now - last >= (lowPower || width < 380 ? 48 : 32)) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now; time += dt;
      if (entrance) { burst = 1; entrance = false; }
      burst = Math.max(0, burst - dt * 0.55);
      bodies.forEach((body, i) => {
        if (!body.held) {
          body.vx += Math.sin(time * 0.8 + i * 2) * dt * 8;
          body.vy += Math.cos(time * 0.6 + i * 2) * dt * 7;
        }
      });
      tilt += ((pointer ? pointer.x * 0.16 : 0) - tilt) * 0.05;
      stepBodies(bodies, dt, width, height); draw();
    }
    frame = requestAnimationFrame(animate);
  }
  function sync() {
    cancelAnimationFrame(frame); frame = 0; last = 0;
    if (active()) frame = requestAnimationFrame(animate);
    else { burst = 0; draw(); }
  }
  function resize() {
    const rect = stage.getBoundingClientRect();
    const oldWidth = width, oldHeight = height;
    width = Math.max(1, rect.width); height = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bodies.forEach((body, i) => {
      body.x = oldWidth === 1 ? origins[i][0] * width : body.x / oldWidth * width;
      body.y = oldHeight === 1 ? origins[i][1] * height : body.y / oldHeight * height;
      constrain(body, width, height);
    });
    draw();
  }
  function preference() { reduced = media.matches; bodies.forEach(b => { b.vx = 0; b.vy = 0; }); sync(); }
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.05 });
  const resizer = new ResizeObserver(resize);
  observer.observe(stage); resizer.observe(stage);
  media.addEventListener("change", preference);
  document.addEventListener("visibilitychange", sync);
  resize();

  return {
    setPaused(value) { paused = value; sync(); },
    point(event) {
      const rect = stage.getBoundingClientRect();
      pointer = event ? { x: (event.clientX - rect.left) / width - 0.5 } : null;
    },
    grab(index, event) {
      if (drag) return;
      const body = bodies[index];
      body.held = true; body.vx = 0; body.vy = 0;
      drag = { index, id: event.pointerId, x: event.clientX, y: event.clientY, at: performance.now() };
    },
    move(index, event) {
      if (!drag || drag.index !== index || drag.id !== event.pointerId) return;
      const body = bodies[index], now = performance.now();
      const dt = Math.max(0.008, (now - drag.at) / 1000);
      const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
      body.x += dx; body.y += dy;
      body.vx = reduced || paused ? 0 : clamp(dx / dt, -450, 450);
      body.vy = reduced || paused ? 0 : clamp(dy / dt, -450, 450);
      constrain(body, width, height);
      drag = { ...drag, x: event.clientX, y: event.clientY, at: now };
      draw();
    },
    release(index, cancelled = false) {
      if (!drag || drag.index !== index) return;
      bodies[index].held = false;
      if (cancelled || performance.now() - drag.at > 120) { bodies[index].vx = 0; bodies[index].vy = 0; }
      drag = null;
      if (!cancelled && !paused && !reduced) burst = 1;
      draw();
    },
    nudge(index, key) {
      const body = bodies[index];
      const offsets = { ArrowLeft: [-16, 0], ArrowRight: [16, 0], ArrowUp: [0, -16], ArrowDown: [0, 16] };
      if (key === "Home") { body.x = width * origins[index][0]; body.y = height * origins[index][1]; }
      else if (offsets[key]) { body.x += offsets[key][0]; body.y += offsets[key][1]; }
      else return false;
      body.vx = 0; body.vy = 0;
      constrain(body, width, height); draw(); return true;
    },
    pulse() { if (!paused && !reduced) burst = 1; },
    destroy() {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); resizer.disconnect();
      media.removeEventListener("change", preference); document.removeEventListener("visibilitychange", sync);
    },
  };
}



