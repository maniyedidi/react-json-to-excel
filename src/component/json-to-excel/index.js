import React from 'react';
import saveAs from 'file-saver';
import * as XLSX from 'xlsx';
import '../../styles.css';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export const JsonToExcel = ({
  data,
  title,
  fileName,
  btnClassName,
  btnColor = '#4CAF50',
  multipleSheets,
}) => {
  return (
    <div>
      <button
        className={`${btnClassName} download-button`}
        onClick={() => exportToExcel(data, fileName, multipleSheets)}
        style={{
          background: btnColor,
        }}
      >
        {title || 'Download'}
      </button>
    </div>
  );
};

export const exportToExcel = (data, fileName, multipleSheets) => {
  const wb = {
    Sheets: {},
    SheetNames: [],
  };

  if (multipleSheets) {
    data.forEach((item) => {
      const { sheetName, details } = item;
      const ws = XLSX.utils.json_to_sheet(details);
      wb.Sheets[sheetName] = ws;
      wb.SheetNames.push(sheetName);
    });
  } else {
    const ws = XLSX.utils.json_to_sheet(data);
    wb.Sheets.data = ws;
    wb.SheetNames.push('data');
  }

  const eb = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([eb], { type: EXCEL_TYPE });
  saveAs(blob, fileName + EXCEL_EXTENSION);
};
