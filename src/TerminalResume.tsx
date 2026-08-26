import { Helmet } from 'react-helmet-async';
import * as stylex from '@stylexjs/stylex';
import { MdHeadphones } from 'react-icons/md';

import NodesParser from './NodesParser';
import { useResume } from './resume/useResume';
import { NAME_PRONUNCIATION_URL } from './pronunciation';
import { size } from './Pages/page.stylex';

import './terminal.css';

const styles = stylex.create({
  root: {
    fontFamily: "'Ubuntu Mono', 'Consolas', 'Courier New', monospace",
    fontSize: 9.5,
    lineHeight: 1.28,
    color: '#1a1a1a',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    ':not(#___unused___) h2': {
      color: '#0a7d33',
      fontWeight: 700,
      fontSize: 11,
      lineHeight: 1.3,
    },
    ':not(#___unused___) h3': {
      fontSize: 9.5,
      fontWeight: 700,
    },
    ':not(#___unused___) a': {
      color: '#0b61c9',
      textDecoration: 'none',
      wordBreak: 'break-word',
    },
    ':not(#___unused___) a:hover': {
      textDecoration: 'underline',
    },
    ':not(#___unused___) i': {
      color: '#6e6e6e',
    },
    ':not(#___unused___) ul': {
      paddingLeft: 14,
      margin: 0,
    },
    ':not(#___unused___) .Parsed_Icon': {
      color: '#4a4a4a',
      verticalAlign: 'middle',
    },
  },
  cvBody: {
    ':not(#___unused___) h2': {
      marginLeft: -16,
      marginTop: 4,
    },
  },
  titleBar: {
    marginLeft: `calc( 0px - ${size.pageHorizontalPadding})`,
    marginRight: `calc( 0px - ${size.pageHorizontalPadding})`,
    marginTop: `calc( 0px - ${size.pageVerticalPadding})`,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: '#2d2d2d',
    color: '#e6e6e6',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 11,
  },
  dots: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: '50%',
    display: 'inline-block',
  },
  dotClose: { backgroundColor: '#ff5f56' },
  dotMinimize: { backgroundColor: '#ffbd2e' },
  dotMaximize: { backgroundColor: '#27c93f' },
  titleText: {
    flexGrow: 1,
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  pronunciation: {
    color: '#e6e6e6',
    fontSize: 12,
    marginLeft: 6,
    verticalAlign: 'middle',
  },
  topRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
  },
  photo: {
    flexShrink: 0,
    width: 64,
    borderRadius: 4,
    overflow: 'hidden',
    border: '1px solid #d0d0d0',
  },
});

const TerminalWindowTitle = () => {
  const resume = useResume();

  return (
    <div {...stylex.props(styles.titleBar)}>
      <span {...stylex.props(styles.dots)}>
        <span {...stylex.props(styles.dot, styles.dotClose)} />
        <span {...stylex.props(styles.dot, styles.dotMinimize)} />
        <span {...stylex.props(styles.dot, styles.dotMaximize)} />
      </span>
      <span {...stylex.props(styles.titleText)}>
        {resume.name} {resume.lastName} · {resume.title}
        <a
          href={NAME_PRONUNCIATION_URL}
          target="_blank"
          rel="noreferrer"
          title="How to pronounce Enrique"
          {...stylex.props(styles.pronunciation)}
        >
          <MdHeadphones />
        </a>
      </span>
    </div>
  );
};

const TerminalLinks = () => {
  const resume = useResume();

  return (
    <div className="terminal-indent terminal-links">
      {resume.qrLinks.map(({ title, url }) => (
        <div key={url}>
          <a href={url} target="_blank" rel="noreferrer">{title}</a>
          {': '}
          <span className="terminal-url">{url}</span>
        </div>
      ))}
    </div>
  );
};

const TerminalResume = () => {
  const resume = useResume();
  const { className, style } = stylex.props(styles.root);
  const photo = stylex.props(styles.photo);
  const cvBody = stylex.props(styles.cvBody);

  return (
    <div className={`terminal-resume ${className}`} style={style}>
      <Helmet>
        <title>{`${resume.name} ${resume.lastName} · ${resume.title}`}</title>
      </Helmet>
      <TerminalWindowTitle />
      <div {...stylex.props(styles.topRow)}>
        <div className={`terminal-photo ${photo.className}`} style={photo.style}>
          <NodesParser tree={resume.photo} />
        </div>
        <div className="terminal-info">
          <NodesParser tree={resume.info} />
        </div>
      </div>
      <div className="terminal-intro">
        <NodesParser tree={resume.intro} />
      </div>
      <h2>Impact Highlights</h2>
      <div className="terminal-indent">
        <NodesParser tree={resume.selectedImpact} />
      </div>
      <div className={`terminal-cv-body ${cvBody.className}`} style={cvBody.style}>
        <NodesParser tree={resume.body} />
      </div>
      <TerminalLinks />
    </div>
  );
};

export default TerminalResume;
