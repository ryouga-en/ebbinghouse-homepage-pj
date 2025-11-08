# domain/agents/

エージェント関連のドメインロジック（ビジネスルール）を配置するディレクトリです。

## 目的

- **責務**: エージェントのビジネスルール、意思決定ロジック、制約の定義
- **特徴**: LangGraphやLLMの実装詳細に依存しない、純粋なビジネスロジック
- **テスト**: LLMなしでユニットテスト可能

## ディレクトリ構成

各エージェントごとにサブディレクトリを作成します。

```
agents/
├── <agent_name>/
│   ├── __init__.py
│   ├── entity.py    # エンティティ、値オブジェクト
│   └── service.py   # ビジネスロジック
└── README.md
```

## 配置するファイル

### `entity.py` - ドメインエンティティ
エージェントが扱うデータ構造の定義

```python
from dataclasses import dataclass
from typing import List

@dataclass
class AgentResult:
    """エージェント実行結果のエンティティ"""
    input_data: str
    output_data: List[str]
    metadata: dict
```

### `service.py` - ドメインサービス
エージェントのビジネスロジック（検証、判定、集約など）

```python
class AgentService:
    """エージェントのビジネスロジック"""

    @staticmethod
    def validate_input(input_data: str) -> bool:
        """入力データの妥当性を検証（ビジネスルール）"""
        # ビジネスルールに基づく検証
        pass

    @staticmethod
    def determine_strategy(input_data: str) -> str:
        """入力に応じて戦略を決定"""
        # ビジネスロジック
        pass

    @staticmethod
    def should_continue(result: AgentResult) -> bool:
        """処理を継続すべきか判定（ビジネスルール）"""
        # ビジネスルール
        pass
```

## 使い方

1. **新しいエージェントを追加する場合**
   ```bash
   mkdir app/domain/agents/<agent_name>
   touch app/domain/agents/<agent_name>/__init__.py
   touch app/domain/agents/<agent_name>/entity.py
   touch app/domain/agents/<agent_name>/service.py
   ```

2. **ビジネスロジックの配置基準**
   - ✅ 入力の検証ルール
   - ✅ 意思決定ロジック（次のアクション決定など）
   - ✅ 結果の集約・評価ルール
   - ✅ ビジネスに依存する判定基準
   - ❌ LLM呼び出し → `infrastructure/langgraph/` に配置
   - ❌ LangGraphのグラフ定義 → `infrastructure/langgraph/graphs/` に配置
   - ❌ データベース操作 → `repositories/` に配置

## 原則

- **純粋な関数**: 外部依存のない純粋なビジネスロジック
- **テスタビリティ**: LLMやDBなしでユニットテスト可能
- **再利用性**: 異なる実装（LangGraph以外）でも使える
