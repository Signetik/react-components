import React, {useState} from "react"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import MD5 from "crypto-js/md5";

import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [token, setToken] = useState("");

  function validateForm() {
    return user.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAlert("Failed to login")
    setAlertVisible(true)
    setTimeout(() => {setAlertVisible(false)}, 5000)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      /*body: JSON.stringify({ fruit: 'Steve' })*/
    };
    const md5password = MD5(`${password}`).toString();
    fetch(`http://10.10.10.4:8882/login?user=${user}&password=${md5password}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setToken(data.token)
      });
  }

  return (
  <div className="Login">
    <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="email">
        <Form.Label>User</Form.Label>
        <Form.Control
          autoFocus
          value={user}
          onChange={(e) => setUser(e.target.value)}
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
      <Button block size="lg" type="submit" disabled={!validateForm()}>
        Login
      </Button>
    </Form>
    <br />
    <Alert show={alertVisible} variant="warning">{alert}</Alert>
    <Alert show={token.length > 0} variant="warning">{token}</Alert>
  </div>
  )
}