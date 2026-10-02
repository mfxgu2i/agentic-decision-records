// スタブ: CMSのURLをCDN経由のURLに変換する。
// 変換を集約した理由は docs/records/adr/0003-route-menu-images-through-cdn.md を参照。
const CDN_BASE = "https://cdn.sakura-cafe.example";

export function getMenuImageUrl(cmsRawUrl: string): string {
  const path = new URL(cmsRawUrl).pathname;
  // 同じファイル名で差し替えるとURLが変わらず、CDNのキャッシュが残る。
  return `${CDN_BASE}${path}`;
}
