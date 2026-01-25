# mal-database プロジェクトのナレッジ

このプロジェクトで学んだ重要なポイントと、つまりやすい落とし穴をまとめたのだ。

## アーキテクチャ構成

### 依存性注入（DI）パターンを採用

このプロジェクトは**完全な依存性注入パターン**で設計されているのだ。

```
Scripts層 (src/scripts/)
  ↓ 【全ての依存性を組み立てる】
  const refreshTokenUsecase = refreshToken({
    refreshAccessToken,      ← API層
    findLatestAuthenticate,  ← Repository層
    upsertAuthenticate,      ← Repository層
  })
  const getTokenUsecase = getToken({
    findLatestAuthenticate,  ← Repository層
    refreshToken: refreshTokenUsecase  ← 他のUsecase
  })
  initializeAPI(getTokenUsecase)  ← API層を初期化
  ↓ Usecaseを実行
Usecase層 (src/usecases/)
  ├─ authenticate = (deps) => async (params) => { ... }
  ├─ refreshToken = (deps) => async () => { ... }
  ├─ getToken = (deps) => async () => { ... }
  └─ syncUserAnimeList（全体制御）
  ↓ エンティティで通信
API層 (src/api/)
  ├─ base.ts（initializeAPIで依存性を受け取る）
  ├─ userAnimeList → UserAnimeListItemEntity[]
  └─ animeDetail → ContentEntity
  ↓ エンティティ変換（内部で実行）
Entity層 (src/entities/)
  ├─ UserAnimeListItemEntity（API層→Usecase層の通信用）
  ├─ ContentEntity（ドメインモデル）
  ├─ ContentStateEntity（ドメインモデル）
  └─ converters.ts（DB型⇔エンティティの変換）
  ↓ DB型との変換
Repository層 (src/repositories/)
  └─ ContentRepository.ts
  ↓ データアクセス
Database層 (src/database.ts + src/types.ts)
```

## 各層の責務

### 1. API層（src/api/）

- **責務**: 外部API（MyAnimeList）との通信とエンティティへの変換
- **重要**: API特有の型（`Daum`, `ListStatus`など）は外にexportしない
- **返り値**: 必ずエンティティを返す（生のAPIレスポンスは返さない）

```typescript
// ✅ 良い例：エンティティを返す
export const userAnimeList = async (...): Promise<UserAnimeListItemEntity[]> => {
  const root = await createMyAnimeListAPI<Root>(...)
  return root.data.map(convertToUserAnimeListItemEntity) // 内部で変換
}

// ❌ 悪い例：生のAPIレスポンスを返す
export const userAnimeList = (...) => createMyAnimeListAPI<Root>(...)
```

### 2. Entity層（src/entities/）

- **責務**: ドメインモデルの定義とDB型との相互変換
- **重要**:
  - camelCaseでプロパティを定義する（snake_caseはDB層のみ）
  - Date型を積極的に使う（文字列の日付はDB層のみ）
- **converters.ts**: `toEntity`（DB→エンティティ）と`fromEntity`（エンティティ→DB）を提供

```typescript
// エンティティはcamelCase + Date型
export interface ContentEntity {
  id: string;
  myanimelistId: number; // ← camelCase
  createdAt: Date; // ← Date型
}

// DB型はsnake_case + string
export interface ContentTable {
  id: string;
  myanimelist_id: number; // ← snake_case
  created_at: ColumnType<Date, string | undefined, never>; // ← string型
}
```

### 3. Usecase層（src/usecases/）

- **責務**: ビジネスロジックの実装
- **重要**: API層の関数を直接使わない（main.tsから呼ばれる最上位の処理）
- **粒度**: 一連の処理をまとめる（細かく分割しすぎない）

```typescript
// ✅ 良い例：ビジネスロジック全体をまとめる
export const syncUserAnimeList = async ({ userName, ... }) => {
  const items = await userAnimeList({ userName })
  for (const item of items) {
    await syncAnimeListItem({ item, ... })
  }
}

// ❌ 悪い例：main.tsでAPI層を直接呼ぶ
// main.ts
const items = await userAnimeList({ userName }) // これはダメ！
```

### 4. Repository層（src/repositories/）

- **責務**: データベースへのCRUD操作
- **重要**: DB型（`NewContent`, `NewContentState`など）を受け取る
- **注意**: Kyselyの型定義に従う

### 5. main.ts

- **責務**: エントリーポイント（usecase層を呼ぶだけ）
- **重要**: API層やRepository層を直接触らない

## よくあるつまずきポイント

### 1. Kyselyの`created_at`が更新できない問題

**症状**:

```
型 'string' を型 'ValueExpression<Database, "content_state", never>' に割り当てることはできません
```

