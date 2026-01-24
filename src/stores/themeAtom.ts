/**
 * ⭐ 难度：入门
 * 📖 知识点：atom, useAtom, atomWithStorage
 *
 * 场景：主题切换（深色/浅色模式）
 * 这是 Jotai 最基础的用法 —— 一个简单的状态原子
 *
 * 核心概念：
 * - atom() 创建一个最小的状态单元
 * - useAtom() 类似 useState，返回 [value, setValue]
 * - atom 是全局的，任何组件都可以读写，无需 Provider
 */

import { atom } from 'jotai'

// ---------- 基础用法 ----------

// 最简单的 atom：存一个布尔值
// 等价于一个全局的 useState(false)
export type Theme = 'light' | 'dark'

export const themeAtom = atom<Theme>('light')

// ---------- 派生 atom（只读）----------

// 根据当前主题，派生出 CSS 类名
// 这是一个"计算属性"，当 themeAtom 变化时自动更新
export const themeClassAtom = atom((get) => {
  const theme = get(themeAtom)
  return theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
})

// 派生出是否为深色模式的布尔值
export const isDarkAtom = atom((get) => get(themeAtom) === 'dark')

// ---------- 写入 atom（只写）----------

// 切换主题的 action atom
// 第一个参数 null 表示不可读，第二个是写入函数
export const toggleThemeAtom = atom(null, (get, set) => {
  const current = get(themeAtom)
  set(themeAtom, current === 'light' ? 'dark' : 'light')
})
