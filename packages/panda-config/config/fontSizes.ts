import type { GetPandaConfigMap } from "./interfaces";

export const pandaFontSizes: GetPandaConfigMap<"fontSizes"> = {
  // ---- Body / Text ----
  body: { value: "1rem" }, // 16px: 通常本文
  "body-sm": { value: "0.875rem" }, // 14px: 補足テキスト
  "body-xs": { value: "0.75rem" }, // 12px: キャプション、バッジ等

  // ---- Heading ----
  "heading-sm": { value: "1.125rem" }, // 18px: 小見出し
  heading: { value: "1.25rem" }, // 20px: セクションの見出し
  "heading-lg": { value: "1.5rem" }, // 24px: ページタイトル寄り

  // ---- Display / Hero ----
  "display-sm": { value: "1.875rem" }, // 30px: ちょい大きめタイトル
  display: { value: "2.25rem" }, // 36px: ヒーロー・LPのメインコピー
};
