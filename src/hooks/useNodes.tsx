// src/hooks/usePosts/index.ts
import { useQuery } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { GET_CONTENT_NODES_QUERY } from "../graphql/queries.ts";

const PAGE_LENGTH = 5;
const PAGE_MAX = 20;

export const useNodes = () => {
  const { data, fetchMore, loading, error } = useQuery(
    GET_CONTENT_NODES_QUERY,
    {
      variables: {
        // pagination variables
        // before: beforeValue,
        // after: afterValue,
        first: PAGE_LENGTH,
        // last: lastValue,
      },
    }
  );

  const nodes = useMemo(
    () => data?.Admin?.Tree?.GetContentNodes?.edges ?? [],
    [data]
  );

  const fetchMoreNodes = useCallback(() => {
    if (nodes.length === PAGE_MAX) return;

    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        // updateQuery
        return fetchMoreResult;
      },
      variables: {
        // pagination variables
        // before: beforeValue,
        // after: afterValue,
        first: nodes.length + PAGE_LENGTH,
        // last: lastValue,
      },
    });
  }, [fetchMore, nodes]);

  return { fetchMoreNodes, loading, nodes, error };
};
