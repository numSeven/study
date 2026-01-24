/**
 * ⭐⭐⭐ 示例5：用户认证
 * 展示异步 atom 和持久化
 */
import { useAtomValue, useSetAtom } from 'jotai'
import {
  authStateAtom,
  isLoggedInAtom,
  currentUsernameAtom,
  loginAtom,
  logoutAtom,
  restoreSessionAtom,
} from '@/stores/authAtoms'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AuthPage() {
  const authState = useAtomValue(authStateAtom)
  const isLoggedIn = useAtomValue(isLoggedInAtom)
  const username = useAtomValue(currentUsernameAtom)

  const login = useSetAtom(loginAtom)
  const logout = useSetAtom(logoutAtom)
  const restoreSession = useSetAtom(restoreSessionAtom)

  const [formUsername, setFormUsername] = useState('demo_user')
  const [formPassword, setFormPassword] = useState('password123')

  // 页面加载时尝试恢复会话
  useEffect(() => {
    restoreSession()
  }, [restoreSession])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ username: formUsername, password: formPassword })
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← 返回首页</Link>
      <h1 className="text-3xl font-bold mb-6">⭐⭐⭐ 用户认证示例</h1>

      <div className="max-w-md space-y-6">
        {/* 当前状态 */}
        <div className="p-4 bg-white rounded-lg border space-y-2">
          <h3 className="font-semibold">认证状态</h3>
          <p>登录状态：
            <span className={isLoggedIn ? 'text-green-600' : 'text-red-600'}>
              {isLoggedIn ? '已登录' : '未登录'}
            </span>
          </p>
          <p>用户名：{username}</p>
          {authState.isLoading && <p className="text-blue-600">加载中...</p>}
          {authState.error && <p className="text-red-500">错误：{authState.error}</p>}
        </div>

        {isLoggedIn ? (
          /* 已登录：显示用户信息 */
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800">用户信息</h3>
              <pre className="mt-2 text-sm text-green-700">
                {JSON.stringify(authState.user, null, 2)}
              </pre>
            </div>
            <button
              onClick={() => logout()}
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              退出登录
            </button>
          </div>
        ) : (
          /* 未登录：显示登录表单 */
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <input
                value={formUsername}
                onChange={(e) => setFormUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <input
                type="password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <p className="text-xs text-gray-400 mt-1">密码至少4位才能登录成功（模拟验证）</p>
            </div>
            <button
              type="submit"
              disabled={authState.isLoading}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {authState.isLoading ? '登录中...' : '登录'}
            </button>
          </form>
        )}

        <div className="text-sm opacity-70 space-y-1 border-t pt-4">
          <p>💡 loginAtom 是异步 action atom（async 写入函数）</p>
          <p>💡 tokenWithStorageAtom 实现了手动的 localStorage 同步</p>
          <p>💡 restoreSessionAtom 在页面加载时通过 token 恢复登录态</p>
          <p>💡 authStateAtom 包含 loading/error 状态，完整管理异步生命周期</p>
        </div>
      </div>
    </div>
  )
}
