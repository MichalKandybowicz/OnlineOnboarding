import React from "react";
import PageAddressBar from "../PageAddressBar";
import PackagesListTable from "./PackagesListTable";


function PackagesListPage(props) {
    document.title = "Onboarding: wdrożenia";

    return(
        <div className="page-inner">
            <PageAddressBar page ="Twoje wdrożenia" />
            <PackagesListTable setPackageId={ props.setPackageId } />
        </div>
    )
}
export default PackagesListPage;

