import React from "react";
import { Button } from "react-bootstrap";
import { callPrivateApi } from "../../../services/TestApiCall";

function PrivateApiCall(): JSX.Element {
    return(
        <Button onClick={() => callPrivateApi()} variant="warning">
            PRIVATE API CALL
        </Button>
    );
}

export default PrivateApiCall;