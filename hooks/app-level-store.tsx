import { createIsolation } from 'jotai-scope';

/**
 * It doesn't reset for logout
 */
export const {
  Provider: AppJotaiStoreProvider,
  useAtom: useAppLevelAtom,
  useAtomValue: useAppLevelAtomValue,
  useSetAtom: useSetAppLevelAtom,
} = createIsolation();
