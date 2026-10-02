# Agentic Project Records

A lightweight, shareable project context for coding agents — user-curated decisions (ADRs), runbooks, and open issues kept as plain Markdown in your repo. No database, no custom code.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## About

プロジェクトの意思決定や作業の知見を、Markdownでリポジトリに記録し、チームとコーディングエージェントで共有する仕組みです。記録はADR、runbook、issueの3種類で、何を残すかはユーザーが決めます。

エージェントはセッション開始時に記録の索引を読み込み、作業に関係する記録を読んでから進めます。セッションが変わっても、別のメンバーやハーネスに引き継いでも、同じ記録から作業を再開できます。

設計の考え方は [IDEA.md](IDEA.md) にまとめています。

## Repository Structure

| パス | 内容 |
|---|---|
| [IDEA.md](IDEA.md) | コンセプト、設計方針、索引のプリロード、構成、制約 |
| [skills/record/](skills/record/) | 記録スキルの正本。操作の振り分けと共通の規約を書いた `SKILL.md` と、種類ごとの書き方と初回の準備を書いた `references/` |
| [example/](example/) | 架空のカフェサイト「Sakura Cafe」に導入した実例。記録も含む |

## Quick Start

Claude Code v2.1.277以降が必要です。

### 実例を試す

```bash
cd example/
claude
```

「予約をDBに保存するようにして」と頼むと、保存しないと決めたADRに当たり、理由を示して進めてよいかを確認してきます。ほかの依頼の例は [example/README.md](example/README.md) にあります。

### 自分のプロジェクトに導入する

プロジェクトに置くのはスキルだけです。

1. [skills/record/](skills/record/) を、プロジェクトの `.claude/skills/record/` にディレクトリごとコピーします
2. 新しいセッションで「記録の仕組みをセットアップして」と依頼します。スキルが空の索引 `docs/records/index.md` を作り、`AGENTS.md` の末尾に記録を読むルールの節を足します

セッションを開き直して「記録の索引には何が載っている？」と聞くと、導入できたかを確かめられます。索引の内容が返らない場合は、`AGENTS.md` が読み込まれていません。[IDEA.md](IDEA.md) の「ハーネスへの依存」を確認してください。

あとは作業の中で「この決定を残しておいて」と頼むと、recordスキルが記録を書き、索引に足します。

## Limitations

- 記録を読むかどうかはエージェントの指示遵守に依存し、強制する仕組みはありません
- 索引を常時読み込むため、索引が200行に収まる規模のプロジェクトを対象にしています
- 索引の読み込みとスキルの置き場所はClaude Code固有です。ほかのハーネスでの扱いは [IDEA.md](IDEA.md) の「制約」にあります

## License

[MIT](LICENSE)
