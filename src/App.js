import React from 'react';
import './App.css';
import InsertableItemTable from './InsertableItemTable';


const ITEMS = [
  {id: 1, name:"Tomaten", checked: false, position: 0},
  {id: 2, name:"Aardappels", checked: false, position: 1},
  {id: 3, name:"6 flessen ice tea", checked: false, position: 2},
  {id: 4, name:"Nalu", checked: true, position: 3},
  {id: 5, name:"Besjes", checked: false, position: 4}
];

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
    <InsertableItemTable items={ITEMS} />
    </div>
  );
}

export default App;
