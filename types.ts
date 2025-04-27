export type ContentTemplate =
  | "text-only"
  | "heading-text"
  | "image-top"
  | "image-bottom"
  | "image-side"
  | "two-images"
  | "stat-card"
  | "pie-chart"
  | "bar-chart"
  | "line-chart"
  | "donut-chart"
  | "progress-card"
  | "cta-card"
  | "testimonial"
  | "feature-card";

export type AnimationType =
  | "none"
  | "fade-in"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale-up"
  | "scale-down"
  | "bounce"
  | "pulse"
  | "spin";

export type HoverEffectType =
  | "none"
  | "scale"
  | "lift"
  | "glow"
  | "border-glow"
  | "background-shift"
  | "text-shift";

export type CardStyle = {
  shadow: "none" | "sm" | "md" | "lg" | "xl";
  border: boolean;
  borderWidth: number;
  borderRadius: "none" | "sm" | "md" | "lg" | "xl" | "full";
  glassmorphism: boolean;
  glassmorphismOpacity: number;
  backgroundColor: string;
  textColor: string;
  equalHeight: boolean;
  animation: AnimationType;
  animationDuration: number;
  animationDelay: number;
  hoverEffect: HoverEffectType;
  hoverTransitionDuration: number;
};

export type StatData = {
  value: string;
  label: string;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
};

export type ChartData = {
  labels: string[];
  values: number[];
  colors?: string[];
};

export type CardContent = {
  template: ContentTemplate;
  heading?: string;
  text: string;
  imageUrl?: string;
  imageUrl2?: string;
  imagePosition?: "top" | "bottom" | "left" | "right";
  statData?: StatData;
  chartData?: ChartData;
  ctaText?: string;
  ctaUrl?: string;
  author?: string;
  role?: string;
  icon?: string;
};

export type BentoCard = {
  id: number;
  name: string;
  colSpan: number;
  rowSpan: number;
  style: CardStyle;
  content: CardContent;
  order: number;
};

export type GridConfig = {
  columns: number;
  rows: number;
  gap: number;
  cards: BentoCard[];
  useRechartsForExport: boolean;
};
