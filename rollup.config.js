import typescript from '@rollup/plugin-typescript'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
	input: './src/indexBrowser.ts',
  output: {
   file: './dist/lunchpad.min.js'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      module: 'esnext'
    })
  ],
  
};
export default config;