


import NodesParser from './NodesParser';

import resume from './resume.json'

const Info = () => {
    return (
        <div className='main-info'>
            <NodesParser tree={resume.info} />
        </div>
    )
}

export default Info