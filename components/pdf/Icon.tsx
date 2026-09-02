import { Svg, Path, Circle } from "@react-pdf/renderer";

/**
 * Lucide icons as @react-pdf primitives.
 *
 * The page uses lucide-react components and emoji for the period markers.
 * Neither survives into a PDF: lucide-react renders DOM SVG, and emoji would
 * need an external font fetched at render time. The path data below is copied
 * from lucide-react's icon nodes so the PDF draws the exact same shapes.
 */

type IconNode =
  | { t: "path"; d: string }
  | { t: "circle"; cx: number; cy: number; r: number };

const ICONS = {
  sunrise: [
    { t: "path", d: "M12 2v8" },
    { t: "path", d: "m4.93 10.93 1.41 1.41" },
    { t: "path", d: "M2 18h2" },
    { t: "path", d: "M20 18h2" },
    { t: "path", d: "m19.07 10.93-1.41 1.41" },
    { t: "path", d: "M22 22H2" },
    { t: "path", d: "m8 6 4-4 4 4" },
    { t: "path", d: "M16 18a4 4 0 0 0-8 0" },
  ],
  utensils: [
    { t: "path", d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" },
    { t: "path", d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" },
    { t: "path", d: "m2.1 21.8 6.4-6.3" },
    { t: "path", d: "m19 5-7 7" },
  ],
  sun: [
    { t: "circle", cx: 12, cy: 12, r: 4 },
    { t: "path", d: "M12 2v2" },
    { t: "path", d: "M12 20v2" },
    { t: "path", d: "m4.93 4.93 1.41 1.41" },
    { t: "path", d: "m17.66 17.66 1.41 1.41" },
    { t: "path", d: "M2 12h2" },
    { t: "path", d: "M20 12h2" },
    { t: "path", d: "m6.34 17.66-1.41 1.41" },
    { t: "path", d: "m19.07 4.93-1.41 1.41" },
  ],
  star: [
    {
      t: "path",
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
    },
  ],
  moon: [
    {
      t: "path",
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
    },
  ],
  clock: [
    { t: "circle", cx: 12, cy: 12, r: 10 },
    { t: "path", d: "M12 6v6l4 2" },
  ],
  mapPin: [
    {
      t: "path",
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
    },
    { t: "circle", cx: 12, cy: 10, r: 3 },
  ],
  lightbulb: [
    {
      t: "path",
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
    },
    { t: "path", d: "M9 18h6" },
    { t: "path", d: "M10 22h4" },
  ],
} satisfies Record<string, IconNode[]>;

export type IconName = keyof typeof ICONS;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  /** Stroke width in the icon's own 24x24 viewBox units. */
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 14,
  color = "#742615",
  strokeWidth = 2,
}: IconProps) {
  const nodes = ICONS[name] as IconNode[];

  return (
    <Svg viewBox="0 0 24 24" style={{ width: size, height: size }}>
      {nodes.map((node, i) =>
        node.t === "circle" ? (
          <Circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
          />
        ) : (
          <Path
            key={i}
            d={node.d}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )
      )}
    </Svg>
  );
}
