/**
 * ⭐ 示例1：主题切换
 * 展示 atom 的基本读写和派生 atom
 */
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { themeAtom, themeClassAtom, isDarkAtom, toggleThemeAtom } from '@/stores/themeAtom'
import { Link } from 'react-router-dom'

export default function ThemePage() {
  
  // useAtom = [value, setValue]，类似 useState
  const [theme, setTheme] = useAtom(themeAtom)

  // useAtomValue = 只读取值（不需要 setter 时更高效）
  const themeClass = useAtomValue(themeClassAtom)
  const isDark = useAtomValue(isDarkAtom)

  // useSetAtom = 只获取 setter（不订阅值的变化，避免不必要渲染）
  const toggleTheme = useSetAtom(toggleThemeAtom)

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${themeClass}`}>
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← 返回首页</Link>
      <h1 className="text-3xl font-bold mb-6">⭐ 主题切换示例</h1>

      <div className="space-y-4 max-w-md">
        {/* 方式1：直接设置值 */}
        <div className="flex gap-2">
          <button
            onClick={() => setTheme('light')}
            className={`px-4 py-2 rounded ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            浅色模式
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            深色模式
          </button>
        </div>

        {/* 方式2：通过 action atom 切换 */}
        <button
          onClick={() => toggleTheme()}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          切换主题（action atom）
        </button>

        {/* 派生状态展示 */}
        <div className="p-4 border rounded space-y-2">
          <p>当前主题：<code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded">{theme}</code></p>
          <p>是否深色：<code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded">{isDark ? '是' : '否'}</code></p>
          <p>CSS 类名：<code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-sm">{themeClass}</code></p>
        </div>

        <div className="text-sm opacity-70 space-y-1">
          <p>💡 useAtom = 读 + 写</p>
          <p>💡 useAtomValue = 只读（派生 atom 推荐用这个）</p>
          <p>💡 useSetAtom = 只写（action atom 推荐用这个）</p>
        </div>
      </div>
    </div>
  )
}
