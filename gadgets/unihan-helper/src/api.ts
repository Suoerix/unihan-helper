/**
 * API 调用
 */

import { API_BASE } from './consts';
import type { FontInfo } from './types';

/**
 * 字体版本缓存
 */
const fontVersions: Record<string, string> = {
    'Plangothic': '2.9.5787'
};

/**
 * 获取可用字体列表
 */
export async function fetchFontList(): Promise<FontInfo[]> {
    try {
        const response = await fetch(`${API_BASE}/api/v1/list`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const list: FontInfo[] = await response.json();

        // 缓存版本号
        list.forEach(font => {
            fontVersions[font.id] = font.version;
        });

        return list;
    } catch (error) {
        console.error('Failed to fetch font list:', error);
        return [];
    }
}

/**
 * 构建字体 API URL
 */
export function buildFontApiUrl(fontId: string, codePoint: number, version?: string): string {
    const v = version || fontVersions[fontId];
    let url = `${API_BASE}/api/v1/font?id=${fontId}&char=${codePoint}`;
    if (v) {
        url += `&v=${v}`;
    }
    return url;
}
