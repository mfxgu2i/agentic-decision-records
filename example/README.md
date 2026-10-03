# example — Sakura Cafe

架空のカフェサイト「Sakura Cafe」を題材にした、Agentic Decision Recordの実例です。

| パス | 内容 |
|---|---|
| `docs/decisions/` | 決定記録が5件入っている。1件は置き換え済み、1件は議論中の論点 |
| `sample-app/` | 決定が触れるコードのスタブ。動作しない |
| `AGENTS.md` | 読む・書くのルールと、索引を引用する1行 `@docs/decisions/index.md` |
| `.claude/skills/decision-record` | 記録を書くスキル。リポジトリ直下の `skills/decision-record/` へのシンボリックリンク |

## 起動方法

エージェントはリポジトリのルートではなく、このディレクトリで起動してください。

```bash
cd example/
```

次のように依頼して動作を確認できます。

| 頼むこと | 起きること |
|---|---|
| 「予約をDBに保存するようにして」 | 保存しないという決定に当たり、理由を示して進めてよいかを確認してくる |
| 「メニュー画像が更新されないんだけど」 | 議論中の論点に書かれた原因にたどり着き、手動パージの実行漏れを疑うよう案内してくる |
| 「画像URLにハッシュを付けて」 | 方式が決まるまでURLの形式を変えないという論点の取り決めに当たり、進める前に伝えてくる |
| 「画像はWebPに統一することにした。残しておいて」 | decision-recordが決定を1件書き、索引に足す |

## 注意

このディレクトリには、[README](../README.md) の導入手順をそのまま適用しています。
`.claude/skills/decision-record` は、リポジトリ直下の [skills/decision-record/](../skills/decision-record/) を指すシンボリックリンクです。スキルの正本はそちらにあります。
`AGENTS.md` の「プロジェクトの決定事項」の節は、`skills/decision-record/references/setup.md` にある節の原文と同じ内容に保ちます。変更するときは `setup.md` を先に直し、その内容をこちらに反映してください。
このexample固有の内容は、`docs/decisions/` と `sample-app/` だけです。
