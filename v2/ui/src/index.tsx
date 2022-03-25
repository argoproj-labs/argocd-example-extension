import * as React from 'react';
import {useEffect, useState} from 'react';
import ExampleChart from "./exampleChart";


type Metadata = { name: string };

export const appToolbarButton = {
    type: 'appToolbarButton',
    factory: ({setState}: { setState: (value: any) => void }) => ({
        iconClassName: 'fa fa-chart-line',
        title: <>Charts</>,
        action: () => setState({isShown: true})
    })
}

const HelloPanel = ({application}: { application: any }) => {
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        fetch("/api/extensions/example")
            .then(r => r.json())
            .then(r => setMessage(r.message))
            .catch(e => setMessage(e))
    }, [])

    return <div><h1>{application.metadata.name}</h1>
        <h2>API says "{message}"</h2>
        <ExampleChart width={1024} height={640}/>
    </div>
}
export const appPanel = {
    type: 'appPanel',
    factory: ({state, setState, application}: { state: any, setState: (value: any) => void, application: any }) => ({
        isShown: state.isShown,
        onClose: () => setState({isShown: false}),
        component: <HelloPanel application={application}/>
    })
}

type Resource = { metadata: Metadata };

const ResourcePanel = ({tree, resource}: { tree: any, resource: Resource }) =>
    <div>Hello {resource.metadata.name}!</div>;

export const resourcePanel = {
    type: 'resourcePanel',
    factory: ({resource, tree}: { resource: any, tree: any }) => ({
        component: <ResourcePanel resource={resource} tree={tree}/>
    })
}

const OpenGraphPanelItem = ({onClick}: { onClick: () => void }) =>
    <a onClick={onClick} style={{color: 'red', fontSize: "200%"}}>
        <i className='fa fa-chart-line'/>
        &nbsp;
        Charts
    </a>;

export const statusPanelItem = {
    type: 'appStatusPanelItem',
    factory: ({state, setState}: { state: any, setState: (value: any) => void }) => ({
        component: <OpenGraphPanelItem onClick={() => setState({isShown: true})}/>
    })
}
