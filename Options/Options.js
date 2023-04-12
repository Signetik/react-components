import { Col, Container, Nav, Row } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import Table from 'react-bootstrap/Table'
import { Link, useHistory } from "react-router-dom"
import React, { useEffect, useState } from "react"

const baseurl = (process.env.NODE_ENV === 'development') ? "http://fota19.aws.signetik.com" : ""

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
          <Nav.Link as={Link} to="/network" className="nav-link-signetik" variant="signetik">Network Settings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/patch" className="nav-link-signetik" variant="signetik">Update Gateway</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/keys" className="nav-link-signetik" variant="signetik">SSH Keys</Nav.Link>
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
      if (data.error === "true") {
        throw new Error("Not logged in")
      }
    }).catch((error) => {
      console.log(error)
  });
}

function handleStatusSubmission (e, props, newErrors) {
  e.preventDefault();

  if(Object.keys(newErrors).length > 0) {
    return
  }

  const post_data = {"data": JSON.stringify(props.status) }
  const body = post_data

  console.log(post_data)

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(body)
  };
  fetch(`${baseurl}/api/status?token=${props.token}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.error === "true") {
        throw new Error("Not logged in")
      }
    }).catch((error) => {
      console.log(error)
  });
}

function getStatus(token) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };
  console.log("getStatus")

  return new Promise((resolve, reject) => {
    fetch(`${baseurl}/api/status?token=${token}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)

        if (data.error) {
          reject("Invalid Response")
        }
        else {
          //var json = JSON.parse(data.toString().replace(/\r?\n|\r/g, ''))
          //console.log(json)
          resolve(data)
        }
      });
  })
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
                console.log("Requesting status [" + newToken + "]")
                getStatus(newToken)
                  .then((result) => {
                    props.setStatus(result)
                    console.log(result)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
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
  if (!props.status) {
    return (<div>Loading...</div>)
  }
  return (
    <Container fluid="true" >
      <Row fluid="true">
        <Col>
          <Menu />
        </Col>
      </Row>
      <Row><Col><br /><br /></Col></Row>
      <Table striped bordered hover variant="signetik">
        <thead>
          <tr>
            <th variant="signetik">Property</th>
            <th variant="signetik">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Device Serial Number</td>
            <td>{props.status.device_serial}</td>
          </tr>
          <tr>
            <td>Cellular Serial Number</td>
            <td>{props.status.cellular_serial}</td>
          </tr>
          <tr>
            <td>EUI</td>
            <td>TBA</td>
          </tr>
          <tr>
            <td>IMEI</td>
            <td>TBA</td>
          </tr>
          <tr>
            <td>Firmware Version</td>
            <td>{props.status.firmware_version}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export function LoRaOptions(props) {
  console.log(props.config)

  const [channelCount, setChannelCount] = useState(props.config.SX130x_conf ? props.config.SX130x_conf.radio_1.enable : "true")
  const [serveruplink, setServeruplink] = useState(props.config.gateway_conf ? props.config.gateway_conf.serv_port_up : "UNDEFINED")
  const [serverdownlink, setServerdownlink] = useState(props.config.gateway_conf ? props.config.gateway_conf.serv_port_down : "UNDEFINED")
  const [serveraddress, setServeraddress] = useState(props.config.gateway_conf ? props.config.gateway_conf.server_address : "UNDEFINED")
  const [keepaliveInterval, setKeepaliveInterval] = useState(props.config.gateway_conf ? props.config.gateway_conf.keepalive_interval : "UNDEFINED")
  const [statInterval, setStatInterval] =  useState(props.config.gateway_conf ? props.config.gateway_conf.stat_interval : "UNDEFINED")
  const [pushTimeoutMs, setPushTimeoutMs] =  useState(props.config.gateway_conf ? props.config.gateway_conf.push_timeout_ms : "UNDEFINED")
  const [networkProtocol, setNetworkProtocol] = useState(props.config.gateway_conf ? props.config.gateway_conf.net_protocol : "0")
  const [loraFrequency, setLoraFrequency] = useState(props.config.SX130x_conf ? props.config.SX130x_conf.radio_0.freq: "904300000")
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
            <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Frequency Plan</Form.Label>
              <Form.Control as="select">
                <option>US915</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Channels</Form.Label>
              <Form.Control
                as="select"
                defaultValue={loraFrequency}
                onChange={(e) => {
                  setLoraFrequency(e.target.value)
                  props.config.SX130x_conf.radio_0.freq = parseInt(e.target.value)
                  props.setConfig(props.config)
                }}
                >
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="902700000">0-3 : 902.3-902.9</option>
                ) : (
                  <option value="902700000">0-7 : 902.3-903.7</option>
                )}
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="903500000">4-7 : 903.1-903.7</option>
                ) : (
                  <option value="904300000">8-15: 903.9-905.3</option>
                )}
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="904300000">8-11 : 903.9-904.5</option>
                ) : (
                  <option value="905900000">16-23: 905.5-906.9</option>
                )}
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="905100000">12-15 : 904.7-905.3</option>
                ) : (
                  <option value="907500000">24-31: 907.1-908.5</option>
                )}
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="905900000">16-19 : 905.5-906.1</option>
                ) : (
                  <option value="909100000">32-39: 908.7-910.1</option>
                )}
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="906700000">20-23 : 906.3-906.9</option>
                ) : (
                  <option value="910700000">40-47: 910.3-911.7</option>
                )}
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="907500000">24-27 : 907.1-907.7</option>
                ) : (
                  <option value="912300000">48-55: 911.9-913.3</option>
                )}
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="908300000">28-31 : 907.9-908.5</option>
                ) : (
                  <option value="913900000">56-63: 913.5-914.9</option>
                )}
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="909100000">32-35 : 908.7-909.3</option>
                ) : null
                }
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="909900000">36-39 : 909.5-910.1</option>
                ) : null
                }
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="910700000">40-43 : 910.3-910.9</option>
                ) : null
                }
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="911500000">44-47 : 911.1-911.7</option>
                ) : null
                }
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="912300000">48-51 : 911.9-912.5</option>
                ) : null
                }
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="913100000">52-55 : 912.7-913.3</option>
                ) : null
                }
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="913900000">56-59 : 913.5-914.1</option>
                ) : null
                }
                {props.config.SX130x_conf.radio_1.enable === false ? (
                  <option value="914700000">60-63 : 914.3-914.9</option>
                ) : null
                }
              </Form.Control>
            </Form.Group>
            </Form.Row>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} controlId="formChannelCount" xs={4}>
            <Form.Label>Channel Count</Form.Label>
            <Form.Control
              as="select"
              defaultValue={channelCount}
              onChange={(e) => {
                setChannelCount(e.target.value)
                props.config.SX130x_conf.radio_1.enable = (e.target.value === "true")
                props.setConfig(props.config)
              }}
              >
              <option value="true">8</option>
              <option value="false">4</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} controlId="formNetworkProtocol" xs={4}>
            <Form.Label>Network Interface</Form.Label>
            <Form.Control
              as="select"
              defaultValue={networkProtocol}
              onChange={(e) => {
                setNetworkProtocol(e.target.value)
                props.config.gateway_conf.net_protocol = parseInt(e.target.value)
                props.setConfig(props.config)
              }}
              >
              <option value="0">Ethernet</option>
              <option value="1">Cellular</option>
            </Form.Control>
          </Form.Group>
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
          <Form.Group as={Col} xs={4}>
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
              label="Select update file"
              accept=".txz"
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
              <br/>
              <Form.Label>Size in bytes: {selectedFile.size}</Form.Label>
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

