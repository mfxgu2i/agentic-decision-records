---
type: Specification
title: "予約機能仕様"
description: "席予約フォームの送信フローと、ステータスコード・人数上限まわりの落とし穴"
resource: /_references/reservation-api.yaml
tags: [reservation, form, mail]
timestamp: 2026-08-09T00:00:00+09:00
---

# 予約機能仕様

`/reserve` の席予約フォームで、入力から確認メール送信までの仕様。
入力項目とバリデーション値の定義は [`_references/reservation-api.yaml`](/_references/reservation-api.yaml) にあり、
本文書はそのポインタと、コードにもスキーマにも現れない判断・落とし穴を持つ [1]。

## 送信フロー

1. フロントエンドが `POST /api/reservation` に送信する。実装は `api/reservation/route.ts`
2. サーバー側でバリデーションを再実行する。フロント側と二重になる
3. バリデーション通過後、`sendReservationMail()` で確認メールを送信する
4. 完了画面 `/reserve/complete` へ遷移する

バリデーションはフロント・サーバーの二重実装のため、値を変えるときは両側の同時変更が必要。

## 落とし穴

- `partySize` が9以上のときのエラーは 400 であって 422 ではない。フロントのエラーハンドリングは
  400前提で書かれているため、ステータスコードを変えるとエラーメッセージが表示されなくなる。
  この結合はコードのどちらか一方を読んでも気づけないため、変更時は必ず両側を確認すること。
- 9名以上の予約は電話案内のみで、システム外の運用になる。この制限はビジネス判断で、
  コード上は `partySize` の上限値としてしか現れない。

# Citations

[1] `/_references/reservation-api.yaml` — 入力項目・バリデーション値の定義の実体
