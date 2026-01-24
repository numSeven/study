/**
 * ⭐⭐⭐⭐ 示例6：全局通知系统
 * 展示 reducer 模式和自动生命周期管理
 */
import { useAtomValue, useSetAtom } from 'jotai'
import {
  notificationsAtom,
  unreadCountAtom,
  addNotificationAtom,
  removeNotificationAtom,
  clearAllNotificationsAtom,
  notifySuccessAtom,
  notifyErrorAtom,
  notifyWarningAtom,
  notifyInfoAtom,
  type NotificationType,
} from '@/stores/notificationAtoms'
import { Link } from 'react-router-dom'

const typeStyles: Record<NotificationType, string> = {
  success: 'bg-green-100 border-green-400 text-green-800',
  error: 'bg-red-100 border-red-400 text-red-800',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  info: 'bg-blue-100 border-blue-400 text-blue-800',
}

const typeIcons: Record<NotificationType, string> = {
  success: '✓',
  error: '✗',
  warning: '⚠',
  info: 'ℹ',
}

export default function NotificationsPage() {
  const notifications = useAtomValue(notificationsAtom)
  const unreadCount = useAtomValue(unreadCountAtom)

  const addNotification = useSetAtom(addNotificationAtom)
  const removeNotification = useSetAtom(removeNotificationAtom)
  const clearAll = useSetAtom(clearAllNotificationsAtom)

  const notifySuccess = useSetAtom(notifySuccessAtom)
  const notifyError = useSetAtom(notifyErrorAtom)
  const notifyWarning = useSetAtom(notifyWarningAtom)
  const notifyInfo = useSetAtom(notifyInfoAtom)

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← 返回首页</Link>
      <h1 className="text-3xl font-bold mb-6">
        ⭐⭐⭐⭐ 全局通知系统
        {unreadCount > 0 && (
          <span className="ml-2 px-2 py-0.5 text-sm bg-red-500 text-white rounded-full">
            {unreadCount}
          </span>
        )}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
        {/* 触发按钮 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">快捷通知</h2>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => notifySuccess('操作成功', '数据已保存')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              成功通知
            </button>
            <button
              onClick={() => notifyError('操作失败', '网络连接超时')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              错误通知
            </button>
            <button
              onClick={() => notifyWarning('注意', '磁盘空间不足')}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              警告通知
            </button>
            <button
              onClick={() => notifyInfo('提示', '有新版本可用')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              信息通知
            </button>
          </div>

          <h2 className="text-xl font-semibold mt-6">自定义通知</h2>
          <button
            onClick={() => addNotification({
              type: 'info',
              title: '永久通知',
              message: '这条通知不会自动消失（duration=0）',
              duration: 0,
            })}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            发送永久通知
          </button>

          <button
            onClick={() => clearAll()}
            className="block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            清空所有
          </button>
        </div>

        {/* 通知列表 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">通知列表</h2>
          {notifications.length === 0 ? (
            <p className="text-gray-400 py-8 text-center">暂无通知</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border rounded-lg flex items-start gap-2 ${typeStyles[notification.type]}`}
                >
                  <span className="text-lg">{typeIcons[notification.type]}</span>
                  <div className="flex-1">
                    <div className="font-medium">{notification.title}</div>
                    {notification.message && (
                      <div className="text-sm opacity-80">{notification.message}</div>
                    )}
                    <div className="text-xs opacity-60 mt-1">
                      {notification.duration > 0
                        ? `${notification.duration / 1000}秒后自动消失`
                        : '不会自动消失'}
                    </div>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="opacity-50 hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-sm opacity-70 space-y-1 border-t pt-4 mt-8 max-w-4xl">
        <p>💡 通知 ID 通过 nextIdAtom 自增管理，保证唯一性</p>
        <p>💡 addNotificationAtom 内部用 setTimeout 实现自动消失</p>
        <p>💡 notifySuccessAtom 等是便捷 action，内部调用 addNotificationAtom</p>
        <p>💡 这个模式可以在任何组件中通过 useSetAtom 触发通知，无需传 props</p>
      </div>
    </div>
  )
}
