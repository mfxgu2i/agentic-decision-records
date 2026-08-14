# Knowledge Bundle

このディレクトリはこのワークスペースの知識を収録した OKF v0.1 準拠の Knowledge Bundle である。

OKF v0.1 の仕様。本書の「§n」はこの固定リンクの条番号を指す。`blob/main` は現在 v0.2 で条番号がずれる:
https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/ee67a5ca27/okf/SPEC.md

このバンドルは純粋なコーパスであり、ツールを同梱しない。検索・追加・検査のツールと、
何を収録するか・どう書くかの規約はワークスペースルート側が持つ。書き込みは必ず
`okf-add` / `okf-lint` を通して行うこと。ツール一覧はワークスペースルートの `AGENTS.md` を参照。

## ディレクトリ構成

```
knowledge/          # バンドルルート
├── index.md        # 予約ファイル: 全体索引
├── log.md          # 予約ファイル: 更新履歴(日付見出し・新しい順)
├── <トピック>/      # 知識文書ディレクトリ
└── _references/    # 予約ディレクトリ: 非Markdown資産(OpenAPI YAML・PDF 等)
```

## 構造上の前提

このバンドルは常に次の性質を満たす。検索・絞り込みの前提にしてよい。仕様が適合条件として
要求するのはfrontmatterと非空`type`、予約ファイルの構造の3点で、残りは推奨か運用規約。§9:

- 予約ファイルの `index.md` / `log.md` 以外のすべての知識文書は YAML frontmatter と
  空でない `type` を持つ。`grep -l "^type: Runbook" -r .` のような絞り込みが常に成立する
- frontmatter のフィールドは `type`(必須) / `title` / `description` / `resource` / `tags` / `timestamp`。
  `resource` は `_references/` の実体や外部資産を説明する文書だけが持つ
- ルート `index.md` のエントリ書式は `* [タイトル](パス) - 説明`。
  説明文は当該文書の frontmatter `description` と同文。OKF §6
- `index.md` に frontmatter は無い。唯一の例外はバンドルルート `index.md` の
  `okf_version: "0.1"` 宣言。OKF §11
- `log.md` は `## YYYY-MM-DD` の日付見出しを新しい順に並べ、箇条書きを続ける
- ページ間リンクはバンドルルート絶対パス。`[XXX仕様](/specs/xxx-spec.md)` のような形式。
  リンク切れは不正ではなく「未執筆の知識」を意味することがある
- ディレクトリ別 `index.md` は `_references/` にのみ存在する。他はルート索引に一本化
- 出典を要する主張を持つ文書は末尾に `# Citations` を持ち、根拠が番号付きで列挙されている。
  本文中の `[1]` はその参照番号。コードは出典に挙げられない。有効な出典は一次資料・一次観測・
  意思決定の経緯・未確認の推測のいずれか
- `AGENTS.md` / `CLAUDE.md` は運用ファイルであり知識文書ではない。索引にも載らない

## この Bundle に何が入っているか

コードやREADME等の一次情報を読めば分かる内容ではなく、そこからは読み取れない情報。
意思決定とその理由、未解決の問題、調査ログ、コードには残らない運用手順を指す。
API・スキーマのような構造化できる仕様の実体は `_references/` にあり、知識文書は `resource:` で
それを指すポインタと、判断・落とし穴を持つ。

したがって「現在のコードがどう動くか」はコードを読むこと。バンドルとコードが矛盾した場合は
コードの現状が正である。
