import './App.css';
import Main from './Components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import ComplaintListComponent from './Components/complaintListComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ComplaintListComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
