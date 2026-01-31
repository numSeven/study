import { useState, useEffect, useCallback } from 'react'
import type { LucideIcon } from 'lucide-react'
import { 
  ChevronLeft, 
  ChevronRight, 
  Monitor, 
  Cpu, 
  Wifi, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Settings,
  ArrowRight,
  BarChart3,
  Target,
  Layers,
  Workflow
} from 'lucide-react'

// 类型定义
interface ContentItem {
  text: string
  icon: LucideIcon
}

interface CardItem {
  title: string
  desc: string
  icon: LucideIcon
}

interface StepItem {
  text: string
  icon: LucideIcon
}

interface NumberedItem {
  title: string
  desc: string
  num: number
}

interface SlideData {
  type: 'cover' | 'content'
  title: string
  subtitle?: string
  icon?: LucideIcon
  content?: ContentItem[]
  layout?: 'list' | 'comparison' | 'cards' | 'flow' | 'numbered' | 'two-col' | 'summary' | 'default' | 'radial5'
  leftItems?: string[]
  rightItems?: string[]
  leftTitle?: string
  rightTitle?: string
  rightHighlight?: string
  rightType?: string
  items?: string[] | NumberedItem[]
  cards?: CardItem[]
  steps?: StepItem[]
  checks?: string[]
  conclusion?: string
  subtext?: string
  highlight?: string
  highlightType?: 'warning' | 'danger' | 'success' | 'primary'
}

// PPT 内容数据
const slides: SlideData[] = [
  {
    type: 'content',
    title: '满足医院需求',
    layout: 'radial5'
  },
  {
    type: 'cover',
    title: '信息化 / 数字化 = 买一个软件系统？',
    subtitle: '在开始建设之前，我们必须先统一认知',
    icon: Database
  },
  {
    type: 'content',
    title: '当我们说"要做数字化"，我们在说什么？',
    content: [
      { text: '上一套管理系统', icon: Monitor },
      { text: '车间装点终端设备', icon: Cpu },
      { text: '给布草贴上RFID标签', icon: Wifi },
      { text: '数据在电脑上能查到', icon: Database }
    ],
    highlight: '看起来很先进，但这真的是"数字化工厂"吗？',
    highlightType: 'warning'
  },
  {
    type: 'content',
    title: '大多数人心中的数字化 = 软件 + 硬件',
    layout: 'comparison',
    leftItems: ['信息化 = 上系统', '数字化 = 上更高级的系统 + RFID', '系统上线 = 工厂数字化完成'],
    rightHighlight: '这种理解的本质是：把数字化当成一次"采购行为"',
    rightType: 'danger'
  },
  {
    type: 'content',
    title: '系统能上线，但管理不会自动升级',
    layout: 'list',
    items: [
      '数据很多，但没人真正依赖',
      '报表在看，但问题没改善',
      '系统在用，但流程还是老样子',
      '员工觉得是"额外负担"'
    ],
    highlight: '最终变成：系统在运行，工厂却没有变聪明',
    highlightType: 'danger'
  },
  {
    type: 'content',
    title: '数字化的本质，是运营能力升级',
    layout: 'cards',
    cards: [
      { title: '可量化的运营', desc: '用数据衡量每个环节', icon: BarChart3 },
      { title: '可追溯的问题来源', desc: '精准定位异常根源', icon: Target },
      { title: '可持续的优化能力', desc: '持续改进而非临时救火', icon: TrendingUp }
    ],
    highlight: '关键词不是"系统"，而是：能力',
    highlightType: 'success'
  },
  {
    type: 'content',
    title: '数字化 = 设备、数据与决策打通',
    layout: 'flow',
    steps: [
      { text: '设备状态能被实时采集', icon: Cpu },
      { text: '生产数据自动形成记录', icon: Database },
      { text: '数据直接影响排产与调度', icon: Workflow },
      { text: '管理决策基于事实而不是经验', icon: Target }
    ],
    highlight: '数据不是"事后统计"，而是"过程控制工具"',
    highlightType: 'primary'
  },
  {
    type: 'content',
    title: '从"经验管理"到"数据管理"',
    layout: 'comparison',
    leftTitle: '传统方式',
    leftItems: ['靠感觉判断忙不忙', '出问题靠追责', '改善靠个人经验'],
    rightTitle: '数字化管理方式',
    rightItems: ['用指标判断产能与瓶颈', '用数据追溯异常原因', '用持续改进替代临时救火'],
    highlight: '管理从"人盯人"变为"数据驱动"',
    highlightType: 'primary'
  },
  {
    type: 'content',
    title: '不是先上系统，而是先打基础',
    layout: 'numbered',
    items: [
      { title: '标准化', desc: '统一布草名称、编码、规格标准', num: 1 },
      { title: '流程梳理', desc: '明确每个环节的责任、交接与记录点', num: 2 },
      { title: '数据规则', desc: '定义哪些数据必须采集、由谁采、用于管什么', num: 3 }
    ],
    highlight: '没有这些，系统只会变成"电子记账本"',
    highlightType: 'warning'
  },
  {
    type: 'content',
    title: '系统是工具，不是答案',
    layout: 'two-col',
    leftTitle: '系统的作用是',
    leftItems: ['承载标准', '固化流程', '自动采集数据', '输出管理指标'],
    rightTitle: '但前提是',
    rightItems: ['标准是清晰的', '流程是稳定的', '管理是愿意用数据的'],
    highlight: '否则，再先进的系统也只是"摆设"',
    highlightType: 'warning'
  },
  {
    type: 'content',
    title: '管理层必须先完成一次升级',
    layout: 'list',
    items: [
      '从"差不多"到"用数据说话"',
      '从"出了问题再处理"到"用数据提前预警"',
      '从"看报表"到"用指标持续改进"'
    ],
    highlight: '数字化不是IT项目，而是一次管理方式的升级',
    highlightType: 'primary'
  },
  {
    type: 'content',
    title: '数字化不是买系统，而是建设能力',
    layout: 'summary',
    checks: [
      '数字化不是一次采购',
      '数字化不是装几台设备',
      '数字化不是多几个报表'
    ],
    conclusion: '而是——让工厂具备用数据持续变好的能力',
    subtext: '当认知一致，系统建设才有意义。当管理升级，数字化才会真正落地。'
  }
]

