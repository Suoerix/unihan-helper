/**
 * Webfont 管理
 */

import { getCodePoint, getHexCodePoint } from './utils';
import { buildFontApiUrl } from './api';
import { CLASSES } from './consts';

/**
 * 已应用的字符集合（避免重复应用）
 */
const appliedChars = new Set<string>();

/**
 * 样式元素引用
 */
let styleElement: HTMLStyleElement | null = null;

/**
 * 获取或创建样式元素
 */
function getStyleElement(): HTMLStyleElement {
    if (!styleElement) {
        styleElement = document.getElementById('unihan-webfont-styles') as HTMLStyleElement;
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'unihan-webfont-styles';
            document.head.appendChild(styleElement);
        }
    }
    return styleElement;
}

/**
 * 为字符应用 webfont
 */
export function applyWebFont(char: string, fontId: string, loadMode: 'fallback' | 'always' = 'always'): void {
    const codePoint = getCodePoint(char);
    const hexCodePoint = getHexCodePoint(char);
    const key = `${fontId}-${codePoint}`;

    if (appliedChars.has(key)) {
        return;
    }
    appliedChars.add(key);

    const fontFamily = `${fontId}-${codePoint}`;
    const css = `
@font-face {
  font-family: "${fontFamily}";
  src: url("${buildFontApiUrl(fontId, codePoint)}") format("woff2");
  unicode-range: U+${hexCodePoint};
}`;

    const styleEl = getStyleElement();
    styleEl.textContent += css + '\n';

    // 应用字体到所有包含该字符的元素
    document.querySelectorAll(`.${CLASSES.INLINE_UNIHAN}`).forEach((el) => {
        const element = el as HTMLElement;
        const text = element.textContent || '';
        if (text.includes(char)) {
            const currentFamily = element.style.fontFamily || 'serif';
            // 根据加载模式决定字体顺序
            if (loadMode === 'fallback') {
                // 优先使用系统字体：将 webfont 插入到最后
                element.style.fontFamily = `${currentFamily}, "${fontFamily}"`;
            } else {
                // 总是覆盖系统字体：将 webfont 插入到最前面
                element.style.fontFamily = `"${fontFamily}", ${currentFamily}`;
            }
        }
    });
}

/**
 * 处理页面中所有生僻字
 */
export function processUnihanChars(fontId: string, loadMode: 'fallback' | 'always' = 'always'): void {
    document.querySelectorAll(`.${CLASSES.INLINE_UNIHAN}`).forEach((el) => {
        const text = (el.textContent || '').trim();
        for (const char of text) {
            applyWebFont(char, fontId, loadMode);
        }
    });
}

/**
 * 清除所有已应用的字体
 */
export function clearAppliedFonts(): void {
    appliedChars.clear();
    const styleEl = getStyleElement();
    styleEl.textContent = '';
}
