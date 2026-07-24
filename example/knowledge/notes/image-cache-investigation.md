---
type: Investigation
title: "メニュー画像が更新されない問題の調査"
description: "CMSで差し替えたメニュー画像が反映されない問題の調査（CDNキャッシュのTTLが原因）"
tags: [image, cache, cdn, menu]
timestamp: 2026-07-24T00:00:00+09:00
---

# メニュー画像が更新されない問題の調査

## 症状

CMSでメニュー画像を差し替えても、サイト上は最大1日古い画像が表示され続ける。

## 原因

- 画像URLは `getMenuImageUrl()` がCMSの生URLをCDN経由のURLに変換している [1]。
  ファイル名が同じままの差し替えではURLが変わらないため、CDNキャッシュがヒットし続ける [2]。
- CDN側のキャッシュTTLは既定値のままで、明示のパージをしない限り約24時間残ると見られる [3]。

## 対処

- 運用対処: 画像差し替え後にCDNのキャッシュパージを実行する
  （手順は [季節メニュー更新手順](/notes/menu-update-procedure.md)）。
- 恒久対処（未実施）: 画像URLへのコンテンツハッシュ付与。実装する場合は
  `getMenuImageUrl()` の変換規則の変更になる。

# Citations

[1] `sample-app/src/lib/getMenuImageUrl.ts` — URL変換規則の出典
[2] 実機検証(2026-07-24) — 差し替え後もレスポンスヘッダーで `x-cache: HIT` が継続することを観測
[3] 推測。CDNのデフォルトTTLは公式仕様として未確認
