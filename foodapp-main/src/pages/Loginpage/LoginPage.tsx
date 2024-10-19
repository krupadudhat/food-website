import { useState } from "react"
import "./LoginPage.css"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/slices/LoginSlice";
import toast from "react-hot-toast";

// const LoginPage : FC<{isLoggedIn: boolean, setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}> = ({isLoggedIn, setIsLoggedIn})
const LoginPage = () => {

    const [login, setLogin] = useState(false);
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [signupUserData, setSignupUserData] = useState({ email: "", password: "", cpassword: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    }

    const loginHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        // console.log(userData);
        // setIsLoggedIn(true);
        if (!userData?.email || !userData?.password){
            toast.error('Please fill all Feild');
        }
        else{
            dispatch(userLogin(userData));
            window.localStorage.setItem("userData", JSON.stringify(userData));
            toast.success("LoggedIn Successfully");
            navigate(-1);
        }
    }

    const signupChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setSignupUserData((prev) => ({ ...prev, [name]: value }));
    }

    const signupHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        // console.log(signupUserData);
        if (!signupUserData?.email || !signupUserData.password || !signupUserData.cpassword ){
            toast.error('Please fill all Feild');
        }
        else if (signupUserData.password === signupUserData.cpassword) {
            // console.log(signupUserData);
            window.localStorage.setItem("userData", JSON.stringify(signupUserData));
            toast.success("Account created Successfully");
            navigate(-1);
        }
        else {
            toast.error("Passwords do not match.");
        }
    }

    return (
        <div className='loginpage'>
            <div className="loginpage_container">
                <div className={`${login ? 'loginpage_left' : 'loginpage_left_none'}`}>
                    
                    <form className="form_container" onSubmit={loginHandler}>
                        <p className="login_text">Log in</p>
                        <p className="desc">Welcome back! please enter your details.</p>
                        <label htmlFor="email" className="label_text">Email</label>
                        <input type="text" id="email" className="input_box" onChange={changeHandler} placeholder="Enter Your Email" value={userData.email} name="email" />
                        <label htmlFor="password" className="label_text">Password</label>
                        <input type="text" id="password" className="input_box" onChange={changeHandler} placeholder="********" value={userData.password} name="password" />
                        <div className="forgor_password_div">
                            <p className="forgot_password_text">Forgot Password?</p>
                        </div>
                        <div className="login_btn_box">
                            <button className="signin_btn">Login</button>
                            <button className="signin_btn" onClick={() => { setLogin(!login);  }}>{login ? 'Sign Up' : 'Login'}</button>
                        </div>
                    </form>
                </div>
                <div className={`${!login ? 'loginpage_right' : 'loginpage_right_none'}`}>
                    
                    <form className="form_container" onSubmit={signupHandler}>
                        <p className="login_text">Sign up</p>
                        <p className="desc">Welcome! please enter your details.</p>
                        <label htmlFor="email" className="label_text">Email</label>
                        <input type="text" id="email" className="input_box emailinput" onChange={signupChangeHandler} value={signupUserData.email} placeholder="Enter Your Email" name="email" />
                        <div className="password_div">
                            <div className="password_div_signup">
                                <label htmlFor="password" className="label_text">Password</label>
                                <input type="text" id="password" className="input_box" placeholder="********" onChange={signupChangeHandler} value={signupUserData.password} name="password" />
                            </div>
                            <div className="password_div_signup">
                                <label htmlFor="cnfpassword" className="label_text">Confirm Password</label>
                                <input type="text" id="cnfpassword" className="input_box" placeholder="********" onChange={signupChangeHandler} value={signupUserData.cpassword} name="cpassword" />
                            </div>
                        </div>
                        <div className="signup_btn_box">
                            <button className="signin_btn">Sign up</button>
                            <button className="signin_btn" onClick={() => { setLogin(!login); }}>{login ? 'Sign Up' : 'Login'}</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="go_for">
                <button className="signin_btn" onClick={() => setLogin(!login)}>{login ? "Go For Sign up" : "Go for Sign in"}</button>
            </div>
        </div>
    )
}

export default LoginPage