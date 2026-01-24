/**
 * ⭐⭐⭐ 难度：中级
 * 📖 知识点：异步 atom, localStorage 持久化, 副作用
 *
 * 场景：用户认证状态管理
 * 展示如何处理异步操作和持久化
 *
 * 核心概念：
 * - atom 可以存储异步计算的结果
 * - 通过 onMount 实现 atom 初始化时的副作用
 * - 手动实现 localStorage 持久化（不依赖额外库）
 * - 写入 atom 可以是异步函数
 */

import { atom } from 'jotai'

// ---------- 类型定义 ----------

export interface User {
  id: string
  username: string
  email: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

// ---------- 基础状态 ----------

// 认证状态
export const authStateAtom = atom<AuthState>({
  user: null,
  isLoading: false,
  error: null,
})

// token 持久化到 localStorage
const TOKEN_KEY = 'auth_token'

export const tokenAtom = atom<string | null>(
  // 读取时从 localStorage 获取
  localStorage.getItem(TOKEN_KEY)
)

// 监听 token 变化，同步到 localStorage
export const tokenWithStorageAtom = atom(
  (get) => get(tokenAtom),
  (_get, set, newToken: string | null) => {
    set(tokenAtom, newToken)
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  }
)

// ---------- 派生状态 ----------

// 是否已登录
export const isLoggedInAtom = atom((get) => {
  const { user } = get(authStateAtom)
  return user !== null
})

// 当前用户名
export const currentUsernameAtom = atom((get) => {
  const { user } = get(authStateAtom)
  return user?.username ?? '未登录'
})

// ---------- 异步 Action atoms ----------

// 模拟 API 请求
const fakeApiDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 登录
export const loginAtom = atom(
  null,
  async (_get, set, credentials: { username: string; password: string }) => {
    // 设置 loading 状态
    set(authStateAtom, { user: null, isLoading: true, error: null })

    try {
      // 模拟 API 调用
      await fakeApiDelay(1000)

      // 模拟验证
      if (credentials.password.length < 4) {
        throw new Error('密码错误')
      }

      // 模拟成功响应
      const user: User = {
        id: '1',
        username: credentials.username,
        email: `${credentials.username}@example.com`,
      }
      const fakeToken = `token_${Date.now()}`

      set(authStateAtom, { user, isLoading: false, error: null })
      set(tokenWithStorageAtom, fakeToken)

      return { success: true }
    } catch (error) {
      const message = error instanceof Error ? error.message : '登录失败'
      set(authStateAtom, { user: null, isLoading: false, error: message })
      return { success: false, error: message }
    }
  }
)

// 登出
export const logoutAtom = atom(null, (_get, set) => {
  set(authStateAtom, { user: null, isLoading: false, error: null })
  set(tokenWithStorageAtom, null)
})

// 使用 token 恢复登录态
export const restoreSessionAtom = atom(null, async (get, set) => {
  const token = get(tokenAtom)
  if (!token) return

  set(authStateAtom, { user: null, isLoading: true, error: null })

  try {
    await fakeApiDelay(500)
    // 模拟用 token 获取用户信息
    const user: User = {
      id: '1',
      username: 'restored_user',
      email: 'restored@example.com',
    }
    set(authStateAtom, { user, isLoading: false, error: null })
  } catch {
    set(tokenWithStorageAtom, null)
    set(authStateAtom, { user: null, isLoading: false, error: '会话已过期' })
  }
})
