// src/hooks/usePosts/index.ts
import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GET_CONTENT_NODES_QUERY } from "../graphql/queries.ts";
import { PAGE_MAX, PAGE_MIN } from "../constants/nodeviewerConst.ts";

export const useNodes = () => {
  const storedMinPageLength = localStorage.getItem("minPageLength");
  const initialPageLength = storedMinPageLength
    ? parseInt(storedMinPageLength)
    : PAGE_MIN;

  console.log("useNodes ~ initialPageLength:", initialPageLength);
  const { data, fetchMore, loading, error } = useQuery(
    GET_CONTENT_NODES_QUERY,
    {
      variables: {
        // pagination variables
        // before: beforeValue,
        // after: afterValue,
        first: initialPageLength,
        // last: lastValue,
      },
    }
  );

  useEffect(() => {
    localStorage.setItem("minPageLength", initialPageLength.toString());
  }, [initialPageLength]);

  const nodes = useMemo(
    () => data?.Admin?.Tree?.GetContentNodes?.edges ?? [],
    [data]
  );

  const fetchMoreNodes = useCallback(() => {
    let deltaLength = 0;
    const longerPageLength = nodes.length + PAGE_MIN;
    if (longerPageLength > PAGE_MAX) {
      if (nodes.length > PAGE_MAX - PAGE_MIN && nodes.length < PAGE_MAX) {
        // set delta until max
        deltaLength = PAGE_MAX - nodes.length;
      } else {
        console.log("useNodes ~ max page length reached", deltaLength);
        return;
      }
    }
    const newPageLength =
      deltaLength !== 0 ? nodes.length + deltaLength : longerPageLength;

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
        first: newPageLength,
        // last: lastValue,
      },
    });
    if (newPageLength > initialPageLength) {
      localStorage.setItem("minPageLength", newPageLength.toString());
    }
  }, [fetchMore, nodes.length, initialPageLength]);

  return { fetchMoreNodes, loading, nodes, error };
};
