import { BrowserRouter } from "react-router-dom";

function SignOut() {
    const navigate = BrowserRouter();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
}

export default SignOut;