"use client"

export default function ArticlesView() {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--brand)' }}>
          記事一覧
        </h1>
        <div className="space-y-4">
          {/* サンプル記事カード */}
          <article className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">記事タイトル1</h2>
            <p className="text-gray-600 text-sm mb-3">2025年1月1日</p>
            <p className="text-gray-700 leading-relaxed">
              記事の概要をここに表示します。記事の内容を簡潔にまとめた文章です。
            </p>
          </article>

          <article className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">記事タイトル2</h2>
            <p className="text-gray-600 text-sm mb-3">2024年12月25日</p>
            <p className="text-gray-700 leading-relaxed">
              記事の概要をここに表示します。記事の内容を簡潔にまとめた文章です。
            </p>
          </article>

          <article className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">記事タイトル3</h2>
            <p className="text-gray-600 text-sm mb-3">2024年12月20日</p>
            <p className="text-gray-700 leading-relaxed">
              記事の概要をここに表示します。記事の内容を簡潔にまとめた文章です。
            </p>
          </article>
        </div>
      </div>
    </div>
  )
}
