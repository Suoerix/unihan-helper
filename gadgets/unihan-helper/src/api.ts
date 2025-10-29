/**
 * API 调用
 */

import { API_BASE } from './consts';
import type { FontInfo } from './types';

/**
 * 获取可用字体列表
 */
export async function fetchFontList(): Promise<FontInfo[]> {
    try {
        const response = await fetch(`${API_BASE}/api/v1/list`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch font list:', error);
        return [];
    }
}

/**
 * 构建字体 URL
 */
export function buildFontUrl(fontId: string, codePoint: number): string {
    return `${API_BASE}/static/${fontId}/${codePoint}.woff2`;
}

/**
 * 构建字体 API URL
 */
export function buildFontApiUrl(fontId: string, codePoint: number): string {
    return `${API_BASE}/api/v1/font?id=${fontId}&char=${codePoint}`;
}
