import * as React from 'react';
import {useEffect, useState} from 'react';
import ExampleChart from "./exampleChart";


type Metadata = { name: string };

export const helloButton = {
    type: 'appToolbar',
    factory: ({setState}: { setState: (value: any) => void }) => ({
        iconClassName: 'fa fa-chart-line',
        title: <>Open chart</>,
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

    return <div><h1>{application.metadata.name} </h1>
        <h2>API says "{message}"</h2>
        <ExampleChart width={1024} height={640}/>
    </div>
}
export const helloPanel = {
    type: 'appPanel',
    factory: ({state, setState}: { state: any, setState: (value: any) => void }) => ({
        isShown: state.isShown,
        onClose:  () => setState({isShown: false}),
        component: HelloPanel
    })
}

type Resource = { metadata: Metadata };

const ResourcePanel = ({resource}: { tree: any, resource: Resource }) =>
    <div>Hello {resource.metadata.name}!</div>;

export const resourcePanel = {
    type: 'resourcePanel',
    factory: () => ({component: ResourcePanel})
}

