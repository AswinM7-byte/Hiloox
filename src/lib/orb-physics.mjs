// Pure, bounded physics shared by the visual runtime and its verification script.
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function constrain(body, width, height) {
  const margin = body.radius;
  const nextX = clamp(body.x, margin, Math.max(margin, width - margin));
  const nextY = clamp(body.y, margin, Math.max(margin, height - margin));
  if (nextX !== body.x) body.vx *= -0.65;
  if (nextY !== body.y) body.vy *= -0.65;
  body.x = nextX;
  body.y = nextY;
}

export function stepBodies(bodies, delta, width, height) {
  const dt = Math.min(Math.max(delta, 0), 0.04);
  for (const body of bodies) {
    if (body.held) continue;
    body.x += body.vx * dt;
    body.y += body.vy * dt;
    const friction = Math.exp(-1.15 * dt);
    body.vx *= friction;
    body.vy *= friction;
    constrain(body, width, height);
  }
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i], b = bodies[j];
      if (a.held || b.held) continue;
      const dx = b.x - a.x, dy = b.y - a.y;
      const distance = Math.hypot(dx, dy);
      const minimum = a.radius + b.radius;
      if (distance >= minimum) continue;
      const nx = distance ? dx / distance : 1;
      const ny = distance ? dy / distance : 0;
      const overlap = (minimum - distance) / 2;
      a.x -= nx * overlap; a.y -= ny * overlap;
      b.x += nx * overlap; b.y += ny * overlap;
      const approach = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (approach < 0) {
        const impulse = -approach * 0.8;
        a.vx -= impulse * nx; a.vy -= impulse * ny;
        b.vx += impulse * nx; b.vy += impulse * ny;
      }
      constrain(a, width, height);
      constrain(b, width, height);
    }
  }
}
