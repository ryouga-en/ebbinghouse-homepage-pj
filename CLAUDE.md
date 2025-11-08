# プロジェクトルール（Claude向け）

Claudeは、以下のルールに従ってコード提案・修正・説明を行ってください。
フロントエンドは **機能単位（feature-first）** で構成し、型とユーティリティの集中管理を徹底します。
特定フレームワーク名は例示に留め、プロジェクトに合わせて読み替えてください。

---

## フロントエンド・ディレクトリ指針（Feature-First）

```
FRONTEND/
├── app/          # Next.js App Router（ページ・ルーティング）
├── atoms/        # Jotai atoms（UI状態のみ）
├── stores/       # Zustand stores（アプリ状態）
├── features/     # 機能モジュール（views/components/hooks/api/types/utils）
├── shared/       # 横断資産
│   ├── api/      # 複数機能で使うAPIクライアント
│   ├── components/ # レイアウト・共通UI
│   ├── hooks/    # 複数機能で使うhooks
│   ├── providers/ # Context/Query providers
│   ├── types/    # 横断的な型定義（機能特化）
│   └── utils/    # 横断ユーティリティ
├── styles/       # グローバルスタイル
├── public/       # 静的アセット
└── （configs, scripts, data 等）
```

### `app/`（Next.js App Router）
- ページ・レイアウト・認証などの薄い責務のみ。UIや業務ロジックは `features/` に置く。
- 各ルートは対応する機能ビューに委譲（例: `app/(main)/foo/page → features/foo/FooView`）。

### `atoms/`（UI状態 - Jotai）
- **UI状態のみ**（サイドバー開閉、モーダル表示、ページスコープの一時状態）
- アプリ状態やサーバー状態は含めない

### `stores/`（アプリ状態 - Zustand）
- **アプリ全体で共有する状態**（認証、テーマ、言語設定）
- ビジネスロジックを含む状態管理
- 例: `stores/authStore.ts`, `stores/appStore.ts`

---

## 機能モジュール（`features/*`）

```
features/<feature-name>/
├── FeatureNameView.tsx  # 主要画面
├── components/          # 機能スコープのUI
├── hooks/               # React Query hooks（データ取得・更新）
├── api/                 # この機能専用のAPIクライアント
├── types/               # Props・ViewModel等の型
├── utils/               # 純粋関数（変換・整形・ビルダ）
└── （任意）data/, constants/ 等
```

**原則**
- **型は `types/` に集約**、コンポーネント内で再定義しない。
- **ヘルパーは `utils/`** に集約、UIとロジックを分離。
- **API配置**:
  - 最初は `features/<name>/api/` に配置
  - 2つ以上の機能から使われたら `shared/api/` に昇格
  - 認証など明らかに共有されるものは最初から `shared/api/`
- **hooks配置**:
  - 機能固有のReact Query hooks → `features/<name>/hooks/`
  - 複数機能で使うhooks → `shared/hooks/`

**例**
- `features/task/` → `TaskView` / `components/` / `hooks/useTaskList.ts` / `api/taskApi.ts` / `types/` / `utils/`
- `features/settings/` → `SettingView` / `components/` / `types/`

---

## 共有レイヤ（`shared/`）

```
shared/
├── api/           # 複数機能で使うAPIクライアント
│   └── auth.ts    # 認証API（複数機能から参照）
├── components/    # レイアウト・共通UI
│   ├── layout/    # AppShell, Header, Sidebar等
│   ├── ui/        # Button, Input等の再利用可能コンポーネント
│   └── icons/     # SVGアイコン
├── hooks/         # 複数機能で使うhooks
│   └── useAuth.ts # 認証用React Query hooks
├── providers/     # Context/Query providers
│   └── QueryProvider.tsx
├── types/         # 横断的な型定義（機能特化した名前）
│   ├── auth.ts    # 認証関連の型
│   ├── layout.ts  # レイアウト関連の型
│   └── app.ts     # アプリ共通の型
└── utils/         # 横断ユーティリティ
    ├── http.ts    # fetchJson等のHTTP関連
    └── auth.ts    # 認証関連ユーティリティ
```

