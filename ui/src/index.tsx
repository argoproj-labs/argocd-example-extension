import * as React from 'react';
import {useEffect, useState} from 'react';

import Example from "./example";

const HelloButton = () => {
    return <>Open hello chart</>
}


const HelloPanel = () => {
    const [text, setText] = useState<string>();

    useEffect(() => {
        fetch("/api/extensions/hello")
            .then(() => setText('Success'))
            .catch(e => setText(e))
    }, [])

    return <div><h1>{text}</h1>
        <Example width={1024} height={640}/>
    </div>
}


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
    factory: ({state, setState}: { state: any, setState: (value: any) => void }) => ({
        shown: state.shown,
        onClose: () => {
            setState({shown: false})
        },
        component: <HelloPanel/>
    })
}