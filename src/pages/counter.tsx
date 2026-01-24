/**
 * ⭐ 示例2：计数器
 * 展示 atom 组合和 action atom
 */
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  countAtom,
  stepAtom,
  countLabelAtom,
  isEvenAtom,
  incrementAtom,
  decrementAtom,
  resetAtom,
} from '@/stores/counterAtom'
import { Link } from 'react-router-dom'

export default function CounterPage() {
  const count = useAtomValue(countAtom)
  const [step, setStep] = useAtom(stepAtom)
  const label = useAtomValue(countLabelAtom)
  const isEven = useAtomValue(isEvenAtom)

  const increment = useSetAtom(incrementAtom)
  const decrement = useSetAtom(decrementAtom)
  const reset = useSetAtom(resetAtom)

  return (
    <div className="min-h-screen p-8 bg-white">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← 返回首页</Link>
      <h1 className="text-3xl font-bold mb-6">⭐ 计数器示例</h1>

      <div className="space-y-6 max-w-md">
        {/* 计数值展示 */}
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className="text-6xl font-bold text-blue-600">{count}</div>
          <div className="text-gray-500 mt-2">{label}</div>
          <div className={`mt-1 text-sm ${isEven ? 'text-green-600' : 'text-orange-600'}`}>
            {isEven ? '偶数' : '奇数'}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => decrement()}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-xl"
          >
            −
          </button>
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            重置
          </button>
          <button
            onClick={() => increment()}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-xl"
          >
            +
          </button>
        </div>

        {/* 步进值控制 */}
        <div className="flex items-center gap-3">
          <label className="text-gray-700">步进值：</label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value) || 1)}
            min={1}
            className="w-20 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-500">每次增减 {step}</span>
        </div>

        <div className="text-sm opacity-70 space-y-1 border-t pt-4">
          <p>💡 countAtom 和 stepAtom 是两个独立的原子</p>
          <p>💡 incrementAtom 是一个 action atom，内部读取 step 来决定增加多少</p>
          <p>💡 countLabelAtom 和 isEvenAtom 是派生 atom，自动跟踪 count 的变化</p>
        </div>
      </div>
    </div>
  )
}
