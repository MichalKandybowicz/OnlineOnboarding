import React from "react";
import FormTableAddNew from "./FormTableAddNew";


function FormTableSearch(props) {
   if(! props.pack){
        return (
            <div>
                Ładowanie ...

            </div>
        )
   }

    return(
        <div>
            <div className="row mb-4">
                <div className="col">
                    <div className="has-clearable">
                        <input type="text" className="form-control" placeholder="Nazwa formularza" />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="dropdown">
                        <button className="btn btn-secondary" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Zapisz</button>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <div className="has-clearable">
                        <input type="text" className="form-control" placeholder="Opis Formularza" />
                    </div>
                </div>
                <div className="col-auto">
                    <div className="dropdown">
                        <button className="btn btn-secondary" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Zapisz</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormTableSearch;

