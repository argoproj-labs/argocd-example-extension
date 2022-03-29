import * as React from 'react';
import {useEffect, useState} from 'react';
import ExampleChart from "./exampleChart";


const GraphPanel = ({application}: { application: any }) => {
    return <div><h1>{application.metadata.name}</h1>
        <ExampleChart width={1024} height={640}/>
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

    const [memoryRequest, setMemoryRequest] = useState<number>();

    useEffect(() => {
        fetch(`/api/extensions/example/${application.metadata.namespace}/memory_request`)
            .then(r => r.json())
            .then(r => setMemoryRequest(r.timeseries[0].data[0][1]))
            .catch(e => setMemoryRequest(e))
    }, [])

    const [memoryUsage, setMemoryUsage] = useState<number>();

    useEffect(() => {
        fetch(`/api/extensions/example/${application.metadata.namespace}/memory_usage`)
            .then(r => r.json())
            .then(r => setMemoryUsage(r.timeseries[0].data[0][1]))
            .catch(e => setMemoryUsage(e))
    }, [])

    const [cpuRequest, setCpuRequest] = useState<number>();

    useEffect(() => {
        fetch(`/api/extensions/example/${application.metadata.namespace}/cpu_request`)
            .then(r => r.json())
            .then(r => setCpuRequest(r.timeseries[0].data[0][1]))
            .catch(e => setCpuRequest(e))
    }, [])

    const [cpuUsage, setCpuUsage] = useState<number>();

    useEffect(() => {
        fetch(`/api/extensions/example/${application.metadata.namespace}/cpu_usage`)
            .then(r => r.json())
            .then(r => setCpuUsage(r.timeseries[0].data[0][1]))
            .catch(e => setCpuUsage(e))
    }, [])

    return <a onClick={onClick} style={{fontSize: "100%"}}>
        <p>cpu:
            {(cpuUsage / 1000).toFixed(1)} /
            {(cpuRequest / 1000).toFixed(1)}
            ({(cpuUsage / cpuRequest * 100).toFixed(0)}%)
        </p>
        <p>
            memory:
            {(memoryUsage / 1000 / 1000 / 1000).toFixed(1)} /
            {(memoryRequest / 1000 / 1000 / 1000).toFixed(1)} Gb
            ({(memoryUsage / memoryRequest * 100).toFixed(0)}%)
        </p>
    </a>;
}

export const statusPanelItem = {
    type: 'appStatusPanelItem',
    factory: ({state, setState, application}: { state: any, setState: (value: any) => void, application: any }) => ({
        component: <OpenGraphPanelItem onClick={() => setState({isShown: true})} application={application}/>
    })
}
