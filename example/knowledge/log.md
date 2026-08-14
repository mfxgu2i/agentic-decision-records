# Log

## 2026-08-09

* Update: [メニューAPI仕様](/specs/menu-api-spec.md)・[予約機能仕様](/specs/reservation-spec.md)・
  [メニュー画像が更新されない問題の調査](/notes/image-cache-investigation.md) を更新。
  コードを出典に挙げるのをアンチパターンとする方針変更に伴い、Citationsからコード参照を外し、
  本文中のナビゲーション目的のポインタに置き換えた。
* Update: [予約機能仕様](/specs/reservation-spec.md) から入力項目テーブルを削除。
  コードから機械的に再現できる内容のため収録方針に反していた。
  文書は送信フローと落とし穴に絞った。400/422の結合と9名以上の運用が残る。description も更新。
* Creation: 参照資産 [reservation-api.yaml](/_references/reservation-api.yaml) を追加。
  「人間が仕様を一覧で読みたい場合は散文の写しではなく `_references/` に実体を置く」という
  方針に沿い、削除した入力項目テーブルの内容をOpenAPI定義として一次資料化した。
  [予約機能仕様](/specs/reservation-spec.md) から `resource:` で参照。

## 2026-07-29

* Update: [メニューAPI仕様](/specs/menu-api-spec.md) を更新。事実の列挙のみだった内容に、
  imageUrl変換をAPI側に集約している設計判断と、CDNキャッシュに関する落とし穴を追記。収録方針への準拠のため。

## 2026-07-24

* Creation: [メニューAPI仕様](/specs/menu-api-spec.md) を追加。バンドル初期作成。
* Creation: [予約機能仕様](/specs/reservation-spec.md) を追加。バンドル初期作成。
* Creation: [システム全体アーキテクチャ設計](/design/system-architecture-design.md) を追加。バンドル初期作成。
* Creation: [メニュー画像が更新されない問題の調査](/notes/image-cache-investigation.md) を追加。バンドル初期作成。
* Creation: [季節メニュー更新手順](/notes/menu-update-procedure.md) を追加。バンドル初期作成。
* Creation: 参照資産 [menu-api.yaml](/_references/menu-api.yaml) を追加。バンドル初期作成。
