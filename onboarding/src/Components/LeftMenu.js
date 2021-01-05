import React from "react";
import { NavLink } from "react-router-dom";
import ModeButton from "./ModeButton";

function LeftMenu({ packageId }) {
  return (
    <aside className="app-aside app-aside-expand-md app-aside-light">
      <div className="aside-content">
        <header className="aside-header d-block d-md-none"></header>
        <div className="aside-menu overflow-hidden">
          <nav id="stacked-menu" className="stacked-menu">
            <ul className="menu">
              <li className="menu-header px-0">
                <NavLink
                  exact
                  to="/"
                  className="menu-link p-0"
                  activeStyle={{ color: "#346CB0" }}
                >
                  <span className="menu-icon fas fa-home"></span>{" "}
                  <span className="menu-text">Dashboard</span>
                </NavLink>
              </li>

              <li className="menu-item has-child has-active">
                <NavLink
                  to="/packages"
                  className="menu-link"
                  activeStyle={{ color: "#346CB0" }}
                >
                  <span className="menu-icon far fa-file"></span>{" "}
                  <span className="menu-text">Wdrożenia</span>
                </NavLink>
                {packageId > 0 && (
                  <ul className="menu">
                    <li className="menu-item">
                      <NavLink
                        to={{
                          pathname: "/package_page/" + packageId,
                          state: { packageId: packageId },
                        }}
                        className="menu-link"
                        activeStyle={{ color: "#346CB0" }}
                      >
                        Lista formularzy
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to={{
                          pathname: "/users_pages",
                          state: { packageId: packageId },
                        }}
                        className="menu-link"
                        activeStyle={{ color: "#346CB0" }}
                      >
                        - Wyślij pracownikowi
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="menu-item">
                <NavLink
                  to={{
                    pathname: "/add_user",
                    state: { packageId: packageId },
                  }}
                  className="menu-link"
                  activeStyle={{ color: "#346CB0" }}
                >
                  <span className="menu-icon fas fa-file"></span>{" "}
                  <span className="menu-text">Dodaj pracownika</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  to={{
                    pathname: "/user_list",
                    state: { packageId: packageId },
                  }}
                  className="menu-link"
                  activeStyle={{ color: "#346CB0" }}
                >
                  <span className="menu-icon fas fa-file"></span>{" "}
                  <span className="menu-text">Lista pracowników</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  to={{
                    pathname: "/company",
                    state: { packageId: packageId },
                  }}
                  className="menu-link"
                  activeStyle={{ color: "#346CB0" }}
                >
                  <span className="menu-icon fas fa-file"></span>{" "}
                  <span className="menu-text">O firmie</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  to={{
                    pathname: "/q_and_a",
                    state: { packageId: packageId },
                  }}
                  className="menu-link"
                  activeStyle={{ color: "#346CB0" }}
                >
                  <span className="menu-icon fas fa-file"></span>{" "}
                  <span className="menu-text">Q&A</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <ModeButton />
      </div>
    </aside>
  );
}
export default LeftMenu;