**原因**:
`ColumnType<Date, string | undefined, never>`の3番目の型引数が`never`なので、更新時に値を渡せない。

**解決策**:
更新時は`created_at`を除外する。

```typescript
// ✅ 正しい実装
const { created_at, ...updateData } = contentState
await db.updateTable('content_state').set(updateData).where(...)

// ❌ 間違った実装
await db.updateTable('content_state').set(contentState).where(...) // created_atが含まれているとエラー
```

### 2. API層の型をusecase層で使ってしまう

**症状**:
usecase層で`Daum`などのAPI特有の型を使っている。

**原因**:
API層の責務が漏れている。

**解決策**:
エンティティを作って、API層で変換する。

```typescript
// ❌ 悪い例：API型をusecase層で使う
import type { Daum } from '../api/getAnimeList.ts'
export const syncAnimeListItem = async ({ item }: { item: Daum }) => { ... }

// ✅ 良い例：エンティティを使う
import type { UserAnimeListItemEntity } from '../entities/index.ts'
export const syncAnimeListItem = async ({ item }: { item: UserAnimeListItemEntity }) => { ... }
```

### 3. main.tsでAPI層を直接呼ぶ

**症状**:
main.tsで`userAnimeList`や`animeDetail`などのAPI関数を直接呼んでいる。

**原因**:
usecase層の責務が不明確。

**解決策**:
usecase層で全体の処理をまとめる関数を作る。

```typescript
// ❌ 悪い例：main.tsでAPI層を直接呼ぶ
import { userAnimeList } from "./api/getAnimeList.ts";
const items = await userAnimeList({ userName });

// ✅ 良い例：usecase層を呼ぶ
import { syncUserAnimeList } from "./usecases/syncUserAnimeList.ts";
await syncUserAnimeList({ userName });
```

### 4. 変換処理がusecase層に散らばる

**症状**:
usecase層で`convertToContentEntity`などの変換関数を呼んでいる。

**原因**:
API層の責務が不明確。

**解決策**:
API層で変換まで完結させる。

```typescript
// ❌ 悪い例：usecase層で変換
const detail = await animeDetail({ animeId });
const entity = convertToContentEntity(detail, id, contentType); // usecase層で変換

// ✅ 良い例：API層で変換
const entity = await animeDetail({ animeId, id, contentType }); // API層が直接エンティティを返す
```

### 5. ファイルパスの間違い

**症状**:
`Cannot find module '../ContentRepository.ts'`

**原因**:
実際のファイルは`../repositories/ContentRepository.ts`にある。

**解決策**:
正しいパスを使う。

```typescript
// ❌ 間違い
import { findContentByMalId } from "../ContentRepository.ts";

// ✅ 正しい
import { findContentByMalId } from "../repositories/ContentRepository.ts";
```

## 設計原則まとめ

1. **エンティティファースト**: 層間の通信は必ずエンティティを使う
2. **変換は境界で**: API層やRepository層の境界で変換を完結させる
3. **型の隠蔽**: 内部実装の型（`Daum`, `Root`など）は外に出さない
4. **責務の分離**: 各層の責務を明確にして、越境させない
5. **usecase層は高レベル**: ビジネスロジック全体をまとめる
6. **scripts層で依存性を組み立てる**: 全ての依存性注入はscripts層で行う
7. **依存関係は一方向**: API層→Usecase層の依存は禁止（逆方向のみ）

## 依存性注入（DI）パターンの重要ポイント

### ❌ 禁止事項

```typescript
// API層やRepository層でUsecaseを直接import
import { getToken } from "../usecases/getToken.ts"; // ❌ ダメ！

// Usecase内でAPI層を直接import
import { fetchAccessToken } from "../api/oauth.ts"; // ❌ ダメ！
```

### ✅ 正しいパターン

```typescript
// 1. Usecase層：高階関数で依存性を受け取る
export const getToken = (deps: GetTokenDeps) => async (): Promise<string> => {
  const auth = await deps.findLatestAuthenticate(); // 注入された関数を使う
  // ...
};

// 2. Scripts層：依存性を組み立てて注入
const getTokenUsecase = getToken({
  findLatestAuthenticate, // ← Repository層の関数
  refreshToken: refreshTokenUsecase, // ← 他のUsecase
});

// 3. API層：initializeAPIで受け取る
initializeAPI(getTokenUsecase); // ← Scripts層から注入
```

### なぜPromise<string>でトークンを渡すのか？

**質問**: `initializeAPI`に`string`（固定トークン）ではなく、`Promise<string>`（関数）を渡す理由は？

**回答**: 動的な有効期限チェックとトークン自動リフレッシュのため。

#### ❌ string版（固定トークン）の問題点

