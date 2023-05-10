import {
  useRoute,
  useRouter
} from "./chunk-YBRKULFI.js";
import {
  computed,
  init_vue_runtime_esm_bundler,
  nextTick,
  unref
} from "./chunk-4NRH2SV6.js";
import "./chunk-OL3AADLO.js";

// node_modules/.pnpm/vue-demi@0.14.0_vue@3.2.47/node_modules/vue-demi/lib/index.mjs
init_vue_runtime_esm_bundler();
init_vue_runtime_esm_bundler();

// node_modules/.pnpm/@vueuse+shared@10.1.2_vue@3.2.47/node_modules/@vueuse/shared/index.mjs
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
var isClient = typeof window !== "undefined";
var isIOS = getIsIOS();
function getIsIOS() {
  var _a;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
}

// node_modules/.pnpm/@vueuse+router@10.1.2_lavcef455lp3wtm2mcdrwhgymm/node_modules/@vueuse/router/index.mjs
var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
function useRouteHash(defaultValue, {
  mode = "replace",
  route = useRoute(),
  router = useRouter()
} = {}) {
  return computed({
    get() {
      var _a;
      return (_a = route.hash) != null ? _a : defaultValue;
    },
    set(v) {
      nextTick(() => {
        router[toValue(mode)](__spreadProps$2(__spreadValues$2({}, route), { hash: v }));
      });
    }
  });
}
var __defProp$1 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
function useRouteParams(name, defaultValue, options = {}) {
  const {
    mode = "replace",
    route = useRoute(),
    router = useRouter(),
    transform = (value) => value
  } = options;
  return computed({
    get() {
      var _a;
      const data = (_a = route.params[name]) != null ? _a : defaultValue;
      return transform(data);
    },
    set(v) {
      nextTick(() => {
        router[toValue(mode)](__spreadProps$1(__spreadValues$1({}, route), { params: __spreadProps$1(__spreadValues$1({}, route.params), { [name]: v }) }));
      });
    }
  });
}
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var _queue = {};
function useRouteQuery(name, defaultValue, options = {}) {
  const {
    mode = "replace",
    route = useRoute(),
    router = useRouter(),
    transform = (value) => value
  } = options;
  return computed({
    get() {
      var _a;
      const data = (_a = route.query[name]) != null ? _a : defaultValue;
      return transform(data);
    },
    set(v) {
      _queue[name] = v === defaultValue || v === null ? void 0 : v;
      nextTick(() => {
        router[toValue(mode)](__spreadProps(__spreadValues({}, route), { query: __spreadValues(__spreadValues({}, route.query), _queue) }));
        nextTick(() => _queue = {});
      });
    }
  });
}
export {
  useRouteHash,
  useRouteParams,
  useRouteQuery
};
//# sourceMappingURL=@vueuse_router.js.map
