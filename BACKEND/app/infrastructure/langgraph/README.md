# infrastructure/langgraph/

LangGraphの実装詳細を配置するディレクトリです。

## 目的

- **責務**: LangGraphを使ったグラフ構築、ノード実装、ツール実装
- **特徴**: `domain/agents/` のビジネスロジックを呼び出し、LangGraphのAPIに適合させる
- **依存**: LangGraph、LangChain、LLMクライアント

## ディレクトリ構成

```
langgraph/
├── graphs/        # LangGraphのグラフ定義
├── nodes/         # グラフノードの実装
└── tools/         # LangChainツール
```

## graphs/ - グラフ定義

StateGraphの構築、ノード・エッジの追加を行います。

```python
# graphs/research_graph.py
from langgraph.graph import StateGraph, END
from typing import TypedDict
from domain.agents.research.service import ResearchAgentService

class ResearchState(TypedDict):
    query: str
    results: list

class ResearchGraph:
    def __init__(self, llm_client):
        self.llm_client = llm_client
        self.agent_service = ResearchAgentService()  # ドメインサービス
        self.graph = self._build_graph()

    def _build_graph(self) -> StateGraph:
        workflow = StateGraph(ResearchState)

        # ノードの追加
        workflow.add_node("validate", self._validate_node)
        workflow.add_node("research", self._research_node)

        # エッジの追加
        workflow.set_entry_point("validate")
        workflow.add_edge("validate", "research")
        workflow.add_edge("research", END)

        return workflow.compile()

    def _validate_node(self, state: ResearchState):
        # ドメインロジックを呼び出し
        if not self.agent_service.validate_query(state["query"]):
            raise ValueError("Invalid query")
        return state
```

## nodes/ - ノード実装

複雑なノードロジックを分離する場合に使用します。

```python
# nodes/research_node.py
from infrastructure.llm.openai_client import OpenAIClient

class ResearchNode:
    def __init__(self, llm_client: OpenAIClient):
        self.llm_client = llm_client

    async def execute(self, state):
        # LLM呼び出し
        result = await self.llm_client.research(state["query"])
        state["results"].append(result)
        return state
```

## tools/ - LangChainツール

外部ツール（Web検索、API呼び出し等）を実装します。

```python
# tools/web_search.py
from langchain.tools import Tool

class WebSearchTool:
    def __init__(self, api_key: str):
        self.api_key = api_key

    def search(self, query: str) -> str:
        # Web検索の実装
        pass

    def as_tool(self) -> Tool:
        return Tool(
            name="web_search",
            description="Search the web",
            func=self.search
        )
```

## 使い方

1. **新しいグラフを追加**
   ```bash
   touch app/infrastructure/langgraph/graphs/<graph_name>.py
   ```

2. **新しいツールを追加**
   ```bash
   touch app/infrastructure/langgraph/tools/<tool_name>.py
   ```

## 原則

- ✅ ビジネスロジックは `domain/agents/` のサービスを呼び出す
- ✅ LLM呼び出しはこの層で行う
- ✅ グラフ構築・ノード定義はこの層で行う
- ❌ ビジネスルールをハードコードしない → `domain/agents/service.py` に配置
