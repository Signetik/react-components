import React, { useEffect, useState } from "react"

export function Pagination(props) {
    var count = 9;
    var pagestart = parseInt(props.currentPage, 10) - (count - 1) / 2;
    var pageend = parseInt(props.currentPage, 10) + (count - 1) / 2;

    if (pagestart < 1) {
        pageend = pageend + 1 - pagestart;
        pagestart = 1;
    }

    if (pageend > props.totalPages) {
        pageend = props.totalPages;
        pagestart = pageend - count;
        if (pagestart < 1)
            pagestart = 1;
    }

    console.log("currentPage: " + props.currentPage);
    console.log("pagestart: " + pagestart);
    console.log("pageend: " + pageend);

    var pagination = []
    pagination.push(<div data-page={props.currentPage} data-total-pages={props.totalPages} />);

    if (pagestart > 1) {
        pagination.push(<a onClick={() => props.setPage(1)}>[First]</a>);
    } else {
        pagination.push(<a disabled>[First]</a>);
    }

    for (var k = pagestart; k < pageend + 1; k++) {
        let pageNumber = k;
        if (pageNumber === parseInt(props.currentPage, 10)) {
            pagination.push(<a disable>[{pageNumber}]</a>);
        } else {
            if (k > parseInt(props.totalPages, 10))
                pagination.push(<a disabled>{pageNumber}</a>);
            else
                pagination.push(<a key={pageNumber} onClick={() => props.setPage(pageNumber)}>{pageNumber}</a>);
        }
    }

    //pagination.append( " ... " );
    if (pageend < parseInt(props.totalPages,10)) {
        pagination.push(<a onClick={() => props.setPage(props.totalPages)}>[Last]</a>);
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
