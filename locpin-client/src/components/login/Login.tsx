import React, {useRef, useState} from 'react'
import {LoginFormDataType} from '../../types'
import {useAuth} from "../../hooks/useAuth"
import {apiLogin} from "../../lib/api";
import {Navigate} from "react-router-dom";
import _ from "lodash";
import useTimer from "../../hooks/useTimer";

export const Login = () => {
    const formInput: LoginFormDataType = {
        usernameOrPassword: "",
        password: "",
    };
    const usernameEl = useRef<HTMLInputElement>(null);
    const passwordEl = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState<LoginFormDataType>(formInput)
    const [text, setText] = useState<string>("")
    const [type, setType] = useState<string>("Waiting for typing")

    const [formData, setFormData] = useState<LoginFormDataType>({
        usernameOrPassword: "",
        password: ""
    });

    // @ts-ignore
    const {user, login} = useAuth();

    if (user) {
        return <Navigate to="/dashboard"/>;
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = usernameEl.current ? usernameEl.current.value : "";
        const password = passwordEl.current ? passwordEl.current.value : "";
        console.log(username, password)
        const data = await apiLogin("admin", "test12345")
        login(data)
    }

    const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}))
        console.log(formData)
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(values => ({...input, [event.target.name]: event.target.value}))
    }

    const {start, clear} = useTimer(handle, 2000)
    const debounce = useRef(_.debounce(async () => {
        console.log("debounce")
        req()
    }, 1300)).current;

    function req() {
        console.log("making call fake call / filter")
        start()
    }

    function handle() {
        //reset
        setText("")
    }


    function run(e) {
        setType("Waiting for stop")
        console.log("clear")
        clear()
        setText(e.target.value)
        debounce()
    }

    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                            {/*test*/}
                            <div>{type}</div>
                            <input type="text" value={text} onChange={
                                (e) => run(e)}/>
                            {/*test end*/}
                            <form action="" className="box" onSubmit={onSubmit}>
                                <div className="field">
                                    <label htmlFor="" className="label">Username</label>
                                    <div className="control has-icons-left">
                                        <input autoComplete={"off"} ref={usernameEl} name="username" type="text"
                                               className="input" required/>
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="" className="label">Password</label>
                                    <div className="control has-icons-left">

                                        <input ref={passwordEl} name="password" type="password" placeholder="*******"
                                               className="input"
                                               required/>
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="" className="checkbox">
                                        <input type="checkbox"/>
                                        Remember me
                                    </label>
                                </div>
                                <div className="field">
                                    <button className="button is-success">
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}