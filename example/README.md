# example — Sakura Cafe

架空のカフェサイト「Sakura Cafe」を題材にした、Agentic Project Recordsの実例です。

| パス | 内容 |
|---|---|
| `docs/records/` | ADRが4件、runbookが1件、issueが1件入っている。ADRのうち1件は置き換え済み |
| `sample-app/` | 記録が触れるコードのスタブ。動作しない |
| `AGENTS.md` | 読む・書くのルールと、索引を引用する1行 `@docs/records/index.md` |
| `.claude/skills/record` | 記録を書くスキル。リポジトリ直下の `skills/record/` へのシンボリックリンク |

## 起動方法

Claude Codeはリポジトリのルートではなく、このディレクトリで起動してください。v2.1.277以降が必要です。

```bash
cd example/
claude
```

次のように依頼して動作を確認できます。

| 頼むこと | 起きること |
|---|---|
| 「予約をDBに保存するようにして」 | 保存しないと決めたADRに当たり、理由を示して進めてよいかを確認してくる |
| 「メニュー画像が更新されないんだけど」 | issueに書かれた原因と、runbookのキャッシュパージにたどり着く |
| 「画像URLにハッシュを付けて」 | 恒久対処の方式が未決だというissueに当たり、進める前に伝えてくる |
| 「画像はWebPに統一することにした。残しておいて」 | recordがADRを1件書き、索引に足す |

## 注意

このディレクトリには、[README](../README.md) の導入手順をそのまま適用しています。
`.claude/skills/record` は、リポジトリ直下の [skills/record/](../skills/record/) を指すシンボリックリンクです。スキルの正本はそちらにあります。
`AGENTS.md` の「プロジェクトの記録」の節は、`skills/record/references/setup.md` にある節の原文と同じ内容に保ちます。変更するときは `setup.md` を先に直し、その内容をこちらに反映してください。
このexample固有の内容は、`docs/records/` と `sample-app/` だけです。
