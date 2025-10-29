/**
 * MediaWiki 环境的全局类型声明
 */

declare global {
    /**
     * MediaWiki ResourceLoader 的 require 函数
     */
    function require(module: string): any;
}

export { };