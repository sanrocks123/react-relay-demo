
import { useEffect, useState, useCallback } from 'react';
import { fetchEventSource } from "@microsoft/fetch-event-source";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import uuid from 'react-uuid';

const serverBaseURL = "http://localhost:1000";

export function TextStreamingDataComponent() {

    const [rowData, setRowData] = useState([]);
    const [streaming, setStreaming] = useState({ isStreaming: false });

    const columnDefs = [
        //{ headerName: 'rowID', valueGetter: 'node.id' },
        { field: 'timeStamp', filter: true },
        { field: 'eventId', filter: true },
        { field: 'securityId', filter: true },
        { field: 'securityName', filter: true },
        { field: 'currentPrice' }
    ];

    const getRowId = useCallback((params) => params.data.id, []);

    useEffect(() => {
        (async () => {
            await fetchEventSource(`${serverBaseURL}/v1/product-quote/stream`, {
                method: "GET",
                headers: {
                    Accept: "text/event-stream",
                },
                onopen(res) {
                    if (res.ok && res.status === 200) {
                        console.log("Connection made ", res);
                    } else if (
                        res.status >= 400 &&
                        res.status < 500 &&
                        res.status !== 429
                    ) {
                        console.log("Client side error ", res);
                    }
                },
                onmessage(event) {

                    const eventData = JSON.parse(event.data);
                    //console.log(eventData)

                    const rowEventData = {
                        id: uuid(),
                        timeStamp: eventData.body.timeStamp,
                        eventId: eventData.eventId,
                        securityId: eventData.securityId,
                        securityName: eventData.body.securityName,
                        currentPrice: eventData.currentPrice
                    };
                    setStreaming({ isStreaming: true });
                    setRowData(rowData => [...rowData, rowEventData]);
                },
                onclose() {
                    console.log("Connection closed by the server");
                },
                onerror(err) {
                    console.log("There was an error from server", err);
                },
            });
        })();
    }, []);

    return (
        <div>
            {streaming.isStreaming ? "streaming... " : "fetching..."}
            <span className="badge bg-info"> {rowData.length}</span>
            <table className='table table-dark table-hover'>
                <thead>
                    <tr>
                        <th>SecurityId</th>
                        <th>SecurityName</th>
                        <th>CurrentPrice</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rowData
                            .map((d, key) => (
                                <tr key={key}>
                                    <td>{d.securityId}</td>
                                    <td>{d.securityName}</td>
                                    <td>{d.currentPrice}</td>
                                </tr>
                            )
                            )
                    }
                </tbody>
            </table>
        </div>
    );
}
