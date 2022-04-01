import * as React from "react";

const MoreButton = ({onClick}: { onClick: () => void }) => <button
    className='argo-button argo-button--base-o argo-button--sm' onClick={onClick}>MORE</button>

const ExampleStatusPanelItem = ({onClick}: { onClick: () => void }) =>
    <div>
        <label>EXAMPLE</label>
        <p>This is an example.</p>
        <MoreButton onClick={onClick}/>
    </div>;

export const AppStatusPanelItem = {
    type: 'appStatusPanelItem',
    factory: ({state, setState}: { state: any, setState: (value: any) => void }) => ({
        component: <ExampleStatusPanelItem onClick={() => setState({isShown: true})}/>
    })
}
