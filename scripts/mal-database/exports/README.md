# Library Export

このディレクトリには、データベースからエクスポートされたライブラリデータが格納されるのだ。

## 使い方

### 1. データのエクスポート

```bash
# データベースから全データをJSONファイルにエクスポート
tsx src/export-main.ts
```

これで以下のファイルが生成されるのだ：

- `exports/content.json` - contentテーブルのデータ（コンテンツタイプのみ）
- `exports/content_anime.json` - content_animeテーブルのデータ（アニメ詳細情報）
- `exports/content_state.json` - content_stateテーブルのデータ（視聴状態）

### 2. コードからimport

エクスポート後、他のTypeScript/JavaScriptコードから簡単にimportできるのだ：

```typescript
// 方法1: 直接import（推奨）
import { contents, contentAnimes, contentStates } from "./exports/index.ts";

console.log(`Total contents: ${contents.length}`);
console.log(`Total content animes: ${contentAnimes.length}`);
console.log(`Total content states: ${contentStates.length}`);

// 方法2: 関数で取得（動的に読み込む場合）
import {
  getContents,
  getContentAnimes,
  getContentStates,
} from "./exports/index.ts";

const contents = getContents();
const contentAnimes = getContentAnimes();
const contentStates = getContentStates();
```

### 3. ID指定で取得

便利なヘルパー関数もあるのだ：

```typescript
import {
  getContentById,
  getContentAnimeById,
  getContentStateById,
  getContentAnimeByMalId,
  searchContentAnimesByTitle,
  getContentStatesByStatus,
} from "./exports/index.ts";

// IDで取得
const content = getContentById("uuid-here");
const contentAnime = getContentAnimeById("uuid-here");
const contentState = getContentStateById("uuid-here");

// MyAnimeList IDで取得
const anime = getContentAnimeByMalId(12345);

// タイトルで検索（部分一致）
const results = searchContentAnimesByTitle("進撃の巨人");

// ステータスでフィルタ
const watching = getContentStatesByStatus("watching");
const completed = getContentStatesByStatus("completed");

console.log(`Watching: ${watching.length} anime`);
console.log(`Completed: ${completed.length} anime`);
```

## データ形式

### ContentEntity

コンテンツの種類だけを管理するシンプルなエンティティなのだ：

```typescript
interface ContentEntity {
  id: string;
  contentType: "anime" | "manga";
}
```

### ContentAnimeEntity

アニメ固有の詳細情報を管理するエンティティなのだ：

```typescript
interface ContentAnimeEntity {
  id: string;
  myanimelistId: number;
  title: string;
  mainPictureMedium: string | null;
  mainPictureLarge: string | null;
  alternativeTitlesEn: string | null;
  alternativeTitlesJa: string | null;
  alternativeTitlesSynonyms: string | null;
  startDate: string | null;
  synopsis: string | null;
  mean: number | null;
  rank: number | null;
  popularity: number | null;
  numListUsers: number | null;
  numScoringUsers: number | null;
  nsfw: string | null;
  malCreatedAt: string | null;
  malUpdatedAt: string | null;
  mediaType: string | null;
  status: string | null;
  genres: string | null;
  createdAt: Date;
}
```

### ContentStateEntity

ユーザーの視聴状態を管理するエンティティなのだ：

```typescript
interface ContentStateEntity {
  id: string;
  listStatusStatus:
    | "watching"
    | "completed"
    | "on_hold"
    | "dropped"
    | "plan_to_watch"
    | "empty";
  listStatusScore: number | null;
  listStatusNumEpisodesWatched: number | null;
  listStatusIsRewatching: number | null;
  listStatusUpdatedAt: Date | null;
  listStatusStartDate: Date | null;
  listStatusFinishDate: Date | null;
  createdAt: Date;
}
```

## 設計のポイント

**ContentとContentAnimeは別概念なのだ：**

- `content` = コンテンツの種類（anime or manga）だけを管理
- `content_anime` = アニメ固有の詳細情報を管理
- `content_state` = ユーザーの視聴状態を管理

今後`content_manga`テーブルを追加する時も、同じパターンで追加できるのだ！

## 注意事項

- JSONファイル（`*.json`）は`.gitignore`に追加されているため、Gitには含まれないのだ
- エクスポートを実行する前に、`exports/index.ts`をimportするとwarningが表示されるのだ
- データはエンティティ形式（camelCase + Date型）でエクスポートされるのだ
- DB層の型（snake_case）ではなく、ドメイン層の型（camelCase）を使っているのだ

## ファイル構成

```
exports/
├── README.md            # このファイル
├── index.ts            # import用のエントリーポイント（Git管理対象）
├── content.json        # contentデータ（Git管理対象外）
├── content_anime.json  # content_animeデータ（Git管理対象外）
└── content_state.json  # content_stateデータ（Git管理対象外）
```
