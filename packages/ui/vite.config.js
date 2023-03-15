import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	server: {
		open: false
	},
	plugins: [svgr({ exportAsDefault: true }), react()],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'ui',
			fileName: (format) => `ui.${format}.js`
		},
	}
})