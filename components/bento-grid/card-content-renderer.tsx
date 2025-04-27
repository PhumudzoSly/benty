"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown, ArrowRight, Quote } from "lucide-react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "@/components/ui/chart";
import { BentoCard } from "@/types";

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
    case "pie-chart":
      return (
        <div className="space-y-4 w-full">
          {content.heading && (
            <h3 className="text-lg font-semibold">{content.heading}</h3>
          )}
          <div className="flex justify-center">
            <PieChart width={200} height={200}>
              <Pie
                data={
                  content.chartData?.labels && content.chartData.values
                    ? content.chartData.labels.map((label, i) => ({
                        name: label,
                        value: content.chartData?.values[i] || 0,
                        fill:
                          content.chartData?.colors?.[i] ||
                          `#${Math.floor(Math.random() * 16777215).toString(
                            16
                          )}`,
                      }))
                    : [
                        { name: "Group A", value: 400, fill: "#0088FE" },
                        { name: "Group B", value: 300, fill: "#00C49F" },
                        { name: "Group C", value: 300, fill: "#FFBB28" },
                      ]
                }
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              />
              <Tooltip />
            </PieChart>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {content.text}
          </p>
        </div>
      );
    case "bar-chart":
      return (
        <div className="space-y-4 w-full">
          {content.heading && (
            <h3 className="text-lg font-semibold">{content.heading}</h3>
          )}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={
                  content.chartData?.labels && content.chartData.values
                    ? content.chartData.labels.map((label, i) => ({
                        name: label,
                        value: content.chartData?.values[i] || 0,
                      }))
                    : [
                        { name: "Jan", value: 400 },
                        { name: "Feb", value: 300 },
                        { name: "Mar", value: 500 },
                        { name: "Apr", value: 200 },
                        { name: "May", value: 350 },
                      ]
                }
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {content.text}
          </p>
        </div>
      );
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
      const IconComponent = content.icon ? eval(content.icon) : null;
      return (
        <div className="space-y-4 w-full">
          {content.icon && (
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              {IconComponent && (
                <IconComponent className="h-5 w-5 text-primary" />
              )}
            </div>
          )}
          {content.heading && (
            <h3 className="text-lg font-semibold">{content.heading}</h3>
          )}
          <p className="text-muted-foreground">{content.text}</p>
        </div>
      );
    case "text-only":
    default:
      return <div>{content.text}</div>;
  }
}
