# Agentic Knowledge Bundle

A lightweight way for coding agents to accumulate and reference curated Markdown knowledge — no vector DB, no pre-indexing, no custom code.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Documentation

📄 設計思想・システム構成・今後の課題は正本 [IDEA.md](IDEA.md) に収録。先行事例との比較は [docs/prior-art.md](docs/prior-art.md) を参照。

## About

ベクトルDBを立てるほどの規模でないキュレーション済みドキュメント群を、**Agentic Searchによる軽量なAgentic RAG**として成立させるアプローチ。自前のagentワークフローを一切実装せず、Claude Codeなどのコーディングエージェントのハーネスに乗せて、**Markdownと設定ファイルだけ**でナレッジの蓄積・参照系を構成する。コーディングエージェント向けの設計で、作業しながら得た知見をokf-addで蓄積し、次の作業でokf-queryを通じて効率よく参照する、という単一のループを回す。

## Philosophy

### 事前インデックスを持たない

エージェントが「索引で当たりをつける → grepで絞る → 該当文書を全文read」を反復するAgentic Searchで検索する。再インデックス不要で常に最新のファイル状態が検索され、出典パス付きで回答が検証できる。

### 自前実装ゼロ

エージェントループ・ツール実行・サブエージェント分離はコーディングエージェントのハーネスをそのまま使う。実体はMarkdown（ナレッジ）と設定ファイル（エージェント定義・スキル）のみ。

### 規約が検索品質を担保する

バンドルは [OKF (Open Knowledge Format) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) に準拠する。良質な索引・frontmatter・1ファイル1トピックという規約が、ベクトル検索型RAGが埋め込みで補おうとする問題を構造側で先に解決する。

## How It Works

ワークスペースルートの`.claude/`が検索・蓄積・保守のツール一式を持ち、バンドル（`knowledge/`）は純粋なコーパスとして扱う。

1. **蓄積**: 作業中に得た知見を okf-add スキルで登録する。文書本体＋索引＋履歴をワンセットで更新し、OKF適合（frontmatter・非空 `type`）を保つ
2. **ルーティング**: `AGENTS.md` が「Bundleの索引に載る主題に関わる判断はBundleを確認してから確定する」という参照ルールを常時ロードされる場所で宣言する
3. **検索**: okf-query サブエージェントが「索引→grep→熟読」を反復し、逐語抜粋＋行番号付き出典＋実体ポインタを返す。探索ログはサブエージェント側に閉じ、依頼元は出典付きの回答だけを受け取る
4. **保守**: okf-lint スキルが索引の過不足・説明文のずれ・Citations欠落などを検査し、機械的な不整合を修正する

## Repository Structure

| パス | 内容 |
|---|---|
| [IDEA.md](IDEA.md) | **正本**。設計思想・システム構成・今後の課題を1ファイルに収録 |
| [docs/prior-art.md](docs/prior-art.md) | 関連する先行事例（Karpathy LLM Wiki等）との比較 |
| [template/](template/) | 自分のプロジェクトにコピーして使う雛形（空バンドル骨格＋設定一式） |
| [example/](example/) | 動く実例。架空のカフェサイト「Sakura Cafe」のナレッジバンドル＋コードスタブ |

## Quick Start

### Try the example

```bash
cd example/
claude   # Claude Codeを起動
```

試しに聞いてみる:

- 「予約フォームのバリデーション仕様を教えて」 → `specs/reservation-spec.md` が出典付きで返る
- 「メニュー画像が更新されないんだけど」 → 調査メモの原因とRunbookのキャッシュパージ手順にたどり着く
- 「予約APIのステータスコードを422に変えて」 → 下調べでBundleの落とし穴（フロントは400前提）が検出される
- 「lintして」 → okf-lintがバンドルの索引・frontmatter・Citationsの整合を検査する

### Use in your project

```bash
cp -r template/ <your-workspace>/    # 雛形一式をコピー
```

そのあと3箇所を書き換える:

1. `AGENTS.md` — `<プロジェクト名>` 等のプレースホルダを自分のプロジェクトに合わせる
2. `knowledge/index.md` — バンドルのタイトルと説明
3. ナレッジを `knowledge/` に追加していく（Claude Codeで「このメモをokfに入れて」と言えば okf-add が索引・履歴ごと登録する）

バンドルのディレクトリ名を `knowledge/` から変える場合は、`.claude/agents/okf-query.md`・`.claude/skills/okf-add/`・`.claude/skills/okf-lint/` のGlobパターンをすべて更新すること。

## Limitations

- **検索トリガーはエージェントの自己認識に依存**する。検索漏れは誤答として現れ気づきにくい
- **セッションをまたぐと探索をやり直す**（モデルはステートレス）。コーパスがコンテキストに収まる規模なら全文プリロード（CAG）が代替になり得る
- **サブエージェント定義はClaude Code固有**。スキル（SKILL.md）は[オープン標準](https://github.com/agentskills/agentskills)のため他ハーネスでも動く見込みだが、サブエージェント定義は他ハーネスでは変換が必要
- **バンドルはワークスペース側の`.claude/`（検索・蓄積・保守ツール一式）に依存する**。バンドルだけを取り出して単独で使うことはできない
- 対象は**数十件規模のキュレーション済み文書**。規約が崩れたコーパスでは成り立たず、数百件規模に育つとリコール漏れが顕在化する

## Prior Art

近いのは [Karpathy の LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)（構造化Markdown wiki + Claude Codeによるagentic検索）。比較と他の関連事例は [docs/prior-art.md](docs/prior-art.md) を参照。

## License

[MIT](LICENSE)
