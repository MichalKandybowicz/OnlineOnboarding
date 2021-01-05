import React from "react";
import PageAddressBar from "../PageAddressBar";
import UsersList from "./UsersList";

function UserListPage(props) {
    document.title= "Onboarding: lista pracowników";

    return(
			<div className="page-inner">
				<PageAddressBar page={ "Konta" } />
				<UsersList loggedUser={ props.loggedUser } />
			</div>
    )
}

export default UserListPage;

