import React from "react";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";
import ModeButton from "./ModeButton";

function LeftMenu({ leftMenuLinks, packageId, showAside, setToggleAside }) {
  const handleClick = () => {
    setToggleAside(false);
  };

  return (
    <aside
      className={`app-aside app-aside-expand-md app-aside-light ${
        showAside ? "show" : ""
      }`}
      style={{ zIndex: "9" }}
    >
      <div className="aside-content mx-2 my-5">
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
                  onClick={handleClick}
                >
                  <span className="menu-icon fas fa-home"></span>{" "}
                  <span className="menu-text" title="Dashboard">
                    Dashboard
                  </span>
                </NavLink>
              </li>
              {leftMenuLinks.map((link) => (
                <li className="menu-item" key={ uuidv4() }>
                  <NavLink
                    to={link.to}
                    className="menu-link"
                    activeStyle={{ color: "#346CB0" }}
                    onClick={handleClick}
                  >
                    <span className="menu-icon fas fa-file"></span>{" "}
                    <span className="menu-text" title={link.title}>
                      {link.title}
                    </span>
                  </NavLink>

                  {/* Show submenu if packageId is set */}
                  {link.title === "Wdrożenia" && packageId > 0 ? (
                    <ul className="menu">
                      {link.submenu.map((sublink) => (
                        <li className="menu-item" key={ uuidv4() }>
                          <NavLink
                            to={{
                              pathname: sublink.to,
                              state: { packageId: packageId },
                            }}
                            className="menu-link"
                            activeStyle={{ color: "#346CB0" }}
                            onClick={handleClick}
                          >
                            <span title={sublink.title}>{sublink.title}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <ModeButton />
      </div>
    </aside>
  );
}
export default LeftMenu;
