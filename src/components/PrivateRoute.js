import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ children, redirectTo, auth }) {
  if (auth.authorized) {
    return children;
  }
  return <Navigate to={redirectTo} />;
}

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(PrivateRoute);
