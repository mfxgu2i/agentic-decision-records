---
type: adr
description: "メニュー画像の配信経路の経緯を知りたいときに読む"
status: superseded
superseded_by: 0003-route-menu-images-through-cdn.md
date: 2026-06-10
---

# メニュー画像はCMSが返すURLをそのまま配信する

## 背景

初期リリースではメニューが20品ほどで、アクセスも少ないと見込んでいた。
画像の配信にCDNを挟む案もあったが、設定と運用の対象が増えるため見送った。

## 決定

メニュー画像には、CMSのAPIが返すURLを加工せずに使う。

## 影響

- 配信経路がCMSだけで済み、構成が単純になる
- 画像の転送量がCMSの契約プランの上限に直接効く
