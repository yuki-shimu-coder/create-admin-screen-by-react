import React from 'react';
import { useRef } from 'react';
import './App.css';

import { Table } from './components/Table';

const COLUMNS = ['No.', 'Name', 'Age'];
const ROWS = [
  [1, 'one', 10],
  [2, 'two', 8],
  [3, 'three', 7],
];

function App() {
  return (
    <>
      <div className="bg-dark" style={{ minHeight: '100vh' }}>
        <div className="p-5">
          <Table
            columns={COLUMNS}
            rows={ROWS}
            bordered
            hover
            striped
            variant="dark"
          />
        </div>
      </div>
    </>
  );
}

export default App;