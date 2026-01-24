/**
 * ⭐⭐ 示例3：表单管理
 * 展示多 atom 管理表单和自动验证
 */
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  usernameAtom,
  emailAtom,
  passwordAtom,
  confirmPasswordAtom,
  isSubmittedAtom,
  usernameErrorAtom,
  emailErrorAtom,
  passwordErrorAtom,
  confirmPasswordErrorAtom,
  isFormValidAtom,
  resetFormAtom,
  submitFormAtom,
} from '@/stores/formAtoms'
import { Link } from 'react-router-dom'

function FormField({
  label,
  type = 'text',
  value,
  onChange,
  error,
  showError,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  error: string
  showError: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          showError && error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {showError && error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

export default function FormPage() {
  const [username, setUsername] = useAtom(usernameAtom)
  const [email, setEmail] = useAtom(emailAtom)
  const [password, setPassword] = useAtom(passwordAtom)
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom)

  const isSubmitted = useAtomValue(isSubmittedAtom)
  const usernameError = useAtomValue(usernameErrorAtom)
  const emailError = useAtomValue(emailErrorAtom)
  const passwordError = useAtomValue(passwordErrorAtom)
  const confirmPasswordError = useAtomValue(confirmPasswordErrorAtom)
  const isValid = useAtomValue(isFormValidAtom)

  const resetForm = useSetAtom(resetFormAtom)
  const submitForm = useSetAtom(submitFormAtom)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = submitForm()
    if (result.success) {
      alert(`注册成功！欢迎 ${result.data?.username}`)
      resetForm()
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← 返回首页</Link>
      <h1 className="text-3xl font-bold mb-6">⭐⭐ 表单管理示例</h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <FormField
          label="用户名"
          value={username}
          onChange={setUsername}
          error={usernameError}
          showError={isSubmitted}
        />
        <FormField
          label="邮箱"
          type="email"
          value={email}
          onChange={setEmail}
          error={emailError}
          showError={isSubmitted}
        />
        <FormField
          label="密码"
          type="password"
          value={password}
          onChange={setPassword}
          error={passwordError}
          showError={isSubmitted}
        />
        <FormField
          label="确认密码"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={confirmPasswordError}
          showError={isSubmitted}
        />

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            注册
          </button>
          <button
            type="button"
            onClick={() => resetForm()}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            重置
          </button>
        </div>

        {/* 实时状态展示 */}
        <div className="p-4 bg-white rounded border text-sm space-y-1">
          <p>表单有效：<span className={isValid ? 'text-green-600' : 'text-red-600'}>{isValid ? '✓' : '✗'}</span></p>
          <p>已提交过：{isSubmitted ? '是' : '否'}</p>
        </div>

        <div className="text-sm opacity-70 space-y-1 border-t pt-4">
          <p>💡 每个字段一个 atom → 修改用户名不会触发邮箱输入框重渲染</p>
          <p>💡 验证规则是派生 atom → 自动响应字段变化，无需手动调用</p>
          <p>💡 isFormValidAtom 汇总所有验证 → 依赖链自动建立</p>
        </div>
      </form>
    </div>
  )
}
