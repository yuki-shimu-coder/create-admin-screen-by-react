import axios from 'axios';
import { Suspense, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import './App.css';
import Table from './components/Table';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.get.Accept = 'application/json';
axios.defaults.baseURL = 'http://0.0.0.0:3001/';

const COLUMNS = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'なまえ',
  },
  {
    accessorKey: 'age',
    header: '年齢',
  },
];

const Pets = ({
  values,
  setState,
}) => {

  if (values === null) {
    if (setState) {
      throw axios.get('/cats').then(response => setState(response.data));
    }
  }

  return (
    <Table
      bordered
      hover
      striped
      variant="dark"
      columns={COLUMNS}
      rows={values}
    />
  );
};

function App() {

  const [cats, setCats] = useState(null);

  return (
    <div className="App">
      <header className="App-header p-5">
        <Suspense fallback={<Spinner animation="border" variant="light" />}>
          <Pets values={cats} setState={setCats} />
        </Suspense>
      </header>
    </div>
  );
}

export default App;