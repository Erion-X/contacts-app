import { contacts } from './contactData';
import contactTable from './contactTable';

function App() {
  return (
    <div className="App">
      Contacts App <div>{contactTable(contacts)}</div>
    </div>
  );
}

export default App;
