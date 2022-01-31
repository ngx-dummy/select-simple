"use strict";
(self["webpackChunkselect_sample"] = self["webpackChunkselect_sample"] || []).push([[539],{

/***/ 539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: consume shared module (default) @angular/common@=12.2.13 (strict) (singleton) (fallback: ./node_modules/@angular/common/fesm2015/common.js)
var common_js_ = __webpack_require__(751);
// EXTERNAL MODULE: consume shared module (default) @angular/core@=12.2.13 (strict) (singleton) (fallback: ./node_modules/@angular/core/fesm2015/core.js)
var core_js_ = __webpack_require__(620);
;// CONCATENATED MODULE: ./node_modules/@angular/platform-browser/fesm2015/platform-browser.js
/**
 * @license Angular v12.2.13
 * (c) 2010-2021 Google LLC. https://angular.io/
 * License: MIT
 */




/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Provides DOM operations in any browser environment.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */

class GenericBrowserDomAdapter extends common_js_["ɵDomAdapter"] {
  constructor() {
    super(...arguments);
    this.supportsDOMEvents = true;
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */

/* tslint:disable:requireParameterType no-console */


class BrowserDomAdapter extends GenericBrowserDomAdapter {
  static makeCurrent() {
    (0,common_js_["ɵsetRootDomAdapter"])(new BrowserDomAdapter());
  }

  onAndCancel(el, evt, listener) {
    el.addEventListener(evt, listener, false); // Needed to follow Dart's subscription semantic, until fix of
    // https://code.google.com/p/dart/issues/detail?id=17406

    return () => {
      el.removeEventListener(evt, listener, false);
    };
  }

  dispatchEvent(el, evt) {
    el.dispatchEvent(evt);
  }

  remove(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  createElement(tagName, doc) {
    doc = doc || this.getDefaultDocument();
    return doc.createElement(tagName);
  }

  createHtmlDocument() {
    return document.implementation.createHTMLDocument('fakeTitle');
  }

  getDefaultDocument() {
    return document;
  }

  isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }

  isShadowRoot(node) {
    return node instanceof DocumentFragment;
  }
  /** @deprecated No longer being used in Ivy code. To be removed in version 14. */


  getGlobalEventTarget(doc, target) {
    if (target === 'window') {
      return window;
    }

    if (target === 'document') {
      return doc;
    }

    if (target === 'body') {
      return doc.body;
    }

    return null;
  }

  getBaseHref(doc) {
    const href = getBaseElementHref();
    return href == null ? null : relativePath(href);
  }

  resetBaseElement() {
    baseElement = null;
  }

  getUserAgent() {
    return window.navigator.userAgent;
  }

  getCookie(name) {
    return (0,common_js_["ɵparseCookieValue"])(document.cookie, name);
  }

}

let baseElement = null;

function getBaseElementHref() {
  baseElement = baseElement || document.querySelector('base');
  return baseElement ? baseElement.getAttribute('href') : null;
} // based on urlUtils.js in AngularJS 1


let urlParsingNode;

function relativePath(url) {
  urlParsingNode = urlParsingNode || document.createElement('a');
  urlParsingNode.setAttribute('href', url);
  const pathName = urlParsingNode.pathname;
  return pathName.charAt(0) === '/' ? pathName : `/${pathName}`;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * An id that identifies a particular application being bootstrapped, that should
 * match across the client/server boundary.
 */


const TRANSITION_ID = /*#__PURE__*/new core_js_.InjectionToken('TRANSITION_ID');

function appInitializerFactory(transitionId, document, injector) {
  return () => {
    // Wait for all application initializers to be completed before removing the styles set by
    // the server.
    injector.get(core_js_.ApplicationInitStatus).donePromise.then(() => {
      const dom = (0,common_js_["ɵgetDOM"])();
      const styles = document.querySelectorAll(`style[ng-transition="${transitionId}"]`);

      for (let i = 0; i < styles.length; i++) {
        dom.remove(styles[i]);
      }
    });
  };
}

const SERVER_TRANSITION_PROVIDERS = [{
  provide: core_js_.APP_INITIALIZER,
  useFactory: appInitializerFactory,
  deps: [TRANSITION_ID, common_js_.DOCUMENT, core_js_.Injector],
  multi: true
}];
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

class BrowserGetTestability {
  static init() {
    (0,core_js_.setTestabilityGetter)(new BrowserGetTestability());
  }

  addToWindow(registry) {
    core_js_["ɵglobal"].getAngularTestability = (elem, findInAncestors = true) => {
      const testability = registry.findTestabilityInTree(elem, findInAncestors);

      if (testability == null) {
        throw new Error('Could not find testability for element.');
      }

      return testability;
    };

    core_js_["ɵglobal"].getAllAngularTestabilities = () => registry.getAllTestabilities();

    core_js_["ɵglobal"].getAllAngularRootElements = () => registry.getAllRootElements();

    const whenAllStable = (callback
    /** TODO #9100 */
    ) => {
      const testabilities = core_js_["ɵglobal"].getAllAngularTestabilities();
      let count = testabilities.length;
      let didWork = false;

      const decrement = function (didWork_
      /** TODO #9100 */
      ) {
        didWork = didWork || didWork_;
        count--;

        if (count == 0) {
          callback(didWork);
        }
      };

      testabilities.forEach(function (testability
      /** TODO #9100 */
      ) {
        testability.whenStable(decrement);
      });
    };

    if (!core_js_["ɵglobal"].frameworkStabilizers) {
      core_js_["ɵglobal"].frameworkStabilizers = [];
    }

    core_js_["ɵglobal"].frameworkStabilizers.push(whenAllStable);
  }

  findTestabilityInTree(registry, elem, findInAncestors) {
    if (elem == null) {
      return null;
    }

    const t = registry.getTestability(elem);

    if (t != null) {
      return t;
    } else if (!findInAncestors) {
      return null;
    }

    if ((0,common_js_["ɵgetDOM"])().isShadowRoot(elem)) {
      return this.findTestabilityInTree(registry, elem.host, true);
    }

    return this.findTestabilityInTree(registry, elem.parentElement, true);
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * A factory for `HttpXhrBackend` that uses the `XMLHttpRequest` browser API.
 */


let BrowserXhr = /*#__PURE__*/(() => {
  class BrowserXhr {
    build() {
      return new XMLHttpRequest();
    }

  }

  BrowserXhr.ɵfac = function BrowserXhr_Factory(t) {
    return new (t || BrowserXhr)();
  };

  BrowserXhr.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: BrowserXhr,
    factory: BrowserXhr.ɵfac
  });
  return BrowserXhr;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const CAMEL_CASE_REGEXP = /([A-Z])/g;
const DASH_CASE_REGEXP = /-([a-z])/g;

function camelCaseToDashCase(input) {
  return input.replace(CAMEL_CASE_REGEXP, (...m) => '-' + m[1].toLowerCase());
}

function dashCaseToCamelCase(input) {
  return input.replace(DASH_CASE_REGEXP, (...m) => m[1].toUpperCase());
}
/**
 * Exports the value under a given `name` in the global property `ng`. For example `ng.probe` if
 * `name` is `'probe'`.
 * @param name Name under which it will be exported. Keep in mind this will be a property of the
 * global `ng` object.
 * @param value The value to export.
 */


function exportNgVar(name, value) {
  if (typeof COMPILED === 'undefined' || !COMPILED) {
    // Note: we can't export `ng` when using closure enhanced optimization as:
    // - closure declares globals itself for minified names, which sometimes clobber our `ng` global
    // - we can't declare a closure extern as the namespace `ng` is already used within Google
    //   for typings for angularJS (via `goog.provide('ng....')`).
    const ng = core_js_["ɵglobal"].ng = core_js_["ɵglobal"].ng || {};
    ng[name] = value;
  }
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const ɵ0 = () => ({
  'ApplicationRef': core_js_.ApplicationRef,
  'NgZone': core_js_.NgZone
});

const CORE_TOKENS = /*#__PURE__*/ɵ0();
const INSPECT_GLOBAL_NAME = 'probe';
const CORE_TOKENS_GLOBAL_NAME = 'coreTokens';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */

function inspectNativeElementR2(element) {
  return (0,core_js_["ɵgetDebugNodeR2"])(element);
}

function _createNgProbeR2(coreTokens) {
  exportNgVar(INSPECT_GLOBAL_NAME, inspectNativeElementR2);
  exportNgVar(CORE_TOKENS_GLOBAL_NAME, Object.assign(Object.assign({}, CORE_TOKENS), _ngProbeTokensToMap(coreTokens || [])));
  return () => inspectNativeElementR2;
}

function _ngProbeTokensToMap(tokens) {
  return tokens.reduce((prev, t) => (prev[t.name] = t.token, prev), {});
}
/**
 * In Ivy, we don't support NgProbe because we have our own set of testing utilities
 * with more robust functionality.
 *
 * We shouldn't bring in NgProbe because it prevents DebugNode and friends from
 * tree-shaking properly.
 */


const ELEMENT_PROBE_PROVIDERS__POST_R3__ = [];
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */

const ELEMENT_PROBE_PROVIDERS__PRE_R3__ = [{
  provide: core_js_.APP_INITIALIZER,
  useFactory: _createNgProbeR2,
  deps: [[core_js_.NgProbeToken, /*#__PURE__*/new core_js_.Optional()]],
  multi: true
}];
const ELEMENT_PROBE_PROVIDERS = ELEMENT_PROBE_PROVIDERS__POST_R3__;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * The injection token for the event-manager plug-in service.
 *
 * @publicApi
 */

const EVENT_MANAGER_PLUGINS = /*#__PURE__*/new core_js_.InjectionToken('EventManagerPlugins');
/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * @publicApi
 */

let EventManager = /*#__PURE__*/(() => {
  class EventManager {
    /**
     * Initializes an instance of the event-manager service.
     */
    constructor(plugins, _zone) {
      this._zone = _zone;
      this._eventNameToPlugin = new Map();
      plugins.forEach(p => p.manager = this);
      this._plugins = plugins.slice().reverse();
    }
    /**
     * Registers a handler for a specific element and event.
     *
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns  A callback function that can be used to remove the handler.
     */


    addEventListener(element, eventName, handler) {
      const plugin = this._findPluginFor(eventName);

      return plugin.addEventListener(element, eventName, handler);
    }
    /**
     * Registers a global handler for an event in a target view.
     *
     * @param target A target for global event notifications. One of "window", "document", or "body".
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns A callback function that can be used to remove the handler.
     * @deprecated No longer being used in Ivy code. To be removed in version 14.
     */


    addGlobalEventListener(target, eventName, handler) {
      const plugin = this._findPluginFor(eventName);

      return plugin.addGlobalEventListener(target, eventName, handler);
    }
    /**
     * Retrieves the compilation zone in which event listeners are registered.
     */


    getZone() {
      return this._zone;
    }
    /** @internal */


    _findPluginFor(eventName) {
      const plugin = this._eventNameToPlugin.get(eventName);

      if (plugin) {
        return plugin;
      }

      const plugins = this._plugins;

      for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];

        if (plugin.supports(eventName)) {
          this._eventNameToPlugin.set(eventName, plugin);

          return plugin;
        }
      }

      throw new Error(`No event manager plugin found for event ${eventName}`);
    }

  }

  EventManager.ɵfac = function EventManager_Factory(t) {
    return new (t || EventManager)(core_js_["ɵɵinject"](EVENT_MANAGER_PLUGINS), core_js_["ɵɵinject"](core_js_.NgZone));
  };

  EventManager.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: EventManager,
    factory: EventManager.ɵfac
  });
  return EventManager;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

class EventManagerPlugin {
  constructor(_doc) {
    this._doc = _doc;
  }

  addGlobalEventListener(element, eventName, handler) {
    const target = (0,common_js_["ɵgetDOM"])().getGlobalEventTarget(this._doc, element);

    if (!target) {
      throw new Error(`Unsupported event target ${target} for event ${eventName}`);
    }

    return this.addEventListener(target, eventName, handler);
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


let SharedStylesHost = /*#__PURE__*/(() => {
  class SharedStylesHost {
    constructor() {
      /** @internal */
      this._stylesSet = new Set();
    }

    addStyles(styles) {
      const additions = new Set();
      styles.forEach(style => {
        if (!this._stylesSet.has(style)) {
          this._stylesSet.add(style);

          additions.add(style);
        }
      });
      this.onStylesAdded(additions);
    }

    onStylesAdded(additions) {}

    getAllStyles() {
      return Array.from(this._stylesSet);
    }

  }

  SharedStylesHost.ɵfac = function SharedStylesHost_Factory(t) {
    return new (t || SharedStylesHost)();
  };

  SharedStylesHost.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: SharedStylesHost,
    factory: SharedStylesHost.ɵfac
  });
  return SharedStylesHost;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

let DomSharedStylesHost = /*#__PURE__*/(() => {
  class DomSharedStylesHost extends SharedStylesHost {
    constructor(_doc) {
      super();
      this._doc = _doc; // Maps all registered host nodes to a list of style nodes that have been added to the host node.

      this._hostNodes = new Map();

      this._hostNodes.set(_doc.head, []);
    }

    _addStylesToHost(styles, host, styleNodes) {
      styles.forEach(style => {
        const styleEl = this._doc.createElement('style');

        styleEl.textContent = style;
        styleNodes.push(host.appendChild(styleEl));
      });
    }

    addHost(hostNode) {
      const styleNodes = [];

      this._addStylesToHost(this._stylesSet, hostNode, styleNodes);

      this._hostNodes.set(hostNode, styleNodes);
    }

    removeHost(hostNode) {
      const styleNodes = this._hostNodes.get(hostNode);

      if (styleNodes) {
        styleNodes.forEach(removeStyle);
      }

      this._hostNodes.delete(hostNode);
    }

    onStylesAdded(additions) {
      this._hostNodes.forEach((styleNodes, hostNode) => {
        this._addStylesToHost(additions, hostNode, styleNodes);
      });
    }

    ngOnDestroy() {
      this._hostNodes.forEach(styleNodes => styleNodes.forEach(removeStyle));
    }

  }

  DomSharedStylesHost.ɵfac = function DomSharedStylesHost_Factory(t) {
    return new (t || DomSharedStylesHost)(core_js_["ɵɵinject"](common_js_.DOCUMENT));
  };

  DomSharedStylesHost.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: DomSharedStylesHost,
    factory: DomSharedStylesHost.ɵfac
  });
  return DomSharedStylesHost;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

function removeStyle(styleNode) {
  (0,common_js_["ɵgetDOM"])().remove(styleNode);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const NAMESPACE_URIS = {
  'svg': 'http://www.w3.org/2000/svg',
  'xhtml': 'http://www.w3.org/1999/xhtml',
  'xlink': 'http://www.w3.org/1999/xlink',
  'xml': 'http://www.w3.org/XML/1998/namespace',
  'xmlns': 'http://www.w3.org/2000/xmlns/'
};
const COMPONENT_REGEX = /%COMP%/g;
const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;
const COMPONENT_VARIABLE = '%COMP%';
const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;

function shimContentAttribute(componentShortId) {
  return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}

function shimHostAttribute(componentShortId) {
  return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}

function flattenStyles(compId, styles, target) {
  for (let i = 0; i < styles.length; i++) {
    let style = styles[i];

    if (Array.isArray(style)) {
      flattenStyles(compId, style, target);
    } else {
      style = style.replace(COMPONENT_REGEX, compId);
      target.push(style);
    }
  }

  return target;
}

function decoratePreventDefault(eventHandler) {
  // `DebugNode.triggerEventHandler` needs to know if the listener was created with
  // decoratePreventDefault or is a listener added outside the Angular context so it can handle the
  // two differently. In the first case, the special '__ngUnwrap__' token is passed to the unwrap
  // the listener (see below).
  return event => {
    // Ivy uses '__ngUnwrap__' as a special token that allows us to unwrap the function
    // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`. The debug_node
    // can inspect the listener toString contents for the existence of this special token. Because
    // the token is a string literal, it is ensured to not be modified by compiled code.
    if (event === '__ngUnwrap__') {
      return eventHandler;
    }

    const allowDefaultBehavior = eventHandler(event);

    if (allowDefaultBehavior === false) {
      // TODO(tbosch): move preventDefault into event plugins...
      event.preventDefault();
      event.returnValue = false;
    }

    return undefined;
  };
}

let hasLoggedNativeEncapsulationWarning = false;
let DomRendererFactory2 = /*#__PURE__*/(() => {
  class DomRendererFactory2 {
    constructor(eventManager, sharedStylesHost, appId) {
      this.eventManager = eventManager;
      this.sharedStylesHost = sharedStylesHost;
      this.appId = appId;
      this.rendererByCompId = new Map();
      this.defaultRenderer = new DefaultDomRenderer2(eventManager);
    }

    createRenderer(element, type) {
      if (!element || !type) {
        return this.defaultRenderer;
      }

      switch (type.encapsulation) {
        case core_js_.ViewEncapsulation.Emulated:
          {
            let renderer = this.rendererByCompId.get(type.id);

            if (!renderer) {
              renderer = new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type, this.appId);
              this.rendererByCompId.set(type.id, renderer);
            }

            renderer.applyToHost(element);
            return renderer;
          }
        // @ts-ignore TODO: Remove as part of FW-2290. TS complains about us dealing with an enum
        // value that is not known (but previously was the value for ViewEncapsulation.Native)

        case 1:
        case core_js_.ViewEncapsulation.ShadowDom:
          // TODO(FW-2290): remove the `case 1:` fallback logic and the warning in v12.
          if ((typeof ngDevMode === 'undefined' || ngDevMode) && // @ts-ignore TODO: Remove as part of FW-2290. TS complains about us dealing with an
          // enum value that is not known (but previously was the value for
          // ViewEncapsulation.Native)
          !hasLoggedNativeEncapsulationWarning && type.encapsulation === 1) {
            hasLoggedNativeEncapsulationWarning = true;
            console.warn('ViewEncapsulation.Native is no longer supported. Falling back to ViewEncapsulation.ShadowDom. The fallback will be removed in v12.');
          }

          return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);

        default:
          {
            if (!this.rendererByCompId.has(type.id)) {
              const styles = flattenStyles(type.id, type.styles, []);
              this.sharedStylesHost.addStyles(styles);
              this.rendererByCompId.set(type.id, this.defaultRenderer);
            }

            return this.defaultRenderer;
          }
      }
    }

    begin() {}

    end() {}

  }

  DomRendererFactory2.ɵfac = function DomRendererFactory2_Factory(t) {
    return new (t || DomRendererFactory2)(core_js_["ɵɵinject"](EventManager), core_js_["ɵɵinject"](DomSharedStylesHost), core_js_["ɵɵinject"](core_js_.APP_ID));
  };

  DomRendererFactory2.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: DomRendererFactory2,
    factory: DomRendererFactory2.ɵfac
  });
  return DomRendererFactory2;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

class DefaultDomRenderer2 {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.data = Object.create(null);
  }

  destroy() {}

  createElement(name, namespace) {
    if (namespace) {
      // In cases where Ivy (not ViewEngine) is giving us the actual namespace, the look up by key
      // will result in undefined, so we just return the namespace here.
      return document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
    }

    return document.createElement(name);
  }

  createComment(value) {
    return document.createComment(value);
  }

  createText(value) {
    return document.createTextNode(value);
  }

  appendChild(parent, newChild) {
    parent.appendChild(newChild);
  }

  insertBefore(parent, newChild, refChild) {
    if (parent) {
      parent.insertBefore(newChild, refChild);
    }
  }

  removeChild(parent, oldChild) {
    if (parent) {
      parent.removeChild(oldChild);
    }
  }

  selectRootElement(selectorOrNode, preserveContent) {
    let el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) : selectorOrNode;

    if (!el) {
      throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
    }

    if (!preserveContent) {
      el.textContent = '';
    }

    return el;
  }

  parentNode(node) {
    return node.parentNode;
  }

  nextSibling(node) {
    return node.nextSibling;
  }

  setAttribute(el, name, value, namespace) {
    if (namespace) {
      name = namespace + ':' + name; // TODO(FW-811): Ivy may cause issues here because it's passing around
      // full URIs for namespaces, therefore this lookup will fail.

      const namespaceUri = NAMESPACE_URIS[namespace];

      if (namespaceUri) {
        el.setAttributeNS(namespaceUri, name, value);
      } else {
        el.setAttribute(name, value);
      }
    } else {
      el.setAttribute(name, value);
    }
  }

  removeAttribute(el, name, namespace) {
    if (namespace) {
      // TODO(FW-811): Ivy may cause issues here because it's passing around
      // full URIs for namespaces, therefore this lookup will fail.
      const namespaceUri = NAMESPACE_URIS[namespace];

      if (namespaceUri) {
        el.removeAttributeNS(namespaceUri, name);
      } else {
        // TODO(FW-811): Since ivy is passing around full URIs for namespaces
        // this could result in properties like `http://www.w3.org/2000/svg:cx="123"`,
        // which is wrong.
        el.removeAttribute(`${namespace}:${name}`);
      }
    } else {
      el.removeAttribute(name);
    }
  }

  addClass(el, name) {
    el.classList.add(name);
  }

  removeClass(el, name) {
    el.classList.remove(name);
  }

  setStyle(el, style, value, flags) {
    if (flags & (core_js_.RendererStyleFlags2.DashCase | core_js_.RendererStyleFlags2.Important)) {
      el.style.setProperty(style, value, flags & core_js_.RendererStyleFlags2.Important ? 'important' : '');
    } else {
      el.style[style] = value;
    }
  }

  removeStyle(el, style, flags) {
    if (flags & core_js_.RendererStyleFlags2.DashCase) {
      el.style.removeProperty(style);
    } else {
      // IE requires '' instead of null
      // see https://github.com/angular/angular/issues/7916
      el.style[style] = '';
    }
  }

  setProperty(el, name, value) {
    NG_DEV_MODE && checkNoSyntheticProp(name, 'property');
    el[name] = value;
  }

  setValue(node, value) {
    node.nodeValue = value;
  }

  listen(target, event, callback) {
    NG_DEV_MODE && checkNoSyntheticProp(event, 'listener');

    if (typeof target === 'string') {
      return this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback));
    }

    return this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
  }

}

const ɵ0$1 = () => '@'.charCodeAt(0);

const AT_CHARCODE = /*#__PURE__*/ɵ0$1();

function checkNoSyntheticProp(name, nameKind) {
  if (name.charCodeAt(0) === AT_CHARCODE) {
    throw new Error(`Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Either \`BrowserAnimationsModule\` or \`NoopAnimationsModule\` are imported in your application.
  - There is corresponding configuration for the animation named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.io/api/core/Component#animations).`);
  }
}

class EmulatedEncapsulationDomRenderer2 extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, component, appId) {
    super(eventManager);
    this.component = component;
    const styles = flattenStyles(appId + '-' + component.id, component.styles, []);
    sharedStylesHost.addStyles(styles);
    this.contentAttr = shimContentAttribute(appId + '-' + component.id);
    this.hostAttr = shimHostAttribute(appId + '-' + component.id);
  }

  applyToHost(element) {
    super.setAttribute(element, this.hostAttr, '');
  }

  createElement(parent, name) {
    const el = super.createElement(parent, name);
    super.setAttribute(el, this.contentAttr, '');
    return el;
  }

}

class ShadowDomRenderer extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, hostEl, component) {
    super(eventManager);
    this.sharedStylesHost = sharedStylesHost;
    this.hostEl = hostEl;
    this.shadowRoot = hostEl.attachShadow({
      mode: 'open'
    });
    this.sharedStylesHost.addHost(this.shadowRoot);
    const styles = flattenStyles(component.id, component.styles, []);

    for (let i = 0; i < styles.length; i++) {
      const styleEl = document.createElement('style');
      styleEl.textContent = styles[i];
      this.shadowRoot.appendChild(styleEl);
    }
  }

  nodeOrShadowRoot(node) {
    return node === this.hostEl ? this.shadowRoot : node;
  }

  destroy() {
    this.sharedStylesHost.removeHost(this.shadowRoot);
  }

  appendChild(parent, newChild) {
    return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
  }

  insertBefore(parent, newChild, refChild) {
    return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
  }

  removeChild(parent, oldChild) {
    return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
  }

  parentNode(node) {
    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


let DomEventsPlugin = /*#__PURE__*/(() => {
  class DomEventsPlugin extends EventManagerPlugin {
    constructor(doc) {
      super(doc);
    } // This plugin should come last in the list of plugins, because it accepts all
    // events.


    supports(eventName) {
      return true;
    }

    addEventListener(element, eventName, handler) {
      element.addEventListener(eventName, handler, false);
      return () => this.removeEventListener(element, eventName, handler);
    }

    removeEventListener(target, eventName, callback) {
      return target.removeEventListener(eventName, callback);
    }

  }

  DomEventsPlugin.ɵfac = function DomEventsPlugin_Factory(t) {
    return new (t || DomEventsPlugin)(core_js_["ɵɵinject"](common_js_.DOCUMENT));
  };

  DomEventsPlugin.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: DomEventsPlugin,
    factory: DomEventsPlugin.ɵfac
  });
  return DomEventsPlugin;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Supported HammerJS recognizer event names.
 */


const EVENT_NAMES = {
  // pan
  'pan': true,
  'panstart': true,
  'panmove': true,
  'panend': true,
  'pancancel': true,
  'panleft': true,
  'panright': true,
  'panup': true,
  'pandown': true,
  // pinch
  'pinch': true,
  'pinchstart': true,
  'pinchmove': true,
  'pinchend': true,
  'pinchcancel': true,
  'pinchin': true,
  'pinchout': true,
  // press
  'press': true,
  'pressup': true,
  // rotate
  'rotate': true,
  'rotatestart': true,
  'rotatemove': true,
  'rotateend': true,
  'rotatecancel': true,
  // swipe
  'swipe': true,
  'swipeleft': true,
  'swiperight': true,
  'swipeup': true,
  'swipedown': true,
  // tap
  'tap': true,
  'doubletap': true
};
/**
 * DI token for providing [HammerJS](https://hammerjs.github.io/) support to Angular.
 * @see `HammerGestureConfig`
 *
 * @ngModule HammerModule
 * @publicApi
 */

const HAMMER_GESTURE_CONFIG = /*#__PURE__*/new core_js_.InjectionToken('HammerGestureConfig');
/**
 * Injection token used to provide a {@link HammerLoader} to Angular.
 *
 * @publicApi
 */

const HAMMER_LOADER = /*#__PURE__*/new core_js_.InjectionToken('HammerLoader');
/**
 * An injectable [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
 * for gesture recognition. Configures specific event recognition.
 * @publicApi
 */

let HammerGestureConfig = /*#__PURE__*/(() => {
  class HammerGestureConfig {
    constructor() {
      /**
       * A set of supported event names for gestures to be used in Angular.
       * Angular supports all built-in recognizers, as listed in
       * [HammerJS documentation](https://hammerjs.github.io/).
       */
      this.events = [];
      /**
       * Maps gesture event names to a set of configuration options
       * that specify overrides to the default values for specific properties.
       *
       * The key is a supported event name to be configured,
       * and the options object contains a set of properties, with override values
       * to be applied to the named recognizer event.
       * For example, to disable recognition of the rotate event, specify
       *  `{"rotate": {"enable": false}}`.
       *
       * Properties that are not present take the HammerJS default values.
       * For information about which properties are supported for which events,
       * and their allowed and default values, see
       * [HammerJS documentation](https://hammerjs.github.io/).
       *
       */

      this.overrides = {};
    }
    /**
     * Creates a [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
     * and attaches it to a given HTML element.
     * @param element The element that will recognize gestures.
     * @returns A HammerJS event-manager object.
     */


    buildHammer(element) {
      const mc = new Hammer(element, this.options);
      mc.get('pinch').set({
        enable: true
      });
      mc.get('rotate').set({
        enable: true
      });

      for (const eventName in this.overrides) {
        mc.get(eventName).set(this.overrides[eventName]);
      }

      return mc;
    }

  }

  HammerGestureConfig.ɵfac = function HammerGestureConfig_Factory(t) {
    return new (t || HammerGestureConfig)();
  };

  HammerGestureConfig.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: HammerGestureConfig,
    factory: HammerGestureConfig.ɵfac
  });
  return HammerGestureConfig;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Event plugin that adds Hammer support to an application.
 *
 * @ngModule HammerModule
 */


let HammerGesturesPlugin = /*#__PURE__*/(() => {
  class HammerGesturesPlugin extends EventManagerPlugin {
    constructor(doc, _config, console, loader) {
      super(doc);
      this._config = _config;
      this.console = console;
      this.loader = loader;
      this._loaderPromise = null;
    }

    supports(eventName) {
      if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
        return false;
      }

      if (!window.Hammer && !this.loader) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
          this.console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not ` + `loaded and no custom loader has been specified.`);
        }

        return false;
      }

      return true;
    }

    addEventListener(element, eventName, handler) {
      const zone = this.manager.getZone();
      eventName = eventName.toLowerCase(); // If Hammer is not present but a loader is specified, we defer adding the event listener
      // until Hammer is loaded.

      if (!window.Hammer && this.loader) {
        this._loaderPromise = this._loaderPromise || this.loader(); // This `addEventListener` method returns a function to remove the added listener.
        // Until Hammer is loaded, the returned function needs to *cancel* the registration rather
        // than remove anything.

        let cancelRegistration = false;

        let deregister = () => {
          cancelRegistration = true;
        };

        this._loaderPromise.then(() => {
          // If Hammer isn't actually loaded when the custom loader resolves, give up.
          if (!window.Hammer) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
              this.console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
            }

            deregister = () => {};

            return;
          }

          if (!cancelRegistration) {
            // Now that Hammer is loaded and the listener is being loaded for real,
            // the deregistration function changes from canceling registration to removal.
            deregister = this.addEventListener(element, eventName, handler);
          }
        }).catch(() => {
          if (typeof ngDevMode === 'undefined' || ngDevMode) {
            this.console.warn(`The "${eventName}" event cannot be bound because the custom ` + `Hammer.JS loader failed.`);
          }

          deregister = () => {};
        }); // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
        // can change the behavior of `deregister` once the listener is added. Using a closure in
        // this way allows us to avoid any additional data structures to track listener removal.


        return () => {
          deregister();
        };
      }

      return zone.runOutsideAngular(() => {
        // Creating the manager bind events, must be done outside of angular
        const mc = this._config.buildHammer(element);

        const callback = function (eventObj) {
          zone.runGuarded(function () {
            handler(eventObj);
          });
        };

        mc.on(eventName, callback);
        return () => {
          mc.off(eventName, callback); // destroy mc to prevent memory leak

          if (typeof mc.destroy === 'function') {
            mc.destroy();
          }
        };
      });
    }

    isCustomEvent(eventName) {
      return this._config.events.indexOf(eventName) > -1;
    }

  }

  HammerGesturesPlugin.ɵfac = function HammerGesturesPlugin_Factory(t) {
    return new (t || HammerGesturesPlugin)(core_js_["ɵɵinject"](common_js_.DOCUMENT), core_js_["ɵɵinject"](HAMMER_GESTURE_CONFIG), core_js_["ɵɵinject"](core_js_["ɵConsole"]), core_js_["ɵɵinject"](HAMMER_LOADER, 8));
  };

  HammerGesturesPlugin.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: HammerGesturesPlugin,
    factory: HammerGesturesPlugin.ɵfac
  });
  return HammerGesturesPlugin;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * In Ivy, support for Hammer gestures is optional, so applications must
 * import the `HammerModule` at root to turn on support. This means that
 * Hammer-specific code can be tree-shaken away if not needed.
 */


const HAMMER_PROVIDERS__POST_R3__ = [];
/**
 * In View Engine, support for Hammer gestures is built-in by default.
 */

const HAMMER_PROVIDERS__PRE_R3__ = [{
  provide: EVENT_MANAGER_PLUGINS,
  useClass: HammerGesturesPlugin,
  multi: true,
  deps: [common_js_.DOCUMENT, HAMMER_GESTURE_CONFIG, core_js_["ɵConsole"], [/*#__PURE__*/new core_js_.Optional(), HAMMER_LOADER]]
}, {
  provide: HAMMER_GESTURE_CONFIG,
  useClass: HammerGestureConfig,
  deps: []
}];
const HAMMER_PROVIDERS = HAMMER_PROVIDERS__POST_R3__;
/**
 * Adds support for HammerJS.
 *
 * Import this module at the root of your application so that Angular can work with
 * HammerJS to detect gesture events.
 *
 * Note that applications still need to include the HammerJS script itself. This module
 * simply sets up the coordination layer between HammerJS and Angular's EventManager.
 *
 * @publicApi
 */

let HammerModule = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  class HammerModule {}

  HammerModule.ɵfac = function HammerModule_Factory(t) {
    return new (t || HammerModule)();
  };

  HammerModule.ɵmod = /*@__PURE__*/ɵngcc0.ɵɵdefineNgModule({
    type: HammerModule
  });
  HammerModule.ɵinj = /*@__PURE__*/ɵngcc0.ɵɵdefineInjector({
    providers: HAMMER_PROVIDERS__PRE_R3__
  });
  return HammerModule;
})()));

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Defines supported modifiers for key events.
 */


const MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
const DOM_KEY_LOCATION_NUMPAD = 3; // Map to convert some key or keyIdentifier values to what will be returned by getEventKey

const _keyMap = {
  // The following values are here for cross-browser compatibility and to match the W3C standard
  // cf https://www.w3.org/TR/DOM-Level-3-Events-key/
  '\b': 'Backspace',
  '\t': 'Tab',
  '\x7F': 'Delete',
  '\x1B': 'Escape',
  'Del': 'Delete',
  'Esc': 'Escape',
  'Left': 'ArrowLeft',
  'Right': 'ArrowRight',
  'Up': 'ArrowUp',
  'Down': 'ArrowDown',
  'Menu': 'ContextMenu',
  'Scroll': 'ScrollLock',
  'Win': 'OS'
}; // There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...

const _chromeNumKeyPadMap = {
  'A': '1',
  'B': '2',
  'C': '3',
  'D': '4',
  'E': '5',
  'F': '6',
  'G': '7',
  'H': '8',
  'I': '9',
  'J': '*',
  'K': '+',
  'M': '-',
  'N': '.',
  'O': '/',
  '\x60': '0',
  '\x90': 'NumLock'
};

const ɵ0$2 = event => event.altKey,
      ɵ1 = event => event.ctrlKey,
      ɵ2 = event => event.metaKey,
      ɵ3 = event => event.shiftKey;
/**
 * Retrieves modifiers from key-event objects.
 */


const MODIFIER_KEY_GETTERS = {
  'alt': ɵ0$2,
  'control': ɵ1,
  'meta': ɵ2,
  'shift': ɵ3
};
/**
 * @publicApi
 * A browser plug-in that provides support for handling of key events in Angular.
 */

let KeyEventsPlugin = /*#__PURE__*/(() => {
  class KeyEventsPlugin extends EventManagerPlugin {
    /**
     * Initializes an instance of the browser plug-in.
     * @param doc The document in which key events will be detected.
     */
    constructor(doc) {
      super(doc);
    }
    /**
     * Reports whether a named key event is supported.
     * @param eventName The event name to query.
     * @return True if the named key event is supported.
     */


    supports(eventName) {
      return KeyEventsPlugin.parseEventName(eventName) != null;
    }
    /**
     * Registers a handler for a specific element and key event.
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the key event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns The key event that was registered.
     */


    addEventListener(element, eventName, handler) {
      const parsedEvent = KeyEventsPlugin.parseEventName(eventName);
      const outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
      return this.manager.getZone().runOutsideAngular(() => {
        return (0,common_js_["ɵgetDOM"])().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
      });
    }

    static parseEventName(eventName) {
      const parts = eventName.toLowerCase().split('.');
      const domEventName = parts.shift();

      if (parts.length === 0 || !(domEventName === 'keydown' || domEventName === 'keyup')) {
        return null;
      }

      const key = KeyEventsPlugin._normalizeKey(parts.pop());

      let fullKey = '';
      MODIFIER_KEYS.forEach(modifierName => {
        const index = parts.indexOf(modifierName);

        if (index > -1) {
          parts.splice(index, 1);
          fullKey += modifierName + '.';
        }
      });
      fullKey += key;

      if (parts.length != 0 || key.length === 0) {
        // returning null instead of throwing to let another plugin process the event
        return null;
      } // NOTE: Please don't rewrite this as so, as it will break JSCompiler property renaming.
      //       The code must remain in the `result['domEventName']` form.
      // return {domEventName, fullKey};


      const result = {};
      result['domEventName'] = domEventName;
      result['fullKey'] = fullKey;
      return result;
    }

    static getEventFullKey(event) {
      let fullKey = '';
      let key = getEventKey(event);
      key = key.toLowerCase();

      if (key === ' ') {
        key = 'space'; // for readability
      } else if (key === '.') {
        key = 'dot'; // because '.' is used as a separator in event names
      }

      MODIFIER_KEYS.forEach(modifierName => {
        if (modifierName != key) {
          const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];

          if (modifierGetter(event)) {
            fullKey += modifierName + '.';
          }
        }
      });
      fullKey += key;
      return fullKey;
    }
    /**
     * Configures a handler callback for a key event.
     * @param fullKey The event name that combines all simultaneous keystrokes.
     * @param handler The function that responds to the key event.
     * @param zone The zone in which the event occurred.
     * @returns A callback function.
     */


    static eventCallback(fullKey, handler, zone) {
      return (event
      /** TODO #9100 */
      ) => {
        if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
          zone.runGuarded(() => handler(event));
        }
      };
    }
    /** @internal */


    static _normalizeKey(keyName) {
      // TODO: switch to a Map if the mapping grows too much
      switch (keyName) {
        case 'esc':
          return 'escape';

        default:
          return keyName;
      }
    }

  }

  KeyEventsPlugin.ɵfac = function KeyEventsPlugin_Factory(t) {
    return new (t || KeyEventsPlugin)(core_js_["ɵɵinject"](common_js_.DOCUMENT));
  };

  KeyEventsPlugin.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: KeyEventsPlugin,
    factory: KeyEventsPlugin.ɵfac
  });
  return KeyEventsPlugin;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

function getEventKey(event) {
  let key = event.key;

  if (key == null) {
    key = event.keyIdentifier; // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
    // Safari cf
    // https://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces

    if (key == null) {
      return 'Unidentified';
    }

    if (key.startsWith('U+')) {
      key = String.fromCharCode(parseInt(key.substring(2), 16));

      if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
        // There is a bug in Chrome for numeric keypad keys:
        // https://code.google.com/p/chromium/issues/detail?id=155654
        // 1, 2, 3 ... are reported as A, B, C ...
        key = _chromeNumKeyPadMap[key];
      }
    }
  }

  return _keyMap[key] || key;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](https://g.co/ng/security).
 *
 * @publicApi
 */


let DomSanitizer = /*#__PURE__*/(() => {
  class DomSanitizer {}

  DomSanitizer.ɵfac = function DomSanitizer_Factory(t) {
    return new (t || DomSanitizer)();
  };

  DomSanitizer.ɵprov = (0,core_js_["ɵɵdefineInjectable"])({
    factory: function DomSanitizer_Factory() {
      return (0,core_js_["ɵɵinject"])(DomSanitizerImpl);
    },
    token: DomSanitizer,
    providedIn: "root"
  });
  return DomSanitizer;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

function domSanitizerImplFactory(injector) {
  return new DomSanitizerImpl(injector.get(common_js_.DOCUMENT));
}

let DomSanitizerImpl = /*#__PURE__*/(() => {
  class DomSanitizerImpl extends DomSanitizer {
    constructor(_doc) {
      super();
      this._doc = _doc;
    }

    sanitize(ctx, value) {
      if (value == null) return null;

      switch (ctx) {
        case core_js_.SecurityContext.NONE:
          return value;

        case core_js_.SecurityContext.HTML:
          if ((0,core_js_["ɵallowSanitizationBypassAndThrow"])(value, "HTML"
          /* Html */
          )) {
            return (0,core_js_["ɵunwrapSafeValue"])(value);
          }

          return (0,core_js_["ɵ_sanitizeHtml"])(this._doc, String(value)).toString();

        case core_js_.SecurityContext.STYLE:
          if ((0,core_js_["ɵallowSanitizationBypassAndThrow"])(value, "Style"
          /* Style */
          )) {
            return (0,core_js_["ɵunwrapSafeValue"])(value);
          }

          return value;

        case core_js_.SecurityContext.SCRIPT:
          if ((0,core_js_["ɵallowSanitizationBypassAndThrow"])(value, "Script"
          /* Script */
          )) {
            return (0,core_js_["ɵunwrapSafeValue"])(value);
          }

          throw new Error('unsafe value used in a script context');

        case core_js_.SecurityContext.URL:
          const type = (0,core_js_["ɵgetSanitizationBypassType"])(value);

          if ((0,core_js_["ɵallowSanitizationBypassAndThrow"])(value, "URL"
          /* Url */
          )) {
            return (0,core_js_["ɵunwrapSafeValue"])(value);
          }

          return (0,core_js_["ɵ_sanitizeUrl"])(String(value));

        case core_js_.SecurityContext.RESOURCE_URL:
          if ((0,core_js_["ɵallowSanitizationBypassAndThrow"])(value, "ResourceURL"
          /* ResourceUrl */
          )) {
            return (0,core_js_["ɵunwrapSafeValue"])(value);
          }

          throw new Error('unsafe value used in a resource URL context (see https://g.co/ng/security#xss)');

        default:
          throw new Error(`Unexpected SecurityContext ${ctx} (see https://g.co/ng/security#xss)`);
      }
    }

    bypassSecurityTrustHtml(value) {
      return (0,core_js_["ɵbypassSanitizationTrustHtml"])(value);
    }

    bypassSecurityTrustStyle(value) {
      return (0,core_js_["ɵbypassSanitizationTrustStyle"])(value);
    }

    bypassSecurityTrustScript(value) {
      return (0,core_js_["ɵbypassSanitizationTrustScript"])(value);
    }

    bypassSecurityTrustUrl(value) {
      return (0,core_js_["ɵbypassSanitizationTrustUrl"])(value);
    }

    bypassSecurityTrustResourceUrl(value) {
      return (0,core_js_["ɵbypassSanitizationTrustResourceUrl"])(value);
    }

  }

  DomSanitizerImpl.ɵfac = function DomSanitizerImpl_Factory(t) {
    return new (t || DomSanitizerImpl)(core_js_["ɵɵinject"](common_js_.DOCUMENT));
  };

  DomSanitizerImpl.ɵprov = (0,core_js_["ɵɵdefineInjectable"])({
    factory: function DomSanitizerImpl_Factory() {
      return domSanitizerImplFactory((0,core_js_["ɵɵinject"])(core_js_.INJECTOR));
    },
    token: DomSanitizerImpl,
    providedIn: "root"
  });
  return DomSanitizerImpl;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function initDomAdapter() {
  BrowserDomAdapter.makeCurrent();
  BrowserGetTestability.init();
}

function errorHandler() {
  return new core_js_.ErrorHandler();
}

function _document() {
  // Tell ivy about the global document
  (0,core_js_["ɵsetDocument"])(document);
  return document;
}

const ɵ0$3 = common_js_["ɵPLATFORM_BROWSER_ID"];
const INTERNAL_BROWSER_PLATFORM_PROVIDERS = [{
  provide: core_js_.PLATFORM_ID,
  useValue: ɵ0$3
}, {
  provide: core_js_.PLATFORM_INITIALIZER,
  useValue: initDomAdapter,
  multi: true
}, {
  provide: common_js_.DOCUMENT,
  useFactory: _document,
  deps: []
}];
const BROWSER_SANITIZATION_PROVIDERS__PRE_R3__ = [{
  provide: core_js_.Sanitizer,
  useExisting: DomSanitizer
}, {
  provide: DomSanitizer,
  useClass: DomSanitizerImpl,
  deps: [common_js_.DOCUMENT]
}];
const BROWSER_SANITIZATION_PROVIDERS__POST_R3__ = [];
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](https://g.co/ng/security).
 * @publicApi
 */

const BROWSER_SANITIZATION_PROVIDERS = BROWSER_SANITIZATION_PROVIDERS__POST_R3__;
/**
 * A factory function that returns a `PlatformRef` instance associated with browser service
 * providers.
 *
 * @publicApi
 */

const platformBrowser = /*#__PURE__*/(0,core_js_.createPlatformFactory)(core_js_.platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
const BROWSER_MODULE_PROVIDERS = [BROWSER_SANITIZATION_PROVIDERS, {
  provide: core_js_["ɵINJECTOR_SCOPE"],
  useValue: 'root'
}, {
  provide: core_js_.ErrorHandler,
  useFactory: errorHandler,
  deps: []
}, {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: DomEventsPlugin,
  multi: true,
  deps: [common_js_.DOCUMENT, core_js_.NgZone, core_js_.PLATFORM_ID]
}, {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: KeyEventsPlugin,
  multi: true,
  deps: [common_js_.DOCUMENT]
}, HAMMER_PROVIDERS, {
  provide: DomRendererFactory2,
  useClass: DomRendererFactory2,
  deps: [EventManager, DomSharedStylesHost, core_js_.APP_ID]
}, {
  provide: core_js_.RendererFactory2,
  useExisting: DomRendererFactory2
}, {
  provide: SharedStylesHost,
  useExisting: DomSharedStylesHost
}, {
  provide: DomSharedStylesHost,
  useClass: DomSharedStylesHost,
  deps: [common_js_.DOCUMENT]
}, {
  provide: core_js_.Testability,
  useClass: core_js_.Testability,
  deps: [core_js_.NgZone]
}, {
  provide: EventManager,
  useClass: EventManager,
  deps: [EVENT_MANAGER_PLUGINS, core_js_.NgZone]
}, {
  provide: common_js_.XhrFactory,
  useClass: BrowserXhr,
  deps: []
}, ELEMENT_PROBE_PROVIDERS];
/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * @publicApi
 */

let BrowserModule = /*#__PURE__*/(() => {
  class BrowserModule {
    constructor(parentModule) {
      if (parentModule) {
        throw new Error(`BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.`);
      }
    }
    /**
     * Configures a browser-based app to transition from a server-rendered app, if
     * one is present on the page.
     *
     * @param params An object containing an identifier for the app to transition.
     * The ID must match between the client and server versions of the app.
     * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
     */


    static withServerTransition(params) {
      return {
        ngModule: BrowserModule,
        providers: [{
          provide: core_js_.APP_ID,
          useValue: params.appId
        }, {
          provide: TRANSITION_ID,
          useExisting: core_js_.APP_ID
        }, SERVER_TRANSITION_PROVIDERS]
      };
    }

  }

  BrowserModule.ɵfac = function BrowserModule_Factory(t) {
    return new (t || BrowserModule)(core_js_["ɵɵinject"](BrowserModule, 12));
  };

  BrowserModule.ɵmod = /*@__PURE__*/core_js_["ɵɵdefineNgModule"]({
    type: BrowserModule
  });
  BrowserModule.ɵinj = /*@__PURE__*/core_js_["ɵɵdefineInjector"]({
    providers: BROWSER_MODULE_PROVIDERS,
    imports: [common_js_.CommonModule, core_js_.ApplicationModule]
  });
  return BrowserModule;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/*#__PURE__*/
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && core_js_["ɵɵsetNgModuleScope"](BrowserModule, {
    exports: function () {
      return [common_js_.CommonModule, core_js_.ApplicationModule];
    }
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Factory to create a `Meta` service instance for the current DOM document.
 */


function createMeta() {
  return new Meta(ɵɵinject(DOCUMENT));
}
/**
 * A service for managing HTML `<meta>` tags.
 *
 * Properties of the `MetaDefinition` object match the attributes of the
 * HTML `<meta>` tag. These tags define document metadata that is important for
 * things like configuring a Content Security Policy, defining browser compatibility
 * and security settings, setting HTTP Headers, defining rich content for social sharing,
 * and Search Engine Optimization (SEO).
 *
 * To identify specific `<meta>` tags in a document, use an attribute selection
 * string in the format `"tag_attribute='value string'"`.
 * For example, an `attrSelector` value of `"name='description'"` matches a tag
 * whose `name` attribute has the value `"description"`.
 * Selectors are used with the `querySelector()` Document method,
 * in the format `meta[{attrSelector}]`.
 *
 * @see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 * @see [Document.querySelector()](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 *
 *
 * @publicApi
 */


let Meta = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  class Meta {
    constructor(_doc) {
      this._doc = _doc;
      this._dom = ɵgetDOM();
    }
    /**
     * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
     * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
     * values in the provided tag definition, and verifies that all other attribute values are equal.
     * If an existing element is found, it is returned and is not modified in any way.
     * @param tag The definition of a `<meta>` element to match or create.
     * @param forceCreation True to create a new element without checking whether one already exists.
     * @returns The existing element with the same attributes and values if found,
     * the new element if no match is found, or `null` if the tag parameter is not defined.
     */


    addTag(tag, forceCreation = false) {
      if (!tag) return null;
      return this._getOrCreateElement(tag, forceCreation);
    }
    /**
     * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
     * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
     * values in the provided tag definition, and verifies that all other attribute values are equal.
     * @param tags An array of tag definitions to match or create.
     * @param forceCreation True to create new elements without checking whether they already exist.
     * @returns The matching elements if found, or the new elements.
     */


    addTags(tags, forceCreation = false) {
      if (!tags) return [];
      return tags.reduce((result, tag) => {
        if (tag) {
          result.push(this._getOrCreateElement(tag, forceCreation));
        }

        return result;
      }, []);
    }
    /**
     * Retrieves a `<meta>` tag element in the current HTML document.
     * @param attrSelector The tag attribute and value to match against, in the format
     * `"tag_attribute='value string'"`.
     * @returns The matching element, if any.
     */


    getTag(attrSelector) {
      if (!attrSelector) return null;
      return this._doc.querySelector(`meta[${attrSelector}]`) || null;
    }
    /**
     * Retrieves a set of `<meta>` tag elements in the current HTML document.
     * @param attrSelector The tag attribute and value to match against, in the format
     * `"tag_attribute='value string'"`.
     * @returns The matching elements, if any.
     */


    getTags(attrSelector) {
      if (!attrSelector) return [];

      const list
      /*NodeList*/
      = this._doc.querySelectorAll(`meta[${attrSelector}]`);

      return list ? [].slice.call(list) : [];
    }
    /**
     * Modifies an existing `<meta>` tag element in the current HTML document.
     * @param tag The tag description with which to replace the existing tag content.
     * @param selector A tag attribute and value to match against, to identify
     * an existing tag. A string in the format `"tag_attribute=`value string`"`.
     * If not supplied, matches a tag with the same `name` or `property` attribute value as the
     * replacement tag.
     * @return The modified element.
     */


    updateTag(tag, selector) {
      if (!tag) return null;
      selector = selector || this._parseSelector(tag);
      const meta = this.getTag(selector);

      if (meta) {
        return this._setMetaElementAttributes(tag, meta);
      }

      return this._getOrCreateElement(tag, true);
    }
    /**
     * Removes an existing `<meta>` tag element from the current HTML document.
     * @param attrSelector A tag attribute and value to match against, to identify
     * an existing tag. A string in the format `"tag_attribute=`value string`"`.
     */


    removeTag(attrSelector) {
      this.removeTagElement(this.getTag(attrSelector));
    }
    /**
     * Removes an existing `<meta>` tag element from the current HTML document.
     * @param meta The tag definition to match against to identify an existing tag.
     */


    removeTagElement(meta) {
      if (meta) {
        this._dom.remove(meta);
      }
    }

    _getOrCreateElement(meta, forceCreation = false) {
      if (!forceCreation) {
        const selector = this._parseSelector(meta); // It's allowed to have multiple elements with the same name so it's not enough to
        // just check that element with the same name already present on the page. We also need to
        // check if element has tag attributes


        const elem = this.getTags(selector).filter(elem => this._containsAttributes(meta, elem))[0];
        if (elem !== undefined) return elem;
      }

      const element = this._dom.createElement('meta');

      this._setMetaElementAttributes(meta, element);

      const head = this._doc.getElementsByTagName('head')[0];

      head.appendChild(element);
      return element;
    }

    _setMetaElementAttributes(tag, el) {
      Object.keys(tag).forEach(prop => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
      return el;
    }

    _parseSelector(tag) {
      const attr = tag.name ? 'name' : 'property';
      return `${attr}="${tag[attr]}"`;
    }

    _containsAttributes(tag, elem) {
      return Object.keys(tag).every(key => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
    }

    _getMetaKeyMap(prop) {
      return META_KEYS_MAP[prop] || prop;
    }

  }

  Meta.ɵfac = function Meta_Factory(t) {
    return new (t || Meta)(ɵngcc0.ɵɵinject(DOCUMENT));
  };

  Meta.ɵprov = ɵɵdefineInjectable({
    factory: createMeta,
    token: Meta,
    providedIn: "root"
  });
  return Meta;
})()));

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Mapping for MetaDefinition properties with their correct meta attribute names
 */


const META_KEYS_MAP = {
  httpEquiv: 'http-equiv'
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Factory to create Title service.
 */

function createTitle() {
  return new Title(ɵɵinject(DOCUMENT));
}
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * @publicApi
 */


let Title = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  class Title {
    constructor(_doc) {
      this._doc = _doc;
    }
    /**
     * Get the title of the current HTML document.
     */


    getTitle() {
      return this._doc.title;
    }
    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */


    setTitle(newTitle) {
      this._doc.title = newTitle || '';
    }

  }

  Title.ɵfac = function Title_Factory(t) {
    return new (t || Title)(ɵngcc0.ɵɵinject(DOCUMENT));
  };

  Title.ɵprov = ɵɵdefineInjectable({
    factory: createTitle,
    token: Title,
    providedIn: "root"
  });
  return Title;
})()));

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const win = typeof window !== 'undefined' && window || {};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

class ChangeDetectionPerfRecord {
  constructor(msPerTick, numTicks) {
    this.msPerTick = msPerTick;
    this.numTicks = numTicks;
  }

}
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */


class AngularProfiler {
  constructor(ref) {
    this.appRef = ref.injector.get(ApplicationRef);
  } // tslint:disable:no-console

  /**
   * Exercises change detection in a loop and then prints the average amount of
   * time in milliseconds how long a single round of change detection takes for
   * the current state of the UI. It runs a minimum of 5 rounds for a minimum
   * of 500 milliseconds.
   *
   * Optionally, a user may pass a `config` parameter containing a map of
   * options. Supported options are:
   *
   * `record` (boolean) - causes the profiler to record a CPU profile while
   * it exercises the change detector. Example:
   *
   * ```
   * ng.profiler.timeChangeDetection({record: true})
   * ```
   */


  timeChangeDetection(config) {
    const record = config && config['record'];
    const profileName = 'Change Detection'; // Profiler is not available in Android browsers without dev tools opened

    const isProfilerAvailable = win.console.profile != null;

    if (record && isProfilerAvailable) {
      win.console.profile(profileName);
    }

    const start = performanceNow();
    let numTicks = 0;

    while (numTicks < 5 || performanceNow() - start < 500) {
      this.appRef.tick();
      numTicks++;
    }

    const end = performanceNow();

    if (record && isProfilerAvailable) {
      win.console.profileEnd(profileName);
    }

    const msPerTick = (end - start) / numTicks;
    win.console.log(`ran ${numTicks} change detection cycles`);
    win.console.log(`${msPerTick.toFixed(2)} ms per check`);
    return new ChangeDetectionPerfRecord(msPerTick, numTicks);
  }

}

function performanceNow() {
  return win.performance && win.performance.now ? win.performance.now() : new Date().getTime();
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const PROFILER_GLOBAL_NAME = 'profiler';
/**
 * Enabled Angular debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 *
 * @publicApi
 */

function enableDebugTools(ref) {
  exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
  return ref;
}
/**
 * Disables Angular tools.
 *
 * @publicApi
 */


function disableDebugTools() {
  exportNgVar(PROFILER_GLOBAL_NAME, null);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function escapeHtml(text) {
  const escapedText = {
    '&': '&a;',
    '"': '&q;',
    '\'': '&s;',
    '<': '&l;',
    '>': '&g;'
  };
  return text.replace(/[&"'<>]/g, s => escapedText[s]);
}

function unescapeHtml(text) {
  const unescapedText = {
    '&a;': '&',
    '&q;': '"',
    '&s;': '\'',
    '&l;': '<',
    '&g;': '>'
  };
  return text.replace(/&[^;]+;/g, s => unescapedText[s]);
}
/**
 * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
 *
 * Example:
 *
 * ```
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */


function makeStateKey(key) {
  return key;
}
/**
 * A key value store that is transferred from the application on the server side to the application
 * on the client side.
 *
 * `TransferState` will be available as an injectable token. To use it import
 * `ServerTransferStateModule` on the server and `BrowserTransferStateModule` on the client.
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialized in a
 * non-lossy manner.
 *
 * @publicApi
 */


let TransferState = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  class TransferState {
    constructor() {
      this.store = {};
      this.onSerializeCallbacks = {};
    }
    /** @internal */


    static init(initState) {
      const transferState = new TransferState();
      transferState.store = initState;
      return transferState;
    }
    /**
     * Get the value corresponding to a key. Return `defaultValue` if key is not found.
     */


    get(key, defaultValue) {
      return this.store[key] !== undefined ? this.store[key] : defaultValue;
    }
    /**
     * Set the value corresponding to a key.
     */


    set(key, value) {
      this.store[key] = value;
    }
    /**
     * Remove a key from the store.
     */


    remove(key) {
      delete this.store[key];
    }
    /**
     * Test whether a key exists in the store.
     */


    hasKey(key) {
      return this.store.hasOwnProperty(key);
    }
    /**
     * Register a callback to provide the value for a key when `toJson` is called.
     */


    onSerialize(key, callback) {
      this.onSerializeCallbacks[key] = callback;
    }
    /**
     * Serialize the current state of the store to JSON.
     */


    toJson() {
      // Call the onSerialize callbacks and put those values into the store.
      for (const key in this.onSerializeCallbacks) {
        if (this.onSerializeCallbacks.hasOwnProperty(key)) {
          try {
            this.store[key] = this.onSerializeCallbacks[key]();
          } catch (e) {
            console.warn('Exception in onSerialize callback: ', e);
          }
        }
      }

      return JSON.stringify(this.store);
    }

  }

  TransferState.ɵfac = function TransferState_Factory(t) {
    return new (t || TransferState)();
  };

  TransferState.ɵprov = /*@__PURE__*/ɵngcc0.ɵɵdefineInjectable({
    token: TransferState,
    factory: TransferState.ɵfac
  });
  return TransferState;
})()));

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

function initTransferState(doc, appId) {
  // Locate the script tag with the JSON data transferred from the server.
  // The id of the script tag is set to the Angular appId + 'state'.
  const script = doc.getElementById(appId + '-state');
  let initialState = {};

  if (script && script.textContent) {
    try {
      // Avoid using any here as it triggers lint errors in google3 (any is not allowed).
      initialState = JSON.parse(unescapeHtml(script.textContent));
    } catch (e) {
      console.warn('Exception while restoring TransferState for app ' + appId, e);
    }
  }

  return TransferState.init(initialState);
}
/**
 * NgModule to install on the client side while using the `TransferState` to transfer state from
 * server to client.
 *
 * @publicApi
 */


let BrowserTransferStateModule = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  class BrowserTransferStateModule {}

  BrowserTransferStateModule.ɵfac = function BrowserTransferStateModule_Factory(t) {
    return new (t || BrowserTransferStateModule)();
  };

  BrowserTransferStateModule.ɵmod = /*@__PURE__*/ɵngcc0.ɵɵdefineNgModule({
    type: BrowserTransferStateModule
  });
  BrowserTransferStateModule.ɵinj = /*@__PURE__*/ɵngcc0.ɵɵdefineInjector({
    providers: [{
      provide: TransferState,
      useFactory: initTransferState,
      deps: [DOCUMENT, APP_ID]
    }]
  });
  return BrowserTransferStateModule;
})()));

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Predicates for use with {@link DebugElement}'s query functions.
 *
 * @publicApi
 */


