import axios from 'axios';
import { Suspense, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import './App.css';
import Table from './components/Table';

/**
 * axios
 * 参考 : Axios を使用してリクエスト ヘッダーを設定する
 * https://blog.logrocket.com/using-axios-set-request-headers/
 * 
 * 参考 : [HTTPヘッダー]AcceptとContent-Typeについて
 * https://qiita.com/satoru_pripara/items/89fff277db5212ec37e1
 */
/** 'content-type' = 'application/json' は、コンテンツが json 形式である必要があることを意味する */
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.get.Accept = 'application/json';
axios.defaults.baseURL = 'http://0.0.0.0:3001/';

/**
 * テーブルの列を指定
 * オブジェクトを追加することで列を追加することができます
 */
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

/**
 * valuesの値がnullじゃないとき、Tableコンポーネントにデータを渡してレンダリングする
 * @param {*} values ステート catsの値が格納 テーブルでは行データに該当する
 * @param {*} setState catsのセット関数が格納
 * @returns 
 */
const Pets = ({
  values,
  setState,
}) => {

  // 初回ロード時、非同期通信でデータを取得し、catsに値を格納
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