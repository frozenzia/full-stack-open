import { useState } from "react";
import { useDispatch } from "react-redux";

import OwnButton from "./OwnButton";
import { createNewComment } from "../reducers/blogsReducer";
import { TextField } from "@mui/material";

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
            <TextField
                type="text"
                value={content}
                name="Content"
                onChange={handleContentChange}
                placeholder="enter comment here"
                style={{ marginRight: "0.5em" }}
            />
            <OwnButton id="createContentButton" type="submit">
                add comment
            </OwnButton>
        </form>
    );
};
export default AddCommentForm;
