const spirals = [
  { id: "vortex-copper", turns: 5.5, maxRadius: 340, width: 1.4, duration: "72s", reverse: false },
  { id: "vortex-persimmon", turns: 7, maxRadius: 280, width: 1.1, duration: "96s", reverse: true },
  { id: "vortex-gold", turns: 4, maxRadius: 210, width: 1.6, duration: "84s", reverse: false },
] as const;

function archimedeanSpiral(turns: number, maxRadius: number) {
  const cx = 400;
  const cy = 400;
  const points = 640;
  let path = "";

  for (let index = 0; index <= points; index += 1) {
    const progress = index / points;
    const angle = progress * turns * Math.PI * 2;
    const radius = 12 + progress * maxRadius;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    path += `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }

  return path;
}

export function Vortex() {
  return (
    <div className="vortex pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="vortex-wash absolute inset-[-12%] dark:opacity-90" />
      <div className="absolute left-1/2 top-[42%] h-[min(92vw,52rem)] w-[min(92vw,52rem)] -translate-x-1/2 -translate-y-1/2">
        {spirals.map((spiral) => (
          <svg
            key={spiral.id}
            viewBox="0 0 800 800"
            className={`vortex-spiral absolute inset-0 h-full w-full ${spiral.reverse ? "vortex-spin-reverse" : "vortex-spin"}`}
            style={{ animationDuration: spiral.duration }}
          >
            <defs>
              <linearGradient id={spiral.id} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b87533" stopOpacity="0" />
                <stop offset="38%" stopColor="#b87533" stopOpacity="0.85" />
                <stop offset="62%" stopColor="#e25a2a" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={archimedeanSpiral(spiral.turns, spiral.maxRadius)}
              fill="none"
              stroke={`url(#${spiral.id})`}
              strokeWidth={spiral.width}
              strokeLinecap="round"
            />
          </svg>
        ))}
        <svg viewBox="0 0 800 800" className="vortex-spin-reverse absolute inset-[12%] h-[76%] w-[76%]" style={{ animationDuration: "120s" }}>
          <circle cx="400" cy="400" r="188" fill="none" stroke="#d4af37" strokeOpacity="0.45" strokeWidth="1" />
          <circle cx="400" cy="400" r="246" fill="none" stroke="#b87533" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 10" />
        </svg>
      </div>
    </div>
  );
}
