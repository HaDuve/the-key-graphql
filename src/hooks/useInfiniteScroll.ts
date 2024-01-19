import useIntersectedElement from './useIntersectedElement.ts'
import { UseIntersectedElementProps } from './useIntersectedElement.ts'

export type UseInfiniteScrollProps = {
  fetchNextPage: () => void
  options: UseIntersectedElementProps['options']
}

const useInfiniteScroll = <ThresholdElement extends Element = Element>({
  fetchNextPage,
  options,
}: UseInfiniteScrollProps) => {
  const { thresholdElementRef } = useIntersectedElement<ThresholdElement>({
    callback: fetchNextPage,
    options,
  })

  return { thresholdElementRef }
}

export default useInfiniteScroll
