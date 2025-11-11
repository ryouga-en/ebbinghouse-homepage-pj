"use client";

/**
 * ヒーローセクションコンポーネント
 */
export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="h-[48vh] md:h-[64vh] bg-gradient-to-br from-indigo-600 to-sky-500" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-sm uppercase tracking-widest/relaxed opacity-90">
            Corporate Website
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            学びの力で未来をひらく
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-white/90">
            塾サイト向けの、シンプルで拡張しやすいヘッダーUIのサンプルです。
          </p>
        </div>
      </div>
    </div>
  );
}

