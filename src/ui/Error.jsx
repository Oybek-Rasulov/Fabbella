import { useNavigate, useRouteError } from "react-router-dom";
import Button from "./Button";

export default function Error({errorMessage}) {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div>
            <h1>{errorMessage}</h1>
            <Button onCLick={() => navigate(-1)}>Orqaga</Button>
        </div>
    )
}
