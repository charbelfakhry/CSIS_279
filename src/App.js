import React from 'react';
import './App.css';
import TableDemo from './TableDemo';
import TableFunc from './TableFunc';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserForm from './UserForm';
import AboutUs from './components/AboutUs';
import Menu from './components/Menu';
import OrderTable from './Pages/OrderTable';
import CustomerTable from './Pages/CustomerTable';
function App({ saveUser }) {
  return (
    <div className="App">

      <Router>
        <Menu />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <AboutUs />
          </Route>
          <Route path="/users">
            <TableFunc />
          </Route>
          <Route path="/userForm">
            <UserForm />
          </Route>
          <Route path="/orderTable">
            <OrderTable />
          </Route>
          <Route path="/customers">
            <CustomerTable />
          </Route>
          <Route path="/">
            <h3>Home page</h3>
          </Route>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