class By {
  /**
   * Match all nodes.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
   */
  static all() {
    return () => true;
  }
  /**
   * Match elements by the given CSS selector.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
   */


  static css(selector) {
    return debugElement => {
      return debugElement.nativeElement != null ? elementMatches(debugElement.nativeElement, selector) : false;
    };
  }
  /**
   * Match nodes that have the given directive present.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
   */


  static directive(type) {
    return debugNode => debugNode.providerTokens.indexOf(type) !== -1;
  }

}

function elementMatches(n, selector) {
  if (ɵgetDOM().isElementNode(n)) {
    return n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
  }

  return false;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @publicApi
 */


const VERSION = /*#__PURE__*/new core_js_.Version('12.2.13');
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

 //# sourceMappingURL=platform-browser.js.map
// EXTERNAL MODULE: consume shared module (default) @angular/core@^12.2.0 (strict) (singleton) (fallback: ./node_modules/@angular/core/fesm2015/core.js)
var fesm2015_core_js_ = __webpack_require__(174);
// EXTERNAL MODULE: ./node_modules/rxjs/dist/esm/internal/observable/from.js + 9 modules
var from = __webpack_require__(517);
// EXTERNAL MODULE: ./node_modules/rxjs/dist/esm/internal/Observable.js + 1 modules
var Observable = __webpack_require__(980);
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm/internal/util/argsArgArrayOrObject.js
const {
  isArray
} = Array;
const {
  getPrototypeOf,
  prototype: objectProto,
  keys: getKeys
} = Object;
function argsArgArrayOrObject(args) {
  if (args.length === 1) {
    const first = args[0];

    if (isArray(first)) {
      return {
        args: first,
        keys: null
      };
    }

    if (isPOJO(first)) {
      const keys = getKeys(first);
      return {
        args: keys.map(key => first[key]),
        keys
      };
    }
  }

  return {
    args: args,
    keys: null
  };
}

function isPOJO(obj) {
  return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
} //# sourceMappingURL=argsArgArrayOrObject.js.map
// EXTERNAL MODULE: ./node_modules/rxjs/dist/esm/internal/observable/innerFrom.js
var innerFrom = __webpack_require__(955);
// EXTERNAL MODULE: ./node_modules/rxjs/dist/esm/internal/util/args.js + 1 modules
var util_args = __webpack_require__(7);
// EXTERNAL MODULE: ./node_modules/rxjs/dist/esm/internal/operators/OperatorSubscriber.js
var OperatorSubscriber = __webpack_require__(499);
// EXTERNAL MODULE: ./node_modules/rxjs/dist/esm/internal/operators/map.js
var map = __webpack_require__(969);
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm/internal/util/mapOneOrManyArgs.js

const {
  isArray: mapOneOrManyArgs_isArray
} = Array;

function callOrApply(fn, args) {
  return mapOneOrManyArgs_isArray(args) ? fn(...args) : fn(args);
}

function mapOneOrManyArgs(fn) {
  return (0,map/* map */.U)(args => callOrApply(fn, args));
} //# sourceMappingURL=mapOneOrManyArgs.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm/internal/util/createObject.js
function createObject(keys, values) {
  return keys.reduce((result, key, i) => (result[key] = values[i], result), {});
} //# sourceMappingURL=createObject.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm/internal/observable/forkJoin.js







function forkJoin(...args) {
  const resultSelector = (0,util_args/* popResultSelector */.jO)(args);
  const {
    args: sources,
    keys
  } = argsArgArrayOrObject(args);
  const result = new Observable/* Observable */.y(subscriber => {
    const {
      length
    } = sources;

    if (!length) {
      subscriber.complete();
      return;
    }

    const values = new Array(length);
    let remainingCompletions = length;
    let remainingEmissions = length;

    for (let sourceIndex = 0; sourceIndex < length; sourceIndex++) {
      let hasValue = false;
      (0,innerFrom/* innerFrom */.Xf)(sources[sourceIndex]).subscribe(new OperatorSubscriber/* OperatorSubscriber */.Q(subscriber, value => {
        if (!hasValue) {
          hasValue = true;
          remainingEmissions--;
        }

        values[sourceIndex] = value;
      }, () => remainingCompletions--, undefined, () => {
        if (!remainingCompletions || !hasValue) {
          if (!remainingEmissions) {
            subscriber.next(keys ? createObject(keys, values) : values);
          }

          subscriber.complete();
        }
      }));
    }
  });
  return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
} //# sourceMappingURL=forkJoin.js.map
;// CONCATENATED MODULE: ./node_modules/@angular/forms/fesm2015/forms.js
/**
 * @license Angular v12.2.13
 * (c) 2010-2021 Google LLC. https://angular.io/
 * License: MIT
 */




/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Base class for all ControlValueAccessor classes defined in Forms package.
 * Contains common logic and utility functions.
 *
 * Note: this is an *internal-only* class and should not be extended or used directly in
 * applications code.
 */


let BaseControlValueAccessor = /*#__PURE__*/(() => {
  class BaseControlValueAccessor {
    constructor(_renderer, _elementRef) {
      this._renderer = _renderer;
      this._elementRef = _elementRef;
      /**
       * The registered callback function called when a change or input event occurs on the input
       * element.
       * @nodoc
       */

      this.onChange = _ => {};
      /**
       * The registered callback function called when a blur event occurs on the input element.
       * @nodoc
       */


      this.onTouched = () => {};
    }
    /**
     * Helper method that sets a property on a target element using the current Renderer
     * implementation.
     * @nodoc
     */


    setProperty(key, value) {
      this._renderer.setProperty(this._elementRef.nativeElement, key, value);
    }
    /**
     * Registers a function called when the control is touched.
     * @nodoc
     */


    registerOnTouched(fn) {
      this.onTouched = fn;
    }
    /**
     * Registers a function called when the control value changes.
     * @nodoc
     */


    registerOnChange(fn) {
      this.onChange = fn;
    }
    /**
     * Sets the "disabled" property on the range input element.
     * @nodoc
     */


    setDisabledState(isDisabled) {
      this.setProperty('disabled', isDisabled);
    }

  }

  BaseControlValueAccessor.ɵfac = function BaseControlValueAccessor_Factory(t) {
    return new (t || BaseControlValueAccessor)(core_js_["ɵɵdirectiveInject"](core_js_.Renderer2), core_js_["ɵɵdirectiveInject"](core_js_.ElementRef));
  };

  BaseControlValueAccessor.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: BaseControlValueAccessor
  });
  return BaseControlValueAccessor;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Base class for all built-in ControlValueAccessor classes (except DefaultValueAccessor, which is
 * used in case no other CVAs can be found). We use this class to distinguish between default CVA,
 * built-in CVAs and custom CVAs, so that Forms logic can recognize built-in CVAs and treat custom
 * ones with higher priority (when both built-in and custom CVAs are present).
 *
 * Note: this is an *internal-only* class and should not be extended or used directly in
 * applications code.
 */


let BuiltInControlValueAccessor = /*#__PURE__*/(() => {
  class BuiltInControlValueAccessor extends BaseControlValueAccessor {}

  BuiltInControlValueAccessor.ɵfac = /*@__PURE__*/function () {
    let ɵBuiltInControlValueAccessor_BaseFactory;
    return function BuiltInControlValueAccessor_Factory(t) {
      return (ɵBuiltInControlValueAccessor_BaseFactory || (ɵBuiltInControlValueAccessor_BaseFactory = core_js_["ɵɵgetInheritedFactory"](BuiltInControlValueAccessor)))(t || BuiltInControlValueAccessor);
    };
  }();

  BuiltInControlValueAccessor.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: BuiltInControlValueAccessor,
    features: [core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return BuiltInControlValueAccessor;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Used to provide a `ControlValueAccessor` for form controls.
 *
 * See `DefaultValueAccessor` for how to implement one.
 *
 * @publicApi
 */


const NG_VALUE_ACCESSOR = /*#__PURE__*/new core_js_.InjectionToken('NgValueAccessor');
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => CheckboxControlValueAccessor),
  multi: true
};
/**
 * @description
 * A `ControlValueAccessor` for writing a value and listening to changes on a checkbox input
 * element.
 *
 * @usageNotes
 *
 * ### Using a checkbox with a reactive form.
 *
 * The following example shows how to use a checkbox with a reactive form.
 *
 * ```ts
 * const rememberLoginControl = new FormControl();
 * ```
 *
 * ```
 * <input type="checkbox" [formControl]="rememberLoginControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

let CheckboxControlValueAccessor = /*#__PURE__*/(() => {
  class CheckboxControlValueAccessor extends BuiltInControlValueAccessor {
    /**
     * Sets the "checked" property on the input element.
     * @nodoc
     */
    writeValue(value) {
      this.setProperty('checked', value);
    }

  }

  CheckboxControlValueAccessor.ɵfac = /*@__PURE__*/function () {
    let ɵCheckboxControlValueAccessor_BaseFactory;
    return function CheckboxControlValueAccessor_Factory(t) {
      return (ɵCheckboxControlValueAccessor_BaseFactory || (ɵCheckboxControlValueAccessor_BaseFactory = core_js_["ɵɵgetInheritedFactory"](CheckboxControlValueAccessor)))(t || CheckboxControlValueAccessor);
    };
  }();

  CheckboxControlValueAccessor.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: CheckboxControlValueAccessor,
    selectors: [["input", "type", "checkbox", "formControlName", ""], ["input", "type", "checkbox", "formControl", ""], ["input", "type", "checkbox", "ngModel", ""]],
    hostBindings: function CheckboxControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵlistener"]("change", function CheckboxControlValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.checked);
        })("blur", function CheckboxControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    features: [core_js_["ɵɵProvidersFeature"]([CHECKBOX_VALUE_ACCESSOR]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return CheckboxControlValueAccessor;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const DEFAULT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => DefaultValueAccessor),
  multi: true
};
/**
 * We must check whether the agent is Android because composition events
 * behave differently between iOS and Android.
 */

function _isAndroid() {
  const userAgent = (0,common_js_["ɵgetDOM"])() ? (0,common_js_["ɵgetDOM"])().getUserAgent() : '';
  return /android (\d+)/.test(userAgent.toLowerCase());
}
/**
 * @description
 * Provide this token to control if form directives buffer IME input until
 * the "compositionend" event occurs.
 * @publicApi
 */


const COMPOSITION_BUFFER_MODE = /*#__PURE__*/new core_js_.InjectionToken('CompositionEventMode');
/**
 * The default `ControlValueAccessor` for writing a value and listening to changes on input
 * elements. The accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * {@searchKeywords ngDefaultControl}
 *
 * @usageNotes
 *
 * ### Using the default value accessor
 *
 * The following example shows how to use an input element that activates the default value accessor
 * (in this case, a text field).
 *
 * ```ts
 * const firstNameControl = new FormControl();
 * ```
 *
 * ```
 * <input type="text" [formControl]="firstNameControl">
 * ```
 *
 * This value accessor is used by default for `<input type="text">` and `<textarea>` elements, but
 * you could also use it for custom components that have similar behavior and do not require special
 * processing. In order to attach the default value accessor to a custom element, add the
 * `ngDefaultControl` attribute as shown below.
 *
 * ```
 * <custom-input-component ngDefaultControl [(ngModel)]="value"></custom-input-component>
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

let DefaultValueAccessor = /*#__PURE__*/(() => {
  class DefaultValueAccessor extends BaseControlValueAccessor {
    constructor(renderer, elementRef, _compositionMode) {
      super(renderer, elementRef);
      this._compositionMode = _compositionMode;
      /** Whether the user is creating a composition string (IME events). */

      this._composing = false;

      if (this._compositionMode == null) {
        this._compositionMode = !_isAndroid();
      }
    }
    /**
     * Sets the "value" property on the input element.
     * @nodoc
     */


    writeValue(value) {
      const normalizedValue = value == null ? '' : value;
      this.setProperty('value', normalizedValue);
    }
    /** @internal */


    _handleInput(value) {
      if (!this._compositionMode || this._compositionMode && !this._composing) {
        this.onChange(value);
      }
    }
    /** @internal */


    _compositionStart() {
      this._composing = true;
    }
    /** @internal */


    _compositionEnd(value) {
      this._composing = false;
      this._compositionMode && this.onChange(value);
    }

  }

  DefaultValueAccessor.ɵfac = function DefaultValueAccessor_Factory(t) {
    return new (t || DefaultValueAccessor)(core_js_["ɵɵdirectiveInject"](core_js_.Renderer2), core_js_["ɵɵdirectiveInject"](core_js_.ElementRef), core_js_["ɵɵdirectiveInject"](COMPOSITION_BUFFER_MODE, 8));
  };

  DefaultValueAccessor.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: DefaultValueAccessor,
    selectors: [["input", "formControlName", "", 3, "type", "checkbox"], ["textarea", "formControlName", ""], ["input", "formControl", "", 3, "type", "checkbox"], ["textarea", "formControl", ""], ["input", "ngModel", "", 3, "type", "checkbox"], ["textarea", "ngModel", ""], ["", "ngDefaultControl", ""]],
    hostBindings: function DefaultValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵlistener"]("input", function DefaultValueAccessor_input_HostBindingHandler($event) {
          return ctx._handleInput($event.target.value);
        })("blur", function DefaultValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        })("compositionstart", function DefaultValueAccessor_compositionstart_HostBindingHandler() {
          return ctx._compositionStart();
        })("compositionend", function DefaultValueAccessor_compositionend_HostBindingHandler($event) {
          return ctx._compositionEnd($event.target.value);
        });
      }
    },
    features: [core_js_["ɵɵProvidersFeature"]([DEFAULT_VALUE_ACCESSOR]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return DefaultValueAccessor;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function isEmptyInputValue(value) {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

function hasValidLength(value) {
  // non-strict comparison is intentional, to check for both `null` and `undefined` values
  return value != null && typeof value.length === 'number';
}
/**
 * @description
 * An `InjectionToken` for registering additional synchronous validators used with
 * `AbstractControl`s.
 *
 * @see `NG_ASYNC_VALIDATORS`
 *
 * @usageNotes
 *
 * ### Providing a custom validator
 *
 * The following example registers a custom validator directive. Adding the validator to the
 * existing collection of validators requires the `multi: true` option.
 *
 * ```typescript
 * @Directive({
 *   selector: '[customValidator]',
 *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
 * })
 * class CustomValidatorDirective implements Validator {
 *   validate(control: AbstractControl): ValidationErrors | null {
 *     return { 'custom': true };
 *   }
 * }
 * ```
 *
 * @publicApi
 */


const NG_VALIDATORS = /*#__PURE__*/new core_js_.InjectionToken('NgValidators');
/**
 * @description
 * An `InjectionToken` for registering additional asynchronous validators used with
 * `AbstractControl`s.
 *
 * @see `NG_VALIDATORS`
 *
 * @publicApi
 */

const NG_ASYNC_VALIDATORS = /*#__PURE__*/new core_js_.InjectionToken('NgAsyncValidators');
/**
 * A regular expression that matches valid e-mail addresses.
 *
 * At a high level, this regexp matches e-mail addresses of the format `local-part@tld`, where:
 * - `local-part` consists of one or more of the allowed characters (alphanumeric and some
 *   punctuation symbols).
 * - `local-part` cannot begin or end with a period (`.`).
 * - `local-part` cannot be longer than 64 characters.
 * - `tld` consists of one or more `labels` separated by periods (`.`). For example `localhost` or
 *   `foo.com`.
 * - A `label` consists of one or more of the allowed characters (alphanumeric, dashes (`-`) and
 *   periods (`.`)).
 * - A `label` cannot begin or end with a dash (`-`) or a period (`.`).
 * - A `label` cannot be longer than 63 characters.
 * - The whole address cannot be longer than 254 characters.
 *
 * ## Implementation background
 *
 * This regexp was ported over from AngularJS (see there for git history):
 * https://github.com/angular/angular.js/blob/c133ef836/src/ng/directive/input.js#L27
 * It is based on the
 * [WHATWG version](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
 * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
 * lengths of different parts of the address). The main differences from the WHATWG version are:
 *   - Disallow `local-part` to begin or end with a period (`.`).
 *   - Disallow `local-part` length to exceed 64 characters.
 *   - Disallow total address length to exceed 254 characters.
 *
 * See [this commit](https://github.com/angular/angular.js/commit/f3f5cf72e) for more details.
 */

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/**
 * @description
 * Provides a set of built-in validators that can be used by form controls.
 *
 * A validator is a function that processes a `FormControl` or collection of
 * controls and returns an error map or null. A null map means that validation has passed.
 *
 * @see [Form Validation](/guide/form-validation)
 *
 * @publicApi
 */

class Validators {
  /**
   * @description
   * Validator that requires the control's value to be greater than or equal to the provided number.
   *
   * @usageNotes
   *
   * ### Validate against a minimum of 3
   *
   * ```typescript
   * const control = new FormControl(2, Validators.min(3));
   *
   * console.log(control.errors); // {min: {min: 3, actual: 2}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `min` property if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */
  static min(min) {
    return minValidator(min);
  }
  /**
   * @description
   * Validator that requires the control's value to be less than or equal to the provided number.
   *
   * @usageNotes
   *
   * ### Validate against a maximum of 15
   *
   * ```typescript
   * const control = new FormControl(16, Validators.max(15));
   *
   * console.log(control.errors); // {max: {max: 15, actual: 16}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `max` property if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static max(max) {
    return maxValidator(max);
  }
  /**
   * @description
   * Validator that requires the control have a non-empty value.
   *
   * @usageNotes
   *
   * ### Validate that the field is non-empty
   *
   * ```typescript
   * const control = new FormControl('', Validators.required);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map with the `required` property
   * if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static required(control) {
    return requiredValidator(control);
  }
  /**
   * @description
   * Validator that requires the control's value be true. This validator is commonly
   * used for required checkboxes.
   *
   * @usageNotes
   *
   * ### Validate that the field value is true
   *
   * ```typescript
   * const control = new FormControl('', Validators.requiredTrue);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map that contains the `required` property
   * set to `true` if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static requiredTrue(control) {
    return requiredTrueValidator(control);
  }
  /**
   * @description
   * Validator that requires the control's value pass an email validation test.
   *
   * Tests the value using a [regular
   * expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
   * pattern suitable for common usecases. The pattern is based on the definition of a valid email
   * address in the [WHATWG HTML
   * specification](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
   * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
   * lengths of different parts of the address).
   *
   * The differences from the WHATWG version include:
   * - Disallow `local-part` (the part before the `@` symbol) to begin or end with a period (`.`).
   * - Disallow `local-part` to be longer than 64 characters.
   * - Disallow the whole address to be longer than 254 characters.
   *
   * If this pattern does not satisfy your business needs, you can use `Validators.pattern()` to
   * validate the value against a different pattern.
   *
   * @usageNotes
   *
   * ### Validate that the field matches a valid email pattern
   *
   * ```typescript
   * const control = new FormControl('bad@', Validators.email);
   *
   * console.log(control.errors); // {email: true}
   * ```
   *
   * @returns An error map with the `email` property
   * if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static email(control) {
    return emailValidator(control);
  }
  /**
   * @description
   * Validator that requires the length of the control's value to be greater than or equal
   * to the provided minimum length. This validator is also provided by default if you use the
   * the HTML5 `minlength` attribute. Note that the `minLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays. The
   * `minLength` validator logic is also not invoked for values when their `length` property is 0
   * (for example in case of an empty string or an empty array), to support optional controls. You
   * can use the standard `required` validator if empty values should not be considered valid.
   *
   * @usageNotes
   *
   * ### Validate that the field has a minimum of 3 characters
   *
   * ```typescript
   * const control = new FormControl('ng', Validators.minLength(3));
   *
   * console.log(control.errors); // {minlength: {requiredLength: 3, actualLength: 2}}
   * ```
   *
   * ```html
   * <input minlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `minlength` property if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static minLength(minLength) {
    return minLengthValidator(minLength);
  }
  /**
   * @description
   * Validator that requires the length of the control's value to be less than or equal
   * to the provided maximum length. This validator is also provided by default if you use the
   * the HTML5 `maxlength` attribute. Note that the `maxLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays.
   *
   * @usageNotes
   *
   * ### Validate that the field has maximum of 5 characters
   *
   * ```typescript
   * const control = new FormControl('Angular', Validators.maxLength(5));
   *
   * console.log(control.errors); // {maxlength: {requiredLength: 5, actualLength: 7}}
   * ```
   *
   * ```html
   * <input maxlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `maxlength` property if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static maxLength(maxLength) {
    return maxLengthValidator(maxLength);
  }
  /**
   * @description
   * Validator that requires the control's value to match a regex pattern. This validator is also
   * provided by default if you use the HTML5 `pattern` attribute.
   *
   * @usageNotes
   *
   * ### Validate that the field only contains letters or spaces
   *
   * ```typescript
   * const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));
   *
   * console.log(control.errors); // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
   * ```
   *
   * ```html
   * <input pattern="[a-zA-Z ]*">
   * ```
   *
   * ### Pattern matching with the global or sticky flag
   *
   * `RegExp` objects created with the `g` or `y` flags that are passed into `Validators.pattern`
   * can produce different results on the same input when validations are run consecutively. This is
   * due to how the behavior of `RegExp.prototype.test` is
   * specified in [ECMA-262](https://tc39.es/ecma262/#sec-regexpbuiltinexec)
   * (`RegExp` preserves the index of the last match when the global or sticky flag is used).
   * Due to this behavior, it is recommended that when using
   * `Validators.pattern` you **do not** pass in a `RegExp` object with either the global or sticky
   * flag enabled.
   *
   * ```typescript
   * // Not recommended (since the `g` flag is used)
   * const controlOne = new FormControl('1', Validators.pattern(/foo/g));
   *
   * // Good
   * const controlTwo = new FormControl('1', Validators.pattern(/foo/));
   * ```
   *
   * @param pattern A regular expression to be used as is to test the values, or a string.
   * If a string is passed, the `^` character is prepended and the `$` character is
   * appended to the provided string (if not already present), and the resulting regular
   * expression is used to test the values.
   *
   * @returns A validator function that returns an error map with the
   * `pattern` property if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static pattern(pattern) {
    return patternValidator(pattern);
  }
  /**
   * @description
   * Validator that performs no operation.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static nullValidator(control) {
    return nullValidator(control);
  }

  static compose(validators) {
    return compose(validators);
  }
  /**
   * @description
   * Compose multiple async validators into a single function that returns the union
   * of the individual error objects for the provided control.
   *
   * @returns A validator function that returns an error map with the
   * merged error objects of the async validators if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */


  static composeAsync(validators) {
    return composeAsync(validators);
  }

}
/**
 * Validator that requires the control's value to be greater than or equal to the provided number.
 * See `Validators.min` for additional information.
 */


function minValidator(min) {
  return control => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
      return null; // don't validate empty values to allow optional controls
    }

    const value = parseFloat(control.value); // Controls with NaN values after parsing should be treated as not having a
    // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min

    return !isNaN(value) && value < min ? {
      'min': {
        'min': min,
        'actual': control.value
      }
    } : null;
  };
}
/**
 * Validator that requires the control's value to be less than or equal to the provided number.
 * See `Validators.max` for additional information.
 */


function maxValidator(max) {
  return control => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
      return null; // don't validate empty values to allow optional controls
    }

    const value = parseFloat(control.value); // Controls with NaN values after parsing should be treated as not having a
    // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max

    return !isNaN(value) && value > max ? {
      'max': {
        'max': max,
        'actual': control.value
      }
    } : null;
  };
}
/**
 * Validator that requires the control have a non-empty value.
 * See `Validators.required` for additional information.
 */


