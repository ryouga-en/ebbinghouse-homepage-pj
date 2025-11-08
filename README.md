# Ebbinghouse Homepage Project

Next.js (Frontend) + FastAPI (Backend) のモノレポ構成のホームページプロジェクトです。
機能単位（Feature-First）のアーキテクチャを採用し、型とユーティリティの集中管理を徹底しています。

## 🏗️ アーキテクチャ

### フロントエンド
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**:
  - React Query: サーバー状態管理
  - Zustand: アプリ全体の状態管理
  - Jotai: UI状態管理

### バックエンド
- **Framework**: FastAPI
- **Language**: Python 3.11
- **Package Manager**: uv
- **Architecture**: ハイブリッド構成（CRUD + Repository + Domain + Service）

### 認証
- JWT + HttpOnly Cookie
- BFF (Backend for Frontend) パターン
- ロールベースアクセス制御

## 📋 前提条件

- Docker & Docker Compose
- Make (Windows の場合は WSL または Git Bash 推奨)

## 🚀 環境構築手順

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd ebbinghouse-homepage-pj
```

### 2. 環境変数の設定

`.env` ファイルを作成し、以下の内容を設定してください：

```env
# プロジェクト名
PROJECT_NAME=ebbinghouse-homepage-pj

# バックエンド設定
BACKEND_INTERNAL_URL=http://backend:8000
CORS_ALLOW_ORIGINS=http://localhost:3000

# JWT設定
JWT_SECRET=your-secret-key-here
JWT_ISSUER=ebbinghouse-homepage
ACCESS_TTL=1800
REFRESH_TTL=2592000
```

### 3. Docker コンテナの起動

```bash
make up
```

## 🛠️ 開発用起動コマンド

### 全体起動
```bash
make up
```

### 個別起動
```bash
# フロントエンドのみ
make frontend

# バックエンドのみ
make backend
```

### ログ確認
```bash
make logs
```

### 停止
```bash
make down
```

## 🚀 本番用起動コマンド

### 本番環境での起動
```bash
# 本番用ビルド
make build-prod

# 本番用起動
make up-prod
```

### 本番環境での停止
```bash
make down-prod
```

## 🔐 アカウント情報

### デモユーザー

| ロール | メールアドレス | パスワード | 権限 | ブランドカラー |
|--------|----------------|------------|------|----------------|
| **管理者** | admin@example.com | adminpass | 管理者権限（記事編集可） | 🔴 赤 (#ef4444) |
| **一般ユーザー** | user@example.com | userpass | 一般ユーザー権限 | 🔵 青 (#3b82f6) |

### ログイン手順

1. ブラウザで `http://localhost:3000/login` にアクセス
2. 上記のメールアドレスとパスワードでログイン
3. ロールに応じてブランドカラーが変更されます
4. ログイン後は自動的にメイン画面にリダイレクトされます

### セキュリティ注意事項

⚠️ **重要**: これらのアカウント情報はデモ用です。本番環境では必ず変更してください。

## 📁 プロジェクト構成

### フロントエンド（Feature-First）

```
FRONTEND/
├── app/                  # Next.js App Router（ページ・ルーティング）
│   ├── (main)/           # メインレイアウトグループ
│   │   ├── page.tsx      # ホームページ
│   │   ├── articles/     # 記事一覧ページ
│   │   └── admin/        # 管理者ページ
│   ├── login/            # ログインページ
│   └── layout.tsx        # ルートレイアウト
├── atoms/                # Jotai atoms（UI状態のみ）
├── stores/               # Zustand stores（アプリ状態）
├── features/             # 機能モジュール
│   ├── home/             # ホームページ機能
│   │   └── HomeView.tsx
│   ├── articles/         # 記事一覧機能
│   │   ├── ArticlesView.tsx
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── types/
│   │   └── utils/
│   └── admin/            # 管理機能
│       └── articles/
│           └── edit/
├── shared/               # 横断資産
│   ├── api/              # 複数機能で使うAPIクライアント
│   ├── components/       # レイアウト・共通UI
│   │   ├── layout/       # Header, MainLayout等
│   │   ├── ui/           # Button, Input等
│   │   └── icons/        # SVGアイコン
│   ├── hooks/            # 複数機能で使うhooks
│   ├── providers/        # Context/Query providers
│   ├── types/            # 横断的な型定義
│   └── utils/            # 横断ユーティリティ
├── styles/               # グローバルスタイル
└── public/               # 静的アセット
```

### バックエンド（ハイブリッド構成）

```
BACKEND/
└── app/
    ├── api/
    │   └── routes/           # ルーティング定義のみ
    │       └── auth.py
    ├── crud/                 # シンプルなCRUD操作
    │   └── user.py
    ├── repositories/         # 複雑なDB操作の抽象化
    │   └── user_repository.py
    ├── domain/               # ビジネスロジック
    │   ├── auth/
    │   │   └── service.py
    │   └── user/
    │       └── service.py
    ├── services/             # アプリケーションサービス
    │   └── user_service.py
    ├── models/
    │   └── db/               # SQLAlchemyモデル
    ├── schemas/
    │   └── api/              # Pydanticスキーマ
    ├── core/
    │   ├── config.py
    │   ├── database.py
    │   └── jwt.py
    └── main.py
```

