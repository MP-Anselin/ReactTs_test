import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useLoginMutation, useSignupMutation } from "../../../apis/auth.api";
import { useAppDispatch } from "../../../app/hooks";
import { setAuthState } from "../../../slices/auth.slice";
import { User } from "../../../models/User";

const SignupForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [emailErrored, setEmailErrored] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordErrored, setPasswordErrored] = useState(false);

    const [signup] = useSignupMutation();
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSignup = async () => {
        if (!email) {
            setEmailErrored(true);
        } else {
            setEmailErrored(false);
        }
        if (!password) {
            setPasswordErrored(true);
        } else {
            setPasswordErrored(false);
        }
        try {
            await signup({ email, password });
            const response = (await login({ email, password })) as { data: User };
            dispatch(setAuthState({ user: response.data }));
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <span className="heading">Registration</span>
            <div>
                <form onSubmit={handleSignup}>
                    <span className="todos__heading">email</span>
                    <input
                        type="email"
                        placeholder="Enter a Task"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="input__box"
                    />
                    <br/>
                    <br/>
                    <br/>
                    <span className="todos__heading">Password</span>
                    <br/>
                    <input
                        type="password"
                        placeholder="Enter a Task"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="input__box"
                    />
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <button type="submit" className="input_submit">
                            sign up
                        </button>
                        <Link to="/login" className="justify-self-start self-start mt-2">
                            <button className="input_swap">Login</button>
                        </Link>
                    </div>

                </form>
            </div>
        </>
    );
};

export { SignupForm };
