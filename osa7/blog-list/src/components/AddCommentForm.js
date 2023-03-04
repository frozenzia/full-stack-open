import { useState } from "react";
import { useDispatch } from "react-redux";

import { createNewComment } from "../reducers/blogsReducer";

const AddCommentForm = ({ blogId }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const content = formData.get("Content");
        setContent("");
        dispatch(createNewComment(blogId, { content }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={content}
                name="Content"
                onChange={handleContentChange}
                placeholder="enter comment here"
            />
            <button id="createContentButton" type="submit">
                add comment
            </button>
        </form>
    );
};
export default AddCommentForm;
