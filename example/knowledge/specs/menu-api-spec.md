---
type: API Specification
title: "メニューAPI仕様"
description: "メニュー取得APIのエンドポイント仕様（実体は _references/menu-api.yaml）"
resource: /_references/menu-api.yaml
tags: [api, menu]
timestamp: 2026-07-24T00:00:00+09:00
---

# メニューAPI仕様

メニュー取得APIのOpenAPI定義。**実体は [`_references/menu-api.yaml`](/_references/menu-api.yaml)** にあり、
本文書はそのポインタと概要のみを持つ。

## 概要

- `GET /api/menu` — メニュー一覧を返す。`category` クエリ（`drink` / `food` / `seasonal`）で絞り込み可 [1]
- レスポンスの画像URLはCMSの生URLではなく、`getMenuImageUrl()` で変換されたCDN URL
  （変換規則は [メニュー画像調査](/notes/image-cache-investigation.md) を参照）

# Citations

[1] `/_references/menu-api.yaml` — エンドポイント・スキーマ定義の実体
