import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";

import OwnButton from "./OwnButton";
import { createNewBlog } from "../reducers/blogsReducer";

const AddBlogForm = ({ onSubmit }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get("Title");
        const author = formData.get("Author");
        const url = formData.get("Url");
        setTitle("");
        setAuthor("");
        setUrl("");
        onSubmit();
        dispatch(createNewBlog({ title, author, url }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>create new</h2>
            <div>
                <TextField
                    label="title"
                    type="text"
                    value={title}
                    name="Title"
                    onChange={handleTitleChange}
                    placeholder="enter blog title here"
                />
            </div>
            <div>
                <TextField
                    label="author"
                    type="text"
                    value={author}
                    name="Author"
                    onChange={handleAuthorChange}
                    placeholder="enter blog author here"
                />
            </div>
            <div>
                <TextField
                    label="url"
                    type="text"
                    value={url}
                    name="Url"
                    onChange={handleUrlChange}
                    placeholder="enter blog url here"
                />
            </div>
            <OwnButton
                style={{ marginTop: "0.5em", marginBottom: 0 }}
                id="createBlogButton"
                type="submit"
            >
                create
            </OwnButton>
        </form>
    );
};

AddBlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default AddBlogForm;
