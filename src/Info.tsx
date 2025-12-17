import { lazy } from 'react';

import resume from './resume.json';

import * as stylex from '@stylexjs/stylex';

import { size } from './Pages/page.stylex';
import { colors } from './themes/palette.stylex';

const NodesParser = lazy(() => import('./NodesParser'));

const styles = stylex.create({
  mainInfo: {
    marginLeft: `calc( 0px - ${size.pageHorizontalPadding})`,
    marginRight: `calc( 0px - ${size.pageHorizontalPadding})`,
    padding: '8px',
    paddingLeft: size.pageHorizontalPadding,
    paddingRight: size.pageHorizontalPadding,
    backgroundColor: colors.secondaryBackground,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto",
    gap: "8px",
    color: colors.secondaryColor,
    ":not(#___unused___) > *": {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 6
    },
    ":not(#___unused___) b": {
      color: colors.bold
    },
    ":not(#___unused___) a": {
      transition: "color 150ms linear",
    },
    ":not(#___unused___) a:hover": {
      color: colors.bold
    }
  }
});

const Info = () => {
  const { className, style } = stylex.props(styles.mainInfo);
  return (
    <div className={`main-info ${className}`} style={style}>
      <NodesParser tree={resume.info} />
    </div>
  );
};

export default Info;
