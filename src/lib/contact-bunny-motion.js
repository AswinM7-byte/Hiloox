/** Container-scoped decorative motion. Returns a complete lifecycle cleanup. */
export function attachBunnyMotion(panel) {
  const stage = panel.querySelector(".contact-character-stage"), head = panel.querySelector(".contact-mascot-head");
  const preference = matchMedia("(prefers-reduced-motion: reduce)"), fine = matchMedia("(hover: hover) and (pointer: fine)");
  let frame = 0, blinkTimer = 0, blinkEnd = 0, visible = true, hovering = false;
  let targetX = 0, targetY = 0, x = 0, y = 0, last = 0;
  const eyes = [
    { key: "left", originX: 176 / 477, originY: 178 / 523, x: 0, y: 0, targetX: 0, targetY: 0 },
    { key: "right", originX: 247 / 477, originY: 210 / 523, x: 0, y: 0, targetX: 0, targetY: 0 },
  ];
  const mascot = panel.querySelector(".contact-mascot");
  let lastStar = 0, lastPointer = null;
  const particles = new Map();
  const enabled = () => visible && !document.hidden && !preference.matches && fine.matches;
  const paint = () => {
    // Restrained angles preserve the overlap of the original head/body cutouts.
    head.style.transform = `perspective(900px) rotateX(${-y*2.5}deg) rotateY(${x*3.5}deg) rotateZ(${x*1.5}deg)`;
    eyes.forEach(eye => {
      head.style.setProperty(`--gaze-${eye.key}-x`, `${eye.x * 3.2}px`);
      head.style.setProperty(`--gaze-${eye.key}-y`, `${eye.y * 2.4}px`);
    });
  };
  const tick = now => {
    const dt = Math.min(40, last ? now-last : 16); last = now;
    const headEase = 1-Math.exp(-dt/150), eyeEase = 1-Math.exp(-dt/65);
    x += (targetX-x)*headEase; y += (targetY-y)*headEase;
    eyes.forEach(eye => {
      eye.x += (eye.targetX - eye.x) * eyeEase;
      eye.y += (eye.targetY - eye.y) * eyeEase;
    });
    paint();
    const distance = Math.abs(x-targetX)+Math.abs(y-targetY)+eyes.reduce((sum, eye) => sum + Math.abs(eye.x-eye.targetX) + Math.abs(eye.y-eye.targetY), 0);
    if (enabled() && distance > .001) frame = requestAnimationFrame(tick);
    else { frame = 0; last = 0; }
  };
  const animate = () => { if (!frame && enabled()) frame = requestAnimationFrame(tick); };
  const clearBlink = () => { clearTimeout(blinkTimer); clearTimeout(blinkEnd); head.classList.remove("is-blinking"); };
  const scheduleBlink = () => {
    clearBlink();
    if (!enabled() || !hovering) return;
    blinkTimer = setTimeout(() => {
      if (!enabled() || !hovering) return;
      head.classList.add("is-blinking");
      blinkEnd = setTimeout(() => { head.classList.remove("is-blinking"); scheduleBlink(); }, 180);
    }, 3400+Math.random()*2200);
  };
  const removeParticle = star => { clearTimeout(particles.get(star)); particles.delete(star); star.remove(); };
  const sparkle = (event, rect) => {
    const now = performance.now();
    const moved = !lastPointer || Math.hypot(event.clientX-lastPointer.x, event.clientY-lastPointer.y) >= 9;
    if (!moved || now-lastStar < 95 || particles.size >= 9) return;
    lastStar = now; lastPointer = { x: event.clientX, y: event.clientY };
    const star = document.createElement("span");
    star.className = "contact-cursor-star"; star.setAttribute("aria-hidden", "true");
    star.style.left = `${Math.max(10,Math.min(rect.width-10,event.clientX-rect.left))}px`;
    star.style.top = `${Math.max(10,Math.min(rect.height-10,event.clientY-rect.top))}px`;
    star.style.setProperty("--star-size", `${4+Math.random()*5}px`);
    star.style.setProperty("--star-turn", `${Math.random()*60-30}deg`);
    star.style.setProperty("--star-drift", `${Math.random()*20-10}px`);
    star.style.setProperty("--star-color", ["#ffffff","#cdbbf8","#9f7bea"][Math.floor(Math.random()*3)]);
    star.addEventListener("animationend", () => removeParticle(star), { once: true });
    particles.set(star, setTimeout(() => removeParticle(star), 1200));
    stage.appendChild(star);
  };
  const move = event => {
    if (event.pointerType !== "mouse" || !enabled()) return;
    const rect = stage.getBoundingClientRect();
    targetX = Math.max(-1,Math.min(1,(event.clientX-rect.left)/rect.width*2-1));
    targetY = Math.max(-1,Math.min(1,(event.clientY-rect.top)/rect.height*2-1));
    const face = mascot.getBoundingClientRect();
    eyes.forEach(eye => {
      const dx = (event.clientX - face.left - face.width * eye.originX) / (face.width * .5);
      const dy = (event.clientY - face.top - face.height * eye.originY) / (face.height * .5);
      const radius = Math.max(1, Math.hypot(dx, dy));
      eye.targetX = dx / radius;
      eye.targetY = dy / radius;
    });
    if (!hovering) { hovering = true; scheduleBlink(); }
    animate(); sparkle(event,rect);
  };
  const enter = event => {
    if (event.pointerType !== "mouse" || !enabled()) return;
    hovering = true; lastPointer = null; move(event); scheduleBlink();
  };
  const leave = () => { hovering = false; lastPointer = null; targetX = targetY = 0; eyes.forEach(eye => { eye.targetX = eye.targetY = 0; }); clearBlink(); animate(); };
  const reset = () => {
    leave(); cancelAnimationFrame(frame); frame = 0; last = 0;
    x = y = 0; eyes.forEach(eye => { eye.x = eye.y = 0; }); paint(); [...particles.keys()].forEach(removeParticle);
  };
  stage.addEventListener("pointerenter",enter); stage.addEventListener("pointermove",move);
  stage.addEventListener("pointerleave",leave); stage.addEventListener("pointercancel",reset);
  preference.addEventListener("change",reset); fine.addEventListener("change",reset); document.addEventListener("visibilitychange",reset);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) reset(); });
  observer.observe(stage);
  return () => {
    reset(); observer.disconnect();
    stage.removeEventListener("pointerenter",enter); stage.removeEventListener("pointermove",move);
    stage.removeEventListener("pointerleave",leave); stage.removeEventListener("pointercancel",reset);
    preference.removeEventListener("change",reset); fine.removeEventListener("change",reset); document.removeEventListener("visibilitychange",reset);
  };
}
