export interface Detofu {
    isCharSupported(char: string): boolean;
}

declare global {
    interface Window {
        unihanHelperDetofu: Detofu;
    }
}
