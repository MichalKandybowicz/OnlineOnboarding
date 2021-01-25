import React from "react";
import UserEditForm from "./UserEditForm";
import PageAddressBar from "../PageAddressBar";

function AddEmployeePage() {
    document.title = "Onboarding: dodaj pracownika";
    
    const singleUser = {
        id: 0, 
        name: "", 
        last_name: "", 
        email: "", 
        tel: "",
        position: "", 
        department: "", 
        location: "", 
        avatar: "/onboarding/static/images/unknown-profile.jpg"
    };

    return (
        <main className="app-main">
            <div className="wrapper">
                <div className="page">
                    <div className="page-inner">
                        <PageAddressBar page="Dodaj pracownika" />
                        <div className="page-section">
                            <div className="card card-fluid">
                                <div className="card-header">Dodaj pracownika</div>
                                <UserEditForm
                                    user={ singleUser }
                                    enableUploadAvatar={ false }
                                    buttonTitle={ "Dodaj" }
                                    modalTitle={"Dodanie pracownika"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AddEmployeePage;
