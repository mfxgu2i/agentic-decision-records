# Agentic RAG Sample Workspace

Claude Codeのハーネスだけでナレッジ検索（軽量Agentic RAG）を成立させるサンプルワークスペース。
題材は架空のカフェサイト「Sakura Cafe」。

- `sample-app/` — 架空のサイトコード
- `knowledge/` — Knowledge Bundle

## 情報参照のルール

**Bundleの索引（`knowledge/index.md`）に載る主題に関わる判断・変更は、Knowledge Bundleを確認してから確定すること**
コード等の直接調査と並行してよい。対象と変更内容が明確な単純作業では省略してよい

### Knowledge Bundle

okf-queryサブエージェントでBundleを直接Agentic Searchする。
質問は具体的に書き、出典パス付きの回答を求めること。

- Bundleに基づいて回答する際は、根拠となる文書パス（例: `specs/reservation-spec.md`）を明示する
- 「Bundleにない」の判断は、索引の確認と表記ゆれを変えた複数回の検索を行った後にすること
- 開発作業中はBundleを編集しない
- 知識の追加・更新が必要な場合は `knowledge/AGENTS.md` の規約に従い、
  okf-add / okf-lintスキルを使って行う

### コード

- Bundleとコードの記述が矛盾する場合はコードの現状を正とし、矛盾を発見したことをユーザーに報告する
- Bundleの更新は人間の確認のうえokf-add / okf-lintスキルの規約に従って行う
