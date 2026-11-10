import { JsonToExcel, exportToExcel } from '../component/json-to-excel';

export default { title: 'JSON To Excel', component: JsonToExcel };

const data1 = [
  { label: 'C' },
  { label: 'Java' },
  { label: 'Go' },
];
const samplejson2 = [
  { name: 'name01', age: '20', sex: 'M' },
  { name: 'name02', age: '22', sex: 'F' },
];
const multiSheetData = [
  { sheetName: 'sheet1', details: samplejson2 },
  { sheetName: 'sheet2', details: samplejson2 },
];

export const Basic = {
  args: { title: 'Download as Excel', data: data1, fileName: 'sample-file' },
};

export const CustomColor = {
  args: { title: 'Download as Excel color', data: samplejson2, fileName: 'sample-file', btnColor: 'red' },
};

export const MultiSheet = {
  args: { title: 'Multi sheet', data: multiSheetData, fileName: 'multi', multipleSheets: true },
};

export const UsingMethod = {
  render: () => (
    <button onClick={() => exportToExcel(data1, 'name')}>
      Download using method
    </button>
  ),
};
