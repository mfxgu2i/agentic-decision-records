# <プロジェクト名> Workspace

<プロジェクトの1行説明をここに書く>

- `<コードディレクトリ>/` — <コードの説明>
- `knowledge/` — Knowledge Bundle。OKF形式のキュレーション済みナレッジ

## 情報参照のルール

下記の収録トピックに関わる判断・変更は、okf-queryサブエージェントで該当文書を確認してから確定すること。
コード等の直接調査と並行してよい。対象と変更内容が明確な単純作業では省略してよい

収録トピック。`knowledge/index.md`の内容で、先頭の`okf_version`行はOKF仕様上のfrontmatter宣言なので読み飛ばしてよい:

@knowledge/index.md

### Knowledge Bundle

okf-queryサブエージェントでBundleを直接Agentic Searchする。
質問は具体的に書き、出典パス付きの回答を求めること。

- Bundleに基づいて回答する際は、根拠となる文書パスを明示する。`specs/xxx-spec.md` のような形式
- 「Bundleにない」の判断は、表記ゆれを変えた複数回の検索を行った後にすること
- 開発作業中はBundleを編集しない。読み取り専用として扱う
- 知識の追加・更新が必要な場合は okf-add / okf-lintスキルを使って行う。
  執筆規約はスキル側が持つ。Bundleを直接手で編集しない

### コード

- Bundleとコードの記述が矛盾する場合はコードの現状を正とし、矛盾を発見したことをユーザーに報告する。
  Bundleの更新は人間の確認のうえokf-add / okf-lintスキルの規約に従って行う

## 利用可能なツール

Bundleを検索・追加・検査するツールはワークスペースルートの`.claude/`で一元管理する。
Bundle自体はコーパスのみを持ち、ツールを同梱しない。

| ツール | 種別 | 用途 |
|---|---|---|
| `okf-query` | サブエージェント `.claude/agents/okf-query.md` とスキル `.claude/skills/okf-query/` | Bundle検索。読み取り専用で、逐語抜粋と行番号付き出典を返す。検索戦略はスキル、実行条件はサブエージェントが持つ |
| `okf-add` | スキル `.claude/skills/okf-add/` | 文書・参照資産の追加。本体・索引・履歴を一括更新 |
| `okf-lint` | スキル `.claude/skills/okf-lint/` | Bundleの OKF 適合・整合性チェック |
