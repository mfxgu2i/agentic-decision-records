# Lightweight Agentic RAG

ベクトルDBを立てるほどの規模でないキュレーション済みドキュメント群を、**Agentic Searchによる軽量なAgentic RAG**として成立させるアプローチ。自前のagentワークフローを一切実装せず、Claude Codeなどのコーディングエージェントのハーネスに乗せて、**Markdownと設定ファイルだけ**でナレッジ検索系を構成する。

📄 **正本は [IDEA.md](IDEA.md)** — 設計思想・システム構成・検索フロー・課題を1ファイルにまとめた本体ドキュメント。

## 仕組み（概要）

1. **ルーティング**: `AGENTS.md` が「Bundleの索引に載る主題に関わる判断はBundleを確認してから確定する」という参照ルールを常時ロードされる場所で宣言する
2. **検索**: 読取専用サブエージェントが「索引→grep→熟読」を反復し、逐語抜粋＋行番号付き出典＋実体ポインタを返す
3. **コンテキスト分離**: 探索ログはサブエージェント側に閉じ、依頼元は出典付きの回答だけを受け取る
4. **メンテナンス**: okf-add（本体＋索引＋履歴のワンセット更新）と okf-lint（適合・整合検査）が索引・メタデータの品質を維持する

なぜベクトル検索型RAGにしないか・設計の詳細は [IDEA.md](IDEA.md) を参照。

## リポジトリ構成

| パス | 内容 |
|---|---|
| [IDEA.md](IDEA.md) | **正本**。設計思想・システム構成・検索フロー・今後の課題を1ファイルに収録 |
| [docs/prior-art.md](docs/prior-art.md) | 関連する先行事例（Karpathy LLM Wiki等）との比較 |
| [template/](template/) | 自分のプロジェクトにコピーして使う雛形（空バンドル骨格＋設定一式） |
| [example/](example/) | 動く実例。架空のカフェサイト「Sakura Cafe」のナレッジバンドル＋コードスタブ |

## 5分で始める

### A. 実例を動かす

```bash
cd example/
claude   # Claude Codeを起動
```

試しに聞いてみる:

- 「予約フォームのバリデーション仕様を教えて」 → `specs/reservation-spec.md` が出典付きで返る
- 「メニュー画像が更新されないんだけど」 → 調査メモの原因とRunbookのキャッシュパージ手順にたどり着く
- 「予約APIのステータスコードを422に変えて」 → 下調べでBundleの落とし穴（フロントは400前提）が検出される
- 「lintして」 → okf-lintがバンドルの索引・frontmatter・Citationsの整合を検査する

### B. 自分のプロジェクトに入れる

```bash
cp -r template/ <your-workspace>/    # 雛形一式をコピー
```

そのあと3箇所を書き換える:

1. `AGENTS.md` — `<プロジェクト名>` 等のプレースホルダを自分のプロジェクトに合わせる
2. `knowledge/index.md` — バンドルのタイトルと説明
3. ナレッジを `knowledge/` に追加していく（Claude Codeで「このメモをokfに入れて」と言えば okf-add が索引・履歴ごと登録する）

バンドルのディレクトリ名を `knowledge/` から変える場合は `.claude/agents/okf-query.md` のGlobパターンも更新すること。

## 制約（Limitations）

- **検索トリガーはエージェントの自己認識に依存**する。検索漏れは誤答として現れ気づきにくい
- **セッションをまたぐと探索をやり直す**（モデルはステートレス）。コーパスがコンテキストに収まる規模なら全文プリロード（CAG）が代替になり得る
- **サブエージェント定義はClaude Code固有**。スキル（SKILL.md）は[オープン標準](https://github.com/agentskills/agentskills)のため他ハーネスでも動く見込みだが、サブエージェント定義は他ハーネスでは変換が必要
- 対象は**数十件規模のキュレーション済み文書**。規約が崩れたコーパスでは成り立たず、数百件規模に育つとリコール漏れが顕在化する

## 前提とする仕様

バンドルは **OKF (Open Knowledge Format) v0.1** に準拠する:
https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md

## 先行事例

近いのは [Karpathy の LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)（構造化Markdown wiki + Claude Codeによるagentic検索）。比較と他の関連事例は [docs/prior-art.md](docs/prior-art.md) を参照。

## License

[MIT](LICENSE)
