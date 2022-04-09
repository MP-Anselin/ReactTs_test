import React, {useState} from "react";
import {useLoginMutation} from "../../../apis/auth.api";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useAppDispatch} from "../../../app/hooks";
import {User} from "../../../models/User";
import {setAuthState} from "../../../slices/auth.slice";
import "../../styles.css";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [emailErrored, setEmailErrored] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordErrored, setPasswordErrored] = useState(false);

    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

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
            const response = (await login({email, password})) as { data: User };
            dispatch(setAuthState({user: response.data}));
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <span className="heading">Login</span>
            <div>
                <form onSubmit={handleLogin}>
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
                            Login
                        </button>
                        <Link to="/signup" className="justify-self-start self-start mt-2">
                            <button className="input_swap"> Sign Up</button>
                        </Link>
                    </div>

                </form>
            </div>
        </>
    );
};

export {LoginForm};
