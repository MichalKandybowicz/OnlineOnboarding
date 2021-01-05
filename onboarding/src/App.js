import React, { useState } from 'react';
import { HashRouter, Route } from 'react-router-dom';

//import UserListSearch from "./Components/UserListSearch";
//import UserListRow from "../Components/UsersList/UserListRow";
// import FormsManagerCheckPage from "./Components/FormsManagerCheckPage";// where manager checks how form was filled;
import Navbar from "./Components/Navbar";
import LeftMenu from "./Components/LeftMenu";
import LoggedUser from "./Components/hooks/LoggedUser.js";
import DashboardPage from "./Components/Dashboard/DashboardPage";
import UserListPage from "./Components/UsersList/UserListPage";
import FormsEditPage from "./Components/FormsEdit/FormsEditPage";
import FormTablePage from "./Components/FormTable/FormTablePage";
import AddUserTablePage from "./Components/AddUserTable/AddUserTablePage";
import UserManagerProfilePage from "./Components/EmployeeEdit/UserManagerProfilePage";
import PackagesListPage from "./Components/PackagesList/PackagesListPage";
import QnAPage from "./Components/QnA/QnAPage";
import EmployeeProfilePage from "./Components/EmployeeProfile/EmployeeProfilePage";
import CompanyInfoPage from "./Components/CompanyInfo/CompanyInfoPage";


function App() {
  const loggedUser = LoggedUser();
  // Set packageId by url hash - to get package's forms after page refresh
  const [packageId, setPackageId] = useState(
    window.location.hash.includes("package_page") 
    ? parseInt(window.location.hash.replace(/#\/package_page\//g, ""))
    : 0
  );

  return (
    <div className="app">
      <HashRouter>
        <header className="app-header app-header-dark">
          <Navbar loggedUser={ loggedUser } />
        </header>
        <LeftMenu packageId={ packageId } />
        <main className="app-main">
          <div className="wrapper">
            <div className="page">
              <Route path="/company">
                <CompanyInfoPage loggedUser={ loggedUser } />
              </Route>
              <Route path="/profile/manager">
                <UserManagerProfilePage />
              </Route>
              <Route path="/employee_profile" component={ EmployeeProfilePage } />
              <Route path="/add_user" component={ UserManagerProfilePage } />
              <Route path="/form_edit/:form_id" component={ FormsEditPage } />
              <Route path="/packages">
                <PackagesListPage setPackageId={ setPackageId } />
              </Route>
              <Route path="/package_page/:package_id">
                <FormTablePage packageId={ packageId } />
              </Route>
              <Route path="/q_and_a">
                <QnAPage />
              </Route>
              <Route path="/user_list">
                <UserListPage loggedUser={ loggedUser } />
              </Route>
              <Route path="/users_pages">
                <AddUserTablePage loggedUser={ loggedUser } packageId={ packageId } />
              </Route>
              <Route path="/" exact>
                <DashboardPage />
              </Route>
            </div>
          </div>
        </main>
      </HashRouter>
    </div>
  );
}

export default App;

