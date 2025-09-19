import { useHistory } from "react-router-dom";
import { Routes } from "../routes";

function SignOut() {
  const history = useHistory();
  console.log(localStorage.getItem('token'));

  // clear storage
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.clear();
  sessionStorage.clear();

  history.push(Routes.SignIn.path);

  window.location.reload();

  return null;
}

export default SignOut;
