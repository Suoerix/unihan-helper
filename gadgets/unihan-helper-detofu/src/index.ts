import './styles.less';
import type { Detofu } from './types';

const TEST_FONT_STACK = 'sans-serif, AdobeBlank';

function createProbe(): HTMLElement {
    const span = document.createElement('span');
    span.style.fontFamily = TEST_FONT_STACK;
    span.style.position = 'absolute';
    span.style.visibility = 'hidden';
    span.style.whiteSpace = 'nowrap';
    span.style.fontSize = '100px'; // Large font to avoid sub-pixel issues
    document.body.appendChild(span);
    return span;
}

let probe: HTMLElement | null = null;

function isCharSupported(char: string): boolean {
    if (!probe) {
        probe = createProbe();
    }
    
    // Cleanup previous content
    probe.textContent = char;
    
    // Check width
    const width = probe.offsetWidth;
    
    return width > 0;
}

const detofu: Detofu = {
    isCharSupported,
};

// Expose to window
window.unihanHelperDetofu = detofu;

export default detofu;