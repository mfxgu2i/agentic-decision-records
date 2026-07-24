// スタブ: CMSの生URLをCDN経由のURLへ変換する。
// 変換規則の背景は knowledge/notes/image-cache-investigation.md を参照。
const CDN_BASE = "https://cdn.sakura-cafe.example";

export function getMenuImageUrl(cmsRawUrl: string): string {
  const path = new URL(cmsRawUrl).pathname;
  // ファイル名が同じ差し替えではURLが変わらないため、CDNキャッシュが残る点に注意
  return `${CDN_BASE}${path}`;
}
