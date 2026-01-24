/**
 * ⭐⭐⭐⭐ 示例7：API 缓存
 * 展示异步数据获取、loadable 和搜索过滤
 */
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  postsLoadableAtom,
  refreshPostsAtom,
  selectedPostIdAtom,
  selectedPostLoadableAtom,
  selectedUserIdAtom,
  userPostsLoadableAtom,
  searchQueryAtom,
  filteredPostsAtom,
} from '@/stores/apiCacheAtoms'
import { Link } from 'react-router-dom'

export default function ApiCachePage() {
  const postsLoadable = useAtomValue(postsLoadableAtom)
  const refreshPosts = useSetAtom(refreshPostsAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const filteredPosts = useAtomValue(filteredPostsAtom)

  const [selectedPostId, setSelectedPostId] = useAtom(selectedPostIdAtom)
  const selectedPostLoadable = useAtomValue(selectedPostLoadableAtom)

  const [selectedUserId, setSelectedUserId] = useAtom(selectedUserIdAtom)
  const userPostsLoadable = useAtomValue(userPostsLoadableAtom)

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← 返回首页</Link>
      <h1 className="text-3xl font-bold mb-6">⭐⭐⭐⭐ API 缓存示例</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
        {/* 左栏：帖子列表 + 搜索 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">帖子列表</h2>
            <button
              onClick={() => refreshPosts()}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              刷新
            </button>
          </div>

          {/* 搜索框 */}
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索帖子..."
            className="w-full px-3 py-2 border rounded"
          />

          {/* 列表 */}
          {postsLoadable.state === 'loading' && (
            <div className="text-center py-8 text-gray-500">加载中...</div>
          )}
          {postsLoadable.state === 'hasError' && (
            <div className="text-center py-8 text-red-500">
              加载失败
              <button onClick={() => refreshPosts()} className="ml-2 text-blue-500 underline">重试</button>
            </div>
          )}
          {postsLoadable.state === 'hasData' && (
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPostId(post.id)}
                  className={`p-2 rounded cursor-pointer text-sm ${
                    selectedPostId === post.id
                      ? 'bg-blue-100 border-blue-300 border'
                      : 'bg-white border hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium truncate">{post.title}</div>
                  <div className="text-xs text-gray-400">用户 {post.userId}</div>
                </div>
              ))}
              {filteredPosts.length === 0 && (
                <p className="text-gray-400 text-center py-4">无匹配结果</p>
              )}
            </div>
          )}
        </div>

        {/* 中栏：帖子详情 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">帖子详情</h2>
          {selectedPostId === null ? (
            <p className="text-gray-400 py-8 text-center">点击左侧帖子查看详情</p>
          ) : (
            <div className="bg-white p-4 rounded border">
              {selectedPostLoadable.state === 'loading' && (
                <p className="text-gray-500">加载中...</p>
              )}
              {selectedPostLoadable.state === 'hasData' && selectedPostLoadable.data && (
                <div className="space-y-2">
                  <h3 className="font-bold">{selectedPostLoadable.data.title}</h3>
                  <p className="text-sm text-gray-600">{selectedPostLoadable.data.body}</p>
                  <p className="text-xs text-gray-400">
                    帖子ID: {selectedPostLoadable.data.id} | 用户ID: {selectedPostLoadable.data.userId}
                  </p>
                </div>
              )}
              {selectedPostLoadable.state === 'hasError' && (
                <p className="text-red-500">加载失败</p>
              )}
            </div>
          )}
        </div>

        {/* 右栏：用户帖子 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">按用户筛选</h2>
          <div className="flex gap-1 flex-wrap mb-3">
            {[1, 2, 3, 4, 5].map((id) => (
              <button
                key={id}
                onClick={() => setSelectedUserId(id)}
                className={`px-3 py-1 text-sm rounded ${
                  selectedUserId === id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                用户{id}
              </button>
            ))}
          </div>

          {selectedUserId === null ? (
            <p className="text-gray-400 py-8 text-center">选择用户查看其帖子</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {userPostsLoadable.state === 'loading' && (
                <p className="text-gray-500 text-center py-4">加载中...</p>
              )}
              {userPostsLoadable.state === 'hasData' && (
                <>
                  {userPostsLoadable.data.map((post) => (
                    <div key={post.id} className="p-2 bg-white rounded border text-sm">
                      <div className="font-medium truncate">{post.title}</div>
                    </div>
                  ))}
                  {userPostsLoadable.data.length === 0 && (
                    <p className="text-gray-400 text-center">该用户暂无帖子</p>
                  )}
                </>
              )}
              {userPostsLoadable.state === 'hasError' && (
                <p className="text-red-500 text-center">加载失败</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="text-sm opacity-70 space-y-1 border-t pt-4 mt-8 max-w-6xl">
        <p>💡 postsAtom 是异步 atom，组件首次渲染时自动发起请求</p>
        <p>💡 loadable() 包装后无需 Suspense，可自行处理 loading/error/data 三种状态</p>
        <p>💡 selectedPostAtom 依赖 selectedPostIdAtom，当 ID 变化时自动重新获取</p>
        <p>💡 refreshPostsAtom 通过改变 postsRefreshAtom 的值触发数据重新获取</p>
        <p>💡 filteredPostsAtom 同时依赖 postsLoadableAtom 和 searchQueryAtom</p>
      </div>
    </div>
  )
}
