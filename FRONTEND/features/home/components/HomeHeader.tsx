"use client";

import { useEffect, useRef, useState } from "react";
import MobileAccordion from "./MobileAccordion";
import type { NavGroup } from "../types/nav";

/**
 * サンプルのナビゲーションデータ
 */
const NAV: NavGroup[] = [
  {
    label: "コース",
    items: [
      { heading: "小学生", links: ["算数", "国語", "英語", "中学受験"] },
      {
        heading: "中学生",
        links: ["定期テスト対策", "高校受験", "英検対策"],
      },
      {
        heading: "高校生",
        links: ["大学受験", "共通テスト", "個別指導"],
      },
    ],
  },
  {
    label: "料金",
    items: [
      { heading: "授業料", links: ["小学生料金", "中学生料金", "高校生料金"] },
      { heading: "オプション", links: ["季節講習", "自習室利用"] },
    ],
  },
  {
    label: "校舎案内",
    items: [
      {
        heading: "エリア別",
        links: ["東京エリア", "神奈川エリア", "オンライン校"],
      },
    ],
  },
  {
    label: "合格実績",
    items: [
      { heading: "合格校一覧", links: ["中学", "高校", "大学"] },
    ],
  },
  {
    label: "お問い合わせ",
    items: [
      {
        heading: "各種窓口",
        links: ["資料請求", "体験授業予約", "保護者相談"],
      },
    ],
  },
];

export default function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null); // デスクトップのメガメニュー
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ホバー遅延でチラつき防止
  const hoverTimer = useRef<number | null>(null);
  const openWithDelay = (i: number) => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenIndex(i), 60);
  };
  const closeWithDelay = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenIndex(null), 120);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Top utility bar */}
      <div className="hidden md:flex items-center justify-end gap-6 text-sm text-gray-600 px-6 py-2">
        <a
          className="hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
          href="#"
        >
          校舎一覧
        </a>
        <a
          className="hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
          href="#"
        >
          合格実績
        </a>
        <a
          className="hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
          href="#"
        >
          よくある質問
        </a>
        <a
          className="hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
          href="#"
        >
          保護者の方へ
        </a>
        <button
          onClick={() => setSearchOpen(true)}
          className="hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
        >
          検索
        </button>
        <a
          className="ml-2 border rounded px-2 py-0.5 hover:bg-gray-50"
          href="#"
        >
          資料請求
        </a>
      </div>

      {/* Main nav */}
      <nav className="px-4 md:px-6">
        <div className="h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-indigo-600" aria-hidden />
            <span className="text-lg md:text-xl font-bold tracking-tight">
              Your塾名
            </span>
          </a>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-stretch gap-2">
            {NAV.map((group, i) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => openWithDelay(i)}
                onMouseLeave={closeWithDelay}
              >
                <button
                  className={`h-10 px-4 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${
                    openIndex === i ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={openIndex === i ? "true" : "false"}
                  onFocus={() => setOpenIndex(i)}
                >
                  {group.label}
                </button>

                {/* Mega menu */}
                {openIndex === i && (
                  <div
                    className="absolute left-0 top-full w-[720px] bg-white shadow-xl border rounded-2xl mt-2 p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2"
                    onMouseEnter={() => openWithDelay(i)}
                    onMouseLeave={closeWithDelay}
                  >
                    {group.items.map((sec) => (
                      <div key={sec.heading}>
                        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                          {sec.heading}
                        </div>
                        <ul className="space-y-1.5">
                          {sec.links.map((l) => (
                            <li key={l}>
                              <a
                                href="#"
                                className="block text-sm text-gray-800 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded"
                              >
                                {l}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="h-10 px-3 rounded-md hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              検索
            </button>
            <a
              href="#"
              className="h-10 px-3 rounded-md border hover:bg-gray-50"
            >
              資料請求
            </a>
            <a
              href="#"
              className="h-10 px-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              体験授業予約
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-gray-50"
            aria-label="メニューを開く"
            aria-expanded={mobileOpen ? "true" : "false"}
            onClick={() => setMobileOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>
      </nav>

      {/* Divider */}
      <div className="hidden lg:block border-t" />

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="h-16 px-4 flex items-center justify-between border-b">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-indigo-600" aria-hidden />
              <span className="text-lg font-bold tracking-tight">Your塾名</span>
            </a>
            <button
              className="inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-gray-50"
              aria-label="メニューを閉じる"
              onClick={() => setMobileOpen(false)}
            >
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>

          <div className="px-4 py-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full h-11 rounded-lg border flex items-center justify-between px-3 mb-4"
            >
              <span className="text-gray-600">サイト内検索</span>
              <span>⌕</span>
            </button>

            <div className="divide-y">
              {NAV.map((group) => (
                <MobileAccordion key={group.label} label={group.label}>
                  <div className="grid grid-cols-1 gap-4 py-2">
                    {group.items.map((sec) => (
                      <div key={sec.heading}>
                        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                          {sec.heading}
                        </div>
                        <ul className="space-y-1.5">
                          {sec.links.map((l) => (
                            <li key={l}>
                              <a className="block py-1.5" href="#">
                                {l}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </MobileAccordion>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                className="h-10 px-3 rounded-md border hover:bg-gray-50"
                href="#"
              >
                資料請求
              </a>
              <a
                className="h-10 px-3 rounded-md border hover:bg-gray-50"
                href="#"
              >
                体験授業予約
              </a>
              <a
                className="h-10 px-3 rounded-md border hover:bg-gray-50"
                href="#"
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm flex items-start justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <span className="text-gray-500">⌕</span>
              <input
                className="flex-1 h-10 outline-none placeholder:text-gray-400"
                placeholder="コース・校舎名・科目で検索"
                autoFocus
              />
              <button
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={() => setSearchOpen(false)}
              >
                閉じる
              </button>
            </div>
            <div className="p-4 text-sm text-gray-600">
              ヒント: 製品名やトピックで検索できます
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

