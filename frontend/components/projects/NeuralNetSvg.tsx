// Hand-authored node-link overlay (not part of the ascii-svg build pipeline) revealed
// behind NeuraldbgNeuronSvg on hover-dezoom. Shares that component's exact viewBox so
// nodes land on specific anatomy of the bug. Coordinates were computed by marking the
// desired spots directly in scripts/ascii-svg/source/neuraldbg-neuron.txt (antennae,
// head, body, leg tips — deliberately skipping the wing span) and running each mark's
// line/column through the same opentype.js metrics (DejaVu Sans Mono, size 100, line
// height 110, pad 10) that generate.mjs uses to build the fly's path, so every node
// lines up pixel-exact with the glyph it was placed on.
const NODES: Record<string, [number, number]> = {
  p1: [903.08, 92.71],
  p2: [3672.51, 312.71],
  p3: [1806.15, 422.71],
  p4: [2408.2, 422.71],
  p5: [2167.38, 862.71],
  p6: [4093.95, 1302.71],
  p7: [0, 1522.71],
  p8: [722.46, 1522.71],
  p9: [2107.18, 1522.71],
  p10: [1444.92, 2402.71],
  p11: [2167.38, 2402.71],
  p12: [2829.64, 2402.71],
  p13: [1143.9, 3062.71],
  p14: [3070.46, 3172.71],
  p15: [2107.18, 3502.71],
  p16: [782.67, 3722.71],
  p17: [3431.69, 3832.71],
};

// Classic feed-forward MLP topology: nodes are grouped into layers top (antennae) to
// bottom (leg tips), and every node connects to every node in the *adjacent* layer
// only — no intra-layer links, no skipping a layer. This is what actually reads as
// "an AI neural network" rather than an anatomical skeleton or a minimal tree.
const LAYERS: string[][] = [
  ["p1", "p2", "p3", "p4"], // input — antennae + upper head
  ["p5", "p6", "p7", "p8", "p9"], // hidden 1 — head + thorax
  ["p10", "p11", "p12"], // hidden 2 — upper legs
  ["p13", "p14", "p15", "p16", "p17"], // output — leg tips
];

function denseBridge(a: string[], b: string[]): [string, string][] {
  const out: [string, string][] = [];
  a.forEach((x) => b.forEach((y) => out.push([x, y])));
  return out;
}

const EDGES: [string, string][] = [
  ...denseBridge(LAYERS[0], LAYERS[1]),
  ...denseBridge(LAYERS[1], LAYERS[2]),
  ...denseBridge(LAYERS[2], LAYERS[3]),
];

export function NeuralNetSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 4114 3980" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="7" strokeOpacity="0.18">
        {EDGES.map(([a, b], i) => {
          const [x1, y1] = NODES[a];
          const [x2, y2] = NODES[b];
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <g fill="currentColor">
        {Object.entries(NODES).map(([name, [x, y]]) => (
          <circle key={name} cx={x} cy={y} r="45" fillOpacity="0.6" />
        ))}
      </g>
    </svg>
  );
}
