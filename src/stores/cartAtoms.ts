/**
 * ⭐⭐⭐ 难度：中级
 * 📖 知识点：复杂对象 atom, 派生计算, action 封装
 *
 * 场景：购物车系统
 * 展示如何管理复杂的数据结构（数组 + 对象）
 *
 * 核心概念：
 * - atom 可以存储任意类型（数组、对象等）
 * - 派生 atom 可以做复杂的计算（总价、商品数量等）
 * - action atom 封装业务逻辑（添加、删除、修改数量）
 * - 不可变更新：始终返回新对象/数组，不修改原数据
 */

import { atom } from 'jotai'

// ---------- 类型定义 ----------

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

// ---------- 基础状态 ----------

// 购物车商品列表
export const cartItemsAtom = atom<CartItem[]>([])

// 优惠码
export const couponCodeAtom = atom('')

// 折扣比例（0-1）
export const discountAtom = atom(0)

// ---------- 派生 atom：各种计算属性 ----------

// 购物车商品总数
export const cartCountAtom = atom((get) => {
  const items = get(cartItemsAtom)
  return items.reduce((sum, item) => sum + item.quantity, 0)
})

// 小计（折扣前）
export const subtotalAtom = atom((get) => {
  const items = get(cartItemsAtom)
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

// 折扣金额
export const discountAmountAtom = atom((get) => {
  const subtotal = get(subtotalAtom)
  const discount = get(discountAtom)
  return subtotal * discount
})

// 最终总价
export const totalAtom = atom((get) => {
  const subtotal = get(subtotalAtom)
  const discountAmount = get(discountAmountAtom)
  return subtotal - discountAmount
})

// 购物车是否为空
export const isCartEmptyAtom = atom((get) => get(cartItemsAtom).length === 0)

// ---------- Action atoms ----------

// 添加商品到购物车
export const addToCartAtom = atom(
  null,
  (get, set, product: Omit<CartItem, 'quantity'>) => {
    const items = get(cartItemsAtom)
    const existingIndex = items.findIndex((item) => item.id === product.id)

    if (existingIndex >= 0) {
      // 已存在：数量 +1
      const newItems = items.map((item, i) =>
        i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      )
      set(cartItemsAtom, newItems)
    } else {
      // 不存在：添加新商品
      set(cartItemsAtom, [...items, { ...product, quantity: 1 }])
    }
  }
)

// 从购物车移除商品
export const removeFromCartAtom = atom(null, (get, set, id: string) => {
  const items = get(cartItemsAtom)
  set(
    cartItemsAtom,
    items.filter((item) => item.id !== id)
  )
})

// 修改商品数量
export const updateQuantityAtom = atom(
  null,
  (get, set, { id, quantity }: { id: string; quantity: number }) => {
    if (quantity <= 0) {
      // 数量为0则移除
      set(removeFromCartAtom, id)
      return
    }
    const items = get(cartItemsAtom)
    set(
      cartItemsAtom,
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }
)

// 应用优惠码
export const applyCouponAtom = atom(null, (get, set) => {
  const code = get(couponCodeAtom)
  // 模拟优惠码验证
  const coupons: Record<string, number> = {
    SAVE10: 0.1,
    SAVE20: 0.2,
    HALF: 0.5,
  }
  const discount = coupons[code.toUpperCase()]
  if (discount) {
    set(discountAtom, discount)
    return { success: true, message: `优惠码已应用，享${discount * 100}%折扣` }
  }
  return { success: false, message: '无效的优惠码' }
})

// 清空购物车
export const clearCartAtom = atom(null, (_get, set) => {
  set(cartItemsAtom, [])
  set(couponCodeAtom, '')
  set(discountAtom, 0)
})
