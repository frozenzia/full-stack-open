import { useState } from 'react'

const AddBlogForm = ({ onSubmit }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
    }

    const handleUrlChange = (e) => {
        setUrl(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const title = formData.get('Title')
        const author = formData.get('Author')
        const url = formData.get('Url')
        onSubmit(title, author, url)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
            title
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={handleTitleChange}
                />
            </div>
            <div>
            author
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
            url
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={handleUrlChange}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default AddBlogForm
