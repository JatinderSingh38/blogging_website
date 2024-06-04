
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [nameError, setNameError] = useState("");
    const [ageError, setAgeError] = useState("");

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         // Redirect user to Home page if token exists
    //         navigate("/");
    //     }
    // }, [navigate]);

    const handleSubmit = async () => {
        let nameError = "";
        let ageError = "";

        if (!formData.email.trim()) {
            nameError = 'Email is required';
        }
        if (!formData.password) {
            ageError = 'password is required';
        }

        setNameError(nameError);
        setAgeError(ageError);

        if (!nameError && !ageError) {
            console.log("email:", formData.email);
            console.log("password:", formData.password);
            //  setFormData({ email: "", age: "" });
            try {
                const res = await axios.post('http://localhost:5000/login', formData);
                console.log(res.data, 'res.datares.data')
                if (res.data.message === "User can login") {
                    const username = res.data.name;
                    localStorage.setItem("username", username);
                    const userid = res.data.userid;
                    localStorage.setItem("userid", userid);
                    const token = res.data.token;
                    localStorage.setItem("token", token);
                    navigate("/Home", {
                        // state: { name: formData.email,age: formData.age}
                    });
                    alert("Login successfully");
                }
                if (res.data === "psdw") {
                    alert("incorrect password");
                    setFormData({ email: "", password: "" });
                } if (res.data === "no user found") {
                    alert("no user found! please signup");
                    setFormData({ email: "", password: "" });
                }

            } catch (error) { console.error("Error in user login:", error); }
        }
    };

    return (
        <>
            <div className="main-container">
                <div className="container-ls">
                    <h3>LOGIN</h3>
                    <input
                        type='text'
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setNameError(""); // Clear error message
                        }}
                    />
                    <br />
                    {nameError && <span style={{ color: "red" }}>{nameError}</span>}
                    <br />
                    <input
                        type='text'
                        placeholder="password"
                        value={formData.password}
                        onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value });
                            setAgeError(""); // Clear error message
                        }}
                    />
                    <br />
                    {ageError && <span style={{ color: "red" }}>{ageError}</span>}
                    <br />
                    <button onClick={handleSubmit}>Login</button>
                    <br />
                    <p>Don't have an account? <Link to="/signup">SIGNUP</Link></p>
                    <br />
                    <p><Link to="/forgetpassword">forgot password</Link></p>
                </div>
            </div>

        </>
    );
};

export default Login;




