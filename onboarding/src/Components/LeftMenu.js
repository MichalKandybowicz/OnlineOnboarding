import React, { useRef } from "react";
import ModeButton from "./ModeButton";
import { Link, NavLink } from "react-router-dom";

function LeftMenu(props) {
  const packageIdRef = useRef(0);

  if (props.packageId && isFinite(String(props.packageId))) {
    packageIdRef.current = props.packageId;
  }

  let userListUrls = [];
  if (packageIdRef.current > 0) {
    userListUrls.push(
      <NavLink
        to={{
          pathname: "/add_user",
          state: { packageId: packageIdRef.current },
        }}
        className="menu-link"
        activeStyle={{color: "#346CB0"}}
      >
        <span className="menu-icon fas fa-file"></span>{" "}
        <span className="menu-text">Dodaj pracownika</span>
      </NavLink>
    );
    userListUrls.push(
      <NavLink
        to={{
          pathname: "/user_list",
          state: { packageId: packageIdRef.current },
        }}
        className="menu-link"
        activeStyle={{color: "#346CB0"}}
      >
        <span className="menu-icon fas fa-file"></span>{" "}
        <span className="menu-text">Lista pracowników</span>
      </NavLink>
    );
  } else {
    userListUrls.push(
      <NavLink to="/add_user" className="menu-link" activeStyle={{color: "#346CB0"}}>
        <span className="menu-icon fas fa-file"></span>{" "}
        <span className="menu-text">Dodaj pracownika</span>
      </NavLink>
    );
    userListUrls.push(
      <NavLink to="/user_list" className="menu-link" activeStyle={{color: "#346CB0"}}>
        <span className="menu-icon fas fa-file"></span>{" "}
        <span className="menu-text">Lista pracowników</span>
      </NavLink>
    );
  }

  return (
    <aside className="app-aside app-aside-expand-md app-aside-light">
      <div className="aside-content">
        <header className="aside-header d-block d-md-none"></header>
        <div className="aside-menu overflow-hidden">
          <nav id="stacked-menu" className="stacked-menu">
            <ul className="menu">
              <li className="menu-header px-0">
                <NavLink exact to="/" className="menu-link p-0" activeStyle={{color: "#346CB0"}}>
                    <span className="menu-icon fas fa-home"></span>{" "}
                    <span className="menu-text">Dashboard</span>
                </NavLink>
              </li>

              <li className="menu-item has-child has-active">
                <NavLink to="/packages" className="menu-link" activeStyle={{color: "#346CB0"}}>
                  <span className="menu-icon far fa-file"></span>{" "}
                  <span className="menu-text">Wdrożenia</span>
                </NavLink>
                {packageIdRef.current > 0 && (
                  <ul className="menu">
                    <li className="menu-item">
                      <NavLink
                        to={{
                          pathname: "/package_page",
                          state: { packageId: packageIdRef.current },
                        }}
                        className="menu-link"
                        activeStyle={{color: "#346CB0"}}
                      >
                        Lista formularzy
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink to="/form_list" className="menu-link" activeStyle={{color: "#346CB0"}}>
                        - Wyślij pracownikowi
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              {userListUrls.map((link, keyProp) => (
                <li className="menu-item" key={keyProp}>
                  {link}
                </li>
              ))}
              <li className="menu-item">
                <NavLink to="/q_and_a" className="menu-link" activeStyle={{color: "#346CB0"}}>
                  <span className="menu-icon fas fa-file"></span>{" "}
                  <span className="menu-text">Stwórz Q&A</span>
                </NavLink>
              </li>
            </ul>

            {/*<ul className="menu">
                        <li className="menu-header">
                            <span className="menu-icon fas fa-home"></span> <span className="menu-text">Components</span>
                        </li>

                        <li className="menu-item">
                            <Link to='/add_user' className="menu-link"><span className="menu-icon fas fa-file"></span> <span className="menu-text">Add new user</span></Link>
                        </li>
                        <li className="menu-item">
                            <Link to='/user_list' className="menu-link"><span className="menu-icon fas fa-file"></span> <span className="menu-text">Lista pracowników</span></Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/profile/manager" className="menu-link"> UserManagerProfile</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/employee_profile" className="menu-link"> EmployeeProfile</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/add_user" className="menu-link"> UserManagerProfile</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/form_edit" className="menu-link"> FormsEdit</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/package_page" className="menu-link"> FormTable</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/user_list" className="menu-link"> UserList</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/packages" className="menu-link"> PackagesList </Link>
                        </li>
                        <li className="menu-item">
                           <Link to="/form_list" className="menu-link"> AddUserTable </Link>
                        </li>

                        <li className="menu-item">
                            <Link to="/employe_forms_list" className="menu-link"> EmployeeFormsList</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/employe_page_fill" className="menu-link"> FormsEmployee</Link>
                        </li>
                      </ul>*/}
          </nav>
        </div>
        <ModeButton />
      </div>
    </aside>
  );
}
export default LeftMenu;
