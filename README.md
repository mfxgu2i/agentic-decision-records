# Agentic Decision Record

Project decisions and their reasons, written by coding agents and curated by humans — kept as plain Markdown in your repo. No database, no custom code.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## About

プロジェクト内の決定とその理由を、エージェントが書き残す仕組みです。決定はMarkdownでリポジトリに記録し、人もコーディングエージェントも同じ記録を読みます。決定には状態があり、合意した決定のほかに論点が決着するまでの暫定の取り決めも書けます。

記録の本文はエージェントが書きますが、何を記録として残すかは人が決めます。エージェントはセッション開始時に索引を読み込み、関係する記録を読んでから進めます。セッションが変わっても、別の作業者やハーネスに引き継いでも、同じコンテキストをもって作業を再開できます。

### 記録しないもの

記録するのは、ほかに置き場が無い決定とその理由だけです。
次のものは残しません。

| 残さないもの | 置き場 |
|---|---|
| 個人の好み、作業の進め方 | ハーネスのメモリ |
| コードの意図、変更の経緯 | コード、Git |
| 未解決の問題、議論中の論点、担当や期限を持つ作業 | 課題管理 |
| 作業の手順 | スクリプト、READMEや運用の文書 |
| 前提として知っておくべき内容 | `AGENTS.md` かREADME |
| 仕様書、設計書、計画書 | 各プロジェクトに合った方法 |

設計思想は [IDEA.md](IDEA.md) にまとめています。

## Repository Structure

| パス | 内容 |
|---|---|
| [IDEA.md](IDEA.md) | コンセプト、設計方針、構成、制約 |
| [skills/decision-record/](skills/decision-record/) | 記録スキル |
| [example/](example/) | 架空のカフェサイト「Sakura Cafe」に導入した実例 |

## Quick Start

プロジェクトに置くのはスキルだけです。

1. プロジェクトのルートで次のコマンドを実行し、decision-recordスキルをインストールします

   ```bash
   npx skills add mfxgu2i/agentic-decision-records
   ```

2. 新しいセッションで「記録の仕組みをセットアップして」と依頼します。スキルが空の索引 `docs/decisions/index.md` を作り、`AGENTS.md` の末尾に決定を読むルールを追加します。

あとは作業の中で「この決定を残しておいて」と頼むと、decision-recordスキルがドキュメントを作成し、索引に追加します。

## Limitations

- 決定を読むかどうかはエージェントの指示遵守に依存し、強制する仕組みはありません
- 索引を常時読み込むため、索引が目安として200行に収まる規模のプロジェクトを対象にしています

## License

[MIT](LICENSE)
