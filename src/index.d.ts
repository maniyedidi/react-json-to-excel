import type { NamedExoticComponent, ButtonHTMLAttributes } from 'react';

export interface SheetData {
  sheetName: string;
  details: Record<string, unknown>[];
}

export interface JsonToExcelProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title' | 'color'> {
  /** Rows, or an array of `{ sheetName, details }` when `multipleSheets` is true. */
  data: Record<string, unknown>[] | SheetData[];
  /** Button label. Defaults to "Download". */
  title?: string;
  /** Download file name without extension. Defaults to "download". */
  fileName?: string;
  btnClassName?: string;
  /** Button background color. Defaults to #4CAF50. */
  btnColor?: string;
  multipleSheets?: boolean;
}

export const JsonToExcel: NamedExoticComponent<JsonToExcelProps>;

export function exportToExcel(
  data: Record<string, unknown>[] | SheetData[],
  fileName?: string,
  multipleSheets?: boolean
): void;
