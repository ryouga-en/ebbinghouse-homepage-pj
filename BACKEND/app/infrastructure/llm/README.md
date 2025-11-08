# infrastructure/llm/

LLMプロバイダー（OpenAI, Anthropic等）の抽象化レイヤーです。

## 目的

- **責務**: LLMプロバイダーごとの差異を吸収
- **特徴**: プロバイダー固有のAPIを共通インターフェースに変換
- **利点**: プロバイダーを切り替えやすく、テストしやすい

## ファイル構成

```
llm/
├── openai_client.py       # OpenAI実装
├── anthropic_client.py    # Anthropic実装
└── base.py                # 共通インターフェース（オプション）
```

## 実装例

### OpenAIクライアント

```python
# openai_client.py
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
        """リサーチタスク（カスタムメソッド）"""
        messages = [
            {"role": "system", "content": "You are a research assistant."},
            {"role": "user", "content": f"Research: {query} (depth: {depth})"}
        ]
        result = await self.chat(messages)
        return {
            "findings": result,
            "confidence": 0.85
        }
```

### Anthropicクライアント

```python
# anthropic_client.py
from anthropic import AsyncAnthropic
from typing import Dict, Any

class AnthropicClient:
    """Anthropic LLMクライアント"""

    def __init__(self, api_key: str, model: str = "claude-3-5-sonnet-20241022"):
        self.client = AsyncAnthropic(api_key=api_key)
        self.model = model

    async def chat(self, messages: list, **kwargs) -> str:
        """チャット補完"""
        response = await self.client.messages.create(
            model=self.model,
            messages=messages,
            **kwargs
        )
        return response.content[0].text
```

## 使い方

### 1. DIで注入する

```python
# main.py
from infrastructure.llm.openai_client import OpenAIClient
from infrastructure.langgraph.graphs.research_graph import ResearchGraph

llm_client = OpenAIClient(api_key="sk-...")
research_graph = ResearchGraph(llm_client=llm_client)
```

### 2. プロバイダーを切り替える

```python
# 開発環境ではOpenAI
if env == "development":
    llm_client = OpenAIClient(api_key="...")
# 本番環境ではAnthropic
else:
    llm_client = AnthropicClient(api_key="...")
```

### 3. テスト用のモックを作成

```python
# tests/mocks/llm_client_mock.py
class MockLLMClient:
    async def chat(self, messages: list, **kwargs) -> str:
        return "Mocked response"

    async def research(self, query: str, depth: str):
        return {
            "findings": ["Mock finding 1", "Mock finding 2"],
            "confidence": 0.9
        }
```

## 原則

- ✅ プロバイダー固有のAPIをラップする
- ✅ 共通のインターフェースを提供
- ✅ 非同期処理（async/await）を使用
- ❌ ビジネスロジックを含めない → `domain/agents/` に配置
