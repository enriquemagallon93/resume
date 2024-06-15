import resume from './resume.json';
import NodesParser from './NodesParser';

import * as stylex from '@stylexjs/stylex';

import { size } from './Pages/page.stylex';
import { colors } from './themes/palette.stylex';
import { headingStyles } from './parsers/headingStyles';

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
    color: colors.primaryColor,
    display: "flex",
    gap: "50px",
    alignItems: "center",
    ':not(#__unused__) .Parsed_Icon': {
      color: colors.secondaryHightlight
    }
  },
  text: {
    flexGrow: 1,
    alignSelf: 'start',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  photo: {
    flexGrow: 0,
    maxWidth: 100,
    maxHeight: 100,
    overflow: 'hidden',
    borderRadius: '50%',
    border: `4px solid ${colors.secondaryHightlight}`
  }
});

const Header = () => {
  return (
    <div {...stylex.props(style.header)}>
      <div {...stylex.props(style.text)}>
        <div>
          <h1 {...stylex.props(headingStyles[1])}>{resume.name} {resume.lastName}</h1>
          <h2 {...stylex.props(headingStyles[2])}>{resume.title}</h2>
        </div>
        <div>
          <p>
            {<NodesParser tree={resume.intro} />}
          </p>
        </div>
      </div>
      <div {...stylex.props(style.photo)}>
        <NodesParser tree={resume.photo} />
      </div>
    </div>
  );
};

export default Header;
