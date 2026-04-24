import { numbers } from "../gameReducer";

export default function Dartboard({ onThrow }) {
  const degToRad = (deg) => (deg * Math.PI) / 180;
  const polar = (r, angle) => {
    const rad = degToRad(angle - 90);
    return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
  };

  const arc = (r1, r2, a1, a2) => {
    const p1 = polar(r1, a1);
    const p2 = polar(r1, a2);
    const p3 = polar(r2, a2);
    const p4 = polar(r2, a1);

    return `M ${p1.x} ${p1.y} A ${r1} ${r1} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${r2} ${r2} 0 0 0 ${p4.x} ${p4.y} Z`;
  };

  const radii = {
    outer: 210,
    doubleInner: 181,
    tripleOuter: 128,
    tripleInner: 103,
  };

  return (
    <svg
      viewBox="-260 -260 520 520"
      className="dartboard mx-auto aspect-square w-full max-w-[620px]"
      role="img"
      aria-label="Interactive dartboard"
    >
      <defs>
        <filter id="boardGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="14" floodOpacity="0.36" />
        </filter>
      </defs>
      <circle cx="0" cy="0" r="242" fill="#07110f" filter="url(#boardGlow)" />
      <circle cx="0" cy="0" r="222" fill="#101f1b" stroke="#263a35" />
      {numbers.map((num, i) => {
        const start = i * 18 - 9;
        const end = i * 18 + 9;
        const middle = (start + end) / 2;
        const even = i % 2 === 0;
        const label = polar(234, middle);
        const darkFill = even ? "#182521" : "#f0eadc";
        const bandFill = even ? "#b75f5a" : "#6fa48a";

        return (
          <g key={num}>
            <path
              d={arc(radii.outer, radii.doubleInner, start, end)}
              fill={bandFill}
              stroke="#0b1714"
              strokeWidth="1.5"
              className="dart-segment"
              onClick={() => onThrow(num * 2, "D")}
            />

            <path
              d={arc(radii.doubleInner, radii.tripleOuter, start, end)}
              fill={darkFill}
              stroke="#0b1714"
              strokeWidth="1"
              className="dart-segment"
              onClick={() => onThrow(num, "S")}
            />

            <path
              d={arc(radii.tripleOuter, radii.tripleInner, start, end)}
              fill={bandFill}
              stroke="#0b1714"
              strokeWidth="1.5"
              className="dart-segment"
              onClick={() => onThrow(num * 3, "T")}
            />

            <path
              d={arc(radii.tripleInner, 0, start, end)}
              fill={darkFill}
              stroke="#0b1714"
              strokeWidth="1"
              className="dart-segment"
              onClick={() => onThrow(num, "S")}
            />

            <text
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="dart-number"
            >
              {num}
            </text>
          </g>
        );
      })}

      <circle
        cx={0}
        cy={0}
        r={31}
        fill="#6fa48a"
        stroke="#0b1714"
        strokeWidth="2"
        className="dart-segment"
        onClick={() => onThrow(25, "OB")}
      />
      <circle
        cx={0}
        cy={0}
        r={13}
        fill="#b75f5a"
        stroke="#0b1714"
        strokeWidth="2"
        className="dart-segment"
        onClick={() => onThrow(50, "D")}
      />
    </svg>
  );
}
