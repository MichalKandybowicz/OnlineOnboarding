import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// import { removePage } from "../hooks/PackagePage";
import { dateToString } from "../utils";
import "../../static/css/style.css";

function FormTableRow(props) {
    const [styleRow, setStyleRow] = useState(null);

    useEffect(() => {
        if(props.lastRow && Date.now() - Date.parse(props.row.last_edit) < 3000) {
            setStyleRow('style-package-row')
        } else {
            setStyleRow(null);
        }
    }, [props.lastRow]);


    return (
      <tr className={styleRow}>
        <td>
          <Link
            to={{
              pathname: `/form_edit/${props.row.key}`,
              state: {
                packageId: props.packageId,
                pageId: props.row.key,
                pageName: props.row.name,
                description: props.row.description,
                link: props.row.link,
              },
            }}
          >
            {props.row.name}
          </Link>
        </td>
        <td>{props.row.order}</td>
        <td>{dateToString(props.row.last_edit)}</td>
        <td>
          <Link
            to={{
              pathname: `/form_edit/${props.row.key}`,
              state: {
                packageId: props.packageId,
                pageId: props.row.key,
                pageName: props.row.name,
                description: props.row.description,
                link: props.row.link,
              },
            }}
            className="btn btn-secondary"
          >
            edytuj
          </Link>
          /{" "}
          <button className="btn btn-secondary" value={ props.row.key } onClick={ props.handleRemoveAsk }>
            usuń
          </button>
        </td>
      </tr>
    );
}

export default FormTableRow;

