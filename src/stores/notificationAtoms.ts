/**
 * ⭐⭐⭐⭐ 难度：中高级
 * 📖 知识点：atomWithReducer 模式, 副作用管理, 自动过期
 *
 * 场景：全局通知/消息提示系统
 * 展示如何实现一个完整的通知队列管理
 *
 * 核心概念：
 * - 用 atom + action 模拟 reducer 模式
 * - 自增 ID 管理
 * - 通知的生命周期管理（创建 → 展示 → 自动消失）
 * - 多个 action atom 协作
 */

import { atom } from 'jotai'

// ---------- 类型定义 ----------

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: number
  type: NotificationType
  title: string
  message?: string
  duration: number // 毫秒，0 表示不自动消失
  createdAt: number
}

export interface AddNotificationParams {
  type: NotificationType
  title: string
  message?: string
  duration?: number // 默认 3000ms
}

// ---------- 内部状态 ----------

// 自增 ID 计数器
const nextIdAtom = atom(1)

// 通知列表
export const notificationsAtom = atom<Notification[]>([])

// ---------- 派生状态 ----------

// 未读通知数
export const unreadCountAtom = atom((get) => get(notificationsAtom).length)

// 是否有通知
export const hasNotificationsAtom = atom((get) => get(notificationsAtom).length > 0)

// 按类型分组的通知
export const notificationsByTypeAtom = atom((get) => {
  const notifications = get(notificationsAtom)
  return {
    success: notifications.filter((n) => n.type === 'success'),
    error: notifications.filter((n) => n.type === 'error'),
    warning: notifications.filter((n) => n.type === 'warning'),
    info: notifications.filter((n) => n.type === 'info'),
  }
})

// ---------- Action atoms ----------

// 添加通知
export const addNotificationAtom = atom(
  null,
  (get, set, params: AddNotificationParams) => {
    const id = get(nextIdAtom)
    set(nextIdAtom, id + 1)

    const notification: Notification = {
      id,
      type: params.type,
      title: params.title,
      message: params.message,
      duration: params.duration ?? 3000,
      createdAt: Date.now(),
    }

    set(notificationsAtom, (prev) => [...prev, notification])

    // 如果设置了 duration，自动移除
    if (notification.duration > 0) {
      setTimeout(() => {
        set(removeNotificationAtom, id)
      }, notification.duration)
    }

    return id
  }
)

// 移除单个通知
export const removeNotificationAtom = atom(null, (_get, set, id: number) => {
  set(notificationsAtom, (prev) => prev.filter((n) => n.id !== id))
})

// 清空所有通知
export const clearAllNotificationsAtom = atom(null, (_get, set) => {
  set(notificationsAtom, [])
})

// ---------- 便捷方法 atoms ----------

// 快捷：成功通知
export const notifySuccessAtom = atom(
  null,
  (_get, set, title: string, message?: string) => {
    set(addNotificationAtom, { type: 'success', title, message })
  }
)

// 快捷：错误通知
export const notifyErrorAtom = atom(
  null,
  (_get, set, title: string, message?: string) => {
    set(addNotificationAtom, { type: 'error', title, message, duration: 5000 })
  }
)

// 快捷：警告通知
export const notifyWarningAtom = atom(
  null,
  (_get, set, title: string, message?: string) => {
    set(addNotificationAtom, { type: 'warning', title, message })
  }
)

// 快捷：信息通知
export const notifyInfoAtom = atom(
  null,
  (_get, set, title: string, message?: string) => {
    set(addNotificationAtom, { type: 'info', title, message })
  }
)
