# 関連する先行事例

本アプローチに関連する外部の事例・研究・実装へのポインタ集。
設計判断とその理由は [IDEA.md](../IDEA.md) に記載する。

## 同系統のアプローチ

- [Karpathy「LLM Wiki」 GitHub Gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — 構造化Markdown wikiをClaude Codeでagentic検索する。raw sources / wiki / schema の3層と ingest・query・lint の3操作を提唱。最も近い先行事例
  - 解説: [MindStudio](https://www.mindstudio.ai/blog/andrej-karpathy-llm-wiki-knowledge-base-claude-code) / [HackerNoon](https://hackernoon.com/how-i-built-a-self-maintaining-knowledge-base-for-6-projects-using-claude-code-and-karpathys-llm-wiki)、6プロジェクトでの運用記 / [Starmorph](https://blog.starmorph.com/blog/karpathy-llm-wiki-knowledge-base-guide)
- [Open Knowledge Format (OKF) v0.1、Google Cloud](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) — 本バンドルが準拠する仕様。LLM Wikiパターンをvendor-neutralに形式化したもの。[発表記事](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
- [Inkeep OpenKnowledge](https://github.com/inkeep/open-knowledge) — OKFバンドル向けのローカルファーストMarkdown IDEと、各ハーネスの自動配線
- [openknowledge-sh/openknowledge](https://github.com/openknowledge-sh/openknowledge) — OKFバンドル管理CLI
- [Astro-Han/karpathy-llm-wiki](https://github.com/Astro-Han/karpathy-llm-wiki) — Agent Skills互換のLLM wiki実装
- Obsidian vaultに対する同種の実装: [A proper Claude Code harness for Obsidian、DEV Community](https://dev.to/nickyeolk/think-with-your-second-brain-a-proper-claude-code-harness-for-obsidian-2c0o) / [claude-obsidian](https://github.com/AgriciDaniel/claude-obsidian)

## 検索方式。Agentic Search とベクトル検索

- [Boris Cherny（Claude Code作者）の投稿](https://x.com/bcherny/status/2017824286489383315) — 初期のClaude CodeはRAG+ローカルベクトルDBだったがagentic searchに切り替えた経緯。理由はsecurity / privacy / staleness / reliability
- [Keyword search is all you need、Amazon, AAAI 2026](https://www.amazon.science/publications/keyword-search-is-all-you-need-achieving-rag-level-performance-without-vector-databases-using-agentic-tool-use) — ベクトルDBなしのagentic keyword searchでRAGの90%超の性能
- [Adaptive-RAG、Jeong et al., NAACL 2024](https://arxiv.org/abs/2403.14403) — 質問の複雑さに応じて検索戦略を切り替える
- [Self-RAG、Asai et al.](https://arxiv.org/abs/2310.11511) — 生成しながら検索要否と妥当性を自己評価する
- [Agentic RAG Survey、arXiv:2501.09136](https://arxiv.org/abs/2501.09136) — 用語の出典
- [Improving agent with semantic search、Cursor](https://cursor.com/blog/semsearch) — grepとsemantic searchの併用で精度向上を報告
- [Why grep is beating your Vector DB、Shaped.ai](https://www.shaped.ai/blog/why-grep-is-beating-your-vector-db)
- [Why I Replaced My AI Agent's Vector Database With grep、DEV Community](https://dev.to/kuro_agent/why-i-replaced-my-ai-agents-vector-database-with-grep-59mm) — 移行先は純粋なgrepではなくSQLite FTS5併用である点に注意
- [Comparing File Systems and Databases for AI Agent Memory、Oracle](https://blogs.oracle.com/developers/comparing-file-systems-and-databases-for-effective-ai-agent-memory-management)
- [Why I'm against Claude Code's grep-only retrieval、Milvus](https://milvus.io/blog/why-im-against-claude-codes-grep-only-retrieval-it-just-burns-too-many-tokens.md) — 反対側の論。ベクトルDBベンダーによる

## Context engineering

- [Effective context engineering for AI agents、Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — just-in-time context loading、サブエージェントによる文脈分離
- [Context Rot、Chroma](https://www.trychroma.com/research/context-rot) — 入力長の増加に伴う性能劣化の実証
- [Equipping agents for the real world with Agent Skills、Anthropic](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — SKILL.mdの分割と progressive disclosure

## 標準

- [Agent Skills、agentskills.io](https://github.com/agentskills/agentskills) — SKILL.md のオープン標準
- [AGENTS.md](https://agents.md/) — Agentic AI Foundation がsteward

## 別方式の実装

- [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance) — skillとnpm CLIの組み合わせで、TensorFlow.jsのローカル埋め込みモデルによるベクトル検索を行う構成。本アプローチとは対照的な選択
