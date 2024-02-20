import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';

// Llamada a la función invoke dentro de un componente de React
class GreetComponent extends React.Component {
  componentDidMount() {
    invoke('greet', { name: 'World' }).then((response) => console.log(response));
  }

  render() {
    return (
      <React.StrictMode>
      <Router>    
        <App />
      </Router>
      </React.StrictMode>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<GreetComponent />);