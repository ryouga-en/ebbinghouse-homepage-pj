"use client";

import HomeHeader from "./components/HomeHeader";
import Hero from "./components/Hero";
import Section from "./components/Section";

/**
 * ホーム画面のメインビュー
 */
export default function HomeView() {
  return (
    <div>
      <HomeHeader />
      <main className="pt-24 md:pt-32">
        <Hero />
        <Section title="合格実績" />
        <Section title="コース紹介" />
        <Section title="校舎案内" />
        <Section title="ブログ" />
        <footer className="mt-24 border-t py-10 text-center text-sm text-gray-500">
          © 2025 Your Company
        </footer>
      </main>
    </div>
  );
}
