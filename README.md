# Unihan Helper

中文维基百科僻字模板Webfont显示和提示小工具。

## 特性

- 为生僻字提供基于[webfont-zh](https://webfont-zh.toolforge.org/)的网络字体支持
- 与其他MediaWiki工具统一的Codex弹窗外观
- 自定义设置与多种字体选择
- 动态豆腐块算法（WIP）

## 开发

### 安装依赖

```bash
pnpm install
```

### 构建产物

```bash
pnpm run build
```

### 代码检查

```bash
pnpm run lint
pnpm run lint:fix
```

## 部署方法
因为构建目标为ES2017，小工具兼容的最低MediaWiki版本为[1.45.0-wmf.6](https://www.mediawiki.org/wiki/Project:Tech_News#Tech_News:_2025-23)。仓库中含有两个包，unihan-helper包含了小工具除设置窗口外的所有代码；unihan-helper-settings提供的设置窗口在需要时动态加载。

在MediaWiki:Gadgets-definition中加入：
```
* unihan-helper[ResourceLoader|package|dependencies=ext.gadget.HanAssist]|unihan-helper.js|unihan-helper.css
* unihan-helper-settings[ResourceLoader|package|hidden|dependencies=ext.gadget.HanAssist,ext.gadget.unihan-helper,vue,@wikimedia/codex]|unihan-helper-settings.js
```
复制 `dist` 目录下的构建产物。

## 鸣谢
- 感谢[diskdance](https://github.com/diskdance)阁下创作的卓越的[跨语言链接增强小工具](https://github.com/wikimedia-gadgets/ilhpp)，为本项目的架构、实现提供了启发，也使本人受益良多。

## 授权协议
GNU GPL-3.0
