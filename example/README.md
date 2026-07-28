# example — Sakura Cafe

架空のカフェサイト「Sakura Cafe」を題材にした、Agentic Knowledge Bundleの動く実例。

- `knowledge/` — OKFバンドル（仕様書・調査メモ・Runbook・OpenAPI参照資産。純粋なコーパスでツールは同梱しない）
- `sample-app/` — 文書のCitationsが指すコードスタブ（動作しない。裏取り先として実在させるためのダミー）
- `AGENTS.md` / `CLAUDE.md` / `.claude/` — ワークスペース設定一式（検索サブエージェント・追加/lintスキル）

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

## 注意

`.claude/`（agents/okf-query.md・skills/okf-add/・skills/okf-lint/）と `knowledge/AGENTS.md` は
`../template/` と同一コピーを維持している（変更するときは両方に反映すること）。
このexampleに固有なのはナレッジ文書の中身と `sample-app/` のみ。
