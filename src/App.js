
import { AgGridBlockingComponent } from './components/AgGridBlockingData';
import { AgGridStreamingComponent } from './components/AgGridStreamingData';
import { TextStreamingDataComponent } from './components/TextStreamingData';

const App = () => {
  return (
    <div>
      <p>TextStreamingDataComponent <TextStreamingDataComponent /></p>
      {/** 
      <p>AgGridStreamingComponent</p> <AgGridStreamingComponent />
      <p>AgGridBlockingComponent</p> <AgGridBlockingComponent />
    */}
    </div>
  );
}

export default App