import React, {useState} from "react"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import { Redirect } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";

const baseurl = (process.env.NODE_ENV === 'development') ? "http://fota19.aws.signetik.com" : ""

let validtoken = false

export default function Login(props) {
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  function validateForm() {
    return props.user.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTimeout(() => {setAlertVisible(false)}, 5000)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    fetch(`${baseurl}/api/login?user=${props.user}&password=${password}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.login === "success") {
          props.setToken(data.token)
          validtoken = true
        }
        else {
          throw new Error("Invalid login")
        }
      }).catch((error) => {
        setAlert('Failed to login, ' + error.toString())
        setAlertVisible(true)
      });
  }

  function validateToken(token) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    console.log("validate Existing Token")

    return new Promise((resolve, reject) => {
      fetch(`${baseurl}/api/login?token=${token}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.error === "true") {
            console.log("Token Not Valid")
            reject()
          }
          else {
            console.log("Token Valid")
            resolve()
          }
        });
    })
  }

  if (props.token.length === 0) {
    validtoken = false
  }
  else if (props.token.length > 0 && validtoken === false) {
    validateToken(props.token).then( () => {
      validtoken = true
    }).catch( () => {
      console.log("No redirect")
      props.setToken("")
     });
  }
  else {
    console.log("redirect to " + props.redirect)
    return (<Redirect to={props.redirect} />)
  }


  return (
  <div className="Login">
    <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="email">
        <Form.Label>User</Form.Label>
        <Form.Control
          autoFocus
          value={props.user}
          onChange={(e) => props.setUser(e.target.value)}
        />
      </Form.Group>
      <Form.Group size="lg" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button block size="lg" type="submit" disabled={!validateForm()} variant="signetik">
        Login
      </Button>
    </Form>
    <br />
    <Alert show={alertVisible} variant="warning">{alert}</Alert>
  </div>
  )
}
