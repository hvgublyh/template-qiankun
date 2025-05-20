if (window.__POWERED_BY_QIANKUN__) {
  // Vite 不使用 __webpack_public_path__，而是使用 import.meta.url
  // 我们可以通过动态设置 window.__VITE_PUBLIC_PATH__ 来处理
  window.__VITE_PUBLIC_PATH__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  
  // 对于使用绝对路径的资源，可以提供一个辅助函数
  window.getPublicPath = (path) => {
    return window.__POWERED_BY_QIANKUN__ 
      ? `${window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__.replace(/\/$/, '')}${path}`
      : path;
  };
}