**使い分け**
- **共有型（`shared/types/`）**: 複数機能から参照される正準定義
  - 機能に特化した名前を付ける（`api.ts` ではなく `auth.ts`, `user.ts` 等）
- **機能型（`features/*/types/`）**: その機能に閉じたPropsやViewモデル
- **共有化は「実際に複数機能から参照されてから」行う**（YAGNI原則）

---

## 状態管理の方針

このプロジェクトでは、状態の性質に応じて3つのライブラリを使い分けます。

### React Query（@tanstack/react-query）
- **用途**: サーバー状態の管理
- **配置**: `features/*/hooks/` または `shared/hooks/`
- **例**: ユーザーデータ取得、タスク一覧取得、ログイン・ログアウト
- **特徴**: キャッシング、リトライ、楽観的更新

### Zustand
- **用途**: アプリ全体の状態管理（ビジネスロジック付き）
- **配置**: `stores/`
- **例**: 認証状態、テーマ設定、言語設定
- **特徴**: シンプルなAPI、Redux DevTools対応

### Jotai
- **用途**: UI状態のみ
- **配置**: `atoms/`
- **例**: サイドバー開閉、モーダル表示、ページスコープの一時状態
- **特徴**: Atomic、軽量、派生atomのサポート

---

## コーディング規約

1. **インポート優先度**: `features/*` → `shared/*`。意図なき機能間依存を避ける。
2. **型定義の分離**:
   - コンポーネント内でinterfaceを定義しない
   - 機能固有の型 → `features/<name>/types/`
   - 横断的な型 → `shared/types/`（機能特化した名前: `auth.ts`, `layout.ts`）
3. **関数の分離**:
   - コンポーネント内のヘルパー関数は `utils/` に切り出す
   - API呼び出しは `api/` に集約
4. **API配置の基準**:
   - 最初は `features/<name>/api/` に配置
   - 2つ以上の機能から使われたら `shared/api/` に昇格
   - 型定義は `shared/types/<機能名>.ts` に配置
5. **再利用判断**: 早すぎる汎化は避け、実需要に基づき `shared/` へ昇格させる（YAGNI）
6. **一時コード**: `features/sample/` や `components_tmp*/` は検証専用。依存禁止
7. **構成変更**: フォルダ／型の追加・移動時は **本ドキュメントを更新**

---

## Claude への具体的指示

- **提案時は保存先フルパスを明記**（例: `features/user/hooks/useUserList.ts`）
- **重複防止**: 既存の `types/`・`utils/`・`api/` を探索し、同等機能があれば再利用を提案
- **責務分離**: コンポーネントから型定義・関数・APIクライアントを切り出すリファクタ案を優先提示
- **型定義の命名**: 汎用的な名前（`api.ts`, `types.ts`）ではなく、機能特化した名前（`auth.ts`, `user.ts`）を使用
- **状態管理**: 状態の性質に応じてReact Query/Zustand/Jotaiを適切に使い分ける
- **大きな変更**: 影響範囲（参照元ファイル）・置換手順・ロールバック手順を併記
- **依存追加／削除**: 理由・代替案・影響を簡潔に説明  

---

## 実装例

### 認証機能（横断的に使用）

```
stores/authStore.ts              # Zustand: 認証状態とビジネスロジック
shared/api/auth.ts               # APIクライアント（login, logout, refresh）
shared/types/auth.ts             # 型定義（LoginInput, LoginResponse等）
shared/utils/auth.ts             # ユーティリティ（getUserFromCookie等）
shared/hooks/useAuth.ts          # React Query hooks（useLoginMutation等）
```

### 機能固有の実装例

```
features/task/
├── TaskView.tsx                 # メイン画面
├── components/
│   └── TaskCard.tsx
├── hooks/
│   ├── useTaskList.ts           # React Query: タスク一覧取得
│   └── useTaskCreate.ts         # React Query: タスク作成
├── api/
│   └── taskApi.ts               # API関数（getTask, createTask等）
├── types/
│   ├── task.ts                  # Task型定義
│   └── props.ts                 # コンポーネントProps
└── utils/
    └── taskHelpers.ts           # タスク関連のヘルパー関数
```

