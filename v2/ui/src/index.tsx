import * as React from 'react';


const iconClassName = 'fa fa-cat';

export const appToolbarButton = {
    type: 'appToolbarButton',
    factory: ({setState}: { setState: (value: any) => void }) => ({
        iconClassName: iconClassName,
        title: <>Example</>,
        action: () => setState({isShown: true})
    })
}

const ExamplePanel = ({application}: { application: any }) => {
    return <div>
        <h4><i className={iconClassName}/> Example Sliding Panel</h4>
        <div className='white-box'>
            <p>This is an example sliding panel.</p>
            <div className='row'>
                <div className='columns small-3'>Application</div>
                <div className='columns small-6'>{application.metadata.name}</div>
            </div>
        </div>
    </div>
}

export const appPanel = {
    type: 'appPanel',
    factory: ({state, setState, application}: { state: any, setState: (value: any) => void, application: any }) => ({
        isShown: state.isShown,
        onClose: () => setState({isShown: false}),
        component: <ExamplePanel application={application}/>
    })
}

const ExampleResourcePanel = ({
                                  state,
                                  setState,
                                  application,
                                  node,
                                  resource,
                                  tree,
                              }: { state: any, setState: (value: any) => void, application: any, node: any, resource?: any, tree: any, }) =>
    <div className='white-box'>
        <p>This is an example resource panel.</p>
        <div className='row'>
            <div className='columns small-3'>Application</div>
            <div className='columns small-6'>{application.metadata.name}</div>
        </div>
        <div className='row'>
            <div className='columns small-3'>Node</div>
            <div className='columns small-6'>{node.group}/{node.kind}/{node.name}</div>
        </div>
        <div className='row'>
            <div className='columns small-3'>Resource</div>
            <div className='columns small-6'>{resource && resource.metadata.name}</div>
        </div>
        <div className='row'>
            <div className='columns small-3'>Tree</div>
            <div className='columns small-6'>{tree.nodes.length} nodes</div>
        </div>
    </div>;

export const resourcePanel = {
    type: 'resourcePanel',
    iconClassName: iconClassName,
    title: 'Example',
    factory: ({
                  state,
                  setState,
                  application,
                  resource,
                  node,
                  tree
              }: { state: any, setState: (value: any) => void, application: any, resource?: any, node: any, tree: any }) => ({
        component: <ExampleResourcePanel state={state} setState={setState} application={application} node={node}
                                         resource={resource}
                                         tree={tree}/>
    })
}

const MoreButton = ({onClick}: { onClick: () => void }) => <button
    className='argo-button argo-button--base-o argo-button--sm' onClick={onClick}>MORE</button>

const ExampleStatusPanelItem = ({onClick}: { onClick: () => void }) =>
    <div>
        <label>EXAMPLE</label>
        <p>This is an example.</p>
        <MoreButton onClick={onClick}/>
    </div>;

export const statusPanelItem = {
    type: 'appStatusPanelItem',
    factory: ({state, setState}: { state: any, setState: (value: any) => void }) => ({
        component: <ExampleStatusPanelItem onClick={() => setState({isShown: true})}/>
    })
}
