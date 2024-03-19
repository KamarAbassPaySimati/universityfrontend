import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            include: '**/*.jsx'
        }),
        istanbul({
            forceBuildInstrument: true,
            include: 'src/*',
            exclude: ['node_modules', 'test/'],
            extension: ['.js', '.ts', '.dist', '.jsx'],
            requireEnv: true
        })
    ],
    build: {
        sourcemap: true
    },
    define: {
        global: 'window'
    },
    resolve: {
        alias: {
            './runtimeConfig': './runtimeConfig.browser'
        }
    },
    server: {
        port: 3000,
        hmr: { overlay: true }
    }
});
