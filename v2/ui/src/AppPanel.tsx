import * as React from "react";

const ExamplePanel = ({application}: { application: any }) => {
    return <div>
        <h4><i className='fa fa-cat'/> Example Sliding Panel</h4>
        <div className='white-box'>
            <p>This is an example sliding panel.</p>
            <div className='row'>
                <div className='columns small-3'>Application</div>
                <div className='columns small-6'>{application.metadata.name}</div>
            </div>
        </div>
    </div>
}

export const AppPanel = {
    type: 'appPanel',
    factory: ({state, setState, application}: { state: any, setState: (value: any) => void, application: any }) => ({
        isShown: state.isShown,
        onClose: () => setState({isShown: false}),
        component: <ExamplePanel application={application}/>
    })
}