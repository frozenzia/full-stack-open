import { useState } from "react";
import PropTypes from "prop-types";

const AddBlogForm = ({ onSubmit }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get("Title");
        const author = formData.get("Author");
        const url = formData.get("Url");
        onSubmit({ title, author, url });
        setTitle("");
        setAuthor("");
        setUrl("");
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
