import { useHistory } from "react-router-dom";

function SignOut() {
  const history = useHistory();
  console.log(localStorage.getItem('token'));

  // clear storage
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.clear();
  sessionStorage.clear();

  history.push("/sign-in");

  window.location.reload();

  return null;
}

export default SignOut;
