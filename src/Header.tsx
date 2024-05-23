import resume from './resume.json'
import NodesParser from './NodesParser'

import * as stylex from '@stylexjs/stylex';

import { size } from './Pages/page.stylex';
import { colors } from './themes/palette.stylex';
import {styles as headingStyles} from './parsers/HeadingParser';

const style = stylex.create({
    header: {
        marginLeft: `calc( 0px - ${size.pageHorizontalPadding})`,
        marginRight: `calc( 0px - ${size.pageHorizontalPadding})`,
        marginTop: `calc( 0px - ${size.pageVerticalPadding})`,
        paddingLeft: size.pageHorizontalPadding,
        paddingRight: size.pageHorizontalPadding,
        paddingTop: size.pageVerticalPadding,
        paddingBottom: 20,
        backgroundColor: colors.primaryBackground,
        color: "white",
        display: "flex",
        gap: "50px",
        alignItems: "center"
    }
});

const Header = () => {
    return (
        <div className='header' {...stylex.props(style.header)}>
            <div className='header-text'>
                <h1>{resume.name} {resume.lastName}</h1>
                <h2 {...stylex.props(headingStyles[2])}>{resume.title}</h2>
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