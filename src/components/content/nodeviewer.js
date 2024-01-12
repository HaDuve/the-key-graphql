import React from "react";
import useLayout from "../../hooks/useLayout.tsx";

const NodeViewer = () => {
  const { loading, nodes, thresholdElementRef, error } = useLayout();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Content Nodes</h2>
      <ul>
        {nodes.map((edge, index) => {
          return (
            <li
              key={index}
              style={{ minHeight: "30vh" }}
              ref={nodes.length === index + 1 ? thresholdElementRef : null}
            >
              {index + 1 + " " + edge.node?.structureDefinition?.title}
            </li>
          );
        }) ?? []}
      </ul>
    </div>
  );
};

export default NodeViewer;
