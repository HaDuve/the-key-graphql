import React, { useRef } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import clamp from "lodash.clamp";
import swap from "lodash-move";

import styles from "../../styles.module.css";
import { NODE_HEIGHT } from "../../constants/nodeviewerConst.ts";

function fn(
  order: number[],
  active = false,
  originalIndex = 0,
  curIndex = 0,
  y = 0
) {
  return (index: number) =>
    active && index === originalIndex
      ? {
          y: curIndex * NODE_HEIGHT + y,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string) => key === "y" || key === "zIndex",
        }
      : {
          y: order.indexOf(index) * NODE_HEIGHT,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };
}

function DraggableList({
  items,
}: {
  items: { string: string; ref?: React.RefObject<HTMLDivElement> }[];
}) {
  // restore and merge order (array with indices) from localstorage
  const storedOrder = localStorage.getItem("itemOrder");
  const parsedOrder = storedOrder ? JSON.parse(storedOrder) : null;
  const parsedOrderValid =
    parsedOrder && parsedOrder.length > 0 && parsedOrder[0] != null;
  const sameLength = parsedOrderValid && parsedOrder.length === items.length;
  const correctOrder = sameLength
    ? parsedOrder
    : items.map((_, index) => {
        // 1. take the parsed order if it is valid
        // 2. push the normal indices after parsedOrder.length
        // (incase there are more items than order.length)
        if (parsedOrderValid && index < parsedOrder.length) {
          return parsedOrder[index];
        }
        return index;
      });

  const order = useRef<number[]>(correctOrder);
  if (parsedOrder) order.current = correctOrder;
  const [springs, api] = useSprings(items.length, fn(order.current));

  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * NODE_HEIGHT + y) / NODE_HEIGHT),
      0,
      items.length - 1
    );
    const newOrder = swap(order.current, curIndex, curRow);
    api.start(fn(newOrder, active, originalIndex, curIndex, y));
    if (!active) {
      order.current = newOrder;
      localStorage.setItem("itemOrder", JSON.stringify(newOrder));
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.content} style={{ height: 20 * NODE_HEIGHT }}>
        {springs.map(({ zIndex, shadow, y, scale }, i) => (
          <animated.div
            {...bind(i)}
            key={i}
            ref={items[i].ref || null}
            style={{
              zIndex,
              boxShadow: shadow.to(
                (s) => `rgba(0, 0, 0, 0.5) 0px ${s}px ${2 * s}px 0px`
              ),
              y,
              scale,
            }}
            children={items[i].string}
          />
        ))}
      </div>
    </div>
  );
}

export default DraggableList;

// // export default memoized
// export default React.memo(DraggableList, (prevProps, nextProps) => {
//   // only change if length of items changes
//   return prevProps.items.length === nextProps.items.length;
// });
