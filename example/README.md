# example — Sakura Cafe

架空のカフェサイト「Sakura Cafe」を題材にした、Agentic Knowledge Bundleの動く実例。

- `knowledge/` — OKFバンドル。仕様書・調査メモ・Runbook・OpenAPI参照資産が入る。純粋なコーパスでツールは同梱しない
- `sample-app/` — 文書のCitationsが指すコードスタブ。動作しない。裏取り先として実在させるためのダミー
- `AGENTS.md` / `CLAUDE.md` / `.claude/` — ワークスペース設定一式。検索サブエージェントと、追加・lintスキル

## 動かし方

リポジトリルートではなく、このディレクトリでClaude Codeを起動する:

```bash
cd example/
claude
```

試しに聞いてみる:

- 「予約フォームのバリデーション仕様を教えて」
- 「メニュー画像が更新されないんだけど」
- 「予約APIのステータスコードを422に変えて」 → 下調べで落とし穴が検出される
- 「lintして」

## 注意

`.claude/` 配下の agents/okf-query.md・skills/okf-add/・skills/okf-lint/・skills/okf-query/ と、
`knowledge/AGENTS.md`・`knowledge/CLAUDE.md` は `../template/` と同一コピーを維持している。
変更するときは両方に反映すること。
執筆・更新の規約はスキル側の `.claude/skills/` が持ち、`knowledge/AGENTS.md` は
バンドルを読むための構造説明に限定している。
このexampleに固有なのはナレッジ文書の中身と `sample-app/` だけ。
