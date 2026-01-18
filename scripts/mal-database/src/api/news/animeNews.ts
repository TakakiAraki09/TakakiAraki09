import Parser from "rss-parser"
import type { NewsItemEntity } from '../../entities/index.ts'
import { fetchOgImageUrl } from "../../utils/fetchOgImage.ts"

const parser = new Parser()

interface RssItem {
  title: string
  link: string
  pubDate: string
  content: string
  contentSnippet: string
  guid: string
  isoDate: string
  ogImageUrl: string | null
}

const convertToNewsItemEntity = (item: RssItem): NewsItemEntity => {
  return {
    guid: item.guid,
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    isoDate: item.isoDate,
    content: item.content,
    contentSnippet: item.contentSnippet,
    ogImageUrl: item.ogImageUrl,
  }
}

export const fetchAnimeNews = async (): Promise<NewsItemEntity[]> => {
  const feed = await parser.parseURL("https://animeanime.jp/rss20/index.rdf")
  return await Promise.all(feed.items.map(
    async (val) => {
      const ogImageUrl = await fetchOgImageUrl(val.link || "") || null;
      console.log(`Fetched og:image for ${val.link}: ${ogImageUrl}`);
      return convertToNewsItemEntity({
        ...val,
        ogImageUrl: ogImageUrl,
      } as RssItem);
    }
  ))
}
