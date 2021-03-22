import { Col, Container, Nav, Row } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Link, useHistory } from "react-router-dom"
import React, { useEffect, useState } from "react"

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

function getConfig(token) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };
  console.log("getConfig")

  return new Promise((resolve, reject) => {
    fetch(`http://10.10.10.4:8882/?token=${token}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        if (data.error) {
          reject("Invalid Response")
        }
        else {
          resolve(JSON.parse(data))
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

        if (!props.config.SX130x_conf) {
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
  if (!props.config.SX130x_conf) {
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
  if (!props.config.SX130x_conf) {
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
            <Form.Label>Server Port</Form.Label>
            <Form.Control
              type="input"
              value={props.config.gateway_conf ? props.config.gateway_conf.serv_port_down : "UNDEFINED"}
              onChange={(e) => {
                props.config.gateway_conf.serv_port_down = e.target.value
                props.setConfig(props.config)
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
  if (!props.config.SX130x_conf) {
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