import useInfiniteScroll from "./useInfiniteScroll.tsx";
import { useNodes } from "./useNodes.tsx";

const useLayout = () => {
  const { fetchMoreNodes, loading, nodes, error } = useNodes();

  const { thresholdElementRef } = useInfiniteScroll({
    fetchNextPage: fetchMoreNodes,
    options: { rootMargin: "50px" },
  });

  return { loading, nodes, thresholdElementRef, error };
};

export default useLayout;
