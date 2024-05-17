import resume from './resume.json'
import NodesParser from './NodesParser'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-text'>
                <h1>{resume.name} {resume.lastName}</h1>
                <h2>{resume.title}</h2>
                <p className='intro'>
                    {<NodesParser tree={resume.intro} />}
                </p>
            </div>
            <div className='photo'>
                <NodesParser tree={resume.photo} />
            </div>
        </div>
    )
}

export default Header