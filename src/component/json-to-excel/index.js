import saveAs from "file-saver";
import XLSX from "xlsx";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

export const JsonToExcel = ({ data, title, fileName, btnClassName }) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = {
      Sheets: {
        data: ws
      },
      SheetNames: ["data"]
    };

    const eb = XLSX.write(wb, { bookType: "xlsx", type: "array" });
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
