import React from "react";
import PageAddressBar from "../PageAddressBar";
import QnAList from "./QnAList";

const QnAPage = () => {
  return (
    <div className="page-inner">
      <PageAddressBar page="Q&A" />
      <div className="page-section">
        <form>
          <div className="page-section">
            <QnAList />
          </div>
        </form>
      </div>
    </div>
  );
};

export default QnAPage;
