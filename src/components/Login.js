import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { loginUser } from "../actions";

import LoadingEllispis from "./common/LoadingEllipsis";

const initialValues = {
  username: "",
  password: "",
};

function Login({ dispatch, isFetching, loginComplete, errors }) {
  const navigate = useNavigate();
  const [values, handleChange, clearForm] = useForm("login", initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    values.username = values.username.toLowerCase();
    dispatch(loginUser(values));
    clearForm(e);
  };
  if (loginComplete) {
    navigate("/account");
  }
  if (isFetching) {
    return <LoadingEllispis />;
  }
  return (
    <div className="login page">
      <form onSubmit={handleSubmit}>
        <div className="top">
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        {errors && <p className="error">{errors.response.data.message}</p>}
        <button className="round-button">Login</button>
        <div className="join-btn">
          <Link to="/join">
            <button>Join</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isFetching: state.isFetching,
  loginComplete: state.loginComplete,
  errors: state.errors,
});
export default connect(mapStateToProps)(Login);
