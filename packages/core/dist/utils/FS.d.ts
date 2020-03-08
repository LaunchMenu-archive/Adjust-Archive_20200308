/// <reference types="node" />
import originalFS from "fs";
export declare const FS: {
    mkpathSync: (path: string) => void;
} & typeof originalFS;
