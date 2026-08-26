import NodesParser from './NodesParser';
import { Helmet } from 'react-helmet-async';
import { MdHeadphones } from 'react-icons/md';

import { useResume } from './resume/useResume';
import { NAME_PRONUNCIATION_URL } from './pronunciation';

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
      color: colors.secondaryHightlight,
      verticalAlign: 'middle',
    },
    flexDirection: 'column',
    '@media (min-width: 600px)': {
      flexDirection: 'row',
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
  },
  pronunciation: {
    color: colors.secondaryHightlight,
    fontSize: 20,
    marginLeft: 10,
    verticalAlign: 'middle',
  },
  pronouns: {
    color: colors.secondaryHightlight,
    fontSize: 14,
    marginLeft: 8,
  }
});

const Header = () => {
  const resume = useResume();

  return (
    <>
      <Helmet>
        <title>{`${resume.name} ${resume.lastName} · ${resume.title}`}</title>
      </Helmet>
      <div {...stylex.props(style.header)}>
        <div {...stylex.props(style.text)}>
          <div>
            <h1 {...stylex.props(headingStyles[1])}>
              {resume.name} {resume.lastName}
              {resume.pronouns && <span {...stylex.props(style.pronouns)}>({resume.pronouns})</span>}
              <a
                href={NAME_PRONUNCIATION_URL}
                target="_blank"
                rel="noreferrer"
                title="How to pronounce Enrique"
                {...stylex.props(style.pronunciation)}
              >
                <MdHeadphones />
              </a>
            </h1>
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
    </>
  );
};

export default Header;
