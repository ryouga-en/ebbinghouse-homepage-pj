"use client";

import type { SectionProps } from "../types/props";

/**
 * セクションコンポーネント
 */
export default function Section({ title }: SectionProps) {
  return (
    <section className="px-4 md:px-8 lg:px-12 py-14">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <article
            key={i}
            className="border rounded-2xl p-5 hover:shadow-sm transition-shadow"
          >
            <div className="aspect-[16/9] w-full rounded-xl bg-gray-100" />
            <h3 className="mt-3 font-semibold">カードタイトル {i + 1}</h3>
            <p className="mt-1 text-sm text-gray-600">
              説明テキストが入ります。説明テキストが入ります。説明テキストが入ります。
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

