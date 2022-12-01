import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLikePress, onDeletePress, username : loggedInUser }) => {
    const { id, title, author, url, likes, user } = blog
    const { name, username } = user || {}

    console.log('loggedInUser: ', { value: loggedInUser })
    console.log('username: ', { value: username })
    const [showAll, setShowAll] = useState(false)

    const toggleShowAll = () => setShowAll(!showAll)
    const handleLikeClick = () => onLikePress(blog)
    const handleDeleteClick = () => {
        if (window.confirm(`Are you sure you want to delete "${title}", by ${author}?`)) {
            onDeletePress(id)
        }
    }

    return <div className='singleBlog'>
        <div>
            {title} {author} <button onClick={toggleShowAll}>{showAll ? 'hide' : 'view'}</button>
        </div>
        <div className={showAll ? 'showMe' : 'hideMe'}>
            <div>{url}</div>
            <div>
                {likes}
                <button onClick={handleLikeClick}>like</button></div>
            <div>{user && name}</div>
        </div>
        <button
            className={username === loggedInUser ? 'showMe' : 'hideMe'}
            onClick={handleDeleteClick}
        >
            remove
        </button>
    </div>
}

Blog.propTypes = {
    blog: PropTypes.shape({}).isRequired,
    username: PropTypes.shape({}).isRequired,
    onLikePress: PropTypes.func.isRequired,
    onDeletePress: PropTypes.func.isRequired,
}

export default Blog