### UI状態の管理

```
atoms/appState.ts                # Jotai: サイドバー開閉状態等のUI状態
```

---

## バックエンド・ディレクトリ指針（FastAPI - ハイブリッド構成）

複雑なビジネスロジックと複数API連携がある中〜大規模プロジェクト向けのハイブリッドアーキテクチャを採用します。

### ディレクトリ構成

```
BACKEND/
└── app/
    ├── api/
    │   └── routes/           # ルーティング定義のみ
    │       └── auth.py
    ├── crud/                 # シンプルなCRUD操作
    │   └── user.py           # 単純なDB操作（一覧取得、作成、更新、削除）
    ├── repositories/         # 複雑なDB操作の抽象化
    │   ├── base.py           # ベースリポジトリ
    │   └── user_repository.py # インターフェース + 実装
    ├── domain/               # ビジネスロジック
    │   ├── auth/
    │   │   ├── entity.py     # 認証に関するドメインエンティティ
    │   │   └── service.py    # 認証ビジネスロジック
    │   └── user/
    │       ├── entity.py
    │       └── service.py
    ├── services/             # アプリケーションサービス
    │   └── user_service.py   # 複数リポジトリ・外部API連携のオーケストレーション
    ├── models/
    │   └── db/               # SQLAlchemyモデル
    │       └── user.py
    ├── schemas/
    │   └── api/              # Pydanticスキーマ（API入出力）
    │       └── auth.py
    ├── core/
    │   ├── config.py         # 設定
    │   ├── database.py       # DB接続
    │   └── jwt.py            # JWT関連ユーティリティ
    └── main.py
```

### 各層の責務と使い分け

#### 1. `api/routes/` - プレゼンテーション層
- **責務**: HTTPリクエスト/レスポンスのハンドリングのみ
- **禁止**: ビジネスロジック、DB操作の直接記述
- **依存**: `services/`, `domain/*/service.py`, `schemas/`

```python
# api/routes/auth.py
@router.post("/login")
async def login(request: LoginRequest):
    user = auth_service.authenticate_user(request)  # domain/auth/service.py
    return {"user": user}
```

#### 2. `crud/` - シンプルなデータアクセス
- **用途**: 単純なCRUD操作（一覧、取得、作成、更新、削除）
- **使う場面**: 1つのテーブルに対する基本的な操作
- **使わない場面**: 複数テーブル結合、複雑な条件、トランザクション

```python
# crud/user.py
async def get_users(db: AsyncSession) -> List[User]:
    result = await db.execute(select(UserModel))
    return result.scalars().all()

async def create_user(db: AsyncSession, user: UserCreate) -> User:
    db_user = UserModel(**user.dict())
    db.add(db_user)
    await db.commit()
    return db_user
```

#### 3. `repositories/` - 複雑なデータアクセス
- **用途**: 複雑なクエリ、複数テーブル結合、集計、トランザクション
- **配置**: インターフェース + 実装を同じファイルに記述
- **メリット**: 抽象化、テスタビリティ、複雑なロジックの整理

```python
# repositories/user_repository.py
from abc import ABC, abstractmethod

class UserRepositoryInterface(ABC):
    @abstractmethod
    async def find_by_email(self, email: str) -> Optional[User]:
        """メールアドレスでユーザーを検索"""
        pass

    @abstractmethod
    async def find_active_users_with_tasks(self) -> List[UserWithTasks]:
        """アクティブなユーザーとそのタスクを取得（複雑なクエリ）"""
        pass

class UserRepository(UserRepositoryInterface):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def find_by_email(self, email: str) -> Optional[User]:
        result = await self.db.execute(
            select(UserModel).where(UserModel.email == email)
        )
        return result.scalar_one_or_none()

    async def find_active_users_with_tasks(self) -> List[UserWithTasks]:
        # 複雑な結合クエリと集約処理
        result = await self.db.execute(
            select(UserModel, TaskModel)
            .join(TaskModel, UserModel.id == TaskModel.user_id)
            .where(UserModel.is_active == True)
            .options(selectinload(UserModel.tasks))
        )
        return self._aggregate_results(result.all())
```

