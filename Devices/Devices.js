import { Col, Container, Nav, Row } from "react-bootstrap"
import Table from 'react-bootstrap/Table'

import { Link, useHistory } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { SortFilter } from "../SortFilter/SortFilter"
import CheckBox from "@material-ui/core/CheckBox"
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import { blue } from '@material-ui/core/colors';
import { LocalConvenienceStoreOutlined } from "@material-ui/icons"

const baseuri = (process.env.NODE_ENV === 'development') ? "fota19.aws.signetik.com" : window.location.host 
const baseurl = (process.env.NODE_ENV === 'development') ? "http://fota19.aws.signetik.com" : ""
//const baseurl = (process.env.NODE_ENV === 'development') ? "http://ec2-44-211-212-146.compute-1.amazonaws.com" : ""

function Menu() {
  return (
    <div>
      <Nav className="justify-content-center" variant="signetik">
        <Nav.Item>
          <Nav.Link as={Link} to="/devices" className="nav-link-signetik" variant="signetik">Devices</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/firmware" className="nav-link-signetik" variant="signetik">Firmware</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/admin" className="nav-link-signetik" variant="signetik">Admin</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

function getDevices(token, start, end, textQuery) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + token }
  };
  console.log("getDevices")

  return new Promise((resolve, reject) => {
    fetch(`${baseurl}/api/devices?token=${token}&start=${start}&end=${end}&textQuery=${textQuery}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)

        if (data.error) {
          reject("Invalid Response")
        }
        else {
            resolve(data)
        }
      });
  })
}

function getFirmwares(token, start, end) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + token }
  };
  console.log("getFirmwares")

  return new Promise((resolve, reject) => {
    fetch(`${baseurl}/api/firmwares?token=${token}&start=${start}&end=${end}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)

        if (data.error) {
          reject("Invalid Response")
        }
        else {
            resolve(data)
        }
      });
  })
}

