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

function BulkActionItem(props) {
  if (props.enabled) {
    return <p  data-disabled="false" onClick={props.action}>{props.text}</p>
  }
  else {
    return <p  data-disabled="true">{props.text}</p>
  }
}

function BulkActionsContent(props) {
  var devicesAvailable = props.devicesSelected > 0;

  if (props.expand) {
    return <div className="dropdown-content noselect">
        <BulkActionItem enabled={(props.devicesSelected > 0) ? true : false} text="Assign 9160 firmware" action={() => props.action('assign-m1')} />
        <BulkActionItem enabled={(props.devicesSelected > 0) ? true : false} text="Assign 52xx firmware" action={() => props.action('assign-b1')} />
      </div>
  }
  else
    return <div />
}

export function SortFilter(props) {
  const [bulkActionsDropShow, setBulkActionsDropShow] = useState(false);

  var totalPages = Math.floor((props.count + props.stride - 1) / props.stride)

  function bulkActionsShowClick() {
    setBulkActionsDropShow(!bulkActionsDropShow)
  }

    return (
      <div className="header-wrap">
        <div>
          <div className="dropdown devices-bulk-actions-btn" onClick={() => { bulkActionsShowClick(); }}>
            <span>Actions</span>
            <MoreLessIcon less={bulkActionsDropShow} />
            <BulkActionsContent expand={bulkActionsDropShow} devicesSelected={props.devicesSelected} action={props.action}/>
          </div>
          <div className="search-devices">
            <label>Search</label>
            <input id="search-val" type="search" placeholder="Search by all fields"></input>
          </div>
        </div>
            <Pagination setPage={props.setPage} currentPage={props.currentPage} totalPages={totalPages}/>
        <div className="devices-selected">Rows selected:
          <span id="devices-selected-val"></span> 
        </div>
        <div className="devices-count">Devices: 
          <span id="devices-count-val">{props.count}</span>
        </div>
      </div>
    )
}