#### 4. `domain/` - ドメイン層（ビジネスロジック）
- **責務**: ビジネスルール、ドメインロジックの実装
- **特徴**: インフラ（DB、外部API）に依存しない純粋なロジック
- **構成**:
  - `entity.py`: ドメインエンティティ、値オブジェクト
  - `service.py`: ドメインサービス（エンティティ単体では表現できないロジック）

```python
# domain/auth/service.py
class AuthService:
    """認証に関するドメインサービス"""

    @staticmethod
    def validate_password(password: str) -> bool:
        """パスワードの妥当性を検証"""
        if len(password) < 8:
            return False
        if not re.search(r'[A-Z]', password):
            return False
        return True

    @staticmethod
    def hash_password(password: str) -> str:
        """パスワードをハッシュ化"""
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

# domain/user/entity.py
from dataclasses import dataclass
from typing import List

@dataclass
class User:
    """ユーザーエンティティ"""
    id: int
    email: str
    roles: List[str]

    def has_role(self, role: str) -> bool:
        """ロールを持っているか確認"""
        return role in self.roles

    def is_admin(self) -> bool:
        """管理者かどうか"""
        return "admin" in self.roles
```

#### 5. `services/` - アプリケーションサービス
- **用途**: 複数のリポジトリ・ドメインサービス・外部APIを組み合わせた処理
- **使う場面**:
  - 複数のリポジトリを跨ぐトランザクション
  - 外部API連携（メール送信、通知、決済等）
  - 複雑なワークフロー

```python
# services/user_service.py
class UserService:
    """ユーザー関連のアプリケーションサービス"""

    def __init__(
        self,
        user_repo: UserRepositoryInterface,
        email_service: EmailService,
        notification_service: NotificationService
    ):
        self.user_repo = user_repo
        self.email_service = email_service
        self.notification_service = notification_service

    async def register_user(self, data: UserCreate) -> User:
        """
        ユーザー登録のワークフロー
        - ユーザー作成（repository）
        - ウェルカムメール送信（外部API）
        - 管理者に通知（外部API）
        """
        # ドメインロジック
        if not AuthService.validate_password(data.password):
            raise ValueError("Invalid password")

        hashed_password = AuthService.hash_password(data.password)

        # リポジトリでDB操作
        user = await self.user_repo.create(data, hashed_password)

        # 外部API連携
        await self.email_service.send_welcome_email(user.email)
        await self.notification_service.notify_admin_new_user(user)

        return user
```

### crud/ と repositories/ の使い分け基準

| 操作の種類 | 使う層 | 例 |
|---|---|---|
| 単純な一覧取得 | `crud/` | ユーザー一覧 |
| ID指定で1件取得 | `crud/` | ユーザー詳細 |
| 新規作成（1テーブル） | `crud/` | ユーザー作成 |
| 更新・削除 | `crud/` | ユーザー更新 |
| 複数テーブル結合 | `repositories/` | ユーザー + タスク + プロジェクト |
| 複雑な検索条件 | `repositories/` | 期間指定 + ステータス + タグ検索 |
| 集計クエリ | `repositories/` | ユーザーごとのタスク完了率 |
| トランザクション | `repositories/` | 複数テーブルの一括更新 |

### domain/ と services/ の使い分け基準

| ロジックの種類 | 使う層 | 例 |
|---|---|---|
| ビジネスルール | `domain/service` | パスワード検証、料金計算 |
| エンティティのメソッド | `domain/entity` | ユーザーの権限チェック |
| 複数リポジトリの連携 | `services/` | ユーザー登録 + メール送信 |
| 外部API連携 | `services/` | 決済処理、通知送信 |
| 複雑なワークフロー | `services/` | 注文処理（在庫確認→決済→発送） |

