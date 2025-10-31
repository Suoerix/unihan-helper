/**
 * 常量定义
 */

export const API_BASE = 'https://webfont-zh.toolforge.org';

export const IS_TOUCHSCREEN = 'ontouchstart' in document.documentElement;

export const IS_MOBILE = /Mobi|Android/i.test(navigator.userAgent) ||
    typeof window.orientation !== 'undefined';

// 存储键
export const STORAGE_KEY = 'unihan-settings';

// 默认设置
export const DEFAULT_FONT = 'Plangothic';
export const DEFAULT_SETTINGS = {
    enabled: true,
    useWebfont: false,
    loadMode: 'always' as 'fallback' | 'always',
    selectedFont: DEFAULT_FONT,
};

export const CLASSES = {
    FADE_IN_DOWN: 'unihan-fade-in-down',
    FADE_IN_UP: 'unihan-fade-in-up',
    FADE_OUT_DOWN: 'unihan-fade-out-down',
    FADE_OUT_UP: 'unihan-fade-out-up',
    VISIBLE: 'unihan-visible',
    TOOLTIP: 'unihan-tooltip',
    TOOLTIP_ABOVE: 'unihan-tooltip-above',
    TOOLTIP_BELOW: 'unihan-tooltip-below',
    TOOLTIP_CONTENT: 'unihan-tooltip-content',
    TOOLTIP_TAIL: 'unihan-tooltip-tail',
    SETTINGS_BTN: 'unihan-settings-btn-container',
    OVERLAY: 'unihan-overlay',
    INLINE_UNIHAN: 'inline-unihan',
} as const;

export const TIMINGS = {
    HOVER_DELAY: IS_TOUCHSCREEN ? 0 : 200,
    HIDE_DELAY: 200,
    ANIMATION_DURATION: 200,
} as const;
