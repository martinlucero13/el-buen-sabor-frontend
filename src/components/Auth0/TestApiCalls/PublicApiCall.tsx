import React from "react";
import { Button } from "react-bootstrap";
import { callPublicApi } from "../../../services/TestApiCall";

function PublicApiCall(): JSX.Element {
    return(
        <Button  onClick={() => callPublicApi()} variant="primary">
            PUBLIC API CALL
        </Button>
    );
}

export default PublicApiCall;