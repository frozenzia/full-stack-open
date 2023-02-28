import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import blogService from "../services/blogs"
import { appendBlog } from "../reducers/blogsReducer";
import { setNotificationFail, setNotificationSuccess } from "../reducers/notificationReducer";

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
        try {
            const resp = await blogService.create({ title, author, url, likes: 0 });
            dispatch(appendBlog(resp));
            dispatch(setNotificationSuccess(`a new blog, "${resp.title}", by ${resp.author}, has been added`))
        } catch (exception) {
            dispatch(setNotificationFail(exception.response.data.error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>create new</h2>
            <div>
                title
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={handleTitleChange}
                    placeholder="enter blog title here"
                />
            </div>
            <div>
                author
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={handleAuthorChange}
                    placeholder="enter blog author here"
                />
            </div>
            <div>
                url
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={handleUrlChange}
                    placeholder="enter blog url here"
                />
            </div>
            <button id="createBlogButton" type="submit">
                create
            </button>
        </form>
    );
};

AddBlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default AddBlogForm;
