import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: "", description: "", image: null });

    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://blogging-website-q0a4.onrender.com/createblog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/About");
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    return (
        <div className="main">
            <div className="row1-posts">
                <div className="post">
                    <div className="bg1">
                        <form>
                            <h2>CREATE BLOG</h2>
                            <br />
                            <br />
                            <br />
                            <input
                                style={{ padding: "1vh", width: "100%", borderRadius: "10px" }}
                                type='text'
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <br />
                            <br />
                            <input
                                style={{ padding: "1vh", width: "100%", borderRadius: "10px" }}
                                type='text'
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <br />
                            <br />
                            <input
                                style={{ padding: "1vh", width: "100%", borderRadius: "10px" }}
                                type='file'
                                placeholder="image"

                                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                            />
                            <br />
                            <br />
                            <br />
                            <button type="button" onClick={handleSubmit}>SUBMIT</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog;

//j