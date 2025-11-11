/**
 * ナビゲーション関連の型定義
 */

import type { ReactNode } from "react";

export interface NavLink {
  heading: string;
  links: string[];
}

export interface NavGroup {
  label: string;
  items: NavLink[];
}

export interface MobileAccordionProps {
  label: string;
  children: ReactNode;
}

