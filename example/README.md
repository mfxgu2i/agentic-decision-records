# example — Sakura Cafe

架空のカフェサイト「Sakura Cafe」を題材にした、Lightweight Agentic RAGの動く実例。

- `knowledge/` — OKFバンドル（仕様書・調査メモ・Runbook・OpenAPI参照資産）
- `sample-app/` — 文書のCitationsが指すコードスタブ（動作しない。裏取り先として実在させるためのダミー）
- `AGENTS.md` / `CLAUDE.md` / `.claude/agents/okf-query.md` — ワークスペース設定一式

## 動かし方

**このディレクトリ（example/）でClaude Codeを起動する**（リポジトリルートではない）:

```bash
cd example/
claude
```

試しに聞いてみる:

- 「予約フォームのバリデーション仕様を教えて」
- 「メニュー画像が更新されないんだけど」
- 「予約APIのステータスコードを422に変えて」（→ 下調べで落とし穴が検出される）
- 「lintして」

`knowledge/` ディレクトリ単体でClaude Codeを起動しても、同梱のokf-queryスキルで同じ検索ができる。

## 注意

`.claude/agents/okf-query.md`・`knowledge/.claude/skills/`・`knowledge/AGENTS.md` は
`../template/` と同一コピーを維持している（変更するときは両方に反映すること）。
このexampleに固有なのはナレッジ文書の中身と `sample-app/` のみ。
