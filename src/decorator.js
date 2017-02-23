const React = require('react');
const ExecutionEnvironment = require('exenv');

module.exports.cachedComponent = (cacheKeyFn) => {
  return function wrap(WrappedComponent) {
    if (ExecutionEnvironment.canUseDOM) {
      return WrappedComponent;
    }

    const CachedComponent = (props) =>
      React.createElement(WrappedComponent, props);

    const wrappedComponentName =
      WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component';

    CachedComponent.cacheKeyFn = cacheKeyFn || JSON.stringify;
    CachedComponent.canCache = true;
    CachedComponent.wrappedComponentName = wrappedComponentName;
    CachedComponent.displayName = `CachedComponent(${wrappedComponentName})`;

    return CachedComponent;
  };
};
