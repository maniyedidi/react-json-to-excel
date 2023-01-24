// import React from "react";
import { storiesOf } from '@storybook/react';

import { JsonToExcel, exportToExcel } from '../component/json-to-excel';

const stories = storiesOf('JSON To Excel', module);

stories.add('App', () => {
  const data1 = [
    { label: 'C' },
    { label: 'Java' },
    { label: 'Go' },
    { label: 'Javascript' },
    { label: 'HTML' },
    { label: 'CSS' },
    { label: 'REACT' },
    { label: 'JQUERY' },
  ];
  const samplejson2 = [
    { name: 'name01', age: '20', sex: 'M' },
    { name: 'name02', age: '22', sex: 'F' },
    { name: 'name03', age: '20', sex: 'M' },
  ];

  const multiSheetData = [
    {
      sheetName: 'sheet1',
      details: [
        { name: 'name01', age: '20', sex: 'M' },
        { name: 'name02', age: '22', sex: 'F' },
        { name: 'name03', age: '20', sex: 'M' },
      ],
    },
    {
      sheetName: 'sheet2',
      details: [
        { name: 'name01', age: '20', sex: 'M' },
        { name: 'name02', age: '22', sex: 'F' },
        { name: 'name03', age: '20', sex: 'M' },
      ],
    },
  ];

  return (
    <>
      <JsonToExcel
        title='Download as Excel'
        data={data1}
        fileName='sample-file'
        btnClassName='custom-class'
      />
      <br></br>
      <JsonToExcel
        title='Download as Excel color'
        data={samplejson2}
        fileName='sample-file'
        btnColor='red'
      />
      <br></br>
      <button onClick={() => exportToExcel(data1, 'name')}>
        Download using method
      </button>
      <br></br>

      <button onClick={() => exportToExcel(multiSheetData, 'name', true)}>
        Multi Sheet Download using method
      </button>
    </>
  );
});
