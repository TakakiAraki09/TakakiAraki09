export interface NewsItemEntity {
  guid: string
  title: string
  link: string
  pubDate: string | null
  isoDate: string | null
  content: string | null
  contentSnippet: string | null
}