function putFirmware(token, deviceId, firmwareId) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firmware: firmwareId, x: 'x' })
  };
  console.log("putFirmware device:" + deviceId + ", firmware: " + firmwareId)

  return new Promise((resolve, reject) => {
    fetch(`${baseurl}/api/device/${deviceId}?token=${token}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)

        if (data.error) {
          reject("Invalid Response")
        }
        else {
            resolve(data)
        }
      });
  })
}


export function DevicesLoader(props) {
  const mounted = React.useRef(false)
  const history = useHistory()
  const ws = React.useRef(null);
  const [deviceTimer, setDeviceTimer] = useState(null);
  const [startDevice, setStartDevice] = useState(-1);
  const [endDevice, setEndDevice] = useState(-1);
  const [textQuery, setTextQuery] = useState("");

  const performGetDevices = React.useCallback((props, token) => {
    console.log("Requesting devices [" + token + "] " + props.startDevice + " -> " + props.endDevice)
    getDevices(token, props.startDevice, props.endDevice, props.textQuery)
      .then((result) => {
        if (mounted.current) {
          props.setDeviceCount(result.count)
          props.setDevices(result.devices)
          //console.log(result)
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
  }, [history]);

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

        if (!props.devices || (startDevice != props.startDevice) || (endDevice != props.endDevice) || (textQuery != props.textQuery)) {
          performGetDevices(props, newToken);
          setStartDevice(props.startDevice);
          setEndDevice(props.endDevice);
          setTextQuery(props.textQuery);
        }

        if (!ws.current) {
          ws.current = new WebSocket("ws://" + baseuri + "/ws");

          ws.current.onopen = function() {
            //ws.send("Hello, world");
          };
          ws.current.onmessage = function (evt) {
            console.log("ws message: " + evt.data);
            if (!deviceTimer) {
              var timerId = setTimeout(()=>{
                setDeviceTimer(null);
                performGetDevices(props, newToken);
                },2000);
              setDeviceTimer(timerId);
            }
          };
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
  }, [history, props, props.startDevice, deviceTimer, performGetDevices])

  return (<div></div>)
}

export function FirmwaresLoader(props) {
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

        if (!props.firmwares) {
          console.log("Requesting firmwares [" + newToken + "] " + props.startFirmware + " -> " + props.endFirmware)
          getFirmwares(newToken, props.startFirmware, props.endFirmware)
            .then((result) => {
              if (mounted.current) {

                // Sort by version number
                var firmwares = result.map( a => { a.version = a.version.replace(/\d+/g, n => +n+100000); return a;}  )
                  .sort((a,b) => { if (a.version > b.version) return -1; else return 1})
                  .map( a => { a.version = a.version.replace(/\d+/g, n => +n-100000); return a;}  )

                props.setFirmwares(firmwares);
              }
            })
            .catch((error) => {
              console.log(error)
              console.log("redirecting to /login")
              props.setToken("")
              history.push("/login")
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

function firmwaresUpdate(devices, firmware) {
  console.log('firmwaresUpdate');
  var newToken = localStorage.getItem("token")
  try {
    if (!newToken) {
      throw new Error("Invalid token")
    }

    console.log('for each device');
    devices.forEach((device) => {
      console.log(device.devid);
      putFirmware(newToken, device._id, firmware._id);
    } )
    }
  catch (error) {
    console.log(error)
  }
}

// [{devid: "CTR02-352656102740753", imei: "352656102740753"}, {devid: "test-dev-11", imei: "352656106312518"}, {devid: "test-dev-12", imei: "352656106312393"}, {devid: "test-dev-13", imei: "352656106312534"}, {devid: "test-dev-3", imei: "352656102740977"}, {devid: "test-dev-99", imei: "1234"}]

function dateConvert(d) {
    var dt = new Date(d)
    return dt.toLocaleString()
}

function FirmwareDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
  };

  const handleListItemClick = (devices, firmware) => {
    console.log("click: " + firmware._id + " " + firmware.version + " devices: " + devices.length)
    onClose(devices, firmware);
  };

  var update_devices = props.devicesSelected;
  //var update_firmwares = props.firmwares.filter((firmware) => firmware.released);
  var update_firmwares = props.firmwares;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Modal hideBackdropx onClose={handleClose} open={open} onBackdropClick={onClose}
    aria-labelledby="child-modal-title"
    aria-describedby="child-modal-description"
    >
      <Box sx={{...style}}>
        <h4 id="child-modal-title">Firmware</h4>
        <Paper style={{maxHeight: 200, overflow: 'auto'}}>
      <List sx={{ pt: 0 }} id="child-modal-description">
        {update_firmwares.map((firmware) => (
          <ListItem button onClick={() => handleListItemClick(update_devices, firmware)} key={firmware._id}>
            <ListItemText primary={firmware.version} />
          </ListItem>
        ))}
      </List>
      </Paper>
      </Box>
    </Modal>
  );
}
/*
function selectDevice(e) {
  var row = $(e.target).parents('tr');

  if (row.hasClass('check-disabled'))
    return;

  var checked = !(row[0].dataset['checked'] == 'true');

  row[0].dataset['checked'] = checked;

  var icon = row.find('i');
  icon.text(checked ? 'check_box' : 'check_box_outline_blank');

  refreshSelectAllBtnIcon();
}*/

function Progress(props) {
  if (props.total > 0) {
    var percent = Math.round(props.current * 100 / props.total);
    return <div title={props.file}>{percent}%</div>
  }
  else
    return <div />
}


export function Devices(props) {
  const [open, setOpen] = React.useState(false);
  const [devicesSelected, setDevicesSelected] = React.useState(0);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [matchFirmwares, setMatchFirmwares] = React.useState([]);

  if (!props.devices) {
    return (<div>Loading...</div>)
  }

  if (!props.firmwares) {
    return (<div>Loading...</div>)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (devices, firmware) => {
    console.log("handleClose");
    setOpen(false);
    firmwaresUpdate(devices, firmware);
  };

  const countSelectedDevices = () => {
    setDevicesSelected(props.devices.filter(device => device.checked));
  }

  const deviceAction = (evt) => {
    console.log('do action: ' + evt);

    if (evt == "assign-m1") {
      console.log(props.firmwares);
      setMatchFirmwares(props.firmwares.filter(firmware => firmware.target == "m1"));
      handleClickOpen();
    }
    if (evt == "assign-b1") {
      setMatchFirmwares(props.firmwares.filter(firmware => firmware.target == "b1"));
      handleClickOpen();
    }
  }

  const handleCBChange = (event: React.ChangeEvent<HTMLInputElement>, devid) => {
    console.log('cb change');
    var device = props.devices.find(device => device.devid === devid)
    if (device) {
      console.log(event.target.checked);
      device.checked = event.target.checked;
    }
    countSelectedDevices();
  };

  return (
    <Container fluid="true" className="Container">
      <Row fluid="true">
        <Col>
          <Menu />
        </Col>
      </Row>
      <SortFilter onSearchChange={props.onSearchChange} setPage={props.setPage} devicesSelected={devicesSelected.length} action={deviceAction} currentPage={props.currentPage} count={props.count} stride={props.stride} />
      <FirmwareDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        devices={props.devices}
        devicesSelected={devicesSelected}
        firmwares={matchFirmwares}
      />
      <Table striped bordered hover variant="signetik" className="devices-list">
        <thead>
          <tr />
          <tr>
            <td variant="signetik">SELECT</td>
            <td variant="signetik">DEVID</td>
            <td variant="signetik">IMEI</td>
            <td variant="signetik">9160 FW</td>
            <td variant="signetik">52xx FW</td>
            <td variant="signetik">9160 FW assigned</td>
            <td variant="signetik">52xx FW assigned</td>
            <td variant="signetik">Last Connection</td>
            <td variant="signetik">Description</td>
            <td variant="signetik">Progress</td>
          </tr>
        </thead>
        <tbody className="table-content">
            { props.devices.map((device, i) => <tr data-_id={device._id} >
                <td className="checkbox-cell">
                  <label className="checkbox">
                    <CheckBox
                      className="checkbox-icon"
                      color="success"
                      onChange={(event) => {handleCBChange(event, device.devid)}}
                      />
                  </label>
                </td>
                <td><div className="device-id">{device.devid}</div></td>
                <td>{device.imei}</td>
                <td>{device.m1fw}</td>
                <td>{device.b1fw}</td>
                <td className={`${device.m1fw_depends ? 'depends' : ''}`}>{device.m1fw_assigned}</td>
                <td className={`${device.b1fw_depends ? 'depends' : ''}`}>{device.b1fw_assigned}</td>
                <td>{dateConvert(device.modified)}</td>
                <td>{device.desc}</td>
                <td><Progress current={device.progress.current} total={device.progress.total} file={device.progress.file}/></td>
              </tr>) }
        </tbody>
      </Table>
    </Container>
  )
}
