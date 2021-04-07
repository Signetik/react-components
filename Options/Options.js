import { Col, Container, Nav, Row } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Link, useHistory } from "react-router-dom"
import React, { useEffect, useState } from "react"

//const baseurl = "http://10.10.10.4:8882"
const baseurl = ""

function Menu() {
  return (
    <div>
      <Nav className="justify-content-center" variant="signetik">
        <Nav.Item>
          <Nav.Link as={Link} to="/general" className="nav-link-signetik" variant="signetik">General</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/lora" className="nav-link-signetik" variant="signetik">LoRa</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/admin" className="nav-link-signetik" variant="signetik">Admin</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

function handleSubmit(event, props) {
  event.preventDefault();
  //setTimeout(() => {setAlertVisible(false)}, 5000)

  const post_data = {"data": JSON.stringify(props.config) }
  const body = post_data

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(body)
  };
  fetch(`${baseurl}/api/config?token=${props.token}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.login === "success") {
        props.setToken(data.token)
      }
      else {
        throw new Error("Invalid login")
      }
    }).catch((error) => {
    //setAlert('Failed to login, ' + error.toString())
    //setAlertVisible(true)
  });
}

function getConfig(token) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };
  console.log("getConfig")

  return new Promise((resolve, reject) => {
    fetch(`${baseurl}/api/config?token=${token}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        var json = data.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m)
        if (json.error) {
          reject("Invalid Response")
        }
        else {
          resolve(JSON.parse(json))
        }
      });
  })
}

export function ConfigLoader(props) {
  const mounted = React.useRef(false)
  const history = useHistory()

  useEffect(() => {
    mounted.current = true
    console.log("loading token")
    var newToken = localStorage.getItem("token")
    try {
      if (!newToken) {
        throw new Error("Invalid token")
      }
      if (mounted.current) {
        props.setToken(newToken)

        if (!props.config.gateway_conf) {
          console.log("Requesting config [" + newToken + "]")
          getConfig(newToken)
            .then((result) => {
              if (mounted.current) {
                props.setConfig(result)
                console.log(result)
                //setConfig(data)
              }
            })
            .catch((error) => {
              console.log(error)
              console.log("redirecting to /login")
              props.setToken("")
              history.push("/login")
              //setAlert('Failed to receive configuration, ' + error.toString())
              //setAlertVisible(true)
            })
        }
      }
    }
    catch (error) {
        console.log(error)
        history.push("/login")
    }

    return function cleanup() {
      mounted.current = false
    }
  }, [props])

  return (<div></div>)
}

export function GeneralOptions(props) {
  if (!props.config.gateway_conf) {
    return (<div>Loading...</div>)
  }
  return (
    <Container fluid="true" >
      <Row fluid="true">
        <Col>
          <Menu />
        </Col>
      </Row>
      <Row><Col><br /></Col></Row>
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} controlId="formFrequencyPlan">
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} controlId="formChannelCount">
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
            <Button variant="signetik">Save</Button>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
      </Form>
    </Container>
  )
}

export function LoRaOptions(props) {
  if (!props.config.gateway_conf) {
    return (<div>Loading...</div>)
  }
  return (
    <Container fluid="true" >
      <Row fluid="true">
        <Col>
          <Menu />
        </Col>
      </Row>
      <Row><Col><br /></Col></Row>
      <Form onSubmit={(event) => {
          handleSubmit(event, props)
        }} >
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} controlId="formFrequencyPlan">
            <Form.Label>Frequency Plan</Form.Label>
            <Form.Control as="select">
              <option>US915</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} controlId="formChannelCount">
            <Form.Label>Channel Count</Form.Label>
            <Form.Control as="select">
              <option>8</option>
              <option>4</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Server Host</Form.Label>
            <Form.Control
              type="input"
              value={props.config.gateway_conf ? props.config.gateway_conf.server_address : "UNDEFINED"}
              onChange={(e) => {
                props.config.gateway_conf.server_address = e.target.value
                props.setConfig(props.config)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Server Downlink Port</Form.Label>
            <Form.Control
              type="input"
              value={props.config.gateway_conf ? props.config.gateway_conf.serv_port_down : "UNDEFINED"}
              onChange={(e) => {
                props.config.gateway_conf.serv_port_down = e.target.value
                //props.setConfig(props.config)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Server Uplink Port</Form.Label>
            <Form.Control
              type="input"
              value={props.config.gateway_conf ? props.config.gateway_conf.serv_port_up : "UNDEFINED"}
              onChange={(e) => {
                props.config.gateway_conf.serv_port_up = e.target.value
                //props.setConfig(props.config)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
            <Button type="submit" variant="signetik">Save</Button>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
      </Form>
    </Container>
  )
}

function Admin(props) {
  const history = useHistory()

  function doLogout() {
    if (props.logout) {
      props.logout()
      history.push("/login")
    }
  }
  return (
    <div>
      <Button onClick={doLogout} variant="signetik">Logout</Button>
    </div>
  )
}

export function AdminOptions(props) {
  if (!props.config.gateway_conf) {
    return (<div>Loading...</div>)
  }
  return (
    <Container fluid="true" >
      <Row fluid="true">
        <Col>
          <Menu />
        </Col>
      </Row>
      <Row><Col><br /></Col></Row>
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
            <Admin token={props.token} logout={() => {
              console.log("Clearing token")
              props.setToken("")
              props.setConfig({})
            }}/>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
      </Form>
    </Container>
  )
}
