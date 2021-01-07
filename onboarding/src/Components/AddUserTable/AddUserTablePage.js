import React, { useState } from "react";
import PageAddressBar from "../PageAddressBar";
import AddUserTable from "./AddUserTable";
import { singleCombo } from "../hooks/Packages";
import ModalWarning from "../ModalWarning";


function AddUserTablePage(props) {
    const [confirmationModal, setIdModal ] = useState({id: 0, modal: <></>});
    const packageObj = singleCombo(props.packageId);

    document.title = "Onboarding: wyślij pracownikowi";


    const popUpConfirmationModal = (message) => {
        setIdModal({id: 0,
            modal: <ModalWarning handleAccept={ hideModal } title={ "Potwierdzenie wysłania" } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />
        });
    };

    const hideModal = function(id){
        setIdModal({id: 0, modal: <></>});
    };

    return(
        <div className="page-inner">
            <PageAddressBar page={ "Wyślij pracownikowi" } />
            <AddUserTable 
                loggedUser={ props.loggedUser } 
                packageId={ props.packageId } 
                packageCurrent={ packageObj } 
                showModal={ popUpConfirmationModal } 
            />
            { confirmationModal.modal }
        </div>
    )
}
export default AddUserTablePage;

