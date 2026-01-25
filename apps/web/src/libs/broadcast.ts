const getAmazonSearchUrl = (target: string) => {
  const url = new URL("https://www.amazon.co.jp/s/ref=nb_sb_noss_1");
  url.searchParams.set("url", "search-alias=instant-video");
  url.searchParams.set("__mk_ja_JP", "カタカナ");
  url.searchParams.set("field-keywords", target);
  return url.toString();
};
const getUnextSearchUrl = (target: string) => {
  const url = new URL("https://video.unext.jp/freeword");
  url.searchParams.set("query", target);
  return url.toString();
};
const getAbemaSearchUrl = (target: string) => {
  const url = new URL("https://abema.tv/search");
  url.searchParams.set("q", target);
  return url.toString();
};
const getNetflixSearchUrl = (target: string) => {
  const netflix = new URL("https://www.netflix.com/search");
  netflix.searchParams.set("q", target);
  return netflix.toString();
};
export const broadcastUtils = {
  amazon: getAmazonSearchUrl,
  unext: getUnextSearchUrl,
  abema: getAbemaSearchUrl,
  netflix: getNetflixSearchUrl,
};
