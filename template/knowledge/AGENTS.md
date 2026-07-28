# Knowledge Bundle

このディレクトリはこのワークスペースの知識を収録した**OKF v0.1 準拠の Knowledge Bundle** である。

OKF (Open Knowledge Format) の仕様（本書の「§n」はこの仕様の条番号を指す）:
https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md

## ディレクトリ構成

```
knowledge/          # バンドルルート
├── index.md        # 予約ファイル: 全体索引(frontmatterはokf_version宣言のみ可)
├── log.md          # 予約ファイル: 更新履歴(日付見出し・新しい順)
├── <トピック>/      # 知識文書ディレクトリ
└── _references/    # 予約ディレクトリ: 非Markdown資産
```

## 絶対ルール(OKF §9 適合を壊さない)

1. 予約ファイル(`index.md` / `log.md`)以外の **すべての知識文書(.md)** は、YAML frontmatter と
   空でない `type` を持つ。`AGENTS.md` / `CLAUDE.md` と `.claude/` 配下は知識文書ではなく
   運用ファイルなので対象外(索引にも載せない)。
2. `index.md` に frontmatter を書かない。唯一の例外はバンドルルート `index.md` の
   `okf_version: "0.1"` 宣言(OKF §11)。
3. `log.md` は `## YYYY-MM-DD` の日付見出し(新しい日付が上)+ 箇条書き。
   既存行は編集・削除しない(追記のみ)。
4. ページ間リンクはバンドルルート絶対パス(例: `[XXX仕様](/specs/xxx-spec.md)`)。
5. 文書を追加・改名・削除したら、**本体 + ルート `index.md` +(`_references/` の場合)
   当該ディレクトリの `index.md` + `log.md`** をワンセットで更新する。
   `_references/` 以外のディレクトリにはディレクトリ別 `index.md` を置かない
   (ルート索引と重複するため。`_references/` は非Markdown資産がfrontmatterを
   持てず、説明付き一覧をここでしか保持できないため例外)。
6. ルート `index.md` のエントリ書式は `* [タイトル](パス) - 説明`。
   説明文は当該文書の frontmatter `description` と同文にする(OKF §6)。
7. 文書の削除・統合・既存文書の大幅な書き換えはユーザーに確認してから行う。

## frontmatter テンプレート(推奨フィールドは優先順)

```yaml
---
type: <種別>                        # 必須。下の既存語彙を優先
title: "<表示名>"
description: "<一文の要約>"
resource: <対象資産のURI>            # 実体ファイル・外部資産を説明する文書のみ
tags: [<tag>, ...]
timestamp: <YYYY-MM-DD>T00:00:00+09:00
---
```

## type の語彙

type は内容を表す短い英語で自由に定義してよい(OKF に中央登録はない)。表記ゆれを防ぐため、
まずバンドル内の既存語彙の再利用を検討する。
例(開発ナレッジの場合): `Specification` / `Investigation` / `Runbook` / `Note` / `Reference`

## ファイル命名

ケバブケース英語 + 内容種別を表すサフィックス(例: `-spec` / `-procedure` / `-investigation`)。
例: `example-spec.md`。`index.md` / `log.md` は予約済みなので使わない。

## Citations — 出典を要する主張があれば必須

判定基準は `type` ではなく**本文が何を主張しているか**。本文に次のいずれかに由来する記述が
あれば、文書末尾に `# Citations` を置き、根拠を番号付きリストで列挙する。Agentが
「この記述の根拠はどこか」を機械的に取り出せる状態を保つことが目的:

- コード上の実体 — ファイルパス(可能なら関数・行)
- 一次資料 — `_references/` 配下の資産、外部URL
- 一次観測 — 実機検証・ログ・DBクエリ結果など、いつ・何を観測したか
- 未確認の推測 — 根拠が無いことを明示する(例: `[3] 推測。公式仕様は未確認`)

逆に、バンドル内で自己完結する文書(用語の定義、方針の宣言、他文書への索引など)には不要。

書式:

```markdown
# Citations

[1] `src/lib/getImageUrl.ts` — URL変換規則の出典
[2] 実機検証(YYYY-MM-DD) — キャッシュヒットの観測結果
[3] 推測。外部仕様としては未確認
```

本文中で根拠に触れる箇所には `[1]` のように参照番号を添える。

このバンドルを検索・追加・検査するツール(`okf-query` / `okf-add` / `okf-lint`)は
ワークスペースルートで一元管理されている。このバンドル自体は純粋なコーパス(データ)であり、
ツールを同梱しない。利用可能なツール一覧はワークスペースルートの `AGENTS.md` を参照。
