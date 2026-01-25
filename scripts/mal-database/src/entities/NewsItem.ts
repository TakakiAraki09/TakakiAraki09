export interface NewsItemEntity {
  guid: string;
  title: string;
  link: string;
  ogImageUrl: string | null;
  pubDate: string | null;
  isoDate: string | null;
  content: string | null;
  contentSnippet: string | null;
}
