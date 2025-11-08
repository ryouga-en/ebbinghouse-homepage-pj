"use client"

export default function HomeView() {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--brand)' }}>
          ようこそ
        </h1>
        <div className="space-y-6">
          <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">ホームページへようこそ</h2>
            <p className="text-gray-700 leading-relaxed">
              これはホームページのメインコンテンツです。
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">最新情報</h2>
            <p className="text-gray-700 leading-relaxed">
              最新の記事や更新情報をここに表示します。
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
