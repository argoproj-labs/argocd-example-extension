import * as React from 'react';
import {useEffect, useState} from 'react';

import ExampleChart from "./exampleChart";

const HelloButton = () => {
    return <>Open hello chart</>
}


const HelloPanel = ({name}: { name: string }) => {
    const [status, setStatus] = useState<string>();

    useEffect(() => {
        fetch("/api/extensions/hello")
            .then(() => setStatus('Success'))
            .catch(e => setStatus(e))
    }, [])

    return <div><h1>{name} {status}</h1>
        <ExampleChart width={1024} height={640}/>
    </div>
}

type Metadata = { name: string };
type Application = { metadata: Metadata };
type Resource = { metadata: Metadata };

export const helloButton = {
    type: 'appToolbar',
    factory: ({state, setState}: { state: any, setState: (value: any) => void }) => ({
        iconClassName: 'fa fa-chart-line',
        title: <HelloButton/>,
        action: () => setState({shown: true})
    })
}

export const helloPanel = {
    type: 'appPanel',
    factory: ({
                  state,
                  setState,
                  application
              }: { state: any, setState: (value: any) => void, application: Application }) => ({
        shown: state.shown,
        onClose: () => {
            setState({shown: false})
        },
        component: <HelloPanel name={application.metadata.name}/>
    })
}

export const resourcePanel = {
    type: 'resourcePanel',
    apiVersion: 'v1',
    kind: 'Pod',
    factory: ({
                  state,
                  setState,
                  tree,
                  resource
              }: { state: any, setState: (value: any) => void, tree: any, resource: Resource }) => ({
        component: <div>Hello {resource.metadata.name}!</div>
    })
}
