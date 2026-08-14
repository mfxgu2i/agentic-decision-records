# 関連する先行事例

本アプローチに関連する外部の事例・研究・実装へのポインタ集。
設計判断とその理由は [IDEA.md](../IDEA.md) に記載する。

## 同系統のアプローチ

- [Karpathy「LLM Wiki」 GitHub Gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — 構造化Markdown wikiをClaude Codeでagentic検索する。raw sources / wiki / schema の3層と ingest・query・lint の3操作を提唱。最も近い先行事例
  - 解説: [MindStudio](https://www.mindstudio.ai/blog/andrej-karpathy-llm-wiki-knowledge-base-claude-code) / [HackerNoon](https://hackernoon.com/how-i-built-a-self-maintaining-knowledge-base-for-6-projects-using-claude-code-and-karpathys-llm-wiki)、6プロジェクトでの運用記 / [Starmorph](https://blog.starmorph.com/blog/karpathy-llm-wiki-knowledge-base-guide)
- [Open Knowledge Format (OKF) v0.1、Google Cloud](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) — 本バンドルが準拠する仕様。LLM Wikiパターンをvendor-neutralに形式化したもの。[発表記事](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
  - [okf.md](https://okf.md/) — リファレンスサイト。クライアントサイドのvalidatorと、MCPサーバとしても動く公式CLIの`kcmd`がある。FAQはv0.1ドラフトと記載しているが、仕様リポジトリのmainは2026年7月にv0.2へ移行済みで条番号も動いている
  - [W3C Holon Graph Community Group](https://www.w3.org/community/holon/) — 2026年6月に活動開始。[DataBook仕様](https://github.com/w3c-cg/holon)はOKFと同じMarkdown + YAML frontmatterの設計を共有し、IRI識別子やSPARQL問い合わせといった形式意味論を上乗せする
- [Inkeep OpenKnowledge](https://github.com/inkeep/open-knowledge) — OKFバンドル向けのローカルファーストMarkdown IDEと、各ハーネスの自動配線
- [openknowledge-sh/openknowledge](https://github.com/openknowledge-sh/openknowledge) — OKFバンドル管理CLI
- [Astro-Han/karpathy-llm-wiki](https://github.com/Astro-Han/karpathy-llm-wiki) — Agent Skills互換のLLM wiki実装
- Obsidian vaultに対する同種の実装: [A proper Claude Code harness for Obsidian、DEV Community](https://dev.to/nickyeolk/think-with-your-second-brain-a-proper-claude-code-harness-for-obsidian-2c0o) / [claude-obsidian](https://github.com/AgriciDaniel/claude-obsidian)

## 検索方式。Agentic Search とベクトル検索

- [Boris Cherny（Claude Code作者）の投稿](https://x.com/bcherny/status/2017824286489383315) — 初期のClaude CodeはRAG+ローカルベクトルDBだったがagentic searchに切り替えた経緯。理由はsecurity / privacy / staleness / reliability
- [Keyword search is all you need、Amazon, AAAI 2026](https://www.amazon.science/publications/keyword-search-is-all-you-need-achieving-rag-level-performance-without-vector-databases-using-agentic-tool-use) — ベクトルDBなしのagentic keyword searchでRAGの90%超の性能
- [Beyond Semantic Similarity、arXiv:2605.05242](https://arxiv.org/abs/2605.05242) — 汎用ターミナルツールでコーパスを直接操作するdirect corpus interaction (DCI)が、埋め込みもベクトルインデックスも使わずに従来のretrieverを大きく上回ると報告。本アプローチと同じ立場に付いた名前と実証
- [Is Grep All You Need?、arXiv:2605.15184](https://arxiv.org/abs/2605.15184) — grepとベクトル検索を複数のハーネスで比較。grep優位が成立するのは検索結果をコンテキストに直接載せる場合のみで、エージェントがファイルを開き直す形式では10組中5組で逆転する。ハーネスを替えるだけで同一モデル・同一検索方式でも93.1%対76.7%と、検索方式を替えるのと同規模の差が出る
- [SAAS、arXiv:2605.29796](https://arxiv.org/abs/2605.29796) — 検索の失敗をunder-searchとover-searchの2軸で扱う枠組み。必要時のみ検索する方針はover-search回避として位置づけられる
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
- [Agent Plugins 1.0.0](https://github.com/agentplugins/agent-plugins-spec) — 2026年8月6日公開のプラグイン配布標準。ChatGPT / Codex / Cursor / Copilot / Kiro / VS Codeが採用。可搬な構成要素はskillsとMCPサーバの2種のみで、subagent・hooks・commandsは形式が収束していないとして対象外。Claude Codeは`.claude-plugin/`という別レイアウトを使う

## 別方式の実装

- [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance) — skillとnpm CLIの組み合わせで、TensorFlow.jsのローカル埋め込みモデルによるベクトル検索を行う構成。本アプローチとは対照的な選択
