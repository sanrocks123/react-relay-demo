
import { Link, Route, Routes } from 'react-router-dom';
import { AgGridBlockingComponent } from './components/AgGridBlockingData';
import { AgGridStreamingComponent } from './components/AgGridStreamingData';
import { TextStreamingDataComponent } from './components/TextStreamingData';
import BroadcastComponent from './components/BroadcastComponent';
import { Notification } from './components/Notifications.tsx'

import companyQuery from './queries/companyQuery.js';
import useQueryLoader from 'react-relay/lib/relay-hooks/useQueryLoader';
import GraphQueryData from './components/GraphQueryData.tsx';

export default function App() {
  const [
    queryRef,
    loadQuery,
    disposeQuery
  ] = useQueryLoader(companyQuery);

  return (
    <div className='container-md p-5 my-5'>
      <Header />
      <div className='row'>
        {LeftNavLinks(loadQuery)}
        {Main(queryRef)}
        {RightPanel()}
      </div>

    </div>
  );
}

function Header() {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="https://www.linkedin.com/in/sanjeevkumar-saxena-84421b45/">
          <img src="me.png" style={{ width: 200 }} className="" />
        </a>
        <div className='page-header'>
          <h1>sanrocks123 webspace!</h1>
          <p>A curated implementation of some of the modern webapp development APIs.
            Please feel free to download the source code available at my github account
            &nbsp;<a href="https://github.com/sanrocks123">sanrocks123</a> & extend it further as required.
          </p>
          <p>Watch out this space for more updates!</p>
        </div>
      </div>
    </nav>
  );
}

function Main(queryRef) {
  return <div className='col-md-8'>
    <Routes>
      <Route path='/' element={<AgGridStreamingComponent />} />
      <Route path='/graphql-api' element={<GraphQueryData refQuery={queryRef} />} />
      <Route path='/blocking-grid' element={<AgGridBlockingComponent />} />
      <Route path='/streaming-text' element={<TextStreamingDataComponent />} />
      <Route path='/broadcast' element={<BroadcastComponent />} />
    </Routes>
  </div>;
}

function LeftNavLinks(loadQuery) {
  return <div className='col-md-2'>
    <ul className="nav nav-pills">
      <li className='nav-item'><Link className='nav-link' to="/"> AgGrid Streaming </Link></li>

      <li className='nav-item' onClick={() => {
        console.log('graphql-api link onClick() -> loadQuery called');
        loadQuery({
          "id": "52cdef7c4bab8bd675297d8a"
        });
      }}><Link className='nav-link' to="/graphql-api">GraphQL API</Link></li>

      <li className='nav-item'><Link className='nav-link' to="/blocking-grid">AgGrid Blocking</Link></li>
      <li className='nav-item'><Link className='nav-link' to="/streaming-text">Table Streaming</Link></li>
      <li className='nav-item'><Link className='nav-link' to="/broadcast">Broadcast API</Link></li>
    </ul>
  </div>;
}


function RightPanel() {
  return <div className='col-md-2'><Notification /></div>;
}
