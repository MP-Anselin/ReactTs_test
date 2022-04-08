import React, {useEffect} from "react";

import "./index.css";
import {Routes} from "./routes/routes";
import {HomePage} from "./pages/home.page";
import {useGetUserQuery} from "./apis/users.api";
import {useAppDispatch} from "./app/hooks";
import {useNavigate} from "react-router";
import {setAuthState} from "./slices/auth.slice";
import {LoginForm} from "./components/auth/login-form/login-form.component";

function App() {
    const {data: user} = useGetUserQuery(undefined);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(setAuthState({user}));
            navigate("/");
        }
    }, [user, dispatch, navigate]);

    return (
        <div className="App">
            <Routes/>
        </div>
    );
}

export default App;