### FastAPI プロジェクトの原則

1. **責務の明確化**: 各層の役割を明確にし、責務を超えた処理を書かない
2. **依存性逆転**: `repositories/` のインターフェースを活用してテスタビリティを向上
3. **段階的な複雑化**:
   - 最初は `crud/` で実装
   - 複雑になったら `repositories/` に移行
   - ビジネスロジックが増えたら `domain/` に切り出し
4. **YAGNI**: 必要になるまで複雑な層を導入しない
5. **一貫性**: 一度決めたパターンをプロジェクト内で一貫して使用

---

## LangGraph/LangChain統合時の拡張（オプション）

マルチエージェントシステムやAIワークフローが必要な場合のみ、以下のディレクトリを追加します。
**通常のAPI処理は既存のハイブリッド構成を使い続けます。**

### 拡張後のディレクトリ構成

```
BACKEND/
└── app/
    ├── api/
    │   └── routes/
    │       ├── auth.py              # 通常のAPI（認証）
    │       ├── user.py              # 通常のAPI（ユーザー管理）
    │       └── agents.py            # エージェントAPI（LangGraph使用時のみ）
    ├── crud/                        # 通常のシンプルCRUD
    │   └── user.py
    ├── repositories/                # 通常の複雑なクエリ
    │   ├── user_repository.py
    │   └── document_repository.py   # エージェント結果保存用（LangGraph使用時のみ）
    ├── domain/                      # ビジネスロジック
    │   ├── auth/                    # 通常のドメイン（認証）
    │   │   └── service.py
    │   ├── user/                    # 通常のドメイン（ユーザー）
    │   │   └── service.py
    │   └── agents/                  # エージェントドメイン（LangGraph使用時のみ）
    │       ├── research/
    │       │   ├── entity.py        # リサーチエージェントのエンティティ
    │       │   └── service.py       # リサーチエージェントのビジネスロジック
    │       └── analysis/
    │           ├── entity.py
    │           └── service.py
    ├── services/                    # アプリケーションサービス
    │   ├── user_service.py          # 通常のサービス
    │   └── agent_service.py         # エージェント利用サービス（LangGraph使用時のみ）
    ├── infrastructure/              # インフラ層（LangGraph使用時のみ）
    │   ├── langgraph/
    │   │   ├── graphs/              # LangGraphのグラフ定義
    │   │   │   ├── research_graph.py
    │   │   │   └── analysis_graph.py
    │   │   ├── nodes/               # グラフノードの実装
    │   │   │   ├── research_node.py
    │   │   │   └── analysis_node.py
    │   │   └── tools/               # LangChainツール
    │   │       ├── web_search.py
    │   │       └── document_processor.py
    │   └── llm/                     # LLMプロバイダー設定
    │       ├── openai_client.py
    │       └── anthropic_client.py
    ├── models/
    │   └── db/                      # SQLAlchemyモデル
    │       ├── user.py
    │       └── agent_result.py      # エージェント結果保存用（LangGraph使用時のみ）
    ├── schemas/
    │   └── api/                     # Pydanticスキーマ
    │       ├── auth.py
    │       └── agents.py            # エージェントAPI用スキーマ（LangGraph使用時のみ）
    ├── core/
    │   ├── config.py
    │   ├── database.py
    │   └── jwt.py
    └── main.py
```

### LangGraph拡張層の責務

#### 1. `domain/agents/` - エージェントのドメインロジック（ビジネスルール）
- **責務**: エージェントの目的、制約、意思決定ロジックの定義
- **特徴**: LangGraphの実装詳細に依存しない、純粋なビジネスロジック
- **使用例**: クエリの妥当性検証、リサーチの深さ決定、結果の集約ルール

