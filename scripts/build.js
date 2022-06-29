import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { name, version } from '../package.json'

const mergeConfig = config => {
  return {
    format: 'umd',
    name: name.toUpperCase(),
    banner: `/* version: ${version} */`,
    globals: {
      vue: 'Vue'
    },
    ...config
  }
}

export default {
  input: 'src/index.ts',
  output: [
    mergeConfig({ file: `dist/${name}.js` }),
    mergeConfig({
      file: `dist/${name}.min.js`,
      plugins: [terser({
        output: {
          comments: (node, comment) => {
            return /version/.test(comment.value)
          }
        }
      })]
    })
  ],
  plugins: [typescript()],
  external: ['vue']
}
