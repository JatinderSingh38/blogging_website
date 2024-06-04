import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ UserName: "", email: "", password: "", confirmPassword: "" });
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleSubmit = async () => {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        if (!formData.UserName.trim()) {
            nameError = 'UserName is required';
        }
        if (!formData.email) {
            emailError = 'Email is required';
        }
        if (!formData.password) {
            passwordError = 'Password is required';
        }
        if (formData.password !== formData.confirmPassword) {
            confirmPasswordError = 'Passwords do not match';
        }

        setNameError(nameError);
        setEmailError(emailError);
        setPasswordError(passwordError);
        setConfirmPasswordError(confirmPasswordError);

        if (!nameError && !emailError && !passwordError && !confirmPasswordError) {//(object.keys(error).length === 0)
            try {
                const res = await axios.post('http://localhost:5000/signup', formData);
                console.log("UserName:", formData.UserName);
                console.log("email:", formData.email);
                // setFormData({ UserName: "", email: "", password: "", confirmPassword: "" });
                alert("account created");
                navigate("/");
            } catch (error) {
                console.log(error)
                alert("can't signup email already exist")
            }
        }
    };

    return (
        <div className="main-container">
            <div className="container-ls">
                <h3>SIGNUP</h3>
                <input
                    type='text'
                    placeholder="UserName"
                    value={formData.UserName}
                    onChange={(e) => {
                        setFormData({ ...formData, UserName: e.target.value });
                        setNameError(""); // Clear error message
                    }}
                />
                <br />
                {nameError && <span style={{ color: "red" }}>{nameError}</span>}
                <br />
                <input
                    type='text'
                    placeholder="email"
                    value={formData.email}
                    onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setEmailError(""); // Clear error message
                    }}
                />
                <br />
                {emailError && <span style={{ color: "red" }}>{emailError}</span>}
                <br />
                <input
                    type='text'
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        setPasswordError(""); // Clear error message
                    }}
                />
                <br />
                {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}
                <br />
                <input
                    type='text'
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                        setFormData({ ...formData, confirmPassword: e.target.value });
                        setConfirmPasswordError(""); // Clear error message
                    }}
                />
                <br />
                {confirmPasswordError && <span style={{ color: "red" }}>{confirmPasswordError}</span>}
                <br />
                <button onClick={handleSubmit}>signup</button>
                <br />
                <br />
            </div>
        </div>
    );
};

export default Signup;