function requiredValidator(control) {
  return isEmptyInputValue(control.value) ? {
    'required': true
  } : null;
}
/**
 * Validator that requires the control's value be true. This validator is commonly
 * used for required checkboxes.
 * See `Validators.requiredTrue` for additional information.
 */


function requiredTrueValidator(control) {
  return control.value === true ? null : {
    'required': true
  };
}
/**
 * Validator that requires the control's value pass an email validation test.
 * See `Validators.email` for additional information.
 */


function emailValidator(control) {
  if (isEmptyInputValue(control.value)) {
    return null; // don't validate empty values to allow optional controls
  }

  return EMAIL_REGEXP.test(control.value) ? null : {
    'email': true
  };
}
/**
 * Validator that requires the length of the control's value to be greater than or equal
 * to the provided minimum length. See `Validators.minLength` for additional information.
 */


function minLengthValidator(minLength) {
  return control => {
    if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
      // don't validate empty values to allow optional controls
      // don't validate values without `length` property
      return null;
    }

    return control.value.length < minLength ? {
      'minlength': {
        'requiredLength': minLength,
        'actualLength': control.value.length
      }
    } : null;
  };
}
/**
 * Validator that requires the length of the control's value to be less than or equal
 * to the provided maximum length. See `Validators.maxLength` for additional information.
 */


function maxLengthValidator(maxLength) {
  return control => {
    return hasValidLength(control.value) && control.value.length > maxLength ? {
      'maxlength': {
        'requiredLength': maxLength,
        'actualLength': control.value.length
      }
    } : null;
  };
}
/**
 * Validator that requires the control's value to match a regex pattern.
 * See `Validators.pattern` for additional information.
 */


function patternValidator(pattern) {
  if (!pattern) return nullValidator;
  let regex;
  let regexStr;

  if (typeof pattern === 'string') {
    regexStr = '';
    if (pattern.charAt(0) !== '^') regexStr += '^';
    regexStr += pattern;
    if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';
    regex = new RegExp(regexStr);
  } else {
    regexStr = pattern.toString();
    regex = pattern;
  }

  return control => {
    if (isEmptyInputValue(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    const value = control.value;
    return regex.test(value) ? null : {
      'pattern': {
        'requiredPattern': regexStr,
        'actualValue': value
      }
    };
  };
}
/**
 * Function that has `ValidatorFn` shape, but performs no operation.
 */


function nullValidator(control) {
  return null;
}

function isPresent(o) {
  return o != null;
}

function toObservable(r) {
  const obs = (0,core_js_["ɵisPromise"])(r) ? (0,from/* from */.D)(r) : r;

  if (!(0,core_js_["ɵisObservable"])(obs) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
    throw new Error(`Expected validator to return Promise or Observable.`);
  }

  return obs;
}

function mergeErrors(arrayOfErrors) {
  let res = {}; // Not using Array.reduce here due to a Chrome 80 bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

  arrayOfErrors.forEach(errors => {
    res = errors != null ? Object.assign(Object.assign({}, res), errors) : res;
  });
  return Object.keys(res).length === 0 ? null : res;
}

function executeValidators(control, validators) {
  return validators.map(validator => validator(control));
}

function isValidatorFn(validator) {
  return !validator.validate;
}
/**
 * Given the list of validators that may contain both functions as well as classes, return the list
 * of validator functions (convert validator classes into validator functions). This is needed to
 * have consistent structure in validators list before composing them.
 *
 * @param validators The set of validators that may contain validators both in plain function form
 *     as well as represented as a validator class.
 */


function normalizeValidators(validators) {
  return validators.map(validator => {
    return isValidatorFn(validator) ? validator : c => validator.validate(c);
  });
}
/**
 * Merges synchronous validators into a single validator function.
 * See `Validators.compose` for additional information.
 */


function compose(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function (control) {
    return mergeErrors(executeValidators(control, presentValidators));
  };
}
/**
 * Accepts a list of validators of different possible shapes (`Validator` and `ValidatorFn`),
 * normalizes the list (converts everything to `ValidatorFn`) and merges them into a single
 * validator function.
 */


function composeValidators(validators) {
  return validators != null ? compose(normalizeValidators(validators)) : null;
}
/**
 * Merges asynchronous validators into a single validator function.
 * See `Validators.composeAsync` for additional information.
 */


function composeAsync(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function (control) {
    const observables = executeValidators(control, presentValidators).map(toObservable);
    return forkJoin(observables).pipe((0,map/* map */.U)(mergeErrors));
  };
}
/**
 * Accepts a list of async validators of different possible shapes (`AsyncValidator` and
 * `AsyncValidatorFn`), normalizes the list (converts everything to `AsyncValidatorFn`) and merges
 * them into a single validator function.
 */


function composeAsyncValidators(validators) {
  return validators != null ? composeAsync(normalizeValidators(validators)) : null;
}
/**
 * Merges raw control validators with a given directive validator and returns the combined list of
 * validators as an array.
 */


function mergeValidators(controlValidators, dirValidator) {
  if (controlValidators === null) return [dirValidator];
  return Array.isArray(controlValidators) ? [...controlValidators, dirValidator] : [controlValidators, dirValidator];
}
/**
 * Retrieves the list of raw synchronous validators attached to a given control.
 */


function getControlValidators(control) {
  return control._rawValidators;
}
/**
 * Retrieves the list of raw asynchronous validators attached to a given control.
 */


function getControlAsyncValidators(control) {
  return control._rawAsyncValidators;
}
/**
 * Accepts a singleton validator, an array, or null, and returns an array type with the provided
 * validators.
 *
 * @param validators A validator, validators, or null.
 * @returns A validators array.
 */


function makeValidatorsArray(validators) {
  if (!validators) return [];
  return Array.isArray(validators) ? validators : [validators];
}
/**
 * Determines whether a validator or validators array has a given validator.
 *
 * @param validators The validator or validators to compare against.
 * @param validator The validator to check.
 * @returns Whether the validator is present.
 */


function hasValidator(validators, validator) {
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
/**
 * Combines two arrays of validators into one. If duplicates are provided, only one will be added.
 *
 * @param validators The new validators.
 * @param currentValidators The base array of currrent validators.
 * @returns An array of validators.
 */


function addValidators(validators, currentValidators) {
  const current = makeValidatorsArray(currentValidators);
  const validatorsToAdd = makeValidatorsArray(validators);
  validatorsToAdd.forEach(v => {
    // Note: if there are duplicate entries in the new validators array,
    // only the first one would be added to the current list of validarors.
    // Duplicate ones would be ignored since `hasValidator` would detect
    // the presence of a validator function and we update the current list in place.
    if (!hasValidator(current, v)) {
      current.push(v);
    }
  });
  return current;
}

function removeValidators(validators, currentValidators) {
  return makeValidatorsArray(currentValidators).filter(v => !hasValidator(validators, v));
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @description
 * Base class for control directives.
 *
 * This class is only used internally in the `ReactiveFormsModule` and the `FormsModule`.
 *
 * @publicApi
 */


let AbstractControlDirective = /*#__PURE__*/(() => {
  class AbstractControlDirective {
    constructor() {
      /**
       * Set of synchronous validators as they were provided while calling `setValidators` function.
       * @internal
       */
      this._rawValidators = [];
      /**
       * Set of asynchronous validators as they were provided while calling `setAsyncValidators`
       * function.
       * @internal
       */

      this._rawAsyncValidators = [];
      /*
       * The set of callbacks to be invoked when directive instance is being destroyed.
       */

      this._onDestroyCallbacks = [];
    }
    /**
     * @description
     * Reports the value of the control if it is present, otherwise null.
     */


    get value() {
      return this.control ? this.control.value : null;
    }
    /**
     * @description
     * Reports whether the control is valid. A control is considered valid if no
     * validation errors exist with the current value.
     * If the control is not present, null is returned.
     */


    get valid() {
      return this.control ? this.control.valid : null;
    }
    /**
     * @description
     * Reports whether the control is invalid, meaning that an error exists in the input value.
     * If the control is not present, null is returned.
     */


    get invalid() {
      return this.control ? this.control.invalid : null;
    }
    /**
     * @description
     * Reports whether a control is pending, meaning that that async validation is occurring and
     * errors are not yet available for the input value. If the control is not present, null is
     * returned.
     */


    get pending() {
      return this.control ? this.control.pending : null;
    }
    /**
     * @description
     * Reports whether the control is disabled, meaning that the control is disabled
     * in the UI and is exempt from validation checks and excluded from aggregate
     * values of ancestor controls. If the control is not present, null is returned.
     */


    get disabled() {
      return this.control ? this.control.disabled : null;
    }
    /**
     * @description
     * Reports whether the control is enabled, meaning that the control is included in ancestor
     * calculations of validity or value. If the control is not present, null is returned.
     */


    get enabled() {
      return this.control ? this.control.enabled : null;
    }
    /**
     * @description
     * Reports the control's validation errors. If the control is not present, null is returned.
     */


    get errors() {
      return this.control ? this.control.errors : null;
    }
    /**
     * @description
     * Reports whether the control is pristine, meaning that the user has not yet changed
     * the value in the UI. If the control is not present, null is returned.
     */


    get pristine() {
      return this.control ? this.control.pristine : null;
    }
    /**
     * @description
     * Reports whether the control is dirty, meaning that the user has changed
     * the value in the UI. If the control is not present, null is returned.
     */


    get dirty() {
      return this.control ? this.control.dirty : null;
    }
    /**
     * @description
     * Reports whether the control is touched, meaning that the user has triggered
     * a `blur` event on it. If the control is not present, null is returned.
     */


    get touched() {
      return this.control ? this.control.touched : null;
    }
    /**
     * @description
     * Reports the validation status of the control. Possible values include:
     * 'VALID', 'INVALID', 'DISABLED', and 'PENDING'.
     * If the control is not present, null is returned.
     */


    get status() {
      return this.control ? this.control.status : null;
    }
    /**
     * @description
     * Reports whether the control is untouched, meaning that the user has not yet triggered
     * a `blur` event on it. If the control is not present, null is returned.
     */


    get untouched() {
      return this.control ? this.control.untouched : null;
    }
    /**
     * @description
     * Returns a multicasting observable that emits a validation status whenever it is
     * calculated for the control. If the control is not present, null is returned.
     */


    get statusChanges() {
      return this.control ? this.control.statusChanges : null;
    }
    /**
     * @description
     * Returns a multicasting observable of value changes for the control that emits every time the
     * value of the control changes in the UI or programmatically.
     * If the control is not present, null is returned.
     */


    get valueChanges() {
      return this.control ? this.control.valueChanges : null;
    }
    /**
     * @description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     */


    get path() {
      return null;
    }
    /**
     * Sets synchronous validators for this directive.
     * @internal
     */


    _setValidators(validators) {
      this._rawValidators = validators || [];
      this._composedValidatorFn = composeValidators(this._rawValidators);
    }
    /**
     * Sets asynchronous validators for this directive.
     * @internal
     */


    _setAsyncValidators(validators) {
      this._rawAsyncValidators = validators || [];
      this._composedAsyncValidatorFn = composeAsyncValidators(this._rawAsyncValidators);
    }
    /**
     * @description
     * Synchronous validator function composed of all the synchronous validators registered with this
     * directive.
     */


    get validator() {
      return this._composedValidatorFn || null;
    }
    /**
     * @description
     * Asynchronous validator function composed of all the asynchronous validators registered with
     * this directive.
     */


    get asyncValidator() {
      return this._composedAsyncValidatorFn || null;
    }
    /**
     * Internal function to register callbacks that should be invoked
     * when directive instance is being destroyed.
     * @internal
     */


    _registerOnDestroy(fn) {
      this._onDestroyCallbacks.push(fn);
    }
    /**
     * Internal function to invoke all registered "on destroy" callbacks.
     * Note: calling this function also clears the list of callbacks.
     * @internal
     */


    _invokeOnDestroyCallbacks() {
      this._onDestroyCallbacks.forEach(fn => fn());

      this._onDestroyCallbacks = [];
    }
    /**
     * @description
     * Resets the control with the provided value if the control is present.
     */


    reset(value = undefined) {
      if (this.control) this.control.reset(value);
    }
    /**
     * @description
     * Reports whether the control with the given path has the error specified.
     *
     * @param errorCode The code of the error to check
     * @param path A list of control names that designates how to move from the current control
     * to the control that should be queried for errors.
     *
     * @usageNotes
     * For example, for the following `FormGroup`:
     *
     * ```
     * form = new FormGroup({
     *   address: new FormGroup({ street: new FormControl() })
     * });
     * ```
     *
     * The path to the 'street' control from the root form would be 'address' -> 'street'.
     *
     * It can be provided to this method in one of two formats:
     *
     * 1. An array of string control names, e.g. `['address', 'street']`
     * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
     *
     * If no path is given, this method checks for the error on the current control.
     *
     * @returns whether the given error is present in the control at the given path.
     *
     * If the control is not present, false is returned.
     */


    hasError(errorCode, path) {
      return this.control ? this.control.hasError(errorCode, path) : false;
    }
    /**
     * @description
     * Reports error data for the control with the given path.
     *
     * @param errorCode The code of the error to check
     * @param path A list of control names that designates how to move from the current control
     * to the control that should be queried for errors.
     *
     * @usageNotes
     * For example, for the following `FormGroup`:
     *
     * ```
     * form = new FormGroup({
     *   address: new FormGroup({ street: new FormControl() })
     * });
     * ```
     *
     * The path to the 'street' control from the root form would be 'address' -> 'street'.
     *
     * It can be provided to this method in one of two formats:
     *
     * 1. An array of string control names, e.g. `['address', 'street']`
     * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
     *
     * @returns error data for that particular error. If the control or error is not present,
     * null is returned.
     */


    getError(errorCode, path) {
      return this.control ? this.control.getError(errorCode, path) : null;
    }

  }

  AbstractControlDirective.ɵfac = function AbstractControlDirective_Factory(t) {
    return new (t || AbstractControlDirective)();
  };

  AbstractControlDirective.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: AbstractControlDirective
  });
  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */

  /**
   * @description
   * A base class for directives that contain multiple registered instances of `NgControl`.
   * Only used by the forms module.
   *
   * @publicApi
   */

  return AbstractControlDirective;
})();
let ControlContainer = /*#__PURE__*/(() => {
  class ControlContainer extends AbstractControlDirective {
    /**
     * @description
     * The top-level form directive for the control.
     */
    get formDirective() {
      return null;
    }
    /**
     * @description
     * The path to this group.
     */


    get path() {
      return null;
    }

  }

  ControlContainer.ɵfac = /*@__PURE__*/function () {
    let ɵControlContainer_BaseFactory;
    return function ControlContainer_Factory(t) {
      return (ɵControlContainer_BaseFactory || (ɵControlContainer_BaseFactory = core_js_["ɵɵgetInheritedFactory"](ControlContainer)))(t || ControlContainer);
    };
  }();

  ControlContainer.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: ControlContainer,
    features: [core_js_["ɵɵInheritDefinitionFeature"]]
  });
  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */

  /**
   * @description
   * A base class that all `FormControl`-based directives extend. It binds a `FormControl`
   * object to a DOM element.
   *
   * @publicApi
   */

  return ControlContainer;
})();

