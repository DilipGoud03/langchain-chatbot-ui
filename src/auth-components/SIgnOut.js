import { useNavigate } from "react-router-dom";

function SignOut() {
    const navigate = useNavigate();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
}

export default SignOut;