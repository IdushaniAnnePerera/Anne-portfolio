// Sprite frames and audio no longer used.
// Stubs kept so LoadingScreen.jsx and App.jsx don't need changes.
export const assetCache = {
  isLoaded: true,
  isChatAssetsLoaded: true,
  heroIdle: [],
  heroMove: [],
  chatbotAvatar: [],
  audio: {},
  progress: 100,
  listeners: [],
};

export const preloadAllAssets = () => Promise.resolve();
export const preloadDeferredAssets = () => Promise.resolve();
