## Markdownの描画

- [描画](https://docs.astro.build/ja/guides/markdown-content/#markdown%E3%81%AE%E3%82%A4%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%88)

```
file - ファイルの絶対パス（例：/home/user/projects/.../file.md）。
url - もしページなら、そのページのURL (例:/en/guides/markdown-content)。
frontmatter - ファイルのYAML フロントマターで指定された全データを含みます。
getHeadings - ファイル内のすべての見出し（すなわちh1 -> h6要素）の配列を返す非同期関数です。各見出しのslugは、与えられた見出しに対して生成されたIDに対応し、アンカーリンクに使用できます。このリストは次の型に従います。{ depth: number; slug: string; text: string }[]。
Content - ファイルのレンダリングされた完全なコンテンツを返すコンポーネントです。
(Markdownのみ) rawContent() - 生のMarkdownドキュメントを文字列として返す関数です。
(Markdownのみ) compiledContent() - HTML文字列にコンパイルされたMarkdownドキュメン
```

## Markdownのカスタマイズ

- [Layoutの定義](https://docs.astro.build/ja/guides/markdown-content/#mdx%E3%81%A7%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%83%9E%E3%82%BF%E3%83%BC%E5%A4%89%E6%95%B0%E3%82%92%E4%BD%BF%E7%94%A8)
- [Markdownのimport](https://docs.astro.build/ja/guides/markdown-content/#markdown%E3%81%AE%E3%82%A4%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%88)
- [独自テーマの追加](https://docs.astro.build/ja/guides/markdown-content/#%E7%8B%AC%E8%87%AA%E3%83%86%E3%83%BC%E3%83%9E%E3%81%AE%E8%BF%BD%E5%8A%A0)

### MDX

- [MDXの使用方法](https://docs.astro.build/ja/guides/markdown-content/#mdx%E3%81%A7%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%82%92%E4%BD%BF%E7%94%A8)
- [カスタムコンポーネントをHTML要素に割り当てる](https://docs.astro.build/ja/guides/markdown-content/#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%82%92html%E8%A6%81%E7%B4%A0%E3%81%AB%E5%89%B2%E3%82%8A%E5%BD%93%E3%81%A6%E3%82%8B)


## 構造化マークアップ一覧

### references

- https://developers.google.com/search/docs/appearance/structured-data/search-gallery?hl=ja

### test

- https://developers.google.com/search/docs/appearance/structured-data?hl=ja

