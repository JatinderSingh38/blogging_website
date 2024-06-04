import express from "express";
import { user } from "../models/user.js";
import { blog } from "../models/blog.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import jwt module
import multer from "multer";
import fs from "fs";
import nodemailer from 'nodemailer'

const authRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) { // cb accepts error and destination
        cb(null, "uploads/"); // create a folder named "uploads" in the backend
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage });

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email })
    if (existingUser) {
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {

            return res.json("psdw");

        } else {

            const token = jwt.sign(
                { userId: existingUser },
                process.env.JWT_SECRET_KEY);
            return res.json({ message: "User can login", token: token, userid: existingUser._id, name: existingUser.UserName });

        }
    } else {
        return res.json("no user found");
        // return res.status(400).json({ message: "lgin user not exist" });
    }
});

authRouter.post("/signup", async (req, res) => {
    try {
        const { UserName, email, password, confirmPassword } = req.body;

        // Check if user with the provided email already exists
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password != confirmPassword) {
            return res.status(400).json({ message: "Please confirm password" });
        }

        const saltValue = 10;
        const hashPassword = await bcrypt.hash(password, saltValue);

        // Create a new user
        const newUser = new user({
            UserName,
            email,
            image: "uploads/default_userprofile/userdefault.jpg",
            password: hashPassword

        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        // Handle errors
        console.error("Error in user signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Send Forgot Password Mail
authRouter.post("/forgotpassword", (req, res) => {
    const { email } = req.body;
    // Ensure email is properly extracted from the request body
    console.log("Email received:", email); // Logging the received email for debugging

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'jatindersingh382001@gmail.com',
            pass: 'hsiz iemg ksop ierh',
        },
    });

    const link = `http://localhost:3000/resetpassword/${email}`;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        text: `Your password reset link is: ${link}.Please click on this link to reset your password`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ message: "Failed to send password reset email" });
        } else {
            console.log("Email sent:", info.response);
            res.status(200).json({ message: "Password reset email sent successfully" });
        }
    });
});


// Creating api for searching blog posts by title
authRouter.get("/search", async (req, res) => {
    try {
        const { searchTerm } = req.query;
        console.log("Search:", searchTerm);
        if (!searchTerm) {
            return res.json([]);
        }
        // Use regex to perform a case-insensitive search on titles
        const searchResults = await blog.find({ title: { $regex: new RegExp(searchTerm, "i") } });
        res.status(200).json(searchResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


authRouter.patch('/userimage/:id', upload.single('image'), async (req, res) => {
    const id = req.params.id;
    try {
        const updateUser = await user.findById(id);

        if (!updateUser) {
            return res.status(404).json({ error: "Blog not found" });
        }

        if (req.file) {
            //fs.unlinkSync(blogs.image)
            if (updateUser.image !== "uploads/default_userprofile/userdefault.jpg") {
                // Delete previous image
                fs.unlinkSync(updateUser.image);
                // In case you're using fs.unlinkSync, uncomment it and remove the following line
            }
            // If a new image is provided, update the image path
            updateUser.image = req.file.path;
        }

        // if (description) {

        //     const updatedblog = await blogs.save();
        //     // res.json(updatedblog);
        // }
        await updateUser.save();
        return res.json({ message: "update" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

authRouter.post("/createblog", upload.single("image"), async (req, res) => {
    try {
        const { title, description } = req.body;

        const Nblog = new blog({
            title,
            description,
            likecount: 0,
            image: req.file.path,
            comments: []
        });
        await Nblog.save();
        const allBlogs = await blog.find();
        res.status(201).json(allBlogs);

    } catch (error) {
        // Handle errors
        console.error("Error in creating blog:", error);
        res.status(500).json({ message: "Internal server error,not created" });
    }

});

authRouter.get("/posts", async (req, res) => {
    try {
        const allBlogs = await blog.find();
        //const allBlogs = await blog.find(user.id);// for only getting post
        res.status(201).json(allBlogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

authRouter.get("/userprofile/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const User = await user.findById(id).select("-password");
        res.status(201).json(User);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

authRouter.patch('/userprofile/:id', async (req, res) => {
    const { id } = req.params;
    const { UserName, email, country, pincode } = req.body;
    try {

        const updatedUser = await user.findById(id);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (UserName) {
            updatedUser.UserName = UserName;
        }
        if (email) {
            updatedUser.email = email;
        }
        if (country) {
            updatedUser.country = country;
        }
        if (pincode) {
            updatedUser.pincode = pincode;
        }
        await updatedUser.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

authRouter.get("/updateblog/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const Blogs = await blog.findById(id);
        res.status(201).json(Blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

authRouter.patch("/updateblog/:id", upload.single("image"), async (req, res) => {
    const id = req.params.id;
    const blogs = await blog.findById(id);
    const { title, description } = req.body;

    try {


        if (!blogs) {
            return res.status(404).json({ error: "Blog not found" });
        } else {

            if (title) {
                blogs.title = title;

            }

            if (req.file) {
                fs.unlinkSync(blogs.image)
                // If a new image is provided, update the image path
                blogs.image = req.file.path;
            }

            if (description) {
                blogs.description = description;
                const updatedblog = await blogs.save();
                // res.json(updatedblog);
            }
            return res.json({ message: "update" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

authRouter.patch("/like/:blogId/:userId", async (req, res) => {
    const userId = req.params.userId;
    const blogId = req.params.blogId;

    try {
        const blogs = await blog.findById(blogId);
        if (!blogs) {
            return res.status(404).json({ error: "Blog not found" });
        }

        const userIndex = blogs.likedby.indexOf(userId);
        if (userIndex !== -1) {
            // already --like ,remove user id
            blogs.likedby.splice(userIndex, 1);
        }
        else {
            // User   not lik post,  lik it & add id
            blogs.likedby.push(userId);
        }
        blogs.likecount = blogs.likedby.length


        const updatedBlog = await blogs.save();
        res.json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

authRouter.post('/comments/:blogId', async (req, res) => {
    const { blogId } = req.params;
    const { text, userId, username } = req.body;

    try {

        const Blog = await blog.findById(blogId);

        if (!Blog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        Blog.comments.push({
            text,
            user: userId, // Assuming userid  ObjectId of the user who posted the comment
            username: username
        });

        await Blog.save();

        res.status(201).json({ message: 'Comment added successfully', Blog });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

authRouter.patch('/editcomment/:postId/:commentId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const { text } = req.body
        const blogs = await blog.findById(postId);
        if (!blogs) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        const commentToEdit = blogs.comments.find(comments => comments._id.toString() === commentId);
        commentToEdit.text = text;
        await blogs.save();

        res.status(201).json({ message: commentToEdit });
    } catch (error) {
        res.status(401).json({ message: error });
    }
});

authRouter.delete('/deletecomment/:postId/:commentId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const Blog = await blog.findById(postId);
        if (!Blog) {
            res.status(201).json({ message: "BLOG post not found" });
        }
        Blog.comments.pull(commentId);
        await Blog.save();

        res.status(201).json({ message: "Comment deleted successfully" });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }

});

authRouter.delete("/createblog/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const Blogs = await blog.findByIdAndDelete(id);
        fs.unlinkSync(Blogs.image)
        res.status(201).json(Blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

export default authRouter;

