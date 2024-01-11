import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTENT_NODES_QUERY } from "../../graphql/queries.ts";

const NodeViewer = () => {
  // const beforeValue = "null";
  // const afterValue = "null";
  const firstValue = 10;
  // const lastValue = 0;

  const { loading, error, data } = useQuery(GET_CONTENT_NODES_QUERY, {
    variables: {
      // pagination variables
      // before: beforeValue,
      // after: afterValue,
      first: firstValue,
      // last: lastValue,
    },
  });

  const contentNodes = data?.Admin?.Tree?.GetContentNodes || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Content Nodes</h2>
      <ul>
        {contentNodes.edges?.map((edge, index) => (
          <li key={index}>{edge.node?.structureDefinition?.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default NodeViewer;
