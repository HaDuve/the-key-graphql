import { THRESHOLD_ELEMENT_ROOT_MARGIN } from '../constants/nodeviewerConst.ts'
import useInfiniteScroll from './useInfiniteScroll.ts'
import { useNodes } from './useNodes.ts'

const useLayout = () => {
  const { fetchMoreNodes, loading, nodes, error } = useNodes()

  const { thresholdElementRef } = useInfiniteScroll({
    fetchNextPage: fetchMoreNodes,
    options: { rootMargin: THRESHOLD_ELEMENT_ROOT_MARGIN },
  })

  return { loading, nodes, thresholdElementRef, error }
}

export default useLayout
