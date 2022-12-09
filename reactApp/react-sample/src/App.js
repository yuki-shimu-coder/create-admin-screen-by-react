import React from 'react';
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
            bordered
            hover
            striped
            variant="dark"
            columns={COLUMNS}
            rows={ROWS}
          />
        </div>
      </div>
    </>
  );
}

export default App;