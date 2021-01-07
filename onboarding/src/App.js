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
  const [showAside, setToggleAside] = useState(false);
  // Set packageId by url hash - to get package's forms after page refresh
  const [packageId, setPackageId] = useState(
    window.location.hash.includes("package_page") 
    ? parseInt(window.location.hash.replace(/#\/package_page\//g, ""))
    : 0
  );
  const [leftMenuLinks, setLeftMenuLinks] = useState([
    {title: "Wdrożenia", to: "/packages", submenu: [
      {title: "Lista formularzy", to: `/package_page/${ packageId }`},
      {title: "- Wyślij pracownikowi", to: "/users_pages"}
    ]},
    {title: "Dodaj pracownika", to: "/add_user"},
    {title: "Lista pracowników", to: "/user_list"},
    {title: "O firmie", to: "/company"},
    {title: "Q&A", to: "/q_and_a"},
  ]);

  return (
    <div className="app">
      <HashRouter>
        <header className="app-header app-header-dark">
          <Navbar loggedUser={ loggedUser } showAside={ showAside } setToggleAside={ setToggleAside } />
        </header>
        <LeftMenu leftMenuLinks={ leftMenuLinks } packageId={ packageId } showAside={ showAside } setToggleAside={ setToggleAside } />
        <main className="app-main">
          <div className="wrapper">
            <div className="page">
              <Route path="/" exact>
                <DashboardPage setPackageId={ setPackageId } />
              </Route>
              <Route path="/packages">
                <PackagesListPage setPackageId={ setPackageId } />
              </Route>
              <Route path="/package_page/:package_id">
                <FormTablePage packageId={ packageId } />
              </Route>
              <Route path="/form_edit/:form_id" component={ FormsEditPage } />
              <Route path="/users_pages">
                <AddUserTablePage loggedUser={ loggedUser } packageId={ packageId } />
              </Route>
              <Route path="/add_user" component={ UserManagerProfilePage } />
              <Route path="/profile/manager">
                <UserManagerProfilePage setPackageId={ setPackageId } />
              </Route>
              <Route path="/employee_profile" component={ EmployeeProfilePage } />
              <Route path="/user_list">
                <UserListPage loggedUser={ loggedUser } setPackageId={ setPackageId } />
              </Route>
              <Route path="/company">
                <CompanyInfoPage loggedUser={ loggedUser } setPackageId={ setPackageId } />
              </Route>
              <Route path="/q_and_a">
                <QnAPage setPackageId={ setPackageId } />
              </Route>
            </div>
          </div>
        </main>
      </HashRouter>
    </div>
  );
}

export default App;

