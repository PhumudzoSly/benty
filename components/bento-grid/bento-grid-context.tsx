"use client";

import {
  AnimationType,
  BentoCard,
  CardContent,
  CardStyle,
  GridConfig,
  HoverEffectType,
} from "@/types";
import { createContext, useContext, useState, type ReactNode } from "react";

const defaultCardStyle: CardStyle = {
  shadow: "md",
  border: true,
  borderWidth: 1,
  borderRadius: "md",
  glassmorphism: false,
  glassmorphismOpacity: 0.1,
  backgroundColor: "bg-card",
  textColor: "text-card-foreground",
  equalHeight: true,
  animation: "none",
  animationDuration: 0.5,
  animationDelay: 0,
  hoverEffect: "none",
  hoverTransitionDuration: 0.3,
};

const defaultGridConfig: GridConfig = {
  columns: 3,
  rows: 2,
  gap: 4,
  useRechartsForExport: true,
  cards: [
    {
      id: 1,
      name: "Welcome Card",
      colSpan: 1,
      rowSpan: 1,
      order: 0,
      style: { ...defaultCardStyle },
      content: {
        template: "text-only",
        text: "Welcome to Benty",
      },
    },
    {
      id: 2,
      name: "Feature Card",
      colSpan: 2,
      rowSpan: 1,
      order: 1,
      style: { ...defaultCardStyle },
      content: {
        template: "heading-text",
        heading: "Card 2",
        text: "This is a card with heading and text",
      },
    },
    {
      id: 3,
      name: "Bar Chart",
      colSpan: 1,
      rowSpan: 1,
      order: 2,
      style: { ...defaultCardStyle },
      content: {
        template: "bar-chart",
        heading: "Monthly Sales",
        text: "Sales performance by month",
        chartData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          values: [400, 300, 500, 200, 350],
          colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"],
        },
      },
    },
    {
      id: 4,
      name: "Pie Chart",
      colSpan: 1,
      rowSpan: 1,
      order: 3,
      style: { ...defaultCardStyle },
      content: {
        template: "pie-chart",
        heading: "Revenue Sources",
        text: "Distribution of revenue by source",
        chartData: {
          labels: ["Product A", "Product B", "Product C"],
          values: [400, 300, 300],
          colors: ["#0088FE", "#00C49F", "#FFBB28"],
        },
      },
    },
    {
      id: 5,
      name: "Line Chart",
      colSpan: 1,
      rowSpan: 1,
      order: 4,
      style: { ...defaultCardStyle },
      content: {
        template: "line-chart",
        heading: "User Growth",
        text: "User acquisition over time",
        chartData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          values: [100, 250, 300, 450, 600],
          colors: ["#8884d8"],
        },
      },
    },
  ],
};

type BentoGridContextType = {
  gridConfig: GridConfig;
  selectedCardId: number | null;
  copied: boolean;
  isFullscreenPreview: boolean;
  updateGridConfig: (config: Partial<GridConfig>) => void;
  updateCardStyle: (cardId: number, style: Partial<CardStyle>) => void;
  updateCardSize: (cardId: number, colSpan: number, rowSpan: number) => void;
  updateCardContent: (cardId: number, content: Partial<CardContent>) => void;
  updateCardName: (cardId: number, name: string) => void;
  updateCardOrder: (cardId: number, newOrder: number) => void;
  reorderCards: (sourceId: number, destinationId: number) => void;
  applyAnimationToAll: (
    animation: AnimationType,
    duration: number,
    delay: number
  ) => void;
  applyHoverEffectToAll: (effect: HoverEffectType, duration: number) => void;
  toggleRechartsForExport: () => void;
  toggleFullscreenPreview: () => void;
  addCard: () => void;
  removeCard: (cardId: number) => void;
  setSelectedCardId: (id: number | null) => void;
  copyToClipboard: () => void;
  generateCardClass: (card: BentoCard) => string;
  generateCardAnimationStyle: (card: BentoCard) => Record<string, string>;
  generateCardHoverClass: (card: BentoCard) => string;
  generateGlassmorphismStyle: (
    enabled: boolean,
    opacity: number
  ) => Record<string, string>;
  generateCode: () => string;
};

const BentoGridContext = createContext<BentoGridContextType | undefined>(
  undefined
);

