import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { dateToString } from "../utils";
//import { removeCombo } from "../hooks/Packages";
import "../../static/css/style.css";


function PackagesRow({ row, handleRemoveAsk, lastRow, setPackageId }) {
    const [styleRow, setStyleRow] = useState(null);

    useEffect(() => {
        if(lastRow && Date.now() - Date.parse(row.created) < 3000) {
            setStyleRow('style-package-row')
        } else {
            setStyleRow(null);
        }
    }, [lastRow]);

    const handleClick = () => {
        setPackageId(row.key);
    }

    return(
        <tr className={styleRow}>
            <td>
                <Link to={{ pathname: "/package_page/" + row.key, state: { packageId: row.key, setPackageId: setPackageId } }} onClick={ () => setPackageId(row.key) } className="link">{row.name}</Link>
            </td> 
            <td>{ dateToString(row.last_edit) }</td>{/* na polski; */}
            <td>
                <Link to={{ pathname: "/package_page/" + row.key, state: { packageId: row.key, setPackageId: setPackageId } }} onClick={ handleClick } className="btn btn-secondary">edytuj</Link> / <button type="button" value={ row.key } className="btn btn-secondary" onClick={ handleRemoveAsk }>usuń</button>
            </td>
        </tr>
    )
}
export default PackagesRow;
