"use client";

import { useEffect, useRef } from "react";
import { useBentoGrid } from "./bento-grid-context";
import { useScreenSize } from "@/hooks/use-screen-size";

export function GridDebug() {
  const { gridConfig } = useBentoGrid();
  const { screenSize } = useScreenSize();
  const prevGridConfigRef = useRef(gridConfig);
  const prevScreenSizeRef = useRef(screenSize);

  useEffect(() => {
    // Compare current and previous grid config
    const prevGridConfig = prevGridConfigRef.current;

    // Check if cards changed
    const currentCards = JSON.stringify(gridConfig.cards);
    const prevCards = JSON.stringify(prevGridConfig.cards);

    if (currentCards !== prevCards) {
      console.log("Cards changed!");

      // Find which cards changed
      gridConfig.cards.forEach((card) => {
        const prevCard = prevGridConfig.cards.find((c) => c.id === card.id);
        if (!prevCard) {
          console.log(`New card added: ${card.id}`);
          return;
        }

        const prevCardStr = JSON.stringify(prevCard);
        const cardStr = JSON.stringify(card);

        if (prevCardStr !== cardStr) {
          console.log(`Card ${card.id} changed:`);

          // Check if colSpan changed
          if (
            JSON.stringify(prevCard.colSpan) !== JSON.stringify(card.colSpan)
          ) {
            console.log(
              `  colSpan changed from ${JSON.stringify(
                prevCard.colSpan
              )} to ${JSON.stringify(card.colSpan)}`
            );
          }

          // Check if rowSpan changed
          if (
            JSON.stringify(prevCard.rowSpan) !== JSON.stringify(card.rowSpan)
          ) {
            console.log(
              `  rowSpan changed from ${JSON.stringify(
                prevCard.rowSpan
              )} to ${JSON.stringify(card.rowSpan)}`
            );
          }
        }
      });
    }

    // Check if screen size changed
    if (prevScreenSizeRef.current !== screenSize) {
      console.log(
        `Screen size changed from ${prevScreenSizeRef.current} to ${screenSize}`
      );
    }

    // Update refs
    prevGridConfigRef.current = gridConfig;
    prevScreenSizeRef.current = screenSize;
  }, [gridConfig, screenSize]);

  return null; // This component doesn't render anything
}