export function BentoGridProvider({ children }: { children: ReactNode }) {
  const [gridConfig, setGridConfig] = useState<GridConfig>(defaultGridConfig);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  const updateGridConfig = (config: Partial<GridConfig>) => {
    setGridConfig((prev) => ({ ...prev, ...config }));
  };

  const updateCardStyle = (cardId: number, style: Partial<CardStyle>) => {
    setGridConfig((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.id === cardId
          ? { ...card, style: { ...card.style, ...style } }
          : card
      ),
    }));
  };

  const updateCardSize = (cardId: number, colSpan: number, rowSpan: number) => {
    setGridConfig((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.id === cardId ? { ...card, colSpan, rowSpan } : card
      ),
    }));
  };

  const updateCardContent = (cardId: number, content: Partial<CardContent>) => {
    setGridConfig((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.id === cardId
          ? { ...card, content: { ...card.content, ...content } }
          : card
      ),
    }));
  };

  const updateCardName = (cardId: number, name: string) => {
    setGridConfig((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.id === cardId ? { ...card, name } : card
      ),
    }));
  };

  const updateCardOrder = (cardId: number, newOrder: number) => {
    setGridConfig((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.id === cardId ? { ...card, order: newOrder } : card
      ),
    }));
  };

  const reorderCards = (sourceId: number, destinationId: number) => {
    setGridConfig((prev) => {
      const cards = [...prev.cards];
      const sourceCard = cards.find((card) => card.id === sourceId);
      const destinationCard = cards.find((card) => card.id === destinationId);

      if (!sourceCard || !destinationCard) return prev;

      const sourceOrder = sourceCard.order;
      const destinationOrder = destinationCard.order;

      // Update orders for all affected cards
      return {
        ...prev,
        cards: cards.map((card) => {
          if (card.id === sourceId) {
            return { ...card, order: destinationOrder };
          }

          if (sourceOrder < destinationOrder) {
            // Moving forward
            if (card.order > sourceOrder && card.order <= destinationOrder) {
              return { ...card, order: card.order - 1 };
            }
          } else {
            // Moving backward
            if (card.order >= destinationOrder && card.order < sourceOrder) {
              return { ...card, order: card.order + 1 };
            }
          }

          return card;
        }),
      };
    });
  };

  const applyAnimationToAll = (
    animation: AnimationType,
    duration: number,
    delay: number
  ) => {
    setGridConfig((prev) => ({
      ...prev,
      cards: prev.cards.map((card) => ({
        ...card,
        style: {
          ...card.style,
          animation,
          animationDuration: duration,
          animationDelay: delay,
        },
      })),
    }));
  };

  const applyHoverEffectToAll = (effect: HoverEffectType, duration: number) => {
    setGridConfig((prev) => ({
      ...prev,
      cards: prev.cards.map((card) => ({
        ...card,
        style: {
          ...card.style,
          hoverEffect: effect,
          hoverTransitionDuration: duration,
        },
      })),
    }));
  };

  const toggleRechartsForExport = () => {
    setGridConfig((prev) => ({
      ...prev,
      useRechartsForExport: !prev.useRechartsForExport,
    }));
  };

  const toggleFullscreenPreview = () => {
    setIsFullscreenPreview((prev) => !prev);
  };

  const addCard = () => {
    const newId = Math.max(0, ...gridConfig.cards.map((card) => card.id)) + 1;
    const newOrder = gridConfig.cards.length;

    setGridConfig((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          id: newId,
          name: `Card ${newId}`,
          colSpan: 1,
          rowSpan: 1,
          order: newOrder,
          style: { ...defaultCardStyle },
          content: {
            template: "text-only",
            text: `Card ${newId}`,
          },
        },
      ],
    }));
  };

  const removeCard = (cardId: number) => {
    setGridConfig((prev) => {
      const cardToRemove = prev.cards.find((card) => card.id === cardId);
      if (!cardToRemove) return prev;

      const removedOrder = cardToRemove.order;

      return {
        ...prev,
        cards: prev.cards
          .filter((card) => card.id !== cardId)
          .map((card) => {
            if (card.order > removedOrder) {
              return { ...card, order: card.order - 1 };
            }
            return card;
          }),
      };
    });

    if (selectedCardId === cardId) {
      setSelectedCardId(null);
    }
  };

  const generateShadowClass = (shadow: CardStyle["shadow"]) => {
    switch (shadow) {
      case "none":
        return "";
      case "sm":
        return "shadow-sm";
      case "md":
        return "shadow";
      case "lg":
        return "shadow-lg";
      case "xl":
        return "shadow-xl";
      default:
        return "shadow";
    }
  };

  const generateBorderRadiusClass = (radius: CardStyle["borderRadius"]) => {
    switch (radius) {
      case "none":
        return "rounded-none";
      case "sm":
        return "rounded-sm";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "xl":
        return "rounded-xl";
      case "full":
        return "rounded-full";
      default:
        return "rounded-md";
    }
  };

  const generateGlassmorphismStyle = (enabled: boolean, opacity: number) => {
    if (!enabled) return {};
    return {
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      backdropFilter: "blur(10px)",
    };
  };

  const generateCardAnimationStyle = (card: BentoCard) => {
    const { animation, animationDuration, animationDelay } = card.style;

    if (animation === "none") return {};

    const baseStyle = {
      animationDuration: `${animationDuration}s`,
      animationDelay: `${animationDelay}s`,
      animationFillMode: "both",
    };

    switch (animation) {
      case "fade-in":
        return {
          ...baseStyle,
          animationName: "fadeIn",
        };
      case "slide-up":
        return {
          ...baseStyle,
          animationName: "slideUp",
        };
      case "slide-down":
        return {
          ...baseStyle,
          animationName: "slideDown",
        };
      case "slide-left":
        return {
          ...baseStyle,
          animationName: "slideLeft",
        };
      case "slide-right":
        return {
          ...baseStyle,
          animationName: "slideRight",
        };
      case "scale-up":
        return {
          ...baseStyle,
          animationName: "scaleUp",
        };
      case "scale-down":
        return {
          ...baseStyle,
          animationName: "scaleDown",
        };
      case "bounce":
        return {
          ...baseStyle,
          animationName: "bounce",
        };
      case "pulse":
        return {
          ...baseStyle,
          animationName: "pulse",
        };
      case "spin":
        return {
          ...baseStyle,
          animationName: "spin",
        };
      default:
        return {};
    }
  };

  const generateCardHoverClass = (card: BentoCard) => {
    const { hoverEffect, hoverTransitionDuration } = card.style;

    if (hoverEffect === "none") return "";

    const transitionClass = `transition-all duration-${Math.round(
      hoverTransitionDuration * 300
    )}`;

    switch (hoverEffect) {
      case "scale":
        return `${transitionClass} hover:scale-105`;
      case "lift":
        return `${transitionClass} hover:-translate-y-2`;
      case "glow":
        return `${transitionClass} hover:shadow-lg hover:shadow-primary/25`;
      case "border-glow":
        return `${transitionClass} hover:border-primary hover:border-opacity-100`;
      case "background-shift":
        return `${transitionClass} hover:bg-primary/10`;
      case "text-shift":
        return `${transitionClass} hover:text-primary`;
      default:
        return "";
    }
  };

  const generateCardClass = (card: BentoCard) => {
    const { style } = card;
    return [
      style.backgroundColor,
      style.textColor,
      generateShadowClass(style.shadow),
      generateBorderRadiusClass(style.borderRadius),
      style.border ? `border border-border` : "",
      style.border && style.borderWidth > 1
        ? `border-${style.borderWidth}`
        : "",
      style.equalHeight ? "h-full" : "",
      generateCardHoverClass(card),
    ]
      .filter(Boolean)
      .join(" ");
  };

  const generateCode = () => {
    const gridTemplateColumns = `grid-cols-${gridConfig.columns}`;
    const gridGap = `gap-${gridConfig.gap}`;

    const imports = [];

    // Check if we need to import chart components
    const hasCharts = gridConfig.cards.some((card) =>
      ["bar-chart", "pie-chart", "line-chart", "donut-chart"].includes(
        card.content.template
      )
    );

    if (hasCharts && gridConfig.useRechartsForExport) {
      imports.push(
        'import { BarChart, Bar, PieChart, Pie, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";'
      );
    }

    let code = imports.length > 0 ? imports.join("\n") + "\n\n" : "";

    code += `<div className="grid ${gridTemplateColumns} ${gridGap}">\n`;

    // Sort cards by order before generating code
    const sortedCards = [...gridConfig.cards].sort((a, b) => a.order - b.order);

    sortedCards.forEach((card) => {
      const colSpan = card.colSpan > 1 ? `col-span-${card.colSpan}` : "";
      const rowSpan = card.rowSpan > 1 ? `row-span-${card.rowSpan}` : "";
      const cardClass = generateCardClass(card);

      // Generate style object for the card
      const styleProps = [];

      // Add glassmorphism if enabled
      if (card.style.glassmorphism) {
        styleProps.push(
          `backgroundColor: "rgba(255, 255, 255, ${card.style.glassmorphismOpacity})"`
        );
        styleProps.push(`backdropFilter: "blur(10px)"`);
      }

      // Add animation if not "none"
      if (card.style.animation !== "none") {
        styleProps.push(
          `animationDuration: "${card.style.animationDuration}s"`
        );
        styleProps.push(`animationDelay: "${card.style.animationDelay}s"`);
        styleProps.push(`animationFillMode: "both"`);

        switch (card.style.animation) {
          case "fade-in":
            styleProps.push(`animationName: "fadeIn"`);
            break;
          case "slide-up":
            styleProps.push(`animationName: "slideUp"`);
            break;
          case "slide-down":
            styleProps.push(`animationName: "slideDown"`);
            break;
          case "slide-left":
            styleProps.push(`animationName: "slideLeft"`);
            break;
          case "slide-right":
            styleProps.push(`animationName: "slideRight"`);
            break;
          case "scale-up":
            styleProps.push(`animationName: "scaleUp"`);
            break;
          case "scale-down":
            styleProps.push(`animationName: "scaleDown"`);
            break;
          case "bounce":
            styleProps.push(`animationName: "bounce"`);
            break;
          case "pulse":
            styleProps.push(`animationName: "pulse"`);
            break;
          case "spin":
            styleProps.push(`animationName: "spin"`);
            break;
        }
      }

      // Add transition for hover effects
      if (card.style.hoverEffect !== "none") {
        styleProps.push(
          `transition: "all ${card.style.hoverTransitionDuration}s"`
        );
      }

      // Generate the style prop if we have any styles
      const styleString =
        styleProps.length > 0
          ? `\n  style={{\n    ${styleProps.join(",\n    ")}\n  }}`
          : "";

      code += `  {/* ${card.name} */}\n`;
      code += `  <Card className="${[colSpan, rowSpan, cardClass]
        .filter(Boolean)
        .join(" ")}"${styleString}>\n`;
      code += `    <CardContent className="p-6">\n`;

      // Generate content based on template
      switch (card.content.template) {
        case "heading-text":
          code += `      <h3 className="text-lg font-semibold mb-2">${
            card.content.heading || ""
          }</h3>\n`;
          code += `      <p>${card.content.text}</p>\n`;
          break;
        case "image-top":
          code += `      <div className="flex flex-col gap-4">\n`;
          code += `        <div className="aspect-video w-full overflow-hidden rounded-md">\n`;
          code += `          <img src="${
            card.content.imageUrl || "/placeholder.svg?height=100&width=200"
          }" alt="Card image" className="w-full h-full object-cover" />\n`;
          code += `        </div>\n`;
          code += `        <div>\n`;
          if (card.content.heading) {
            code += `          <h3 className="text-lg font-semibold mb-2">${card.content.heading}</h3>\n`;
          }
          code += `          <p>${card.content.text}</p>\n`;
          code += `        </div>\n`;
          code += `      </div>\n`;
          break;
        case "image-bottom":
          code += `      <div className="flex flex-col gap-4">\n`;
          code += `        <div>\n`;
          if (card.content.heading) {
            code += `          <h3 className="text-lg font-semibold mb-2">${card.content.heading}</h3>\n`;
          }
          code += `          <p>${card.content.text}</p>\n`;
          code += `        </div>\n`;
          code += `        <div className="aspect-video w-full overflow-hidden rounded-md">\n`;
          code += `          <img src="${
            card.content.imageUrl || "/placeholder.svg?height=100&width=200"
          }" alt="Card image" className="w-full h-full object-cover" />\n`;
          code += `        </div>\n`;
          code += `      </div>\n`;
          break;
        case "image-side":
          code += `      <div className="flex ${
            card.content.imagePosition === "right"
              ? "flex-row-reverse"
              : "flex-row"
          } gap-4">\n`;
          code += `        <div className="w-1/3 aspect-square overflow-hidden rounded-md">\n`;
          code += `          <img src="${
            card.content.imageUrl || "/placeholder.svg?height=100&width=100"
          }" alt="Card image" className="w-full h-full object-cover" />\n`;
          code += `        </div>\n`;
          code += `        <div className="flex-1">\n`;
          if (card.content.heading) {
            code += `          <h3 className="text-lg font-semibold mb-2">${card.content.heading}</h3>\n`;
          }
          code += `          <p>${card.content.text}</p>\n`;
          code += `        </div>\n`;
          code += `      </div>\n`;
          break;
        case "two-images":
          code += `      <div className="space-y-4">\n`;
          if (card.content.heading) {
            code += `        <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
          }
          code += `        <div className="grid grid-cols-2 gap-2">\n`;
          code += `          <div className="aspect-square overflow-hidden rounded-md">\n`;
          code += `            <img src="${
            card.content.imageUrl || "/placeholder.svg?height=100&width=100"
          }" alt="First image" className="w-full h-full object-cover" />\n`;
          code += `          </div>\n`;
          code += `          <div className="aspect-square overflow-hidden rounded-md">\n`;
          code += `            <img src="${
            card.content.imageUrl2 || "/placeholder.svg?height=100&width=100"
          }" alt="Second image" className="w-full h-full object-cover" />\n`;
          code += `          </div>\n`;
          code += `        </div>\n`;
          code += `        <p>${card.content.text}</p>\n`;
          code += `      </div>\n`;
          break;
        case "stat-card":
          code += `      <div className="space-y-2">\n`;
          if (card.content.heading) {
            code += `        <h3 className="text-sm font-medium text-muted-foreground">${card.content.heading}</h3>\n`;
          }
          code += `        <div className="text-3xl font-bold">${
            card.content.statData?.value || "0"
          }</div>\n`;
          if (card.content.statData?.trend) {
            const trendColor =
              card.content.statData.trend === "up"
                ? "text-green-500"
                : card.content.statData.trend === "down"
                ? "text-red-500"
                : "text-muted-foreground";
            const trendIcon =
              card.content.statData.trend === "up"
                ? "ArrowUp"
                : card.content.statData.trend === "down"
                ? "ArrowDown"
                : "ArrowRight";
            code += `        <div className="flex items-center gap-1">\n`;
            code += `          <${trendIcon} className="h-4 w-4 ${trendColor}" />\n`;
            code += `          <span className="${trendColor} text-sm font-medium">${
              card.content.statData.trendValue || "0%"
            }</span>\n`;
            code += `          <span className="text-muted-foreground text-sm">${card.content.text}</span>\n`;
            code += `        </div>\n`;
          } else {
            code += `        <p className="text-sm text-muted-foreground">${card.content.text}</p>\n`;
          }
          code += `      </div>\n`;
          break;
        case "pie-chart":
          if (gridConfig.useRechartsForExport) {
            code += `      <div className="space-y-4">\n`;
            if (card.content.heading) {
              code += `        <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
            }
            code += `        <div className="h-[200px]">\n`;
            code += `          <ResponsiveContainer width="100%" height="100%">\n`;
            code += `            <PieChart>\n`;
            code += `              <Pie\n`;
            code += `                data={[\n`;
            if (
              card.content.chartData?.labels &&
              card.content.chartData.values
            ) {
              card.content.chartData.labels.forEach((label, i) => {
                const value = card.content.chartData?.values[i] || 0;
                code += `                  { name: "${label}", value: ${value} },\n`;
              });
            } else {
              code += `                  { name: "Group A", value: 400 },\n`;
              code += `                  { name: "Group B", value: 300 },\n`;
              code += `                  { name: "Group C", value: 300 },\n`;
            }
            code += `                ]}\n`;
            code += `                cx="50%"\n`;
            code += `                cy="50%"\n`;
            code += `                outerRadius={80}\n`;
            code += `                dataKey="value"\n`;
            code += `                label\n`;
            code += `              >\n`;
            if (card.content.chartData?.colors) {
              card.content.chartData.colors.forEach((color, i) => {
                code += `                <Cell key={\`cell-\${${i}}\`} fill="${color}" />\n`;
              });
            }
            code += `              </Pie>\n`;
            code += `              <Tooltip />\n`;
            code += `              <Legend />\n`;
            code += `            </PieChart>\n`;
            code += `          </ResponsiveContainer>\n`;
            code += `        </div>\n`;
            code += `        <p className="text-center text-sm text-muted-foreground">${card.content.text}</p>\n`;
            code += `      </div>\n`;
          } else {
            code += `      <div className="space-y-4">\n`;
            if (card.content.heading) {
              code += `        <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
            }
            code += `        <div className="flex justify-center">\n`;
            code += `          {/* Replace with your preferred chart library */}\n`;
            code += `          <div className="bg-muted/20 rounded-md p-4 text-center">\n`;
            code += `            <p>Pie Chart: ${
              card.content.chartData?.labels?.join(", ") || "No data"
            }</p>\n`;
            code += `          </div>\n`;
            code += `        </div>\n`;
            code += `        <p className="text-center text-sm text-muted-foreground">${card.content.text}</p>\n`;
            code += `      </div>\n`;
          }
          break;
        case "bar-chart":
          if (gridConfig.useRechartsForExport) {
            code += `      <div className="space-y-4">\n`;
            if (card.content.heading) {
              code += `        <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
            }
            code += `        <div className="h-[200px]">\n`;
            code += `          <ResponsiveContainer width="100%" height="100%">\n`;
            code += `            <BarChart\n`;
            code += `              data={[\n`;
            if (
              card.content.chartData?.labels &&
              card.content.chartData.values
            ) {
              card.content.chartData.labels.forEach((label, i) => {
                const value = card.content.chartData?.values[i] || 0;
                code += `                { name: "${label}", value: ${value} },\n`;
              });
            } else {
              code += `                { name: "Jan", value: 400 },\n`;
              code += `                { name: "Feb", value: 300 },\n`;
              code += `                { name: "Mar", value: 500 },\n`;
              code += `                { name: "Apr", value: 200 },\n`;
              code += `                { name: "May", value: 350 },\n`;
            }
            code += `              ]}\n`;
            code += `              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}\n`;
            code += `            >\n`;
            code += `              <XAxis dataKey="name" />\n`;
            code += `              <YAxis />\n`;
            code += `              <Tooltip />\n`;
            code += `              <Bar dataKey="value" fill="hsl(var(--primary))">\n`;
            if (card.content.chartData?.colors) {
              card.content.chartData.colors.forEach((color, i) => {
                code += `                <Cell key={\`cell-\${${i}}\`} fill="${color}" />\n`;
              });
            }
            code += `              </Bar>\n`;
            code += `            </BarChart>\n`;
            code += `          </ResponsiveContainer>\n`;
            code += `        </div>\n`;
            code += `        <p className="text-center text-sm text-muted-foreground">${card.content.text}</p>\n`;
            code += `      </div>\n`;
          } else {
            code += `      <div className="space-y-4">\n`;
            if (card.content.heading) {
              code += `        <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
            }
            code += `        <div className="flex justify-center">\n`;
            code += `          {/* Replace with your preferred chart library */}\n`;
            code += `          <div className="bg-muted/20 rounded-md p-4 text-center">\n`;
            code += `            <p>Bar Chart: ${
              card.content.chartData?.labels?.join(", ") || "No data"
            }</p>\n`;
            code += `          </div>\n`;
            code += `        </div>\n`;
            code += `        <p className="text-center text-sm text-muted-foreground">${card.content.text}</p>\n`;
            code += `      </div>\n`;
          }
          break;
        case "line-chart":
          if (gridConfig.useRechartsForExport) {
            code += `      <div className="space-y-4">\n`;
            if (card.content.heading) {
              code += `        <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
            }
            code += `        <div className="h-[200px]">\n`;
            code += `          <ResponsiveContainer width="100%" height="100%">\n`;
            code += `            <LineChart\n`;
            code += `              data={[\n`;
            if (
              card.content.chartData?.labels &&
              card.content.chartData.values
            ) {
              card.content.chartData.labels.forEach((label, i) => {
                const value = card.content.chartData?.values[i] || 0;
                code += `                { name: "${label}", value: ${value} },\n`;
              });
            } else {
              code += `                { name: "Jan", value: 100 },\n`;
              code += `                { name: "Feb", value: 200 },\n`;
              code += `                { name: "Mar", value: 300 },\n`;
              code += `                { name: "Apr", value: 400 },\n`;
              code += `                { name: "May", value: 500 },\n`;
            }
            code += `              ]}\n`;
            code += `              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}\n`;
            code += `            >\n`;
            code += `              <XAxis dataKey="name" />\n`;
            code += `              <YAxis />\n`;
            code += `              <Tooltip />\n`;
            code += `              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />\n`;
            code += `            </LineChart>\n`;
            code += `          </ResponsiveContainer>\n`;
            code += `        </div>\n`;
            code += `        <p className="text-center text-sm text-muted-foreground">${card.content.text}</p>\n`;
            code += `      </div>\n`;
          } else {
            code += `      <div className="space-y-4">\n`;
            if (card.content.heading) {
              code += `        <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
            }
            code += `        <div className="flex justify-center">\n`;
            code += `          {/* Replace with your preferred chart library */}\n`;
            code += `          <div className="bg-muted/20 rounded-md p-4 text-center">\n`;
            code += `            <p>Line Chart: ${
              card.content.chartData?.labels?.join(", ") || "No data"
            }</p>\n`;
            code += `          </div>\n`;
            code += `        </div>\n`;
            code += `        <p className="text-center text-sm text-muted-foreground">${card.content.text}</p>\n`;
            code += `      </div>\n`;
          }
          break;
        case "donut-chart":
          if (gridConfig.useRechartsForExport) {
            code += `      <div className="space-y-4">\n`;
            if (card.content.heading) {
              code += `        <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
            }
            code += `        <div className="h-[200px]">\n`;
            code += `          <ResponsiveContainer width="100%" height="100%">\n`;
            code += `            <PieChart>\n`;
            code += `              <Pie\n`;
            code += `                data={[\n`;
            if (
              card.content.chartData?.labels &&
              card.content.chartData.values
            ) {
              card.content.chartData.labels.forEach((label, i) => {
                const value = card.content.chartData?.values[i] || 0;
                code += `                  { name: "${label}", value: ${value} },\n`;
              });
            } else {
              code += `                  { name: "Group A", value: 400 },\n`;
              code += `                  { name: "Group B", value: 300 },\n`;
              code += `                  { name: "Group C", value: 300 },\n`;
            }
            code += `                ]}\n`;
            code += `                cx="50%"\n`;
            code += `                cy="50%"\n`;
            code += `                innerRadius={40}\n`;
            code += `                outerRadius={80}\n`;
            code += `                dataKey="value"\n`;
            code += `                label\n`;
            code += `              >\n`;
            if (card.content.chartData?.colors) {
              card.content.chartData.colors.forEach((color, i) => {
                code += `                <Cell key={\`cell-\${${i}}\`} fill="${color}" />\n`;
              });
            }
            code += `              </Pie>\n`;
            code += `              <Tooltip />\n`;
            code += `              <Legend />\n`;
            code += `            </PieChart>\n`;
            code += `          </ResponsiveContainer>\n`;
            code += `        </div>\n`;
            code += `        <p className="text-center text-sm text-muted-foreground">${card.content.text}</p>\n`;
            code += `      </div>\n`;
          } else {
            code += `      <div className="space-y-4">\n`;
            if (card.content.heading) {
              code += `        <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
            }
            code += `        <div className="flex justify-center">\n`;
            code += `          {/* Replace with your preferred chart library */}\n`;
            code += `          <div className="bg-muted/20 rounded-md p-4 text-center">\n`;
            code += `            <p>Donut Chart: ${
              card.content.chartData?.labels?.join(", ") || "No data"
            }</p>\n`;
            code += `          </div>\n`;
            code += `        </div>\n`;
            code += `        <p className="text-center text-sm text-muted-foreground">${card.content.text}</p>\n`;
            code += `      </div>\n`;
          }
          break;
        case "progress-card":
          code += `      <div className="space-y-4">\n`;
          if (card.content.heading) {
            code += `        <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
          }
          const progressValue = card.content.statData?.value
            ? Number.parseInt(card.content.statData.value)
            : 50;
          code += `        <div className="space-y-2">\n`;
          code += `          <div className="flex justify-between text-sm font-medium">\n`;
          code += `            <span>${
            card.content.statData?.label || "Progress"
          }</span>\n`;
          code += `            <span>${progressValue}%</span>\n`;
          code += `          </div>\n`;
          code += `          <Progress value={${progressValue}} />\n`;
          code += `        </div>\n`;
          code += `        <p className="text-sm text-muted-foreground">${card.content.text}</p>\n`;
          code += `      </div>\n`;
          break;
        case "cta-card":
          code += `      <div className="flex flex-col justify-between h-full space-y-4">\n`;
          if (card.content.heading) {
            code += `        <h3 className="text-xl font-bold">${card.content.heading}</h3>\n`;
          }
          code += `        <p className="text-muted-foreground">${card.content.text}</p>\n`;
          code += `        <Button className="w-full">${
            card.content.ctaText || "Get Started"
          }</Button>\n`;
          code += `      </div>\n`;
          break;
        case "testimonial":
          code += `      <div className="space-y-4">\n`;
          code += `        <div className="relative">\n`;
          code += `          <Quote className="absolute -top-2 -left-2 h-6 w-6 text-muted-foreground opacity-30" />\n`;
          code += `          <p className="pl-6 italic">${card.content.text}</p>\n`;
          code += `        </div>\n`;
          code += `        <div className="flex items-center gap-3">\n`;
          if (card.content.imageUrl) {
            code += `          <Avatar>\n`;
            code += `            <AvatarImage src="${card.content.imageUrl}" />\n`;
            code += `            <AvatarFallback>${
              card.content.author?.substring(0, 2) || "AB"
            }</AvatarFallback>\n`;
            code += `          </Avatar>\n`;
          }
          code += `          <div>\n`;
          code += `            <p className="font-semibold">${
            card.content.author || "Anonymous"
          }</p>\n`;
          if (card.content.role) {
            code += `            <p className="text-sm text-muted-foreground">${card.content.role}</p>\n`;
          }
          code += `          </div>\n`;
          code += `        </div>\n`;
          code += `      </div>\n`;
          break;
        case "feature-card":
          code += `      <div className="space-y-4">\n`;
          if (card.content.icon) {
            code += `        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">\n`;
            code += `          <${card.content.icon} className="h-5 w-5 text-primary" />\n`;
            code += `        </div>\n`;
          }
          if (card.content.heading) {
            code += `        <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
          }
          code += `        <p className="text-muted-foreground">${card.content.text}</p>\n`;
          code += `      </div>\n`;
          break;
        case "text-only":
        default:
          code += `      ${card.content.text}\n`;
      }

      code += `    </CardContent>\n`;
      code += `  </Card>\n`;
    });

    // Add keyframes for animations and hover effects
    code += `</div>\n\n`;
    code += `{/* Add these keyframes and styles to your CSS */}\n`;
    code += `<style jsx global>{\`\n`;
    code += `  @keyframes fadeIn {\n`;
    code += `    from { opacity: 0; }\n`;
    code += `    to { opacity: 1; }\n`;
    code += `  }\n\n`;

    code += `  @keyframes slideUp {\n`;
    code += `    from { transform: translateY(20px); opacity: 0; }\n`;
    code += `    to { transform: translateY(0); opacity: 1; }\n`;
    code += `  }\n\n`;

    code += `  @keyframes slideDown {\n`;
    code += `    from { transform: translateY(-20px); opacity: 0; }\n`;
    code += `    to { transform: translateY(0); opacity: 1; }\n`;
    code += `  }\n\n`;

    code += `  @keyframes slideLeft {\n`;
    code += `    from { transform: translateX(20px); opacity: 0; }\n`;
    code += `    to { transform: translateX(0); opacity: 1; }\n`;
    code += `  }\n\n`;

    code += `  @keyframes slideRight {\n`;
    code += `    from { transform: translateX(-20px); opacity: 0; }\n`;
    code += `    to { transform: translateX(0); opacity: 1; }\n`;
    code += `  }\n\n`;

    code += `  @keyframes scaleUp {\n`;
    code += `    from { transform: scale(0.8); opacity: 0; }\n`;
    code += `    to { transform: scale(1); opacity: 1; }\n`;
    code += `  }\n\n`;

    code += `  @keyframes scaleDown {\n`;
    code += `    from { transform: scale(1.2); opacity: 0; }\n`;
    code += `    to { transform: scale(1); opacity: 1; }\n`;
    code += `  }\n\n`;

    code += `  @keyframes bounce {\n`;
    code += `    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n`;
    code += `    40% { transform: translateY(-20px); }\n`;
    code += `    60% { transform: translateY(-10px); }\n`;
    code += `  }\n\n`;

    code += `  @keyframes pulse {\n`;
    code += `    0% { transform: scale(1); }\n`;
    code += `    50% { transform: scale(1.05); }\n`;
    code += `    100% { transform: scale(1); }\n`;
    code += `  }\n\n`;

    code += `  @keyframes spin {\n`;
    code += `    from { transform: rotate(0deg); }\n`;
    code += `    to { transform: rotate(360deg); }\n`;
    code += `  }\n`;
    code += `\`}</style>`;

    return code;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BentoGridContext.Provider
      value={{
        gridConfig,
        selectedCardId,
        copied,
        isFullscreenPreview,
        updateGridConfig,
        updateCardStyle,
        updateCardSize,
        updateCardContent,
        updateCardName,
        updateCardOrder,
        reorderCards,
        applyAnimationToAll,
        applyHoverEffectToAll,
        toggleRechartsForExport,
        toggleFullscreenPreview,
        addCard,
        removeCard,
        setSelectedCardId,
        copyToClipboard,
        generateCardClass,
        generateCardAnimationStyle,
        generateCardHoverClass,
        // @ts-expect-error
        generateGlassmorphismStyle,
        generateCode,
      }}
    >
      {children}
    </BentoGridContext.Provider>
  );
}

export function useBentoGrid() {
  const context = useContext(BentoGridContext);
  if (context === undefined) {
    throw new Error("useBentoGrid must be used within a BentoGridProvider");
  }
  return context;
}
