import { useHistory } from "react-router-dom";
import { Routes } from "../routes";

function SignOut() {
  const history = useHistory();
  console.log(localStorage.getItem('token'));

  // clear storage
  localStorage.removeItem("token");
  localStorage.removeItem("employee");
  localStorage.clear();
  sessionStorage.clear();

  localStorage.setItem("chatbotVisible",'false');
  history.push(Routes.SignIn.path);

  window.location.reload();

  return null;
}

export default SignOut;
