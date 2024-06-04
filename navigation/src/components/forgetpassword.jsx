import React, { useState } from 'react';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
const Fpassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/forgotpassword', { email });
            console.log(res.data); // Logging the response data for debugging
            setMessage(`Passwordfrontend reset link sent to ${email}`);
            setEmail('');

        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Forgot Password</h2>
            {message && <p style={styles.message}>{message}</p>}
            <div style={styles.form}>
                <label style={styles.label}>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        style={styles.input}
                        required
                    />
                </label>
                <button type="submit" onClick={handleSubmit} style={styles.button}>Reset Password</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: '#f4f4f4', // Background color
        padding: '40px', // Added padding for spacing
        borderRadius: '10px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow for depth
    },
    title: {
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        marginBottom: '10px',
    },
    input: {
        padding: '15px',
        fontSize: '16px',
        width: '100%',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        padding: '15px 30px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    message: {
        marginBottom: '20px',
        color: 'green',
    },
};

export default Fpassword;
// send email in this api from above front end code
//hsiz iemg ksop ierh