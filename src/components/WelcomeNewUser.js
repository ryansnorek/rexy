import { updateUserProfile } from "../actions";
import useForm from "../hooks/useForm";

const initialValues = {
  display_name: "",
  personality_type: "",
};

function WelcomeNewUser({ user, dispatch }) {
  const [values, handleChange, clearForm] = useForm("profile", initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { user_id } = user;
    const profileEdits = { ...values, user_id };
    dispatch(updateUserProfile(profileEdits, 1));
    clearForm(e);
  };

  return (
    <div className="page">
      <div className="edit-profile">
        <h2>Hey, {user.username}</h2>
        <p>
          Choose your display name and then start adding rexys and friends to
          your account
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="display_name"
            value={values.display_name}
            placeholder="Display name"
            onChange={handleChange}
          />
          {/* <input
            type="text"
            name="personality_type"
            value={values.personality_type}
            placeholder="Personality type"
            onChange={handleChange}
          /> */}
          <button className="round-button">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default WelcomeNewUser;