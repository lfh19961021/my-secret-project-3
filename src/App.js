import { useEffect } from 'react';
import { ConfigProvider, message } from 'antd';
import Layout from './layout/Layout'


import useStore from './store'

import 'antd/dist/antd.css';
import './App.css';

function App() {
  const fetchSetData = useStore(state => state.fetchSetData)
  useEffect(() => {
    fetchSetData()
    
    
    // message.success('Load data from MongoDB Atlas successfully')
    // message.error('Fail to load data from MongoDB Atlas, use dummy data')
  })
  return (
    <div className="App">
      <ConfigProvider>
        <Layout />
      </ConfigProvider>
    </div>
  );
}

export default App;
