/** Deterministic generator for the abstract branching-network artwork (no randomness at render time → no hydration drift). */
export type TreeNode = { x: number; y: number; depth: number };
export type Tree = { paths: { d: string; depth: number }[]; nodes: TreeNode[] };

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Opts = { x: number; y: number; angle?: number; length: number; depth?: number; spread?: number; seed?: number; decay?: number };

export function generateTree({ x, y, angle = -90, length, depth = 6, spread = 28, seed = 7, decay = 0.74 }: Opts): Tree {
  const rand = rng(seed);
  const paths: Tree["paths"] = [];
  const nodes: TreeNode[] = [];
  const f = (n: number) => Math.round(n * 10) / 10;

  function grow(px: number, py: number, a: number, len: number, d: number) {
    if (d === 0 || len < 4) return;
    const rad = (a * Math.PI) / 180;
    const ex = px + Math.cos(rad) * len;
    const ey = py + Math.sin(rad) * len;
    const bend = (rand() - 0.5) * len * 0.35;
    const cx = (px + ex) / 2 + Math.cos(rad + Math.PI / 2) * bend;
    const cy = (py + ey) / 2 + Math.sin(rad + Math.PI / 2) * bend;
    paths.push({ d: `M${f(px)} ${f(py)} Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`, depth: depth - d });
    nodes.push({ x: f(ex), y: f(ey), depth: depth - d });
    const kids = d > 2 && rand() > 0.82 ? 3 : 2;
    for (let i = 0; i < kids; i++) {
      const off = kids === 2 ? (i === 0 ? -1 : 1) : i - 1;
      const na = a + off * spread * (0.7 + rand() * 0.7) + (rand() - 0.5) * 8;
      grow(ex, ey, na, len * (decay + (rand() - 0.5) * 0.12), d - 1);
    }
  }
  grow(x, y, angle, length, depth);
  return { paths, nodes };
}
