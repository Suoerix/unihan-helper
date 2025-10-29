/// <reference types="types-mediawiki" />
/// <reference types="vite/client" />

declare module 'ext.gadget.HanAssist' {
    export function conv(text: string): string;
    export function batchConv(obj: Record<string, { hans: string; hant: string }>): Record<string, string>;
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '*.json' {
    const value: any;
    export default value;
}