```python
# domain/agents/research/service.py
from dataclasses import dataclass
from typing import List

@dataclass
class ResearchResult:
    """リサーチ結果のドメインエンティティ"""
    query: str
    findings: List[str]
    sources: List[str]
    confidence: float

class ResearchAgentService:
    """リサーチエージェントのビジネスロジック"""

    @staticmethod
    def validate_query(query: str) -> bool:
        """クエリの妥当性を検証（ビジネスルール）"""
        if len(query) < 3:
            return False
        if query.strip() == "":
            return False
        return True

    @staticmethod
    def determine_research_depth(query: str) -> str:
        """クエリの複雑度に応じてリサーチの深さを決定（ビジネスルール）"""
        if "詳細" in query or "詳しく" in query:
            return "deep"
        elif "概要" in query or "簡単に" in query:
            return "shallow"
        return "medium"

    @staticmethod
    def should_continue_research(result: ResearchResult) -> bool:
        """リサーチを継続すべきか判定（ビジネスルール）"""
        return result.confidence < 0.8
```

#### 2. `infrastructure/langgraph/graphs/` - LangGraphの実装
- **責務**: LangGraphを使ったグラフ構築、ノード定義、エッジ定義
- **特徴**: ドメインロジックを呼び出し、LangGraphのAPIに適合させる
- **使用例**: StateGraph構築、条件分岐、LLM呼び出し

```python
# infrastructure/langgraph/graphs/research_graph.py
from langgraph.graph import StateGraph, END
from typing import TypedDict
from domain.agents.research.service import ResearchAgentService, ResearchResult
from infrastructure.llm.openai_client import OpenAIClient

class ResearchState(TypedDict):
    """リサーチグラフの状態"""
    query: str
    depth: str
    results: list
    iteration: int

class ResearchGraph:
    """リサーチエージェントのLangGraph実装"""

    def __init__(self, llm_client: OpenAIClient):
        self.llm_client = llm_client
        self.agent_service = ResearchAgentService()
        self.graph = self._build_graph()

    def _build_graph(self) -> StateGraph:
        """グラフの構築"""
        workflow = StateGraph(ResearchState)

        # ノードの追加
        workflow.add_node("validate", self._validate_node)
        workflow.add_node("research", self._research_node)
        workflow.add_node("aggregate", self._aggregate_node)

        # エッジの追加
        workflow.set_entry_point("validate")
        workflow.add_edge("validate", "research")
        workflow.add_conditional_edges(
            "research",
            self._should_continue,
            {
                "continue": "research",
                "aggregate": "aggregate"
            }
        )
        workflow.add_edge("aggregate", END)

        return workflow.compile()

    def _validate_node(self, state: ResearchState) -> ResearchState:
        """検証ノード（ドメインロジックを呼び出し）"""
        if not self.agent_service.validate_query(state["query"]):
            raise ValueError("Invalid query")

        depth = self.agent_service.determine_research_depth(state["query"])
        return {**state, "depth": depth}

    def _research_node(self, state: ResearchState) -> ResearchState:
        """リサーチノード（LLM呼び出し）"""
        result = self.llm_client.research(state["query"], depth=state["depth"])
        state["results"].append(result)
        state["iteration"] += 1
        return state

    def _should_continue(self, state: ResearchState) -> str:
        """継続判定（ドメインロジックを呼び出し）"""
        if state["iteration"] >= 3:
            return "aggregate"
        last_result = state["results"][-1]
        if self.agent_service.should_continue_research(last_result):
            return "continue"
        return "aggregate"

    def _aggregate_node(self, state: ResearchState) -> ResearchState:
        """集約ノード"""
        return state
```

#### 3. `infrastructure/langgraph/tools/` - LangChainツール
- **責務**: 外部ツール（Web検索、ドキュメント処理等）の実装
- **特徴**: LangChainのToolインターフェースに準拠

```python
# infrastructure/langgraph/tools/web_search.py
from langchain.tools import Tool

class WebSearchTool:
    """Web検索ツール"""

    def __init__(self, api_key: str):
        self.api_key = api_key

    def search(self, query: str, num_results: int = 5) -> str:
        """Web検索を実行"""
        # 検索API呼び出し
        pass

    def as_tool(self) -> Tool:
        """LangChain Toolとして返す"""
        return Tool(
            name="web_search",
            description="Search the web for information",
            func=self.search
        )
```

