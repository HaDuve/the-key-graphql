import React from "react";
import useLayout from "../../hooks/useLayout.tsx";
import DraggableList from "./draggableList.tsx";

const NodeViewer = ({ onLogout }) => {
  const { loading, nodes, thresholdElementRef, error } = useLayout();

  if (loading) return <p>Loading...</p>;
  if (error) {
    // if 401 error logout
    if (error.message.includes("401") && onLogout) {
      onLogout();
      return null;
    }
    return <p>Error: {error.message}</p>;
  }

  const items: { string: string; ref?: React.RefObject<HTMLDivElement> }[] =
    nodes?.map((edge, index) => {
      return {
        string: edge.node?.structureDefinition?.title || "",
        ref: nodes.length === index + 1 ? thresholdElementRef : undefined,
      };
    }) || [];

  return <DraggableList items={items}></DraggableList>;
};

export default NodeViewer;
