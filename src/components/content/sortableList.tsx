import React from "react";
import DraggableNode from "./draggableNode.tsx";

const SortableList = ({ items, onSort }) => {
  const moveCard = (from, to) => {
    const updatedItems = [...items];
    const [removed] = updatedItems.splice(from, 1);
    updatedItems.splice(to, 0, removed);
    console.log("moveCard ~ updatedItems:", updatedItems);
    onSort(updatedItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <DraggableNode
          key={item.key}
          id={item.id}
          children={item.jsxElement}
          index={index}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

export default SortableList;
