import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
    const users = useSelector((state) => state.users);

    return (
        <div>
            <h2>Users</h2>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                                blogs created
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name || "👺 (anonymous)"}
                                    </Link>
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    {user.blogs.length}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Users;
