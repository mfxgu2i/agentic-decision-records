# Agentic Decision Record

Project decisions and their reasons, written by coding agents and curated by humans — kept as plain Markdown in your repo. No database, no dependencies beyond Node.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## About

プロジェクト内の決定とその理由を、エージェントが書き残す仕組みです。決定はMarkdownでリポジトリに記録し、人間もコーディングエージェントも同じ記録を参照します。決定記録には一般的なADRにならったステータスがあり、確定した決定事項のほか、議論中の論点と結論が出るまでの取り決め、採用を見送った案も記録できます。

記録の本文はエージェントが書きますが、何を記録として残すかは人間が判断します。エージェントはセッション開始時に索引を読み込み、関連する記録を確認したうえで作業を進めます。セッションが切り替わっても、別の作業者やハーネスに引き継いでも、同じ前提を保ったまま作業を再開できます。

### 記録しないもの

記録するのは、ほかに正本の置き場がない決定事項とその理由、および結論の出ていない論点だけです。
次のものは残しません。

| 残さないもの | 置き場 |
|---|---|
| 個人の好み、作業の進め方 | ハーネスのメモリ |
| コードの意図、変更の経緯 | コード、Git |
| 担当者や期限を持つ作業、方針決定を伴わない不具合 | 課題管理 |
| 作業の手順 | スクリプト、README、運用ドキュメント |
| 前提として知っておくべき内容 | `AGENTS.md` や README |
| 仕様書、設計書、計画書 | 各プロジェクトに合った方法 |

設計思想は [IDEA.md](IDEA.md) にまとめています。

## Repository Structure

| パス | 内容 |
|---|---|
| [IDEA.md](IDEA.md) | コンセプト、設計方針、構成、制約 |
| [skills/decision-record/](skills/decision-record/) | decision-record スキル本体 |
| [example/](example/) | 架空のカフェサイト「Sakura Cafe」への導入例 |

## Quick Start

プロジェクトに必要なのはスキルの導入だけです。

1. プロジェクトのルートで次のコマンドを実行し、decision-record スキルをインストールします

   ```bash
   npx skills add mfxgu2i/agentic-decision-records
   ```

2. 作業の中で「この決定を残しておいて」と依頼します。decision-record スキルがドキュメントを作成し、索引に追加します。

最初の決定記録を残す際に、スキルが索引 `docs/decisions/index.md` を作成し、`AGENTS.md` の末尾に決定記録を参照するルールを追加します。

## Limitations

- 決定記録を参照するかどうかはエージェントの指示遵守に依存しており、強制する仕組みはありません
- 毎セッション索引を読み込むため、索引が目安として200行程度に収まる規模のプロジェクトを想定しています

## License

[MIT](LICENSE)
