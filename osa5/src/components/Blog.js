import { useState } from 'react'

const Blog = ({ blog, onLikePress }) => {
    const [showAll, setShowAll] = useState(false)

    const toggleShowAll = () => setShowAll(!showAll)
    const handleLikeClick = () => onLikePress(blog)

    return <div className='singleBlog'>
        <div>
            {blog.title} {blog.author} <button onClick={toggleShowAll}>{showAll ? 'hide' : 'view'}</button>
        </div>
        <div className={showAll ? 'showMe' : 'hideMe'}>
            <div>{blog.url}</div>
            <div>
                {blog.likes}
                <button onClick={handleLikeClick}>like</button></div>
            <div>{blog.user && blog.user.name}</div>
        </div>
    </div>
}

export default Blog