```typescript
// 起動時に1回だけトークンを取得
const token = await getTokenUsecase(); // "abc123..."
initializeAPI(token); // 固定文字列を渡す

// 問題1: 長時間実行すると期限切れ
await syncUserAnimeList({ limit: 10000 }); // 30分かかる
// → 途中でトークンが期限切れになってもリフレッシュされない！

// 問題2: 毎回同じトークンを使う
await api1(); // "abc123..." を使う
// ... 10分経過 ...
await api2(); // まだ "abc123..." を使う（期限切れかも）
```

#### ✅ Promise<string>版（関数）のメリット

```typescript
// 関数を渡す
initializeAPI(getTokenUsecase);

// メリット1: API呼び出しの度に有効期限チェック
await api1();
// → getTokenUsecase() が実行される
// → 有効期限チェック
// → まだ有効 → そのまま返す

// ... 10分経過 ...

await api2();
// → getTokenUsecase() が再度実行される
// → 有効期限チェック
// → 期限切れ間近 → 自動リフレッシュ！→ 新しいトークンを返す

// メリット2: 5分の安全マージン
const bufferMs = 5 * 60 * 1000; // getToken内部
// → 期限切れギリギリではなく、余裕を持ってリフレッシュ

// メリット3: スクリプト側は何も気にしなくていい
// トークン管理を完全に自動化！
```

#### 前提条件の違い

| 方式                | 前提条件                                         | 適用場面                       |
| ------------------- | ------------------------------------------------ | ------------------------------ |
| `string`版          | スクリプトが短時間（トークン有効期限内）で終わる | ワンショットの小さなスクリプト |
| `Promise<string>`版 | 長時間実行もあり得る                             | バッチ処理、大量データ同期     |

**結論**: このプロジェクトはバッチ処理で長時間実行する可能性があるため、`Promise<string>`版が最適なのだ！

## トラブルシューティング

### TypeScript型エラーが出た時

1. 実際の`tsc --noEmit`でエラーを確認する（MCPツールはキャッシュの問題がある）
2. エンティティとDB型を混同していないか確認
3. `created_at`を更新しようとしていないか確認

### アーキテクチャが崩れてきたら

1. main.tsでAPI層を直接触っていないか確認
2. usecase層でAPI特有の型を使っていないか確認
3. 変換処理がusecase層に散らばっていないか確認

## 参考コマンド

```bash
# TypeScript型チェック
npx tsc --noEmit

# 特定のファイルを探す
find src -name "*Repository*" -type f

# 型エラーをフィルタ
npx tsc --noEmit 2>&1 | grep "usecase"

# ライブラリデータのエクスポート
tsx src/export-main.ts
```

## ライブラリデータのエクスポート/インポート

### エクスポート機能

データベースの全データをJSON形式でエクスポートできるのだ。

```bash
# 全データをJSONファイルにエクスポート
tsx src/export-main.ts
```

**生成されるファイル:**

- `exports/content.json` - 全contentデータ（エンティティ形式）
- `exports/content_state.json` - 全content_stateデータ（エンティティ形式）

**重要:**

- データはエンティティ形式（camelCase + Date型）で出力される
- JSONファイルは`.gitignore`に含まれている（Gitには入らない）
- DB型（snake_case）ではなく、ドメイン型（camelCase）を使っている

### インポート機能

エクスポートしたデータを他のコードから簡単にimportできるのだ。

```typescript
// 直接import（推奨）
import { contents, contentStates } from "./exports/index.ts";

console.log(`Total: ${contents.length} contents`);

// 動的に取得
import { getContents, getContentStates } from "./exports/index.ts";
const contents = getContents();

// ID指定で取得
import {
  getContentById,
  getContentStateById,
  getContentByMalId,
  searchContentsByTitle,
  getContentStatesByStatus,
} from "./exports/index.ts";

const content = getContentById("uuid-here");
const watching = getContentStatesByStatus("watching");
const searchResults = searchContentsByTitle("進撃の巨人");
```

**注意:**

- エクスポートを実行する前にimportするとwarningが出る（正常動作）
- JSONファイルが無い場合は空配列`[]`を返す

### アーキテクチャ上のポイント

1. **Repository層に`findAll`を追加**

   ```typescript
   export const findAllContent = async (): Promise<Content[]>
   export const findAllContentState = async (): Promise<ContentState[]>
   ```

2. **Usecase層で変換を実行**

   ```typescript
   // DB型 → エンティティに変換してエクスポート
   const contentEntities = contents.map(toContentEntity);
   ```

3. **exports/index.tsで型安全にimport**
   ```typescript
   // JSONを読み込んで型付きで返す
   export const contents: ContentEntity[];
   export const contentStates: ContentStateEntity[];
   ```

詳細は `exports/README.md` を参照なのだ。
