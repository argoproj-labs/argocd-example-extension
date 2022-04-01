import * as React from "react";

export const AppToolbarButton = ({openPanel}: { openPanel: () => void }) => ({
    iconClassName: 'fa fa-cat',
    title: <>Example</>,
    action: () => openPanel()
})
