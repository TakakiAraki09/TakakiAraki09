# mal-database プロジェクトのナレッジ

このプロジェクトで学んだ重要なポイントと、つまりやすい落とし穴をまとめたのだ。

## アーキテクチャ構成

```
main.ts
  ↓ usecaseを呼ぶだけ
Usecase層 (src/usecases/)
  ├─ syncUserAnimeList（全体制御）
  └─ syncAnimeListItem（アイテム処理）
  ↓ エンティティで通信
API層 (src/api/)
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
  id: string
  myanimelistId: number  // ← camelCase
  createdAt: Date        // ← Date型
}

// DB型はsnake_case + string
export interface ContentTable {
  id: string
  myanimelist_id: number // ← snake_case
  created_at: ColumnType<Date, string | undefined, never> // ← string型
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
import { userAnimeList } from './api/getAnimeList.ts'
const items = await userAnimeList({ userName })

// ✅ 良い例：usecase層を呼ぶ
import { syncUserAnimeList } from './usecases/syncUserAnimeList.ts'
await syncUserAnimeList({ userName })
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
const detail = await animeDetail({ animeId })
const entity = convertToContentEntity(detail, id, contentType) // usecase層で変換

// ✅ 良い例：API層で変換
const entity = await animeDetail({ animeId, id, contentType }) // API層が直接エンティティを返す
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
import { findContentByMalId } from '../ContentRepository.ts'

// ✅ 正しい
import { findContentByMalId } from '../repositories/ContentRepository.ts'
```

## 設計原則まとめ

1. **エンティティファースト**: 層間の通信は必ずエンティティを使う
2. **変換は境界で**: API層やRepository層の境界で変換を完結させる
3. **型の隠蔽**: 内部実装の型（`Daum`, `Root`など）は外に出さない
4. **責務の分離**: 各層の責務を明確にして、越境させない
5. **usecase層は高レベル**: ビジネスロジック全体をまとめる
6. **main.tsは薄く**: usecase層を呼ぶだけにする

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
```
