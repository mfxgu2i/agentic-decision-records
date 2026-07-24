---
type: Runbook
title: "季節メニュー更新手順"
description: "季節メニュー入れ替え時の作業手順チェックリスト（CMS更新・画像・キャッシュパージ）"
tags: [runbook, menu, cache]
timestamp: 2026-07-24T00:00:00+09:00
---

# 季節メニュー更新手順

季節メニュー（`category: seasonal`）の入れ替え時に必ず実施するチェックリスト。

1. CMSで旧季節メニューを非公開にする（削除はしない。過去メニューはアーカイブとして保持する運用）
2. 新メニューを登録する。カテゴリは必ず `seasonal` を設定する
   （未設定だと [メニューAPI](/specs/menu-api-spec.md) の `category=seasonal` 絞り込みに載らない）
3. メニュー画像をアップロードする。**既存画像の上書き差し替えをした場合は、CDNのキャッシュパージを必ず実行する**
   （理由は [メニュー画像調査](/notes/image-cache-investigation.md) を参照）
4. 公開後、トップページと `/menu?category=seasonal` の表示を実機で確認する
