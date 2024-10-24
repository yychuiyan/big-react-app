import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from "./utils"
import generatePackageJson from 'rollup-plugin-generate-package-json'
// 解析react包下的name和module
const { name, module } = getPackageJSON('react')
// react包的路径
const pkgPath = resolvePkgPath(name)
// react产物路径
const pkgDistPath = resolvePkgPath(name, true)

// react 包的打包配置
export default [
  // react的包
  {
    input: `${pkgPath}/${module}`, // 输入
    output: // 输出
    {
      file: `${pkgDistPath}/index.js`,
      name: 'react',
      format: "umd" // 兼容commonjs和es module格式
    },
    plugins: [...getBaseRollupPlugins(), generatePackageJson({ // 插件，generatePackageJson输出package.json
      inputFolder: pkgPath,
      outputFolder: pkgDistPath,
      baseContents: ({ name, description, version }) => ({
        name,
        description,
        version,
        main: 'index.js'
      })
    })]
  },
  // jsx-runtime
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      // jsx-runtime
      {
        file: `${pkgDistPath}/jsx-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd'
      },
      // jsx-dev-runtime
      {
        file: `${pkgDistPath}/jsx-dev-runtime.js`,
        name: 'jsx-dev-runtime.js',
        format: 'umd'
      }
    ],
    plugins: getBaseRollupPlugins()
  }
]
