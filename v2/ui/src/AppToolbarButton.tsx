import * as React from "react";

export const AppToolbarButton = {
    type: 'appToolbarButton',
    factory: ({setState}: { setState: (value: any) => void }) => ({
        iconClassName: 'fa fa-cat',
        title: <>Example</>,
        action: () => setState({isShown: true})
    })
}
