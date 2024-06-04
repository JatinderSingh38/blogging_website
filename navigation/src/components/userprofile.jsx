//code to edit user profile
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";

const Userprofile = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem("userid")
    const [formData, setFormData] = useState({ username: "", email: "", country: "", pincode: " ", image: " " });
    const [usernameError, setusernameError] = useState("");
    const [emailError, setemailError] = useState("");
    const [isEditing, setIsEditing] = useState(true);
    const [profileImage, setProfileImage] = useState({});


    const fetchPost = async () => {
        try {

            const res = await axios.get(`http://localhost:5000/userprofile/${id}`);
            const postData = res.data;
            setFormData({ username: postData.UserName, email: postData.email, country: postData.country, pincode: postData.pincode, image: postData.image })
            console.log("printing userdetails", formData)
        } catch (err) {
            console.error("Error fetching post:", err);
        }
    };


    useEffect(() => {
        fetchPost();
    }, [id]);

    const handleProfileUpload = async () => {
        const formData = new FormData();
        formData.append("image", profileImage);
        await axios.patch(`http://localhost:5000/userimage/${id}`, formData)
        fetchPost();
    }

    const handleUpdate = async () => {
        let usernameError = "";
        let emailError = "";
        if (!formData.username) {
            usernameError = 'username is required';
        }
        if (!formData.email) {
            emailError = 'email is required';
        }
        setusernameError(usernameError);
        setemailError(emailError);
        if (!usernameError && !emailError) {
            try {

                const res = await axios.patch(`http://localhost:5000/userprofile/${id}`, formData)
                //  console.log(res, 'asdfghj')
                if (res.status === 200) {
                    alert("Updated successfully");
                    setIsEditing(true)
                    navigate("/userprofile")
                } else {
                    console.error("Unexpected status code:", res.status);
                }

            } catch (err) {
                console.error("error in updating:", err)
            }
        }

    };

    return (
        <div style={{ backgroundColor: "#f0f0f0" }}>
            <div style={{ width: "400px", margin: "auto", textAlign: "center" }}>
                <div style={{ backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "10px" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <h2 style={{ display: "inline-block", marginRight: "10px" }}>USER PROFILE</h2>
                        <br />
                        <br />
                        <div style={{ width: "100px", height: "100px", margin: "auto", border: "1px solid #ccc", borderRadius: "50%", overflow: "hidden" }}>
                            <img className="profile-img" src={`http://localhost:5000/${formData.image}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <br />
                        {isEditing ? (<>
                            <div style={{ textAlign: "left" }}>
                                <h1> <FaEdit style={{ float: "right", color: "blue" }} onClick={() => setIsEditing(false)} /></h1>
                                <br />
                                <br />
                                <label>Username:{formData.username}</label><br />

                                <br />
                                <br />
                                <label htmlFor="email">Email:{formData.email}</label><br />

                                <br />
                                <br />
                                <label htmlFor="country">Country:{formData.country}</label><br />

                                <br />
                                <br />
                                <label htmlFor="pincode">Pincode:{formData.pincode}</label><br />

                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </>) : (<>
                            <h1> <MdCancel style={{ float: "right", color: "blue" }} onClick={() => {
                                fetchPost().then(() => {
                                    setIsEditing(true);
                                });
                                // handleToggleEdit();

                            }} />
                            </h1>
                            <input
                                style={{ padding: "1vh", width: "100%", borderRadius: "10px", border: "1px solid #ccc" }}
                                type='file'
                                placeholder="image"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setProfileImage(file);
                                    console.log(profileImage)
                                }}
                            />
                            <br />
                            <br />
                            <div style={{ textAlign: "left" }}>
                                <label>Username:</label>
                                <br />
                                <input
                                    id="username"
                                    style={{ padding: "10px", width: "100%", borderRadius: "10px", border: "1px solid #ccc" }}
                                    type='text'
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={(e) => {
                                        setFormData({ ...formData, username: e.target.value });
                                    }}
                                />
                                <br />
                                <br />
                                <label htmlFor="email">Email:</label><br />
                                <input
                                    id="email"
                                    style={{ padding: "10px", width: "100%", borderRadius: "10px", border: "1px solid #ccc" }}
                                    type='text'
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                    }}
                                />
                                <br />
                                <br />
                                <label htmlFor="country">Country:</label><br />
                                <input
                                    id="country"
                                    style={{ padding: "10px", width: "100%", borderRadius: "10px", border: "1px solid #ccc" }}
                                    type='text'
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={(e) => {
                                        setFormData({ ...formData, country: e.target.value });
                                    }}
                                />
                                <br />
                                <br />
                                <label htmlFor="pincode">Pincode:</label><br />
                                <input
                                    id="pincode"
                                    style={{ padding: "10px", width: "100%", borderRadius: "10px", border: "1px solid #ccc" }}
                                    type='text'
                                    placeholder="Pincode"
                                    value={formData.pincode}
                                    onChange={(e) => {
                                        setFormData({ ...formData, pincode: e.target.value });
                                    }}
                                />
                            </div>
                            <br />
                            <button style={{ width: '30%', padding: '10px', backgroundColor: "#007bff", color: "#fff", borderRadius: "10px", border: "none" }}
                                onClick={() => {
                                    handleUpdate(id);
                                    handleProfileUpload(id);
                                }}
                            >UPDATE</button>
                        </>)}
                    </div>
                </div>
            </div>
        </div>


    );
};


export default Userprofile;
