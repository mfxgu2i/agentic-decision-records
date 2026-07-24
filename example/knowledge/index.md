---
okf_version: "0.1"
---

# Sakura Cafe — Knowledge Bundle

架空のカフェサイト「Sakura Cafe」(Next.js + ヘッドレスCMS 構成)の知識をOKF形式で収録したバンドル。

# 仕様書

* [メニューAPI仕様](/specs/menu-api-spec.md) - メニュー取得APIのエンドポイント仕様（実体は _references/menu-api.yaml）
* [予約機能仕様](/specs/reservation-spec.md) - 席予約フォームの仕様（入力項目・バリデーション・確認メール送信）

# 設計

* [システム全体アーキテクチャ設計](/design/system-architecture-design.md) - Sakura Cafeサイトの全体構成（Next.js + ヘッドレスCMS + CDN）と主要な設計判断

# ノート・調査メモ

* [メニュー画像が更新されない問題の調査](/notes/image-cache-investigation.md) - CMSで差し替えたメニュー画像が反映されない問題の調査（CDNキャッシュのTTLが原因）
* [季節メニュー更新手順](/notes/menu-update-procedure.md) - 季節メニュー入れ替え時の作業手順チェックリスト（CMS更新・画像・キャッシュパージ）

# 参照資産

* [_references/](/_references/) - 非Markdownの参照資産(OpenAPI YAML 等)の置き場。各資産の説明は _references/index.md を参照
