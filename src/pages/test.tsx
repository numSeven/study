const Test = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">使用示例</h1>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-blue-900 text-lg leading-relaxed mb-4">
                除了 Claude Code 之外,直接在客户端粘贴图片无法调用此 MCP
                Server,客户端默认会将图片转码后直接调用模型接口。
              </p>
              <p className="text-blue-900 text-lg leading-relaxed mb-4">
                最佳实践是将图片放到本地目录,通过对话的方式指定图片名称或路径来调用
                Mcp Server。
              </p>
              <p className="text-blue-900 text-lg leading-relaxed">
                例如:
                <span className="font-mono bg-white px-2 py-1 rounded text-sm ml-1">
                  What does demo.png describe?
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
