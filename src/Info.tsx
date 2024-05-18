import NodesParser from './NodesParser';

import resume from './resume.json'

import * as stylex from '@stylexjs/stylex';

import { size } from './Pages/page.stylex';

const styles = stylex.create({
    mainInfo: {
        marginLeft: `calc( 0px - ${size.pageHorizontalPadding})`,
        marginRight: `calc( 0px - ${size.pageHorizontalPadding})`,
        padding: '8px',
        paddingLeft: size.pageHorizontalPadding,
        paddingRight: size.pageHorizontalPadding,
        backgroundColor: "#222a33",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto",
        gap: "8px",
        color: "white"
    }
});

const Info = () => {
    const {className, style} = stylex.props(styles.mainInfo)
    return (
        <div className={`main-info ${className}`} style={style}>
            <NodesParser tree={resume.info} />
        </div>
    )
}

export default Info