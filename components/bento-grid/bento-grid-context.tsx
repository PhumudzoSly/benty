"use client";

import {
  AnimationType,
  BentoCard,
  CardContent,
  CardStyle,
  GridConfig,
  HoverEffectType,
  ResponsiveSpan,
  ResponsiveConfig,
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
  columns: { sm: 1, md: 2, lg: 3 },
  rows: 2,
  gap: { sm: 2, md: 3, lg: 4 },
  useRechartsForExport: true,
  cards: [
    {
      id: 1,
      name: "Welcome Card",
      colSpan: { sm: 1, md: 1, lg: 1 },
      rowSpan: { sm: 1, md: 1, lg: 1 },
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
      colSpan: { sm: 1, md: 2, lg: 2 },
      rowSpan: { sm: 1, md: 1, lg: 1 },
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
      colSpan: { sm: 1, md: 1, lg: 1 },
      rowSpan: { sm: 1, md: 1, lg: 1 },
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
      colSpan: { sm: 1, md: 1, lg: 1 },
      rowSpan: { sm: 1, md: 1, lg: 1 },
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
      colSpan: { sm: 1, md: 1, lg: 1 },
      rowSpan: { sm: 1, md: 1, lg: 1 },
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
  updateGridColumns: (
    screenSize: keyof ResponsiveConfig,
    value: number
  ) => void;
  updateGridGap: (screenSize: keyof ResponsiveConfig, value: number) => void;
  updateCardStyle: (cardId: number, style: Partial<CardStyle>) => void;
  updateCardSize: (
    cardId: number,
    colSpan: ResponsiveSpan,
    rowSpan: ResponsiveSpan
  ) => void;
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
  generateCode: () => { reactCode: string; cssCode: string };
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

  const updateGridColumns = (
    screenSize: keyof ResponsiveConfig,
    value: number
  ) => {
    setGridConfig((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [screenSize]: value,
      },
    }));
  };

  const updateGridGap = (screenSize: keyof ResponsiveConfig, value: number) => {
    setGridConfig((prev) => ({
      ...prev,
      gap: {
        ...prev.gap,
        [screenSize]: value,
      },
    }));
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

  const updateCardSize = (
    cardId: number,
    colSpan: ResponsiveSpan,
    rowSpan: ResponsiveSpan
  ) => {
    console.log("updateCardSize called with:", cardId, colSpan, rowSpan);

    // Ensure all span values are numbers
    const normalizedColSpan = {
      sm: Number(colSpan.sm || 1),
      md: Number(colSpan.md || 1),
      lg: Number(colSpan.lg || 1),
    };

    const normalizedRowSpan = {
      sm: Number(rowSpan.sm || 1),
      md: Number(rowSpan.md || 1),
      lg: Number(rowSpan.lg || 1),
    };

    console.log("Normalized spans:", normalizedColSpan, normalizedRowSpan);

    setGridConfig((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              colSpan: { ...card.colSpan, ...normalizedColSpan },
              rowSpan: { ...card.rowSpan, ...normalizedRowSpan },
            }
          : card
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
          colSpan: { lg: 1, md: 1, sm: 1 },
          rowSpan: { lg: 1, md: 1, sm: 1 },
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
    // Generate React component code
    let reactCode = "";
    let cssCode = "";

    // Generate responsive grid classes
    const gridClasses = [];

    // Base grid (mobile/sm)
    gridClasses.push(`grid-cols-${gridConfig.columns.sm}`);
    gridClasses.push(`gap-${gridConfig.gap.sm}`);

    // Medium screens (md)
    if (gridConfig.columns.md !== gridConfig.columns.sm) {
      gridClasses.push(`md:grid-cols-${gridConfig.columns.md}`);
    }
    if (gridConfig.gap.md !== gridConfig.gap.sm) {
      gridClasses.push(`md:gap-${gridConfig.gap.md}`);
    }

    // Large screens (lg/desktop)
    if (gridConfig.columns.lg !== gridConfig.columns.md) {
      gridClasses.push(`lg:grid-cols-${gridConfig.columns.lg}`);
    }
    if (gridConfig.gap.lg !== gridConfig.gap.md) {
      gridClasses.push(`lg:gap-${gridConfig.gap.lg}`);
    }

    const gridTemplateClasses = gridClasses.join(" ");

    // Check if we need to import chart components
    const hasCharts = gridConfig.cards.some((card) =>
      ["bar-chart", "pie-chart", "line-chart", "donut-chart"].includes(
        card.content.template
      )
    );

    // Start building React component code
    reactCode += `import React from "react";\n`;
    reactCode += `import { Card, CardContent } from "@/components/ui/card";\n`;

    if (hasCharts && gridConfig.useRechartsForExport) {
      reactCode += `import { BarChart, Bar, PieChart, Pie, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";\n`;
    }

    reactCode += `\n`;
    reactCode += `export function BentoGrid() {\n`;
    reactCode += `  return (\n`;
    reactCode += `    <div className="grid ${gridTemplateClasses}">\n`;

    // Sort cards by order before generating code
    const sortedCards = [...gridConfig.cards].sort((a, b) => a.order - b.order);

    sortedCards.forEach((card) => {
      // Generate responsive column and row span classes
      const colSpanClasses = [];
      const rowSpanClasses = [];

      // Base spans (mobile/sm)
      colSpanClasses.push(`col-span-${card.colSpan.sm}`);
      rowSpanClasses.push(`row-span-${card.rowSpan.sm}`);

      // Medium screens (md)
      if (card.colSpan.md !== card.colSpan.sm) {
        colSpanClasses.push(`md:col-span-${card.colSpan.md}`);
      }
      if (card.rowSpan.md !== card.rowSpan.sm) {
        rowSpanClasses.push(`md:row-span-${card.rowSpan.md}`);
      }

      // Large screens (lg/desktop)
      if (card.colSpan.lg !== card.colSpan.md) {
        colSpanClasses.push(`lg:col-span-${card.colSpan.lg}`);
      }
      if (card.rowSpan.lg !== card.rowSpan.md) {
        rowSpanClasses.push(`lg:row-span-${card.rowSpan.lg}`);
      }

      const colSpanClass = colSpanClasses.join(" ");
      const rowSpanClass = rowSpanClasses.join(" ");

      // Generate card styles
      const cardClasses = [];

      // Border
      if (card.style.border) {
        cardClasses.push("border");
        if (card.style.borderWidth > 1) {
          cardClasses.push(`border-${card.style.borderWidth}`);
        }
      }

      // Border radius
      if (card.style.borderRadius !== "none") {
        cardClasses.push(`rounded-${card.style.borderRadius}`);
      } else {
        cardClasses.push("rounded-none");
      }

      // Shadow
      const shadowClass = generateShadowClass(card.style.shadow);
      if (shadowClass) {
        cardClasses.push(shadowClass);
      }

      // Animation
      let animationClass = "";
      if (card.style.animation !== "none") {
        animationClass = `bento-${card.style.animation}`;
        cardClasses.push(animationClass);
      }

      // Hover effect
      let hoverClass = "";
      if (card.style.hoverEffect !== "none") {
        hoverClass = `bento-hover-${card.style.hoverEffect}`;
        cardClasses.push(hoverClass);
      }

      // Background and text colors
      let bgStyle = "";
      let textStyle = "";
      let inlineStyle = "";

      // Handle background color and glassmorphism
      if (card.style.glassmorphism) {
        inlineStyle = ` style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, ${card.style.glassmorphismOpacity})' }}`;
      } else if (card.style.backgroundColor) {
        bgStyle = ` bg-[${card.style.backgroundColor}]`;
      }

      if (card.style.textColor) {
        textStyle = ` text-[${card.style.textColor}]`;
      }

      // Construct final class attribute
      const cardClassStr = cardClasses.length
        ? ` ${cardClasses.join(" ")}`
        : "";

      // Start building card JSX
      reactCode += `      <div className="${colSpanClass} ${rowSpanClass}">\n`;
      reactCode += `        <Card className="h-full${cardClassStr}${bgStyle}${textStyle}"${inlineStyle}>\n`;
      reactCode += `          <CardContent className="p-4">\n`;

      // Card content based on template
      switch (card.content.template) {
        case "text-only":
          reactCode += `            <p>${card.content.text}</p>\n`;
          break;

        case "heading-text":
          reactCode += `            <h3 className="text-lg font-semibold mb-2">${
            card.content.heading || "Heading"
          }</h3>\n`;
          reactCode += `            <p>${card.content.text}</p>\n`;
          break;

        case "image-top":
          reactCode += `            <div className="space-y-4">\n`;
          reactCode += `              <div className="w-full aspect-video overflow-hidden rounded-md">\n`;
          reactCode += `                <img src="${
            card.content.imageUrl || "/placeholder.svg?height=100&width=100"
          }" alt="Card image" className="w-full h-full object-cover" />\n`;
          reactCode += `              </div>\n`;
          if (card.content.heading) {
            reactCode += `              <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
          }
          reactCode += `              <p>${card.content.text}</p>\n`;
          reactCode += `            </div>\n`;
          break;

        case "image-bottom":
          reactCode += `            <div className="space-y-4">\n`;
          if (card.content.heading) {
            reactCode += `              <h3 className="text-lg font-semibold">${card.content.heading}</h3>\n`;
          }
          reactCode += `              <p>${card.content.text}</p>\n`;
          reactCode += `              <div className="w-full aspect-video overflow-hidden rounded-md">\n`;
          reactCode += `                <img src="${
            card.content.imageUrl || "/placeholder.svg?height=100&width=100"
          }" alt="Card image" className="w-full h-full object-cover" />\n`;
          reactCode += `              </div>\n`;
          reactCode += `            </div>\n`;
          break;

        case "image-side":
          reactCode += `            <div className="flex ${
            card.content.imagePosition === "right"
              ? "flex-row-reverse"
              : "flex-row"
          } gap-4">\n`;
          reactCode += `              <div className="w-1/3 aspect-square overflow-hidden rounded-md">\n`;
          reactCode += `                <img src="${
            card.content.imageUrl || "/placeholder.svg?height=100&width=100"
          }" alt="Card image" className="w-full h-full object-cover" />\n`;
          reactCode += `              </div>\n`;
          reactCode += `              <div className="flex-1">\n`;
          if (card.content.heading) {
            reactCode += `                <h3 className="text-lg font-semibold mb-2">${card.content.heading}</h3>\n`;
          }
          reactCode += `                <p>${card.content.text}</p>\n`;
          reactCode += `              </div>\n`;
          reactCode += `            </div>\n`;
          break;

        // Handle remaining templates (similar to your existing code)
        // ... other templates

        default:
          reactCode += `            <p>${card.content.text}</p>\n`;
      }

      reactCode += `          </CardContent>\n`;
      reactCode += `        </Card>\n`;
      reactCode += `      </div>\n`;
    });

    reactCode += `    </div>\n`;
    reactCode += `  );\n`;
    reactCode += `}\n`;

    // Build CSS code with animations and hover effects
    cssCode += `/* BentoGrid Animations and Effects */\n\n`;
    cssCode += `/* Animations */\n`;
    cssCode += `@keyframes fadeIn {\n`;
    cssCode += `  from { opacity: 0; }\n`;
    cssCode += `  to { opacity: 1; }\n`;
    cssCode += `}\n\n`;

    cssCode += `@keyframes slideUp {\n`;
    cssCode += `  from { transform: translateY(20px); opacity: 0; }\n`;
    cssCode += `  to { transform: translateY(0); opacity: 1; }\n`;
    cssCode += `}\n\n`;

    cssCode += `@keyframes slideDown {\n`;
    cssCode += `  from { transform: translateY(-20px); opacity: 0; }\n`;
    cssCode += `  to { transform: translateY(0); opacity: 1; }\n`;
    cssCode += `}\n\n`;

    cssCode += `@keyframes slideLeft {\n`;
    cssCode += `  from { transform: translateX(20px); opacity: 0; }\n`;
    cssCode += `  to { transform: translateX(0); opacity: 1; }\n`;
    cssCode += `}\n\n`;

    cssCode += `@keyframes slideRight {\n`;
    cssCode += `  from { transform: translateX(-20px); opacity: 0; }\n`;
    cssCode += `  to { transform: translateX(0); opacity: 1; }\n`;
    cssCode += `}\n\n`;

    cssCode += `@keyframes scaleUp {\n`;
    cssCode += `  from { transform: scale(0.8); opacity: 0; }\n`;
    cssCode += `  to { transform: scale(1); opacity: 1; }\n`;
    cssCode += `}\n\n`;

    cssCode += `@keyframes scaleDown {\n`;
    cssCode += `  from { transform: scale(1.2); opacity: 0; }\n`;
    cssCode += `  to { transform: scale(1); opacity: 1; }\n`;
    cssCode += `}\n\n`;

    cssCode += `@keyframes bounce {\n`;
    cssCode += `  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n`;
    cssCode += `  40% { transform: translateY(-20px); }\n`;
    cssCode += `  60% { transform: translateY(-10px); }\n`;
    cssCode += `}\n\n`;

    cssCode += `@keyframes pulse {\n`;
    cssCode += `  0% { transform: scale(1); }\n`;
    cssCode += `  50% { transform: scale(1.05); }\n`;
    cssCode += `  100% { transform: scale(1); }\n`;
    cssCode += `}\n\n`;

    cssCode += `@keyframes spin {\n`;
    cssCode += `  from { transform: rotate(0deg); }\n`;
    cssCode += `  to { transform: rotate(360deg); }\n`;
    cssCode += `}\n\n`;

    cssCode += `/* Applied Animation Classes */\n`;
    cssCode += `.bento-fade-in {\n`;
    cssCode += `  animation: fadeIn 1s forwards;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-slide-up {\n`;
    cssCode += `  animation: slideUp 1s forwards;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-slide-down {\n`;
    cssCode += `  animation: slideDown 1s forwards;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-slide-left {\n`;
    cssCode += `  animation: slideLeft 1s forwards;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-slide-right {\n`;
    cssCode += `  animation: slideRight 1s forwards;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-scale-up {\n`;
    cssCode += `  animation: scaleUp 1s forwards;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-scale-down {\n`;
    cssCode += `  animation: scaleDown 1s forwards;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-bounce {\n`;
    cssCode += `  animation: bounce 1s forwards;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-pulse {\n`;
    cssCode += `  animation: pulse 1s infinite;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-spin {\n`;
    cssCode += `  animation: spin 2s linear infinite;\n`;
    cssCode += `}\n\n`;

    cssCode += `/* Hover Effects */\n`;
    cssCode += `.bento-hover-scale:hover {\n`;
    cssCode += `  transform: scale(1.05);\n`;
    cssCode += `  transition: transform 0.3s ease;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-hover-lift:hover {\n`;
    cssCode += `  transform: translateY(-5px);\n`;
    cssCode += `  transition: transform 0.3s ease;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-hover-glow:hover {\n`;
    cssCode += `  box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.5);\n`;
    cssCode += `  transition: box-shadow 0.3s ease;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-hover-border-glow:hover {\n`;
    cssCode += `  box-shadow: inset 0 0 0 2px hsl(var(--primary));\n`;
    cssCode += `  transition: box-shadow 0.3s ease;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-hover-background-shift:hover {\n`;
    cssCode += `  background-color: hsl(var(--primary) / 0.1);\n`;
    cssCode += `  transition: background-color 0.3s ease;\n`;
    cssCode += `}\n\n`;

    cssCode += `.bento-hover-text-shift:hover {\n`;
    cssCode += `  color: hsl(var(--primary));\n`;
    cssCode += `  transition: color 0.3s ease;\n`;
    cssCode += `}\n`;

    return { reactCode, cssCode };
  };

  const copyToClipboard = () => {
    const { reactCode, cssCode } = generateCode();
    const combinedCode = reactCode + "\n\n" + cssCode;
    navigator.clipboard.writeText(combinedCode);
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
        updateGridColumns,
        updateGridGap,
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
