import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
    const { message, succeeded } = useSelector((store) => store.notification);

    if (!message) return null;
    // else
    return <Alert severity={succeeded ? "success" : "error"}>{message}</Alert>;
};

// <div className={succeeded ? "notice" : "notice fail"}>{message}</div>
export default Notification;
