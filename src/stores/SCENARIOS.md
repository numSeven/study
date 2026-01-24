# Jotai 更多实际应用场景

除了代码示例中展示的 7 个场景外，Jotai 在实际项目中还有很多应用场景。

---

## 1. 多步骤表单 / 向导流程

**场景**：注册流程、问卷调查等分步填写

```ts
// 当前步骤
const currentStepAtom = atom(0)

// 每步的数据独立存储
const step1DataAtom = atom({ name: '', phone: '' })
const step2DataAtom = atom({ address: '', city: '' })
const step3DataAtom = atom({ plan: 'basic' })

// 汇总所有步骤数据
const allStepsDataAtom = atom((get) => ({
  ...get(step1DataAtom),
  ...get(step2DataAtom),
  ...get(step3DataAtom),
}))

// 当前步是否可以进入下一步
const canProceedAtom = atom((get) => {
  const step = get(currentStepAtom)
  if (step === 0) return get(step1DataAtom).name !== ''
  if (step === 1) return get(step2DataAtom).address !== ''
  return true
})
```

**优势**：每步独立 atom → 修改第一步不会触发第三步的重渲染。

---

## 2. 国际化 (i18n)

**场景**：多语言切换

```ts
const localeAtom = atom<'zh' | 'en' | 'ja'>('zh')

const messages = {
  zh: { greeting: '你好', logout: '退出' },
  en: { greeting: 'Hello', logout: 'Logout' },
  ja: { greeting: 'こんにちは', logout: 'ログアウト' },
}

// 派生当前语言的翻译文本
const t = atom((get) => messages[get(localeAtom)])
```

---

## 3. WebSocket 实时数据

**场景**：聊天室、股票行情、实时通知

```ts
const wsMessagesAtom = atom<Message[]>([])
const wsStatusAtom = atom<'connecting' | 'open' | 'closed'>('closed')

// 连接 WebSocket 的 action
const connectWsAtom = atom(null, (_get, set, url: string) => {
  set(wsStatusAtom, 'connecting')
  const ws = new WebSocket(url)

  ws.onopen = () => set(wsStatusAtom, 'open')
  ws.onclose = () => set(wsStatusAtom, 'closed')
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data)
    set(wsMessagesAtom, (prev) => [...prev, msg])
  }

  return ws
})
```

**优势**：WebSocket 生命周期和消息存储分离，任何组件都能订阅实时数据。

---

## 4. 拖拽排序 / 看板

**场景**：Trello 风格的看板、拖拽列表

```ts
interface KanbanItem {
  id: string
  title: string
  column: 'todo' | 'doing' | 'done'
  order: number
}

const kanbanItemsAtom = atom<KanbanItem[]>([])

// 按列分组的派生 atom
const columnItemsAtom = atom((get) => {
  const items = get(kanbanItemsAtom)
  return {
    todo: items.filter((i) => i.column === 'todo').sort((a, b) => a.order - b.order),
    doing: items.filter((i) => i.column === 'doing').sort((a, b) => a.order - b.order),
    done: items.filter((i) => i.column === 'done').sort((a, b) => a.order - b.order),
  }
})

// 移动卡片
const moveItemAtom = atom(
  null,
  (_get, set, { id, toColumn, toOrder }: { id: string; toColumn: string; toOrder: number }) => {
    set(kanbanItemsAtom, (prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, column: toColumn, order: toOrder } : item
      )
    )
  }
)
```

---

## 5. 撤销/重做 (Undo/Redo)

**场景**：文本编辑器、画图工具

```ts
interface HistoryState<T> {
  past: T[]
  present: T
  future: T[]
}

const historyAtom = atom<HistoryState<string>>({
  past: [],
  present: '',
  future: [],
})

const undoAtom = atom(null, (get, set) => {
  const { past, present, future } = get(historyAtom)
  if (past.length === 0) return
  set(historyAtom, {
    past: past.slice(0, -1),
    present: past[past.length - 1],
    future: [present, ...future],
  })
})

const redoAtom = atom(null, (get, set) => {
  const { past, present, future } = get(historyAtom)
  if (future.length === 0) return
  set(historyAtom, {
    past: [...past, present],
    present: future[0],
    future: future.slice(1),
  })
})

const canUndoAtom = atom((get) => get(historyAtom).past.length > 0)
const canRedoAtom = atom((get) => get(historyAtom).future.length > 0)
```

---

## 6. 响应式布局状态

**场景**：根据屏幕尺寸调整 UI

```ts
const windowSizeAtom = atom({ width: window.innerWidth, height: window.innerHeight })

// 在组件中用 useEffect 监听 resize 并更新
// 或用 atomEffect（jotai-effect 库）

const breakpointAtom = atom((get) => {
  const { width } = get(windowSizeAtom)
  if (width < 640) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
})

const isMobileAtom = atom((get) => get(breakpointAtom) === 'mobile')
const sidebarOpenAtom = atom((get) => get(breakpointAtom) === 'desktop')
```

