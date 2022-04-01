import * as React from "react";

const MoreButton = ({onClick}: { onClick: () => void }) => <button
    className='argo-button argo-button--base-o argo-button--sm' onClick={onClick}>MORE</button>

export const AppStatusPanelItem = ({openPanel, application}: { openPanel: () => void, application: any }) =>
    <div>
        <label>EXAMPLE</label>
        <p>This is an example {application.metadata.name}.</p>
        <MoreButton onClick={() => openPanel()}/>
    </div>;
