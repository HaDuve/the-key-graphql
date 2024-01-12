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
              style={{
                minHeight: "30vh",
                minWidth: "30vw",
                border: "1px solid black",
                margin: "1rem",
                padding: "1rem",
                listStyle: "none",
                backgroundColor: "darkgray",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
              ref={nodes.length === index + 1 ? thresholdElementRef : null}
            >
              {edge.node?.structureDefinition?.title}
            </li>
          );
        }) ?? []}
      </ul>
    </div>
  );
};

export default NodeViewer;
