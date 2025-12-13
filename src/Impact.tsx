import NodesParser from './NodesParser';

import resume from './resume.json';

import * as stylex from '@stylexjs/stylex';

import { size } from './Pages/page.stylex';
import { colors } from './themes/palette.stylex';
import { headingStyles } from './parsers/headingStyles';

const styles = stylex.create({
  impact: {
    marginLeft: `calc( 0px - ${size.pageHorizontalPadding})`,
    marginRight: `calc( 0px - ${size.pageHorizontalPadding})`,
    padding: '8px 16px',
    paddingLeft: size.pageHorizontalPadding,
    paddingRight: size.pageHorizontalPadding,
    backgroundColor: colors.secondaryBackground,
    color: colors.secondaryColor,
    ":not(#___unused___) b": {
      color: colors.bold
    },
    ":not(#___unused___) a": {
      transition: "color 150ms linear",
    },
    ":not(#___unused___) a:hover": {
      color: colors.bold
    },
    ":not(#___unused___) ul": {
      paddingLeft: 20,
    },
  }
});

const Impact = () => {
  const {className, style} = stylex.props(styles.impact);
  return (
    <div className={`main-info ${className}`} style={style}>
      <h4 {...stylex.props(headingStyles[4])}> Impact Highligts </h4>
      <NodesParser tree={resume.selectedImpact} />
    </div>
  );
};

export default Impact;
