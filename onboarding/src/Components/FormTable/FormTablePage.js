import React from "react";
import PageAddressBar from "../PageAddressBar";
import FormTable from "./FormTable";

function FormTablePage(props) {
    return(
        <div className="page-inner">
            <PageAddressBar page={ "Twoje wdrożenia" } />
            <FormTable packageId={ props.packageId } />
        </div>
    )
}
export default FormTablePage;

