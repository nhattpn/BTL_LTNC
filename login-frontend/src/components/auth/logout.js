import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/feature/userReducer";
import { logoutAdmin } from "../../store/feature/adminReducer";
import { Navbar, Nav, Button} from "react-bootstrap";

const BASE_URL = 'http://localhost:5000'

const LogOut = () => {
    const API_URL = BASE_URL + '/logout';
    const dispatch = useDispatch();
    const logOut = async () => {
        try {
            const response = await fetch(API_URL,{
                method: 'GET'
            });
            dispatch(logoutAdmin());
            dispatch(logoutUser())
            sessionStorage.clear();
            console.log(response.message || "logout");
        } catch (error) {
            console.error('Error logging out (backend):', error);
        } finally {
            window.location.href = '/';
        }
    };
    return (
        <>
        <Button  onClick={logOut} style={{ marginLeft: '3%', color: 'black', backgroundColor: 'white', border: 'none' }}>
          <div style={{ marginLeft: '30%', marginRight: '30%', backgroundColor: 'blue', borderRadius: '50%' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 5L12.59 6.41L14.17 8H6V10H14.17L12.59 11.58L14 13L18 9L14 5ZM2 2H9V0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H9V16H2V2Z" fill="white" />
            </svg>
          </div>
          <h6>LogOut</h6>
        </Button>
        </>
    );
};
export default LogOut;