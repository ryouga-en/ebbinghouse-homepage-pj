FROM ghcr.io/astral-sh/uv:python3.11-bookworm-slim
WORKDIR /app
ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1

# 依存はロック固定・dev除外
COPY pyproject.toml uv.lock ./
RUN --mount=type=cache,target=/root/.cache/uv uv sync --locked --no-dev

# ソース
COPY . .

EXPOSE 8000
# 本番: リロードなし、ワーカー指定、プロキシヘッダ
ENV UVICORN_WORKERS=2
CMD ["uv","run","uvicorn","app.main:app","--host","0.0.0.0","--port","8000","--workers","2","--proxy-headers"]