---

## 7. 多标签页/面板状态

**场景**：IDE 风格的多标签编辑器

```ts
interface Tab {
  id: string
  title: string
  content: string
  isDirty: boolean
}

const tabsAtom = atom<Tab[]>([])
const activeTabIdAtom = atom<string | null>(null)

const activeTabAtom = atom((get) => {
  const tabs = get(tabsAtom)
  const activeId = get(activeTabIdAtom)
  return tabs.find((t) => t.id === activeId) ?? null
})

const hasUnsavedAtom = atom((get) => get(tabsAtom).some((t) => t.isDirty))

const closeTabAtom = atom(null, (get, set, id: string) => {
  const tabs = get(tabsAtom)
  const newTabs = tabs.filter((t) => t.id !== id)
  set(tabsAtom, newTabs)

  // 如果关闭的是当前标签，切换到前一个
  if (get(activeTabIdAtom) === id) {
    set(activeTabIdAtom, newTabs[newTabs.length - 1]?.id ?? null)
  }
})
```

---

## 8. 权限控制

**场景**：根据用户角色控制功能可见性

```ts
type Role = 'admin' | 'editor' | 'viewer'

const userRoleAtom = atom<Role>('viewer')

// 权限检查的派生 atom
const canEditAtom = atom((get) => {
  const role = get(userRoleAtom)
  return role === 'admin' || role === 'editor'
})

const canDeleteAtom = atom((get) => get(userRoleAtom) === 'admin')

const canAccessSettingsAtom = atom((get) => get(userRoleAtom) === 'admin')

// 功能开关（结合权限和功能标志）
const featureFlagsAtom = atom({ newUI: true, betaFeature: false })

const showNewUIAtom = atom((get) => {
  const flags = get(featureFlagsAtom)
  const role = get(userRoleAtom)
  return flags.newUI || role === 'admin' // admin 总是能看到新 UI
})
```

---

## 9. 分页 / 无限滚动

**场景**：列表数据的分页加载

```ts
const pageAtom = atom(1)
const pageSizeAtom = atom(20)
const totalCountAtom = atom(0)

const totalPagesAtom = atom((get) => {
  const total = get(totalCountAtom)
  const size = get(pageSizeAtom)
  return Math.ceil(total / size)
})

const hasNextPageAtom = atom((get) => get(pageAtom) < get(totalPagesAtom))
const hasPrevPageAtom = atom((get) => get(pageAtom) > 1)

// 当 page 或 pageSize 变化时自动重新获取
const pagedDataAtom = atom(async (get) => {
  const page = get(pageAtom)
  const size = get(pageSizeAtom)
  const res = await fetch(`/api/items?page=${page}&size=${size}`)
  return res.json()
})
```

---

## 10. 表格筛选 / 排序

**场景**：数据表格的多条件筛选

```ts
interface FilterState {
  search: string
  status: 'all' | 'active' | 'inactive'
  sortBy: 'name' | 'date' | 'price'
  sortOrder: 'asc' | 'desc'
}

const filterAtom = atom<FilterState>({
  search: '',
  status: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
})

const rawDataAtom = atom<Item[]>([])

// 多层过滤和排序的派生链
const filteredDataAtom = atom((get) => {
  const data = get(rawDataAtom)
  const { search, status, sortBy, sortOrder } = get(filterAtom)

  let result = data

  // 搜索过滤
  if (search) {
    result = result.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  // 状态过滤
  if (status !== 'all') {
    result = result.filter((item) => item.status === status)
  }

  // 排序
  result = [...result].sort((a, b) => {
    const modifier = sortOrder === 'asc' ? 1 : -1
    return a[sortBy] > b[sortBy] ? modifier : -modifier
  })

  return result
})
```

---

## 总结：何时选择 Jotai？

| 场景 | 适合用 Jotai | 不适合 |
|------|-------------|--------|
| 跨组件共享状态 | ✓ | |
| 状态之间有派生关系 | ✓（核心优势） | |
| 需要细粒度重渲染控制 | ✓ | |
| 简单的父子组件通信 | | ✗（props 就够了） |
| 极复杂的状态机 | | ✗（考虑 XState） |
| 服务端状态管理 | | ✗（考虑 TanStack Query） |
| 表单管理（超复杂） | | ✗（考虑 React Hook Form） |

## Jotai vs 其他方案

- **vs useState**：当状态需要跨组件共享时用 Jotai
- **vs useContext**：Jotai 避免了 Context 的"牵一发动全身"问题
- **vs Redux**：Jotai 更轻量，适合中小型项目；Redux 适合超大型团队协作
- **vs Zustand**：两者都轻量，Jotai 偏原子化组合，Zustand 偏单一 store
- **vs Recoil**：API 相似但 Jotai 更小更简单，无需 RecoilRoot
