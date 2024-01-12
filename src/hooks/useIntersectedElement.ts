import { useEffect, useMemo, useState } from "react";

export type UseIntersectedElementProps = {
  callback: () => void;
  options?: IntersectionObserverInit;
};

const useIntersectedElement = <ThresholdElement extends Element = Element>({
  callback,
  options,
}) => {
  const [thresholdElement, thresholdElementRef] =
    useState<ThresholdElement | null>(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        callback();
      }, options),
    [callback, options]
  );

  useEffect(() => {
    if (!thresholdElement) return;

    observer.observe(thresholdElement);
    return () => {
      observer.unobserve(thresholdElement);
    };
  }, [observer, thresholdElement]);

  return { thresholdElementRef };
};

export default useIntersectedElement;
