import React, { useEffect, useState } from "react";
import DraggableNode from "./draggableNode.tsx";
import PropTypes from "prop-types";

/**
 * Represents an item in the sortable list.
 */
export type Item = {
  id: string;
  key: string;
  order?: number;
  jsxElement: JSX.Element;
};
export type SortableListProps = {
  items: Item[];
};

const SortableList = ({ items }) => {
  const [renderedItems, setRenderedItems] = useState<Item[]>(items);

  const getSortedOrderFromLocalStorage = () => {
    const savedOrder = localStorage.getItem("sortedList");
    return savedOrder ? JSON.parse(savedOrder) : null;
  };

  useEffect(() => {
    // Load sorted order from local storage on component mount
    const sortedOrder = getSortedOrderFromLocalStorage();

    if (sortedOrder) {
      // Merge the order into the items
      const mergedItems = items.map((item) => {
        const orderedItem = sortedOrder.find(
          (ordered) => ordered.id === item.id
        );
        return {
          ...item,
          order: orderedItem ? orderedItem.order : undefined,
        };
      });

      // Sort the merged items based on the order
      const sortedItems = mergedItems.sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
      setRenderedItems(sortedItems);
    } else {
      // If no sorted order, use the default items
      setRenderedItems(items);
    }
  }, [items]);

  const handleSort = (sortedItems: Item[]) => {
    const sortedIdOrder = sortedItems.map((item, index) => {
      return {
        id: item.id,
        order: index,
      };
    });
    localStorage.setItem("sortedList", JSON.stringify(sortedIdOrder));
    setRenderedItems(sortedItems);
  };

  const moveCard = (from, to) => {
    const updatedItems = [...renderedItems];
    const item = updatedItems[from];
    updatedItems.splice(from, 1);
    updatedItems.splice(to, 0, item);
    handleSort(updatedItems);
  };

  const resetOrder = () => {
    localStorage.removeItem("sortedList");
    setRenderedItems([items]);
  };
  return (
    <div>
      <p>{items.length} nodes rendered</p>
      <button onClick={resetOrder}>Reset</button>
      {renderedItems.map((item: Item, index) => {
        if (!item) return null;
        return (
          <DraggableNode
            key={item.key}
            id={item.id}
            order={item.order ?? index}
            children={item.jsxElement}
            index={index}
            moveCard={moveCard}
          />
        );
      })}
    </div>
  );
};

export default SortableList;

SortableList.propTypes = {
  // SortableListProps
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      jsxElement: PropTypes.element.isRequired,
    })
  ).isRequired,
};
