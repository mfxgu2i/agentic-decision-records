// スタブ: CMSのURLをCDN経由のURLに変換する。
// 変換を集約した理由は docs/decisions/0003-route-menu-images-through-cdn.md を参照。
const CDN_BASE = "https://cdn.sakura-cafe.example";

export function getMenuImageUrl(cmsRawUrl: string): string {
  const path = new URL(cmsRawUrl).pathname;
  // URLの形式を変えない理由は docs/decisions/0005-keep-image-url-format-until-cache-strategy.md を参照。
  return `${CDN_BASE}${path}`;
}
