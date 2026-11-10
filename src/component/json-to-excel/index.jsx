import { memo, useCallback, useMemo } from 'react';
import saveAs from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const EXCEL_EXTENSION = '.xlsx';
const MAX_SHEET_NAME = 31;

const BASE_STYLE = {
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  cursor: 'pointer',
};

const safeSheetName = (name, index, used) => {
  const base =
    String(name ?? '')
      .replace(/[\\/?*[\]:]/g, '_')
      .slice(0, MAX_SHEET_NAME) || `Sheet${index + 1}`;
  let candidate = base;
  let n = 1;
  while (used.has(candidate.toLowerCase())) {
    const suffix = `_${n++}`;
    candidate = base.slice(0, MAX_SHEET_NAME - suffix.length) + suffix;
  }
  used.add(candidate.toLowerCase());
  return candidate;
};

export const exportToExcel = (data, fileName = 'download', multipleSheets) => {
  if (!Array.isArray(data)) {
    throw new TypeError('exportToExcel: `data` must be an array');
  }

  const wb = XLSX.utils.book_new();

  if (multipleSheets) {
    const used = new Set();
    data.forEach(({ sheetName, details }, i) => {
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(details || []),
        safeSheetName(sheetName, i, used)
      );
    });
  } else {
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), 'data');
  }

  const eb = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([eb], { type: EXCEL_TYPE }), fileName + EXCEL_EXTENSION);
};

export const JsonToExcel = memo(function JsonToExcel({
  data,
  title,
  fileName,
  btnClassName,
  btnColor = '#4CAF50',
  multipleSheets,
  ...rest
}) {
  const onClick = useCallback(
    () => exportToExcel(data, fileName, multipleSheets),
    [data, fileName, multipleSheets]
  );
  const style = useMemo(
    () => ({ ...BASE_STYLE, background: btnColor }),
    [btnColor]
  );

  return (
    <div>
      <button
        type='button'
        {...rest}
        className={btnClassName}
        onClick={onClick}
        style={style}
      >
        {title || 'Download'}
      </button>
    </div>
  );
});
