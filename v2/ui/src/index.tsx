import * as React from 'react';
import {useEffect, useState} from 'react';
import Example from "./example";


const GraphPanel = ({application}: { application: any }) => {
    return <div><h1>{application.metadata.name}</h1>
        <Example width={1024} height={640}/>
    </div>
}
export const appPanel = {
    type: 'appPanel',
    factory: ({state, setState, application}: { state: any, setState: (value: any) => void, application: any }) => ({
        isShown: state.isShown,
        onClose: () => setState({isShown: false}),
        component: <GraphPanel application={application}/>
    })
}

const OpenGraphPanelItem = ({application, onClick}: { application: any, onClick: () => void }) => {

    const [pingPong, setPingPond] = useState(false);

    const [memoryRequest, setMemoryRequest] = useState<number>();

    useEffect(() => {
        fetch(`/api/extensions/wavefront/${application.metadata.namespace}/memory_request`)
            .then(r => r.json())
            .then(r => setMemoryRequest(r.timeseries[0].data[0][1]))
    }, [pingPong])

    const [memoryUsage, setMemoryUsage] = useState<number>();

    useEffect(() => {
        fetch(`/api/extensions/wavefront/${application.metadata.namespace}/memory_usage`)
            .then(r => r.json())
            .then(r => setMemoryUsage(r.timeseries[0].data[0][1]))
    }, [pingPong])

    const [cpuRequest, setCpuRequest] = useState<number>();

    useEffect(() => {
        fetch(`/api/extensions/wavefront/${application.metadata.namespace}/cpu_request`)
            .then(r => r.json())
            .then(r => setCpuRequest(r.timeseries[0].data[0][1]))
    }, [pingPong])

    const [cpuUsage, setCpuUsage] = useState<number>();

    useEffect(() => {
        fetch(`/api/extensions/wavefront/${application.metadata.namespace}/cpu_usage`)
            .then(r => r.json())
            .then(r => setCpuUsage(r.timeseries[0].data[0][1]))
    }, [pingPong])

    useEffect(() => {
        setInterval(() => {
            setPingPond(!pingPong)
        }, 10000)
    }, [])

    return <div>
        <label>METRICS</label>
        <table style={{fontSize: "150%" , lineHeight: "120%"}}>
            <tbody>
            <tr>
                <td>cpu</td>
                <td>{cpuUsage && cpuUsage.toFixed(1)} / {cpuRequest && cpuRequest.toFixed(1)}</td>
                <td>{(cpuUsage / cpuRequest * 100).toFixed(0)}%</td>
            </tr>
            <tr>
                <td>mem</td>
                <td>{(memoryUsage / 1000 / 1000 / 1000).toFixed(0)} / {(memoryRequest / 1000 / 1000 / 1000).toFixed(0)} Gb</td>
                <td>{(memoryUsage / memoryRequest * 100).toFixed(0)}%</td>
            </tr>
            </tbody>
        </table>
        <button onClick={onClick}
                className='argo-button argo-button--base-o argo-button--sm application-status-panel__more-button'>more
        </button>
    </div>;
}

export const statusPanelItem = {
    type: 'appStatusPanelItem',
    factory: ({state, setState, application}: { state: any, setState: (value: any) => void, application: any }) => ({
        component: <OpenGraphPanelItem onClick={() => setState({isShown: true})} application={application}/>
    })
}
