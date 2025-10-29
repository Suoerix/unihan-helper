// @ts-check
import { readFileSync } from 'node:fs';
import mwGadget from 'rollup-plugin-mediawiki-gadget';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import packageJson from './package.json' with { type: 'json' };
import browserslistToEsbuild from '../../scripts/browserslist_to_esbuild.js';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ command }) => {
    return {
        esbuild: {
            banner: readFileSync('../../assets/intro.js').toString().trim(),
            footer: readFileSync('../../assets/outro.js').toString().trim(),
        },

        resolve:
            command === 'serve'
                ? {
                    alias: {
                        'ext.gadget.HanAssist': 'hanassist',
                        'ext.gadget.unihan-helper': `${import.meta.dirname}/src/index`,
                        'ext.gadget.unihan-helper-settings': `${import.meta.dirname}/../unihan-helper-settings/src/index`,
                    },
                }
                : undefined,

        css: {
            postcss: {
                plugins: [autoprefixer()],
            },
            preprocessorOptions: {
                less: {
                    strictUnits: true,
                },
            },
        },

        build: {
            outDir: '../../dist',
            emptyOutDir: false,
            lib: {
                entry: 'src/index.ts',
                formats: ['cjs'],
            },
            minify: false,
            target: ['es2017'],
            cssTarget: browserslistToEsbuild(),
            rollupOptions: {
                external: ['vue'],
                output: {
                    entryFileNames: `Gadget-${packageJson.name}.js`,
                    chunkFileNames: `Gadget-${packageJson.name}-[name].js`,
                    assetFileNames: `Gadget-${packageJson.name}.css`,
                    globals: {
                        'vue': 'Vue'
                    }
                },
            },
        },

        plugins: [
            vue(),
            {
                enforce: 'pre',
                ...mwGadget({
                    gadgetDef: '.gadgetdefinition',
                    softDependencies: ['ext.gadget.unihan-helper-settings'],
                }),
            },
        ],
    };
});
