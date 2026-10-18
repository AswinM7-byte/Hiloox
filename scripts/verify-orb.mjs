import assert from 'node:assert/strict';
import { constrain, stepBodies } from '../src/lib/orb-physics.mjs';
const body = (x, y, vx = 0, vy = 0) => ({ x, y, vx, vy, radius: 22, held: false });
const bounds = body(-50, 900, -100, 100);
constrain(bounds, 400, 400);
assert.equal(bounds.x, 22); assert.equal(bounds.y, 378);
assert.ok(bounds.vx > 0 && bounds.vy < 0, 'wall bounce reverses outward velocity');
const inertia = body(100, 100, 120, 40);
stepBodies([inertia], 0.03, 400, 400);
assert.ok(inertia.x > 100 && inertia.vx > 0 && inertia.vx < 120, 'release continues with friction');
const held = { ...body(100, 100, 20, 20), held: true };
stepBodies([held], 0.04, 400, 400);
assert.equal(held.x, 100); assert.equal(held.y, 100);
const pair = [body(100, 100, 80, 0), body(130, 100, -80, 0)];
stepBodies(pair, 0.01, 400, 400);
assert.ok(pair[0].vx < 0 && pair[1].vx > 0, 'colliding lights bounce apart');
assert.ok(Math.hypot(pair[1].x - pair[0].x, pair[1].y - pair[0].y) >= 43.99);
const exactOverlap = [body(150, 150), body(150, 150)];
stepBodies(exactOverlap, 0.01, 400, 400);
assert.ok(exactOverlap.every(b => Number.isFinite(b.x) && Number.isFinite(b.y)));
const stress = [body(25, 25, -450, -450), body(370, 370, 450, 450), body(190, 190, 250, -250)];
for (let i = 0; i < 3000; i++) {
  stepBodies(stress, i % 7 ? 0.016 : 2, 400, 400);
  for (const b of stress) assert.ok(b.x >= 22 && b.x <= 378 && b.y >= 22 && b.y <= 378);
}
console.log('PASS: boundary bounce, inertia/friction, held drag, pair collisions, exact overlap, and 3,000 bounded simulation steps.');
