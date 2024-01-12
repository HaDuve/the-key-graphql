// SortableList.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  CARD: "card",
};

const DraggableNode = ({ id, children, index, moveCard }) => {
  const [, ref] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (draggedItem: { id: string; index: number }) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{ padding: "8px", border: "1px solid #ccc", marginBottom: "4px" }}
    >
      {children}
    </div>
  );
};

export default DraggableNode;
