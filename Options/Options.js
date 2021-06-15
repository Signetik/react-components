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
          <Nav.Link as={Link} to="/patch" className="nav-link-signetik" variant="signetik">Patch Gateway</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/admin" className="nav-link-signetik" variant="signetik">Admin</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

function handleSubmit(event, props, newErrors) {
  event.preventDefault();
  //setTimeout(() => {setAlertVisible(false)}, 5000)

  if(Object.keys(newErrors).length > 0) {
    return
  }

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

        if (data.error) {
          reject("Invalid Response")
        }
        else {
          var json = data.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m)
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
  }, [props, history])

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
  console.log(props.config.gateway_conf)

  const [serveruplink, setServeruplink] = useState(props.config.gateway_conf ? props.config.gateway_conf.serv_port_up : "UNDEFINED")
  const [serverdownlink, setServerdownlink] = useState(props.config.gateway_conf ? props.config.gateway_conf.serv_port_down : "UNDEFINED")
  const [serveraddress, setServeraddress] = useState(props.config.gateway_conf ? props.config.gateway_conf.server_address : "UNDEFINED")
  const [keepaliveInterval, setKeepaliveInterval] = useState(props.config.gateway_conf ? props.config.gateway_conf.keepalive_interval : "UNDEFINED")
  const [statInterval, setStatInterval] =  useState(props.config.gateway_conf ? props.config.gateway_conf.stat_interval : "UNDEFINED")
  const [pushTimeoutMs, setPushTimeoutMs] =  useState(props.config.gateway_conf ? props.config.gateway_conf.push_timeout_ms : "UNDEFINED")
  const [errors, setErrors] = useState({})

  if (!props.config.gateway_conf) {
    return (<div>Loading...</div>)
  }

  const findConfigErrors = () => {
    const newErrors = {}
    if (!serveruplink || serveruplink === 'UNDEFINED' || parseInt(serveruplink) < 1 || parseInt(serveruplink) > 65535) newErrors.uplink = 'ports must be between 1-65535'
    if (!serverdownlink || serverdownlink === 'UNDEFINED' || parseInt(serverdownlink) < 1 || parseInt(serverdownlink) > 65535) newErrors.downlink = 'ports must be between 1-65535'
    if (!serveraddress || serveraddress === 'UNDEFINED') newErrors.address = 'server address can\'t be empty'
    if (!keepaliveInterval || keepaliveInterval === 'UNDEFINED' || parseInt(keepaliveInterval) < 1 || parseInt(keepaliveInterval) > 32767) newErrors.keepalive = 'interval must be between 1-32767'
    if (!statInterval || statInterval === 'UNDEFINED' || parseInt(statInterval) < 1 || parseInt(statInterval) > 32767) newErrors.stat = 'interval must be between 1-32767'
    if (!pushTimeoutMs || pushTimeoutMs === 'UNDEFINED' || parseInt(pushTimeoutMs) < 1 || parseInt(pushTimeoutMs) > 32767) newErrors.pushTimeout = 'value must be between 1-32767'

    return newErrors
  }

  const setField = (field, value) => {
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
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
          const newErrors = findConfigErrors()
          if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
          }
          handleSubmit(event, props, newErrors)
        }} >
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} controlId="formFrequencyPlan" xs={4}>
            <Form.Label>Frequency Plan</Form.Label>
            <Form.Control as="select">
              <option>US915</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} controlId="formChannelCount" xs={4}>
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
          <Form.Group as={Col} xs={4}>
            <Form.Label>Server Host</Form.Label>
            <Form.Control
              type="input"
              value={(serveraddress === 'UNDEFINED' && props.config.gateway_conf) ? props.config.gateway_conf.server_address : serveraddress}
              onChange={(e) => {
                setServeraddress(e.target.value)
                setField('address', e.target.value)
                props.config.gateway_conf.server_address = e.target.value
                props.setConfig(props.config)
              }}
              isInvalid={ !!errors.address }
            ></Form.Control>
            <Form.Control.Feedback type='invalid'>
              { errors.address }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={4}>
            <Form.Label>Keepalive Interval</Form.Label>
            <Form.Control
              type="input"
              value={(keepaliveInterval === 'UNDEFINED' && props.config.gateway_conf) ? props.config.gateway_conf.keepalive_interval : keepaliveInterval}
              onChange={(e) => {
                setKeepaliveInterval(e.target.value)
                setField('keepalive', e.target.value)
                props.config.gateway_conf.keepalive_interval = parseInt(e.target.value)
                props.setConfig(props.config)
              }}
              isInvalid={ !!errors.keepalive }
            ></Form.Control>
            <Form.Control.Feedback type='invalid'>
              { errors.keepalive }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={4}>
          <Form.Label>Server Downlink Port</Form.Label>
          <Form.Control
            type="input"
            value={(serverdownlink === 'UNDEFINED' && props.config.gateway_conf) ? props.config.gateway_conf.serv_port_down : serverdownlink}
            onChange={(e) => {
              console.log(props.config.gateway_conf.serv_port_down)
              setServerdownlink(e.target.value)
              setField('downlink', e.target.value)
              props.config.gateway_conf.serv_port_down = parseInt(e.target.value)
              props.setConfig(props.config)
            }}
            isInvalid={ !!errors.downlink }
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            { errors.downlink }
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={4}>
            <Form.Label>Server Uplink Port</Form.Label>
            <Form.Control
              type="input"
              value={(serveruplink  === 'UNDEFINED' && props.config.gateway_conf) ? props.config.gateway_conf.serv_port_up : serveruplink}
              onChange={(e) => {
                setServeruplink(e.target.value)
                setField('uplink', e.target.value)
                props.config.gateway_conf.serv_port_up = parseInt(e.target.value)
                props.setConfig(props.config)
              }}
              isInvalid={ !!errors.uplink }
            ></Form.Control>
            <Form.Control.Feedback type='invalid'>
              { errors.uplink }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={4}>
          <Form.Label>Stat Interval</Form.Label>
          <Form.Control
            type="input"
            value={(statInterval  === 'UNDEFINED' && props.config.gateway_conf) ? props.config.gateway_conf.stat_interval : statInterval}
            onChange={(e) => {
              setStatInterval(e.target.value)
              setField('stat', e.target.value)
              props.config.gateway_conf.stat_interval = parseInt(e.target.value)
              props.setConfig(props.config)
            }}
            isInvalid={ !!errors.stat }
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            { errors.stat }
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={4}>
            <Form.Label>Push Timeout (ms)</Form.Label>
            <Form.Control
              type="input"
              value={(pushTimeoutMs  === 'UNDEFINED' && props.config.gateway_conf) ? props.config.gateway_conf.push_timeout_ms : pushTimeoutMs}
              onChange={(e) => {
                setPushTimeoutMs(e.target.value)
                setField('pushTimeout', e.target.value)
                props.config.gateway_conf.push_timeout_ms = parseInt(e.target.value)
                props.setConfig(props.config)
              }}
              isInvalid={ !!errors.pushTimeout }
            ></Form.Control>
            <Form.Control.Feedback type='invalid'>
              { errors.pushTimeout }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={4}>
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

