import * as React from 'react';
import {useEffect, useState} from 'react';


const HelloButton = () => {
    const [text, setText] = useState<string>();

    useEffect(() => {
        fetch("/api/extensions/hello")
            .then(() => setText('Success'))
            .catch(e => setText(e))
    }, [])

    return <>{text}</>
}

export const helloButton = {
    type: 'appToolbar',
    factory: ({state, setState}: { state: any, setState: (value: any) => void }) => ({
        iconClassName: 'fa fa-info-circle',
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
        component: <div>Hello!</div>
    })
}