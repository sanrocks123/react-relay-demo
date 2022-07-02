
import { useEffect, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import uuid from 'react-uuid';

const serverBaseURL = "http://localhost:1000";

export function AgGridBlockingComponent() {

    const [rowData, setRowData] = useState([]);

    const columnDefs = [
        //{ headerName: 'rowID', valueGetter: 'node.id' },
        { field: 'timeStamp', filter: true },
        { field: 'eventId', filter: true },
        { field: 'securityId', filter: true },
        { field: 'securityName', filter: true },
        { field: 'currentPrice' }
    ];

    //const getRowId = useCallback((params) => params.data.id, []);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${serverBaseURL}/v1/product-quote/list`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                }
            });
            const data = await response.text();
            const eventData = JSON.parse(data);

            const rowArr = [];
            eventData.map(json => {
                const rowEventData = {
                    id: uuid(),
                    timeStamp: json.body.timeStamp,
                    eventId: json.eventId,
                    securityId: json.securityId,
                    securityName: json.body.securityName,
                    currentPrice: json.currentPrice
                };
                rowArr.push(rowEventData);
            });
            setRowData(rowArr);
        })();
    }, []);

    return (
        <div className="ag-theme-alpine" style={{ width: 1050, height: 500 }}>
            <span className="badge bg-info"> {rowData.length}</span>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection='multiple'
            //getRowId={getRowId}
            />

        </div>
    );
}
