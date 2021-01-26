import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import LeftMenu from "./Components/LeftMenu";
import LoggedUser from "./Components/hooks/LoggedUser.js";
import DashboardPage from "./Components/Dashboard/DashboardPage";
import UserListPage from "./Components/UsersList/UserListPage";
import FormsEditPage from "./Components/FormsEdit/FormsEditPage";
import FormTablePage from "./Components/FormTable/FormTablePage";
import AddUserTablePage from "./Components/AddUserTable/AddUserTablePage";
import ManagerEditPage from "./Components/UserEdit/ManagerEditPage";
import AddEmployeePage from "./Components/UserEdit/AddEmployeePage";
import EmployeeEditPage from "./Components/UserEdit/EmployeeEditPage";
import PackagesListPage from "./Components/PackagesList/PackagesListPage";
import QnAPage from "./Components/QnA/QnAPage";
import EmployeeProfilePage from "./Components/EmployeeProfile/EmployeeProfilePage";
import CompanyInfoPage from "./Components/CompanyInfo/CompanyInfoPage";
//import UserListSearch from "./Components/UserListSearch";
//import UserListRow from "../Components/UsersList/UserListRow";
// import FormsManagerCheckPage from "./Components/FormsManagerCheckPage"; // where manager checks how form was filled;

function App() {
  const loggedUser = LoggedUser();
 
  useEffect(() => {
    if (loggedUser.id > 0)
      sessionStorage.setItem("logged_user", JSON.stringify(loggedUser));
  }, [loggedUser]);

  return (
    <HashRouter>
      <div className="app">
        <header className="app-header app-header-dark">
          <Navbar loggedUser={ loggedUser } />
        </header>
        <LeftMenu />
        <main className="app-main">
          <div className="wrapper">
            <div className="page">
            {/* <div className="page has-sidebar-expand-xl"> */}
                <Switch>
                    <Route path="/user_list">
                        <UserListPage loggedUserId={ loggedUser.id } />
                    </Route>
                    <Route path="/profile/manager">
                        <ManagerEditPage user={ loggedUser } />
                    </Route>
                    <Route path="/add_user/">
                        <AddEmployeePage />
                    </Route>
                    <Route path="/edit_employee/:employee_id">
                        <EmployeeEditPage />
                    </Route>
                    <Route path="/employee/:employee_id">
                        <EmployeeProfilePage />
                    </Route>
                    <Route path="/packages">
                        <PackagesListPage />
                    </Route>
                    <Route path="/package/:package_id">
                        <FormTablePage companyId={ loggedUser.company_id } />
                    </Route>
                    <Route path="/form/:form_id">
                        <FormsEditPage />
                    </Route>
                    <Route path="/user_forms">
                        <AddUserTablePage loggedUserId={ loggedUser.id } />
                    </Route>
                    <Route path="/company">
                        <CompanyInfoPage loggedUser={ loggedUser } />
                    </Route>
                    <Route path="/q_and_a">
                        <QnAPage />
                    </Route>
                    <Route exact path="/">
                        <DashboardPage loggedUserId={ loggedUser.id } />
                    </Route>
                </Switch>
            </div>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