export function SshOptions(props) {
  const [error, setError] = useState()
  const [fileContent, setFileContent] = useState()
  const [uploadStatus, setUploadStatus] = useState('')

  if (!props.config.gateway_conf) {
    return (<div>Loading...</div>)
  }

  console.log(fileContent)

  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    setFileContent(content)
  };

  const handleFileChosen = (file) => {
    setUploadStatus("")
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const handleFileDeletion = e => {
    e.preventDefault() //prevent the form from submitting

    const requestGetOptions = {
      method: 'GET'
    }
    fetch(`${baseurl}/api/keys?token=${props.token}`, requestGetOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result)
        if (result.error === "false") {
          setUploadStatus("Key Deleted")
        } else {
          throw new Error("Something went wrong")
        }
      })
  }

  const handleFileSubmission = e => {
    e.preventDefault() //prevent the form from submitting
    const formData = new FormData();

    const blob = new Blob([fileContent], {type: "text/plain"});
    formData.append('sshfile', blob)
    setError("")

    const requestOptions = {
      method: 'POST',
      body: formData
    };
    fetch(`${baseurl}/api/keys?token=${props.token}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.error === "false") {
          console.log('Success:', result)
          setUploadStatus("Uploaded")
        }
        else if (result.error === "true") {
          throw new Error("No content")
        }
        else {
          throw new Error("")
        }
      })
      .catch((error) => {
        const { code } = error?.response?.data
        switch (code) {
          case "No content":
            setError("Please select a file or enter content before uploading!")
            break
          default:
            setError("Sorry! Something went wrong. Please try again later")
            break
        }
      })
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
            <Form.Control as="textarea" rows={8}
              placeholder="Paste content here or choose a file below"
              value={fileContent}
              onChange={(e) => {
                setUploadStatus("")
                setFileContent(e.target.value)
              }}/>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={9}>
            <Form.File
              id='file'
              label="Choose file"
              accept='.txt, .pub'
              custom
              onChange={e => handleFileChosen(e.target.files[0])} />
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={9}>
            <Form.Label>{uploadStatus}</Form.Label>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
            <Button type="submit"  variant="signetik" disabled={!fileContent || fileContent === ''} onClick={handleFileSubmission}>Add Key</Button>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col}>
            <Button type="submit"  variant="signetik" onClick={handleFileDeletion}>Delete Key</Button>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        {error && <Alert variant="danger">{error}</Alert>}
      </Form>
    </Container>
	)
}

export function NetworkOptions(props) {
  console.log(props.status)

  const [dhcpEnabled, setDhcpEnabled] = useState(!props.status ? "true" : (props.status.dhcp_enabled === true) ? "true" : "false")
  const [ipAddress, setIpAddress] = useState(props.status ? props.status.ip_address : "UNDEFINED")
  const [networkMask, setNetworkMask] = useState(props.status ? props.status.netmask : "UNDEFINED")
  const [errors, setErrors] = useState({})

  if (!props.status) {
    return (<div>Loading...</div>)
  }

  const validateIPaddress = (inputText) => {
    if (inputText === "UNDEFINED") {
      return false;
    }
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(inputText.match(ipformat))
    {
      console.log("VALID")
      return true;
    }
    else
    {
      console.log("INVALID")
      return false;
    }
  }

  const findConfigErrors = () => {
    const newErrors = {}

    console.log(ipAddress)
    console.log(networkMask)

    if (!ipAddress || ipAddress === 'UNDEFINED' || validateIPaddress(ipAddress)  === false) newErrors.ip = 'Invalid ip-address entered'
    if (!networkMask || networkMask === 'UNDEFINED' || validateIPaddress(networkMask) === false) newErrors.mask = 'Invalid Subnet Mask Entered'

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
          handleStatusSubmission(event, props, newErrors)
        }} >
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={6}>
            <Form.Label>Enable DHCP</Form.Label>
            <Form.Control
              as="select"
              defaultValue={dhcpEnabled}
              onChange={(e) => {
                setDhcpEnabled(e.target.value)
                props.status.dhcp_enabled = (e.target.value === "true")
                props.setStatus(props.status)
              }}
              >
              <option value="true">TRUE</option>
              <option value="false">FALSE</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={6}>
            <Form.Label>IP Address</Form.Label>
            <Form.Control
              type="input"
              value={ipAddress}
              disabled={dhcpEnabled === "true"}
              onChange={(e) => {
                setIpAddress(e.target.value)
                setField('ip', e.target.value)
                props.status.ip_address = e.target.value
                props.setStatus(props.status)
              }}
              isInvalid={ !!errors.ip }
            ></Form.Control>
            <Form.Control.Feedback type='invalid'>
              { errors.ip }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={6}>
          <Form.Label>Subnet Mask</Form.Label>
          <Form.Control
            type="input"
            value={networkMask}
            disabled={dhcpEnabled === 'true'}
            onChange={(e) => {
              setNetworkMask(e.target.value)
              setField('mask', e.target.value)
              props.status.netmask = e.target.value
              props.setStatus(props.status)
            }}
            isInvalid={ !!errors.mask }
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            { errors.mask }
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
          </Form.Group>
          <Form.Group as={Col} xs={6}>
            <Button type="submit" disabled={dhcpEnabled === "true"} variant="signetik">Save</Button>
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
