import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, onLikePress, onDeletePress, username: loggedInUser }) => {
  const { id, title, author, url, likes, user } = blog;
  const { name, username } = user || {};

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll(!showAll);
  const handleLikeClick = () => onLikePress(blog);
  const handleDeleteClick = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${title}", by ${author}?`
      )
    ) {
      onDeletePress(id);
    }
  };

  return (
    <div className="singleBlog" data-cy="blog">
      <div>
        {title} {author}{" "}
        <button data-cy="showHideBlog" onClick={toggleShowAll}>
          {showAll ? "hide" : "view"}
        </button>
      </div>
      <div className={showAll ? "showMe" : "hideMe"}>
        <div>{url}</div>
        <div className="likesPlusLikeButton">
          <span data-cy="likeTotal">{likes}</span>
          <button
            onClick={handleLikeClick}
            className="likeButton"
            data-cy="likeButton"
          >
            like
          </button>
        </div>
        <div className="usersName">{user && name}</div>
      </div>
      <button
        className={username === loggedInUser ? "showMe" : "hideMe"}
        onClick={handleDeleteClick}
        data-cy="removeButton"
      >
        remove
      </button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({}).isRequired,
  username: PropTypes.string.isRequired,
  onLikePress: PropTypes.func.isRequired,
  onDeletePress: PropTypes.func.isRequired,
};

export default Blog;