class NgControl extends AbstractControlDirective {
  constructor() {
    super(...arguments);
    /**
     * @description
     * The parent form for the control.
     *
     * @internal
     */

    this._parent = null;
    /**
     * @description
     * The name for the control
     */

    this.name = null;
    /**
     * @description
     * The value accessor for the control
     */

    this.valueAccessor = null;
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


class AbstractControlStatus {
  constructor(cd) {
    this._cd = cd;
  }

  is(status) {
    var _a, _b, _c; // Currently with ViewEngine (in AOT mode) it's not possible to use private methods in host
    // bindings.
    // TODO: once ViewEngine is removed, this function should be refactored:
    //  - make the `is` method `protected`, so it's not accessible publicly
    //  - move the `submitted` status logic to the `NgControlStatusGroup` class
    //    and make it `private` or `protected` too.


    if (status === 'submitted') {
      // We check for the `submitted` field from `NgForm` and `FormGroupDirective` classes, but
      // we avoid instanceof checks to prevent non-tree-shakable references to those types.
      return !!((_a = this._cd) === null || _a === void 0 ? void 0 : _a.submitted);
    }

    return !!((_c = (_b = this._cd) === null || _b === void 0 ? void 0 : _b.control) === null || _c === void 0 ? void 0 : _c[status]);
  }

}

const ngControlStatusHost = {
  '[class.ng-untouched]': 'is("untouched")',
  '[class.ng-touched]': 'is("touched")',
  '[class.ng-pristine]': 'is("pristine")',
  '[class.ng-dirty]': 'is("dirty")',
  '[class.ng-valid]': 'is("valid")',
  '[class.ng-invalid]': 'is("invalid")',
  '[class.ng-pending]': 'is("pending")'
};
const ngGroupStatusHost = {
  '[class.ng-untouched]': 'is("untouched")',
  '[class.ng-touched]': 'is("touched")',
  '[class.ng-pristine]': 'is("pristine")',
  '[class.ng-dirty]': 'is("dirty")',
  '[class.ng-valid]': 'is("valid")',
  '[class.ng-invalid]': 'is("invalid")',
  '[class.ng-pending]': 'is("pending")',
  '[class.ng-submitted]': 'is("submitted")'
};
/**
 * @description
 * Directive automatically applied to Angular form controls that sets CSS classes
 * based on control status.
 *
 * @usageNotes
 *
 * ### CSS classes applied
 *
 * The following classes are applied as the properties become true:
 *
 * * ng-valid
 * * ng-invalid
 * * ng-pending
 * * ng-pristine
 * * ng-dirty
 * * ng-untouched
 * * ng-touched
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

let NgControlStatus = /*#__PURE__*/(() => {
  class NgControlStatus extends AbstractControlStatus {
    constructor(cd) {
      super(cd);
    }

  }

  NgControlStatus.ɵfac = function NgControlStatus_Factory(t) {
    return new (t || NgControlStatus)(core_js_["ɵɵdirectiveInject"](NgControl, 2));
  };

  NgControlStatus.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: NgControlStatus,
    selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
    hostVars: 14,
    hostBindings: function NgControlStatus_HostBindings(rf, ctx) {
      if (rf & 2) {
        core_js_["ɵɵclassProp"]("ng-untouched", ctx.is("untouched"))("ng-touched", ctx.is("touched"))("ng-pristine", ctx.is("pristine"))("ng-dirty", ctx.is("dirty"))("ng-valid", ctx.is("valid"))("ng-invalid", ctx.is("invalid"))("ng-pending", ctx.is("pending"));
      }
    },
    features: [core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return NgControlStatus;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Directive automatically applied to Angular form groups that sets CSS classes
 * based on control status (valid/invalid/dirty/etc). On groups, this includes the additional
 * class ng-submitted.
 *
 * @see `NgControlStatus`
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


let NgControlStatusGroup = /*#__PURE__*/(() => {
  class NgControlStatusGroup extends AbstractControlStatus {
    constructor(cd) {
      super(cd);
    }

  }

  NgControlStatusGroup.ɵfac = function NgControlStatusGroup_Factory(t) {
    return new (t || NgControlStatusGroup)(core_js_["ɵɵdirectiveInject"](ControlContainer, 10));
  };

  NgControlStatusGroup.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: NgControlStatusGroup,
    selectors: [["", "formGroupName", ""], ["", "formArrayName", ""], ["", "ngModelGroup", ""], ["", "formGroup", ""], ["form", 3, "ngNoForm", ""], ["", "ngForm", ""]],
    hostVars: 16,
    hostBindings: function NgControlStatusGroup_HostBindings(rf, ctx) {
      if (rf & 2) {
        core_js_["ɵɵclassProp"]("ng-untouched", ctx.is("untouched"))("ng-touched", ctx.is("touched"))("ng-pristine", ctx.is("pristine"))("ng-dirty", ctx.is("dirty"))("ng-valid", ctx.is("valid"))("ng-invalid", ctx.is("invalid"))("ng-pending", ctx.is("pending"))("ng-submitted", ctx.is("submitted"));
      }
    },
    features: [core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return NgControlStatusGroup;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const formControlNameExample = `
  <div [formGroup]="myGroup">
    <input formControlName="firstName">
  </div>

  In your class:

  this.myGroup = new FormGroup({
      firstName: new FormControl()
  });`;
const formGroupNameExample = `
  <div [formGroup]="myGroup">
      <div formGroupName="person">
        <input formControlName="firstName">
      </div>
  </div>

  In your class:

  this.myGroup = new FormGroup({
      person: new FormGroup({ firstName: new FormControl() })
  });`;
const formArrayNameExample = `
  <div [formGroup]="myGroup">
    <div formArrayName="cities">
      <div *ngFor="let city of cityArray.controls; index as i">
        <input [formControlName]="i">
      </div>
    </div>
  </div>

  In your class:

  this.cityArray = new FormArray([new FormControl('SF')]);
  this.myGroup = new FormGroup({
    cities: this.cityArray
  });`;
const ngModelGroupExample = `
  <form>
      <div ngModelGroup="person">
        <input [(ngModel)]="person.name" name="firstName">
      </div>
  </form>`;
const ngModelWithFormGroupExample = `
  <div [formGroup]="myGroup">
      <input formControlName="firstName">
      <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">
  </div>
`;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

function controlParentException() {
  return new Error(`formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formControlNameExample}`);
}

function ngModelGroupException() {
  return new Error(`formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents
      that also have a "form" prefix: formGroupName, formArrayName, or formGroup.

      Option 1:  Update the parent to be formGroupName (reactive form strategy)

      ${formGroupNameExample}

      Option 2: Use ngModel instead of formControlName (template-driven strategy)

      ${ngModelGroupExample}`);
}

function missingFormException() {
  return new Error(`formGroup expects a FormGroup instance. Please pass one in.

      Example:

      ${formControlNameExample}`);
}

function groupParentException() {
  return new Error(`formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup
    directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formGroupNameExample}`);
}

function arrayParentException() {
  return new Error(`formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

      Example:

      ${formArrayNameExample}`);
}

const disabledAttrWarning = `
  It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
  when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
  you. We recommend using this approach to avoid 'changed after checked' errors.

  Example:
  form = new FormGroup({
    first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    last: new FormControl('Drew', Validators.required)
  });
`;

function ngModelWarning(directiveName) {
  return `
  It looks like you're using ngModel on the same form field as ${directiveName}.
  Support for using the ngModel input property and ngModelChange event with
  reactive form directives has been deprecated in Angular v6 and will be removed
  in a future version of Angular.

  For more information on this, see our API docs here:
  https://angular.io/api/forms/${directiveName === 'formControl' ? 'FormControlDirective' : 'FormControlName'}#use-with-ngmodel
  `;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function controlPath(name, parent) {
  return [...parent.path, name];
}
/**
 * Links a Form control and a Form directive by setting up callbacks (such as `onChange`) on both
 * instances. This function is typically invoked when form directive is being initialized.
 *
 * @param control Form control instance that should be linked.
 * @param dir Directive that should be linked with a given control.
 */


function setUpControl(control, dir) {
  if (typeof ngDevMode === 'undefined' || ngDevMode) {
    if (!control) _throwError(dir, 'Cannot find control with');
    if (!dir.valueAccessor) _throwError(dir, 'No value accessor for form control with');
  }

  setUpValidators(control, dir);
  dir.valueAccessor.writeValue(control.value);
  setUpViewChangePipeline(control, dir);
  setUpModelChangePipeline(control, dir);
  setUpBlurPipeline(control, dir);
  setUpDisabledChangeHandler(control, dir);
}
/**
 * Reverts configuration performed by the `setUpControl` control function.
 * Effectively disconnects form control with a given form directive.
 * This function is typically invoked when corresponding form directive is being destroyed.
 *
 * @param control Form control which should be cleaned up.
 * @param dir Directive that should be disconnected from a given control.
 * @param validateControlPresenceOnChange Flag that indicates whether onChange handler should
 *     contain asserts to verify that it's not called once directive is destroyed. We need this flag
 *     to avoid potentially breaking changes caused by better control cleanup introduced in #39235.
 */


function cleanUpControl(control, dir, validateControlPresenceOnChange = true) {
  const noop = () => {
    if (validateControlPresenceOnChange && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      _noControlError(dir);
    }
  }; // The `valueAccessor` field is typically defined on FromControl and FormControlName directive
  // instances and there is a logic in `selectValueAccessor` function that throws if it's not the
  // case. We still check the presence of `valueAccessor` before invoking its methods to make sure
  // that cleanup works correctly if app code or tests are setup to ignore the error thrown from
  // `selectValueAccessor`. See https://github.com/angular/angular/issues/40521.


  if (dir.valueAccessor) {
    dir.valueAccessor.registerOnChange(noop);
    dir.valueAccessor.registerOnTouched(noop);
  }

  cleanUpValidators(control, dir);

  if (control) {
    dir._invokeOnDestroyCallbacks();

    control._registerOnCollectionChange(() => {});
  }
}

function registerOnValidatorChange(validators, onChange) {
  validators.forEach(validator => {
    if (validator.registerOnValidatorChange) validator.registerOnValidatorChange(onChange);
  });
}
/**
 * Sets up disabled change handler function on a given form control if ControlValueAccessor
 * associated with a given directive instance supports the `setDisabledState` call.
 *
 * @param control Form control where disabled change handler should be setup.
 * @param dir Corresponding directive instance associated with this control.
 */


function setUpDisabledChangeHandler(control, dir) {
  if (dir.valueAccessor.setDisabledState) {
    const onDisabledChange = isDisabled => {
      dir.valueAccessor.setDisabledState(isDisabled);
    };

    control.registerOnDisabledChange(onDisabledChange); // Register a callback function to cleanup disabled change handler
    // from a control instance when a directive is destroyed.

    dir._registerOnDestroy(() => {
      control._unregisterOnDisabledChange(onDisabledChange);
    });
  }
}
/**
 * Sets up sync and async directive validators on provided form control.
 * This function merges validators from the directive into the validators of the control.
 *
 * @param control Form control where directive validators should be setup.
 * @param dir Directive instance that contains validators to be setup.
 */


function setUpValidators(control, dir) {
  const validators = getControlValidators(control);

  if (dir.validator !== null) {
    control.setValidators(mergeValidators(validators, dir.validator));
  } else if (typeof validators === 'function') {
    // If sync validators are represented by a single validator function, we force the
    // `Validators.compose` call to happen by executing the `setValidators` function with
    // an array that contains that function. We need this to avoid possible discrepancies in
    // validators behavior, so sync validators are always processed by the `Validators.compose`.
    // Note: we should consider moving this logic inside the `setValidators` function itself, so we
    // have consistent behavior on AbstractControl API level. The same applies to the async
    // validators logic below.
    control.setValidators([validators]);
  }

  const asyncValidators = getControlAsyncValidators(control);

  if (dir.asyncValidator !== null) {
    control.setAsyncValidators(mergeValidators(asyncValidators, dir.asyncValidator));
  } else if (typeof asyncValidators === 'function') {
    control.setAsyncValidators([asyncValidators]);
  } // Re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4


  const onValidatorChange = () => control.updateValueAndValidity();

  registerOnValidatorChange(dir._rawValidators, onValidatorChange);
  registerOnValidatorChange(dir._rawAsyncValidators, onValidatorChange);
}
/**
 * Cleans up sync and async directive validators on provided form control.
 * This function reverts the setup performed by the `setUpValidators` function, i.e.
 * removes directive-specific validators from a given control instance.
 *
 * @param control Form control from where directive validators should be removed.
 * @param dir Directive instance that contains validators to be removed.
 * @returns true if a control was updated as a result of this action.
 */


function cleanUpValidators(control, dir) {
  let isControlUpdated = false;

  if (control !== null) {
    if (dir.validator !== null) {
      const validators = getControlValidators(control);

      if (Array.isArray(validators) && validators.length > 0) {
        // Filter out directive validator function.
        const updatedValidators = validators.filter(validator => validator !== dir.validator);

        if (updatedValidators.length !== validators.length) {
          isControlUpdated = true;
          control.setValidators(updatedValidators);
        }
      }
    }

    if (dir.asyncValidator !== null) {
      const asyncValidators = getControlAsyncValidators(control);

      if (Array.isArray(asyncValidators) && asyncValidators.length > 0) {
        // Filter out directive async validator function.
        const updatedAsyncValidators = asyncValidators.filter(asyncValidator => asyncValidator !== dir.asyncValidator);

        if (updatedAsyncValidators.length !== asyncValidators.length) {
          isControlUpdated = true;
          control.setAsyncValidators(updatedAsyncValidators);
        }
      }
    }
  } // Clear onValidatorChange callbacks by providing a noop function.


  const noop = () => {};

  registerOnValidatorChange(dir._rawValidators, noop);
  registerOnValidatorChange(dir._rawAsyncValidators, noop);
  return isControlUpdated;
}

function setUpViewChangePipeline(control, dir) {
  dir.valueAccessor.registerOnChange(newValue => {
    control._pendingValue = newValue;
    control._pendingChange = true;
    control._pendingDirty = true;
    if (control.updateOn === 'change') updateControl(control, dir);
  });
}

function setUpBlurPipeline(control, dir) {
  dir.valueAccessor.registerOnTouched(() => {
    control._pendingTouched = true;
    if (control.updateOn === 'blur' && control._pendingChange) updateControl(control, dir);
    if (control.updateOn !== 'submit') control.markAsTouched();
  });
}

function updateControl(control, dir) {
  if (control._pendingDirty) control.markAsDirty();
  control.setValue(control._pendingValue, {
    emitModelToViewChange: false
  });
  dir.viewToModelUpdate(control._pendingValue);
  control._pendingChange = false;
}

function setUpModelChangePipeline(control, dir) {
  const onChange = (newValue, emitModelEvent) => {
    // control -> view
    dir.valueAccessor.writeValue(newValue); // control -> ngModel

    if (emitModelEvent) dir.viewToModelUpdate(newValue);
  };

  control.registerOnChange(onChange); // Register a callback function to cleanup onChange handler
  // from a control instance when a directive is destroyed.

  dir._registerOnDestroy(() => {
    control._unregisterOnChange(onChange);
  });
}
/**
 * Links a FormGroup or FormArray instance and corresponding Form directive by setting up validators
 * present in the view.
 *
 * @param control FormGroup or FormArray instance that should be linked.
 * @param dir Directive that provides view validators.
 */


function setUpFormContainer(control, dir) {
  if (control == null && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwError(dir, 'Cannot find control with');
  setUpValidators(control, dir);
}
/**
 * Reverts the setup performed by the `setUpFormContainer` function.
 *
 * @param control FormGroup or FormArray instance that should be cleaned up.
 * @param dir Directive that provided view validators.
 * @returns true if a control was updated as a result of this action.
 */


function cleanUpFormContainer(control, dir) {
  return cleanUpValidators(control, dir);
}

function _noControlError(dir) {
  return _throwError(dir, 'There is no FormControl instance attached to form control element with');
}

function _throwError(dir, message) {
  let messageEnd;

  if (dir.path.length > 1) {
    messageEnd = `path: '${dir.path.join(' -> ')}'`;
  } else if (dir.path[0]) {
    messageEnd = `name: '${dir.path}'`;
  } else {
    messageEnd = 'unspecified name attribute';
  }

  throw new Error(`${message} ${messageEnd}`);
}

function isPropertyUpdated(changes, viewModel) {
  if (!changes.hasOwnProperty('model')) return false;
  const change = changes['model'];
  if (change.isFirstChange()) return true;
  return !Object.is(viewModel, change.currentValue);
}

function isBuiltInAccessor(valueAccessor) {
  // Check if a given value accessor is an instance of a class that directly extends
  // `BuiltInControlValueAccessor` one.
  return Object.getPrototypeOf(valueAccessor.constructor) === BuiltInControlValueAccessor;
}

function syncPendingControls(form, directives) {
  form._syncPendingControls();

  directives.forEach(dir => {
    const control = dir.control;

    if (control.updateOn === 'submit' && control._pendingChange) {
      dir.viewToModelUpdate(control._pendingValue);
      control._pendingChange = false;
    }
  });
} // TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented


function selectValueAccessor(dir, valueAccessors) {
  if (!valueAccessors) return null;
  if (!Array.isArray(valueAccessors) && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwError(dir, 'Value accessor was not provided as an array for form control with');
  let defaultAccessor = undefined;
  let builtinAccessor = undefined;
  let customAccessor = undefined;
  valueAccessors.forEach(v => {
    if (v.constructor === DefaultValueAccessor) {
      defaultAccessor = v;
    } else if (isBuiltInAccessor(v)) {
      if (builtinAccessor && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwError(dir, 'More than one built-in value accessor matches form control with');
      builtinAccessor = v;
    } else {
      if (customAccessor && (typeof ngDevMode === 'undefined' || ngDevMode)) _throwError(dir, 'More than one custom value accessor matches form control with');
      customAccessor = v;
    }
  });
  if (customAccessor) return customAccessor;
  if (builtinAccessor) return builtinAccessor;
  if (defaultAccessor) return defaultAccessor;

  if (typeof ngDevMode === 'undefined' || ngDevMode) {
    _throwError(dir, 'No valid value accessor for form control with');
  }

  return null;
}

function removeListItem(list, el) {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
} // TODO(kara): remove after deprecation period


function _ngModelWarning(name, type, instance, warningConfig) {
  if (warningConfig === 'never') return;

  if ((warningConfig === null || warningConfig === 'once') && !type._ngModelWarningSentOnce || warningConfig === 'always' && !instance._ngModelWarningSent) {
    console.warn(ngModelWarning(name));
    type._ngModelWarningSentOnce = true;
    instance._ngModelWarningSent = true;
  }
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Reports that a FormControl is valid, meaning that no errors exist in the input value.
 *
 * @see `status`
 */


const VALID = 'VALID';
/**
 * Reports that a FormControl is invalid, meaning that an error exists in the input value.
 *
 * @see `status`
 */

const INVALID = 'INVALID';
/**
 * Reports that a FormControl is pending, meaning that that async validation is occurring and
 * errors are not yet available for the input value.
 *
 * @see `markAsPending`
 * @see `status`
 */

const PENDING = 'PENDING';
/**
 * Reports that a FormControl is disabled, meaning that the control is exempt from ancestor
 * calculations of validity or value.
 *
 * @see `markAsDisabled`
 * @see `status`
 */

const DISABLED = 'DISABLED';

function _find(control, path, delimiter) {
  if (path == null) return null;

  if (!Array.isArray(path)) {
    path = path.split(delimiter);
  }

  if (Array.isArray(path) && path.length === 0) return null; // Not using Array.reduce here due to a Chrome 80 bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

  let controlToFind = control;
  path.forEach(name => {
    if (controlToFind instanceof FormGroup) {
      controlToFind = controlToFind.controls.hasOwnProperty(name) ? controlToFind.controls[name] : null;
    } else if (controlToFind instanceof FormArray) {
      controlToFind = controlToFind.at(name) || null;
    } else {
      controlToFind = null;
    }
  });
  return controlToFind;
}
/**
 * Gets validators from either an options object or given validators.
 */


function pickValidators(validatorOrOpts) {
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.validators : validatorOrOpts) || null;
}
/**
 * Creates validator function by combining provided validators.
 */


function coerceToValidator(validator) {
  return Array.isArray(validator) ? composeValidators(validator) : validator || null;
}
/**
 * Gets async validators from either an options object or given validators.
 */


function pickAsyncValidators(asyncValidator, validatorOrOpts) {
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.asyncValidators : asyncValidator) || null;
}
/**
 * Creates async validator function by combining provided async validators.
 */


function coerceToAsyncValidator(asyncValidator) {
  return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator || null;
}

function isOptionsObj(validatorOrOpts) {
  return validatorOrOpts != null && !Array.isArray(validatorOrOpts) && typeof validatorOrOpts === 'object';
}
/**
 * This is the base class for `FormControl`, `FormGroup`, and `FormArray`.
 *
 * It provides some of the shared behavior that all controls and groups of controls have, like
 * running validators, calculating status, and resetting state. It also defines the properties
 * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
 * instantiated directly.
 *
 * @see [Forms Guide](/guide/forms)
 * @see [Reactive Forms Guide](/guide/reactive-forms)
 * @see [Dynamic Forms Guide](/guide/dynamic-form)
 *
 * @publicApi
 */


class AbstractControl {
  /**
   * Initialize the AbstractControl instance.
   *
   * @param validators The function or array of functions that is used to determine the validity of
   *     this control synchronously.
   * @param asyncValidators The function or array of functions that is used to determine validity of
   *     this control asynchronously.
   */
  constructor(validators, asyncValidators) {
    /**
     * Indicates that a control has its own pending asynchronous validation in progress.
     *
     * @internal
     */
    this._hasOwnPendingAsyncValidator = false;
    /** @internal */

    this._onCollectionChange = () => {};

    this._parent = null;
    /**
     * A control is `pristine` if the user has not yet changed
     * the value in the UI.
     *
     * @returns True if the user has not yet changed the value in the UI; compare `dirty`.
     * Programmatic changes to a control's value do not mark it dirty.
     */

    this.pristine = true;
    /**
     * True if the control is marked as `touched`.
     *
     * A control is marked `touched` once the user has triggered
     * a `blur` event on it.
     */

    this.touched = false;
    /** @internal */

    this._onDisabledChange = [];
    this._rawValidators = validators;
    this._rawAsyncValidators = asyncValidators;
    this._composedValidatorFn = coerceToValidator(this._rawValidators);
    this._composedAsyncValidatorFn = coerceToAsyncValidator(this._rawAsyncValidators);
  }
  /**
   * Returns the function that is used to determine the validity of this control synchronously.
   * If multiple validators have been added, this will be a single composed function.
   * See `Validators.compose()` for additional information.
   */


  get validator() {
    return this._composedValidatorFn;
  }

  set validator(validatorFn) {
    this._rawValidators = this._composedValidatorFn = validatorFn;
  }
  /**
   * Returns the function that is used to determine the validity of this control asynchronously.
   * If multiple validators have been added, this will be a single composed function.
   * See `Validators.compose()` for additional information.
   */


  get asyncValidator() {
    return this._composedAsyncValidatorFn;
  }

  set asyncValidator(asyncValidatorFn) {
    this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
  }
  /**
   * The parent control.
   */


  get parent() {
    return this._parent;
  }
  /**
   * A control is `valid` when its `status` is `VALID`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control has passed all of its validation tests,
   * false otherwise.
   */


  get valid() {
    return this.status === VALID;
  }
  /**
   * A control is `invalid` when its `status` is `INVALID`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control has failed one or more of its validation checks,
   * false otherwise.
   */


  get invalid() {
    return this.status === INVALID;
  }
  /**
   * A control is `pending` when its `status` is `PENDING`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control is in the process of conducting a validation check,
   * false otherwise.
   */


  get pending() {
    return this.status == PENDING;
  }
  /**
   * A control is `disabled` when its `status` is `DISABLED`.
   *
   * Disabled controls are exempt from validation checks and
   * are not included in the aggregate value of their ancestor
   * controls.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control is disabled, false otherwise.
   */


  get disabled() {
    return this.status === DISABLED;
  }
  /**
   * A control is `enabled` as long as its `status` is not `DISABLED`.
   *
   * @returns True if the control has any status other than 'DISABLED',
   * false if the status is 'DISABLED'.
   *
   * @see {@link AbstractControl.status}
   *
   */


  get enabled() {
    return this.status !== DISABLED;
  }
  /**
   * A control is `dirty` if the user has changed the value
   * in the UI.
   *
   * @returns True if the user has changed the value of this control in the UI; compare `pristine`.
   * Programmatic changes to a control's value do not mark it dirty.
   */


  get dirty() {
    return !this.pristine;
  }
  /**
   * True if the control has not been marked as touched
   *
   * A control is `untouched` if the user has not yet triggered
   * a `blur` event on it.
   */


  get untouched() {
    return !this.touched;
  }
  /**
   * Reports the update strategy of the `AbstractControl` (meaning
   * the event on which the control updates itself).
   * Possible values: `'change'` | `'blur'` | `'submit'`
   * Default value: `'change'`
   */


  get updateOn() {
    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : 'change';
  }
  /**
   * Sets the synchronous validators that are active on this control.  Calling
   * this overwrites any existing synchronous validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * If you want to add a new validator without affecting existing ones, consider
   * using `addValidators()` method instead.
   */


  setValidators(validators) {
    this._rawValidators = validators;
    this._composedValidatorFn = coerceToValidator(validators);
  }
  /**
   * Sets the asynchronous validators that are active on this control. Calling this
   * overwrites any existing asynchronous validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * If you want to add a new validator without affecting existing ones, consider
   * using `addAsyncValidators()` method instead.
   */


  setAsyncValidators(validators) {
    this._rawAsyncValidators = validators;
    this._composedAsyncValidatorFn = coerceToAsyncValidator(validators);
  }
  /**
   * Add a synchronous validator or validators to this control, without affecting other validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * Adding a validator that already exists will have no effect. If duplicate validator functions
   * are present in the `validators` array, only the first instance would be added to a form
   * control.
   *
   * @param validators The new validator function or functions to add to this control.
   */


  addValidators(validators) {
    this.setValidators(addValidators(validators, this._rawValidators));
  }
  /**
   * Add an asynchronous validator or validators to this control, without affecting other
   * validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * Adding a validator that already exists will have no effect.
   *
   * @param validators The new asynchronous validator function or functions to add to this control.
   */


  addAsyncValidators(validators) {
    this.setAsyncValidators(addValidators(validators, this._rawAsyncValidators));
  }
  /**
   * Remove a synchronous validator from this control, without affecting other validators.
   * Validators are compared by function reference; you must pass a reference to the exact same
   * validator function as the one that was originally set. If a provided validator is not found,
   * it is ignored.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * @param validators The validator or validators to remove.
   */


  removeValidators(validators) {
    this.setValidators(removeValidators(validators, this._rawValidators));
  }
  /**
   * Remove an asynchronous validator from this control, without affecting other validators.
   * Validators are compared by function reference; you must pass a reference to the exact same
   * validator function as the one that was originally set. If a provided validator is not found, it
   * is ignored.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * @param validators The asynchronous validator or validators to remove.
   */


  removeAsyncValidators(validators) {
    this.setAsyncValidators(removeValidators(validators, this._rawAsyncValidators));
  }
  /**
   * Check whether a synchronous validator function is present on this control. The provided
   * validator must be a reference to the exact same function that was provided.
   *
   * @param validator The validator to check for presence. Compared by function reference.
   * @returns Whether the provided validator was found on this control.
   */


  hasValidator(validator) {
    return hasValidator(this._rawValidators, validator);
  }
  /**
   * Check whether an asynchronous validator function is present on this control. The provided
   * validator must be a reference to the exact same function that was provided.
   *
   * @param validator The asynchronous validator to check for presence. Compared by function
   *     reference.
   * @returns Whether the provided asynchronous validator was found on this control.
   */


  hasAsyncValidator(validator) {
    return hasValidator(this._rawAsyncValidators, validator);
  }
  /**
   * Empties out the synchronous validator list.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */


  clearValidators() {
    this.validator = null;
  }
  /**
   * Empties out the async validator list.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */


  clearAsyncValidators() {
    this.asyncValidator = null;
  }
  /**
   * Marks the control as `touched`. A control is touched by focus and
   * blur events that do not change the value.
   *
   * @see `markAsUntouched()`
   * @see `markAsDirty()`
   * @see `markAsPristine()`
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */


  markAsTouched(opts = {}) {
    this.touched = true;

    if (this._parent && !opts.onlySelf) {
      this._parent.markAsTouched(opts);
    }
  }
  /**
   * Marks the control and all its descendant controls as `touched`.
   * @see `markAsTouched()`
   */


  markAllAsTouched() {
    this.markAsTouched({
      onlySelf: true
    });

    this._forEachChild(control => control.markAllAsTouched());
  }
  /**
   * Marks the control as `untouched`.
   *
   * If the control has any children, also marks all children as `untouched`
   * and recalculates the `touched` status of all parent controls.
   *
   * @see `markAsTouched()`
   * @see `markAsDirty()`
   * @see `markAsPristine()`
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after the marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */


  markAsUntouched(opts = {}) {
    this.touched = false;
    this._pendingTouched = false;

    this._forEachChild(control => {
      control.markAsUntouched({
        onlySelf: true
      });
    });

    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts);
    }
  }
  /**
   * Marks the control as `dirty`. A control becomes dirty when
   * the control's value is changed through the UI; compare `markAsTouched`.
   *
   * @see `markAsTouched()`
   * @see `markAsUntouched()`
   * @see `markAsPristine()`
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */


  markAsDirty(opts = {}) {
    this.pristine = false;

    if (this._parent && !opts.onlySelf) {
      this._parent.markAsDirty(opts);
    }
  }
  /**
   * Marks the control as `pristine`.
   *
   * If the control has any children, marks all children as `pristine`,
   * and recalculates the `pristine` status of all parent
   * controls.
   *
   * @see `markAsTouched()`
   * @see `markAsUntouched()`
   * @see `markAsDirty()`
   *
   * @param opts Configuration options that determine how the control emits events after
   * marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */


  markAsPristine(opts = {}) {
    this.pristine = true;
    this._pendingDirty = false;

    this._forEachChild(control => {
      control.markAsPristine({
        onlySelf: true
      });
    });

    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts);
    }
  }
  /**
   * Marks the control as `pending`.
   *
   * A control is pending while the control performs async validation.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configuration options that determine how the control propagates changes and
   * emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), the `statusChanges`
   * observable emits an event with the latest status the control is marked pending.
   * When false, no events are emitted.
   *
   */


  markAsPending(opts = {}) {
    this.status = PENDING;

    if (opts.emitEvent !== false) {
      this.statusChanges.emit(this.status);
    }

    if (this._parent && !opts.onlySelf) {
      this._parent.markAsPending(opts);
    }
  }
  /**
   * Disables the control. This means the control is exempt from validation checks and
   * excluded from the aggregate value of any parent. Its status is `DISABLED`.
   *
   * If the control has children, all children are also disabled.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configuration options that determine how the control propagates
   * changes and emits events after the control is disabled.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is disabled.
   * When false, no events are emitted.
   */


  disable(opts = {}) {
    // If parent has been marked artificially dirty we don't want to re-calculate the
    // parent's dirtiness based on the children.
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);

    this.status = DISABLED;
    this.errors = null;

    this._forEachChild(control => {
      control.disable(Object.assign(Object.assign({}, opts), {
        onlySelf: true
      }));
    });

    this._updateValue();

    if (opts.emitEvent !== false) {
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }

    this._updateAncestors(Object.assign(Object.assign({}, opts), {
      skipPristineCheck
    }));

    this._onDisabledChange.forEach(changeFn => changeFn(true));
  }
  /**
   * Enables the control. This means the control is included in validation checks and
   * the aggregate value of its parent. Its status recalculates based on its value and
   * its validators.
   *
   * By default, if the control has children, all children are enabled.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configure options that control how the control propagates changes and
   * emits events when marked as untouched
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is enabled.
   * When false, no events are emitted.
   */


  enable(opts = {}) {
    // If parent has been marked artificially dirty we don't want to re-calculate the
    // parent's dirtiness based on the children.
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);

    this.status = VALID;

    this._forEachChild(control => {
      control.enable(Object.assign(Object.assign({}, opts), {
        onlySelf: true
      }));
    });

    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });

    this._updateAncestors(Object.assign(Object.assign({}, opts), {
      skipPristineCheck
    }));

    this._onDisabledChange.forEach(changeFn => changeFn(false));
  }

  _updateAncestors(opts) {
    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts);

      if (!opts.skipPristineCheck) {
        this._parent._updatePristine();
      }

      this._parent._updateTouched();
    }
  }
  /**
   * @param parent Sets the parent of the control
   */


  setParent(parent) {
    this._parent = parent;
  }
  /**
   * Recalculates the value and validation status of the control.
   *
   * By default, it also updates the value and validity of its ancestors.
   *
   * @param opts Configuration options determine how the control propagates changes and emits events
   * after updates and validity checks are applied.
   * * `onlySelf`: When true, only update this control. When false or not supplied,
   * update all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is updated.
   * When false, no events are emitted.
   */


  updateValueAndValidity(opts = {}) {
    this._setInitialStatus();

    this._updateValue();

    if (this.enabled) {
      this._cancelExistingSubscription();

      this.errors = this._runValidator();
      this.status = this._calculateStatus();

      if (this.status === VALID || this.status === PENDING) {
        this._runAsyncValidator(opts.emitEvent);
      }
    }

    if (opts.emitEvent !== false) {
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }

    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts);
    }
  }
  /** @internal */


  _updateTreeValidity(opts = {
    emitEvent: true
  }) {
    this._forEachChild(ctrl => ctrl._updateTreeValidity(opts));

    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
  }

  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? DISABLED : VALID;
  }

  _runValidator() {
    return this.validator ? this.validator(this) : null;
  }

  _runAsyncValidator(emitEvent) {
    if (this.asyncValidator) {
      this.status = PENDING;
      this._hasOwnPendingAsyncValidator = true;
      const obs = toObservable(this.asyncValidator(this));
      this._asyncValidationSubscription = obs.subscribe(errors => {
        this._hasOwnPendingAsyncValidator = false; // This will trigger the recalculation of the validation status, which depends on
        // the state of the asynchronous validation (whether it is in progress or not). So, it is
        // necessary that we have updated the `_hasOwnPendingAsyncValidator` boolean flag first.

        this.setErrors(errors, {
          emitEvent
        });
      });
    }
  }

  _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();

      this._hasOwnPendingAsyncValidator = false;
    }
  }
  /**
   * Sets errors on a form control when running validations manually, rather than automatically.
   *
   * Calling `setErrors` also updates the validity of the parent control.
   *
   * @usageNotes
   *
   * ### Manually set the errors for a control
   *
   * ```
   * const login = new FormControl('someLogin');
   * login.setErrors({
   *   notUnique: true
   * });
   *
   * expect(login.valid).toEqual(false);
   * expect(login.errors).toEqual({ notUnique: true });
   *
   * login.setValue('someOtherLogin');
   *
   * expect(login.valid).toEqual(true);
   * ```
   */


  setErrors(errors, opts = {}) {
    this.errors = errors;

    this._updateControlsErrors(opts.emitEvent !== false);
  }
  /**
   * Retrieves a child control given the control's name or path.
   *
   * @param path A dot-delimited string or array of string/number values that define the path to the
   * control.
   *
   * @usageNotes
   * ### Retrieve a nested control
   *
   * For example, to get a `name` control nested within a `person` sub-group:
   *
   * * `this.form.get('person.name');`
   *
   * -OR-
   *
   * * `this.form.get(['person', 'name']);`
   *
   * ### Retrieve a control in a FormArray
   *
   * When accessing an element inside a FormArray, you can use an element index.
   * For example, to get a `price` control from the first element in an `items` array you can use:
   *
   * * `this.form.get('items.0.price');`
   *
   * -OR-
   *
   * * `this.form.get(['items', 0, 'price']);`
   */


  get(path) {
    return _find(this, path, '.');
  }
  /**
   * @description
   * Reports error data for the control with the given path.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * @returns error data for that particular error. If the control or error is not present,
   * null is returned.
   */


  getError(errorCode, path) {
    const control = path ? this.get(path) : this;
    return control && control.errors ? control.errors[errorCode] : null;
  }
  /**
   * @description
   * Reports whether the control with the given path has the error specified.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * If no path is given, this method checks for the error on the current control.
   *
   * @returns whether the given error is present in the control at the given path.
   *
   * If the control is not present, false is returned.
   */


  hasError(errorCode, path) {
    return !!this.getError(errorCode, path);
  }
  /**
   * Retrieves the top-level ancestor of this control.
   */


  get root() {
    let x = this;

    while (x._parent) {
      x = x._parent;
    }

    return x;
  }
  /** @internal */


  _updateControlsErrors(emitEvent) {
    this.status = this._calculateStatus();

    if (emitEvent) {
      this.statusChanges.emit(this.status);
    }

    if (this._parent) {
      this._parent._updateControlsErrors(emitEvent);
    }
  }
  /** @internal */


  _initObservables() {
    this.valueChanges = new core_js_.EventEmitter();
    this.statusChanges = new core_js_.EventEmitter();
  }

  _calculateStatus() {
    if (this._allControlsDisabled()) return DISABLED;
    if (this.errors) return INVALID;
    if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(PENDING)) return PENDING;
    if (this._anyControlsHaveStatus(INVALID)) return INVALID;
    return VALID;
  }
  /** @internal */


  _anyControlsHaveStatus(status) {
    return this._anyControls(control => control.status === status);
  }
  /** @internal */


  _anyControlsDirty() {
    return this._anyControls(control => control.dirty);
  }
  /** @internal */


  _anyControlsTouched() {
    return this._anyControls(control => control.touched);
  }
  /** @internal */


  _updatePristine(opts = {}) {
    this.pristine = !this._anyControlsDirty();

    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts);
    }
  }
  /** @internal */


  _updateTouched(opts = {}) {
    this.touched = this._anyControlsTouched();

    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts);
    }
  }
  /** @internal */


  _isBoxedValue(formState) {
    return typeof formState === 'object' && formState !== null && Object.keys(formState).length === 2 && 'value' in formState && 'disabled' in formState;
  }
  /** @internal */


  _registerOnCollectionChange(fn) {
    this._onCollectionChange = fn;
  }
  /** @internal */


  _setUpdateStrategy(opts) {
    if (isOptionsObj(opts) && opts.updateOn != null) {
      this._updateOn = opts.updateOn;
    }
  }
  /**
   * Check to see if parent has been marked artificially dirty.
   *
   * @internal
   */


  _parentMarkedDirty(onlySelf) {
    const parentDirty = this._parent && this._parent.dirty;
    return !onlySelf && !!parentDirty && !this._parent._anyControlsDirty();
  }

}
/**
 * Tracks the value and validation status of an individual form control.
 *
 * This is one of the three fundamental building blocks of Angular forms, along with
 * `FormGroup` and `FormArray`. It extends the `AbstractControl` class that
 * implements most of the base functionality for accessing the value, validation status,
 * user interactions and events. See [usage examples below](#usage-notes).
 *
 * @see `AbstractControl`
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see [Usage Notes](#usage-notes)
 *
 * @usageNotes
 *
 * ### Initializing Form Controls
 *
 * Instantiate a `FormControl`, with an initial value.
 *
 * ```ts
 * const control = new FormControl('some value');
 * console.log(control.value);     // 'some value'
 *```
 *
 * The following example initializes the control with a form state object. The `value`
 * and `disabled` keys are required in this case.
 *
 * ```ts
 * const control = new FormControl({ value: 'n/a', disabled: true });
 * console.log(control.value);     // 'n/a'
 * console.log(control.status);    // 'DISABLED'
 * ```
 *
 * The following example initializes the control with a synchronous validator.
 *
 * ```ts
 * const control = new FormControl('', Validators.required);
 * console.log(control.value);      // ''
 * console.log(control.status);     // 'INVALID'
 * ```
 *
 * The following example initializes the control using an options object.
 *
 * ```ts
 * const control = new FormControl('', {
 *    validators: Validators.required,
 *    asyncValidators: myAsyncValidator
 * });
 * ```
 *
 * ### Configure the control to update on a blur event
 *
 * Set the `updateOn` option to `'blur'` to update on the blur `event`.
 *
 * ```ts
 * const control = new FormControl('', { updateOn: 'blur' });
 * ```
 *
 * ### Configure the control to update on a submit event
 *
 * Set the `updateOn` option to `'submit'` to update on a submit `event`.
 *
 * ```ts
 * const control = new FormControl('', { updateOn: 'submit' });
 * ```
 *
 * ### Reset the control back to an initial value
 *
 * You reset to a specific form state by passing through a standalone
 * value or a form state object that contains both a value and a disabled state
 * (these are the only two properties that cannot be calculated).
 *
 * ```ts
 * const control = new FormControl('Nancy');
 *
 * console.log(control.value); // 'Nancy'
 *
 * control.reset('Drew');
 *
 * console.log(control.value); // 'Drew'
 * ```
 *
 * ### Reset the control back to an initial value and disabled
 *
 * ```
 * const control = new FormControl('Nancy');
 *
 * console.log(control.value); // 'Nancy'
 * console.log(control.status); // 'VALID'
 *
 * control.reset({ value: 'Drew', disabled: true });
 *
 * console.log(control.value); // 'Drew'
 * console.log(control.status); // 'DISABLED'
 * ```
 *
 * @publicApi
 */


class FormControl extends AbstractControl {
  /**
   * Creates a new `FormControl` instance.
   *
   * @param formState Initializes the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(formState = null, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    /** @internal */

    this._onChange = [];

    this._applyFormState(formState);

    this._setUpdateStrategy(validatorOrOpts);

