
import { AgGridBlockingComponent } from './components/ag-grid-blocking';
import { AgGridStreamingComponent } from './components/ag-grid-streaming';

const App = () => {
  return (
    <div>
      <p>AgGridStreamingComponent</p> <AgGridStreamingComponent />
      <p>AgGridBlockingComponent</p> <AgGridBlockingComponent />
    </div>
  );
}

export default App