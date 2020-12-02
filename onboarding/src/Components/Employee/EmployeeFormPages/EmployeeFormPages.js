import React, { useState, useEffect } from "react";
import EmployeeFormPagesAPI from "../../hooks/EmployeeFormPagesAPI";
import EmployeeFormPagesList from "./EmployeeFormPagesList";

const EmployeeFormPages = ({ switchPage, actualPackage }) => {
  const [pagesList, setPagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    EmployeeFormPagesAPI.getPages(actualPackage)
      .catch((error) => setError(error.message))
      .then((pages) => {
        setPagesList(pages);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="page-inner">
        <div className="page-section">
          <div className="card card-fluid">
            <div className="card-header">Lista Stron</div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "50%" }}>
                      Nazwa strony
                    </th>
                  </tr>
                </thead>
                <EmployeeFormPagesList
                  pagesList={pagesList}
                  switchPage={switchPage}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeFormPages;
