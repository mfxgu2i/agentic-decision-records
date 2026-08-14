# Agentic Knowledge Bundle

A lightweight way for coding agents to accumulate and reference curated Markdown knowledge — no vector DB, no pre-indexing, no custom code.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Documentation

📄 設計思想・システム構成は [IDEA.md](IDEA.md) に収録。
関連する先行事例・研究へのポインタは [docs/prior-art.md](docs/prior-art.md) に収録。

## About

ベクトルDBを立てるほどの規模でないキュレーション済みドキュメント群を、Agentic Searchによる軽量なAgentic RAGとして成立させるアプローチ。自前のagentワークフローを一切実装せず、Claude Codeなどのコーディングエージェントのハーネスに乗せて、Markdownと設定ファイルだけでナレッジの蓄積・参照系を構成する。コーディングエージェント向けの設計で、作業しながら得た知見をokf-addで蓄積し、次の作業でokf-queryを通じて効率よく参照するという単一のループを回す。

## Philosophy

### 事前インデックスを持たない

エージェントが「索引で当たりをつける → grepで絞る → 該当文書を全文read」を反復するAgentic Searchで検索する。再インデックス不要で常に最新のファイル状態が検索され、出典パス付きで回答が検証できる。

### 自前実装ゼロ

エージェントループ・ツール実行・サブエージェント分離はコーディングエージェントのハーネスをそのまま使う。実体はナレッジのMarkdownと、エージェント定義・スキルの設定ファイルだけ。

### OKFが検索品質を担保する

バンドルは [OKF (Open Knowledge Format) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/ee67a5ca27/okf/SPEC.md) に準拠する。良質な索引・frontmatter・1ファイル1トピックという規約が、ベクトル検索型RAGが埋め込みで補おうとする問題を構造側で先に解決する。

## How It Works

ワークスペースルートの`.claude/`が検索・蓄積・保守のツール一式を持ち、バンドルの`knowledge/`は純粋なコーパスとして扱う。

### 1. 蓄積
作業中に得た知見を okf-add スキルで登録する。文書本体・索引・履歴をワンセットで更新し、frontmatterと非空の `type` というOKF適合条件を保つ
### 2. ルーティング
`AGENTS.md` が `knowledge/index.md` を `@import` して収録トピック一覧を常時ロードし、「このトピックに関わる判断はBundleを確認してから確定する」という参照ルールを宣言する
### 3. 検索
okf-query サブエージェントが「索引→grep→熟読」を反復し、逐語抜粋と行番号付き出典、実体ポインタを返す。探索ログはサブエージェント側に閉じ、依頼元は出典付きの回答だけを受け取る
### 4. 保守
okf-lint スキルが索引の過不足・説明文のずれ・Citations欠落などを検査し、機械的な不整合を修正する

## Repository Structure

| パス | 内容 |
|---|---|
| [IDEA.md](IDEA.md) | 正本。設計思想・システム構成・今後の課題を1ファイルに収録 |
| [docs/prior-art.md](docs/prior-art.md) | 関連する先行事例・研究・実装へのポインタ集 |
| [template/](template/) | 自分のプロジェクトにコピーして使う雛形。空のバンドル骨格と設定一式 |
| [example/](example/) | 動く実例。架空のカフェサイト「Sakura Cafe」のナレッジバンドルとコードスタブ |

## Quick Start

### 実例を動かす

```bash
cd example/
claude   # Claude Codeを起動
```

試しに聞いてみる:

- 「予約フォームのバリデーション仕様を教えて」 → `specs/reservation-spec.md` 経由で実体の `_references/reservation-api.yaml` にたどり着く
- 「メニュー画像が更新されないんだけど」 → 調査メモの原因とRunbookのキャッシュパージ手順にたどり着く
- 「予約APIのステータスコードを422に変えて」 → 下調べでBundleの落とし穴を検出する。フロントは400前提で書かれている
- 「lintして」 → okf-lintがバンドルの索引・frontmatter・Citationsの整合を検査する

### 自分のプロジェクトで使う

```bash
cp -r template/ <your-workspace>/    # 雛形一式をコピー
```

そのあと3箇所を書き換える:

1. `AGENTS.md` — `<プロジェクト名>` 等のプレースホルダを自分のプロジェクトに合わせる
2. `knowledge/index.md` — バンドルのタイトルと説明
3. ナレッジを `knowledge/` に追加していく。Claude Codeで「このメモをokfに入れて」と言えば okf-add が索引・履歴ごと登録する

バンドルのディレクトリ名を `knowledge/` から変える場合は、`.claude/skills/okf-query/`・`.claude/skills/okf-add/`・`.claude/skills/okf-lint/` のGlobパターンをすべて更新すること。

## Limitations

- 検索トリガーはエージェントの自己認識に依存する。検索漏れは誤答として現れ気づきにくい
- セッションをまたぐと探索をやり直す。モデルはステートレスなため。コーパスがコンテキストに収まる規模なら全文プリロードのCAGが代替になり得る
- サブエージェント定義はClaude Code固有。スキルのSKILL.mdは[オープン標準](https://github.com/agentskills/agentskills)のため他ハーネスでも動く見込みだが、サブエージェント定義は変換が必要
- 対象は数十件規模のキュレーション済み文書。規約が崩れたコーパスでは成り立たず、数百件規模に育つとリコール漏れが顕在化する

## Prior Art

近いのは [Karpathy の LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)。構造化Markdown wikiをClaude Codeでagentic検索する。他の関連事例へのポインタは [docs/prior-art.md](docs/prior-art.md) を参照。

## License

[MIT](LICENSE)