export default function PPTPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = slides.length

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0))
  }, [])

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  const slide = slides[currentSlide]

  const getHighlightClass = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-amber-500/10 border-amber-500/30 text-amber-400'
      case 'danger': return 'bg-red-500/10 border-red-500/30 text-red-400'
      case 'success': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
      case 'primary': return 'bg-blue-500/10 border-blue-500/30 text-blue-400'
      default: return 'bg-slate-700/50 border-slate-600 text-slate-300'
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-slate-400">洗涤工厂数字化认知宣贯</span>
        </div>
        <div className="text-sm text-slate-500">
          {currentSlide + 1} / {totalSlides}
        </div>
      </div>

      {/* PPT 主内容区 */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-5xl">
          {/* 封面页 */}
          {slide.type === 'cover' && slide.icon && (
            <div className="text-center animate-in fade-in duration-500">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/50">
                  <slide.icon className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl text-slate-400">{slide.subtitle}</p>
              <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-500">
                <span className="w-8 h-px bg-slate-700"></span>
                <span>按 → 或空格键开始</span>
                <span className="w-8 h-px bg-slate-700"></span>
              </div>
            </div>
          )}

          {/* 内容页 */}
          {slide.type === 'content' && (
            <div className={`animate-in slide-in-from-right duration-300 ${slide.layout === 'radial5' ? 'p-12 rounded-2xl shadow-xl relative overflow-hidden' : ''}`}
                 style={slide.layout === 'radial5' ? { 
                   backgroundImage: 'url(/ppt-bg/slide-bg.png)', 
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 } : {}}>
              <h2 className={`text-3xl md:text-4xl font-bold mb-10 border-l-4 border-blue-500 pl-6 ${slide.layout === 'radial5' ? 'text-slate-800' : 'text-white'}`}>
                {slide.title}
              </h2>

              {/* 默认列表布局 */}
              {(!slide.layout || slide.layout === 'list') && slide.items && (
                <div className="space-y-4 mb-10">
                  {(slide.items as string[]).map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-lg text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 图标内容布局 */}
              {slide.layout === 'default' && slide.content && (
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {slide.content.map((item: ContentItem, idx: number) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-4 p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="text-lg text-slate-200">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 对比布局 */}
              {slide.layout === 'comparison' && (
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  {slide.leftItems && (
                    <div className="space-y-4">
                      {slide.leftTitle && (
                        <h3 className="text-lg font-semibold text-slate-400 mb-4">{slide.leftTitle}</h3>
                      )}
                      {slide.leftItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                          <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                          <span className="text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {slide.rightItems && (
                    <div className="space-y-4">
                      {slide.rightTitle && (
                        <h3 className="text-lg font-semibold text-blue-400 mb-4">{slide.rightTitle}</h3>
                      )}
                      {slide.rightItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                          <ArrowRight className="w-4 h-4 text-blue-400" />
                          <span className="text-slate-200">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {slide.rightHighlight && (
                    <div className={`p-6 rounded-xl border ${getHighlightClass(slide.rightType || 'warning')}`}>
                      <AlertTriangle className="w-8 h-8 mb-3" />
                      <p className="text-lg">{slide.rightHighlight}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 卡片布局 */}
              {slide.layout === 'cards' && slide.cards && (
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  {slide.cards.map((card, idx) => (
                    <div 
                      key={idx}
                      className="p-6 bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500/30 transition-all"
                    >
                      <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                        <card.icon className="w-7 h-7 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                      <p className="text-slate-400">{card.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* 流程布局 */}
              {slide.layout === 'flow' && slide.steps && (
                <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                  {slide.steps.map((step: StepItem, idx: number) => (
                    <div key={idx} className="flex items-center">
                      <div className="flex flex-col items-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl w-44">
                        <step.icon className="w-8 h-8 text-blue-400 mb-3" />
                        <span className="text-center text-sm text-slate-300">{step.text}</span>
                      </div>
                      {idx < (slide.steps?.length || 0) - 1 && (
                        <ArrowRight className="w-6 h-6 text-slate-600 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 序号布局 */}
              {slide.layout === 'numbered' && slide.items && (
                <div className="space-y-6 mb-10">
                  {(slide.items as NumberedItem[]).map((item: NumberedItem, idx: number) => (
                    <div key={idx} className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white shrink-0">
                        {item.num}
                      </div>
                      <div className="flex-1 p-5 bg-slate-800/50 border border-slate-700 rounded-xl">
                        <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 两栏布局 */}
              {slide.layout === 'two-col' && (
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      {slide.leftTitle}
                    </h3>
                    <div className="space-y-3">
                      {slide.leftItems?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-300">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-xl">
                    <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      {slide.rightTitle}
                    </h3>
                    <div className="space-y-3">
                      {slide.rightItems?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-300">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 五大院方价值辐射布局 */}
              {slide.layout === 'radial5' && (
                <div className="relative w-full" style={{ height: '520px' }}>
                  {/* 背景装饰圆弧 */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[480px] h-[480px] border border-dashed border-blue-300/50 rounded-full"></div>
                    <div className="absolute w-[380px] h-[380px] border border-blue-200/40 rounded-full"></div>
                  </div>
                  
                  {/* 中心区域装饰图片 */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <img 
                      src="/ppt-bg/center-glow.png" 
                      alt="" 
                      className="w-[300px] h-[300px] opacity-80"
                    />
                  </div>
                  
                  {/* 连接节点 */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* 上节点 */}
                    <div className="absolute top-[60px] w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div>
                    {/* 右上节点 */}
                    <div className="absolute top-[130px] right-[180px] w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div>
                    {/* 右下节点 */}
                    <div className="absolute bottom-[160px] right-[200px] w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div>
                    {/* 底部节点 */}
                    <div className="absolute bottom-[80px] w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div>
                    {/* 左下节点 */}
                    <div className="absolute bottom-[160px] left-[200px] w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div>
                    {/* 左上节点 */}
                    <div className="absolute top-[130px] left-[180px] w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div>
                  </div>

                  {/* 中心球体 - 5大院方价值 */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative">
                      {/* 外发光 - 使用图片 */}
                      <img 
                        src="/ppt-bg/center-glow.png" 
                        alt="" 
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] opacity-60 blur-sm"
                      />
                      {/* 主球体 */}
                      <div className="relative w-[150px] h-[150px] bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-blue-500/50 border-4 border-white/30">
                        <span className="text-5xl font-bold text-white drop-shadow-lg">5大</span>
                        <span className="text-lg text-white/95 mt-1 font-medium drop-shadow-md">院方价值</span>
                      </div>
                    </div>
                  </div>

                  {/* 左上 - 院感风险管控 */}
                  <div className="absolute left-0 top-[80px] w-[280px]">
                    <h3 className="text-xl font-bold text-blue-700 mb-3">院感风险管控</h3>
                    <ul className="space-y-1.5 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>脏污布草的收货点数</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>脏污布草的存放</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>厂内脏区净区人员流动</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>洗涤消毒数据同步</span>
                      </li>
                    </ul>
                  </div>

                  {/* 右上 - 布草管理 */}
                  <div className="absolute right-0 top-[80px] w-[280px] text-right">
                    <h3 className="text-xl font-bold text-blue-700 mb-3">布草管理</h3>
                    <ul className="space-y-1.5 text-sm text-gray-600 inline-block text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>布草生命周期</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>报废量</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>周转率分析</span>
                      </li>
                    </ul>
                  </div>

                  {/* 左下 - 布草稳定供给 */}
                  <div className="absolute left-0 bottom-[60px] w-[280px]">
                    <h3 className="text-xl font-bold text-blue-700 mb-3">布草稳定供给</h3>
                    <ul className="space-y-1.5 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>库存数监控</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>科室需求数预估</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>布草采购决策支撑</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>配送及时性</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>减少工厂串发漏发</span>
                      </li>
                    </ul>
                  </div>

                  {/* 右下 - 收发单据管理 */}
                  <div className="absolute right-0 bottom-[60px] w-[280px] text-right">
                    <h3 className="text-xl font-bold text-blue-700 mb-3">收发单据管理</h3>
                    <ul className="space-y-1.5 text-sm text-gray-600 inline-block text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>电子化收发单据</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>收发通知更即时</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>费用核算更轻松</span>
                      </li>
                    </ul>
                  </div>

                  {/* 底部中间 - 洗涤质量管控 */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[200px] text-center">
                    <h3 className="text-xl font-bold text-blue-700 mb-3">洗涤质量管控</h3>
                    <ul className="space-y-1.5 text-sm text-gray-600 inline-block text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>质量溯源</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>反洗/缝补分析</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>投诉分析</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* 总结布局 */}
              {slide.layout === 'summary' && (
                <div className="text-center mb-10">
                  <div className="flex flex-wrap justify-center gap-6 mb-10">
                    {slide.checks?.map((check, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-full"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-slate-300">{check}</span>
                      </div>
                    ))}
                  </div>
                  <div className="inline-block p-8 bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl">
                    <p className="text-2xl font-bold text-white mb-3">{slide.conclusion}</p>
                    <p className="text-slate-400">{slide.subtext}</p>
                  </div>
                </div>
              )}

              {/* 高亮提示 */}
              {slide.highlight && (
                <div className={`p-6 rounded-xl border ${getHighlightClass(slide.highlightType || 'primary')} flex items-start gap-4`}>
                  {slide.highlightType === 'warning' && <AlertTriangle className="w-6 h-6 shrink-0" />}
                  {slide.highlightType === 'danger' && <AlertTriangle className="w-6 h-6 shrink-0" />}
                  {slide.highlightType === 'success' && <CheckCircle2 className="w-6 h-6 shrink-0" />}
                  {(!slide.highlightType || slide.highlightType === 'primary') && <ArrowRight className="w-6 h-6 shrink-0" />}
                  <p className="text-xl font-medium">{slide.highlight}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 底部控制栏 */}
      <div className="h-16 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 进度条 */}
        <div className="flex-1 mx-8 max-w-md">
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="text-sm text-slate-500">
          使用 ← → 键或空格切换
        </div>
      </div>
    </div>
  )
}
