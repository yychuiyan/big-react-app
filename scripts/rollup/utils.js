/**
 * 路径的通用方法工具类
 */
import path from 'path'
import fs from 'fs'
// 将源码中ts代码转换为js的plugin
import ts from 'rollup-plugin-typescript2'
// 用于解析commonjs规范的plugin
import cjs from '@rollup/plugin-commonjs'

// 所有包的路径
const pkgPath = path.resolve(__dirname, '../../packages')
// 指定打包产物的路径
const distPath = path.resolve(__dirname, '../../dist/node_modules')

// 解析包的路径 pkgName源码路径，isDist打包后的路径
export function resolvePkgPath(pkgName, isDist) {
  // 是否为产物路径
  if (isDist) {
    return `${distPath}/${pkgName}`
  }
  return `${pkgPath}/${pkgName}`
}
// 解析package.json实现
export function getPackageJSON(pkgName) {
  // ...包路径
  const path = `${resolvePkgPath(pkgName)}/package.json`
  // 文件的读写
  const str = fs.readFileSync(path, { encoding: 'utf-8' })
  return JSON.parse(str)
}

// 获取所有公用的plugins
export function getBaseRollupPlugins({
  typescript = {}
} = {}) {
  // 返回plugin数组
  return [cjs(), ts(typescript)]
}
