---
type: Specification
title: "予約機能仕様"
description: "席予約フォームの仕様（入力項目・バリデーション・確認メール送信）"
tags: [reservation, form, mail]
timestamp: 2026-07-24T00:00:00+09:00
---

# 予約機能仕様

席予約フォーム（`/reserve`）の入力から確認メール送信までの仕様。

## 入力項目

| フィールド | 型 | 必須 | バリデーション |
|---|---|---|---|
| `name` | string | ○ | 1〜50文字 |
| `email` | string | ○ | RFC 5322形式 |
| `date` | string (ISO 8601) | ○ | 当日〜90日先まで |
| `partySize` | number | ○ | 1〜8 |
| `note` | string | - | 500文字まで |

## 送信フロー

1. フロントエンドが `POST /api/reservation` に送信 [1]
2. サーバー側で上記バリデーションを再実行（フロント側と二重）
3. バリデーション通過後、`sendReservationMail()` で確認メールを送信 [2]
4. 完了画面 `/reserve/complete` へ遷移

## 落とし穴

- `partySize` が9以上のときのエラーは **400**（422ではない）。フロントのエラーハンドリングは
  400前提で書かれているため、ステータスコードを変えるとエラーメッセージが表示されなくなる [1]。
- 9名以上の予約は電話案内のみ（システム外運用）。

# Citations

[1] `sample-app/src/app/api/reservation/route.ts` — バリデーション・ステータスコードの出典
[2] `sample-app/src/lib/mail.ts` — `sendReservationMail()` の出典
