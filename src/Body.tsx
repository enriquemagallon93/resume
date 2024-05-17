import NodesParser from './NodesParser'
import resume from './resume.json'

const Body = () => {
    return (
        <div className='resume-body'>
            <NodesParser tree={resume.body} />
        </div>
    )
}

export default Body