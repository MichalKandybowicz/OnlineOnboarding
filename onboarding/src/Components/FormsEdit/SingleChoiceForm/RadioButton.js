import React, { useState } from "react";
import PropTypes from "prop-types";

const RadioButton = ({
  id,
  name,
  title,
  answChecked,
  changeChecked,
  deleteAnswer,
  editAnswer,
  answRequired,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <tr>
      <td>
        <i className="fa fa-arrows">&#10018;</i>
      </td>
      <td>
        {editing === true ? (
          <div className="input-group">
            <input
              className="form-control"
              id={"edit" + id}
              name={name}
              type="text"
              value={title}
              onChange={editAnswer}
              required={answRequired}
            />
          </div>
        ) : (
          <div className="custom-control custom-control-inline custom-radio">
            <input
              className={`custom-control-input ${
                answChecked.includes(id) ? "is-valid" : ""
              }`}
              id={id}
              name={name}
              type="radio"
              value={title}
              onChange={changeChecked}
              checked={answChecked[0] === id}
              required={answRequired}
            />
            <label className="custom-control-label" htmlFor={id}>
              {title}
            </label>
          </div>
        )}
      </td>
      <td>
        {editing === true ? (
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              setEditing(false);
            }}
          >
            &#9997; Zapisz
          </button>
        ) : (
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              setEditing(true);
            }}
          >
            &#9997; Edytuj
          </button>
        )}
      </td>
      <td>
        <button className="btn text-danger" id={'del' + id} name={name} onClick={deleteAnswer}>
          <i className="fa fa-trash-o fa-lg">&#61944;</i> Usuń
        </button>
      </td>
    </tr>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  answChecked: PropTypes.array.isRequired,
  changeChecked: PropTypes.func.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
  editAnswer: PropTypes.func.isRequired,
  answRequired: PropTypes.bool,
};

export default RadioButton;
