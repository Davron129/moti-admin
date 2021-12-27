import { useNavigate } from "react-router-dom"

const Private = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    if(localStorage.getItem("moti_token")) {
        return children
    } else {
        navigate("/login")
        // return 
    }

    return children


}

export default Private