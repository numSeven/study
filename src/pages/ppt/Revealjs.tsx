import { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import {
  Database,
  Monitor,
  Cpu,
  Wifi,
  AlertTriangle,
  BarChart3,
  Target,
  TrendingUp,
  Workflow,
  Settings,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Users,
  Layers,
  Zap
} from 'lucide-react'

export default function Revealjs() {
  const deckRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<Reveal.Api | null>(null)

  useEffect(() => {
    if (!deckRef.current) return

    revealRef.current = new Reveal(deckRef.current, {
      hash: true,
      slideNumber: 'c/t',
      showSlideNumber: 'all',
      transition: 'slide',
      backgroundTransition: 'fade',
      width: 1280,
      height: 720,
      margin: 0.04,
      center: true,
      controls: true,
      progress: true,
      keyboard: true,
      overview: true,
      touch: true,
    })

    revealRef.current.initialize()

    return () => {
      if (revealRef.current) {
        revealRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="reveal-wrapper">
      <style>{`
        @import url('reveal.js/dist/reveal.css');
        
        .reveal-wrapper {
          width: 100vw;
          height: 100vh;
          background: #0f172a;
        }
        
        .reveal {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
        }
        
        .reveal .slides {
          text-align: left;
        }
        
        .reveal .slides section {
          padding: 40px 60px;
          height: 100%;
          box-sizing: border-box;
        }
        
        /* 封面样式 */
        .cover-slide {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center !important;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        }
        
        .cover-icon {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 48px;
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.4);
        }
        
        .cover-title {
          font-size: 52px;
          font-weight: 800;
          color: #f8fafc;
          margin-bottom: 24px;
          line-height: 1.2;
          background: linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .cover-subtitle {
          font-size: 24px;
          color: #64748b;
          font-weight: 400;
        }
        
        /* 内容页通用样式 */
        .content-slide {
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
        }
        
        .slide-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 48px;
          padding-bottom: 20px;
          border-bottom: 2px solid #3b82f6;
        }
        
        .slide-header-line {
          width: 6px;
          height: 40px;
          background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 3px;
        }
        
        .slide-title {
          font-size: 40px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
        }
        
        /* 列表样式 */
        .content-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
        }
        
        .content-list li {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          margin-bottom: 12px;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 12px;
          font-size: 22px;
          color: #cbd5e1;
        }
        
        .list-dot {
          width: 10px;
          height: 10px;
          background: #3b82f6;
          border-radius: 50%;
          flex-shrink: 0;
        }
        
        /* 卡片网格 */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        
        .icon-card {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .icon-card:hover {
          border-color: #3b82f6;
          transform: translateY(-4px);
        }
        
        .card-icon {
          width: 56px;
          height: 56px;
          background: rgba(59, 130, 246, 0.15);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #60a5fa;
        }
        
        .card-text {
          font-size: 18px;
          color: #e2e8f0;
          font-weight: 500;
        }
        
        /* 三列卡片 */
        .card-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .feature-card {
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%);
          border: 1px solid #334155;
          border-radius: 20px;
          padding: 32px;
          text-align: center;
        }
        
        .feature-icon {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.2) 100%);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #60a5fa;
        }
        
        .feature-title {
          font-size: 22px;
          font-weight: 600;
          color: #f8fafc;
          margin-bottom: 12px;
        }
        
        .feature-desc {
          font-size: 16px;
          color: #94a3b8;
        }
        
        /* 对比布局 */
        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 32px;
        }
        
        .comparison-box {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid #334155;
          border-radius: 16px;
          padding: 28px;
        }
        
        .comparison-box.highlight {
          background: rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
        }
        
        .comparison-title {
          font-size: 18px;
          font-weight: 600;
          color: #60a5fa;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .comparison-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .comparison-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          font-size: 18px;
          color: #cbd5e1;
          border-bottom: 1px solid #334155;
        }
        
        .comparison-list li:last-child {
          border-bottom: none;
        }
        
        /* 流程步骤 */
        .flow-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        
        .flow-step {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          min-width: 200px;
        }
        
        .flow-step-icon {
          width: 48px;
          height: 48px;
          background: rgba(59, 130, 246, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          color: #60a5fa;
        }
        
        .flow-step-text {
          font-size: 16px;
          color: #e2e8f0;
        }
        
        .flow-arrow {
          color: #475569;
        }
        
        /* 编号列表 */
        .numbered-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }
        
        .numbered-item {
          display: flex;
          align-items: stretch;
          gap: 20px;
        }
        
        .number-badge {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }
        
        .number-content {
          flex: 1;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 16px;
          padding: 20px 24px;
        }
        
        .number-title {
          font-size: 22px;
          font-weight: 600;
          color: #f8fafc;
          margin-bottom: 8px;
        }
        
        .number-desc {
          font-size: 16px;
          color: #94a3b8;
        }
        
        /* 高亮提示框 */
        .highlight-box {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 24px;
          border-radius: 16px;
          margin-top: 24px;
        }
        
        .highlight-box.warning {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #fbbf24;
        }
        
        .highlight-box.danger {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
        }
        
        .highlight-box.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
        }
        
        .highlight-box.primary {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #60a5fa;
        }
        
        .highlight-box p {
          font-size: 22px;
          font-weight: 500;
          margin: 0;
          line-height: 1.5;
        }
        
        /* 总结页 */
        .summary-slide {
          text-align: center !important;
        }
        
        .check-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-bottom: 48px;
        }
        
        .check-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 28px;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 50px;
          font-size: 18px;
          color: #cbd5e1;
        }
        
        .check-icon {
          color: #10b981;
        }
        
        .conclusion-box {
          display: inline-block;
          padding: 40px 60px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(29, 78, 216, 0.15) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 24px;
          margin-bottom: 32px;
        }
        
        .conclusion-text {
          font-size: 32px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0 0 16px 0;
        }
        
        .subtext {
          font-size: 20px;
          color: #94a3b8;
          margin: 0;
        }
        
        /* Reveal 控件样式覆盖 */
        .reveal .controls {
          color: #3b82f6;
        }
        
        .reveal .progress {
          background: #1e293b;
          height: 4px;
        }
        
        .reveal .progress span {
          background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
        }
        
        .reveal .slide-number {
          background: rgba(30, 41, 59, 0.8);
          color: #94a3b8;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
        }
        
        /* 第一页特殊样式 */
        .question-slide .content-list li {
          font-size: 24px;
          padding: 20px 24px;
        }
        
        /* 双栏布局 */
        .two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 32px;
        }
        
        .col-box {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid #334155;
          border-radius: 16px;
          padding: 28px;
        }
        
        .col-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .col-title.blue {
          color: #60a5fa;
        }
        
        .col-title.amber {
          color: #fbbf24;
        }
        
        .col-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .col-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          font-size: 17px;
          color: #cbd5e1;
        }
        
        .col-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        
        .col-dot.blue {
          background: #3b82f6;
        }
        
        .col-dot.amber {
          background: #f59e0b;
        }
      `}</style>

      <div ref={deckRef} className="reveal">
        <div className="slides">
          {/* 封面页 */}
          <section className="cover-slide">
            <div className="cover-icon">
              <Database size={56} color="white" />
            </div>
            <h1 className="cover-title">
              信息化 / 数字化 = 买一个软件系统？
            </h1>
            <p className="cover-subtitle">
              在开始建设之前，我们必须先统一认知
            </p>
          </section>

          {/* 第1页：先问一个问题 */}
          <section className="content-slide question-slide">
            <div className="slide-header">
              <div className="slide-header-line"></div>
              <h2 className="slide-title">当我们说"要做数字化"，我们在说什么？</h2>
            </div>
            <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '28px' }}>
              很多人脑海中的画面是：
            </p>
            <ul className="content-list">
              <li>
                <div className="card-icon" style={{ margin: 0, width: '48px', height: '48px' }}>
                  <Monitor size={24} />
                </div>
                <span>上一套管理系统</span>
              </li>
              <li>
                <div className="card-icon" style={{ margin: 0, width: '48px', height: '48px' }}>
                  <Cpu size={24} />
                </div>
                <span>车间装点终端设备</span>
              </li>
              <li>
                <div className="card-icon" style={{ margin: 0, width: '48px', height: '48px' }}>
                  <Wifi size={24} />
                </div>
                <span>给布草贴上RFID标签</span>
              </li>
              <li>
                <div className="card-icon" style={{ margin: 0, width: '48px', height: '48px' }}>
                  <Database size={24} />
                </div>
                <span>数据在电脑上能查到</span>
              </li>
            </ul>
            <div className="highlight-box warning">
              <AlertTriangle size={28} />
              <p>看起来很先进，但这真的是"数字化工厂"吗？</p>
            </div>
          </section>

          {/* 第2页：当下最普遍的理解 */}
          <section className="content-slide">
            <div className="slide-header">
              <div className="slide-header-line"></div>
              <h2 className="slide-title">大多数人心中的数字化 = 软件 + 硬件</h2>
            </div>
            <div className="comparison-grid">
              <div className="comparison-box">
                <h3 className="comparison-title">
                  <Layers size={20} />
                  典型认知模式
                </h3>
                <ul className="comparison-list">
                  <li>
                    <div className="list-dot"></div>
                    <span>信息化 = 上系统</span>
                  </li>
                  <li>
                    <div className="list-dot"></div>
                    <span>数字化 = 上更高级的系统 + RFID</span>
                  </li>
                  <li>
                    <div className="list-dot"></div>
                    <span>系统上线 = 工厂数字化完成</span>
                  </li>
                </ul>
              </div>
              <div className="highlight-box danger" style={{ margin: 0, height: 'fit-content' }}>
                <AlertTriangle size={32} />
                <div>
                  <p style={{ marginBottom: '8px' }}>这种理解的本质是：</p>
                  <p style={{ fontSize: '26px', fontWeight: 700 }}>把数字化当成一次"采购行为"</p>
                </div>
              </div>
            </div>
          </section>

          {/* 第3页：为什么这种理解会失败 */}
          <section className="content-slide">
            <div className="slide-header">
              <div className="slide-header-line"></div>
              <h2 className="slide-title">系统能上线，但管理不会自动升级</h2>
            </div>
            <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '24px' }}>
              现实中常见结果：
            </p>
            <ul className="content-list">
              <li>
                <div className="list-dot"></div>
                <span>数据很多，但没人真正依赖</span>
              </li>
              <li>
                <div className="list-dot"></div>
                <span>报表在看，但问题没改善</span>
              </li>
              <li>
                <div className="list-dot"></div>
                <span>系统在用，但流程还是老样子</span>
              </li>
              <li>
                <div className="list-dot"></div>
                <span>员工觉得是"额外负担"</span>
              </li>
            </ul>
            <div className="highlight-box danger">
              <AlertTriangle size={28} />
              <p>最终变成：系统在运行，工厂却没有变聪明</p>
            </div>
          </section>

          {/* 第4页：正确认知 */}
          <section className="content-slide">
            <div className="slide-header">
              <div className="slide-header-line"></div>
              <h2 className="slide-title">数字化的本质，是运营能力升级</h2>
            </div>
            <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '32px' }}>
              数字化不是为了"看数据"，而是为了让工厂具备：
            </p>
            <div className="card-grid-3">
              <div className="feature-card">
                <div className="feature-icon">
                  <BarChart3 size={32} />
                </div>
                <h3 className="feature-title">可量化的运营</h3>
                <p className="feature-desc">用数据衡量每个环节</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Target size={32} />
                </div>
                <h3 className="feature-title">可追溯的问题来源</h3>
                <p className="feature-desc">精准定位异常根源</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <TrendingUp size={32} />
                </div>
                <h3 className="feature-title">可持续的优化能力</h3>
                <p className="feature-desc">持续改进而非临时救火</p>
              </div>
            </div>
            <div className="highlight-box success">
              <CheckCircle2 size={28} />
              <p>关键词不是"系统"，而是：<strong>能力</strong></p>
            </div>
          </section>

          {/* 第5页：真正的数字化工厂 */}
          <section className="content-slide">
            <div className="slide-header">
              <div className="slide-header-line"></div>
              <h2 className="slide-title">数字化 = 设备、数据与决策打通</h2>
            </div>
            <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '32px' }}>
              它意味着：
            </p>
            <div className="flow-container">
              <div className="flow-step">
                <div className="flow-step-icon">
                  <Cpu size={24} />
                </div>
                <p className="flow-step-text">设备状态能被<br />实时采集</p>
              </div>
              <div className="flow-arrow">
                <ArrowRight size={32} />
              </div>
              <div className="flow-step">
                <div className="flow-step-icon">
                  <Database size={24} />
                </div>
                <p className="flow-step-text">生产数据自动<br />形成记录</p>
              </div>
              <div className="flow-arrow">
                <ArrowRight size={32} />
              </div>
              <div className="flow-step">
                <div className="flow-step-icon">
                  <Workflow size={24} />
                </div>
                <p className="flow-step-text">数据直接影响<br />排产与调度</p>
              </div>
              <div className="flow-arrow">
                <ArrowRight size={32} />
              </div>
              <div className="flow-step">
                <div className="flow-step-icon">
                  <Target size={24} />
                </div>
                <p className="flow-step-text">管理决策基于<br />事实而不是经验</p>
              </div>
            </div>
            <div className="highlight-box primary">
              <Lightbulb size={28} />
              <p>数据不是"事后统计"，而是"过程控制工具"</p>
            </div>
          </section>

          {/* 第6页：从经验管理到数据管理 */}
          <section className="content-slide">
            <div className="slide-header">
              <div className="slide-header-line"></div>
              <h2 className="slide-title">从"经验管理"到"数据管理"</h2>
            </div>
            <div className="comparison-grid">
              <div className="comparison-box">
                <h3 className="comparison-title" style={{ color: '#94a3b8' }}>
                  <Settings size={20} />
                  传统方式
                </h3>
                <ul className="comparison-list">
                  <li>
                    <div className="list-dot" style={{ background: '#64748b' }}></div>
                    <span>靠感觉判断忙不忙</span>
                  </li>
                  <li>
                    <div className="list-dot" style={{ background: '#64748b' }}></div>
                    <span>出问题靠追责</span>
                  </li>
                  <li>
                    <div className="list-dot" style={{ background: '#64748b' }}></div>
                    <span>改善靠个人经验</span>
                  </li>
                </ul>
              </div>
              <div className="comparison-box highlight">
                <h3 className="comparison-title">
                  <Zap size={20} />
                  数字化管理方式
                </h3>
                <ul className="comparison-list">
                  <li>
                    <ArrowRight size={16} className="flow-arrow" style={{ color: '#3b82f6' }} />
                    <span>用指标判断产能与瓶颈</span>
                  </li>
                  <li>
                    <ArrowRight size={16} className="flow-arrow" style={{ color: '#3b82f6' }} />
                    <span>用数据追溯异常原因</span>
                  </li>
                  <li>
                    <ArrowRight size={16} className="flow-arrow" style={{ color: '#3b82f6' }} />
                    <span>用持续改进替代临时救火</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="highlight-box primary">
              <Lightbulb size={28} />
              <p>本质变化：管理从"人盯人"变为"数据驱动"</p>
            </div>
          </section>

          {/* 第7页：从哪里开始 */}
          <section className="content-slide">
            <div className="slide-header">
              <div className="slide-header-line"></div>
              <h2 className="slide-title">不是先上系统，而是先打基础</h2>
            </div>
            <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '32px' }}>
              真正的起点是三件事：
            </p>
            <div className="numbered-list">
              <div className="numbered-item">
                <div className="number-badge">1</div>
                <div className="number-content">
                  <h3 className="number-title">标准化</h3>
                  <p className="number-desc">统一布草名称、编码、规格标准</p>
                </div>
              </div>
              <div className="numbered-item">
                <div className="number-badge">2</div>
                <div className="number-content">
                  <h3 className="number-title">流程梳理</h3>
                  <p className="number-desc">明确每个环节的责任、交接与记录点</p>
                </div>
              </div>
              <div className="numbered-item">
                <div className="number-badge">3</div>
                <div className="number-content">
                  <h3 className="number-title">数据规则</h3>
                  <p className="number-desc">定义哪些数据必须采集、由谁采、用于管什么</p>
                </div>
              </div>
            </div>
            <div className="highlight-box warning">
              <AlertTriangle size={28} />
              <p>没有这些，系统只会变成"电子记账本"</p>
            </div>
          </section>

          {/* 第8页：系统的真正角色 */}
          <section className="content-slide">
            <div className="slide-header">
              <div className="slide-header-line"></div>
              <h2 className="slide-title">系统是工具，不是答案</h2>
            </div>
            <div className="two-col-grid">
              <div className="col-box">
                <h3 className="col-title blue">
                  <Settings size={22} />
                  系统的作用是
                </h3>
                <ul className="col-list">
                  <li>
                    <div className="col-dot blue"></div>
                    <span>承载标准</span>
                  </li>
                  <li>
                    <div className="col-dot blue"></div>
                    <span>固化流程</span>
                  </li>
                  <li>
                    <div className="col-dot blue"></div>
                    <span>自动采集数据</span>
                  </li>
                  <li>
                    <div className="col-dot blue"></div>
                    <span>输出管理指标</span>
                  </li>
                </ul>
              </div>
              <div className="col-box">
                <h3 className="col-title amber">
                  <AlertTriangle size={22} />
                  但前提是
                </h3>
                <ul className="col-list">
                  <li>
                    <div className="col-dot amber"></div>
                    <span>标准是清晰的</span>
                  </li>
                  <li>
                    <div className="col-dot amber"></div>
                    <span>流程是稳定的</span>
                  </li>
                  <li>
                    <div className="col-dot amber"></div>
                    <span>管理是愿意用数据的</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="highlight-box warning">
              <AlertTriangle size={28} />
              <p>否则，再先进的系统也只是"摆设"</p>
            </div>
          </section>

          {/* 第9页：关键在人 */}
          <section className="content-slide">
            <div className="slide-header">
              <div className="slide-header-line"></div>
              <h2 className="slide-title">管理层必须先完成一次升级</h2>
            </div>
            <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '28px' }}>
              必须转变的几个习惯：
            </p>
            <ul className="content-list">
              <li>
                <ArrowRight size={20} style={{ color: '#3b82f6', flexShrink: 0 }} />
                <span>从"差不多"到"<strong>用数据说话</strong>"</span>
              </li>
              <li>
                <ArrowRight size={20} style={{ color: '#3b82f6', flexShrink: 0 }} />
                <span>从"出了问题再处理"到"<strong>用数据提前预警</strong>"</span>
              </li>
              <li>
                <ArrowRight size={20} style={{ color: '#3b82f6', flexShrink: 0 }} />
                <span>从"看报表"到"<strong>用指标持续改进</strong>"</span>
              </li>
            </ul>
            <div className="highlight-box primary">
              <Users size={28} />
              <p>数字化不是IT项目，而是一次<strong>管理方式的升级</strong></p>
            </div>
          </section>

          {/* 第10页：结尾总结 */}
          <section className="content-slide summary-slide">
            <div className="slide-header" style={{ justifyContent: 'center', borderBottom: 'none' }}>
              <div className="slide-header-line"></div>
              <h2 className="slide-title">数字化不是买系统，而是建设能力</h2>
            </div>
            <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '36px', textAlign: 'center' }}>
              在真正开始建设之前，我们要先达成共识：
            </p>
            <div className="check-list">
              <div className="check-item">
                <CheckCircle2 size={22} className="check-icon" />
                <span>数字化不是一次采购</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={22} className="check-icon" />
                <span>数字化不是装几台设备</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={22} className="check-icon" />
                <span>数字化不是多几个报表</span>
              </div>
            </div>
            <div className="conclusion-box">
              <p className="conclusion-text">而是——让工厂具备用数据持续变好的能力</p>
              <p className="subtext">当认知一致，系统建设才有意义。<br />当管理升级，数字化才会真正落地。</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
