import { contacts } from './contactData';
import ContactsTable from './ContactsTable';

function App() {
  return (
    <div className="App">
      Contacts App <div>{ContactsTable(contacts)}</div>
    </div>
  );
}

export default App;
