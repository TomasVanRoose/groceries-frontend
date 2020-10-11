import React from 'react';
import './App.css';
import InsertableItemTable from './InsertableItemTable';

function App() {
  
  return (
    <div>
    <div className="uk-section-secondary uk-preserve-color">
      <nav className="color-grey uk-light">
        <div className="uk-container uk-container-small">
          <div>
            <ul className="uk-navbar-nav">
              <li className="uk-active">
              <a href="/home"><span uk-icon="icon: cart; ratio: 1.5"></span></a>
              </li>
              <li className="uk-active">
              <a href="/home">Boodschappen</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <InsertableItemTable />
    </div>
  );
}

export default App;
