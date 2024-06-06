import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import oval from "./images/oval.png";

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const username = localStorage.getItem("username")
    const id = localStorage.getItem("userid")
    const [formData, setFormData] = useState({ username: "", email: "", country: "", pincode: " ", image: " " });
    const fetchPost = async () => {
        try {

            const res = await axios.get(`https://blogging-website-q0a4.onrender.com/userprofile/${id}`);
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

    const dropDown = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.clear();
    }

    return (
        < >

            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="./fig.css" rel="stylesheet" />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
            <title>Project1</title>


            <div className="container color1">
                <div className="navbar1">
                    <div className="uppernavbar">
                        <p className="heading1 headingall">
                            Chatterly
                            <i id="chat-icon" className="fa-brands fa-rocketchat" />
                        </p>
                        <div className="profile">
                            <img className="profile-img" src={`https://blogging-website-q0a4.onrender.com/${formData.image}`} />
                            <Link to="/userprofile" ><p className="heading2 headingall">{username}</p></Link>

                            <i className="fa-solid fa-caret-down" onClick={dropDown} />
                            {isOpen && (
                                <div className='navbar-f'>

                                    <ul>
                                        <Link to="/createblog" className="navbar-f">create</Link>
                                    </ul>
                                    <ul>
                                        <span onClick={handleLogout} ><Link to="/" className="navbar-f">Logout   </Link></span>
                                    </ul>
                                    {/* <div className="nbar">{msg.state.isNav?"true":"fAlse"}</div> */}


                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

        </>
    )


}
export default Header