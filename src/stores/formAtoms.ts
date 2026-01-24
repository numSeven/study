/**
 * ⭐⭐ 难度：初级
 * 📖 知识点：atom 组合, 派生验证, focusAtom 思想
 *
 * 场景：注册表单管理
 * 展示如何用多个 atom 管理表单状态和验证逻辑
 *
 * 核心概念：
 * - 每个字段一个 atom，避免不必要的重渲染
 * - 验证逻辑用派生 atom 实现，自动响应变化
 * - 对比 useState 管理表单：Jotai 可以让验证逻辑和 UI 完全分离
 */

import { atom } from 'jotai'

// ---------- 字段 atoms ----------

export const usernameAtom = atom('')
export const emailAtom = atom('')
export const passwordAtom = atom('')
export const confirmPasswordAtom = atom('')

// 表单是否已提交过（用于控制是否显示错误信息）
export const isSubmittedAtom = atom(false)

// ---------- 验证规则（派生 atom）----------

export const usernameErrorAtom = atom((get) => {
  const username = get(usernameAtom)
  if (!username) return '用户名不能为空'
  if (username.length < 3) return '用户名至少3个字符'
  if (username.length > 20) return '用户名不能超过20个字符'
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return '只能包含字母、数字和下划线'
  return ''
})

export const emailErrorAtom = atom((get) => {
  const email = get(emailAtom)
  if (!email) return '邮箱不能为空'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return '邮箱格式不正确'
  return ''
})

export const passwordErrorAtom = atom((get) => {
  const password = get(passwordAtom)
  if (!password) return '密码不能为空'
  if (password.length < 6) return '密码至少6个字符'
  if (!/[A-Z]/.test(password)) return '密码需要包含大写字母'
  if (!/[0-9]/.test(password)) return '密码需要包含数字'
  return ''
})

export const confirmPasswordErrorAtom = atom((get) => {
  const password = get(passwordAtom)
  const confirm = get(confirmPasswordAtom)
  if (!confirm) return '请确认密码'
  if (password !== confirm) return '两次密码不一致'
  return ''
})

// ---------- 表单整体状态 ----------

// 所有错误汇总
export const allErrorsAtom = atom((get) => ({
  username: get(usernameErrorAtom),
  email: get(emailErrorAtom),
  password: get(passwordErrorAtom),
  confirmPassword: get(confirmPasswordErrorAtom),
}))

// 表单是否有效
export const isFormValidAtom = atom((get) => {
  const errors = get(allErrorsAtom)
  return Object.values(errors).every((e) => e === '')
})

// 表单数据汇总
export const formDataAtom = atom((get) => ({
  username: get(usernameAtom),
  email: get(emailAtom),
  password: get(passwordAtom),
}))

// ---------- Actions ----------

// 重置表单
export const resetFormAtom = atom(null, (_get, set) => {
  set(usernameAtom, '')
  set(emailAtom, '')
  set(passwordAtom, '')
  set(confirmPasswordAtom, '')
  set(isSubmittedAtom, false)
})

// 提交表单
export const submitFormAtom = atom(null, (get, set) => {
  set(isSubmittedAtom, true)
  const isValid = get(isFormValidAtom)
  if (isValid) {
    const data = get(formDataAtom)
    console.log('表单提交成功：', data)
    return { success: true, data }
  }
  return { success: false, data: null }
})
