/// <reference path="React.d.ts" />
/// <reference types="react" />
import { InterpolationWithTheme } from "@emotion/core";
import { ITheme } from "./modules/theming/_types/ITheme";
export declare const React: {
    createElement: typeof import("react").createElement;
    createFactory<T extends HTMLElement>(type: "object" | "small" | "s" | "data" | "details" | "section" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "datalist" | "dd" | "del" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "keygen" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "menuitem" | "meta" | "meter" | "nav" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "samp" | "script" | "select" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "template" | "tbody" | "td" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr" | "webview"): import("react").HTMLFactory<T>;
    createFactory(type: "symbol" | "stop" | "path" | "text" | "svg" | "animate" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "switch" | "textPath" | "tspan" | "use" | "view"): import("react").SVGFactory;
    createFactory<P extends import("react").DOMAttributes<T>, T extends Element>(type: string): import("react").DOMFactory<P, T>;
    createFactory<P>(type: import("react").FunctionComponent<P>): import("react").FunctionComponentFactory<P>;
    createFactory<P>(type: import("react").ClassType<P, import("react").ClassicComponent<P, any>, import("react").ClassicComponentClass<P>>): import("react").ComponentFactory<P, import("react").ClassicComponent<P, any>>;
    createFactory<P, T extends import("react").Component<P, any, any>, C extends import("react").ComponentClass<P, any>>(type: import("react").ClassType<P, T, C>): import("react").ComponentFactory<P, T>;
    createFactory<P>(type: import("react").ComponentClass<P, any>): import("react").Factory<P>;
    cloneElement<P extends import("react").HTMLAttributes<T>, T extends HTMLElement>(element: import("react").DetailedReactHTMLElement<P, T>, props?: P, ...children: import("react").ReactNode[]): import("react").DetailedReactHTMLElement<P, T>;
    cloneElement<P extends import("react").HTMLAttributes<T>, T extends HTMLElement>(element: import("react").ReactHTMLElement<T>, props?: P, ...children: import("react").ReactNode[]): import("react").ReactHTMLElement<T>;
    cloneElement<P extends import("react").SVGAttributes<T>, T extends SVGElement>(element: import("react").ReactSVGElement, props?: P, ...children: import("react").ReactNode[]): import("react").ReactSVGElement;
    cloneElement<P extends import("react").DOMAttributes<T>, T extends Element>(element: import("react").DOMElement<P, T>, props?: import("react").DOMAttributes<T> & P, ...children: import("react").ReactNode[]): import("react").DOMElement<P, T>;
    cloneElement<P>(element: import("react").FunctionComponentElement<P>, props?: Partial<P> & import("react").Attributes, ...children: import("react").ReactNode[]): import("react").FunctionComponentElement<P>;
    cloneElement<P, T extends import("react").Component<P, any, any>>(element: import("react").ComponentElement<P, T>, props?: Partial<P> & import("react").ClassAttributes<T>, ...children: import("react").ReactNode[]): import("react").ComponentElement<P, T>;
    cloneElement<P>(element: import("react").ReactElement<P, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>, props?: Partial<P> & import("react").Attributes, ...children: import("react").ReactNode[]): import("react").ReactElement<P, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>;
    createContext<T>(defaultValue: T, calculateChangedBits?: (prev: T, next: T) => number): import("react").Context<T>;
    isValidElement<P>(object: {}): object is import("react").ReactElement<P, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>;
    createRef<T>(): import("react").RefObject<T>;
    forwardRef<T, P = {}>(Component: import("react").RefForwardingComponent<T, P>): import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<P> & import("react").RefAttributes<T>>;
    memo<P extends object>(Component: import("react").FunctionComponent<P>, propsAreEqual?: (prevProps: Readonly<import("react").PropsWithChildren<P>>, nextProps: Readonly<import("react").PropsWithChildren<P>>) => boolean): import("react").NamedExoticComponent<P>;
    memo<T extends import("react").ComponentType<any>>(Component: T, propsAreEqual?: (prevProps: Readonly<import("react").ComponentProps<T>>, nextProps: Readonly<import("react").ComponentProps<T>>) => boolean): import("react").MemoExoticComponent<T>;
    lazy<T extends import("react").ComponentType<any>>(factory: () => Promise<{
        default: T;
    }>): import("react").LazyExoticComponent<T>;
    useContext<T>(context: import("react").Context<T>): T;
    useState<S>(initialState: S | (() => S)): [S, import("react").Dispatch<import("react").SetStateAction<S>>];
    useState<S = undefined>(): [S, import("react").Dispatch<import("react").SetStateAction<S>>];
    useReducer<R extends import("react").Reducer<any, any>, I>(reducer: R, initializerArg: I & import("react").ReducerState<R>, initializer: (arg: I & import("react").ReducerState<R>) => import("react").ReducerState<R>): [import("react").ReducerState<R>, import("react").Dispatch<import("react").ReducerAction<R>>];
    useReducer<R extends import("react").Reducer<any, any>, I>(reducer: R, initializerArg: I, initializer: (arg: I) => import("react").ReducerState<R>): [import("react").ReducerState<R>, import("react").Dispatch<import("react").ReducerAction<R>>];
    useReducer<R extends import("react").Reducer<any, any>>(reducer: R, initialState: import("react").ReducerState<R>, initializer?: undefined): [import("react").ReducerState<R>, import("react").Dispatch<import("react").ReducerAction<R>>];
    useRef<T>(initialValue: T): import("react").MutableRefObject<T>;
    useRef<T>(initialValue: T): import("react").RefObject<T>;
    useRef<T = undefined>(): import("react").MutableRefObject<T>;
    useLayoutEffect(effect: import("react").EffectCallback, deps?: readonly any[]): void;
    useEffect(effect: import("react").EffectCallback, deps?: readonly any[]): void;
    useImperativeHandle<T, R extends T>(ref: import("react").Ref<T>, init: () => R, deps?: readonly any[]): void;
    useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
    useMemo<T>(factory: () => T, deps: readonly any[]): T;
    useDebugValue<T>(value: T, format?: (value: T) => any): void;
    Children: import("react").ReactChildren;
    Fragment: import("react").ExoticComponent<{
        children?: import("react").ReactNode;
    }>;
    StrictMode: import("react").ExoticComponent<{
        children?: import("react").ReactNode;
    }>;
    Suspense: import("react").ExoticComponent<import("react").SuspenseProps>;
    version: string;
    unstable_Profiler: import("react").ExoticComponent<import("react").ProfilerProps>;
    Component: typeof import("react").Component;
    PureComponent: typeof import("react").PureComponent;
};
declare module "react" {
    interface DOMAttributes<T> {
        css?: InterpolationWithTheme<ITheme>;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicAttributes {
            css?: InterpolationWithTheme<ITheme>;
        }
    }
}
