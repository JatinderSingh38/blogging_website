import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Loading.css";
import { Link } from "react-router-dom";
import bg1 from "./images/bg1.png";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaCommentDots } from "react-icons/fa";
import { BiCommentX } from "react-icons/bi";
import { RiEdit2Line } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import "./styles/comment.css";
import { getBlog, deleteBlog, likeApi, commentApi, deleteComment } from "./API/endpoint";
import HeaderLower from "./headerlower";
import { getPosts } from "../components/Redux/actions/post"
import { useSelector, useDispatch } from 'react-redux';


const About = () => {
    const [postsd, setPosts] = useState([]);
    // const [searchResults, setSearchResults] = useState([]);
    const [status, setStatus] = useState(false);
    const [commentState, setCommentState] = useState(false);
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userid');
    const [commentData, setCommentData] = useState({ text: "", userId: userId, username: username });
    const [editingComment, setEditingComment] = useState({ commentId: null });
    const { loading, posts, error } = useSelector((state) => state.posts);

    const dispatch = useDispatch();

    const fetchPosts = async () => {
        try {
            const res = await getBlog();
            //     await axios.get(`http://localhost:5000/posts`, {
            //     headers: {
            //         Authorization: `${token}`, // Replace token with your actual token value
            //         "Content-Type": "application/json" // Adjust the content type as needed
            //     }
            // });
            if (res.data) {
                setPosts(res.data);
            }
            setStatus(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (postId) => {
        try {
            // await axios.delete(`http://localhost:5000/createblog/${postId}`)
            await deleteBlog(postId);
            fetchPosts();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async (postId) => {
        try {
            // await axios.patch(`http://localhost:5000/like/${postId}/${userId}`);
            await likeApi(postId, userId);
            fetchPosts(); // Refreshposts after   lik
            dispatch(getPosts());
        } catch (error) {
            console.error("Error handling like:", error);
        }
    };

    const handleCommentClick = (postId) => {
        setCommentState((prevLike) => ({
            ...prevLike,
            [postId]: !prevLike[postId],
        }));
    };

    const handleCommentSubmit = async (postId) => {
        if (commentData.text.trim()) {
            try {
                // const response = await axios.post(`http://localhost:5000/comments/${postId}`, commentData);
                await commentApi(postId, commentData)
                // setCommentState(false);
                fetchPosts();
                setCommentData({ text: "", userId: userId, username: username });
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
    };

    const handlecommentDelete = async (postId, commentId) => {
        try {
            // const response = await axios.delete(`http://localhost:5000/deletecomment/${postId}/${commentId}`);
            await deleteComment(postId, commentId)
            //setCommentState(false);
            fetchPosts();
            setCommentData({ text: "", userId: userId, username: username });
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleCommentEditBox = (commentId) => {
        //making this fnc 2 opn & clos coment edit bx
        //if cmnt inpt box Is open close if ntopn clos it
        if (editingComment.commentId === null) {
            setEditingComment({ ...editingComment, commentId });
        } else {
            setEditingComment({ ...editingComment, commentId: null });
        }
    };

    const handleSearch = async (searchResults) => {
        setPosts(searchResults)
    };

    const handleCommentEdit = async (postId, commentId) => {
        if (commentData[commentId]?.text.trim()) {
            try {
                const newData = { text: commentData[commentId].text };
                const response = await axios.patch(`http://localhost:5000/editcomment/${postId}/${commentId}`, newData);
                //setCommentState(false);

                // setCommentData(prevState => ({
                //     ...prevState,
                //     [commentId]: { ...prevState[commentId], text: "" }
                // }));
                setEditingComment({ ...editingComment, commentId: null });
                fetchPosts();
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
    };

    useEffect(() => {
        fetchPosts();
        dispatch(getPosts());

    }, [dispatch]);

    const formattedDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; //it can also be done using map function
        return `${months[monthIndex]} ${day} ${year}`;
    };
    console.log("fromredux----", posts)
    // console.log(posts)



    return (
        <>
            <div className="main">
                <HeaderLower searchResults={posts} onSearch={handleSearch} />

                <div className="mainhead">
                    <h3 className="main-heading headingall">BLOG POSTS</h3>
                </div>
                <div className="row1-posts">
                    {
                        loading ? (
                            <section>
                                <div className="loader">
                                    <span style={{ '--i': '1' }} />
                                    <span style={{ '--i': '2' }} />
                                    <span style={{ '--i': '3' }} />
                                    <span style={{ '--i': '4' }} />
                                    <span style={{ '--i': '5' }} />
                                    <span style={{ '--i': '6' }} />
                                    <span style={{ '--i': '7' }} />
                                    <span style={{ '--i': '8' }} />
                                    <span style={{ '--i': '9' }} />
                                    <span style={{ '--i': '10' }} />
                                    <span style={{ '--i': '11' }} />
                                    <span style={{ '--i': '12' }} />
                                    <span style={{ '--i': '13' }} />
                                    <span style={{ '--i': '14' }} />
                                    <span style={{ '--i': '15' }} />
                                    <span style={{ '--i': '16' }} />
                                    <span style={{ '--i': '17' }} />
                                    <span style={{ '--i': '18' }} />
                                    <span style={{ '--i': '19' }} />
                                    <span style={{ '--i': '20' }} />

                                </div>
                            </section>
                        ) :
                            posts.length === 0 ? (
                                <h1 style={{ padding: '1vh' }}>NO BLOG POST FOUND<br /></h1>
                            ) : (
                                // mapping over the posts array to display each blog post
                                posts.map(post => (
                                    <div className="post" key={post._id}>
                                        <div className="upperpost">
                                            <img className="bg1" src={`http://localhost:5000/${post.image}`} />
                                            {/* Displaying the title dynamically */}
                                            <p className="font2">Title:{post.title}</p>
                                            <p className="font2">Description:{post.description}</p>
                                        </div>
                                        <div className="post-details">
                                            <img className="profile-img" src={bg1} />
                                            <div className="profile-name headingall">
                                                <p>Dasteen</p>
                                                <div className="other-details">
                                                    <p className="font1">{formattedDate(post.createdAt)}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                                    {post.likedby.includes(userId) ? (<i className="fa-solid fa-heart like" onClick={() => handleLike(post._id)} />
                                                    ) : (
                                                        <i className="far fa-heart unlike" onClick={() => handleLike(post._id)} />
                                                    )}

                                                    <p className="font1">{post.likecount}</p>
                                                    <i className="fas fa-trash delete comment" onClick={() => handleDelete(post._id)} />
                                                    <p className="font1">&nbsp;</p>
                                                    <Link to={`/updateblog/${post._id}`} className=""><i class="fa-solid fa-pencil  updateicon" /></Link>
                                                    <p className="font1">&nbsp;</p>
                                                    {commentState[post._id] ? (
                                                        <FaRegCommentDots className="like" onClick={() => handleCommentClick(post._id)} />
                                                    ) : (
                                                        <FaCommentDots className="unlike" onClick={() => handleCommentClick(post._id)} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {commentState[post._id] ? (
                                            <div className="comment-box">
                                                <textarea placeholder="Write a comment..."
                                                    // defaultValue={""}
                                                    value={commentData.text}
                                                    onChange={(e) => setCommentData({ ...commentData, text: e.target.value })}

                                                />
                                                <button className="submit-button" onClick={() => handleCommentSubmit(post._id)}>Comment</button>
                                                <div className="comments">
                                                    {post.comments.slice().reverse().map(comment => (
                                                        <div key={comment._id} className="comment">
                                                            <div> {comment.username} : {comment.text} &nbsp;&nbsp;

                                                                {/* --who commentwd only that particular user can delete cmnt */}
                                                                {comment.username === username && comment.user === userId &&
                                                                    (<div style={{ textAlign: "end", color: "blue" }}>
                                                                        {/* --comment box only open when id pased by handlecomntbox = comment._id(commentid) */}
                                                                        {editingComment.commentId === comment._id ? (
                                                                            <div style={{ display: "flex", border: "2px solid red", borderRadius: "20px" }}>
                                                                                <input
                                                                                    style={{ padding: "1vh", width: "100%", border: "none", outline: "none", borderRadius: "10px", backgroundColor: "transparent" }}
                                                                                    type='text'
                                                                                    placeholder="Description"
                                                                                    value={
                                                                                        //1-when the user is typing && it checks whhether the user has typed in text property of comment data
                                                                                        //if these both true value = comentDta[cmnt.-id].text means = value entered by user
                                                                                        //value = comment.text when there is no input from user
                                                                                        commentData[comment._id] !== undefined && commentData[comment._id].text !== undefined
                                                                                            ? commentData[comment._id].text
                                                                                            : comment.text
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        const newText = e.target.value;
                                                                                        //setcommentdata for particular comment._id will be newText entered by user
                                                                                        setCommentData(prevState => ({
                                                                                            ...prevState,
                                                                                            [comment._id]: { ...prevState[comment._id], text: newText }
                                                                                        }));
                                                                                    }}
                                                                                />
                                                                                <span style={{ cursor: "pointer", padding: "5px ", backgroundColor: "transparent" }} onClick={() => handleCommentEdit(post._id, comment._id)}><IoIosSend /></span>
                                                                            </div>
                                                                        ) : (null)}

                                                                        <RiEdit2Line
                                                                            onClick={() => handleCommentEditBox(comment._id)}
                                                                        />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        <BiCommentX
                                                                            onClick={() => handlecommentDelete(post._id, comment._id)}
                                                                        />&nbsp;&nbsp;
                                                                    </div>)}
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* More comments would be dynamicali aded here */}
                                                </div>
                                            </div>

                                        ) : (
                                            null
                                        )}
                                    </div>
                                ))
                            )
                    }
                </div>
            </div>
        </>

    )
}
export default About


