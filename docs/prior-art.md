# 関連する先行事例

## Karpathy「LLM Wiki」パターン

Andrej Karpathyが2026年4月に公開したパターン（[一次情報: GitHub Gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)）。LLMが検索しやすいよう構造化されたMarkdown wikiを整備し、Claude Codeでagenticに検索する。**個人〜チーム規模ではベクトル検索型RAGよりシンプルな代替**と位置づけており、Gist自体が「エージェントに貼ればブートストラップできるideaファイル」＝自前実装ゼロのハーネス借用である点まで本アプローチと一致する。

構成要素はほぼ1対1に対応する:

| LLM Wiki | 本アプローチ（OKFバンドル） |
|---|---|
| `raw/`（不変ソース） | `_references/` |
| `wiki/`（整備済みページ） | `specs/` / `design/` / `notes/` |
| `CLAUDE.md`（スキーマ） | AGENTS.md（Bundle運用規約）+ frontmatter規約 |
| ingest / query / lint | okf-add / okf-query / okf-lint |

解説記事: [MindStudio](https://www.mindstudio.ai/blog/andrej-karpathy-llm-wiki-knowledge-base-claude-code) / [HackerNoon（6プロジェクトでの運用記）](https://hackernoon.com/how-i-built-a-self-maintaining-knowledge-base-for-6-projects-using-claude-code-and-karpathys-llm-wiki) / [Starmorph](https://blog.starmorph.com/blog/karpathy-llm-wiki-knowledge-base-guide)

同系統として、Obsidianのvaultに対して同じことをする実装もある: [A proper Claude Code harness for Obsidian（DEV Community）](https://dev.to/nickyeolk/think-with-your-second-brain-a-proper-claude-code-harness-for-obsidian-2c0o) / [claude-obsidian（GitHub）](https://github.com/AgriciDaniel/claude-obsidian)

## 「grep > ベクトルDB」の論拠を補強する記事

[IDEA.md](../IDEA.md) の「なぜベクトル検索型RAGにしないか」と同じ主張の独立した言語化:

- [Why grep is beating your Vector DB（Shaped.ai）](https://www.shaped.ai/blog/why-grep-is-beating-your-vector-db) — 「エージェントメモリの大部分は実は小規模なMarkdown群で、そこではgrepで十分」
- [Why I Replaced My AI Agent's Vector Database With grep（DEV Community）](https://dev.to/kuro_agent/why-i-replaced-my-ai-agents-vector-database-with-grep-59mm) — ベクトルDBを捨てた実践記（8ヶ月の本番運用）。移行先は純粋なgrepではなくSQLite FTS5（BM25）+ Markdown + Git + grepの組み合わせである点に注意。
- [Comparing File Systems and Databases for AI Agent Memory（Oracle）](https://blogs.oracle.com/developers/comparing-file-systems-and-databases-for-effective-ai-agent-memory-management) — ファイルシステムとDBの比較記事。主結論は「共有・スケール時はDBへ移行すべき」であり、「単独開発者規模の知識ストアならファイルシステムで十分」とする整理が本アプローチの個人規模前提の範囲でのみ論拠になる。