    this._initObservables();

    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`.
      // The status should be broadcasted via the `statusChanges` observable, so we set `emitEvent`
      // to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  /**
   * Sets a new value for the form control.
   *
   * @param value The new value for the control.
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the value changes.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * * `emitModelToViewChange`: When true or not supplied  (the default), each change triggers an
   * `onChange` event to
   * update the view.
   * * `emitViewToModelChange`: When true or not supplied (the default), each change triggers an
   * `ngModelChange`
   * event to update the model.
   *
   */


  setValue(value, options = {}) {
    this.value = this._pendingValue = value;

    if (this._onChange.length && options.emitModelToViewChange !== false) {
      this._onChange.forEach(changeFn => changeFn(this.value, options.emitViewToModelChange !== false));
    }

    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of a control.
   *
   * This function is functionally the same as {@link FormControl#setValue setValue} at this level.
   * It exists for symmetry with {@link FormGroup#patchValue patchValue} on `FormGroups` and
   * `FormArrays`, where it does behave differently.
   *
   * @see `setValue` for options
   */


  patchValue(value, options = {}) {
    this.setValue(value, options);
  }
  /**
   * Resets the form control, marking it `pristine` and `untouched`, and setting
   * the value to null.
   *
   * @param formState Resets the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events after the value changes.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   *
   */


  reset(formState = null, options = {}) {
    this._applyFormState(formState);

    this.markAsPristine(options);
    this.markAsUntouched(options);
    this.setValue(this.value, options);
    this._pendingChange = false;
  }
  /**
   * @internal
   */


  _updateValue() {}
  /**
   * @internal
   */


  _anyControls(condition) {
    return false;
  }
  /**
   * @internal
   */


  _allControlsDisabled() {
    return this.disabled;
  }
  /**
   * Register a listener for change events.
   *
   * @param fn The method that is called when the value changes
   */


  registerOnChange(fn) {
    this._onChange.push(fn);
  }
  /**
   * Internal function to unregister a change events listener.
   * @internal
   */


  _unregisterOnChange(fn) {
    removeListItem(this._onChange, fn);
  }
  /**
   * Register a listener for disabled events.
   *
   * @param fn The method that is called when the disabled status changes.
   */


  registerOnDisabledChange(fn) {
    this._onDisabledChange.push(fn);
  }
  /**
   * Internal function to unregister a disabled event listener.
   * @internal
   */


  _unregisterOnDisabledChange(fn) {
    removeListItem(this._onDisabledChange, fn);
  }
  /**
   * @internal
   */


  _forEachChild(cb) {}
  /** @internal */


  _syncPendingControls() {
    if (this.updateOn === 'submit') {
      if (this._pendingDirty) this.markAsDirty();
      if (this._pendingTouched) this.markAsTouched();

      if (this._pendingChange) {
        this.setValue(this._pendingValue, {
          onlySelf: true,
          emitModelToViewChange: false
        });
        return true;
      }
    }

    return false;
  }

  _applyFormState(formState) {
    if (this._isBoxedValue(formState)) {
      this.value = this._pendingValue = formState.value;
      formState.disabled ? this.disable({
        onlySelf: true,
        emitEvent: false
      }) : this.enable({
        onlySelf: true,
        emitEvent: false
      });
    } else {
      this.value = this._pendingValue = formState;
    }
  }

}
/**
 * Tracks the value and validity state of a group of `FormControl` instances.
 *
 * A `FormGroup` aggregates the values of each child `FormControl` into one object,
 * with each control name as the key.  It calculates its status by reducing the status values
 * of its children. For example, if one of the controls in a group is invalid, the entire
 * group becomes invalid.
 *
 * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with `FormControl` and `FormArray`.
 *
 * When instantiating a `FormGroup`, pass in a collection of child controls as the first
 * argument. The key for each child registers the name for the control.
 *
 * @usageNotes
 *
 * ### Create a form group with 2 controls
 *
 * ```
 * const form = new FormGroup({
 *   first: new FormControl('Nancy', Validators.minLength(2)),
 *   last: new FormControl('Drew'),
 * });
 *
 * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
 * console.log(form.status);  // 'VALID'
 * ```
 *
 * ### Create a form group with a group-level validator
 *
 * You include group-level validators as the second arg, or group-level async
 * validators as the third arg. These come in handy when you want to perform validation
 * that considers the value of more than one child control.
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('', Validators.minLength(2)),
 *   passwordConfirm: new FormControl('', Validators.minLength(2)),
 * }, passwordMatchValidator);
 *
 *
 * function passwordMatchValidator(g: FormGroup) {
 *    return g.get('password').value === g.get('passwordConfirm').value
 *       ? null : {'mismatch': true};
 * }
 * ```
 *
 * Like `FormControl` instances, you choose to pass in
 * validators and async validators as part of an options object.
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('')
 *   passwordConfirm: new FormControl('')
 * }, { validators: passwordMatchValidator, asyncValidators: otherValidator });
 * ```
 *
 * ### Set the updateOn property for all controls in a form group
 *
 * The options object is used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * group level, all child controls default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * ```ts
 * const c = new FormGroup({
 *   one: new FormControl()
 * }, { updateOn: 'blur' });
 * ```
 *
 * @publicApi
 */


class FormGroup extends AbstractControl {
  /**
   * Creates a new `FormGroup` instance.
   *
   * @param controls A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.controls = controls;

    this._initObservables();

    this._setUpdateStrategy(validatorOrOpts);

    this._setUpControls();

    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`. The status should be broadcasted via the `statusChanges` observable,
      // so we set `emitEvent` to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  /**
   * Registers a control with the group's list of controls.
   *
   * This method does not update the value or validity of the control.
   * Use {@link FormGroup#addControl addControl} instead.
   *
   * @param name The control name to register in the collection
   * @param control Provides the control for the given name
   */


  registerControl(name, control) {
    if (this.controls[name]) return this.controls[name];
    this.controls[name] = control;
    control.setParent(this);

    control._registerOnCollectionChange(this._onCollectionChange);

    return control;
  }
  /**
   * Add a control to this group.
   *
   * If a control with a given name already exists, it would *not* be replaced with a new one.
   * If you want to replace an existing control, use the {@link FormGroup#setControl setControl}
   * method instead. This method also updates the value and validity of the control.
   *
   * @param name The control name to add to the collection
   * @param control Provides the control for the given name
   * @param options Specifies whether this FormGroup instance should emit events after a new
   *     control is added.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * added. When false, no events are emitted.
   */


  addControl(name, control, options = {}) {
    this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });

    this._onCollectionChange();
  }
  /**
   * Remove a control from this group.
   *
   * This method also updates the value and validity of the control.
   *
   * @param name The control name to remove from the collection
   * @param options Specifies whether this FormGroup instance should emit events after a
   *     control is removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * removed. When false, no events are emitted.
   */


  removeControl(name, options = {}) {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {});
    delete this.controls[name];
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });

    this._onCollectionChange();
  }
  /**
   * Replace an existing control.
   *
   * If a control with a given name does not exist in this `FormGroup`, it will be added.
   *
   * @param name The control name to replace in the collection
   * @param control Provides the control for the given name
   * @param options Specifies whether this FormGroup instance should emit events after an
   *     existing control is replaced.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * replaced with a new one. When false, no events are emitted.
   */


  setControl(name, control, options = {}) {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {});
    delete this.controls[name];
    if (control) this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });

    this._onCollectionChange();
  }
  /**
   * Check whether there is an enabled control with the given name in the group.
   *
   * Reports false for disabled controls. If you'd like to check for existence in the group
   * only, use {@link AbstractControl#get get} instead.
   *
   * @param controlName The control name to check for existence in the collection
   *
   * @returns false for disabled controls, true otherwise.
   */


  contains(controlName) {
    return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
  }
  /**
   * Sets the value of the `FormGroup`. It accepts an object that matches
   * the structure of the group, with control names as keys.
   *
   * @usageNotes
   * ### Set the complete value for the form group
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl(),
   *   last: new FormControl()
   * });
   *
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.setValue({first: 'Nancy', last: 'Drew'});
   * console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
   * ```
   *
   * @throws When strict checks fail, such as setting the value of a control
   * that doesn't exist or if you exclude a value of a control that does exist.
   *
   * @param value The new value for the control that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes
   * and emits events after the value changes.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   */


  setValue(value, options = {}) {
    this._checkAllValuesPresent(value);

    Object.keys(value).forEach(name => {
      this._throwIfControlMissing(name);

      this.controls[name].setValue(value[name], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of the `FormGroup`. It accepts an object with control
   * names as keys, and does its best to match the values to the correct controls
   * in the group.
   *
   * It accepts both super-sets and sub-sets of the group without throwing an error.
   *
   * @usageNotes
   * ### Patch the value for a form group
   *
   * ```
   * const form = new FormGroup({
   *    first: new FormControl(),
   *    last: new FormControl()
   * });
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.patchValue({first: 'Nancy'});
   * console.log(form.value);   // {first: 'Nancy', last: null}
   * ```
   *
   * @param value The object that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes and
   * emits events after the value is patched.
   * * `onlySelf`: When true, each change only affects this control and not its parent. Default is
   * true.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control value
   * is updated. When false, no events are emitted. The configuration options are passed to
   * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
   */


  patchValue(value, options = {}) {
    // Even though the `value` argument type doesn't allow `null` and `undefined` values, the
    // `patchValue` can be called recursively and inner data structures might have these values, so
    // we just ignore such cases when a field containing FormGroup instance receives `null` or
    // `undefined` as a value.
    if (value == null
    /* both `null` and `undefined` */
    ) return;
    Object.keys(value).forEach(name => {
      if (this.controls[name]) {
        this.controls[name].patchValue(value[name], {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Resets the `FormGroup`, marks all descendants `pristine` and `untouched` and sets
   * the value of all descendants to null.
   *
   * You reset to a specific form state by passing in a map of states
   * that matches the structure of your form, with control names as keys. The state
   * is a standalone value or a form state object with both a value and a disabled
   * status.
   *
   * @param value Resets the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the group is reset.
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * @usageNotes
   *
   * ### Reset the form group values
   *
   * ```ts
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * console.log(form.value);  // {first: 'first name', last: 'last name'}
   *
   * form.reset({ first: 'name', last: 'last name' });
   *
   * console.log(form.value);  // {first: 'name', last: 'last name'}
   * ```
   *
   * ### Reset the form group values and disabled status
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * form.reset({
   *   first: {value: 'name', disabled: true},
   *   last: 'last'
   * });
   *
   * console.log(form.value);  // {last: 'last'}
   * console.log(form.get('first').status);  // 'DISABLED'
   * ```
   */


  reset(value = {}, options = {}) {
    this._forEachChild((control, name) => {
      control.reset(value[name], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });

    this._updatePristine(options);

    this._updateTouched(options);

    this.updateValueAndValidity(options);
  }
  /**
   * The aggregate value of the `FormGroup`, including any disabled controls.
   *
   * Retrieves all values regardless of disabled status.
   * The `value` property is the best way to get the value of the group, because
   * it excludes disabled controls in the `FormGroup`.
   */


  getRawValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      acc[name] = control instanceof FormControl ? control.value : control.getRawValue();
      return acc;
    });
  }
  /** @internal */


  _syncPendingControls() {
    let subtreeUpdated = this._reduceChildren(false, (updated, child) => {
      return child._syncPendingControls() ? true : updated;
    });

    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  /** @internal */


  _throwIfControlMissing(name) {
    if (!Object.keys(this.controls).length) {
      throw new Error(`
        There are no form controls registered with this group yet. If you're using ngModel,
        you may want to check next tick (e.g. use setTimeout).
      `);
    }

    if (!this.controls[name]) {
      throw new Error(`Cannot find form control with name: ${name}.`);
    }
  }
  /** @internal */


  _forEachChild(cb) {
    Object.keys(this.controls).forEach(key => {
      // The list of controls can change (for ex. controls might be removed) while the loop
      // is running (as a result of invoking Forms API in `valueChanges` subscription), so we
      // have to null check before invoking the callback.
      const control = this.controls[key];
      control && cb(control, key);
    });
  }
  /** @internal */


  _setUpControls() {
    this._forEachChild(control => {
      control.setParent(this);

      control._registerOnCollectionChange(this._onCollectionChange);
    });
  }
  /** @internal */


  _updateValue() {
    this.value = this._reduceValue();
  }
  /** @internal */


  _anyControls(condition) {
    for (const controlName of Object.keys(this.controls)) {
      const control = this.controls[controlName];

      if (this.contains(controlName) && condition(control)) {
        return true;
      }
    }

    return false;
  }
  /** @internal */


  _reduceValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      if (control.enabled || this.disabled) {
        acc[name] = control.value;
      }

      return acc;
    });
  }
  /** @internal */


  _reduceChildren(initValue, fn) {
    let res = initValue;

    this._forEachChild((control, name) => {
      res = fn(res, control, name);
    });

    return res;
  }
  /** @internal */


  _allControlsDisabled() {
    for (const controlName of Object.keys(this.controls)) {
      if (this.controls[controlName].enabled) {
        return false;
      }
    }

    return Object.keys(this.controls).length > 0 || this.disabled;
  }
  /** @internal */


  _checkAllValuesPresent(value) {
    this._forEachChild((control, name) => {
      if (value[name] === undefined) {
        throw new Error(`Must supply a value for form control with name: '${name}'.`);
      }
    });
  }

}
/**
 * Tracks the value and validity state of an array of `FormControl`,
 * `FormGroup` or `FormArray` instances.
 *
 * A `FormArray` aggregates the values of each child `FormControl` into an array.
 * It calculates its status by reducing the status values of its children. For example, if one of
 * the controls in a `FormArray` is invalid, the entire array becomes invalid.
 *
 * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with `FormControl` and `FormGroup`.
 *
 * @usageNotes
 *
 * ### Create an array of form controls
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy', Validators.minLength(2)),
 *   new FormControl('Drew'),
 * ]);
 *
 * console.log(arr.value);   // ['Nancy', 'Drew']
 * console.log(arr.status);  // 'VALID'
 * ```
 *
 * ### Create a form array with array-level validators
 *
 * You include array-level validators and async validators. These come in handy
 * when you want to perform validation that considers the value of more than one child
 * control.
 *
 * The two types of validators are passed in separately as the second and third arg
 * respectively, or together as part of an options object.
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy'),
 *   new FormControl('Drew')
 * ], {validators: myValidator, asyncValidators: myAsyncValidator});
 * ```
 *
 * ### Set the updateOn property for all controls in a form array
 *
 * The options object is used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * array level, all child controls default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * ```ts
 * const arr = new FormArray([
 *    new FormControl()
 * ], {updateOn: 'blur'});
 * ```
 *
 * ### Adding or removing controls from a form array
 *
 * To change the controls in the array, use the `push`, `insert`, `removeAt` or `clear` methods
 * in `FormArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `FormArray` directly, as that result in strange and unexpected behavior such
 * as broken change detection.
 *
 * @publicApi
 */


class FormArray extends AbstractControl {
  /**
   * Creates a new `FormArray` instance.
   *
   * @param controls An array of child controls. Each child control is given an index
   * where it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.controls = controls;

    this._initObservables();

    this._setUpdateStrategy(validatorOrOpts);

    this._setUpControls();

    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`.
      // The status should be broadcasted via the `statusChanges` observable, so we set `emitEvent`
      // to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  /**
   * Get the `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to retrieve the control
   */


  at(index) {
    return this.controls[index];
  }
  /**
   * Insert a new `AbstractControl` at the end of the array.
   *
   * @param control Form control to be inserted
   * @param options Specifies whether this FormArray instance should emit events after a new
   *     control is added.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * inserted. When false, no events are emitted.
   */


  push(control, options = {}) {
    this.controls.push(control);

    this._registerControl(control);

    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });

    this._onCollectionChange();
  }
  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to insert the control
   * @param control Form control to be inserted
   * @param options Specifies whether this FormArray instance should emit events after a new
   *     control is inserted.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * inserted. When false, no events are emitted.
   */


  insert(index, control, options = {}) {
    this.controls.splice(index, 0, control);

    this._registerControl(control);

    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Remove the control at the given `index` in the array.
   *
   * @param index Index in the array to remove the control
   * @param options Specifies whether this FormArray instance should emit events after a
   *     control is removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * removed. When false, no events are emitted.
   */


  removeAt(index, options = {}) {
    if (this.controls[index]) this.controls[index]._registerOnCollectionChange(() => {});
    this.controls.splice(index, 1);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control
   * @param control The `AbstractControl` control to replace the existing control
   * @param options Specifies whether this FormArray instance should emit events after an
   *     existing control is replaced with a new one.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * replaced with a new one. When false, no events are emitted.
   */


  setControl(index, control, options = {}) {
    if (this.controls[index]) this.controls[index]._registerOnCollectionChange(() => {});
    this.controls.splice(index, 1);

    if (control) {
      this.controls.splice(index, 0, control);

      this._registerControl(control);
    }

    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });

    this._onCollectionChange();
  }
  /**
   * Length of the control array.
   */


  get length() {
    return this.controls.length;
  }
  /**
   * Sets the value of the `FormArray`. It accepts an array that matches
   * the structure of the control.
   *
   * This method performs strict checks, and throws an error if you try
   * to set the value of a control that doesn't exist or if you exclude the
   * value of a control.
   *
   * @usageNotes
   * ### Set the values for the controls in the form array
   *
   * ```
   * const arr = new FormArray([
   *   new FormControl(),
   *   new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.setValue(['Nancy', 'Drew']);
   * console.log(arr.value);   // ['Nancy', 'Drew']
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */


  setValue(value, options = {}) {
    this._checkAllValuesPresent(value);

    value.forEach((newValue, index) => {
      this._throwIfControlMissing(index);

      this.at(index).setValue(newValue, {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of the `FormArray`. It accepts an array that matches the
   * structure of the control, and does its best to match the values to the correct
   * controls in the group.
   *
   * It accepts both super-sets and sub-sets of the array without throwing an error.
   *
   * @usageNotes
   * ### Patch the values for controls in a form array
   *
   * ```
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.patchValue(['Nancy']);
   * console.log(arr.value);   // ['Nancy', null]
   * ```
   *
   * @param value Array of latest values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control value
   * is updated. When false, no events are emitted. The configuration options are passed to
   * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
   */


  patchValue(value, options = {}) {
    // Even though the `value` argument type doesn't allow `null` and `undefined` values, the
    // `patchValue` can be called recursively and inner data structures might have these values, so
    // we just ignore such cases when a field containing FormArray instance receives `null` or
    // `undefined` as a value.
    if (value == null
    /* both `null` and `undefined` */
    ) return;
    value.forEach((newValue, index) => {
      if (this.at(index)) {
        this.at(index).patchValue(newValue, {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Resets the `FormArray` and all descendants are marked `pristine` and `untouched`, and the
   * value of all descendants to null or null maps.
   *
   * You reset to a specific form state by passing in an array of states
   * that matches the structure of the control. The state is a standalone value
   * or a form state object with both a value and a disabled status.
   *
   * @usageNotes
   * ### Reset the values in a form array
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * arr.reset(['name', 'last name']);
   *
   * console.log(arr.value);  // ['name', 'last name']
   * ```
   *
   * ### Reset the values in a form array and the disabled status for the first control
   *
   * ```
   * arr.reset([
   *   {value: 'name', disabled: true},
   *   'last'
   * ]);
   *
   * console.log(arr.value);  // ['last']
   * console.log(arr.at(0).status);  // 'DISABLED'
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */


  reset(value = [], options = {}) {
    this._forEachChild((control, index) => {
      control.reset(value[index], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });

    this._updatePristine(options);

    this._updateTouched(options);

    this.updateValueAndValidity(options);
  }
  /**
   * The aggregate value of the array, including any disabled controls.
   *
   * Reports all values regardless of disabled status.
   * For enabled controls only, the `value` property is the best way to get the value of the array.
   */


  getRawValue() {
    return this.controls.map(control => {
      return control instanceof FormControl ? control.value : control.getRawValue();
    });
  }
  /**
   * Remove all controls in the `FormArray`.
   *
   * @param options Specifies whether this FormArray instance should emit events after all
   *     controls are removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when all controls
   * in this FormArray instance are removed. When false, no events are emitted.
   *
   * @usageNotes
   * ### Remove all elements from a FormArray
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.length);  // 2
   *
   * arr.clear();
   * console.log(arr.length);  // 0
   * ```
   *
   * It's a simpler and more efficient alternative to removing all elements one by one:
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   *
   * while (arr.length) {
   *    arr.removeAt(0);
   * }
   * ```
   */


  clear(options = {}) {
    if (this.controls.length < 1) return;

    this._forEachChild(control => control._registerOnCollectionChange(() => {}));

    this.controls.splice(0);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /** @internal */


  _syncPendingControls() {
    let subtreeUpdated = this.controls.reduce((updated, child) => {
      return child._syncPendingControls() ? true : updated;
    }, false);
    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  /** @internal */


  _throwIfControlMissing(index) {
    if (!this.controls.length) {
      throw new Error(`
        There are no form controls registered with this array yet. If you're using ngModel,
        you may want to check next tick (e.g. use setTimeout).
      `);
    }

    if (!this.at(index)) {
      throw new Error(`Cannot find form control at index ${index}`);
    }
  }
  /** @internal */


  _forEachChild(cb) {
    this.controls.forEach((control, index) => {
      cb(control, index);
    });
  }
  /** @internal */


  _updateValue() {
    this.value = this.controls.filter(control => control.enabled || this.disabled).map(control => control.value);
  }
  /** @internal */


  _anyControls(condition) {
    return this.controls.some(control => control.enabled && condition(control));
  }
  /** @internal */


  _setUpControls() {
    this._forEachChild(control => this._registerControl(control));
  }
  /** @internal */


  _checkAllValuesPresent(value) {
    this._forEachChild((control, i) => {
      if (value[i] === undefined) {
        throw new Error(`Must supply a value for form control at index: ${i}.`);
      }
    });
  }
  /** @internal */


  _allControlsDisabled() {
    for (const control of this.controls) {
      if (control.enabled) return false;
    }

    return this.controls.length > 0 || this.disabled;
  }

  _registerControl(control) {
    control.setParent(this);

    control._registerOnCollectionChange(this._onCollectionChange);
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const formDirectiveProvider = {
  provide: ControlContainer,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => NgForm)
};

const forms_0 = () => Promise.resolve(null);

const resolvedPromise = /*#__PURE__*/forms_0();
/**
 * @description
 * Creates a top-level `FormGroup` instance and binds it to a form
 * to track aggregate form value and validation status.
 *
 * As soon as you import the `FormsModule`, this directive becomes active by default on
 * all `<form>` tags.  You don't need to add a special selector.
 *
 * You optionally export the directive into a local template variable using `ngForm` as the key
 * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
 * `FormGroup` instance are duplicated on the directive itself, so a reference to it
 * gives you access to the aggregate value and validity status of the form, as well as
 * user interaction properties like `dirty` and `touched`.
 *
 * To register child controls with the form, use `NgModel` with a `name`
 * attribute. You may use `NgModelGroup` to create sub-groups within the form.
 *
 * If necessary, listen to the directive's `ngSubmit` event to be notified when the user has
 * triggered a form submission. The `ngSubmit` event emits the original form
 * submission event.
 *
 * In template driven forms, all `<form>` tags are automatically tagged as `NgForm`.
 * To import the `FormsModule` but skip its usage in some forms,
 * for example, to use native HTML5 validation, add the `ngNoForm` and the `<form>`
 * tags won't create an `NgForm` directive. In reactive forms, using `ngNoForm` is
 * unnecessary because the `<form>` tags are inert. In that case, you would
 * refrain from using the `formGroup` directive.
 *
 * @usageNotes
 *
 * ### Listening for form submission
 *
 * The following example shows how to capture the form values from the "ngSubmit" event.
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * ### Setting the update options
 *
 * The following example shows you how to change the "updateOn" option from its default using
 * ngFormOptions.
 *
 * ```html
 * <form [ngFormOptions]="{updateOn: 'blur'}">
 *    <input name="one" ngModel>  <!-- this ngModel will update on blur -->
 * </form>
 * ```
 *
 * ### Native DOM validation UI
 *
 * In order to prevent the native DOM form validation UI from interfering with Angular's form
 * validation, Angular automatically adds the `novalidate` attribute on any `<form>` whenever
 * `FormModule` or `ReactiveFormModule` are imported into the application.
 * If you want to explicitly enable native DOM validation UI with Angular forms, you can add the
 * `ngNativeValidate` attribute to the `<form>` element:
 *
 * ```html
 * <form ngNativeValidate>
 *   ...
 * </form>
 * ```
 *
 * @ngModule FormsModule
 * @publicApi
 */

let NgForm = /*#__PURE__*/(() => {
  class NgForm extends ControlContainer {
    constructor(validators, asyncValidators) {
      super();
      /**
       * @description
       * Returns whether the form submission has been triggered.
       */

      this.submitted = false;
      this._directives = [];
      /**
       * @description
       * Event emitter for the "ngSubmit" event
       */

      this.ngSubmit = new core_js_.EventEmitter();
      this.form = new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
    }
    /** @nodoc */


    ngAfterViewInit() {
      this._setUpdateStrategy();
    }
    /**
     * @description
     * The directive instance.
     */


    get formDirective() {
      return this;
    }
    /**
     * @description
     * The internal `FormGroup` instance.
     */


    get control() {
      return this.form;
    }
    /**
     * @description
     * Returns an array representing the path to this group. Because this directive
     * always lives at the top level of a form, it is always an empty array.
     */


    get path() {
      return [];
    }
    /**
     * @description
     * Returns a map of the controls in this group.
     */


    get controls() {
      return this.form.controls;
    }
    /**
     * @description
     * Method that sets up the control directive in this group, re-calculates its value
     * and validity, and adds the instance to the internal list of directives.
     *
     * @param dir The `NgModel` directive instance.
     */


    addControl(dir) {
      resolvedPromise.then(() => {
        const container = this._findContainer(dir.path);

        dir.control = container.registerControl(dir.name, dir.control);
        setUpControl(dir.control, dir);
        dir.control.updateValueAndValidity({
          emitEvent: false
        });

        this._directives.push(dir);
      });
    }
    /**
     * @description
     * Retrieves the `FormControl` instance from the provided `NgModel` directive.
     *
     * @param dir The `NgModel` directive instance.
     */


    getControl(dir) {
      return this.form.get(dir.path);
    }
    /**
     * @description
     * Removes the `NgModel` instance from the internal list of directives
     *
     * @param dir The `NgModel` directive instance.
     */


    removeControl(dir) {
      resolvedPromise.then(() => {
        const container = this._findContainer(dir.path);

        if (container) {
          container.removeControl(dir.name);
        }

        removeListItem(this._directives, dir);
      });
    }
    /**
     * @description
     * Adds a new `NgModelGroup` directive instance to the form.
     *
     * @param dir The `NgModelGroup` directive instance.
     */


    addFormGroup(dir) {
      resolvedPromise.then(() => {
        const container = this._findContainer(dir.path);

        const group = new FormGroup({});
        setUpFormContainer(group, dir);
        container.registerControl(dir.name, group);
        group.updateValueAndValidity({
          emitEvent: false
        });
      });
    }
    /**
     * @description
     * Removes the `NgModelGroup` directive instance from the form.
     *
     * @param dir The `NgModelGroup` directive instance.
     */


    removeFormGroup(dir) {
      resolvedPromise.then(() => {
        const container = this._findContainer(dir.path);

        if (container) {
          container.removeControl(dir.name);
        }
      });
    }
    /**
     * @description
     * Retrieves the `FormGroup` for a provided `NgModelGroup` directive instance
     *
     * @param dir The `NgModelGroup` directive instance.
     */


    getFormGroup(dir) {
      return this.form.get(dir.path);
    }
    /**
     * Sets the new value for the provided `NgControl` directive.
     *
     * @param dir The `NgControl` directive instance.
     * @param value The new value for the directive's control.
     */


    updateModel(dir, value) {
      resolvedPromise.then(() => {
        const ctrl = this.form.get(dir.path);
        ctrl.setValue(value);
      });
    }
    /**
     * @description
     * Sets the value for this `FormGroup`.
     *
     * @param value The new value
     */


    setValue(value) {
      this.control.setValue(value);
    }
    /**
     * @description
     * Method called when the "submit" event is triggered on the form.
     * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
     *
     * @param $event The "submit" event object
     */


    onSubmit($event) {
      this.submitted = true;
      syncPendingControls(this.form, this._directives);
      this.ngSubmit.emit($event);
      return false;
    }
    /**
     * @description
     * Method called when the "reset" event is triggered on the form.
     */


    onReset() {
      this.resetForm();
    }
    /**
     * @description
     * Resets the form to an initial value and resets its submitted status.
     *
     * @param value The new value for the form.
     */


    resetForm(value = undefined) {
      this.form.reset(value);
      this.submitted = false;
    }

    _setUpdateStrategy() {
      if (this.options && this.options.updateOn != null) {
        this.form._updateOn = this.options.updateOn;
      }
    }
    /** @internal */


    _findContainer(path) {
      path.pop();
      return path.length ? this.form.get(path) : this.form;
    }

  }

  NgForm.ɵfac = function NgForm_Factory(t) {
    return new (t || NgForm)(core_js_["ɵɵdirectiveInject"](NG_VALIDATORS, 10), core_js_["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
  };

  NgForm.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: NgForm,
    selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", ""], ["ng-form"], ["", "ngForm", ""]],
    hostBindings: function NgForm_HostBindings(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵlistener"]("submit", function NgForm_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function NgForm_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      options: ["ngFormOptions", "options"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    features: [core_js_["ɵɵProvidersFeature"]([formDirectiveProvider]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return NgForm;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @description
 * A base class for code shared between the `NgModelGroup` and `FormGroupName` directives.
 *
 * @publicApi
 */


let AbstractFormGroupDirective = /*#__PURE__*/(() => {
  class AbstractFormGroupDirective extends ControlContainer {
    /** @nodoc */
    ngOnInit() {
      this._checkParentType(); // Register the group with its parent group.


      this.formDirective.addFormGroup(this);
    }
    /** @nodoc */


    ngOnDestroy() {
      if (this.formDirective) {
        // Remove the group from its parent group.
        this.formDirective.removeFormGroup(this);
      }
    }
    /**
     * @description
     * The `FormGroup` bound to this directive.
     */


    get control() {
      return this.formDirective.getFormGroup(this);
    }
    /**
     * @description
     * The path to this group from the top-level directive.
     */


    get path() {
      return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
    }
    /**
     * @description
     * The top-level directive for this group if present, otherwise null.
     */


    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    /** @internal */


    _checkParentType() {}

  }

  AbstractFormGroupDirective.ɵfac = /*@__PURE__*/function () {
    let ɵAbstractFormGroupDirective_BaseFactory;
    return function AbstractFormGroupDirective_Factory(t) {
      return (ɵAbstractFormGroupDirective_BaseFactory || (ɵAbstractFormGroupDirective_BaseFactory = core_js_["ɵɵgetInheritedFactory"](AbstractFormGroupDirective)))(t || AbstractFormGroupDirective);
    };
  }();

  AbstractFormGroupDirective.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: AbstractFormGroupDirective,
    features: [core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return AbstractFormGroupDirective;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function modelParentException() {
  return new Error(`
    ngModel cannot be used to register form controls with a parent formGroup directive.  Try using
    formGroup's partner directive "formControlName" instead.  Example:

    ${formControlNameExample}

    Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:

    Example:

    ${ngModelWithFormGroupExample}`);
}

function formGroupNameException() {
  return new Error(`
    ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.

    Option 1: Use formControlName instead of ngModel (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):

    ${ngModelGroupExample}`);
}

function missingNameException() {
  return new Error(`If ngModel is used within a form tag, either the name attribute must be set or the form
    control must be defined as 'standalone' in ngModelOptions.

    Example 1: <input [(ngModel)]="person.firstName" name="first">
    Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">`);
}

function modelGroupParentException() {
  return new Error(`
    ngModelGroup cannot be used with a parent formGroup directive.

    Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):

    ${ngModelGroupExample}`);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const modelGroupProvider = {
  provide: ControlContainer,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => NgModelGroup)
};
/**
 * @description
 * Creates and binds a `FormGroup` instance to a DOM element.
 *
 * This directive can only be used as a child of `NgForm` (within `<form>` tags).
 *
 * Use this directive to validate a sub-group of your form separately from the
 * rest of your form, or if some values in your domain model make more sense
 * to consume together in a nested object.
 *
 * Provide a name for the sub-group and it will become the key
 * for the sub-group in the form's full value. If you need direct access, export the directive into
 * a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).
 *
 * @usageNotes
 *
 * ### Consuming controls in a grouping
 *
 * The following example shows you how to combine controls together in a sub-group
 * of the form.
 *
 * {@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}
 *
 * @ngModule FormsModule
 * @publicApi
 */

let NgModelGroup = /*#__PURE__*/(() => {
  class NgModelGroup extends AbstractFormGroupDirective {
    constructor(parent, validators, asyncValidators) {
      super();
      this._parent = parent;

      this._setValidators(validators);

      this._setAsyncValidators(asyncValidators);
    }
    /** @internal */


    _checkParentType() {
      if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw modelGroupParentException();
      }
    }

  }

  NgModelGroup.ɵfac = function NgModelGroup_Factory(t) {
    return new (t || NgModelGroup)(core_js_["ɵɵdirectiveInject"](ControlContainer, 5), core_js_["ɵɵdirectiveInject"](NG_VALIDATORS, 10), core_js_["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
  };

  NgModelGroup.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: NgModelGroup,
    selectors: [["", "ngModelGroup", ""]],
    inputs: {
      name: ["ngModelGroup", "name"]
    },
    exportAs: ["ngModelGroup"],
    features: [core_js_["ɵɵProvidersFeature"]([modelGroupProvider]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return NgModelGroup;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const formControlBinding = {
  provide: NgControl,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => NgModel)
};

const forms_0$1 = () => Promise.resolve(null);
/**
 * `ngModel` forces an additional change detection run when its inputs change:
 * E.g.:
 * ```
 * <div>{{myModel.valid}}</div>
 * <input [(ngModel)]="myValue" #myModel="ngModel">
 * ```
 * I.e. `ngModel` can export itself on the element and then be used in the template.
 * Normally, this would result in expressions before the `input` that use the exported directive
 * to have an old value as they have been
 * dirty checked before. As this is a very common case for `ngModel`, we added this second change
 * detection run.
 *
 * Notes:
 * - this is just one extra run no matter how many `ngModel`s have been changed.
 * - this is a general problem when using `exportAs` for directives!
 */


const resolvedPromise$1 = /*#__PURE__*/forms_0$1();
/**
 * @description
 * Creates a `FormControl` instance from a domain model and binds it
 * to a form control element.
 *
 * The `FormControl` instance tracks the value, user interaction, and
 * validation status of the control and keeps the view synced with the model. If used
 * within a parent form, the directive also registers itself with the form as a child
 * control.
 *
 * This directive is used by itself or as part of a larger form. Use the
 * `ngModel` selector to activate it.
 *
 * It accepts a domain model as an optional `Input`. If you have a one-way binding
 * to `ngModel` with `[]` syntax, changing the domain model's value in the component
 * class sets the value in the view. If you have a two-way binding with `[()]` syntax
 * (also known as 'banana-in-a-box syntax'), the value in the UI always syncs back to
 * the domain model in your class.
 *
 * To inspect the properties of the associated `FormControl` (like the validity state),
 * export the directive into a local template variable using `ngModel` as the key (ex:
 * `#myVar="ngModel"`). You can then access the control using the directive's `control` property.
 * However, the most commonly used properties (like `valid` and `dirty`) also exist on the control
 * for direct access. See a full list of properties directly available in
 * `AbstractControlDirective`.
 *
 * @see `RadioControlValueAccessor`
 * @see `SelectControlValueAccessor`
 *
 * @usageNotes
 *
 * ### Using ngModel on a standalone control
 *
 * The following examples show a simple standalone control using `ngModel`:
 *
 * {@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
 *
 * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
 * so that the control can be registered with the parent form under that name.
 *
 * In the context of a parent form, it's often unnecessary to include one-way or two-way binding,
 * as the parent form syncs the value for you. You access its properties by exporting it into a
 * local template variable using `ngForm` such as (`#f="ngForm"`). Use the variable where
 * needed on form submission.
 *
 * If you do need to populate initial values into your form, using a one-way binding for
 * `ngModel` tends to be sufficient as long as you use the exported form's value rather
 * than the domain model's value on submit.
 *
 * ### Using ngModel within a form
 *
 * The following example shows controls using `ngModel` within a form:
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * ### Using a standalone ngModel within a group
 *
 * The following example shows you how to use a standalone ngModel control
 * within a form. This controls the display of the form, but doesn't contain form data.
 *
 * ```html
 * <form>
 *   <input name="login" ngModel placeholder="Login">
 *   <input type="checkbox" ngModel [ngModelOptions]="{standalone: true}"> Show more options?
 * </form>
 * <!-- form value: {login: ''} -->
 * ```
 *
 * ### Setting the ngModel `name` attribute through options
 *
 * The following example shows you an alternate way to set the name attribute. Here,
 * an attribute identified as name is used within a custom form control component. To still be able
 * to specify the NgModel's name, you must specify it using the `ngModelOptions` input instead.
 *
 * ```html
 * <form>
 *   <my-custom-form-control name="Nancy" ngModel [ngModelOptions]="{name: 'user'}">
 *   </my-custom-form-control>
 * </form>
 * <!-- form value: {user: ''} -->
 * ```
 *
 * @ngModule FormsModule
 * @publicApi
 */

let NgModel = /*#__PURE__*/(() => {
  class NgModel extends NgControl {
    constructor(parent, validators, asyncValidators, valueAccessors) {
      super();
      this.control = new FormControl();
      /** @internal */

      this._registered = false;
      /**
       * @description
       * Event emitter for producing the `ngModelChange` event after
       * the view model updates.
       */

      this.update = new core_js_.EventEmitter();
      this._parent = parent;

      this._setValidators(validators);

      this._setAsyncValidators(asyncValidators);

      this.valueAccessor = selectValueAccessor(this, valueAccessors);
    }
    /** @nodoc */


    ngOnChanges(changes) {
      this._checkForErrors();

      if (!this._registered) this._setUpControl();

      if ('isDisabled' in changes) {
        this._updateDisabled(changes);
      }

      if (isPropertyUpdated(changes, this.viewModel)) {
        this._updateValue(this.model);

        this.viewModel = this.model;
      }
    }
    /** @nodoc */


    ngOnDestroy() {
      this.formDirective && this.formDirective.removeControl(this);
    }
    /**
     * @description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     */


    get path() {
      return this._parent ? controlPath(this.name, this._parent) : [this.name];
    }
    /**
     * @description
     * The top-level directive for this control if present, otherwise null.
     */


    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    /**
     * @description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param newValue The new value emitted by `ngModelChange`.
     */


    viewToModelUpdate(newValue) {
      this.viewModel = newValue;
      this.update.emit(newValue);
    }

    _setUpControl() {
      this._setUpdateStrategy();

      this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
      this._registered = true;
    }

    _setUpdateStrategy() {
      if (this.options && this.options.updateOn != null) {
        this.control._updateOn = this.options.updateOn;
      }
    }

    _isStandalone() {
      return !this._parent || !!(this.options && this.options.standalone);
    }

    _setUpStandalone() {
      setUpControl(this.control, this);
      this.control.updateValueAndValidity({
        emitEvent: false
      });
    }

    _checkForErrors() {
      if (!this._isStandalone()) {
        this._checkParentType();
      }

      this._checkName();
    }

    _checkParentType() {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        if (!(this._parent instanceof NgModelGroup) && this._parent instanceof AbstractFormGroupDirective) {
          throw formGroupNameException();
        } else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
          throw modelParentException();
        }
      }
    }

    _checkName() {
      if (this.options && this.options.name) this.name = this.options.name;

      if (!this._isStandalone() && !this.name && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw missingNameException();
      }
    }

    _updateValue(value) {
      resolvedPromise$1.then(() => {
        this.control.setValue(value, {
          emitViewToModelChange: false
        });
      });
    }

    _updateDisabled(changes) {
      const disabledValue = changes['isDisabled'].currentValue;
      const isDisabled = disabledValue === '' || disabledValue && disabledValue !== 'false';
      resolvedPromise$1.then(() => {
        if (isDisabled && !this.control.disabled) {
          this.control.disable();
        } else if (!isDisabled && this.control.disabled) {
          this.control.enable();
        }
      });
    }

  }

  NgModel.ɵfac = function NgModel_Factory(t) {
    return new (t || NgModel)(core_js_["ɵɵdirectiveInject"](ControlContainer, 9), core_js_["ɵɵdirectiveInject"](NG_VALIDATORS, 10), core_js_["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10), core_js_["ɵɵdirectiveInject"](NG_VALUE_ACCESSOR, 10));
  };

  NgModel.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: NgModel,
    selectors: [["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]],
    inputs: {
      name: "name",
      isDisabled: ["disabled", "isDisabled"],
      model: ["ngModel", "model"],
      options: ["ngModelOptions", "options"]
    },
    outputs: {
      update: "ngModelChange"
    },
    exportAs: ["ngModel"],
    features: [core_js_["ɵɵProvidersFeature"]([formControlBinding]), core_js_["ɵɵInheritDefinitionFeature"], core_js_["ɵɵNgOnChangesFeature"]]
  });
  return NgModel;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @description
 *
 * Adds `novalidate` attribute to all forms by default.
 *
 * `novalidate` is used to disable browser's native form validation.
 *
 * If you want to use native validation with Angular forms, just add `ngNativeValidate` attribute:
 *
 * ```
 * <form ngNativeValidate></form>
 * ```
 *
 * @publicApi
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 */


let ɵNgNoValidate = /*#__PURE__*/(() => {
  class ɵNgNoValidate {}

  ɵNgNoValidate.ɵfac = function ɵNgNoValidate_Factory(t) {
    return new (t || ɵNgNoValidate)();
  };

  ɵNgNoValidate.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: ɵNgNoValidate,
    selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
    hostAttrs: ["novalidate", ""]
  });
  return ɵNgNoValidate;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const NUMBER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => NumberValueAccessor),
  multi: true
};
/**
 * @description
 * The `ControlValueAccessor` for writing a number value and listening to number input changes.
 * The value accessor is used by the `FormControlDirective`, `FormControlName`, and `NgModel`
 * directives.
 *
 * @usageNotes
 *
 * ### Using a number input with a reactive form.
 *
 * The following example shows how to use a number input with a reactive form.
 *
 * ```ts
 * const totalCountControl = new FormControl();
 * ```
 *
 * ```
 * <input type="number" [formControl]="totalCountControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

let NumberValueAccessor = /*#__PURE__*/(() => {
  class NumberValueAccessor extends BuiltInControlValueAccessor {
    /**
     * Sets the "value" property on the input element.
     * @nodoc
     */
    writeValue(value) {
      // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
      const normalizedValue = value == null ? '' : value;
      this.setProperty('value', normalizedValue);
    }
    /**
     * Registers a function called when the control value changes.
     * @nodoc
     */


    registerOnChange(fn) {
      this.onChange = value => {
        fn(value == '' ? null : parseFloat(value));
      };
    }

  }

  NumberValueAccessor.ɵfac = /*@__PURE__*/function () {
    let ɵNumberValueAccessor_BaseFactory;
    return function NumberValueAccessor_Factory(t) {
      return (ɵNumberValueAccessor_BaseFactory || (ɵNumberValueAccessor_BaseFactory = core_js_["ɵɵgetInheritedFactory"](NumberValueAccessor)))(t || NumberValueAccessor);
    };
  }();

  NumberValueAccessor.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: NumberValueAccessor,
    selectors: [["input", "type", "number", "formControlName", ""], ["input", "type", "number", "formControl", ""], ["input", "type", "number", "ngModel", ""]],
    hostBindings: function NumberValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵlistener"]("input", function NumberValueAccessor_input_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function NumberValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    features: [core_js_["ɵɵProvidersFeature"]([NUMBER_VALUE_ACCESSOR]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return NumberValueAccessor;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => RadioControlValueAccessor),
  multi: true
};

function throwNameError() {
  throw new Error(`
      If you define both a name and a formControlName attribute on your radio button, their values
      must match. Ex: <input type="radio" formControlName="food" name="food">
    `);
}
/**
 * Internal-only NgModule that works as a host for the `RadioControlRegistry` tree-shakable
 * provider. Note: the `InternalFormsSharedModule` can not be used here directly, since it's
 * declared *after* the `RadioControlRegistry` class and the `providedIn` doesn't support
 * `forwardRef` logic.
 */


let RadioControlRegistryModule = /*#__PURE__*/(() => {
  class RadioControlRegistryModule {}

  RadioControlRegistryModule.ɵfac = function RadioControlRegistryModule_Factory(t) {
    return new (t || RadioControlRegistryModule)();
  };

  RadioControlRegistryModule.ɵmod = /*@__PURE__*/core_js_["ɵɵdefineNgModule"]({
    type: RadioControlRegistryModule
  });
  RadioControlRegistryModule.ɵinj = /*@__PURE__*/core_js_["ɵɵdefineInjector"]({});
  return RadioControlRegistryModule;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Class used by Angular to track radio buttons. For internal use only.
 */


let RadioControlRegistry = /*#__PURE__*/(() => {
  class RadioControlRegistry {
    constructor() {
      this._accessors = [];
    }
    /**
     * @description
     * Adds a control to the internal registry. For internal use only.
     */


    add(control, accessor) {
      this._accessors.push([control, accessor]);
    }
    /**
     * @description
     * Removes a control from the internal registry. For internal use only.
     */


    remove(accessor) {
      for (let i = this._accessors.length - 1; i >= 0; --i) {
        if (this._accessors[i][1] === accessor) {
          this._accessors.splice(i, 1);

          return;
        }
      }
    }
    /**
     * @description
     * Selects a radio button. For internal use only.
     */


    select(accessor) {
      this._accessors.forEach(c => {
        if (this._isSameGroup(c, accessor) && c[1] !== accessor) {
          c[1].fireUncheck(accessor.value);
        }
      });
    }

    _isSameGroup(controlPair, accessor) {
      if (!controlPair[0].control) return false;
      return controlPair[0]._parent === accessor._control._parent && controlPair[1].name === accessor.name;
    }

  }

  RadioControlRegistry.ɵfac = function RadioControlRegistry_Factory(t) {
    return new (t || RadioControlRegistry)();
  };

  RadioControlRegistry.ɵprov = (0,core_js_["ɵɵdefineInjectable"])({
    factory: function RadioControlRegistry_Factory() {
      return new RadioControlRegistry();
    },
    token: RadioControlRegistry,
    providedIn: RadioControlRegistryModule
  });
  return RadioControlRegistry;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * The `ControlValueAccessor` for writing radio control values and listening to radio control
 * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @usageNotes
 *
 * ### Using radio buttons with reactive form directives
 *
 * The follow example shows how to use radio buttons in a reactive form. When using radio buttons in
 * a reactive form, radio buttons in the same group should have the same `formControlName`.
 * Providing a `name` attribute is optional.
 *
 * {@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


let RadioControlValueAccessor = /*#__PURE__*/(() => {
  class RadioControlValueAccessor extends BuiltInControlValueAccessor {
    constructor(renderer, elementRef, _registry, _injector) {
      super(renderer, elementRef);
      this._registry = _registry;
      this._injector = _injector;
      /**
       * The registered callback function called when a change event occurs on the input element.
       * Note: we declare `onChange` here (also used as host listener) as a function with no arguments
       * to override the `onChange` function (which expects 1 argument) in the parent
       * `BaseControlValueAccessor` class.
       * @nodoc
       */

      this.onChange = () => {};
    }
    /** @nodoc */


    ngOnInit() {
      this._control = this._injector.get(NgControl);

      this._checkName();

      this._registry.add(this._control, this);
    }
    /** @nodoc */


    ngOnDestroy() {
      this._registry.remove(this);
    }
    /**
     * Sets the "checked" property value on the radio input element.
     * @nodoc
     */


    writeValue(value) {
      this._state = value === this.value;
      this.setProperty('checked', this._state);
    }
    /**
     * Registers a function called when the control value changes.
     * @nodoc
     */


    registerOnChange(fn) {
      this._fn = fn;

      this.onChange = () => {
        fn(this.value);

        this._registry.select(this);
      };
    }
    /**
     * Sets the "value" on the radio input element and unchecks it.
     *
     * @param value
     */


    fireUncheck(value) {
      this.writeValue(value);
    }

    _checkName() {
      if (this.name && this.formControlName && this.name !== this.formControlName && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throwNameError();
      }

      if (!this.name && this.formControlName) this.name = this.formControlName;
    }

  }

  RadioControlValueAccessor.ɵfac = function RadioControlValueAccessor_Factory(t) {
    return new (t || RadioControlValueAccessor)(core_js_["ɵɵdirectiveInject"](core_js_.Renderer2), core_js_["ɵɵdirectiveInject"](core_js_.ElementRef), core_js_["ɵɵdirectiveInject"](RadioControlRegistry), core_js_["ɵɵdirectiveInject"](core_js_.Injector));
  };

  RadioControlValueAccessor.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: RadioControlValueAccessor,
    selectors: [["input", "type", "radio", "formControlName", ""], ["input", "type", "radio", "formControl", ""], ["input", "type", "radio", "ngModel", ""]],
    hostBindings: function RadioControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵlistener"]("change", function RadioControlValueAccessor_change_HostBindingHandler() {
          return ctx.onChange();
        })("blur", function RadioControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      name: "name",
      formControlName: "formControlName",
      value: "value"
    },
    features: [core_js_["ɵɵProvidersFeature"]([RADIO_VALUE_ACCESSOR]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return RadioControlValueAccessor;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const RANGE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => RangeValueAccessor),
  multi: true
};
/**
 * @description
 * The `ControlValueAccessor` for writing a range value and listening to range input changes.
 * The value accessor is used by the `FormControlDirective`, `FormControlName`, and  `NgModel`
 * directives.
 *
 * @usageNotes
 *
 * ### Using a range input with a reactive form
 *
 * The following example shows how to use a range input with a reactive form.
 *
 * ```ts
 * const ageControl = new FormControl();
 * ```
 *
 * ```
 * <input type="range" [formControl]="ageControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

let RangeValueAccessor = /*#__PURE__*/(() => {
  class RangeValueAccessor extends BuiltInControlValueAccessor {
    /**
     * Sets the "value" property on the input element.
     * @nodoc
     */
    writeValue(value) {
      this.setProperty('value', parseFloat(value));
    }
    /**
     * Registers a function called when the control value changes.
     * @nodoc
     */


    registerOnChange(fn) {
      this.onChange = value => {
        fn(value == '' ? null : parseFloat(value));
      };
    }

  }

  RangeValueAccessor.ɵfac = /*@__PURE__*/function () {
    let ɵRangeValueAccessor_BaseFactory;
    return function RangeValueAccessor_Factory(t) {
      return (ɵRangeValueAccessor_BaseFactory || (ɵRangeValueAccessor_BaseFactory = core_js_["ɵɵgetInheritedFactory"](RangeValueAccessor)))(t || RangeValueAccessor);
    };
  }();

  RangeValueAccessor.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: RangeValueAccessor,
    selectors: [["input", "type", "range", "formControlName", ""], ["input", "type", "range", "formControl", ""], ["input", "type", "range", "ngModel", ""]],
    hostBindings: function RangeValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵlistener"]("change", function RangeValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("input", function RangeValueAccessor_input_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function RangeValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    features: [core_js_["ɵɵProvidersFeature"]([RANGE_VALUE_ACCESSOR]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return RangeValueAccessor;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Token to provide to turn off the ngModel warning on formControl and formControlName.
 */


const NG_MODEL_WITH_FORM_CONTROL_WARNING = /*#__PURE__*/new core_js_.InjectionToken('NgModelWithFormControlWarning');
const formControlBinding$1 = {
  provide: NgControl,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => FormControlDirective)
};
/**
 * @description
 * Synchronizes a standalone `FormControl` instance to a form control element.
 *
 * Note that support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives was deprecated in Angular v6 and is scheduled for removal in
 * a future version of Angular.
 * For details, see [Deprecated features](guide/deprecations#ngmodel-with-reactive-forms).
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see `FormControl`
 * @see `AbstractControl`
 *
 * @usageNotes
 *
 * The following example shows how to register a standalone control and set its value.
 *
 * {@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

let FormControlDirective = /*#__PURE__*/(() => {
  class FormControlDirective extends NgControl {
    constructor(validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
      super();
      this._ngModelWarningConfig = _ngModelWarningConfig;
      /** @deprecated as of v6 */

      this.update = new core_js_.EventEmitter();
      /**
       * @description
       * Instance property used to track whether an ngModel warning has been sent out for this
       * particular `FormControlDirective` instance. Used to support warning config of "always".
       *
       * @internal
       */

      this._ngModelWarningSent = false;

      this._setValidators(validators);

      this._setAsyncValidators(asyncValidators);

      this.valueAccessor = selectValueAccessor(this, valueAccessors);
    }
    /**
     * @description
     * Triggers a warning in dev mode that this input should not be used with reactive forms.
     */


    set isDisabled(isDisabled) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        console.warn(disabledAttrWarning);
      }
    }
    /** @nodoc */


    ngOnChanges(changes) {
      if (this._isControlChanged(changes)) {
        const previousForm = changes['form'].previousValue;

        if (previousForm) {
          cleanUpControl(previousForm, this,
          /* validateControlPresenceOnChange */
          false);
        }

        setUpControl(this.form, this);

        if (this.control.disabled && this.valueAccessor.setDisabledState) {
          this.valueAccessor.setDisabledState(true);
        }

        this.form.updateValueAndValidity({
          emitEvent: false
        });
      }

      if (isPropertyUpdated(changes, this.viewModel)) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
          _ngModelWarning('formControl', FormControlDirective, this, this._ngModelWarningConfig);
        }

        this.form.setValue(this.model);
        this.viewModel = this.model;
      }
    }
    /** @nodoc */


    ngOnDestroy() {
      if (this.form) {
        cleanUpControl(this.form, this,
        /* validateControlPresenceOnChange */
        false);
      }
    }
    /**
     * @description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     */


    get path() {
      return [];
    }
    /**
     * @description
     * The `FormControl` bound to this directive.
     */


    get control() {
      return this.form;
    }
    /**
     * @description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param newValue The new value for the view model.
     */


    viewToModelUpdate(newValue) {
      this.viewModel = newValue;
      this.update.emit(newValue);
    }

    _isControlChanged(changes) {
      return changes.hasOwnProperty('form');
    }

  }

  FormControlDirective.ɵfac = function FormControlDirective_Factory(t) {
    return new (t || FormControlDirective)(core_js_["ɵɵdirectiveInject"](NG_VALIDATORS, 10), core_js_["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10), core_js_["ɵɵdirectiveInject"](NG_VALUE_ACCESSOR, 10), core_js_["ɵɵdirectiveInject"](NG_MODEL_WITH_FORM_CONTROL_WARNING, 8));
  };

  FormControlDirective.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: FormControlDirective,
    selectors: [["", "formControl", ""]],
    inputs: {
      isDisabled: ["disabled", "isDisabled"],
      form: ["formControl", "form"],
      model: ["ngModel", "model"]
    },
    outputs: {
      update: "ngModelChange"
    },
    exportAs: ["ngForm"],
    features: [core_js_["ɵɵProvidersFeature"]([formControlBinding$1]), core_js_["ɵɵInheritDefinitionFeature"], core_js_["ɵɵNgOnChangesFeature"]]
  });
  /**
   * @description
   * Static property used to track whether any ngModel warnings have been sent across
   * all instances of FormControlDirective. Used to support warning config of "once".
   *
   * @internal
   */

  FormControlDirective._ngModelWarningSentOnce = false;
  return FormControlDirective;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const formDirectiveProvider$1 = {
  provide: ControlContainer,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => FormGroupDirective)
};
/**
 * @description
 *
 * Binds an existing `FormGroup` to a DOM element.
 *
 * This directive accepts an existing `FormGroup` instance. It will then use this
 * `FormGroup` instance to match any child `FormControl`, `FormGroup`,
 * and `FormArray` instances to child `FormControlName`, `FormGroupName`,
 * and `FormArrayName` directives.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see `AbstractControl`
 *
 * @usageNotes
 * ### Register Form Group
 *
 * The following example registers a `FormGroup` with first name and last name controls,
 * and listens for the *ngSubmit* event when the button is clicked.
 *
 * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

let FormGroupDirective = /*#__PURE__*/(() => {
  class FormGroupDirective extends ControlContainer {
    constructor(validators, asyncValidators) {
      super();
      this.validators = validators;
      this.asyncValidators = asyncValidators;
      /**
       * @description
       * Reports whether the form submission has been triggered.
       */

      this.submitted = false;
      /**
       * Callback that should be invoked when controls in FormGroup or FormArray collection change
       * (added or removed). This callback triggers corresponding DOM updates.
       */

      this._onCollectionChange = () => this._updateDomValue();
      /**
       * @description
       * Tracks the list of added `FormControlName` instances
       */


      this.directives = [];
      /**
       * @description
       * Tracks the `FormGroup` bound to this directive.
       */

      this.form = null;
      /**
       * @description
       * Emits an event when the form submission has been triggered.
       */

      this.ngSubmit = new core_js_.EventEmitter();

      this._setValidators(validators);

      this._setAsyncValidators(asyncValidators);
    }
    /** @nodoc */


    ngOnChanges(changes) {
      this._checkFormPresent();

      if (changes.hasOwnProperty('form')) {
        this._updateValidators();

        this._updateDomValue();

        this._updateRegistrations();

        this._oldForm = this.form;
      }
    }
    /** @nodoc */


    ngOnDestroy() {
      if (this.form) {
        cleanUpValidators(this.form, this); // Currently the `onCollectionChange` callback is rewritten each time the
        // `_registerOnCollectionChange` function is invoked. The implication is that cleanup should
        // happen *only* when the `onCollectionChange` callback was set by this directive instance.
        // Otherwise it might cause overriding a callback of some other directive instances. We should
        // consider updating this logic later to make it similar to how `onChange` callbacks are
        // handled, see https://github.com/angular/angular/issues/39732 for additional info.

        if (this.form._onCollectionChange === this._onCollectionChange) {
          this.form._registerOnCollectionChange(() => {});
        }
      }
    }
    /**
     * @description
     * Returns this directive's instance.
     */


    get formDirective() {
      return this;
    }
    /**
     * @description
     * Returns the `FormGroup` bound to this directive.
     */


    get control() {
      return this.form;
    }
    /**
     * @description
     * Returns an array representing the path to this group. Because this directive
     * always lives at the top level of a form, it always an empty array.
     */


    get path() {
      return [];
    }
    /**
     * @description
     * Method that sets up the control directive in this group, re-calculates its value
     * and validity, and adds the instance to the internal list of directives.
     *
     * @param dir The `FormControlName` directive instance.
     */


    addControl(dir) {
      const ctrl = this.form.get(dir.path);
      setUpControl(ctrl, dir);
      ctrl.updateValueAndValidity({
        emitEvent: false
      });
      this.directives.push(dir);
      return ctrl;
    }
    /**
     * @description
     * Retrieves the `FormControl` instance from the provided `FormControlName` directive
     *
     * @param dir The `FormControlName` directive instance.
     */


    getControl(dir) {
      return this.form.get(dir.path);
    }
    /**
     * @description
     * Removes the `FormControlName` instance from the internal list of directives
     *
     * @param dir The `FormControlName` directive instance.
     */


    removeControl(dir) {
      cleanUpControl(dir.control || null, dir,
      /* validateControlPresenceOnChange */
      false);
      removeListItem(this.directives, dir);
    }
    /**
     * Adds a new `FormGroupName` directive instance to the form.
     *
     * @param dir The `FormGroupName` directive instance.
     */


    addFormGroup(dir) {
      this._setUpFormContainer(dir);
    }
    /**
     * Performs the necessary cleanup when a `FormGroupName` directive instance is removed from the
     * view.
     *
     * @param dir The `FormGroupName` directive instance.
     */


    removeFormGroup(dir) {
      this._cleanUpFormContainer(dir);
    }
    /**
     * @description
     * Retrieves the `FormGroup` for a provided `FormGroupName` directive instance
     *
     * @param dir The `FormGroupName` directive instance.
     */


    getFormGroup(dir) {
      return this.form.get(dir.path);
    }
    /**
     * Performs the necessary setup when a `FormArrayName` directive instance is added to the view.
     *
     * @param dir The `FormArrayName` directive instance.
     */


    addFormArray(dir) {
      this._setUpFormContainer(dir);
    }
    /**
     * Performs the necessary cleanup when a `FormArrayName` directive instance is removed from the
     * view.
     *
     * @param dir The `FormArrayName` directive instance.
     */


    removeFormArray(dir) {
      this._cleanUpFormContainer(dir);
    }
    /**
     * @description
     * Retrieves the `FormArray` for a provided `FormArrayName` directive instance.
     *
     * @param dir The `FormArrayName` directive instance.
     */


    getFormArray(dir) {
      return this.form.get(dir.path);
    }
    /**
     * Sets the new value for the provided `FormControlName` directive.
     *
     * @param dir The `FormControlName` directive instance.
     * @param value The new value for the directive's control.
     */


    updateModel(dir, value) {
      const ctrl = this.form.get(dir.path);
      ctrl.setValue(value);
    }
    /**
     * @description
     * Method called with the "submit" event is triggered on the form.
     * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
     *
     * @param $event The "submit" event object
     */


    onSubmit($event) {
      this.submitted = true;
      syncPendingControls(this.form, this.directives);
      this.ngSubmit.emit($event);
      return false;
    }
    /**
     * @description
     * Method called when the "reset" event is triggered on the form.
     */


    onReset() {
      this.resetForm();
    }
    /**
     * @description
     * Resets the form to an initial value and resets its submitted status.
     *
     * @param value The new value for the form.
     */


    resetForm(value = undefined) {
      this.form.reset(value);
      this.submitted = false;
    }
    /** @internal */


    _updateDomValue() {
      this.directives.forEach(dir => {
        const oldCtrl = dir.control;
        const newCtrl = this.form.get(dir.path);

        if (oldCtrl !== newCtrl) {
          // Note: the value of the `dir.control` may not be defined, for example when it's a first
          // `FormControl` that is added to a `FormGroup` instance (via `addControl` call).
          cleanUpControl(oldCtrl || null, dir); // Check whether new control at the same location inside the corresponding `FormGroup` is an
          // instance of `FormControl` and perform control setup only if that's the case.
          // Note: we don't need to clear the list of directives (`this.directives`) here, it would be
          // taken care of in the `removeControl` method invoked when corresponding `formControlName`
          // directive instance is being removed (invoked from `FormControlName.ngOnDestroy`).

          if (newCtrl instanceof FormControl) {
            setUpControl(newCtrl, dir);
            dir.control = newCtrl;
          }
        }
      });

      this.form._updateTreeValidity({
        emitEvent: false
      });
    }

    _setUpFormContainer(dir) {
      const ctrl = this.form.get(dir.path);
      setUpFormContainer(ctrl, dir); // NOTE: this operation looks unnecessary in case no new validators were added in
      // `setUpFormContainer` call. Consider updating this code to match the logic in
      // `_cleanUpFormContainer` function.

      ctrl.updateValueAndValidity({
        emitEvent: false
      });
    }

    _cleanUpFormContainer(dir) {
      if (this.form) {
        const ctrl = this.form.get(dir.path);

        if (ctrl) {
          const isControlUpdated = cleanUpFormContainer(ctrl, dir);

          if (isControlUpdated) {
            // Run validity check only in case a control was updated (i.e. view validators were
            // removed) as removing view validators might cause validity to change.
            ctrl.updateValueAndValidity({
              emitEvent: false
            });
          }
        }
      }
    }

    _updateRegistrations() {
      this.form._registerOnCollectionChange(this._onCollectionChange);

      if (this._oldForm) {
        this._oldForm._registerOnCollectionChange(() => {});
      }
    }

    _updateValidators() {
      setUpValidators(this.form, this);

      if (this._oldForm) {
        cleanUpValidators(this._oldForm, this);
      }
    }

    _checkFormPresent() {
      if (!this.form && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw missingFormException();
      }
    }

  }

  FormGroupDirective.ɵfac = function FormGroupDirective_Factory(t) {
    return new (t || FormGroupDirective)(core_js_["ɵɵdirectiveInject"](NG_VALIDATORS, 10), core_js_["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
  };

  FormGroupDirective.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: FormGroupDirective,
    selectors: [["", "formGroup", ""]],
    hostBindings: function FormGroupDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵlistener"]("submit", function FormGroupDirective_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function FormGroupDirective_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      form: ["formGroup", "form"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    features: [core_js_["ɵɵProvidersFeature"]([formDirectiveProvider$1]), core_js_["ɵɵInheritDefinitionFeature"], core_js_["ɵɵNgOnChangesFeature"]]
  });
  return FormGroupDirective;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const formGroupNameProvider = {
  provide: ControlContainer,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => FormGroupName)
};
/**
 * @description
 *
 * Syncs a nested `FormGroup` to a DOM element.
 *
 * This directive can only be used with a parent `FormGroupDirective`.
 *
 * It accepts the string name of the nested `FormGroup` to link, and
 * looks for a `FormGroup` registered with that name in the parent
 * `FormGroup` instance you passed into `FormGroupDirective`.
 *
 * Use nested form groups to validate a sub-group of a
 * form separately from the rest or to group the values of certain
 * controls into their own nested object.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * @usageNotes
 *
 * ### Access the group by name
 *
 * The following example uses the {@link AbstractControl#get get} method to access the
 * associated `FormGroup`
 *
 * ```ts
 *   this.form.get('name');
 * ```
 *
 * ### Access individual controls in the group
 *
 * The following example uses the {@link AbstractControl#get get} method to access
 * individual controls within the group using dot syntax.
 *
 * ```ts
 *   this.form.get('name.first');
 * ```
 *
 * ### Register a nested `FormGroup`.
 *
 * The following example registers a nested *name* `FormGroup` within an existing `FormGroup`,
 * and provides methods to retrieve the nested `FormGroup` and individual controls.
 *
 * {@example forms/ts/nestedFormGroup/nested_form_group_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

let FormGroupName = /*#__PURE__*/(() => {
  class FormGroupName extends AbstractFormGroupDirective {
    constructor(parent, validators, asyncValidators) {
      super();
      this._parent = parent;

      this._setValidators(validators);

      this._setAsyncValidators(asyncValidators);
    }
    /** @internal */


    _checkParentType() {
      if (_hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw groupParentException();
      }
    }

  }

  FormGroupName.ɵfac = function FormGroupName_Factory(t) {
    return new (t || FormGroupName)(core_js_["ɵɵdirectiveInject"](ControlContainer, 13), core_js_["ɵɵdirectiveInject"](NG_VALIDATORS, 10), core_js_["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
  };

  FormGroupName.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: FormGroupName,
    selectors: [["", "formGroupName", ""]],
    inputs: {
      name: ["formGroupName", "name"]
    },
    features: [core_js_["ɵɵProvidersFeature"]([formGroupNameProvider]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return FormGroupName;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

const formArrayNameProvider = {
  provide: ControlContainer,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => FormArrayName)
};
/**
 * @description
 *
 * Syncs a nested `FormArray` to a DOM element.
 *
 * This directive is designed to be used with a parent `FormGroupDirective` (selector:
 * `[formGroup]`).
 *
 * It accepts the string name of the nested `FormArray` you want to link, and
 * will look for a `FormArray` registered with that name in the parent
 * `FormGroup` instance you passed into `FormGroupDirective`.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see `AbstractControl`
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example forms/ts/nestedFormArray/nested_form_array_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

let FormArrayName = /*#__PURE__*/(() => {
  class FormArrayName extends ControlContainer {
    constructor(parent, validators, asyncValidators) {
      super();
      this._parent = parent;

      this._setValidators(validators);

      this._setAsyncValidators(asyncValidators);
    }
    /**
     * A lifecycle method called when the directive's inputs are initialized. For internal use only.
     * @throws If the directive does not have a valid parent.
     * @nodoc
     */


    ngOnInit() {
      this._checkParentType();

      this.formDirective.addFormArray(this);
    }
    /**
     * A lifecycle method called before the directive's instance is destroyed. For internal use only.
     * @nodoc
     */


    ngOnDestroy() {
      if (this.formDirective) {
        this.formDirective.removeFormArray(this);
      }
    }
    /**
     * @description
     * The `FormArray` bound to this directive.
     */


    get control() {
      return this.formDirective.getFormArray(this);
    }
    /**
     * @description
     * The top-level directive for this group if present, otherwise null.
     */


    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    /**
     * @description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     */


    get path() {
      return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
    }

    _checkParentType() {
      if (_hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw arrayParentException();
      }
    }

  }

  FormArrayName.ɵfac = function FormArrayName_Factory(t) {
    return new (t || FormArrayName)(core_js_["ɵɵdirectiveInject"](ControlContainer, 13), core_js_["ɵɵdirectiveInject"](NG_VALIDATORS, 10), core_js_["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10));
  };

  FormArrayName.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: FormArrayName,
    selectors: [["", "formArrayName", ""]],
    inputs: {
      name: ["formArrayName", "name"]
    },
    features: [core_js_["ɵɵProvidersFeature"]([formArrayNameProvider]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return FormArrayName;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

function _hasInvalidParent(parent) {
  return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) && !(parent instanceof FormArrayName);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const controlNameBinding = {
  provide: NgControl,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => FormControlName)
};
/**
 * @description
 * Syncs a `FormControl` in an existing `FormGroup` to a form control
 * element by name.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see `FormControl`
 * @see `AbstractControl`
 *
 * @usageNotes
 *
 * ### Register `FormControl` within a group
 *
 * The following example shows how to register multiple form controls within a form group
 * and set their value.
 *
 * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * To see `formControlName` examples with different form control types, see:
 *
 * * Radio buttons: `RadioControlValueAccessor`
 * * Selects: `SelectControlValueAccessor`
 *
 * ### Use with ngModel is deprecated
 *
 * Support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives has been deprecated in Angular v6 and is scheduled for removal in
 * a future version of Angular.
 *
 * For details, see [Deprecated features](guide/deprecations#ngmodel-with-reactive-forms).
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

let FormControlName = /*#__PURE__*/(() => {
  class FormControlName extends NgControl {
    constructor(parent, validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
      super();
      this._ngModelWarningConfig = _ngModelWarningConfig;
      this._added = false;
      /** @deprecated as of v6 */

      this.update = new core_js_.EventEmitter();
      /**
       * @description
       * Instance property used to track whether an ngModel warning has been sent out for this
       * particular FormControlName instance. Used to support warning config of "always".
       *
       * @internal
       */

      this._ngModelWarningSent = false;
      this._parent = parent;

      this._setValidators(validators);

      this._setAsyncValidators(asyncValidators);

      this.valueAccessor = selectValueAccessor(this, valueAccessors);
    }
    /**
     * @description
     * Triggers a warning in dev mode that this input should not be used with reactive forms.
     */


    set isDisabled(isDisabled) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        console.warn(disabledAttrWarning);
      }
    }
    /** @nodoc */


    ngOnChanges(changes) {
      if (!this._added) this._setUpControl();

      if (isPropertyUpdated(changes, this.viewModel)) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
          _ngModelWarning('formControlName', FormControlName, this, this._ngModelWarningConfig);
        }

        this.viewModel = this.model;
        this.formDirective.updateModel(this, this.model);
      }
    }
    /** @nodoc */


    ngOnDestroy() {
      if (this.formDirective) {
        this.formDirective.removeControl(this);
      }
    }
    /**
     * @description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param newValue The new value for the view model.
     */


    viewToModelUpdate(newValue) {
      this.viewModel = newValue;
      this.update.emit(newValue);
    }
    /**
     * @description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     */


    get path() {
      return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
    }
    /**
     * @description
     * The top-level directive for this group if present, otherwise null.
     */


    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }

    _checkParentType() {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        if (!(this._parent instanceof FormGroupName) && this._parent instanceof AbstractFormGroupDirective) {
          throw ngModelGroupException();
        } else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) && !(this._parent instanceof FormArrayName)) {
          throw controlParentException();
        }
      }
    }

    _setUpControl() {
      this._checkParentType();

      this.control = this.formDirective.addControl(this);

      if (this.control.disabled && this.valueAccessor.setDisabledState) {
        this.valueAccessor.setDisabledState(true);
      }

      this._added = true;
    }

  }

  FormControlName.ɵfac = function FormControlName_Factory(t) {
    return new (t || FormControlName)(core_js_["ɵɵdirectiveInject"](ControlContainer, 13), core_js_["ɵɵdirectiveInject"](NG_VALIDATORS, 10), core_js_["ɵɵdirectiveInject"](NG_ASYNC_VALIDATORS, 10), core_js_["ɵɵdirectiveInject"](NG_VALUE_ACCESSOR, 10), core_js_["ɵɵdirectiveInject"](NG_MODEL_WITH_FORM_CONTROL_WARNING, 8));
  };

  FormControlName.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: FormControlName,
    selectors: [["", "formControlName", ""]],
    inputs: {
      isDisabled: ["disabled", "isDisabled"],
      name: ["formControlName", "name"],
      model: ["ngModel", "model"]
    },
    outputs: {
      update: "ngModelChange"
    },
    features: [core_js_["ɵɵProvidersFeature"]([controlNameBinding]), core_js_["ɵɵInheritDefinitionFeature"], core_js_["ɵɵNgOnChangesFeature"]]
  });
  /**
   * @description
   * Static property used to track whether any ngModel warnings have been sent across
   * all instances of FormControlName. Used to support warning config of "once".
   *
   * @internal
   */

  FormControlName._ngModelWarningSentOnce = false;
  return FormControlName;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => SelectControlValueAccessor),
  multi: true
};

function _buildValueString(id, value) {
  if (id == null) return `${value}`;
  if (value && typeof value === 'object') value = 'Object';
  return `${id}: ${value}`.slice(0, 50);
}

function _extractId(valueString) {
  return valueString.split(':')[0];
}
/**
 * @description
 * The `ControlValueAccessor` for writing select control values and listening to select control
 * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @usageNotes
 *
 * ### Using select controls in a reactive form
 *
 * The following examples show how to use a select control in a reactive form.
 *
 * {@example forms/ts/reactiveSelectControl/reactive_select_control_example.ts region='Component'}
 *
 * ### Using select controls in a template-driven form
 *
 * To use a select in a template-driven form, simply add an `ngModel` and a `name`
 * attribute to the main `<select>` tag.
 *
 * {@example forms/ts/selectControl/select_control_example.ts region='Component'}
 *
 * ### Customizing option selection
 *
 * Angular uses object identity to select option. It's possible for the identities of items
 * to change while the data does not. This can happen, for example, if the items are produced
 * from an RPC to the server, and that RPC is re-run. Even if the data hasn't changed, the
 * second response will produce objects with different identities.
 *
 * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
 * `compareWith` takes a **function** which has two arguments: `option1` and `option2`.
 * If `compareWith` is given, Angular selects option by the return value of the function.
 *
 * ```ts
 * const selectedCountriesControl = new FormControl();
 * ```
 *
 * ```
 * <select [compareWith]="compareFn"  [formControl]="selectedCountriesControl">
 *     <option *ngFor="let country of countries" [ngValue]="country">
 *         {{country.name}}
 *     </option>
 * </select>
 *
 * compareFn(c1: Country, c2: Country): boolean {
 *     return c1 && c2 ? c1.id === c2.id : c1 === c2;
 * }
 * ```
 *
 * **Note:** We listen to the 'change' event because 'input' events aren't fired
 * for selects in IE, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event#browser_compatibility
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


let SelectControlValueAccessor = /*#__PURE__*/(() => {
  class SelectControlValueAccessor extends BuiltInControlValueAccessor {
    constructor() {
      super(...arguments);
      /** @internal */

      this._optionMap = new Map();
      /** @internal */

      this._idCounter = 0;
      this._compareWith = Object.is;
    }
    /**
     * @description
     * Tracks the option comparison algorithm for tracking identities when
     * checking for changes.
     */


    set compareWith(fn) {
      if (typeof fn !== 'function' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw new Error(`compareWith must be a function, but received ${JSON.stringify(fn)}`);
      }

      this._compareWith = fn;
    }
    /**
     * Sets the "value" property on the input element. The "selectedIndex"
     * property is also set if an ID is provided on the option element.
     * @nodoc
     */


    writeValue(value) {
      this.value = value;

      const id = this._getOptionId(value);

      if (id == null) {
        this.setProperty('selectedIndex', -1);
      }

      const valueString = _buildValueString(id, value);

      this.setProperty('value', valueString);
    }
    /**
     * Registers a function called when the control value changes.
     * @nodoc
     */


    registerOnChange(fn) {
      this.onChange = valueString => {
        this.value = this._getOptionValue(valueString);
        fn(this.value);
      };
    }
    /** @internal */


    _registerOption() {
      return (this._idCounter++).toString();
    }
    /** @internal */


    _getOptionId(value) {
      for (const id of Array.from(this._optionMap.keys())) {
        if (this._compareWith(this._optionMap.get(id), value)) return id;
      }

      return null;
    }
    /** @internal */


    _getOptionValue(valueString) {
      const id = _extractId(valueString);

      return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
    }

  }

  SelectControlValueAccessor.ɵfac = /*@__PURE__*/function () {
    let ɵSelectControlValueAccessor_BaseFactory;
    return function SelectControlValueAccessor_Factory(t) {
      return (ɵSelectControlValueAccessor_BaseFactory || (ɵSelectControlValueAccessor_BaseFactory = core_js_["ɵɵgetInheritedFactory"](SelectControlValueAccessor)))(t || SelectControlValueAccessor);
    };
  }();

  SelectControlValueAccessor.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: SelectControlValueAccessor,
    selectors: [["select", "formControlName", "", 3, "multiple", ""], ["select", "formControl", "", 3, "multiple", ""], ["select", "ngModel", "", 3, "multiple", ""]],
    hostBindings: function SelectControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵlistener"]("change", function SelectControlValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function SelectControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      compareWith: "compareWith"
    },
    features: [core_js_["ɵɵProvidersFeature"]([SELECT_VALUE_ACCESSOR]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return SelectControlValueAccessor;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * @see `SelectControlValueAccessor`
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


let NgSelectOption = /*#__PURE__*/(() => {
  class NgSelectOption {
    constructor(_element, _renderer, _select) {
      this._element = _element;
      this._renderer = _renderer;
      this._select = _select;
      if (this._select) this.id = this._select._registerOption();
    }
    /**
     * @description
     * Tracks the value bound to the option element. Unlike the value binding,
     * ngValue supports binding to objects.
     */


    set ngValue(value) {
      if (this._select == null) return;

      this._select._optionMap.set(this.id, value);

      this._setElementValue(_buildValueString(this.id, value));

      this._select.writeValue(this._select.value);
    }
    /**
     * @description
     * Tracks simple string values bound to the option element.
     * For objects, use the `ngValue` input binding.
     */


    set value(value) {
      this._setElementValue(value);

      if (this._select) this._select.writeValue(this._select.value);
    }
    /** @internal */


    _setElementValue(value) {
      this._renderer.setProperty(this._element.nativeElement, 'value', value);
    }
    /** @nodoc */


    ngOnDestroy() {
      if (this._select) {
        this._select._optionMap.delete(this.id);

        this._select.writeValue(this._select.value);
      }
    }

  }

  NgSelectOption.ɵfac = function NgSelectOption_Factory(t) {
    return new (t || NgSelectOption)(core_js_["ɵɵdirectiveInject"](core_js_.ElementRef), core_js_["ɵɵdirectiveInject"](core_js_.Renderer2), core_js_["ɵɵdirectiveInject"](SelectControlValueAccessor, 9));
  };

  NgSelectOption.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: NgSelectOption,
    selectors: [["option"]],
    inputs: {
      ngValue: "ngValue",
      value: "value"
    }
  });
  return NgSelectOption;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const SELECT_MULTIPLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => SelectMultipleControlValueAccessor),
  multi: true
};

function _buildValueString$1(id, value) {
  if (id == null) return `${value}`;
  if (typeof value === 'string') value = `'${value}'`;
  if (value && typeof value === 'object') value = 'Object';
  return `${id}: ${value}`.slice(0, 50);
}

function _extractId$1(valueString) {
  return valueString.split(':')[0];
}
/** Mock interface for HTMLCollection */


class HTMLCollection {}
/**
 * @description
 * The `ControlValueAccessor` for writing multi-select control values and listening to multi-select
 * control changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @see `SelectControlValueAccessor`
 *
 * @usageNotes
 *
 * ### Using a multi-select control
 *
 * The follow example shows you how to use a multi-select control with a reactive form.
 *
 * ```ts
 * const countryControl = new FormControl();
 * ```
 *
 * ```
 * <select multiple name="countries" [formControl]="countryControl">
 *   <option *ngFor="let country of countries" [ngValue]="country">
 *     {{ country.name }}
 *   </option>
 * </select>
 * ```
 *
 * ### Customizing option selection
 *
 * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
 * See the `SelectControlValueAccessor` for usage.
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


let SelectMultipleControlValueAccessor = /*#__PURE__*/(() => {
  class SelectMultipleControlValueAccessor extends BuiltInControlValueAccessor {
    constructor() {
      super(...arguments);
      /** @internal */

      this._optionMap = new Map();
      /** @internal */

      this._idCounter = 0;
      this._compareWith = Object.is;
    }
    /**
     * @description
     * Tracks the option comparison algorithm for tracking identities when
     * checking for changes.
     */


    set compareWith(fn) {
      if (typeof fn !== 'function' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw new Error(`compareWith must be a function, but received ${JSON.stringify(fn)}`);
      }

      this._compareWith = fn;
    }
    /**
     * Sets the "value" property on one or of more of the select's options.
     * @nodoc
     */


    writeValue(value) {
      this.value = value;
      let optionSelectedStateSetter;

      if (Array.isArray(value)) {
        // convert values to ids
        const ids = value.map(v => this._getOptionId(v));

        optionSelectedStateSetter = (opt, o) => {
          opt._setSelected(ids.indexOf(o.toString()) > -1);
        };
      } else {
        optionSelectedStateSetter = (opt, o) => {
          opt._setSelected(false);
        };
      }

      this._optionMap.forEach(optionSelectedStateSetter);
    }
    /**
     * Registers a function called when the control value changes
     * and writes an array of the selected options.
     * @nodoc
     */


    registerOnChange(fn) {
      this.onChange = _ => {
        const selected = [];

        if (_.selectedOptions !== undefined) {
          const options = _.selectedOptions;

          for (let i = 0; i < options.length; i++) {
            const opt = options.item(i);

            const val = this._getOptionValue(opt.value);

            selected.push(val);
          }
        } // Degrade on IE
        else {
          const options = _.options;

          for (let i = 0; i < options.length; i++) {
            const opt = options.item(i);

            if (opt.selected) {
              const val = this._getOptionValue(opt.value);

              selected.push(val);
            }
          }
        }

        this.value = selected;
        fn(selected);
      };
    }
    /** @internal */


    _registerOption(value) {
      const id = (this._idCounter++).toString();

      this._optionMap.set(id, value);

      return id;
    }
    /** @internal */


    _getOptionId(value) {
      for (const id of Array.from(this._optionMap.keys())) {
        if (this._compareWith(this._optionMap.get(id)._value, value)) return id;
      }

      return null;
    }
    /** @internal */


    _getOptionValue(valueString) {
      const id = _extractId$1(valueString);

      return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
    }

  }

  SelectMultipleControlValueAccessor.ɵfac = /*@__PURE__*/function () {
    let ɵSelectMultipleControlValueAccessor_BaseFactory;
    return function SelectMultipleControlValueAccessor_Factory(t) {
      return (ɵSelectMultipleControlValueAccessor_BaseFactory || (ɵSelectMultipleControlValueAccessor_BaseFactory = core_js_["ɵɵgetInheritedFactory"](SelectMultipleControlValueAccessor)))(t || SelectMultipleControlValueAccessor);
    };
  }();

  SelectMultipleControlValueAccessor.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: SelectMultipleControlValueAccessor,
    selectors: [["select", "multiple", "", "formControlName", ""], ["select", "multiple", "", "formControl", ""], ["select", "multiple", "", "ngModel", ""]],
    hostBindings: function SelectMultipleControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵlistener"]("change", function SelectMultipleControlValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target);
        })("blur", function SelectMultipleControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      compareWith: "compareWith"
    },
    features: [core_js_["ɵɵProvidersFeature"]([SELECT_MULTIPLE_VALUE_ACCESSOR]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return SelectMultipleControlValueAccessor;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * @see `SelectMultipleControlValueAccessor`
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */


let ɵNgSelectMultipleOption = /*#__PURE__*/(() => {
  class ɵNgSelectMultipleOption {
    constructor(_element, _renderer, _select) {
      this._element = _element;
      this._renderer = _renderer;
      this._select = _select;

      if (this._select) {
        this.id = this._select._registerOption(this);
      }
    }
    /**
     * @description
     * Tracks the value bound to the option element. Unlike the value binding,
     * ngValue supports binding to objects.
     */


    set ngValue(value) {
      if (this._select == null) return;
      this._value = value;

      this._setElementValue(_buildValueString$1(this.id, value));

      this._select.writeValue(this._select.value);
    }
    /**
     * @description
     * Tracks simple string values bound to the option element.
     * For objects, use the `ngValue` input binding.
     */


    set value(value) {
      if (this._select) {
        this._value = value;

        this._setElementValue(_buildValueString$1(this.id, value));

        this._select.writeValue(this._select.value);
      } else {
        this._setElementValue(value);
      }
    }
    /** @internal */


    _setElementValue(value) {
      this._renderer.setProperty(this._element.nativeElement, 'value', value);
    }
    /** @internal */


    _setSelected(selected) {
      this._renderer.setProperty(this._element.nativeElement, 'selected', selected);
    }
    /** @nodoc */


    ngOnDestroy() {
      if (this._select) {
        this._select._optionMap.delete(this.id);

        this._select.writeValue(this._select.value);
      }
    }

  }

  ɵNgSelectMultipleOption.ɵfac = function ɵNgSelectMultipleOption_Factory(t) {
    return new (t || ɵNgSelectMultipleOption)(core_js_["ɵɵdirectiveInject"](core_js_.ElementRef), core_js_["ɵɵdirectiveInject"](core_js_.Renderer2), core_js_["ɵɵdirectiveInject"](SelectMultipleControlValueAccessor, 9));
  };

  ɵNgSelectMultipleOption.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: ɵNgSelectMultipleOption,
    selectors: [["option"]],
    inputs: {
      ngValue: "ngValue",
      value: "value"
    }
  });
  return ɵNgSelectMultipleOption;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @description
 * Method that updates string to integer if not alread a number
 *
 * @param value The value to convert to integer
 * @returns value of parameter in number or integer.
 */


function toNumber(value) {
  return typeof value === 'number' ? value : parseInt(value, 10);
}
/**
 * A base class for Validator-based Directives. The class contains common logic shared across such
 * Directives.
 *
 * For internal use only, this class is not intended for use outside of the Forms package.
 */


let AbstractValidatorDirective = /*#__PURE__*/(() => {
  class AbstractValidatorDirective {
    constructor() {
      this._validator = nullValidator;
    }
    /**
     * Helper function invoked from child classes to process changes (from `ngOnChanges` hook).
     * @nodoc
     */


    handleChanges(changes) {
      if (this.inputName in changes) {
        const input = this.normalizeInput(changes[this.inputName].currentValue);
        this._validator = this.createValidator(input);

        if (this._onChange) {
          this._onChange();
        }
      }
    }
    /** @nodoc */


    validate(control) {
      return this._validator(control);
    }
    /** @nodoc */


    registerOnValidatorChange(fn) {
      this._onChange = fn;
    }

  }

  AbstractValidatorDirective.ɵfac = function AbstractValidatorDirective_Factory(t) {
    return new (t || AbstractValidatorDirective)();
  };

  AbstractValidatorDirective.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: AbstractValidatorDirective
  });
  return AbstractValidatorDirective;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `MaxValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const MAX_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => MaxValidator),
  multi: true
};
/**
 * A directive which installs the {@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `max` attribute.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a max validator
 *
 * The following example shows how to add a max validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input type="number" ngModel max="4">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

let MaxValidator = /*#__PURE__*/(() => {
  class MaxValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      /** @internal */

      this.inputName = 'max';
      /** @internal */

      this.normalizeInput = input => parseFloat(input);
      /** @internal */


      this.createValidator = max => maxValidator(max);
    }
    /**
     * Declare `ngOnChanges` lifecycle hook at the main directive level (vs keeping it in base class)
     * to avoid differences in handling inheritance of lifecycle hooks between Ivy and ViewEngine in
     * AOT mode. This could be refactored once ViewEngine is removed.
     * @nodoc
     */


    ngOnChanges(changes) {
      this.handleChanges(changes);
    }

  }

  MaxValidator.ɵfac = /*@__PURE__*/function () {
    let ɵMaxValidator_BaseFactory;
    return function MaxValidator_Factory(t) {
      return (ɵMaxValidator_BaseFactory || (ɵMaxValidator_BaseFactory = core_js_["ɵɵgetInheritedFactory"](MaxValidator)))(t || MaxValidator);
    };
  }();

  MaxValidator.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: MaxValidator,
    selectors: [["input", "type", "number", "max", "", "formControlName", ""], ["input", "type", "number", "max", "", "formControl", ""], ["input", "type", "number", "max", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MaxValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        let tmp_b_0;
        core_js_["ɵɵattribute"]("max", (tmp_b_0 = ctx.max) !== null && tmp_b_0 !== undefined ? tmp_b_0 : null);
      }
    },
    inputs: {
      max: "max"
    },
    features: [core_js_["ɵɵProvidersFeature"]([MAX_VALIDATOR]), core_js_["ɵɵInheritDefinitionFeature"], core_js_["ɵɵNgOnChangesFeature"]]
  });
  return MaxValidator;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `MinValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const MIN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => MinValidator),
  multi: true
};
/**
 * A directive which installs the {@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a min validator
 *
 * The following example shows how to add a min validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input type="number" ngModel min="4">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

let MinValidator = /*#__PURE__*/(() => {
  class MinValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      /** @internal */

      this.inputName = 'min';
      /** @internal */

      this.normalizeInput = input => parseFloat(input);
      /** @internal */


      this.createValidator = min => minValidator(min);
    }
    /**
     * Declare `ngOnChanges` lifecycle hook at the main directive level (vs keeping it in base class)
     * to avoid differences in handling inheritance of lifecycle hooks between Ivy and ViewEngine in
     * AOT mode. This could be refactored once ViewEngine is removed.
     * @nodoc
     */


    ngOnChanges(changes) {
      this.handleChanges(changes);
    }

  }

  MinValidator.ɵfac = /*@__PURE__*/function () {
    let ɵMinValidator_BaseFactory;
    return function MinValidator_Factory(t) {
      return (ɵMinValidator_BaseFactory || (ɵMinValidator_BaseFactory = core_js_["ɵɵgetInheritedFactory"](MinValidator)))(t || MinValidator);
    };
  }();

  MinValidator.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: MinValidator,
    selectors: [["input", "type", "number", "min", "", "formControlName", ""], ["input", "type", "number", "min", "", "formControl", ""], ["input", "type", "number", "min", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MinValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        let tmp_b_0;
        core_js_["ɵɵattribute"]("min", (tmp_b_0 = ctx.min) !== null && tmp_b_0 !== undefined ? tmp_b_0 : null);
      }
    },
    inputs: {
      min: "min"
    },
    features: [core_js_["ɵɵProvidersFeature"]([MIN_VALIDATOR]), core_js_["ɵɵInheritDefinitionFeature"], core_js_["ɵɵNgOnChangesFeature"]]
  });
  return MinValidator;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `RequiredValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => RequiredValidator),
  multi: true
};
/**
 * @description
 * Provider which adds `CheckboxRequiredValidator` to the `NG_VALIDATORS` multi-provider list.
 */

const CHECKBOX_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => CheckboxRequiredValidator),
  multi: true
};
/**
 * @description
 * A directive that adds the `required` validator to any controls marked with the
 * `required` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a required validator using template-driven forms
 *
 * ```
 * <input name="fullName" ngModel required>
 * ```
 *
 * @ngModule FormsModule
 * @ngModule ReactiveFormsModule
 * @publicApi
 */

let RequiredValidator = /*#__PURE__*/(() => {
  class RequiredValidator {
    constructor() {
      this._required = false;
    }
    /**
     * @description
     * Tracks changes to the required attribute bound to this directive.
     */


    get required() {
      return this._required;
    }

    set required(value) {
      this._required = value != null && value !== false && `${value}` !== 'false';
      if (this._onChange) this._onChange();
    }
    /**
     * Method that validates whether the control is empty.
     * Returns the validation result if enabled, otherwise null.
     * @nodoc
     */


    validate(control) {
      return this.required ? requiredValidator(control) : null;
    }
    /**
     * Registers a callback function to call when the validator inputs change.
     * @nodoc
     */


    registerOnValidatorChange(fn) {
      this._onChange = fn;
    }

  }

  RequiredValidator.ɵfac = function RequiredValidator_Factory(t) {
    return new (t || RequiredValidator)();
  };

  RequiredValidator.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: RequiredValidator,
    selectors: [["", "required", "", "formControlName", "", 3, "type", "checkbox"], ["", "required", "", "formControl", "", 3, "type", "checkbox"], ["", "required", "", "ngModel", "", 3, "type", "checkbox"]],
    hostVars: 1,
    hostBindings: function RequiredValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        core_js_["ɵɵattribute"]("required", ctx.required ? "" : null);
      }
    },
    inputs: {
      required: "required"
    },
    features: [core_js_["ɵɵProvidersFeature"]([REQUIRED_VALIDATOR])]
  });
  return RequiredValidator;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * A Directive that adds the `required` validator to checkbox controls marked with the
 * `required` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a required checkbox validator using template-driven forms
 *
 * The following example shows how to add a checkbox required validator to an input attached to an
 * ngModel binding.
 *
 * ```
 * <input type="checkbox" name="active" ngModel required>
 * ```
 *
 * @publicApi
 * @ngModule FormsModule
 * @ngModule ReactiveFormsModule
 */


let CheckboxRequiredValidator = /*#__PURE__*/(() => {
  class CheckboxRequiredValidator extends RequiredValidator {
    /**
     * Method that validates whether or not the checkbox has been checked.
     * Returns the validation result if enabled, otherwise null.
     * @nodoc
     */
    validate(control) {
      return this.required ? requiredTrueValidator(control) : null;
    }

  }

  CheckboxRequiredValidator.ɵfac = /*@__PURE__*/function () {
    let ɵCheckboxRequiredValidator_BaseFactory;
    return function CheckboxRequiredValidator_Factory(t) {
      return (ɵCheckboxRequiredValidator_BaseFactory || (ɵCheckboxRequiredValidator_BaseFactory = core_js_["ɵɵgetInheritedFactory"](CheckboxRequiredValidator)))(t || CheckboxRequiredValidator);
    };
  }();

  CheckboxRequiredValidator.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: CheckboxRequiredValidator,
    selectors: [["input", "type", "checkbox", "required", "", "formControlName", ""], ["input", "type", "checkbox", "required", "", "formControl", ""], ["input", "type", "checkbox", "required", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function CheckboxRequiredValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        core_js_["ɵɵattribute"]("required", ctx.required ? "" : null);
      }
    },
    features: [core_js_["ɵɵProvidersFeature"]([CHECKBOX_REQUIRED_VALIDATOR]), core_js_["ɵɵInheritDefinitionFeature"]]
  });
  return CheckboxRequiredValidator;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `EmailValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const EMAIL_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => EmailValidator),
  multi: true
};
/**
 * A directive that adds the `email` validator to controls marked with the
 * `email` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding an email validator
 *
 * The following example shows how to add an email validator to an input attached to an ngModel
 * binding.
 *
 * ```
 * <input type="email" name="email" ngModel email>
 * <input type="email" name="email" ngModel email="true">
 * <input type="email" name="email" ngModel [email]="true">
 * ```
 *
 * @publicApi
 * @ngModule FormsModule
 * @ngModule ReactiveFormsModule
 */

let EmailValidator = /*#__PURE__*/(() => {
  class EmailValidator {
    constructor() {
      this._enabled = false;
    }
    /**
     * @description
     * Tracks changes to the email attribute bound to this directive.
     */


    set email(value) {
      this._enabled = value === '' || value === true || value === 'true';
      if (this._onChange) this._onChange();
    }
    /**
     * Method that validates whether an email address is valid.
     * Returns the validation result if enabled, otherwise null.
     * @nodoc
     */


    validate(control) {
      return this._enabled ? emailValidator(control) : null;
    }
    /**
     * Registers a callback function to call when the validator inputs change.
     * @nodoc
     */


    registerOnValidatorChange(fn) {
      this._onChange = fn;
    }

  }

  EmailValidator.ɵfac = function EmailValidator_Factory(t) {
    return new (t || EmailValidator)();
  };

  EmailValidator.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: EmailValidator,
    selectors: [["", "email", "", "formControlName", ""], ["", "email", "", "formControl", ""], ["", "email", "", "ngModel", ""]],
    inputs: {
      email: "email"
    },
    features: [core_js_["ɵɵProvidersFeature"]([EMAIL_VALIDATOR])]
  });
  return EmailValidator;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `MinLengthValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const MIN_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => MinLengthValidator),
  multi: true
};
/**
 * A directive that adds minimum length validation to controls marked with the
 * `minlength` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a minimum length validator
 *
 * The following example shows how to add a minimum length validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input name="firstName" ngModel minlength="4">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

let MinLengthValidator = /*#__PURE__*/(() => {
  class MinLengthValidator {
    constructor() {
      this._validator = nullValidator;
    }
    /** @nodoc */


    ngOnChanges(changes) {
      if ('minlength' in changes) {
        this._createValidator();

        if (this._onChange) this._onChange();
      }
    }
    /**
     * Method that validates whether the value meets a minimum length requirement.
     * Returns the validation result if enabled, otherwise null.
     * @nodoc
     */


    validate(control) {
      return this.enabled() ? this._validator(control) : null;
    }
    /**
     * Registers a callback function to call when the validator inputs change.
     * @nodoc
     */


    registerOnValidatorChange(fn) {
      this._onChange = fn;
    }

    _createValidator() {
      this._validator = this.enabled() ? minLengthValidator(toNumber(this.minlength)) : nullValidator;
    }
    /** @nodoc */


    enabled() {
      return this.minlength != null
      /* both `null` and `undefined` */
      ;
    }

  }

  MinLengthValidator.ɵfac = function MinLengthValidator_Factory(t) {
    return new (t || MinLengthValidator)();
  };

  MinLengthValidator.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: MinLengthValidator,
    selectors: [["", "minlength", "", "formControlName", ""], ["", "minlength", "", "formControl", ""], ["", "minlength", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MinLengthValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        core_js_["ɵɵattribute"]("minlength", ctx.enabled() ? ctx.minlength : null);
      }
    },
    inputs: {
      minlength: "minlength"
    },
    features: [core_js_["ɵɵProvidersFeature"]([MIN_LENGTH_VALIDATOR]), core_js_["ɵɵNgOnChangesFeature"]]
  });
  return MinLengthValidator;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `MaxLengthValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const MAX_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => MaxLengthValidator),
  multi: true
};
/**
 * A directive that adds max length validation to controls marked with the
 * `maxlength` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a maximum length validator
 *
 * The following example shows how to add a maximum length validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input name="firstName" ngModel maxlength="25">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

let MaxLengthValidator = /*#__PURE__*/(() => {
  class MaxLengthValidator {
    constructor() {
      this._validator = nullValidator;
    }
    /** @nodoc */


    ngOnChanges(changes) {
      if ('maxlength' in changes) {
        this._createValidator();

        if (this._onChange) this._onChange();
      }
    }
    /**
     * Method that validates whether the value exceeds the maximum length requirement.
     * @nodoc
     */


    validate(control) {
      return this.enabled() ? this._validator(control) : null;
    }
    /**
     * Registers a callback function to call when the validator inputs change.
     * @nodoc
     */


    registerOnValidatorChange(fn) {
      this._onChange = fn;
    }

    _createValidator() {
      this._validator = this.enabled() ? maxLengthValidator(toNumber(this.maxlength)) : nullValidator;
    }
    /** @nodoc */


    enabled() {
      return this.maxlength != null
      /* both `null` and `undefined` */
      ;
    }

  }

  MaxLengthValidator.ɵfac = function MaxLengthValidator_Factory(t) {
    return new (t || MaxLengthValidator)();
  };

  MaxLengthValidator.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: MaxLengthValidator,
    selectors: [["", "maxlength", "", "formControlName", ""], ["", "maxlength", "", "formControl", ""], ["", "maxlength", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MaxLengthValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        core_js_["ɵɵattribute"]("maxlength", ctx.enabled() ? ctx.maxlength : null);
      }
    },
    inputs: {
      maxlength: "maxlength"
    },
    features: [core_js_["ɵɵProvidersFeature"]([MAX_LENGTH_VALIDATOR]), core_js_["ɵɵNgOnChangesFeature"]]
  });
  return MaxLengthValidator;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @description
 * Provider which adds `PatternValidator` to the `NG_VALIDATORS` multi-provider list.
 */


const PATTERN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /*#__PURE__*/(0,core_js_.forwardRef)(() => PatternValidator),
  multi: true
};
/**
 * @description
 * A directive that adds regex pattern validation to controls marked with the
 * `pattern` attribute. The regex must match the entire control value.
 * The directive is provided with the `NG_VALIDATORS` multi-provider list.
 *
 * @see [Form Validation](guide/form-validation)
 *
 * @usageNotes
 *
 * ### Adding a pattern validator
 *
 * The following example shows how to add a pattern validator to an input attached to an
 * ngModel binding.
 *
 * ```html
 * <input name="firstName" ngModel pattern="[a-zA-Z ]*">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */

let PatternValidator = /*#__PURE__*/(() => {
  class PatternValidator {
    constructor() {
      this._validator = nullValidator;
    }
    /** @nodoc */


    ngOnChanges(changes) {
      if ('pattern' in changes) {
        this._createValidator();

        if (this._onChange) this._onChange();
      }
    }
    /**
     * Method that validates whether the value matches the pattern requirement.
     * @nodoc
     */


    validate(control) {
      return this._validator(control);
    }
    /**
     * Registers a callback function to call when the validator inputs change.
     * @nodoc
     */


    registerOnValidatorChange(fn) {
      this._onChange = fn;
    }

    _createValidator() {
      this._validator = patternValidator(this.pattern);
    }

  }

  PatternValidator.ɵfac = function PatternValidator_Factory(t) {
    return new (t || PatternValidator)();
  };

  PatternValidator.ɵdir = /*@__PURE__*/core_js_["ɵɵdefineDirective"]({
    type: PatternValidator,
    selectors: [["", "pattern", "", "formControlName", ""], ["", "pattern", "", "formControl", ""], ["", "pattern", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function PatternValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        core_js_["ɵɵattribute"]("pattern", ctx.pattern ? ctx.pattern : null);
      }
    },
    inputs: {
      pattern: "pattern"
    },
    features: [core_js_["ɵɵProvidersFeature"]([PATTERN_VALIDATOR]), core_js_["ɵɵNgOnChangesFeature"]]
  });
  return PatternValidator;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const SHARED_FORM_DIRECTIVES = [ɵNgNoValidate, NgSelectOption, ɵNgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator];
const TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
const REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName];
/**
 * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
 */

let ɵInternalFormsSharedModule = /*#__PURE__*/(() => {
  class ɵInternalFormsSharedModule {}

  ɵInternalFormsSharedModule.ɵfac = function ɵInternalFormsSharedModule_Factory(t) {
    return new (t || ɵInternalFormsSharedModule)();
  };

  ɵInternalFormsSharedModule.ɵmod = /*@__PURE__*/core_js_["ɵɵdefineNgModule"]({
    type: ɵInternalFormsSharedModule
  });
  ɵInternalFormsSharedModule.ɵinj = /*@__PURE__*/core_js_["ɵɵdefineInjector"]({
    imports: [[RadioControlRegistryModule]]
  });
  return ɵInternalFormsSharedModule;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/*#__PURE__*/
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && core_js_["ɵɵsetNgModuleScope"](ɵInternalFormsSharedModule, {
    declarations: [ɵNgNoValidate, NgSelectOption, ɵNgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator],
    imports: [RadioControlRegistryModule],
    exports: [ɵNgNoValidate, NgSelectOption, ɵNgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Exports the required providers and directives for template-driven forms,
 * making them available for import by NgModules that import this module.
 *
 * Providers associated with this module:
 * * `RadioControlRegistry`
 *
 * @see [Forms Overview](/guide/forms-overview)
 * @see [Template-driven Forms Guide](/guide/forms)
 *
 * @publicApi
 */


let FormsModule = /*#__PURE__*/(() => {
  class FormsModule {}

  FormsModule.ɵfac = function FormsModule_Factory(t) {
    return new (t || FormsModule)();
  };

  FormsModule.ɵmod = /*@__PURE__*/core_js_["ɵɵdefineNgModule"]({
    type: FormsModule
  });
  FormsModule.ɵinj = /*@__PURE__*/core_js_["ɵɵdefineInjector"]({
    imports: [ɵInternalFormsSharedModule]
  });
  return FormsModule;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/*#__PURE__*/
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && core_js_["ɵɵsetNgModuleScope"](FormsModule, {
    declarations: [NgModel, NgModelGroup, NgForm],
    exports: [ɵInternalFormsSharedModule, NgModel, NgModelGroup, NgForm]
  });
})();
/**
 * Exports the required infrastructure and directives for reactive forms,
 * making them available for import by NgModules that import this module.
 *
 * Providers associated with this module:
 * * `FormBuilder`
 * * `RadioControlRegistry`
 *
 * @see [Forms Overview](guide/forms-overview)
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * @publicApi
 */


let ReactiveFormsModule = /*#__PURE__*/(() => {
  class ReactiveFormsModule {
    /**
     * @description
     * Provides options for configuring the reactive forms module.
     *
     * @param opts An object of configuration options
     * * `warnOnNgModelWithFormControl` Configures when to emit a warning when an `ngModel`
     * binding is used with reactive form directives.
     */
    static withConfig(opts) {
      return {
        ngModule: ReactiveFormsModule,
        providers: [{
          provide: NG_MODEL_WITH_FORM_CONTROL_WARNING,
          useValue: opts.warnOnNgModelWithFormControl
        }]
      };
    }

  }

  ReactiveFormsModule.ɵfac = function ReactiveFormsModule_Factory(t) {
    return new (t || ReactiveFormsModule)();
  };

  ReactiveFormsModule.ɵmod = /*@__PURE__*/core_js_["ɵɵdefineNgModule"]({
    type: ReactiveFormsModule
  });
  ReactiveFormsModule.ɵinj = /*@__PURE__*/core_js_["ɵɵdefineInjector"]({
    imports: [ɵInternalFormsSharedModule]
  });
  return ReactiveFormsModule;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/*#__PURE__*/
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && core_js_["ɵɵsetNgModuleScope"](ReactiveFormsModule, {
    declarations: [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName],
    exports: [ɵInternalFormsSharedModule, FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function isAbstractControlOptions(options) {
  return options.asyncValidators !== undefined || options.validators !== undefined || options.updateOn !== undefined;
}
/**
 * @description
 * Creates an `AbstractControl` from a user-specified configuration.
 *
 * The `FormBuilder` provides syntactic sugar that shortens creating instances of a `FormControl`,
 * `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to build complex
 * forms.
 *
 * @see [Reactive Forms Guide](/guide/reactive-forms)
 *
 * @publicApi
 */


let FormBuilder = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  class FormBuilder {
    group(controlsConfig, options = null) {
      const controls = this._reduceControls(controlsConfig);

      let validators = null;
      let asyncValidators = null;
      let updateOn = undefined;

      if (options != null) {
        if (isAbstractControlOptions(options)) {
          // `options` are `AbstractControlOptions`
          validators = options.validators != null ? options.validators : null;
          asyncValidators = options.asyncValidators != null ? options.asyncValidators : null;
          updateOn = options.updateOn != null ? options.updateOn : undefined;
        } else {
          // `options` are legacy form group options
          validators = options['validator'] != null ? options['validator'] : null;
          asyncValidators = options['asyncValidator'] != null ? options['asyncValidator'] : null;
        }
      }

      return new FormGroup(controls, {
        asyncValidators,
        updateOn,
        validators
      });
    }
    /**
     * @description
     * Construct a new `FormControl` with the given state, validators and options.
     *
     * @param formState Initializes the control with an initial state value, or
     * with an object that contains both a value and a disabled status.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of
     * such functions, or an `AbstractControlOptions` object that contains
     * validation functions and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator
     * functions.
     *
     * @usageNotes
     *
     * ### Initialize a control as disabled
     *
     * The following example returns a control with an initial value in a disabled state.
     *
     * <code-example path="forms/ts/formBuilder/form_builder_example.ts" region="disabled-control">
     * </code-example>
     */


    control(formState, validatorOrOpts, asyncValidator) {
      return new FormControl(formState, validatorOrOpts, asyncValidator);
    }
    /**
     * Constructs a new `FormArray` from the given array of configurations,
     * validators and options.
     *
     * @param controlsConfig An array of child controls or control configs. Each
     * child control is given an index when it is registered.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of
     * such functions, or an `AbstractControlOptions` object that contains
     * validation functions and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator
     * functions.
     */


    array(controlsConfig, validatorOrOpts, asyncValidator) {
      const controls = controlsConfig.map(c => this._createControl(c));
      return new FormArray(controls, validatorOrOpts, asyncValidator);
    }
    /** @internal */


    _reduceControls(controlsConfig) {
      const controls = {};
      Object.keys(controlsConfig).forEach(controlName => {
        controls[controlName] = this._createControl(controlsConfig[controlName]);
      });
      return controls;
    }
    /** @internal */


    _createControl(controlConfig) {
      if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup || controlConfig instanceof FormArray) {
        return controlConfig;
      } else if (Array.isArray(controlConfig)) {
        const value = controlConfig[0];
        const validator = controlConfig.length > 1 ? controlConfig[1] : null;
        const asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
        return this.control(value, validator, asyncValidator);
      } else {
        return this.control(controlConfig);
      }
    }

  }

  FormBuilder.ɵfac = function FormBuilder_Factory(t) {
    return new (t || FormBuilder)();
  };

  FormBuilder.ɵprov = ɵɵdefineInjectable({
    factory: function FormBuilder_Factory() {
      return new FormBuilder();
    },
    token: FormBuilder,
    providedIn: ReactiveFormsModule
  });
  return FormBuilder;
})()));

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @publicApi
 */


const forms_VERSION = /*#__PURE__*/new core_js_.Version('12.2.13');
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

 //# sourceMappingURL=forms.js.map
// EXTERNAL MODULE: consume shared module (default) @angular/common@^12.2.0 (strict) (singleton) (fallback: ./node_modules/@angular/common/fesm2015/common.js)
var fesm2015_common_js_ = __webpack_require__(998);
// EXTERNAL MODULE: ./node_modules/rxjs/dist/esm/internal/operators/mergeMap.js + 1 modules
var mergeMap = __webpack_require__(159);
// EXTERNAL MODULE: ./node_modules/rxjs/dist/esm/internal/util/isArrayLike.js
var isArrayLike = __webpack_require__(602);
// EXTERNAL MODULE: ./node_modules/rxjs/dist/esm/internal/util/isFunction.js
var isFunction = __webpack_require__(975);
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm/internal/observable/fromEvent.js






const nodeEventEmitterMethods = ['addListener', 'removeListener'];
const eventTargetMethods = ['addEventListener', 'removeEventListener'];
const jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
  if ((0,isFunction/* isFunction */.m)(options)) {
    resultSelector = options;
    options = undefined;
  }

  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
  }

  const [add, remove] = isEventTarget(target) ? eventTargetMethods.map(methodName => handler => target[methodName](eventName, handler, options)) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [];

  if (!add) {
    if ((0,isArrayLike/* isArrayLike */.z)(target)) {
      return (0,mergeMap/* mergeMap */.z)(subTarget => fromEvent(subTarget, eventName, options))((0,innerFrom/* innerFrom */.Xf)(target));
    }
  }

  if (!add) {
    throw new TypeError('Invalid event target');
  }

  return new Observable/* Observable */.y(subscriber => {
    const handler = (...args) => subscriber.next(1 < args.length ? args : args[0]);

    add(handler);
    return () => remove(handler);
  });
}

function toCommonHandlerRegistry(target, eventName) {
  return methodName => handler => target[methodName](eventName, handler);
}

function isNodeStyleEventEmitter(target) {
  return (0,isFunction/* isFunction */.m)(target.addListener) && (0,isFunction/* isFunction */.m)(target.removeListener);
}

function isJQueryStyleEventEmitter(target) {
  return (0,isFunction/* isFunction */.m)(target.on) && (0,isFunction/* isFunction */.m)(target.off);
}

function isEventTarget(target) {
  return (0,isFunction/* isFunction */.m)(target.addEventListener) && (0,isFunction/* isFunction */.m)(target.removeEventListener);
} //# sourceMappingURL=fromEvent.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm/internal/observable/of.js


function of(...args) {
  const scheduler = (0,util_args/* popScheduler */.yG)(args);
  return (0,from/* from */.D)(args, scheduler);
} //# sourceMappingURL=of.js.map
// EXTERNAL MODULE: ./node_modules/rxjs/dist/esm/internal/util/lift.js
var lift = __webpack_require__(85);
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm/internal/operators/switchMap.js



function switchMap(project, resultSelector) {
  return (0,lift/* operate */.e)((source, subscriber) => {
    let innerSubscriber = null;
    let index = 0;
    let isComplete = false;

    const checkComplete = () => isComplete && !innerSubscriber && subscriber.complete();

    source.subscribe(new OperatorSubscriber/* OperatorSubscriber */.Q(subscriber, value => {
      innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
      let innerIndex = 0;
      const outerIndex = index++;
      (0,innerFrom/* innerFrom */.Xf)(project(value, outerIndex)).subscribe(innerSubscriber = new OperatorSubscriber/* OperatorSubscriber */.Q(subscriber, innerValue => subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue), () => {
        innerSubscriber = null;
        checkComplete();
      }));
    }, () => {
      isComplete = true;
      checkComplete();
    }));
  });
} //# sourceMappingURL=switchMap.js.map
;// CONCATENATED MODULE: ./dist/packages/select-simple/fesm2015/ngx-dummy-select-simple.js








/* eslint-disable @angular-eslint/no-host-metadata-property */

const _c0 = function () {
  return {
    "height": "getItemHeight()",
    "visibility": "getItemVisibility()",
    "background-color": "itemBg"
  };
};

function SelectItemComponent_span_0_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementStart"](0, "span");
    fesm2015_core_js_["ɵɵtext"](1);
    fesm2015_core_js_["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = fesm2015_core_js_["ɵɵnextContext"]();
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵtextInterpolate"](ctx_r0.getItemCaption());
  }
}

function SelectItemComponent_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementContainer"](0);
  }
}

const _c1 = function (a0) {
  return {
    $implicit: a0
  };
};

function SelectItemComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementContainerStart"](0);
    fesm2015_core_js_["ɵɵtemplate"](1, SelectItemComponent_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 1);
    fesm2015_core_js_["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r1 = fesm2015_core_js_["ɵɵnextContext"]();
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.template)("ngTemplateOutletContext", fesm2015_core_js_["ɵɵpureFunction1"](2, _c1, ctx_r1.option));
  }
}

const _c2 = ["defaultSelectIconTmpl"];
const _c3 = ["itemsListDefaultTmpl"];

function SelectComponent_span_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementContainerStart"](0);
    fesm2015_core_js_["ɵɵtext"](1);
    fesm2015_core_js_["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r8 = fesm2015_core_js_["ɵɵnextContext"](2);
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵtextInterpolate"](ctx_r8.label || "Nothing selected");
  }
}

function SelectComponent_span_0_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementContainer"](0);
  }
}

const _c4 = function (a0, a1) {
  return {
    $implicit: a0,
    selectedOption: a1
  };
};

function SelectComponent_span_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementContainerStart"](0);
    fesm2015_core_js_["ɵɵtemplate"](1, SelectComponent_span_0_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 6);
    fesm2015_core_js_["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r9 = fesm2015_core_js_["ɵɵnextContext"](2);
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵproperty"]("ngTemplateOutlet", ctx_r9.selectedItemTemplate)("ngTemplateOutletContext", fesm2015_core_js_["ɵɵpureFunction2"](2, _c4, ctx_r9.label, ctx_r9.selectedOption));
  }
}

function SelectComponent_span_0_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementStart"](0, "span");
    fesm2015_core_js_["ɵɵtemplate"](1, SelectComponent_span_0_ng_container_1_Template, 2, 1, "ng-container", 0);
    fesm2015_core_js_["ɵɵtemplate"](2, SelectComponent_span_0_ng_container_2_Template, 2, 5, "ng-container", 0);
    fesm2015_core_js_["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = fesm2015_core_js_["ɵɵnextContext"]();
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵproperty"]("ngIf", !ctx_r0.selectedItemTemplate);
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵproperty"]("ngIf", ctx_r0.selectedItemTemplate);
  }
}

const _c5 = function (a1) {
  return {
    "select-label": true,
    "select-label-empty": a1
  };
};

function SelectComponent_span_1_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementStart"](0, "span", 7);
    fesm2015_core_js_["ɵɵtext"](1);
    fesm2015_core_js_["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r1 = fesm2015_core_js_["ɵɵnextContext"]();
    fesm2015_core_js_["ɵɵproperty"]("ngClass", fesm2015_core_js_["ɵɵpureFunction1"](2, _c5, !!!ctx_r1.placeholder || !!!(ctx_r1.placeholder == null ? null : ctx_r1.placeholder.length)));
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵtextInterpolate1"](" ", ctx_r1.placeholder || "empty", "\n");
  }
}

function SelectComponent_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementContainer"](0);
  }
}

function SelectComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementContainerStart"](0);
    fesm2015_core_js_["ɵɵtemplate"](1, SelectComponent_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 6);
    fesm2015_core_js_["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r2 = fesm2015_core_js_["ɵɵnextContext"]();
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵproperty"]("ngTemplateOutlet", ctx_r2.openerBtnTemplate)("ngTemplateOutletContext", fesm2015_core_js_["ɵɵpureFunction1"](2, _c1, ctx_r2.overlayVisible));
  }
}

function SelectComponent_div_4_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementContainer"](0);
  }
}

function SelectComponent_div_4_ng_container_1_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = fesm2015_core_js_["ɵɵgetCurrentView"]();

    fesm2015_core_js_["ɵɵelementStart"](0, "button", 10);
    fesm2015_core_js_["ɵɵlistener"]("click", function SelectComponent_div_4_ng_container_1_button_2_Template_button_click_0_listener() {
      fesm2015_core_js_["ɵɵrestoreView"](_r17);
      const ctx_r16 = fesm2015_core_js_["ɵɵnextContext"](3);
      return ctx_r16.reset();
    });
    fesm2015_core_js_["ɵɵtext"](1, "Reset");
    fesm2015_core_js_["ɵɵelementEnd"]();
  }
}

function SelectComponent_div_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementContainerStart"](0);
    fesm2015_core_js_["ɵɵtemplate"](1, SelectComponent_div_4_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 6);
    fesm2015_core_js_["ɵɵtemplate"](2, SelectComponent_div_4_ng_container_1_button_2_Template, 2, 0, "button", 9);
    fesm2015_core_js_["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r12 = fesm2015_core_js_["ɵɵnextContext"](2);

    const _r6 = fesm2015_core_js_["ɵɵreference"](8);

    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵproperty"]("ngTemplateOutlet", _r6)("ngTemplateOutletContext", fesm2015_core_js_["ɵɵpureFunction2"](3, _c4, ctx_r12.optionsToDisplay, ctx_r12.selectedOption));
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵproperty"]("ngIf", ctx_r12.none);
  }
}

function SelectComponent_div_4_ng_container_2_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = fesm2015_core_js_["ɵɵgetCurrentView"]();

    fesm2015_core_js_["ɵɵelementStart"](0, "button", 10);
    fesm2015_core_js_["ɵɵlistener"]("click", function SelectComponent_div_4_ng_container_2_button_4_Template_button_click_0_listener() {
      fesm2015_core_js_["ɵɵrestoreView"](_r20);
      const ctx_r19 = fesm2015_core_js_["ɵɵnextContext"](3);
      return ctx_r19.reset();
    });
    fesm2015_core_js_["ɵɵelementStart"](1, "span");
    fesm2015_core_js_["ɵɵtext"](2, "Reset");
    fesm2015_core_js_["ɵɵelementEnd"]();
    fesm2015_core_js_["ɵɵelementEnd"]();
  }
}

function SelectComponent_div_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementContainerStart"](0);
    fesm2015_core_js_["ɵɵelementStart"](1, "div", 11);
    fesm2015_core_js_["ɵɵelementStart"](2, "div", 12);
    fesm2015_core_js_["ɵɵprojection"](3);
    fesm2015_core_js_["ɵɵelementEnd"]();
    fesm2015_core_js_["ɵɵelementEnd"]();
    fesm2015_core_js_["ɵɵtemplate"](4, SelectComponent_div_4_ng_container_2_button_4_Template, 3, 0, "button", 9);
    fesm2015_core_js_["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r13 = fesm2015_core_js_["ɵɵnextContext"](2);
    fesm2015_core_js_["ɵɵadvance"](4);
    fesm2015_core_js_["ɵɵproperty"]("ngIf", ctx_r13.none);
  }
}

function SelectComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementStart"](0, "div", 8);
    fesm2015_core_js_["ɵɵtemplate"](1, SelectComponent_div_4_ng_container_1_Template, 3, 6, "ng-container", 0);
    fesm2015_core_js_["ɵɵtemplate"](2, SelectComponent_div_4_ng_container_2_Template, 5, 1, "ng-container", 0);
    fesm2015_core_js_["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r3 = fesm2015_core_js_["ɵɵnextContext"]();
    fesm2015_core_js_["ɵɵclassMap"](ctx_r3.panelStyleClass);
    fesm2015_core_js_["ɵɵproperty"]("ngClass", "select-panel")("ngStyle", ctx_r3.panelStyle);
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵproperty"]("ngIf", !!(ctx_r3.options == null ? null : ctx_r3.options.length) && !!(ctx_r3.optionsToDisplay == null ? null : ctx_r3.optionsToDisplay.length));
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵproperty"]("ngIf", !!!(ctx_r3.options == null ? null : ctx_r3.options.length) || !!!(ctx_r3.optionsToDisplay == null ? null : ctx_r3.optionsToDisplay.length));
  }
}

const _c6 = function (a0, a1) {
  return {
    open: a0,
    close: a1
  };
};

function SelectComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementStart"](0, "span", 13);
    fesm2015_core_js_["ɵɵelement"](1, "img", 14);
    fesm2015_core_js_["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const overlayVisible_r21 = ctx.$implicit;
    const ctx_r5 = fesm2015_core_js_["ɵɵnextContext"]();
    fesm2015_core_js_["ɵɵproperty"]("ngClass", ctx_r5.selectIconClass)("ngClass", fesm2015_core_js_["ɵɵpureFunction2"](3, _c6, overlayVisible_r21, !overlayVisible_r21));
    fesm2015_core_js_["ɵɵadvance"](1);
    fesm2015_core_js_["ɵɵproperty"]("src", ctx_r5.trigger_icon, fesm2015_core_js_["ɵɵsanitizeUrl"]);
  }
}

function SelectComponent_ng_template_7_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = fesm2015_core_js_["ɵɵgetCurrentView"]();

    fesm2015_core_js_["ɵɵelementStart"](0, "ngxd-select-item", 16);
    fesm2015_core_js_["ɵɵlistener"]("optionClick", function SelectComponent_ng_template_7_ng_template_2_Template_ngxd_select_item_optionClick_0_listener($event) {
      fesm2015_core_js_["ɵɵrestoreView"](_r28);
      const ctx_r27 = fesm2015_core_js_["ɵɵnextContext"](2);
      return ctx_r27.onItemClick($event);
    });
    fesm2015_core_js_["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const option_r25 = ctx.$implicit;
    const selectedOption_r23 = fesm2015_core_js_["ɵɵnextContext"]().selectedOption;
    const ctx_r24 = fesm2015_core_js_["ɵɵnextContext"]();
    fesm2015_core_js_["ɵɵproperty"]("option", option_r25)("selected", selectedOption_r23 === option_r25)("label", ctx_r24.getOptionLabel(option_r25))("disabled", ctx_r24.isOptionDisabled(option_r25))("template", ctx_r24.itemTemplate)("itemSize", ctx_r24.itemSize);
  }
}

function SelectComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementStart"](0, "div", 11);
    fesm2015_core_js_["ɵɵelementStart"](1, "div", 12);
    fesm2015_core_js_["ɵɵtemplate"](2, SelectComponent_ng_template_7_ng_template_2_Template, 1, 6, "ng-template", 15);
    fesm2015_core_js_["ɵɵelementEnd"]();
    fesm2015_core_js_["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const options_r22 = ctx.$implicit;
    fesm2015_core_js_["ɵɵadvance"](2);
    fesm2015_core_js_["ɵɵproperty"]("ngForOf", options_r22);
  }
}

const _c7 = [[["", 8, "simple-items"]]];
const _c8 = [".simple-items"];
let SelectItemComponent = /*#__PURE__*/(() => {
  class SelectItemComponent {
    constructor() {
      this.option = undefined;
      this.selected = false;
      this.disabled = false;
      this.visible = true;
      this.itemBg = 'transparent';
      this.itemSize = 25;
      this.label = undefined;
      this.optionClick = new fesm2015_core_js_.EventEmitter();

      this.getItemCaption = () => {
        var _a, _b;

        return !!this.option && typeof this.option === 'string' ? this.option : !!((_a = this.label) === null || _a === void 0 ? void 0 : _a.trim) && ((_b = this.label) === null || _b === void 0 ? void 0 : _b.trim().length) ? this.label : 'Empty';
      };

      this.getItemHeight = () => typeof this.itemSize === 'number' ? `${this.itemSize}px` : this.itemSize;

      this.getItemVisibility = () => this.visible ? 'visible' : 'hidden';
    }

    onOptionClick($event) {
      this.optionClick.emit({
        originalEvent: $event,
        option: this.option
      });
    }

  }

  SelectItemComponent.ɵfac = function SelectItemComponent_Factory(t) {
    return new (t || SelectItemComponent)();
  };

  SelectItemComponent.ɵcmp = /* @__PURE__ */fesm2015_core_js_["ɵɵdefineComponent"]({
    type: SelectItemComponent,
    selectors: [["ngxd-select-item"]],
    hostVars: 9,
    hostBindings: function SelectItemComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        fesm2015_core_js_["ɵɵlistener"]("click", function SelectItemComponent_click_HostBindingHandler($event) {
          return ctx.onOptionClick($event);
        });
      }

      if (rf & 2) {
        fesm2015_core_js_["ɵɵhostProperty"]("ngStyle", fesm2015_core_js_["ɵɵpureFunction0"](8, _c0));
        fesm2015_core_js_["ɵɵattribute"]("role", "option");
        fesm2015_core_js_["ɵɵclassProp"]("select-item", true)("item-highlight", ctx.selected)("item-disabled", ctx.disabled);
      }
    },
    inputs: {
      option: "option",
      selected: "selected",
      disabled: "disabled",
      visible: "visible",
      itemBg: "itemBg",
      itemSize: "itemSize",
      label: "label",
      template: "template"
    },
    outputs: {
      optionClick: "optionClick"
    },
    decls: 2,
    vars: 2,
    consts: [[4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function SelectItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        fesm2015_core_js_["ɵɵtemplate"](0, SelectItemComponent_span_0_Template, 2, 1, "span", 0);
        fesm2015_core_js_["ɵɵtemplate"](1, SelectItemComponent_ng_container_1_Template, 2, 4, "ng-container", 0);
      }

      if (rf & 2) {
        fesm2015_core_js_["ɵɵproperty"]("ngIf", !ctx.template);
        fesm2015_core_js_["ɵɵadvance"](1);
        fesm2015_core_js_["ɵɵproperty"]("ngIf", ctx.template);
      }
    },
    directives: [fesm2015_common_js_.NgIf, fesm2015_common_js_.NgTemplateOutlet],
    styles: ["[_nghost-%COMP%] {\n\t\t\tdisplay: block;\n\t\t\tpadding: .1rem;\n\n\t\t\t.item-disabled {\n\t\t\t\tcursor: not-allowed !important;\n\t\t\t\tpointer-events: none;\n\t\t\t\tcolor: var(--ngxd-disabled);\n\t\t\t\tuser-select: none;\n\t\t\t}\n\t\t\t.item-highlight:not(.item-disabled) {\n\t\t\t\tuser-select: none;\n\t\t\t\tcursor: pointer;\n\t\t\t\tpointer-events: all;\n\t\t\t}\n\t\t}"]
  });
  return SelectItemComponent;
})();

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/* eslint-disable @typescript-eslint/no-explicit-any */


const imgBase64ToBlob = (Base64Image, imageType = 'image/png') => {
  const parts = Base64Image.split(';base64,');
  const decodedData = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(decodedData.length);

  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }

  return new Blob([uInt8Array], {
    type: imageType
  });
};

const svgToBase64src = rawSvg => 'data:image/svg+xml;base64,' + btoa(rawSvg);

const prepRes = (item, sanitizer) => sanitizer.bypassSecurityTrustResourceUrl(item);

const sanitizeHTML = (item, sanitizer) => sanitizer.sanitize(SecurityContext.HTML, item);

const getSvgSafeRes = (file, sanitizer) => prepRes(svgToBase64src(file), sanitizer);

const getPngSafeRes = (file, sanitizer) => prepRes(URL.createObjectURL(imgBase64ToBlob(file)), sanitizer);

const blobToSafeRes = (blob, sanitizer) => prepRes(URL.createObjectURL(blob), sanitizer);
/**
 *
 * @param data - option value (could be simple string or complex object to resolve)
 * @param field - the key (or complex lookup object key) of data object to resolve value by
 * @returns resolved single option value (Input for SelectItem)
 */


const resolveFieldData = (data, field) => {
  if (typeof data === 'string') return data;

  if (!!data && !!field) {
    if (isString(field) && field.indexOf('.') == -1) {
      return data[field];
    } else {
      if (isString(field)) {
        const fields = field.split('.');
        let value = data;

        for (let i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }

          value = value[fields[i]];
        }

        return value;
      }
    }
  } else if (data) {
    if (!!data && !!data['label']) return data['label'];else {
      return Object.values(data)[0] || null;
    }
  } else return null;
};

const isString = obj => typeof obj === 'string';

const equals = (obj1, obj2, field) => {
  if (field) return resolveFieldData(obj1, field) === resolveFieldData(obj2, field);else return JSON.stringify(obj1) === JSON.stringify(obj2);
};

var OptionKeyboardEventHandleKeys = /*#__PURE__*/(() => {
  (function (OptionKeyboardEventHandleKeys) {
    OptionKeyboardEventHandleKeys["ArrowDown"] = "ArrowDown";
    OptionKeyboardEventHandleKeys["Down"] = "Down";
    OptionKeyboardEventHandleKeys["ArrowUp"] = "ArrowUp";
    OptionKeyboardEventHandleKeys["Enter"] = "Enter";
    OptionKeyboardEventHandleKeys["Escape"] = "Escape";
    OptionKeyboardEventHandleKeys["Esc"] = "Esc";
    OptionKeyboardEventHandleKeys["Up"] = "Up";
    OptionKeyboardEventHandleKeys["Tab"] = "Tab";
    OptionKeyboardEventHandleKeys["Space"] = " ";
  })(OptionKeyboardEventHandleKeys || (OptionKeyboardEventHandleKeys = {}));

  return OptionKeyboardEventHandleKeys;
})();

/* eslint-disable max-len */

/*!
 * @ngx-dummy/select-Simple library
 * Simple select created for angular / ionic projects.
 * https://github.com/ngx-dummy/select-simple
 *
 * Copyright  Vladimir Ovsyukov <ovsyukov@yandex.com>
 * Published under MIT License
 */
const arrow_down = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#caa" width="48px" height="48px"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>';
/* eslint-disable @angular-eslint/no-host-metadata-property */

const SELECT_VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: (0,fesm2015_core_js_.forwardRef)(() => SelectComponent),
  multi: true
};
const NG_VALIDATORS_PROVIDER = {
  provide: NG_VALIDATORS,
  useExisting: (0,fesm2015_core_js_.forwardRef)(() => SelectComponent),
  multi: true
};
let SelectComponent = /*#__PURE__*/(() => {
  class SelectComponent {
    constructor( // @Self() @Optional() ngControl: NgControl,
    el, renderer, cd, sanitizer, zone) {
      this.el = el;
      this.renderer = renderer;
      this.cd = cd;
      this.sanitizer = sanitizer;
      this.zone = zone;
      this.trigger_icon = getSvgSafeRes(arrow_down, this.sanitizer);
      this._headerStyle = {};
      this._panelStyle = {
        backgroundColor: 'rgba(1, 1, 1, 0.45)',
        color: '#fff',
        border: '1px solid var(--ngxd-primary-color)',
        borderRadius: '0.2rem',
        boxShadow: '2px 5px 10px rgba(55, 55, 55, 0.8)'
      };
      this.panelStyleClass = 'panel';
      this.styleClass = '';
      this.readonly = false;
      this.required = false;
      this.none = false;
      this.autofocus = false;
      this.placeholder = undefined;
      this.selectIconClass = '';
      this.tabindex = 0;
      this._disabled = false;
      this.onChange = new fesm2015_core_js_.EventEmitter();
      this.onClick = new fesm2015_core_js_.EventEmitter();
      this.onShow = new fesm2015_core_js_.EventEmitter();
      this.onHide = new fesm2015_core_js_.EventEmitter();
      this.onFocus = new fesm2015_core_js_.EventEmitter();
      this.onBlur = new fesm2015_core_js_.EventEmitter();

      this.onModelChange = () => {};

      this.onModelTouched = () => {};

      this.hover = false;
      this.overlayVisible = false;
      this.optionsChanged = false;
      this.focused = false;
      this.selectedItemIndex = 0; // if (ngControl) {
      //   ngControl.valueAccessor = this;
      // }
    }

    onHostFocus(_$event) {
      console.log('Focus, prev value :: ', this.prevValue);
    }

    onHostBlur(_$event) {
      this.prevValue = this.selectedOption || null;
      console.log('BLUR, prev val :: ', this.prevValue);
    }

    set headerStyle(headStyleObj) {
      if (!!headStyleObj && !!Object.keys(headStyleObj).length) {
        this._headerStyle = Object.assign(Object.assign({}, this._headerStyle), headStyleObj);
      }
    }

    get headerStyle() {
      return this._headerStyle;
    }

    get panelStyle() {
      return this._panelStyle;
    }

    set panelStyle(stylesObj) {
      if (!!stylesObj && !!Object.keys(stylesObj).length) {
        this._panelStyle = Object.assign(Object.assign({}, this._panelStyle), stylesObj);
      }
    }

    get options() {
      return this._options;
    }

    set options(val) {
      this._options = val;
      this.optionsToDisplay = this._options;
      this.updateSelectedOption(this.value);
      this.optionsChanged = true;
    }

    get disabled() {
      return this._disabled;
    }

    set disabled(_disabled) {
      if (_disabled) {
        this.focused = false;
        if (this.overlayVisible) this.hide();
      }

      this._disabled = _disabled;

      if (!this.cd.destroyed) {
        this.cd.detectChanges();
      }
    }

    ngAfterContentChecked() {
      var _a, _b, _c, _d;

      this.openerBtnTemplate = ((_a = this.templates) === null || _a === void 0 ? void 0 : _a.openerBtnTemplate) ? this.templates.openerBtnTemplate : this.defaultOpenerTemplate;
      this.itemsListDefaultTmpl = ((_b = this.templates) === null || _b === void 0 ? void 0 : _b.itemslistTemplate) ? this.templates.itemslistTemplate : this.itemsListDefaultTmpl;

      if ((_c = this.templates) === null || _c === void 0 ? void 0 : _c.selectedItemTemplate) {
        this.selectedItemTemplate = this.templates.selectedItemTemplate;
      }

      (_d = this.projectedItems) === null || _d === void 0 ? void 0 : _d.forEach(itemCmp => {
        itemCmp.optionClick.subscribe(e => this.onItemClick(e));
      });
      this.cd.detectChanges();
    }

    ngOnInit() {
      this.optionsToDisplay = this.options;
      this.updateSelectedOption(null);
      fromEvent(document, 'click').pipe(switchMap(ev => {
        var _a, _b;

        const iconContainer = (_b = (_a = ev.target) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.contains('select-trigger-icon');

        if (this.isOutsideClicked(ev) && !iconContainer) {
          this.hide();
        }

        return of(ev);
      })).subscribe();
    }

    onInputFocus($event) {
      this.focused = true;
      this.onFocus.emit($event);
    }

    onInputBlur($event) {
      this.focused = false;
      this.onBlur.emit($event);
    }

    get label() {
      var _a, _b;

      const label = this.selectedOption ? this.getOptionLabel(this.selectedOption) : !!((_a = this.placeholder) === null || _a === void 0 ? void 0 : _a.length) ? this.placeholder : !!((_b = this.options) === null || _b === void 0 ? void 0 : _b.length) ? this.getOptionLabel(this.options[0]) : null;
      return label;
    }

    getOptionLabel(option) {
      return this.optionLabelKey ? resolveFieldData(option, this.optionLabelKey) : resolveFieldData(option);
    }

    getOptionValue(option) {
      return this.optionValue ? resolveFieldData(option, this.optionValue) : this.optionLabelKey || option.value === undefined ? option : option.value;
    }

    isOptionDisabled(option) {
      return this.optionDisabled ? resolveFieldData(option, this.optionDisabled) : option.disabled !== undefined ? option.disabled : false;
    }

    onItemClick($itemEvent) {
      if (this.readonly) {
        console.log('DropDown is READONLY');
        return;
      }

      const option = $itemEvent.option;

      if (!this.isOptionDisabled(option)) {
        this.selectItem($itemEvent.originalEvent, option);
      }

      setTimeout(() => {
        this.hide();
      }, 150);
    }

    selectItem($event, option, update = true) {
      // if (this.selectedOption != option) {
      this.selectedOption = option;

      if (update) {
        this.value = this.getOptionValue(option);
        this.onModelChange(this.value);
        this.onChange.emit({
          originalEvent: $event,
          value: this.value
        });
      } // }

    }

    writeValue(value) {
      this.value = value;
      this.updateSelectedOption(value);
      this.cd.markForCheck();
    }

    validate({
      value
    }) {
      if (this.required && !!!value) return {
        invalid: true
      };
      const isNotValid = this.required && !!!value && !!Validators.required(value);
      return isNotValid && {
        invalid: true
      };
    }

    updateSelectedOption(val) {
      // this.selectedOption = this.findOption(val, this.optionsToDisplay);
      if (!this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length) {
        this.selectedOption = this.optionsToDisplay[0];
      }
    }

    registerOnChange(fn) {
      this.onModelChange = fn;
    }

    registerOnTouched(fn) {
      this.onModelTouched = fn;
    }

    setDisabledState(val) {
      this.disabled = val;
      this.cd.markForCheck();
    }

    onMouseclick($event) {
      if (this.disabled) {
        return;
      }

      if (!this.readonly) {
        this.onClick.emit($event);
      }

      if (this.overlayVisible) this.hide();else this.show();
      this.cd.detectChanges();
    }

    reset() {
      this.selectItem(new MouseEvent('click'), null);
    }

    isOutsideClicked(event) {
      return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target));
    }

    show() {
      this.overlayVisible = true;
      this.onShow.emit(true);
    }

    hide() {
      this.onHide.emit(false);
      this.overlayVisible = false;
      this.cd.markForCheck();
    }

    onKeydown($event) {
      var _a;

      console.log($event.key, $event.code);

      if (this.isOutsideClicked($event)) {
        console.log('Clicked outside of the component ...');
        return;
      }

      if (this.readonly || !!!((_a = this.optionsToDisplay) === null || _a === void 0 ? void 0 : _a.length)) {
        return;
      }

      switch ($event.key) {
        case OptionKeyboardEventHandleKeys.ArrowDown:
        case OptionKeyboardEventHandleKeys.Down:
          if (!this.overlayVisible && $event.altKey) {
            this.show();
          } else {
            this.selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
            let nextEnabledOption = this.findNextEnabledOption(this.selectedItemIndex);

            if (nextEnabledOption) {
              this.selectItem($event, nextEnabledOption, false);
            }
          }

          $event.preventDefault();
          break;

        case OptionKeyboardEventHandleKeys.ArrowUp:
        case OptionKeyboardEventHandleKeys.Up:
          this.selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
          let prevEnabledOption = this.findPrevEnabledOption(this.selectedItemIndex);

          if (!!prevEnabledOption) {
            this.selectItem($event, prevEnabledOption, false);
          }

          $event.preventDefault();
          break;

        case OptionKeyboardEventHandleKeys.Space:
          if (!this.overlayVisible) {
            this.show();
          } else {
            this.hide();
          }

          $event.preventDefault();
          break;

        case OptionKeyboardEventHandleKeys.Enter:
          this.hide();
          this.prevValue = this.selectedOption;
          this.selectItem($event, this.selectedOption, true);
          $event.preventDefault();
          break;

        case OptionKeyboardEventHandleKeys.Escape:
        case OptionKeyboardEventHandleKeys.Esc:
          this.selectItem($event, this.prevValue);
          this.hide();
          $event.preventDefault();
          break;

        case OptionKeyboardEventHandleKeys.Tab:
          this.hide();
          break;
      }

      console.log(this.selectedOption);
    }

    findOptionIndex(val, opts) {
      let index = -1;

      if (opts) {
        for (let i = 0; i < opts.length; i++) {
          if (val == null && this.getOptionValue(opts[i]) == null || equals(val, this.getOptionValue(opts[i]))) {
            index = i;
            break;
          }
        }
      }

      return index;
    }

    findPrevEnabledOption(index) {
      let prevEnabledOption;

      if (this.optionsToDisplay && this.optionsToDisplay.length) {
        for (let i = index - 1; 0 <= i; i--) {
          let option = this.optionsToDisplay[i];

          if (option.disabled) {
            continue;
          } else {
            prevEnabledOption = option;
            break;
          }
        }

        if (!prevEnabledOption) {
          for (let i = this.optionsToDisplay.length - 1; i >= index; i--) {
            let option = this.optionsToDisplay[i];

            if (this.isOptionDisabled(option)) {
              continue;
            } else {
              prevEnabledOption = option;
              break;
            }
          }
        }
      }

      return prevEnabledOption;
    }

    findNextEnabledOption(index) {
      let nextEnabledOption;

      if (this.optionsToDisplay && this.optionsToDisplay.length) {
        for (let i = index + 1; i < this.optionsToDisplay.length; i++) {
          let option = this.optionsToDisplay[i];

          if (this.isOptionDisabled(option)) {
            continue;
          } else {
            nextEnabledOption = option;
            break;
          }
        }

        if (!nextEnabledOption) {
          for (let i = 0; i < index; i++) {
            let option = this.optionsToDisplay[i];

            if (this.isOptionDisabled(option)) {
              continue;
            } else {
              nextEnabledOption = option;
              break;
            }
          }
        }
      }

      return nextEnabledOption;
    }

  }

  SelectComponent.ɵfac = function SelectComponent_Factory(t) {
    return new (t || SelectComponent)(fesm2015_core_js_["ɵɵdirectiveInject"](fesm2015_core_js_.ElementRef), fesm2015_core_js_["ɵɵdirectiveInject"](fesm2015_core_js_.Renderer2), fesm2015_core_js_["ɵɵdirectiveInject"](fesm2015_core_js_.ChangeDetectorRef), fesm2015_core_js_["ɵɵdirectiveInject"](DomSanitizer), fesm2015_core_js_["ɵɵdirectiveInject"](fesm2015_core_js_.NgZone));
  };

  SelectComponent.ɵcmp = /* @__PURE__ */fesm2015_core_js_["ɵɵdefineComponent"]({
    type: SelectComponent,
    selectors: [["ngxd-select"]],
    contentQueries: function SelectComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        fesm2015_core_js_["ɵɵcontentQuery"](dirIndex, SelectItemComponent, 5);
      }

      if (rf & 2) {
        let _t;

        fesm2015_core_js_["ɵɵqueryRefresh"](_t = fesm2015_core_js_["ɵɵloadQuery"]()) && (ctx.projectedItems = _t);
      }
    },
    viewQuery: function SelectComponent_Query(rf, ctx) {
      if (rf & 1) {
        fesm2015_core_js_["ɵɵviewQuery"](_c2, 5, fesm2015_core_js_.TemplateRef);
        fesm2015_core_js_["ɵɵviewQuery"](_c3, 5, fesm2015_core_js_.TemplateRef);
      }

      if (rf & 2) {
        let _t;

        fesm2015_core_js_["ɵɵqueryRefresh"](_t = fesm2015_core_js_["ɵɵloadQuery"]()) && (ctx.defaultOpenerTemplate = _t.first);
        fesm2015_core_js_["ɵɵqueryRefresh"](_t = fesm2015_core_js_["ɵɵloadQuery"]()) && (ctx.itemsListDefaultTmpl = _t.first);
      }
    },
    hostVars: 15,
    hostBindings: function SelectComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        fesm2015_core_js_["ɵɵlistener"]("blur", function SelectComponent_blur_HostBindingHandler($event) {
          return ctx.onHostBlur($event);
        })("focus", function SelectComponent_focus_HostBindingHandler($event) {
          return ctx.onHostFocus($event);
        })("keydown", function SelectComponent_keydown_HostBindingHandler($event) {
          return ctx.onKeydown($event);
        })("click", function SelectComponent_click_HostBindingHandler($event) {
          return ctx.onMouseclick($event);
        });
      }

      if (rf & 2) {
        fesm2015_core_js_["ɵɵhostProperty"]("ngStyle", ctx.headerStyle);
        fesm2015_core_js_["ɵɵattribute"]("tabIndex", ctx.tabindex)("autofocus", ctx.autofocus);
        fesm2015_core_js_["ɵɵclassMap"](ctx.styleClass);
        fesm2015_core_js_["ɵɵclassProp"]("wrapper-focus", ctx.focused || ctx.overlayVisible)("select", true)("disabled", ctx.disabled)("focus", ctx.focused || ctx.overlayVisible)("select-open", ctx.overlayVisible);
      }
    },
    inputs: {
      templates: "templates",
      name: "name",
      headerStyle: "headerStyle",
      panelStyle: "panelStyle",
      panelStyleClass: "panelStyleClass",
      styleClass: "styleClass",
      readonly: "readonly",
      required: "required",
      none: "none",
      autofocus: "autofocus",
      placeholder: "placeholder",
      optionLabelKey: "optionLabelKey",
      selectIconClass: "selectIconClass",
      optionValue: "optionValue",
      tabindex: "tabindex",
      optionDisabled: "optionDisabled",
      itemSize: "itemSize",
      options: "options",
      disabled: "disabled"
    },
    outputs: {
      onChange: "onChange",
      onClick: "onClick",
      onShow: "onShow",
      onHide: "onHide",
      onFocus: "onFocus",
      onBlur: "onBlur"
    },
    features: [fesm2015_core_js_["ɵɵProvidersFeature"]([SELECT_VALUE_ACCESSOR_PROVIDER, NG_VALIDATORS_PROVIDER])],
    ngContentSelectors: _c8,
    decls: 9,
    vars: 5,
    consts: [[4, "ngIf"], [3, "ngClass", 4, "ngIf"], ["role", "button", 1, "select-trigger"], [3, "ngClass", "ngStyle", "class", 4, "ngIf"], ["defaultSelectIconTmpl", ""], ["itemsListDefaultTmpl", ""], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "ngClass"], [3, "ngClass", "ngStyle"], ["class", "reset", 3, "click", 4, "ngIf"], [1, "reset", 3, "click"], [1, "select-items-wrapper"], [1, "select-items"], [1, "select-trigger-icon", 3, "ngClass"], [1, "select-trigger__default-img", 3, "src"], ["ngFor", "", 3, "ngForOf"], [3, "option", "selected", "label", "disabled", "template", "itemSize", "optionClick"]],
    template: function SelectComponent_Template(rf, ctx) {
      if (rf & 1) {
        fesm2015_core_js_["ɵɵprojectionDef"](_c7);
        fesm2015_core_js_["ɵɵtemplate"](0, SelectComponent_span_0_Template, 3, 2, "span", 0);
        fesm2015_core_js_["ɵɵtemplate"](1, SelectComponent_span_1_Template, 2, 4, "span", 1);
        fesm2015_core_js_["ɵɵelementStart"](2, "div", 2);
        fesm2015_core_js_["ɵɵtemplate"](3, SelectComponent_ng_container_3_Template, 2, 4, "ng-container", 0);
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵtemplate"](4, SelectComponent_div_4_Template, 3, 6, "div", 3);
        fesm2015_core_js_["ɵɵtemplate"](5, SelectComponent_ng_template_5_Template, 2, 6, "ng-template", null, 4, fesm2015_core_js_["ɵɵtemplateRefExtractor"]);
        fesm2015_core_js_["ɵɵtemplate"](7, SelectComponent_ng_template_7_Template, 3, 1, "ng-template", null, 5, fesm2015_core_js_["ɵɵtemplateRefExtractor"]);
      }

      if (rf & 2) {
        fesm2015_core_js_["ɵɵproperty"]("ngIf", !!ctx.label);
        fesm2015_core_js_["ɵɵadvance"](1);
        fesm2015_core_js_["ɵɵproperty"]("ngIf", !!!ctx.label);
        fesm2015_core_js_["ɵɵadvance"](1);
        fesm2015_core_js_["ɵɵattribute"]("aria-expanded", ctx.overlayVisible);
        fesm2015_core_js_["ɵɵadvance"](1);
        fesm2015_core_js_["ɵɵproperty"]("ngIf", ctx.openerBtnTemplate);
        fesm2015_core_js_["ɵɵadvance"](1);
        fesm2015_core_js_["ɵɵproperty"]("ngIf", ctx.overlayVisible);
      }
    },
    directives: [fesm2015_common_js_.NgIf, fesm2015_common_js_.NgTemplateOutlet, fesm2015_common_js_.NgClass, fesm2015_common_js_.NgStyle, fesm2015_common_js_.NgForOf, SelectItemComponent],
    styles: [":root{--color-white: #fff;--ngxd-primary-color: #adc9cebf;--ngxd-secondary-color: #0b2424;--ngxd-primary-color-t50: #00556680;--ngxd-disabled: #8a8a8a80;--ngxd-primary-icon-color: #00556640;--ngxd-primary-color--active: rgba(221, 233, 235, .7490196078);--ngxd-primary-color--opened: rgba(141, 180, 187, .7490196078)}.select{display:inline-flex;width:-webkit-max-content;width:-moz-max-content;width:max-content;box-sizing:border-box;min-height:2rem;padding:.5rem;align-items:center;cursor:pointer;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background:#adc9cebf;background:var(--ngxd-primary-color);border:1px solid #fff;border:1px solid var(--color-white);transition:background-color .2s,color .2s,border-color .2s,box-shadow .2s;border-radius:3px}.select:not(.disabled):hover{border-color:#0b2424;border-color:var(--ngxd-secondary-color)}.select:not(.disabled).focus{outline-offset:0;box-shadow:0 0 0 .1rem #0b2424;box-shadow:0 0 0 .1rem var(--ngxd-secondary-color);border-color:#adc9cebf;border-color:var(--ngxd-primary-color)}.select:not(.disabled).wrapper-focus{box-shadow:none;background-color:#00556680;background-color:var(--ngxd-primary-color-t50);border-color:#0b2424;border-color:var(--ngxd-secondary-color);background-size:100% 2px,100% 1px}.select.disabled{cursor:not-allowed!important;pointer-events:none;color:#8a8a8a80;color:var(--ngxd-disabled)}.select .select-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0;margin:.1rem}.select .select-trigger-icon{margin:.1rem .2rem;padding:.1rem;display:grid;place-content:center;color:#adc9cebf;color:var(--ngxd-primary-color);border-radius:50%;background-color:#00556640;background-color:var(--ngxd-primary-icon-color)}.select .select-trigger-icon.open{transform:rotate(180deg);transition:transform .1s ease-out}.select .select-trigger-icon.close{transform:rotate(0);transition:transform .1s ease-out}.select .select-trigger__default-img{max-width:1.5rem;max-height:1.5rem}.select .select-label{display:block;white-space:nowrap;overflow:hidden;flex:1 1 auto;width:1%;text-overflow:ellipsis;cursor:pointer}.select .select-label-empty{overflow:hidden;visibility:hidden}.select .select-panel{height:auto;min-width:100%;position:absolute;top:100%;left:0;padding:.5rem;transition:all .3s ease;z-index:1}.select .select-panel .select-items-wrapper{overflow:auto}.select .select-panel .select-items{margin:0;padding:0;list-style-type:none}.select .select-panel .select-items .select-item{cursor:pointer;font-weight:normal;white-space:nowrap;position:relative;overflow:hidden;margin:.1rem}.select .select-panel .select-items .select-item.item-highlight{background-color:#8db4bbbf;background-color:var(--ngxd-primary-color--opened);color:var(#0b2424)}.select .select-panel .select-items .select-item:hover{background-color:var(-ngxd-primary-color-t50);color:#0b2424;color:var(--ngxd-secondary-color)}.select .select-panel .reset{border:none;outline:0;text-decoration:none;font-size:100%;list-style:none;margin-top:.5rem;padding:.4rem 2rem;width:100%;display:grid;place-content:center;border-radius:.2rem;background-color:#adc9cebf;background-color:var(--ngxd-primary-color)}@-webkit-keyframes fadein{0%{opacity:0}to{opacity:1}}@keyframes fadein{0%{opacity:0}to{opacity:1}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
  return SelectComponent;
})();

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

let SelectSimpleModule = /*#__PURE__*/(() => {
  class SelectSimpleModule {}

  SelectSimpleModule.ɵfac = function SelectSimpleModule_Factory(t) {
    return new (t || SelectSimpleModule)();
  };

  SelectSimpleModule.ɵmod = /* @__PURE__ */fesm2015_core_js_["ɵɵdefineNgModule"]({
    type: SelectSimpleModule
  });
  SelectSimpleModule.ɵinj = /* @__PURE__ */fesm2015_core_js_["ɵɵdefineInjector"]({
    imports: [[fesm2015_common_js_.CommonModule, FormsModule]]
  });
  return SelectSimpleModule;
})();

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Generated bundle index. Do not edit.
 */


 //# sourceMappingURL=ngx-dummy-select-simple.js.map
;// CONCATENATED MODULE: ./packages/select-sample/src/app/app.component.ts
/* eslint-disable @angular-eslint/no-host-metadata-property */






const app_component_c0 = ["btnTmpl"];
const app_component_c1 = ["selectedItemTemplate"];

function AppComponent_ngxd_select_item_29_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelement"](0, "ngxd-select-item", 15);
  }

  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    fesm2015_core_js_["ɵɵproperty"]("option", item_r5.name)("label", item_r5.name);
  }
}

