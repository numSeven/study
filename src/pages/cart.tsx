/**
 * ⭐⭐⭐ 示例4：购物车
 * 展示复杂对象管理和派生计算
 */
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  cartItemsAtom,
  couponCodeAtom,
  cartCountAtom,
  subtotalAtom,
  discountAmountAtom,
  totalAtom,
  isCartEmptyAtom,
  addToCartAtom,
  removeFromCartAtom,
  updateQuantityAtom,
  applyCouponAtom,
  clearCartAtom,
} from '@/stores/cartAtoms'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// 模拟商品数据
const PRODUCTS = [
  { id: '1', name: 'React 实战手册', price: 79 },
  { id: '2', name: 'TypeScript 进阶', price: 69 },
  { id: '3', name: 'Node.js 服务端开发', price: 89 },
  { id: '4', name: 'CSS 艺术之道', price: 59 },
]

export default function CartPage() {
  const cartItems = useAtomValue(cartItemsAtom)
  const [couponCode, setCouponCode] = useAtom(couponCodeAtom)
  const cartCount = useAtomValue(cartCountAtom)
  const subtotal = useAtomValue(subtotalAtom)
  const discountAmount = useAtomValue(discountAmountAtom)
  const total = useAtomValue(totalAtom)
  const isEmpty = useAtomValue(isCartEmptyAtom)

  const addToCart = useSetAtom(addToCartAtom)
  const removeFromCart = useSetAtom(removeFromCartAtom)
  const updateQuantity = useSetAtom(updateQuantityAtom)
  const applyCoupon = useSetAtom(applyCouponAtom)
  const clearCart = useSetAtom(clearCartAtom)

  const [couponMsg, setCouponMsg] = useState('')

  const handleApplyCoupon = () => {
    const result = applyCoupon()
    setCouponMsg(result.message)
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← 返回首页</Link>
      <h1 className="text-3xl font-bold mb-6">⭐⭐⭐ 购物车示例</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
        {/* 商品列表 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">商品列表</h2>
          <div className="space-y-2">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded border">
                <div>
                  <span className="font-medium">{product.name}</span>
                  <span className="text-gray-500 ml-2">¥{product.price}</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  加入购物车
                </button>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">提示：优惠码 SAVE10 / SAVE20 / HALF</p>
        </div>

        {/* 购物车 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            购物车 <span className="text-sm text-gray-500">({cartCount} 件)</span>
          </h2>

          {isEmpty ? (
            <p className="text-gray-400 py-8 text-center">购物车为空</p>
          ) : (
            <div className="space-y-4">
              {/* 购物车商品 */}
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">¥{item.price} × {item.quantity}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity({ id: item.id, quantity: item.quantity - 1 })}
                        className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300 text-center"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity({ id: item.id, quantity: item.quantity + 1 })}
                        className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300 text-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700 text-sm"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 优惠码 */}
              <div className="flex gap-2">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="输入优惠码"
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  应用
                </button>
              </div>
              {couponMsg && (
                <p className={`text-sm ${discountAmount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {couponMsg}
                </p>
              )}

              {/* 价格汇总 */}
              <div className="p-4 bg-white rounded border space-y-2">
                <div className="flex justify-between">
                  <span>小计</span>
                  <span>¥{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>折扣</span>
                    <span>-¥{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>总计</span>
                  <span>¥{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => clearCart()}
                className="w-full py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                清空购物车
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm opacity-70 space-y-1 border-t pt-4 mt-8 max-w-4xl">
        <p>💡 cartItemsAtom 存储复杂数组，每次更新返回新数组（不可变更新）</p>
        <p>💡 subtotalAtom / totalAtom 是多层派生 atom：total 依赖 subtotal 和 discount</p>
        <p>💡 addToCartAtom 封装了"已存在则+1，不存在则添加"的业务逻辑</p>
      </div>
    </div>
  )
}
