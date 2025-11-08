"use client"

export default function SamplePageA() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">サンプルページA</h1>
        <p className="text-lg text-gray-600 mb-8">これはサンプルページAです</p>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">ページAの内容</h2>
          <p className="text-gray-600">
            このページはサンプルページAとして作成されました。
            適当な文言を表示しています。
          </p>
        </div>
      </div>
    </div>
  )
}
