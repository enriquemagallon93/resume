import { lazy } from 'react';
import resume from './resume.json';
import * as stylex from '@stylexjs/stylex';
import { colors } from './themes/palette.stylex';

const NodesParser = lazy(() => import('./NodesParser'));

const styles = stylex.create({
  body: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    ":first-child": {
      marginTop: 0
    },
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
  },
  qrs: {
    marginTop: 32,
    display: 'flex',
    gap: 32,
    flexWrap: 'wrap',
  }
});

const Body = () => {
  return (
    <div {...stylex.props(styles.body)}>
      <NodesParser tree={resume.body} />
      <div {...stylex.props(styles.qrs)}>
        <NodesParser tree={resume.qrLinks} />
      </div>
    </div>
  );
};

export default Body;
