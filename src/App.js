
import { Link, Route, Routes } from 'react-router-dom';
import { AgGridBlockingComponent } from './components/AgGridBlockingData';
import { AgGridStreamingComponent } from './components/AgGridStreamingData';
import { ReactRelayDataFetcher } from './components/ReactRelayDataFetcher';
import { TextStreamingDataComponent } from './components/TextStreamingData';
import BroadcastComponent from './components/BroadcastComponent';

export function App() {
  return (
    <div className='container-md p-5 my-5'>

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

      <div className='row'>
        <div className='col-md-2'>
          <ul className="nav nav-pills">
            <li className='nav-item'><Link className='nav-link' to="/">Home (GraphQL)</Link></li>
            <li className='nav-item'><Link className='nav-link' to="/streaming-grid"> AgGrid Streaming </Link></li>
            <li className='nav-item'><Link className='nav-link' to="/blocking-grid">AgGrid Blocking</Link></li>
            <li className='nav-item'><Link className='nav-link' to="/streaming-text">Table Streaming</Link></li>
            <li className='nav-item'><Link className='nav-link' to="/broadcast">Broadcast API</Link></li>
          </ul>
        </div>

        <div className='col-md-8'>
          <Routes>
            <Route path='/' element={<ReactRelayDataFetcher />} />
            <Route path='/streaming-grid' element={<AgGridStreamingComponent />} />
            <Route path='/blocking-grid' element={<AgGridBlockingComponent />} />
            <Route path='/streaming-text' element={<TextStreamingDataComponent />} />
            <Route path='/broadcast' element={<BroadcastComponent />} />
          </Routes>
        </div>

        <div className='col-md-2'>Right Panel</div>
      </div>

    </div>
  );
}
