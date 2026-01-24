/**
 * ⭐⭐⭐⭐ 难度：中高级
 * 📖 知识点：异步 atom, 缓存策略, loadable, 动态数据获取
 *
 * 场景：API 数据缓存管理
 * 展示如何用 Jotai 实现数据获取 + 缓存 + 加载状态
 *
 * 核心概念：
 * - 异步 atom：atom 的值可以是 Promise，配合 Suspense 使用
 * - loadable：将异步 atom 包装为 { state, data, error } 形式，无需 Suspense
 * - 手动缓存管理：控制何时使用缓存、何时刷新
 * - 派生异步 atom：当依赖的 atom 变化时自动重新获取
 */

import { atom } from 'jotai'
import { loadable } from 'jotai/utils'

// ---------- 类型定义 ----------

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface CacheEntry<T> {
  data: T
  timestamp: number
}

// ---------- 缓存配置 ----------

const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存过期

// ---------- 基础：异步 atom ----------

// 刷新触发器：修改这个值会触发数据重新获取
const postsRefreshAtom = atom(0)

// 帖子列表 atom（异步）
// 依赖 postsRefreshAtom，当其变化时自动重新获取
export const postsAtom = atom(async (get) => {
  get(postsRefreshAtom) // 订阅刷新触发器
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  const data: Post[] = await response.json()
  return data
})

// 使用 loadable 包装：不需要 Suspense，自己处理加载状态
// 返回值形如：{ state: 'loading' } | { state: 'hasData', data: Post[] } | { state: 'hasError', error: unknown }
export const postsLoadableAtom = loadable(postsAtom)

// 手动刷新帖子列表
export const refreshPostsAtom = atom(null, (_get, set) => {
  set(postsRefreshAtom, (c) => c + 1)
})

// ---------- 根据 ID 获取单个帖子 ----------

// 当前选中的帖子 ID
export const selectedPostIdAtom = atom<number | null>(null)

// 根据选中 ID 自动获取帖子详情
// 当 selectedPostIdAtom 变化时，自动重新发起请求
export const selectedPostAtom = atom(async (get) => {
  const id = get(selectedPostIdAtom)
  if (id === null) return null

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const data: Post = await response.json()
  return data
})

export const selectedPostLoadableAtom = loadable(selectedPostAtom)

// ---------- 带手动缓存的数据获取 ----------

// 帖子缓存（按用户ID存储）
const userPostsCacheAtom = atom<Map<number, CacheEntry<Post[]>>>(new Map())

// 当前选中的用户 ID
export const selectedUserIdAtom = atom<number | null>(null)

// 获取用户帖子（带缓存）
export const userPostsAtom = atom(async (get) => {
  const userId = get(selectedUserIdAtom)
  if (userId === null) return []

  const cache = get(userPostsCacheAtom)
  const cached = cache.get(userId)

  // 检查缓存是否有效
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  // 缓存过期或不存在，发起请求
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  )
  const data: Post[] = await response.json()
  return data
})

export const userPostsLoadableAtom = loadable(userPostsAtom)

// 将结果写入缓存的 action
export const cacheUserPostsAtom = atom(
  null,
  (get, set, { userId, data }: { userId: number; data: Post[] }) => {
    const cache = new Map(get(userPostsCacheAtom))
    cache.set(userId, { data, timestamp: Date.now() })
    set(userPostsCacheAtom, cache)
  }
)

// 清除缓存
export const clearCacheAtom = atom(null, (_get, set) => {
  set(userPostsCacheAtom, new Map())
})

// ---------- 搜索功能 ----------

export const searchQueryAtom = atom('')

// 根据搜索词过滤帖子（结合已加载的数据）
export const filteredPostsAtom = atom((get) => {
  const postsLoadable = get(postsLoadableAtom)
  const query = get(searchQueryAtom).toLowerCase()

  if (postsLoadable.state !== 'hasData') return []
  if (!query) return postsLoadable.data

  return postsLoadable.data.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
  )
})
