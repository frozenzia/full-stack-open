const User = ({ user }) => {
    console.log("user: ", { value: user });
    if (!user) {
        return null;
    }
    return (
        <div>
            <h2>{user.name || "👺 (anonymous)"}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map((b) => (
                    <li key={b.id}>{b.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default User;
