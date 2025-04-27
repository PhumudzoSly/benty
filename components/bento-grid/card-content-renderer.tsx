"use client";

// Remove unused imports: Progress, Button, Avatar, AvatarFallback, AvatarImage, ResponsiveContainer, Legend, Rectangle, RechartsTooltip, CartesianGrid
import {
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Quote,
  type LucideIcon,
  Zap,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  // CartesianGrid, // Removed
  // Tooltip as RechartsTooltip, // Removed
  LineChart as RechartsLineChart,
  Line,
  // Legend, // Removed
  // Rectangle, // Removed
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BentoCard } from "@/types";
import { Progress } from "@/components/ui/progress"; // Keep Progress for progress-card
import { Button } from "@/components/ui/button"; // Keep Button for cta-card
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Keep Avatar for testimonial

// Map icon names (strings) to actual Lucide components
// Add more icons here and import them above as needed
const iconMap: { [key: string]: LucideIcon } = {
  zap: Zap,
  shield: ShieldCheck,
  rocket: Rocket,
};

export function CardContentRenderer({ card }: { card: BentoCard }) {
  const { content } = card;

  switch (content.template) {
    case "heading-text":
      return (
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2">{content.heading}</h3>
          <p>{content.text}</p>
        </div>
      );
    case "image-top":
      return (
        <div className="flex flex-col gap-4 w-full">
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img
              src={content.imageUrl || "/placeholder.svg?height=100&width=200"}
              alt="Card image"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            {content.heading && (
              <h3 className="text-lg font-semibold mb-2">{content.heading}</h3>
            )}
            <p>{content.text}</p>
          </div>
        </div>
      );
    case "image-bottom":
      return (
        <div className="flex flex-col gap-4 w-full">
          <div>
            {content.heading && (
              <h3 className="text-lg font-semibold mb-2">{content.heading}</h3>
            )}
            <p>{content.text}</p>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img
              src={content.imageUrl || "/placeholder.svg?height=100&width=200"}
              alt="Card image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    case "image-side":
      return (
        <div
          className={`flex ${
            content.imagePosition === "right" ? "flex-row-reverse" : "flex-row"
          } gap-4 w-full`}
        >
          <div className="w-1/3 aspect-square overflow-hidden rounded-md">
            <img
              src={content.imageUrl || "/placeholder.svg?height=100&width=100"}
              alt="Card image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            {content.heading && (
              <h3 className="text-lg font-semibold mb-2">{content.heading}</h3>
            )}
            <p>{content.text}</p>
          </div>
        </div>
      );
    case "two-images":
      return (
        <div className="space-y-4 w-full">
          {content.heading && (
            <h3 className="text-lg font-semibold">{content.heading}</h3>
          )}
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-square overflow-hidden rounded-md">
              <img
                src={
                  content.imageUrl || "/placeholder.svg?height=100&width=100"
                }
                alt="First image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-md">
              <img
                src={
                  content.imageUrl2 || "/placeholder.svg?height=100&width=100"
                }
                alt="Second image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p>{content.text}</p>
        </div>
      );
    case "stat-card":
      return (
        <div className="space-y-2 w-full">
          {content.heading && (
            <h3 className="text-sm font-medium text-muted-foreground">
              {content.heading}
            </h3>
          )}
          <div className="text-3xl font-bold">
            {content.statData?.value || "0"}
          </div>
          {content.statData?.trend ? (
            <div className="flex items-center gap-1">
              {content.statData.trend === "up" ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : content.statData.trend === "down" ? (
                <ArrowDown className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              )}
              <span
                className={
                  content.statData.trend === "up"
                    ? "text-green-500 text-sm font-medium"
                    : content.statData.trend === "down"
                    ? "text-red-500 text-sm font-medium"
                    : "text-muted-foreground text-sm font-medium"
                }
              >
                {content.statData.trendValue || "0%"}
              </span>
              <span className="text-muted-foreground text-sm">
                {content.text}
              </span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{content.text}</p>
          )}
        </div>
      );
    case "pie-chart": {
      const chartData =
        content.chartData?.labels?.map((label, i) => ({
          name: label,
          value: content.chartData?.values?.[i] || 0,
          fill: content.chartData?.colors?.[i] || `hsl(var(--chart-${i + 1}))`,
        })) || [];

      const chartConfig = chartData.reduce((acc, item) => {
        acc[item.name] = {
          label: item.name,
          color: item.fill,
        };
        return acc;
      }, {} as ChartConfig);

      return (
        <div className="space-y-4 w-full h-full flex flex-col">
          {content.heading && (
            <h3 className="text-lg font-semibold text-center">
              {content.heading}
            </h3>
          )}
          <ChartContainer config={chartConfig} className="flex-1 min-h-[200px]">
            <RechartsPieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="value" hideLabel />}
              />
              <Pie data={chartData} dataKey="value" nameKey="name" label />
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </RechartsPieChart>
          </ChartContainer>
          {content.text && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              {content.text}
            </p>
          )}
        </div>
      );
    }
    case "bar-chart": {
      const chartData =
        content.chartData?.labels?.map((label, i) => ({
          label: label,
          value: content.chartData?.values?.[i] || 0,
          fill: content.chartData?.colors?.[i] || `hsl(var(--chart-${i + 1}))`,
        })) || [];

      const chartConfig = chartData.reduce(
        (acc, item) => {
          acc[item.label] = {
            label: item.label,
            color: item.fill,
          };
          return acc;
        },
        {
          value: { label: content.chartData?.values || "Value" },
        } as ChartConfig
      );

      return (
        <div className="space-y-4 w-full h-full flex flex-col">
          {content.heading && (
            <h3 className="text-lg font-semibold text-center">
              {content.heading}
            </h3>
          )}
          <ChartContainer config={chartConfig} className="flex-1 min-h-[200px]">
            <RechartsBarChart accessibilityLayer data={chartData}>
              {/* <CartesianGrid vertical={false} /> // Optional Grid */}
              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="value"
                radius={8}
                // Fill is handled by ChartContainer based on config
              />
            </RechartsBarChart>
          </ChartContainer>
          {content.text && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              {content.text}
            </p>
          )}
        </div>
      );
    }
    case "line-chart": {
      const chartData =
        content.chartData?.labels?.map((label, i) => ({
          label: label, // Use label for XAxis dataKey
          value: content.chartData?.values?.[i] || 0,
          // Assuming single line for now, color can be adapted for multi-line
          color: content.chartData?.colors?.[0] || `hsl(var(--chart-1))`,
        })) || [];

      const chartConfig = {
        value: {
          label: content.chartData?.values || "Value",
          color: content.chartData?.colors?.[0] || `hsl(var(--chart-1))`,
        },
      } satisfies ChartConfig;

      return (
        <div className="space-y-4 w-full h-full flex flex-col">
          {content.heading && (
            <h3 className="text-lg font-semibold text-center">
              {content.heading}
            </h3>
          )}
          <ChartContainer config={chartConfig} className="flex-1 min-h-[200px]">
            <RechartsLineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              {/* <CartesianGrid vertical={false} /> // Optional Grid */}
              <XAxis
                dataKey="label" // Use label from data
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)} // Example formatter
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="value"
                type="monotone"
                stroke="var(--color-value)" // Use color from config
                strokeWidth={2}
                dot={false}
              />
            </RechartsLineChart>
          </ChartContainer>
          {content.text && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              {content.text}
            </p>
          )}
        </div>
      );
    }
    case "progress-card":
      return (
        <div className="space-y-4 w-full">
          {content.heading && (
            <h3 className="text-lg font-semibold">{content.heading}</h3>
          )}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{content.statData?.label || "Progress"}</span>
              <span>{content.statData?.value || "50"}%</span>
            </div>
            <Progress
              value={Number.parseInt(content.statData?.value || "50")}
            />
          </div>
          <p className="text-sm text-muted-foreground">{content.text}</p>
        </div>
      );
    case "cta-card":
      return (
        <div className="flex flex-col justify-between h-full space-y-4">
          {content.heading && (
            <h3 className="text-xl font-bold">{content.heading}</h3>
          )}
          <p className="text-muted-foreground">{content.text}</p>
          <Button className="w-full">{content.ctaText || "Get Started"}</Button>
        </div>
      );
    case "testimonial":
      return (
        <div className="space-y-4 w-full">
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 h-6 w-6 text-muted-foreground opacity-30" />
            <p className="pl-6 italic">{content.text}</p>
          </div>
          <div className="flex items-center gap-3">
            {content.imageUrl && (
              <Avatar>
                <AvatarImage src={content.imageUrl || "/placeholder.svg"} />
                <AvatarFallback>
                  {content.author?.substring(0, 2) || "AB"}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <p className="font-semibold">{content.author || "Anonymous"}</p>
              {content.role && (
                <p className="text-sm text-muted-foreground">{content.role}</p>
              )}
            </div>
          </div>
        </div>
      );
    case "feature-card":
      const IconComponent = content.icon
        ? iconMap[content.icon.toLowerCase()]
        : null;
      return (
        <div className="flex items-start gap-4 w-full">
          {IconComponent && (
            <div className="p-2 bg-primary/10 rounded-md">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
          )}
          <div className="flex-1">
            {content.heading && (
              <h3 className="text-lg font-semibold mb-1">{content.heading}</h3>
            )}
            <p className="text-sm text-muted-foreground">{content.text}</p>
          </div>
        </div>
      );
    case "text-only":
    default:
      return (
        <div className="w-full">
          <p>{content.text}</p>
        </div>
      );
  }
}
