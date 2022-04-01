import * as React from "react";

export const AppPanel = ({application}: { application: any }) => <div>
    <h4><i className='fa fa-cat'/> Example Sliding Panel</h4>
    <div className='white-box'>
        <p>This is an example application panel.</p>
        <div className='row'>
            <div className='columns small-3'>Application</div>
            <div className='columns small-6'>{application.metadata.name}</div>
        </div>
    </div>
</div>;

