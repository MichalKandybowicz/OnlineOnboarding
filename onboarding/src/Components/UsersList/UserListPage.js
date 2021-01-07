import React, { useEffect } from "react";
import PageAddressBar from "../PageAddressBar";
import UsersList from "./UsersList";

function UserListPage(props) {
		document.title= "Onboarding: lista pracowników";
		
		useEffect(() => {
			props.setPackageId(0);
		}, []);

    return(
			<div className="page-inner">
				<PageAddressBar page={ "Konta" } />
				<UsersList loggedUser={ props.loggedUser } />
			</div>
    )
}

export default UserListPage;

