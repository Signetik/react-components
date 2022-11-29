import React, { useEffect, useState } from "react"

export function Pagination(props) {
    var count = 9;
    var pagestart = parseInt(props.currentPage, 10) - (count - 1) / 2;
    var pageend = parseInt(props.currentPage, 10) + (count - 1) / 2;

    if (pagestart < 1) {
        pageend = pageend + 1 - pagestart;
        pagestart = 1;
    }

    var pagination = []
    pagination.push(<div data-page={props.currentPage} data-total-pages={props.totalPages} />);

    if (pagestart > 1) {
        pagination.push(<a>[First]</a>);
    } else {
        pagination.push(<a disabled>[First]</a>);
    }

    for (var k = pagestart; k < pageend + 1; k++) {
        if (k === parseInt(props.currentPage, 10)) {
            pagination.push(<a disable>{k}</a>);
        } else {
            if (k > parseInt(props.totalPages, 10))
                pagination.push(<a disabled>{k}</a>);
            else
                pagination.push(<a>{k}</a>);
        }
    }
    //pagination.append( " ... " );
    if (pageend < parseInt(props.totalPages,10)) {
        pagination.push(<a>[Last]</a>);
    } else {
        pagination.push(<a disabled>[Last]</a>);
    }
    //console.log(pagination)

    return (
        <div className="pagination">
        {pagination}
        </div>
    )
}