## 🎯 機能

### 一般ユーザー向け
- **ホームページ**: 最新情報とコンテンツ紹介
- **記事一覧**: 公開記事の閲覧
- **記事詳細**: 個別記事の閲覧

### 管理者向け
- **記事編集**: 記事の作成・編集・削除

### 認証機能
- JWT ベースの認証
- HttpOnly Cookie によるセキュアなトークン管理
- ロールベースのアクセス制御（admin/standard）
- 自動トークンリフレッシュ

### UI/UX
- レスポンシブデザイン
- ヘッダーナビゲーション
- ロール別ブランドカラー
- 検索機能

## 🔧 状態管理の方針

このプロジェクトでは、状態の性質に応じて3つのライブラリを使い分けます。

### React Query（@tanstack/react-query）
- **用途**: サーバー状態の管理
- **配置**: `features/*/hooks/` または `shared/hooks/`
- **例**: ユーザーデータ取得、記事一覧取得、ログイン・ログアウト
- **特徴**: キャッシング、リトライ、楽観的更新

### Zustand
- **用途**: アプリ全体の状態管理（ビジネスロジック付き）
- **配置**: `stores/`
- **例**: 認証状態、テーマ設定、言語設定
- **特徴**: シンプルなAPI、Redux DevTools対応

### Jotai
- **用途**: UI状態のみ
- **配置**: `atoms/`
- **例**: モーダル表示、ページスコープの一時状態
- **特徴**: Atomic、軽量、派生atomのサポート

## 📐 コーディング規約

### 基本原則
1. **Feature-First**: 機能単位でディレクトリを構成
2. **型の分離**: コンポーネント内でinterfaceを定義せず、`types/` に集約
3. **関数の分離**: ヘルパー関数は `utils/` に、API呼び出しは `api/` に集約
4. **YAGNI原則**: 早すぎる汎化は避け、実需要に基づき共有化

### ディレクトリ配置ルール

#### API配置
- 最初は `features/<name>/api/` に配置
- 2つ以上の機能から使われたら `shared/api/` に昇格
- 認証など明らかに共有されるものは最初から `shared/api/`

#### hooks配置
- 機能固有のReact Query hooks → `features/<name>/hooks/`
- 複数機能で使うhooks → `shared/hooks/`

#### 型定義配置
- 機能固有の型 → `features/<name>/types/`
- 横断的な型 → `shared/types/`（機能特化した名前: `auth.ts`, `user.ts`）

### バックエンド層の使い分け

#### `crud/` vs `repositories/`
| 操作の種類 | 使う層 | 例 |
|---|---|---|
| 単純な一覧取得 | `crud/` | ユーザー一覧 |
| ID指定で1件取得 | `crud/` | ユーザー詳細 |
| 複数テーブル結合 | `repositories/` | ユーザー + 記事 |
| 複雑な検索条件 | `repositories/` | 期間指定 + タグ検索 |

#### `domain/` vs `services/`
| ロジックの種類 | 使う層 | 例 |
|---|---|---|
| ビジネスルール | `domain/service` | パスワード検証 |
| 複数リポジトリの連携 | `services/` | ユーザー登録 + メール送信 |
| 外部API連携 | `services/` | 通知送信 |

## 🔧 開発コマンド

### Make コマンド一覧

```bash
make help          # ヘルプ表示
make up            # 開発環境起動
make down          # 環境停止
make logs          # ログ表示
make frontend      # フロントエンドのみ起動
make backend       # バックエンドのみ起動
make build-prod    # 本番用ビルド
make up-prod       # 本番環境起動
make down-prod     # 本番環境停止
```

### 個別開発

#### フロントエンド開発
```bash
cd FRONTEND
npm install
npm run dev
```

#### バックエンド開発
```bash
cd BACKEND
uv sync
uv run uvicorn app.main:app --reload
```

## 🌐 アクセス URL

- **フロントエンド**: http://localhost:3000
- **バックエンド API**: http://localhost:8000
- **API ドキュメント**: http://localhost:8000/docs

## 📚 ドキュメント

- **[CLAUDE.md](./CLAUDE.md)**: Claude向けの詳細なプロジェクトルール
- **[.cursor/rules](./.cursor/rules)**: Cursor向けのプロジェクトルール

詳細なディレクトリ構成やコーディング規約については、上記のドキュメントを参照してください。

## 🛠️ 開発体験

- ホットリロード対応
- TypeScript による型安全性
- ESLint + Prettier によるコード品質管理
- Docker による環境統一
- Feature-First による保守性の高い構成

## 📝 ライセンス

MIT License
