# Sakura Cafe の記録

## ADR

- [予約データを永続化せず、メール通知だけにする](adr/0001-no-reservation-persistence.md) — 予約の保存、一覧、変更、キャンセルの機能を追加する前に読む。予約情報の正式な記録先は店舗の紙の台帳で、サイトはメールを送るだけ
- [メニュー画像はCDN経由で配信し、URL変換を1関数に集約する](adr/0003-route-menu-images-through-cdn.md) — 画像URLを扱うコードを書く前に読む。CMSが返すURLを直接使わず、必ずgetMenuImageUrl()を通す
- [9名以上の予約はオンラインで受けず、電話案内にする](adr/0004-large-party-by-phone.md) — 予約の人数上限を変える前に読む。上限の8名は店舗の運用で決まっており、技術上の制約ではない

## Runbook

- [季節メニュー入れ替えの手順](runbooks/seasonal-menu-update.md) — 季節メニューを入れ替えるときに使う。CMSの更新、画像の登録、キャッシュのパージの順序と確認方法

## Issue

- [画像差し替えの反映が手動のキャッシュパージに頼っている](issues/image-replace-needs-manual-purge.md) — メニュー画像が古いままだと問い合わせがあったとき、画像URLの生成やキャッシュ設定を変更する前に読む。差し替えの反映は手動のパージに頼っており、恒久的な対処方法は決まっていない