export function PatchOptions(props) {
  const [selectedFile, setSelectedFile] = useState()
	const [isFilePicked, setIsFilePicked] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [error, setError] = useState()

  const fileChangeHandler = (event) => {
		setSelectedFile(event.target.files[0])
		setIsFilePicked(true)
    setUploadStatus("")
	};

  const handleFileSubmission = e => {
    e.preventDefault() //prevent the form from submitting
		const formData = new FormData();

		formData.append('gatewayfile', selectedFile)
    setError("")
    setIsFilePicked(false)
    setUploadStatus("Uploading... " + selectedFile.name)

    const requestOptions = {
      method: 'POST',
      body: formData
    };
    fetch(`${baseurl}/api/upload?token=${props.token}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
        if (result.error === "false") {
  				console.log('Success:', result)
          setUploadStatus("Installing firmware: " + selectedFile.name)
          const requestGetOptions = {
            method: 'GET'
          }
          fetch(`${baseurl}/api/upload?token=${props.token}`, requestGetOptions)
            .then((response) => response.json())
            .then((result) => {
              console.log('Success:', result)
              if (result.error === "outdated") {
                setUploadStatus("Newer/Current version exists: " + result.version)
              } else if (result.error === "false") {
                setUploadStatus("Installed firmware: " + selectedFile.name)
                const requestGetOptions = {
                  method: 'GET'
                };
              } else {
                throw new Error("Something went wrong")
              }
            })
        }
        else if (result.error === "FILE_MISSING") {
          throw new Error("FILE_MISSING")
        }
        else {
          throw new Error("")
        }
			})
			.catch((error) => {
        const { code } = error?.response?.data
        switch (code) {
          case "FILE_MISSING":
            setError("Please select a file before uploading!")
            break
          default:
            setError("Sorry! Something went wrong. Please try again later")
            break
        }
			})
	}

  if (!props.config.gateway_conf) {
    return (<div>Loading...</div>)
  }

  return(
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
          <Form.Group as={Col} xs={9}>
            <Form.File
              id="patch-file"
              label="Select patch file"
              accept=".jpg, .png, .txz"
              custom
              onChange={fileChangeHandler} />
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
          {isFilePicked ? (
            <div>
              <Form.Label>Filename: {selectedFile.name}</Form.Label>
              <Form.Label>Filetype: {selectedFile.type}</Form.Label>
              <Form.Label>Size in bytes: {selectedFile.size}</Form.Label>
              <Form.Label>
                lastModifiedDate:{' '}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </Form.Label>
            </div>
          ) : (
            <Form.Label>{uploadStatus}</Form.Label>
          )}
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
            <Button type="submit"  variant="signetik" onClick={handleFileSubmission}>Upload</Button>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        {error && <Alert variant="danger">{error}</Alert>}
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
