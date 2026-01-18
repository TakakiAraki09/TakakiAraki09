import Parser from "rss-parser"
import type { NewsItemEntity } from '../../entities/index.ts'

const parser = new Parser()

interface RssItem {
  title: string
  link: string
  pubDate: string
  content: string
  contentSnippet: string
  guid: string
  isoDate: string
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
  }
}

export const fetchAnimeNews = async (): Promise<NewsItemEntity[]> => {
  const feed = await parser.parseURL("https://animeanime.jp/rss20/index.rdf")
  return feed.items.map((item) => convertToNewsItemEntity(item as RssItem))
}
