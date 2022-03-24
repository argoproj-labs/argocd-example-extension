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
    type: 'apptoolbar',
    factory: () => ({
        iconClassName: 'fa fa-info-circle',
        title: <HelloButton/>,
        action: () => {
            alert("hello!")
        }
    })
}