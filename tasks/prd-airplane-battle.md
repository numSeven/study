# PRD: 飞机大战小游戏

## Introduction

一款基于 Web 浏览器的经典纵向射击小游戏。玩家操控战机在屏幕底部移动并射击，消灭从屏幕上方出现的敌机。采用 HTML5 Canvas + JavaScript 实现，支持键盘和鼠标/触屏双操控方式，简约几何美术风格。

## Goals

- 提供流畅的纵向射击游戏体验
- 支持键盘和鼠标/触屏两种操控方式
- 实现基础的敌机生成、碰撞检测和计分系统
- 游戏可在主流浏览器中直接运行，无需安装

## User Stories

### US-001: 初始化游戏画布
**Description:** 作为开发者，我需要创建游戏的基础 Canvas 画布和游戏循环，以便后续功能在此基础上构建。

**Acceptance Criteria:**
- [ ] 创建固定尺寸的 Canvas 画布（适配移动端和桌面端）
- [ ] 实现 requestAnimationFrame 游戏主循环
- [ ] 画布居中显示，背景为深色星空效果
- [ ] 页面加载后显示"点击开始"提示
- [ ] Typecheck/lint passes

### US-002: 玩家战机显示与控制
**Description:** 作为玩家，我想要控制一架战机在屏幕底部移动，以便躲避敌机和进行射击。

**Acceptance Criteria:**
- [ ] 战机显示在画布底部区域
- [ ] 键盘方向键（上下左右）可控制战机移动
- [ ] 鼠标移动/触屏拖拽可控制战机跟随移动
- [ ] 战机不能移出画布边界
- [ ] 移动流畅，无明显卡顿
- [ ] Verify in browser using dev-browser skill

### US-003: 玩家射击功能
**Description:** 作为玩家，我想要发射子弹消灭敌机。

**Acceptance Criteria:**
- [ ] 键盘模式：空格键发射子弹
- [ ] 鼠标/触屏模式：自动持续射击
- [ ] 子弹从战机正前方发出，向上飞行
- [ ] 子弹飞出画布后自动销毁
- [ ] 射击有最小间隔限制（防止过快连射）
- [ ] Verify in browser using dev-browser skill

### US-004: 敌机生成与移动
**Description:** 作为玩家，我想看到敌机从屏幕上方不断出现并向下移动，形成游戏挑战。

**Acceptance Criteria:**
- [ ] 敌机从画布顶部随机水平位置生成
- [ ] 敌机匀速向下移动
- [ ] 敌机飞出画布底部后自动销毁
- [ ] 敌机生成频率随时间适度增加（提升难度）
- [ ] 同屏敌机数量有上限控制
- [ ] Verify in browser using dev-browser skill

### US-005: 碰撞检测与爆炸效果
**Description:** 作为玩家，我想看到子弹击中敌机时的爆炸效果和敌机被消灭。

**Acceptance Criteria:**
- [ ] 子弹与敌机碰撞时，敌机被消灭
- [ ] 碰撞时显示简单的爆炸动画效果
- [ ] 碰撞后子弹和敌机均从画面移除
- [ ] 碰撞检测使用矩形碰撞（AABB）
- [ ] Verify in browser using dev-browser skill

### US-006: 玩家生命与死亡
**Description:** 作为玩家，我想知道被敌机撞到后会失去生命，生命耗尽则游戏结束。

**Acceptance Criteria:**
- [ ] 玩家初始拥有 3 条生命
- [ ] 画面顶部显示剩余生命数
- [ ] 敌机与玩家碰撞时，玩家失去一条生命
- [ ] 被撞后短暂无敌闪烁效果（约 2 秒）
- [ ] 生命归零时游戏结束
- [ ] Verify in browser using dev-browser skill

### US-007: 计分系统
**Description:** 作为玩家，我想看到当前得分，击落敌机获得分数。

**Acceptance Criteria:**
- [ ] 画面顶部显示当前分数
- [ ] 每击落一架敌机获得 10 分
- [ ] 分数实时更新显示
- [ ] Verify in browser using dev-browser skill

### US-008: 游戏状态管理（开始/结束/重新开始）
**Description:** 作为玩家，我想要清晰的游戏开始和结束界面，并能重新开始游戏。

**Acceptance Criteria:**
- [ ] 开始界面显示游戏标题和"点击/按空格开始"提示
- [ ] 游戏结束时显示"Game Over"和最终得分
- [ ] 游戏结束界面显示"重新开始"按钮
- [ ] 重新开始后所有状态重置（分数、生命、敌机）
- [ ] Verify in browser using dev-browser skill

## Functional Requirements

- FR-1: 使用 HTML5 Canvas 绘制所有游戏元素
- FR-2: 游戏循环基于 requestAnimationFrame，保证 60fps 流畅运行
- FR-3: 玩家战机支持键盘方向键和鼠标/触屏拖拽两种移动方式
- FR-4: 子弹支持键盘空格键手动射击和鼠标/触屏模式下自动射击
- FR-5: 敌机从顶部随机位置生成，匀速向下移动
- FR-6: 碰撞检测使用 AABB（轴对齐包围盒）矩形碰撞
- FR-7: 玩家初始 3 条生命，被撞后 2 秒无敌时间
- FR-8: 每击落一架敌机得 10 分，实时显示分数和生命
- FR-9: 游戏包含三个状态：开始画面、游戏进行中、游戏结束画面
- FR-10: 所有游戏元素使用简约几何图形绘制（矩形、三角形、圆形）

## Non-Goals

- 不包含多关卡或 Boss 战
- 不包含道具系统（护盾、加速、散弹等）
- 不包含音效和背景音乐
- 不包含在线排行榜或账号系统
- 不包含多种敌机类型（仅一种基础敌机）
- 不包含敌机射击功能
- 不包含存档/读档功能

## Design Considerations

- 画布尺寸建议 400x600（竖屏），适配手机端
- 简约几何风格：玩家战机用三角形，敌机用矩形/菱形，子弹用小矩形
- 配色方案：深色背景 + 亮色元素（玩家蓝色、敌机红色、子弹黄色）
- 爆炸效果可用扩散的圆形粒子实现
- UI 信息（分数、生命）显示在画布顶部，不遮挡游戏区域

## Technical Considerations

- 纯前端实现，单个 HTML 文件即可运行（内联 CSS + JS）
- 使用 Canvas 2D Context API 进行绘制
- 游戏对象使用类/对象管理（Player, Enemy, Bullet, Explosion）
- 碰撞检测每帧执行，注意性能优化（限制同屏对象数量）
- 触屏设备需处理 touch 事件，防止页面滚动

## Success Metrics

- 游戏加载后 1 秒内可开始游玩
- 操控响应延迟 < 16ms（一帧内响应）
- 同屏 20+ 敌机 + 50+ 子弹时仍保持 60fps
- 玩家可在主流浏览器（Chrome、Firefox、Safari）中正常游玩

## Open Questions

- 是否需要适配横屏模式？
- 敌机速度和生成频率的具体数值需要实际测试调优
- 是否需要暂停功能？
