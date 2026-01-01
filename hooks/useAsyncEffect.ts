import React from "react";

export type AsyncSubscribedRef = {
  isMounted: () => boolean;
  unsubscriber?: () => void;
};

export type AsyncEffectCallback = (
  subscribedRef: AsyncSubscribedRef
) => Promise<void>;

export const useAsyncEffect = (
  effect: AsyncEffectCallback,
  deps?: React.DependencyList
) => {
  React.useEffect(() => {
    let mounted = true;

    const subscribedRef: AsyncSubscribedRef = {
      isMounted: () => mounted,
    };

    void effect(subscribedRef);

    return () => {
      mounted = false;
      subscribedRef.unsubscriber?.();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
