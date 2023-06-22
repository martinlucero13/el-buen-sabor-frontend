import React from "react";
import { Button } from "react-bootstrap";
import { callAdminApi } from "../../../services/TestApiCall";

function AdminApiCall(): JSX.Element {
    return(
        <Button onClick={() => callAdminApi()} variant="danger">
            PRIVATE API CALL
        </Button>
    );
}

export default AdminApiCall;