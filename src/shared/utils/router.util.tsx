import React, { type LazyExoticComponent } from "react";

export const lazyLoad = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
): LazyExoticComponent<React.ComponentType<any>> => {
  return React.lazy(importFunc);
};
