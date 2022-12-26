import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

import { Table } from './components/Table';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.get.Accept = 'application/json';
axios.defaults.baseURL = 'http://localhost:3001/';

const COLUMNS = ['id', 'name', 'age'];

function App() {

  const [cats, setCats] = useState([]);

  useEffect(() => {
    axios.get('/cats').then(response => setCats(response.data));
  }, []);

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
            rows={cats.map(cat => [cat.id, cat.name, cat.age])}
          />
        </div>
      </div>
    </>
  );
}

export default App;