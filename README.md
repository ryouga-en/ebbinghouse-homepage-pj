# SPA Monorepo Template

Next.js (Frontend) + FastAPI (Backend) のモノレポ構成のテンプレートプロジェクトです。

## 🏗️ アーキテクチャ

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python 3.11 + uv
- **認証**: JWT + HttpOnly Cookie + BFF (Backend for Frontend)
- **コンテナ**: Docker + Docker Compose

## 📋 前提条件

- Docker & Docker Compose
- Make (Windows の場合は WSL または Git Bash 推奨)

## 🚀 環境構築手順

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd spa_monorepo_template
```

### 2. 環境変数の設定

`.env` ファイルを作成し、以下の内容を設定してください：

```env
# プロジェクト名
PROJECT_NAME=spa_monorepo_template

# バックエンド設定
BACKEND_INTERNAL_URL=http://backend:8000
CORS_ALLOW_ORIGINS=http://localhost:3000

# JWT設定
JWT_SECRET=your-secret-key-here
JWT_ISSUER=elsia-demo
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
| **管理者** | admin@example.com | adminpass | 管理者権限 | 🔴 赤 (#ef4444) |
| **一般ユーザー** | user@example.com | userpass | 一般ユーザー権限 | 🔵 青 (#3b82f6) |

### アカウント詳細

#### 管理者アカウント (admin@example.com)
- **パスワード**: adminpass
- **権限**: admin
- **機能**: 
  - 全機能へのアクセス
  - 管理者専用機能（将来実装予定）
  - 赤いブランドカラーで表示
- **用途**: システム管理者、開発者向け

#### 一般ユーザーアカウント (user@example.com)
- **パスワード**: userpass
- **権限**: standard
- **機能**:
  - 基本機能へのアクセス
  - 一般ユーザー向け機能
  - 青いブランドカラーで表示
- **用途**: エンドユーザー向け

### ログイン手順

1. ブラウザで `http://localhost:3000/login` にアクセス
2. 上記のメールアドレスとパスワードでログイン
3. ロールに応じてブランドカラーが変更されます
4. ログイン後は自動的にメイン画面にリダイレクトされます

### セキュリティ注意事項

⚠️ **重要**: これらのアカウント情報はデモ用です。本番環境では必ず変更してください。

- パスワードは本番環境で強力なものに変更
- ユーザー情報はデータベースに保存することを推奨
- 本格的な認証システム（OAuth、LDAP等）の導入を検討

## 📁 プロジェクト構成

```
spa_monorepo_template/
├── FRONTEND/                 # Next.js フロントエンド
│   ├── app/                  # App Router
│   ├── components/           # React コンポーネント
│   ├── lib/                  # ユーティリティ
│   ├── organisms/            # AppShell (状態管理)
│   └── Dockerfile
├── BACKEND/                  # FastAPI バックエンド
│   ├── app/                  # アプリケーション
│   │   ├── api/              # API ルーター
│   │   ├── core/             # コア設定
│   │   └── main.py           # エントリーポイント
│   ├── migrations/           # データベースマイグレーション
│   └── Dockerfile
├── docker-compose.yaml       # Docker Compose 設定
├── Makefile                  # 開発用コマンド
└── README.md
```

## 🎨 機能

### 認証機能
- JWT ベースの認証
- HttpOnly Cookie によるセキュアなトークン管理
- ロールベースのアクセス制御 (admin/standard)
- 自動トークンリフレッシュ

### UI/UX
- レスポンシブデザイン
- ダークモード対応
- ロール別ブランドカラー
- サイドバー開閉機能
- リサイズ可能な右サイドバー

### 開発体験
- ホットリロード
- TypeScript 型安全性
- ESLint + Prettier
- Docker による環境統一

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

