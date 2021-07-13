import React from "react";
import saveAs from "file-saver";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

export const JsonToExcel = ({ data, title, fileName, btnClassName }) => {
    const exportToExcel = () => {
        const ws = window.XLS.utils.json_to_sheet(data);
        const wb = {
          Sheets: {
            data: ws
          },
          SheetNames: ["data"]
        };
    
        const eb = window.XLS.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([eb], { type: EXCEL_TYPE });
        saveAs(blob, fileName + EXCEL_EXTENSION);
      };

  return (
    <div>
      <button className={btnClassName} onClick={exportToExcel}>
        {title || "Download"}
      </button>
    </div>
  );
};
