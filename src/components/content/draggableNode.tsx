// SortableList.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  CARD: "card",
};

const DraggableNode = ({ id, children, index, order, moveCard }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (
      draggedItem: { id: string; index: number; order: number },
      monitor
    ) => {
      const dragId = monitor.getItem().id;
      const hoverId = id;
      if (dragId === hoverId) {
        return;
      }
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  const zIndex = isDragging ? 2 : 1;
  const backgroundColor = isOver ? "#555" : "#999";
  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{
        zIndex,
        opacity,
        backgroundColor,
        padding: "8px",
        border: "1px solid #ccc",
        margin: "8px",
        cursor: "move",
        minWidth: "50vw",
        minHeight: "30vh",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableNode;
