# Library Export

このディレクトリには、データベースからエクスポートされたライブラリデータが格納されるのだ。

## 使い方

### 1. データのエクスポート

```bash
# データベースから全データをJSONファイルにエクスポート
tsx src/export-main.ts
```

これで以下のファイルが生成されるのだ：
- `exports/content.json` - 全てのcontentデータ（エンティティ形式）
- `exports/content_state.json` - 全てのcontent_stateデータ（エンティティ形式）

### 2. コードからimport

エクスポート後、他のTypeScript/JavaScriptコードから簡単にimportできるのだ：

```typescript
// 方法1: 直接import（推奨）
import { contents, contentStates } from './exports/index.ts'

console.log(`Total contents: ${contents.length}`)
console.log(`Total content states: ${contentStates.length}`)

// 方法2: 関数で取得（動的に読み込む場合）
import { getContents, getContentStates } from './exports/index.ts'

const contents = getContents()
const contentStates = getContentStates()
```

### 3. ID指定で取得

便利なヘルパー関数もあるのだ：

```typescript
import {
  getContentById,
  getContentStateById,
  getContentByMalId,
  searchContentsByTitle,
  getContentStatesByStatus,
} from './exports/index.ts'

// IDで取得
const content = getContentById('uuid-here')
const contentState = getContentStateById('uuid-here')

// MyAnimeList IDで取得
const content = getContentByMalId(12345)

// タイトルで検索（部分一致）
const results = searchContentsByTitle('進撃の巨人')

// ステータスでフィルタ
const watching = getContentStatesByStatus('watching')
const completed = getContentStatesByStatus('completed')

console.log(`Watching: ${watching.length} anime`)
console.log(`Completed: ${completed.length} anime`)
```

## データ形式

### ContentEntity

```typescript
interface ContentEntity {
  id: string
  myanimelistId: number
  contentType: 'anime' | 'manga'
  title: string
  mainPictureMedium: string | null
  mainPictureLarge: string | null
  // ... その他のフィールド
  createdAt: Date
}
```

### ContentStateEntity

```typescript
interface ContentStateEntity {
  id: string
  listStatusStatus: 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch' | 'empty'
  listStatusScore: number | null
  listStatusNumEpisodesWatched: number | null
  listStatusIsRewatching: number | null
  listStatusUpdatedAt: Date | null
  listStatusStartDate: Date | null
  listStatusFinishDate: Date | null
  createdAt: Date
}
```

## 注意事項

- JSONファイル（`*.json`）は`.gitignore`に追加されているため、Gitには含まれないのだ
- エクスポートを実行する前に、`exports/index.ts`をimportするとwarningが表示されるのだ
- データはエンティティ形式（camelCase + Date型）でエクスポートされるのだ
- DB層の型（snake_case）ではなく、ドメイン層の型（camelCase）を使っているのだ

## ファイル構成

```
exports/
├── README.md           # このファイル
├── index.ts           # import用のエントリーポイント（Git管理対象）
├── content.json       # エクスポートされたcontentデータ（Git管理対象外）
└── content_state.json # エクスポートされたcontent_stateデータ（Git管理対象外）
```
