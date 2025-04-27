"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useBentoGrid } from "../bento-grid-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BentoCard, ContentTemplate } from "@/types";

export function CardContentFields({ card }: { card: BentoCard }) {
  const { updateCardContent } = useBentoGrid();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Content Type</h3>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <Select
              value={card.content.template}
              onValueChange={(value: ContentTemplate) => {
                updateCardContent(card.id, { template: value });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text-only">Text Only</SelectItem>
                <SelectItem value="heading-text">Heading + Text</SelectItem>
                <SelectItem value="image-top">Image (Top) + Text</SelectItem>
                <SelectItem value="image-bottom">
                  Image (Bottom) + Text
                </SelectItem>
                <SelectItem value="image-side">Image (Side) + Text</SelectItem>
                <SelectItem value="two-images">Two Images + Text</SelectItem>
              </SelectContent>
            </Select>
          </TabsContent>
          <TabsContent value="dashboard">
            <Select
              value={card.content.template}
              onValueChange={(value: ContentTemplate) => {
                updateCardContent(card.id, { template: value });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stat-card">Stat Card</SelectItem>
                <SelectItem value="pie-chart">Pie Chart</SelectItem>
                <SelectItem value="bar-chart">Bar Chart</SelectItem>
                <SelectItem value="progress-card">Progress Card</SelectItem>
              </SelectContent>
            </Select>
          </TabsContent>
          <TabsContent value="marketing">
            <Select
              value={card.content.template}
              onValueChange={(value: ContentTemplate) => {
                updateCardContent(card.id, { template: value });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cta-card">CTA Card</SelectItem>
                <SelectItem value="testimonial">Testimonial</SelectItem>
                <SelectItem value="feature-card">Feature Card</SelectItem>
              </SelectContent>
            </Select>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">{renderContentFields(card)}</div>
    </div>
  );
}

function renderContentFields(card: BentoCard) {
  const { id, content } = card;
  const { updateCardContent } = useBentoGrid();

  switch (content.template) {
    case "heading-text":
    case "image-top":
    case "image-bottom":
    case "feature-card":
      return (
        <>
          <div>
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              value={content.heading || ""}
              onChange={(e) =>
                updateCardContent(id, { heading: e.target.value })
              }
              placeholder="Card Heading"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="text">Text Content</Label>
            <Textarea
              id="text"
              value={content.text}
              onChange={(e) => updateCardContent(id, { text: e.target.value })}
              placeholder="Card content"
              className="mt-1"
            />
          </div>
          {(content.template === "image-top" ||
            content.template === "image-bottom") && (
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={content.imageUrl || ""}
                onChange={(e) =>
                  updateCardContent(id, { imageUrl: e.target.value })
                }
                placeholder="/placeholder.svg?height=100&width=200"
                className="mt-1"
              />
            </div>
          )}
          {content.template === "feature-card" && (
            <div>
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={content.icon || ""}
                onValueChange={(value) =>
                  updateCardContent(id, { icon: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BarChart3">Chart</SelectItem>
                  <SelectItem value="Layers">Layers</SelectItem>
                  <SelectItem value="Megaphone">Megaphone</SelectItem>
                  <SelectItem value="LineChart">Line Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </>
      );
    case "image-side":
      return (
        <>
          <div>
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              value={content.heading || ""}
              onChange={(e) =>
                updateCardContent(id, { heading: e.target.value })
              }
              placeholder="Card Heading"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="text">Text Content</Label>
            <Textarea
              id="text"
              value={content.text}
              onChange={(e) => updateCardContent(id, { text: e.target.value })}
              placeholder="Card content"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={content.imageUrl || ""}
              onChange={(e) =>
                updateCardContent(id, { imageUrl: e.target.value })
              }
              placeholder="/placeholder.svg?height=100&width=100"
              className="mt-1"
            />
          </div>
          <div className="space-y-2">
            <Label>Image Position</Label>
            <RadioGroup
              value={content.imagePosition || "left"}
              onValueChange={(value: "left" | "right") =>
                updateCardContent(id, { imagePosition: value })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="left" id="left" />
                <Label htmlFor="left">Left</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="right" id="right" />
                <Label htmlFor="right">Right</Label>
              </div>
            </RadioGroup>
          </div>
        </>
      );
    case "two-images":
      return (
        <>
          <div>
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              value={content.heading || ""}
              onChange={(e) =>
                updateCardContent(id, { heading: e.target.value })
              }
              placeholder="Card Heading"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="text">Text Content</Label>
            <Textarea
              id="text"
              value={content.text}
              onChange={(e) => updateCardContent(id, { text: e.target.value })}
              placeholder="Card content"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="image1">First Image URL</Label>
            <Input
              id="image1"
              value={content.imageUrl || ""}
              onChange={(e) =>
                updateCardContent(id, { imageUrl: e.target.value })
              }
              placeholder="/placeholder.svg?height=100&width=100"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="image2">Second Image URL</Label>
            <Input
              id="image2"
              value={content.imageUrl2 || ""}
              onChange={(e) =>
                updateCardContent(id, { imageUrl2: e.target.value })
              }
              placeholder="/placeholder.svg?height=100&width=100"
              className="mt-1"
            />
          </div>
        </>
      );
    case "stat-card":
      return (
        <>
          <div>
            <Label htmlFor="heading">Label</Label>
            <Input
              id="heading"
              value={content.heading || ""}
              onChange={(e) =>
                updateCardContent(id, { heading: e.target.value })
              }
              placeholder="Metric Label"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={content.statData?.value || ""}
              onChange={(e) =>
                updateCardContent(id, {
                  // @ts-ignore
                  statData: { ...content.statData, value: e.target.value },
                })
              }
              placeholder="42"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Trend</Label>
            <Select
              value={content.statData?.trend || "neutral"}
              onValueChange={(value: "up" | "down" | "neutral") =>
                updateCardContent(id, {
                  // @ts-ignore
                  statData: { ...content.statData, trend: value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="up">Up</SelectItem>
                <SelectItem value="down">Down</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="trendValue">Trend Value</Label>
            <Input
              id="trendValue"
              value={content.statData?.trendValue || ""}
              onChange={(e) =>
                updateCardContent(id, {
                  // @ts-ignore
                  statData: { ...content.statData, trendValue: e.target.value },
                })
              }
              placeholder="12%"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="text">Description</Label>
            <Input
              id="text"
              value={content.text}
              onChange={(e) => updateCardContent(id, { text: e.target.value })}
              placeholder="vs last month"
              className="mt-1"
            />
          </div>
        </>
      );
    case "pie-chart":
    case "bar-chart":
      return (
        <>
          <div>
            <Label htmlFor="heading">Chart Title</Label>
            <Input
              id="heading"
              value={content.heading || ""}
              onChange={(e) =>
                updateCardContent(id, { heading: e.target.value })
              }
              placeholder="Chart Title"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="chartLabels">Chart Labels (comma separated)</Label>
            <Input
              id="chartLabels"
              value={content.chartData?.labels?.join(", ") || ""}
              onChange={(e) => {
                const labels = e.target.value
                  .split(",")
                  .map((label) => label.trim());
                updateCardContent(id, {
                  chartData: {
                    ...content.chartData,
                    labels,
                    // Ensure we have matching values for each label
                    values: labels.map(
                      (_, i) => content.chartData?.values?.[i] || 0
                    ),
                  },
                });
              }}
              placeholder="Group A, Group B, Group C"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="chartValues">Chart Values (comma separated)</Label>
            <Input
              id="chartValues"
              value={content.chartData?.values?.join(", ") || ""}
              onChange={(e) => {
                const values = e.target.value
                  .split(",")
                  .map((value) => Number.parseInt(value.trim()) || 0);
                updateCardContent(id, {
                  // @ts-ignore
                  chartData: {
                    ...content.chartData,
                    values,
                  },
                });
              }}
              placeholder="400, 300, 200"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="text">Description</Label>
            <Input
              id="text"
              value={content.text}
              onChange={(e) => updateCardContent(id, { text: e.target.value })}
              placeholder="Chart description"
              className="mt-1"
            />
          </div>
        </>
      );
    case "progress-card":
      return (
        <>
          <div>
            <Label htmlFor="heading">Card Title</Label>
            <Input
              id="heading"
              value={content.heading || ""}
              onChange={(e) =>
                updateCardContent(id, { heading: e.target.value })
              }
              placeholder="Progress Title"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="progressLabel">Progress Label</Label>
            <Input
              id="progressLabel"
              value={content.statData?.label || ""}
              onChange={(e) =>
                updateCardContent(id, {
                  // @ts-ignore
                  statData: { ...content.statData, label: e.target.value },
                })
              }
              placeholder="Completion"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="progressValue">Progress Value (%)</Label>
            <Input
              id="progressValue"
              type="number"
              min="0"
              max="100"
              value={content.statData?.value || "50"}
              onChange={(e) =>
                updateCardContent(id, {
                  // @ts-ignore
                  statData: { ...content.statData, value: e.target.value },
                })
              }
              placeholder="50"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="text">Description</Label>
            <Input
              id="text"
              value={content.text}
              onChange={(e) => updateCardContent(id, { text: e.target.value })}
              placeholder="Progress description"
              className="mt-1"
            />
          </div>
        </>
      );
    case "cta-card":
      return (
        <>
          <div>
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              value={content.heading || ""}
              onChange={(e) =>
                updateCardContent(id, { heading: e.target.value })
              }
              placeholder="Call to Action Heading"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="text">Description</Label>
            <Textarea
              id="text"
              value={content.text}
              onChange={(e) => updateCardContent(id, { text: e.target.value })}
              placeholder="Call to action description"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="ctaText">Button Text</Label>
            <Input
              id="ctaText"
              value={content.ctaText || ""}
              onChange={(e) =>
                updateCardContent(id, { ctaText: e.target.value })
              }
              placeholder="Get Started"
              className="mt-1"
            />
          </div>
        </>
      );
    case "testimonial":
      return (
        <>
          <div>
            <Label htmlFor="text">Testimonial</Label>
            <Textarea
              id="text"
              value={content.text}
              onChange={(e) => updateCardContent(id, { text: e.target.value })}
              placeholder="Customer testimonial"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="author">Author Name</Label>
            <Input
              id="author"
              value={content.author || ""}
              onChange={(e) =>
                updateCardContent(id, { author: e.target.value })
              }
              placeholder="John Doe"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="role">Author Role</Label>
            <Input
              id="role"
              value={content.role || ""}
              onChange={(e) => updateCardContent(id, { role: e.target.value })}
              placeholder="CEO, Company Inc."
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="avatar">Author Avatar URL</Label>
            <Input
              id="avatar"
              value={content.imageUrl || ""}
              onChange={(e) =>
                updateCardContent(id, { imageUrl: e.target.value })
              }
              placeholder="/placeholder.svg?height=50&width=50"
              className="mt-1"
            />
          </div>
        </>
      );
    case "text-only":
    default:
      return (
        <div>
          <Label htmlFor="text">Text Content</Label>
          <Textarea
            id="text"
            value={content.text}
            onChange={(e) => updateCardContent(id, { text: e.target.value })}
            placeholder="Card content"
            className="mt-1"
          />
        </div>
      );
  }
}
