import React, { useEffect } from "react";
import useLayout from "../../hooks/useLayout.tsx";
import SortableList, { Item } from "./sortableList.tsx";

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
  const items: Item[] =
    nodes?.map((edge, index) => ({
      id: edge.node?.id,
      key: edge.node?.id,
      jsxElement: (
        <li
          key={edge.id}
          ref={nodes.length === index + 1 ? thresholdElementRef : null}
        >
          {edge.node?.structureDefinition?.title}
        </li>
      ),
    })) || [];

  return (
    <div>
      <h2>Content Nodes</h2>
      <ul>
        <SortableList items={items}></SortableList>
      </ul>
    </div>
  );
};

export default NodeViewer;
