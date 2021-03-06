import { connect } from "react-redux";
import useForm from "../hooks/useForm";
import useInputMask from "../hooks/useInputMask";
import { updateUser } from "../actions";

import { editUser } from "../helper";

const initialValues = {
  display_name: "",
  username: "",
  password: "",
  email: "",
  phone: "",
  uploaded_image: "",
};

function AccountEdit({ handleEdit, user, dispatch }) {
  const [values, handleChange, clearForm] = useForm("edit", initialValues);
  const [phone, inputPhone, handlePhoneChange] = useInputMask();
  
  const handleSubmit = (e) => {
    const editedUser = editUser(values, phone);
    dispatch(updateUser(editedUser, user.user_id));
    clearForm(e);
    handleEdit();
  };
  return (
    <div className="modal-wrapper">
      <div className="edit-modal">
        <nav>
          <img
            className="icon"
            onClick={handleEdit}
            src="../../images/close.png"
            alt="close"
          />
        </nav>
        <form onSubmit={handleSubmit}>
          <label>
            Display Name:
            <input
              type="text"
              name="display_name"
              placeholder={user.display_name}
              value={values.display_name}
              onChange={handleChange}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              placeholder={user.username}
              value={values.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="***********"
              value={values.password}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder={user.email}
              value={values.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="phone"
              name="phone"
              placeholder={user.phone}
              onChange={handlePhoneChange}
              ref={inputPhone}
            />
          </label>
          <div className="button-container">
            <button className="round-button">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({ user: state.user });
export default connect(mapStateToProps)(AccountEdit);