#### 4. `infrastructure/llm/` - LLMクライアント
- **責務**: LLMプロバイダー（OpenAI, Anthropic等）の抽象化
- **特徴**: プロバイダーごとの差異を吸収

```python
# infrastructure/llm/openai_client.py
from openai import AsyncOpenAI
from typing import Dict, Any

class OpenAIClient:
    """OpenAI LLMクライアント"""

    def __init__(self, api_key: str, model: str = "gpt-4"):
        self.client = AsyncOpenAI(api_key=api_key)
        self.model = model

    async def chat(self, messages: list, **kwargs) -> str:
        """チャット補完"""
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            **kwargs
        )
        return response.choices[0].message.content

    async def research(self, query: str, depth: str) -> Dict[str, Any]:
        """リサーチタスクの実行"""
        # LLMを使ってリサーチ
        pass
```

#### 5. `services/agent_service.py` - エージェント利用のアプリケーションサービス
- **責務**: エージェントとDB、外部APIを組み合わせた処理のオーケストレーション
- **特徴**: 通常のサービス層と同じパターン（複数コンポーネント連携）

```python
# services/agent_service.py
from infrastructure.langgraph.graphs.research_graph import ResearchGraph
from repositories.document_repository import DocumentRepository
from domain.agents.research.service import ResearchResult

class AgentService:
    """エージェント関連のアプリケーションサービス"""

    def __init__(
        self,
        research_graph: ResearchGraph,
        document_repo: DocumentRepository
    ):
        self.research_graph = research_graph
        self.document_repo = document_repo

    async def execute_research_task(
        self,
        query: str,
        user_id: int
    ) -> ResearchResult:
        """
        リサーチタスクの実行
        - エージェントでリサーチ（LangGraph）
        - 結果をDBに保存（Repository）
        - ユーザーに通知（外部API）
        """
        # LangGraphでリサーチ実行
        result = await self.research_graph.graph.ainvoke({
            "query": query,
            "depth": "medium",
            "results": [],
            "iteration": 0
        })

        # 結果をDBに保存
        await self.document_repo.save_research_result(
            user_id=user_id,
            query=query,
            result=result
        )

        return result
```

### 通常APIとLangGraph APIの共存パターン

```python
# api/routes/user.py（通常のAPI）
from fastapi import APIRouter
from services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/")
async def get_users():
    # 通常のサービス → リポジトリ → DB
    return await user_service.get_all_users()

# api/routes/agents.py（LangGraph使用）
from fastapi import APIRouter
from services.agent_service import AgentService

router = APIRouter(prefix="/agents", tags=["agents"])

@router.post("/research")
async def research(query: str, user_id: int):
    # エージェントサービス → LangGraph → DB保存
    return await agent_service.execute_research_task(query, user_id)
```

### LangGraph統合時の原則

1. **ドメインロジックの分離**: ビジネスロジックは`domain/agents/`に、LangGraphの実装は`infrastructure/langgraph/`に
2. **依存性逆転**: ドメイン層はLangGraphに依存しない
3. **テスタビリティ**: ドメインロジックはLLMなしでユニットテスト可能
4. **段階的な導入**:
   - まずは通常のハイブリッド構成で開発
   - LangGraphが必要になったら`infrastructure/langgraph/`を追加
   - エージェント固有のビジネスロジックが生まれたら`domain/agents/`を追加
5. **YAGNI**: LangGraphを使わない機能には追加ディレクトリを作らない
6. **一貫性**: 通常のAPIもエージェントAPIも同じ層の責務に従う

---

## ドキュメントの同期

実際のディレクトリ構成と乖離が生じたら、**本ドキュメントを更新** してください。
エディタやAI補完の精度向上、オンボーディング時間削減に直結します。
必要に応じて、用語（例: View, hooks, types, utils の拡張子や命名）やルータの名称は、採用しているフレームワークに合わせて置換してください。