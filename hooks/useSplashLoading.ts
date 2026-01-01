import { atom } from "jotai";
import React from "react";
import { useAppLevelAtom } from "./app-level-store";

const loadingStateAtom = atom<Record<string, boolean>>({});

export const useSplashLoading = (stateKey: string) => {
  const [value, set] = useAppLevelAtom(loadingStateAtom);

  const setLoading = React.useCallback(
    (value: boolean) => {
      set((prev) => ({ ...prev, [stateKey]: value }));
    },
    [set, stateKey]
  );

  return [value, setLoading] as const;
};