function AppComponent_ng_template_44_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelement"](0, "span", 16);
  }

  if (rf & 2) {
    const visible_r6 = ctx.$implicit;
    fesm2015_core_js_["ɵɵclassProp"]("up", visible_r6);
  }
}

function AppComponent_ng_template_46_Template(rf, ctx) {
  if (rf & 1) {
    fesm2015_core_js_["ɵɵelementStart"](0, "div", 17);
    fesm2015_core_js_["ɵɵelement"](1, "ion-icon", 18);
    fesm2015_core_js_["ɵɵtext"](2, " \u00A0 ");
    fesm2015_core_js_["ɵɵelementStart"](3, "span", 19);
    fesm2015_core_js_["ɵɵtext"](4);
    fesm2015_core_js_["ɵɵelementEnd"]();
    fesm2015_core_js_["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const label_r7 = ctx.$implicit;
    fesm2015_core_js_["ɵɵadvance"](4);
    fesm2015_core_js_["ɵɵtextInterpolate"](label_r7);
  }
}

let AppComponent = /*#__PURE__*/(() => {
  class AppComponent {
    constructor() {
      this.title = 'Select-sample';
      this.selectedCity1 = undefined;
      this.selectedCity2 = undefined;
      this.selectedCity3 = undefined;
      this.templates = {};
      this.headStyle = {
        background: 'lightgreen'
      };
      this.panelStyling = {
        background: '#10882a38',
        color: '#91c',
        fontSize: '700',
        lineHeight: '200%',
        borderRadius: '1rem',
        border: 'none',
        boxShadow: '1px 5px 2px rgba(155, 225, 225, .25)',
        left: '.5rem',
        width: '200%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
      };
      this.cities = [{
        name: 'Moscow',
        code: 'MS'
      }, {
        name: 'St.Pete',
        code: 'SPB'
      }, {
        name: 'New York',
        code: 'NY'
      }, {
        name: 'Rome',
        code: 'RM'
      }, {
        name: 'London',
        code: 'LDN'
      }, {
        name: 'Paris',
        code: 'PRS'
      }];
      this.simpleCitiesArray = [...this.cities].map(({
        name
      }) => name);
      this.form = new FormGroup({
        selector: new FormControl(this.cities[0])
      });
    }

    checkFormValid($event) {
      $event.preventDefault();
      alert('Is form valid: ' + this.form.valid);
    }

    ngOnInit() {
      this.templates = {
        openerBtnTemplate: this.bntOpenTmpl,
        selectedItemTemplate: this.selectedItemTemplate
      };
      this.form.valueChanges.subscribe(formValue => {
        console.log({
          formValue,
          formValid: this.form.valid
        });
        this.selectedCity1 = {
          formValue,
          formValid: this.form.valid
        };
      });
    }

  }

  AppComponent.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)();
  };

  AppComponent.ɵcmp = /*@__PURE__*/fesm2015_core_js_["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["ngx-dummy-root"]],
    viewQuery: function AppComponent_Query(rf, ctx) {
      if (rf & 1) {
        fesm2015_core_js_["ɵɵviewQuery"](app_component_c0, 7);
        fesm2015_core_js_["ɵɵviewQuery"](app_component_c1, 7);
      }

      if (rf & 2) {
        let _t;

        fesm2015_core_js_["ɵɵqueryRefresh"](_t = fesm2015_core_js_["ɵɵloadQuery"]()) && (ctx.bntOpenTmpl = _t.first);
        fesm2015_core_js_["ɵɵqueryRefresh"](_t = fesm2015_core_js_["ɵɵloadQuery"]()) && (ctx.selectedItemTemplate = _t.first);
      }
    },
    hostAttrs: [1, "flex", "pad-1_2"],
    decls: 48,
    vars: 36,
    consts: [[1, "demo"], [3, "formGroup", "ngSubmit"], [1, "resources"], ["id", "select1", "formControlName", "selector", "placeholder", "Select a City", "optionLabelKey", "name", 3, "options", "templates", "readonly", "required", "none", "tabindex", "autofocus"], ["type", "submit", 1, "resource", "gutter-1", 3, "disabled"], [1, "box"], ["id", "select2", 3, "tabindex", "options", "panelStyle", "headerStyle", "ngModel", "ngModelChange"], ["id", "select3", "placeholder", "Via Projection", 3, "tabindex", "ngModel", "ngModelChange"], [1, "simple-items"], [3, "visible", "label", "option", "onClick"], [3, "option", "label", 4, "ngFor", "ngForOf"], ["id", "select4", "placeholder", "Disabled", 3, "tabindex", "disabled"], ["id", "select5", 3, "readonly", "options"], ["btnTmpl", ""], ["selectedItemTemplate", ""], [3, "option", "label"], [1, "open-btn"], [1, "selected-container"], ["name", "add-circle-outline"], [1, "label"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        fesm2015_core_js_["ɵɵelementStart"](0, "section", 0);
        fesm2015_core_js_["ɵɵelementStart"](1, "h4");
        fesm2015_core_js_["ɵɵtext"](2, "Reactive form sample:");
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementStart"](3, "form", 1);
        fesm2015_core_js_["ɵɵlistener"]("ngSubmit", function AppComponent_Template_form_ngSubmit_3_listener($event) {
          return ctx.checkFormValid($event);
        });
        fesm2015_core_js_["ɵɵelementStart"](4, "div", 2);
        fesm2015_core_js_["ɵɵelement"](5, "ngxd-select", 3);
        fesm2015_core_js_["ɵɵelementStart"](6, "button", 4);
        fesm2015_core_js_["ɵɵtext"](7, "Submit (is the form Valid)");
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementStart"](8, "div", 5);
        fesm2015_core_js_["ɵɵelementStart"](9, "pre");
        fesm2015_core_js_["ɵɵtext"](10);
        fesm2015_core_js_["ɵɵpipe"](11, "json");
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelement"](12, "hr");
        fesm2015_core_js_["ɵɵelementStart"](13, "section", 0);
        fesm2015_core_js_["ɵɵelementStart"](14, "h4");
        fesm2015_core_js_["ɵɵtext"](15, "ngModel sample with custom templates (bound to simple strings):");
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementStart"](16, "ngxd-select", 6);
        fesm2015_core_js_["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngxd_select_ngModelChange_16_listener($event) {
          return ctx.selectedCity2 = $event;
        });
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementStart"](17, "div", 5);
        fesm2015_core_js_["ɵɵelementStart"](18, "pre");
        fesm2015_core_js_["ɵɵtext"](19);
        fesm2015_core_js_["ɵɵpipe"](20, "json");
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelement"](21, "hr");
        fesm2015_core_js_["ɵɵelementStart"](22, "section", 0);
        fesm2015_core_js_["ɵɵelementStart"](23, "h4");
        fesm2015_core_js_["ɵɵtext"](24, "Sample using content projection of items:");
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementStart"](25, "ngxd-select", 7);
        fesm2015_core_js_["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngxd_select_ngModelChange_25_listener($event) {
          return ctx.selectedCity3 = $event;
        });
        fesm2015_core_js_["ɵɵelementStart"](26, "div", 8);
        fesm2015_core_js_["ɵɵelementStart"](27, "ngxd-select-item", 9);
        fesm2015_core_js_["ɵɵlistener"]("onClick", function AppComponent_Template_ngxd_select_item_onClick_27_listener($event) {
          return ctx.selectedCity3 = $event;
        });
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementStart"](28, "ngxd-select-item", 9);
        fesm2015_core_js_["ɵɵlistener"]("onClick", function AppComponent_Template_ngxd_select_item_onClick_28_listener($event) {
          return ctx.selectedCity3 = $event;
        });
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵtemplate"](29, AppComponent_ngxd_select_item_29_Template, 1, 2, "ngxd-select-item", 10);
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementStart"](30, "div", 5);
        fesm2015_core_js_["ɵɵelementStart"](31, "pre");
        fesm2015_core_js_["ɵɵtext"](32);
        fesm2015_core_js_["ɵɵpipe"](33, "json");
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelement"](34, "hr");
        fesm2015_core_js_["ɵɵelementStart"](35, "section", 0);
        fesm2015_core_js_["ɵɵelementStart"](36, "h4");
        fesm2015_core_js_["ɵɵtext"](37, "Disabled sample:");
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelement"](38, "ngxd-select", 11);
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelement"](39, "hr");
        fesm2015_core_js_["ɵɵelementStart"](40, "section", 0);
        fesm2015_core_js_["ɵɵelementStart"](41, "h4");
        fesm2015_core_js_["ɵɵtext"](42, "Readonly sample:");
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵelement"](43, "ngxd-select", 12);
        fesm2015_core_js_["ɵɵelementEnd"]();
        fesm2015_core_js_["ɵɵtemplate"](44, AppComponent_ng_template_44_Template, 1, 2, "ng-template", null, 13, fesm2015_core_js_["ɵɵtemplateRefExtractor"]);
        fesm2015_core_js_["ɵɵtemplate"](46, AppComponent_ng_template_46_Template, 5, 1, "ng-template", null, 14, fesm2015_core_js_["ɵɵtemplateRefExtractor"]);
      }

      if (rf & 2) {
        fesm2015_core_js_["ɵɵadvance"](3);
        fesm2015_core_js_["ɵɵproperty"]("formGroup", ctx.form);
        fesm2015_core_js_["ɵɵadvance"](2);
        fesm2015_core_js_["ɵɵproperty"]("options", ctx.cities)("templates", ctx.templates)("readonly", false)("required", true)("none", true)("tabindex", 1)("autofocus", true);
        fesm2015_core_js_["ɵɵadvance"](1);
        fesm2015_core_js_["ɵɵproperty"]("disabled", !ctx.form.valid || ctx.form.pristine);
        fesm2015_core_js_["ɵɵadvance"](4);
        fesm2015_core_js_["ɵɵtextInterpolate"](fesm2015_core_js_["ɵɵpipeBind1"](11, 30, ctx.selectedCity1));
        fesm2015_core_js_["ɵɵadvance"](6);
        fesm2015_core_js_["ɵɵproperty"]("tabindex", 2)("options", ctx.simpleCitiesArray)("panelStyle", ctx.panelStyling)("headerStyle", ctx.headStyle)("ngModel", ctx.selectedCity2);
        fesm2015_core_js_["ɵɵadvance"](3);
        fesm2015_core_js_["ɵɵtextInterpolate"](fesm2015_core_js_["ɵɵpipeBind1"](20, 32, ctx.selectedCity2));
        fesm2015_core_js_["ɵɵadvance"](6);
        fesm2015_core_js_["ɵɵproperty"]("tabindex", 3)("ngModel", ctx.selectedCity3);
        fesm2015_core_js_["ɵɵadvance"](2);
        fesm2015_core_js_["ɵɵproperty"]("visible", true)("label", "Kaluga label")("option", "Kaluga");
        fesm2015_core_js_["ɵɵadvance"](1);
        fesm2015_core_js_["ɵɵproperty"]("visible", true)("label", "Vladivostok")("option", "Vladivostok");
        fesm2015_core_js_["ɵɵadvance"](1);
        fesm2015_core_js_["ɵɵproperty"]("ngForOf", ctx.cities);
        fesm2015_core_js_["ɵɵadvance"](3);
        fesm2015_core_js_["ɵɵtextInterpolate"](fesm2015_core_js_["ɵɵpipeBind1"](33, 34, ctx.selectedCity3));
        fesm2015_core_js_["ɵɵadvance"](6);
        fesm2015_core_js_["ɵɵproperty"]("tabindex", 4)("disabled", true);
        fesm2015_core_js_["ɵɵadvance"](5);
        fesm2015_core_js_["ɵɵproperty"]("readonly", true)("options", ctx.simpleCitiesArray);
      }
    },
    directives: [ɵNgNoValidate, NgControlStatusGroup, FormGroupDirective, SelectComponent, NgControlStatus, FormControlName, RequiredValidator, NgModel, SelectItemComponent, fesm2015_common_js_.NgForOf],
    pipes: [fesm2015_common_js_.JsonPipe],
    styles: ["[_nghost-%COMP%] {\n  min-width: 30rem;\n  max-width: 60%;\n  margin: 2rem auto;\n  font-family: \"Montserrat\";\n}\n@media screen and (max-width: 720px) {\n  [_nghost-%COMP%] {\n    max-width: 80%;\n  }\n}\n.demo[_ngcontent-%COMP%] {\n  margin: 1rem;\n  display: flex;\n  flex-direction: column;\n  grid-gap: 1rem;\n  gap: 1rem;\n}\n.gutter-left[_ngcontent-%COMP%] {\n  margin-left: 9px;\n}\n.col-span-2[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\np[_ngcontent-%COMP%] {\n  text-align: center;\n}\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-left: 18px;\n  font-size: 24px;\n}\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 20px;\n  margin: 40px 0 10px 0;\n}\n.resources[_ngcontent-%COMP%] {\n  text-align: center;\n  list-style: none;\n  padding: 0.1rem;\n  display: grid;\n  grid-gap: 9px;\n  grid-template-columns: 1fr 1fr;\n}\n.resource[_ngcontent-%COMP%] {\n  color: #0094ba;\n  height: 36px;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  border-radius: 4px;\n  padding: 3px 9px;\n  text-decoration: none;\n  transition: all 0.2s ease;\n}\n.resource[_ngcontent-%COMP%]:hover:not([disabled]) {\n  background-color: #4489ff7d;\n}\npre[_ngcontent-%COMP%] {\n  padding: 9px;\n  border-radius: 4px;\n  background-color: #727272;\n  color: #eee;\n}\ndetails[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  color: #333;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  padding: 3px 9px;\n  margin-bottom: 9px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n  height: 36px;\n  line-height: 36px;\n}\nhr[_ngcontent-%COMP%] {\n  border: 1px dashed #bbb;\n  width: 100%;\n}\n.gutter-1[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n}\n[disabled][_ngcontent-%COMP%] {\n  color: #ccc;\n  background-color: #aacccc4b;\n}", ".open-btn[_ngcontent-%COMP%] {\n\t\t\tdisplay: grid;\n\t\t\tplace-content: center;\n\t\t\tmargin: 0.1rem 1rem;\n\t\t\tpadding: 1rem;\n\t\t\tborder-radius: 0.2rem;\n\t\t\tcolor: #ffffff;\n\t\t\tfont-size: 14px;\n\t\t\tborder-color: red;\n\t\t\tposition: relative;\n\t\t\tbackground: blue\n\t\t\t\turl(\"data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='white'/></g></svg>\")\n\t\t\t\tno-repeat;\n\t\t\tbackground-position: right 5px top 50%;\n\t\t}\n\t\t.up[_ngcontent-%COMP%] {\n\t\t\ttransform: rotate(180deg);\n\t\t}", ".selected-container[_ngcontent-%COMP%] {\n\t\t\tbackground-color: aqua;\n\t\t\tborder-radius: .1rem;\n\t\t\tmin-height: 2rem;\n\t\t\tpadding: 0.2rem 0.4rem;\n\t\t\tmargin: 0.1rem;\n\t\t\tdisplay: flex;\n\t\t\tjustify-content: space-around;\n\t\t\talign-items: center;\n\t\t}"]
  });
  return AppComponent;
})();
;// CONCATENATED MODULE: ./packages/select-sample/src/app/app.module.ts





let AppModule = /*#__PURE__*/(() => {
  class AppModule {}

  AppModule.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };

  AppModule.ɵmod = /*@__PURE__*/fesm2015_core_js_["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [AppComponent]
  });
  AppModule.ɵinj = /*@__PURE__*/fesm2015_core_js_["ɵɵdefineInjector"]({
    imports: [[BrowserModule, FormsModule, ReactiveFormsModule, SelectSimpleModule]]
  });
  return AppModule;
})();
;// CONCATENATED MODULE: ./packages/select-sample/src/environments/environment.ts
const environment = {
  production: true
};
;// CONCATENATED MODULE: ./packages/select-sample/src/bootstrap.ts





if (environment.production) {
  (0,fesm2015_core_js_.enableProdMode)();
}

platformBrowser().bootstrapModule(AppModule).catch(err => console.error(err));

/***/ })

}]);