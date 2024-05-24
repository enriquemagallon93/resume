import NodesParser from './NodesParser'
import resume from './resume.json'
import * as stylex from '@stylexjs/stylex';
import { colors } from './themes/palette.stylex';

const styles = stylex.create({
    body: {
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        ":not(#___unused___) h2": {
            fontSize: 22,
            color: colors.pageHightlight,
            fontWeight: 'bold',
            lineHeight: 1
        },
        ":not(#___unused___) h3": {
            fontSize: 14,
            fontWeight: 'bold'
        },
        ":not(#___unused___) i": {
            fontStyle: 'italic',
            color: colors.pageHightlight
        },
        ":not(#___unused___) ul": {
            paddingLeft: 20,
        },
        ":not(#___unused___) b": {
            fontWeight: 800,
        },
        ":not(#___unused___) .url_link": {
            color: colors.hyper,
        },
        ":not(#___unused___) .url_link:hover": {
            textDecoration: 'underline'
        }
    }
})

const Body = () => {
    return (
        <div {...stylex.props(styles.body)}>
            <NodesParser tree={resume.body} />
        </div>
    )
}

export default Body