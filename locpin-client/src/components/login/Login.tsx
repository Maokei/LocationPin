import React, {useState} from 'react'
import {LoginFormDataType} from '../../types'
import { useAuth } from "../../hooks/useAuth"
import {apiLogin} from "../../lib/api";
import {Navigate} from "react-router-dom";

export const Login = () => {
  const formInput: LoginFormDataType = {
    usernameOrPassword: "",
    password: "",
  };
  const [input, setInput] = useState<LoginFormDataType>(formInput)
  const [formData, setFormData]  = useState<LoginFormDataType>({
    usernameOrPassword: "",
    password: ""
  });
  // @ts-ignore
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await apiLogin("admin", "test12345")
    console.log("data", data)
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

  /*return (
    <div className="has-text-centered">
      <form>
        <Form.Field>
          <Form.Label>Name</Form.Label>
          <Form.Control>
            <Form.Input placeholder="Username" name="username" value={input.username} onChange={onChange} />
            <Icon align="left">
              <i className="github" />
            </Icon>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Password</Form.Label>
          <Form.Control>
            <Form.Input placeholder="Password" name="password" type="password" value={input.password} onChange={onChange} />
            <Icon align="left">
              <i className="github" />
            </Icon>
          </Form.Control>
        </Form.Field>
        <Button.Group>
          <Button fullwidth rounded color="primary" onClick={() => console.log(formInput)}>Login</Button>
        </Button.Group>
      </form>

    <form onSubmit={onSubmit}>
      <Form.Field>
        <Form.Label>Name</Form.Label>
        <Form.Control>
          <Form.Input placeholder="Username" name="username"  onChange={onChangeForm}/>
          <Icon align="left">
            <i className="github" />
          </Icon>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>Password</Form.Label>
        <Form.Control>
          <Form.Input placeholder="Password" name="password" type="password" onChange={onChangeForm} />
          <Icon align="left">
            <i className="github" />
          </Icon>
        </Form.Control>
      </Form.Field>
      <Button.Group>
        <Button fullwidth rounded color="primary" onClick={() => console.log(formData)}>Login</Button>
      </Button.Group>
    </form>
    </div>
)*/
  return(
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" className="box" onSubmit={onSubmit}>
                <div className="field">
                  <label htmlFor="" className="label">Username</label>
                  <div className="control has-icons-left">
                    <input onChange={onChangeForm} name="username" type="text" className="input" required />
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="" className="label">Password</label>
                  <div className="control has-icons-left">
                    <input onChange={onChangeForm} name="password" type="password" placeholder="*******" className="input" required />
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