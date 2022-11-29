import React, { useEffect, useState } from "react"
import { Pagination } from "../Pagination/Pagination"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"


function MoreLessIcon(props) {
  if (props.less)
    return <ExpandLessIcon className="noselect"/>;
  else
    return <ExpandMoreIcon className="noselect" />;
}

function BulkActionsContent(props) {

  if (props.expand) {
    if (props.devicesSelected > 0)
      return <div className="dropdown-content noselect"><p  data-disabled="false" onClick={props.assignFirmware}>Assign firmware</p></div>
    else
    return <div className="dropdown-content noselect"><p data-disabled="true">Assign firmware</p></div>
  }
  else
    return <div />
}

export function SortFilter(props) {
  const [bulkActionsDropShow, setBulkActionsDropShow] = useState(false);

  function bulkActionsShowClick() {
    setBulkActionsDropShow(!bulkActionsDropShow)
  }

    return (
      <div className="header-wrap">
        <div>
          <div className="dropdown devices-bulk-actions-btn" onClick={() => { bulkActionsShowClick(); }}>
            <span>Actions</span>
            <MoreLessIcon less={bulkActionsDropShow} />
            <BulkActionsContent expand={bulkActionsDropShow} devicesSelected={props.devicesSelected} assignFirmware={props.assignFirmware}/>
          </div>
          <div className="search-devices">
            <label>Search</label>
            <input id="search-val" type="search" placeholder="Search by all fields"></input>
          </div>
        </div>
            <Pagination currentPage="1" totalPages="20"/>
        <div className="devices-selected">Rows selected:
          <span id="devices-selected-val"></span> 
        </div>
        <div className="devices-count">Devices: 
          <span id="devices-count-val"></span>
        </div>
      </div>
    )
}

