import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PageAddressBar from "../PageAddressBar";
import Employee from "./Employee";
import { getUsers } from "../hooks/Users";

function DashboardPage(props) {
  const [isEmployee, setIsEmployee] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    props.setPackageId(0);
  }, []);
  
  useEffect(() => {
    getUsers(setIsEmployee, setEmployees, setIsLoaded);
  }, [props.count]);

  document.title= "Onboarding: pulpit";

  return (
    <div className="page-inner">
      <PageAddressBar page={ "" } />
      <div className="page-section">
        {" "}
        {/* placeholder */}
        {isLoaded ? (
          isEmployee ? (
            employees.map((employee) => {
              return <Employee employee={employee} key={uuidv4()} />;
            })
          ) : (
            <div className="card card-fluid p-4">
              <div className="card-body">
                Nie masz jeszcze wdrażanych pracowników (żeby wdrażać musisz mieć
                stworzony profil pracownika i podpięty pod niego content
                wdrożenia)
              </div>
              <div className="card-body">
                <Link to="/add_user" className="menu-link">
                  <button className="btn btn-secondary mr-5">
                    Stwórz profil pracownika
                  </button>
                </Link>
                <Link to="/packages" className="menu-link">
                  <button className="btn btn-secondary">
                    Stwórz content wdrożenia
                  </button>
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="card card-fluid p-4">
            <div className="card-body">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
