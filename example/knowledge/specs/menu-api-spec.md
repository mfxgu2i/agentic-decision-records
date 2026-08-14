---
type: Specification
title: "メニューAPI仕様"
description: "メニュー取得APIのエンドポイント仕様。実体は _references/menu-api.yaml"
resource: /_references/menu-api.yaml
tags: [api, menu]
timestamp: 2026-08-09T00:00:00+09:00
---

# メニューAPI仕様

メニュー取得APIのOpenAPI定義。実体は [`_references/menu-api.yaml`](/_references/menu-api.yaml) にあり、
本文書はそのポインタと概要、および仕様上の判断・落とし穴を持つ。

## 概要

- `GET /api/menu` — メニュー一覧を返す。`category` クエリで絞り込み可。値は `drink` / `food` / `seasonal` [1]
- レスポンスの`imageUrl`はCMSの生URLではなく、変換済みのCDN URL [1]。変換規則の実装は
  `getMenuImageUrl()`。変換をフロントではなくAPI側に集約しているのは、
  CDN URLへの変換規則を呼び出し側ごとに持たせず一箇所に閉じるためと見られる [2]

## 落とし穴

- `imageUrl`の変換はファイル名ベースで、CMSで画像を差し替えてもファイル名が同じ場合は
  URLが変わらずCDNキャッシュがヒットし続ける。差し替え後も最大24時間ほど古い画像が
  表示され得る。原因の詳細と対処は [メニュー画像が更新されない問題の調査](/notes/image-cache-investigation.md) にある

# Citations

[1] `/_references/menu-api.yaml` — エンドポイント・スキーマ定義の実体
[2] 推測。API側で変換を一元化する意図を明文化した記録はなく、実装構成からの推定
