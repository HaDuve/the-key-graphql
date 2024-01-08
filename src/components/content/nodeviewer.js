import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTENT_NODES_QUERY } from "../../graphql/queries.ts";

const NodeViewer = () => {
  const { loading, error, data } = useQuery(GET_CONTENT_NODES_QUERY);

  // Use data from GET_CONTENT_NODES_QUERY
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const contentNodes = data?.Admin?.Tree?.GetContentNodes || [];
  //   Display content nodes
  return (
    <div className="App">
      <header className="App-header">
        {/* Your other elements */}
        <div>
          <h2>Content Nodes:</h2>
          <ul>
            {contentNodes.map((node, index) => (
              <li key={index}>{node?.structureDefinition?.title}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default NodeViewer;
