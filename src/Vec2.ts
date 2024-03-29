export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static add(a: Vec2, b: Vec2) {
    return new Vec2(a.x + b.x, a.y + b.y);
  }

  static sub(a: Vec2, b: Vec2) {
    return new Vec2(a.x - b.x, a.y - b.y);
  }

  static scalarMult(a: Vec2, s: number) {
    return new Vec2(a.x * s, a.y * s);
  }

  static normalize(a: Vec2) {
    const mag = Vec2.magnitude(a);
    return new Vec2(a.x / mag, a.y / mag);
  }

  static magnitude(a: Vec2) {
    return Math.sqrt(a.x * a.x + a.y * a.y);
  }

  static lerp(a: Vec2, b: Vec2, p: number) {
    const dir = Vec2.sub(b, a);
    const prog = Vec2.scalarMult(dir, p);
    return Vec2.add(a, prog);
  }
}
