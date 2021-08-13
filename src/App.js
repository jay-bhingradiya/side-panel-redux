import SidebarComponent from './components/SidebarComponent';
import './App.css';
import store from './redux/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <div className="main">

        <SidebarComponent />
      </div>
    </Provider>
  );
};

export default App;
