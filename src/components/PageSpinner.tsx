import React, { ReactNode } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./PageSpinner.scss";

const PageSpinner: React.FC<{
  loading: boolean;
  children: ReactNode;
}> = ({ loading, children }) => {
  return loading ? (
    <div className="sc-page-spinner-container">
      <div className="sc-page-spinner">
        <CircularProgress />
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default PageSpinner;
