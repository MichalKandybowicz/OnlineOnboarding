import React from "react";
import { Link } from 'react-router-dom';

function PageAddressBar({ page }) {
    return(
        <header className="page-title-bar">
            <div className="card card-fluid">
                <div className="card-body">
                    <h4 className="card-title">  </h4>
                    <hr />
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">DASHBOARD</Link>
                        </li>
                        <li className="breadcrumb-item active">{ page }</li>
                    </ol>
                </div>
            </div>
        </header>
    )
}

export default PageAddressBar;

