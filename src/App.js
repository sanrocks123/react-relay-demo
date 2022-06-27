
import { Link, Route, Routes } from 'react-router-dom';
import { AgGridBlockingComponent } from './components/AgGridBlockingData';
import { AgGridStreamingComponent } from './components/AgGridStreamingData';
import { ReactRelayDataFetcher } from './components/ReactRelayDataFetcher';
import { TextStreamingDataComponent } from './components/TextStreamingData';
import BroadcastComponent from './components/BroadcastComponent';

export function App() {
  return (
    <div>
      <div>
        <ul>
          <li><Link to="/">Home (GraphQL)</Link></li>
          <li><Link to="/streaming-grid"> AgGrid Streaming </Link></li>
          <li><Link to="/blocking-grid">AgGrid Blocking</Link></li>
          <li><Link to="/streaming-text">Text Streaming</Link></li>
          <li><Link to="/broadcast">Broadcast API</Link></li>
        </ul>
      </div>

      <Routes>
        <Route path='/' element={<ReactRelayDataFetcher />} />
        <Route path='/streaming-grid' element={<AgGridStreamingComponent />} />
        <Route path='/blocking-grid' element={<AgGridBlockingComponent />} />
        <Route path='/streaming-text' element={<TextStreamingDataComponent />} />
        <Route path='/broadcast' element={<BroadcastComponent />} />
      </Routes>

    </div>
  );
}
