import React, { useRef } from "react";
import PageAddressBar from "../PageAddressBar";
import EmployeeProfileUser from "./EmployeeProfileUser";
import ProcessPreviewTables from "./ProcessPreviewTables";
import { isNumber } from "../utils";


function EmployeeProfilePage(props) {
	document.title = "Onboarding: podgląd procesu pracownika";
    // const packageIdRef = useRef(0);
    const singleUser = {id: 0, name: "", last_name: "", email: "", tel: "",
    				position: "", department: "", location: "", sent: "-", finished: "-", avatar: "/onboarding/static/images/unknown-profile.jpg"};

    // let loggedUser;
    // if(props.location.state){
    //     packageIdRef.current = props.location.state.packageId;
    //     loggedUser = (props.location.state.loggedUser)?props.location.state.loggedUser:LoggedUser();
    //     stateExists = true;
    // } else
    //     loggedUser = LoggedUser();
    
    if(props.location.state?.user){
        let user = props.location.state.user;
        if(user.id)
            singleUser.id = user.id;

        if(typeof user.first_name === "string")
            singleUser.name = user.first_name;
        if(typeof user.last_name === "string")
            singleUser.last_name = user.last_name;

        if(typeof user.email === "string" && user.email !== "-")
            singleUser.email = user.email;
        if(typeof user.tel === "string")
            singleUser.tel = user.tel;

        if(typeof user.position === "string")
            singleUser.position = user.position;
        if(typeof user.department === "string")
            singleUser.department = user.department;
        if(typeof user.location === "string")
            singleUser.location = user.location;

        if(typeof user.sent === "string" || isNumber(user.sent) )
            singleUser.sent = user.sent;
        if(typeof user.finished === "string")
            singleUser.finished = user.finished;

        if(typeof user.avatar === "string" && user.avatar.length > 1)
            singleUser.avatar = user.avatar;
    }

    useEffect(() => {
        props.setPackageId(0);
      }, []);

    return(
        <div className="page-inner">
            <PageAddressBar page={ "Podgląd procesu pracownika" } />
            <div className="page-section">
                <EmployeeProfileUser user={ singleUser } />
                <ProcessPreviewTables userId={ singleUser.id } />
            </div>
        </div>
    )
}
export default EmployeeProfilePage;

