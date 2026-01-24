import { Link } from 'react-router-dom'

const examples = [
  { path: '/theme', title: '⭐ 主题切换', desc: 'atom 基础读写、派生 atom、action atom' },
  { path: '/counter', title: '⭐ 计数器', desc: 'atom 组合、多个 atom 协作' },
  { path: '/form', title: '⭐⭐ 表单管理', desc: '多 atom 管理表单、自动验证' },
  { path: '/cart', title: '⭐⭐⭐ 购物车', desc: '复杂对象、派生计算、业务逻辑封装' },
  { path: '/auth', title: '⭐⭐⭐ 用户认证', desc: '异步 atom、localStorage 持久化' },
  { path: '/notifications', title: '⭐⭐⭐⭐ 全局通知', desc: 'reducer 模式、自动生命周期' },
  { path: '/api-cache', title: '⭐⭐⭐⭐ API 缓存', desc: '异步数据获取、loadable、搜索过滤' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Jotai 教学示例</h1>
        <p className="text-gray-500 mb-8">由简到难，7 个实际场景带你掌握 Jotai</p>

        <div className="space-y-3">
          {examples.map((ex) => (
            <Link
              key={ex.path}
              to={ex.path}
              className="block p-4 bg-white rounded-lg border hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <div className="font-semibold text-gray-800">{ex.title}</div>
              <div className="text-sm text-gray-500 mt-1">{ex.desc}</div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-800">
          <p className="font-medium mb-1">学习路线建议</p>
          <p>1. 先理解 atom 的读写 → 主题切换 / 计数器</p>
          <p>2. 掌握派生 atom 和多 atom 组合 → 表单 / 购物车</p>
          <p>3. 异步 atom 和副作用 → 认证 / API 缓存</p>
          <p>4. 复杂模式应用 → 通知系统</p>
          <p className="mt-2 opacity-70">更多场景见 src/stores/SCENARIOS.md</p>
        </div>
      </div>
    </div>
  )
}
