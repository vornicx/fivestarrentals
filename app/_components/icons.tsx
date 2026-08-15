import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowRight(props: IconProps) {
  return <svg {...base} {...props}><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}

export function ArrowUpRight(props: IconProps) {
  return <svg {...base} {...props}><path d="M7 17 17 7M8 7h9v9" /></svg>;
}

export function ChevronDown(props: IconProps) {
  return <svg {...base} {...props}><path d="m7 10 5 5 5-5" /></svg>;
}

export function Menu(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 8h16M4 16h16" /></svg>;
}

export function Close(props: IconProps) {
  return <svg {...base} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export function WhatsApp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4A8 8 0 1 1 20 11.7Z" />
      <path d="M8.8 8.2c.5 2.9 2.1 4.5 5 5.1" />
    </svg>
  );
}

export function Search(props: IconProps) {
  return <svg {...base} {...props}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>;
}

export function LayoutDashboard(props: IconProps) {
  return <svg {...base} {...props}><rect x="4" y="4" width="6" height="7" rx="1" /><rect x="14" y="4" width="6" height="4" rx="1" /><rect x="14" y="12" width="6" height="8" rx="1" /><rect x="4" y="15" width="6" height="5" rx="1" /></svg>;
}

export function Car(props: IconProps) {
  return <svg {...base} {...props}><path d="m5 15 1.5-5h11L19 15" /><path d="M4 15h16v4h-2v-1H6v1H4v-4Z" /><circle cx="7" cy="15.5" r=".5" fill="currentColor" /><circle cx="17" cy="15.5" r=".5" fill="currentColor" /></svg>;
}

export function Inbox(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 5h16v14H4z" /><path d="M4 14h4l2 2h4l2-2h4" /></svg>;
}

export function Calendar(props: IconProps) {
  return <svg {...base} {...props}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16" /></svg>;
}

export function Users(props: IconProps) {
  return <svg {...base} {...props}><path d="M16 20v-1.5c0-2-1.8-3.5-4-3.5s-4 1.5-4 3.5V20" /><circle cx="12" cy="9" r="3" /><path d="M18 9.5a2.5 2.5 0 0 1 0 4.8M6 9.5a2.5 2.5 0 0 0 0 4.8" /></svg>;
}

export function Settings(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1A7 7 0 0 0 15 6l-.3-2.6h-4L10.4 6a7 7 0 0 0-1.5.9l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2.2l-2 1.5 2 3.4 2.4-1a7 7 0 0 0 1.5.9l.3 2.6h4l.3-2.6a7 7 0 0 0 1.5-.9l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" /></svg>;
}

export function Plus(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 5v14M5 12h14" /></svg>;
}

export function MoreHorizontal(props: IconProps) {
  return <svg {...base} {...props}><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></svg>;
}

export function Check(props: IconProps) {
  return <svg {...base} {...props}><path d="m5 12 4 4L19 6" /></svg>;
}

export function Clock(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></svg>;
}

export function TrendingUp(props: IconProps) {
  return <svg {...base} {...props}><path d="m4 16 5-5 4 4 7-8" /><path d="M15 7h5v5" /></svg>;
}

export function Bell(props: IconProps) {
  return <svg {...base} {...props}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" /><path d="M10 20h4" /></svg>;
}

export function LogOut(props: IconProps) {
  return <svg {...base} {...props}><path d="M10 5H5v14h5M14 8l4 4-4 4M9 12h9" /></svg>;
}

export function Edit(props: IconProps) {
  return <svg {...base} {...props}><path d="m4 16-.5 4.5L8 20 19 9l-4-4L4 16Z" /><path d="m13 7 4 4" /></svg>;
}

export function Sliders(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg>;
}
