---
type: Design Doc
title: "システム全体アーキテクチャ設計"
description: "Sakura Cafeサイトの全体構成（Next.js + ヘッドレスCMS + CDN）と主要な設計判断"
tags: [architecture, nextjs, cms, cdn]
timestamp: 2026-07-24T00:00:00+09:00
---

# システム全体アーキテクチャ設計

## 全体構成

```
ブラウザ → CDN → Next.js (sample-app/) → ヘッドレスCMS
                     └→ メール送信サービス（予約確認メール）
```

- フロントエンドはNext.js。CMSからコンテンツを取得して描画するヘッドレス構成
- 画像はCDN経由で配信し、URL変換を `getMenuImageUrl()` に集約する
- 予約はCMSを介さず、Next.jsのAPI Routeから直接メール送信する

## 主要な設計判断

- **予約データを永続化しない**: 予約はメール通知のみでDBを持たない。店舗側の台帳が正。
  規模が小さくシステムを増やさないことを優先した
- **画像URL変換の一元化**: CMSの生URLを直接使わず必ず `getMenuImageUrl()` を通す。
  CDN移行・ドメイン変更時の影響範囲をこの1関数に閉じ込めるため
