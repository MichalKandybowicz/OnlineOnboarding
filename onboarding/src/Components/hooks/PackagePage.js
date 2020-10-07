import React, { useState, useEffect } from "react";
import { getPath } from "../utils.js";
import FormTableRow from "../FormTable/FormTableRow";
import FormPackageEdit from "../FormTable/FormPackageEdit";

/**
 * Get pages for package with defined id from Onboarding API when FormTable component is loaded;
 */
function PackagePage(props){
	var [rows , setRows] = useState([]),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/page/" + props.id + "/list_by_package_hr/", fetchProps).then(res => res.json()).then(
			(result) => {
				isLoaded(true);
				setRows(result);
			},
			(error) => {
				console.log(error);
			}
		);
	}, []);

	if(error){
		return <FormTableRow key={0} row={ {name: error.message, last_edit: ""} }/>
	} else if(!loaded)
		return <FormTableRow key={0} row={ {name: "Ładowanie ...", last_edit: ""} }/>
	else {
		var form_table = [], i, count = rows.length;
		for(i = 0; i < count; i++)
			form_table.push(<FormTableRow key={ rows[i].id } row={ {name: rows[i].title, order: rows[i].order, last_edit: "<do poprawy po stronie api>" } }/>);
		return ( <>{ form_table }</> )
	}

}

export function OnePackageEdit(props){
	var [element, setElement] = useState({title: "", description: ""}),
		[loaded, isLoaded] = useState(false);
	const [error, showError] = useState(null);
	let url = getPath(),
		fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

	useEffect(() => {
		fetch(url + "api/package/" + props.packageId, fetchProps).then(res => res.json()).then(
			(result) => {
				isLoaded(true);
				setElement(result);
			},
			(error) => {
				showError(error);
				console.log(error);
			}
		);
	}, []);

	if(error){
		return <FormPackageEdit key={0} error = { error.message } />
	} else if(!loaded)
		return <FormPackageEdit key={0} />
	else {
		return <FormPackageEdit pack={ {title: element.title, description: element.description} } /*handleSave = { props.handleSave }*/ />
	}
}

export default PackagePage;

