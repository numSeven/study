/**
 * ⭐ 难度：入门
 * 📖 知识点：atom, 派生 atom, 写入 atom
 *
 * 场景：计数器（带步进值控制）
 * 展示如何组合多个 atom 实现更复杂的逻辑
 *
 * 核心概念：
 * - 多个 atom 可以互相组合
 * - 派生 atom 会自动追踪依赖并更新
 * - 写入 atom 可以封装复杂的更新逻辑
 */

import { atom } from 'jotai'

// ---------- 基础状态 ----------

// 计数值
export const countAtom = atom(0)

// 步进值（每次增减多少）
export const stepAtom = atom(1)

// ---------- 派生 atom ----------

// 计算属性：当前计数的描述文本
export const countLabelAtom = atom((get) => {
  const count = get(countAtom)
  if (count === 0) return '零'
  return count > 0 ? `正数：${count}` : `负数：${count}`
})

// 计算属性：是否为偶数
export const isEvenAtom = atom((get) => get(countAtom) % 2 === 0)

// ---------- Action atoms ----------

// 增加：读取 step 的值来决定增加多少
export const incrementAtom = atom(null, (get, set) => {
  const step = get(stepAtom)
  set(countAtom, (prev) => prev + step)
})

// 减少
export const decrementAtom = atom(null, (get, set) => {
  const step = get(stepAtom)
  set(countAtom, (prev) => prev - step)
})

// 重置所有状态
export const resetAtom = atom(null, (_get, set) => {
  set(countAtom, 0)
  set(stepAtom, 1)
})
