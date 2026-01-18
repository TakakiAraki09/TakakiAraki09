import * as cheerio from "cheerio";



export async function fetchOgImageUrl(pageUrl: string) {
  const res = await fetch(pageUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; OgImageFetcher/1.0; +https://example.com/bot)",
      accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch HTML: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    // 画像やJSONが返るケースもあるのでガード
    throw new Error(`Not HTML content-type: ${contentType}`);
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  // og:image は property="og:image" が基本。サイトによって name="og:image" の場合もあるので両対応。
  const ogImage =
    $('meta[property="og:image"]').attr("content") ||
    $('meta[name="og:image"]').attr("content") ||
    null;

  if (!ogImage) return null;

  // 相対URLだった場合に備えて、ページURLを基準に絶対URLへ
  const absolute = new URL(ogImage, pageUrl).toString();
  return absolute;
}
