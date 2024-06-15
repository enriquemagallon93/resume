import { type PageSize } from "./types";

export const A4: PageSize = {
  width: '21cm',
  height: '29.7cm',
  // horizontalMargin: '3.4mm',
  horizontalMargin: 50,
  // verticalMargin: '4mm',
  verticalMargin: 40
} as const;

export const LETTER: PageSize = {
  width: '21.59cm',
  height: "27.94cm",
  horizontalMargin: 30,
  verticalMargin: 20
}
