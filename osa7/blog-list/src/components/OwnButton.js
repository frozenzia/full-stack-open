import { Button } from "@mui/material";

const OwnButton = (props) => {
    return (
        <Button
            style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
            variant="contained"
            color="primary"
            {...props}
        >
            {props.children}
        </Button>
    );
};

export default OwnButton;
