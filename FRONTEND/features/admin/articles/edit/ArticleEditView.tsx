"use client"

export default function ArticleEditView() {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--brand)' }}>
          記事編集
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                記事タイトル
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50"
                style={{ focusRing: 'var(--brand)' }}
                placeholder="記事のタイトルを入力"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                記事内容
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50 min-h-[300px]"
                style={{ focusRing: 'var(--brand)' }}
                placeholder="記事の内容を入力"
              />
            </div>

            <div className="flex gap-4">
              <button
                className="px-6 py-2 text-white rounded-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'var(--brand)' }}
              >
                保存
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
