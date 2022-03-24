import * as React from 'react';

export const helloButton = {
    type: 'apptoolbar',
    factory: () => ({
        iconClassName: 'fa fa-info-circle',
        title: <>Hello</>,
        action: () => {
            alert("hello!")
        }
    })
}