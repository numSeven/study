/*
 * @Author: yiyuan 1198076282@qq.com
 * @Date: 2026-01-23 10:31:59
 * @LastEditors: yiyuan 1198076282@qq.com
 * @LastEditTime: 2026-01-26 15:23:53
 * @FilePath: /study/src/main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
