import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CreateBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({ title: "", description: "", image: null });
    const [titleError, settitleError] = useState("");
    const [descriptionError, setdescriptionError] = useState("");


    useEffect(() => {
        const fetchPost = async () => {
            try {

                const res = await axios.get(`http://localhost:5000/updateblog/${id}`);
                const postData = res.data;
                setFormData({ title: postData.title, description: postData.description, image: postData.image })
            } catch (err) {
                console.error("Error fetching post:", err);
            }
        };
        fetchPost();
    }, [id]);
    const handleUpdate = async () => {
        let titleError = "";
        let descriptionError = "";
        if (!formData.title) {
            titleError = 'title is required';
        }
        if (!formData.description) {
            descriptionError = 'description is required';
        }
        settitleError(titleError);
        setdescriptionError(descriptionError);
        if (!titleError && !descriptionError) {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                formDataToSend.append('description', formData.description);
                formDataToSend.append('image', formData.image);
                const res = await axios.patch(`http://localhost:5000/updateblog/${id}`, formDataToSend)
                console.log(res, 'asdfghj')
                if (res.status === 200) {
                    alert("Updated successfully");
                    navigate("/About")
                } else {
                    console.error("Unexpected status code:", res.status);
                }

            } catch (err) {
                console.error("error in updating:", err)
            }
        }

    };

    return (
        <div className="main">
            <div className="row1-posts">
                <div className="post">
                    <div className="bg1">
                        <div>
                            <h2>UPDATE BLOG</h2>
                            <br />
                            <br />
                            <br />
                            <input
                                style={{ padding: "1vh", width: "100%", borderRadius: "10px" }}
                                type='text'
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => {
                                    setFormData({ ...formData, title: e.target.value });
                                }}
                            />
                            <br />
                            <br />
                            <input
                                style={{ padding: "1vh", width: "100%", borderRadius: "10px" }}
                                type='text'
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => {
                                    setFormData({ ...formData, description: e.target.value });
                                }}
                            />
                            <br />
                            <br />
                            <input
                                style={{ padding: "1vh", width: "100%", borderRadius: "10px" }}
                                type='file'
                                placeholder="image"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setFormData({ ...formData, image: file });
                                }}
                            />
                            <br />
                            <br />
                            <br />
                            <button style={{ justifyContent: 'center', width: '100%', padding: '10px' }}
                                onClick={() => handleUpdate()}
                            >UPDATE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;



