import { Helmet } from 'react-helmet-async';
import * as stylex from '@stylexjs/stylex';
import { MdHeadphones } from 'react-icons/md';

import NodesParser from './NodesParser';
import { useResume } from './resume/useResume';
import { NAME_PRONUNCIATION_URL } from './pronunciation';

import './ats.css';

const styles = stylex.create({
  root: {
    fontFamily: "'Arial', 'Helvetica', sans-serif",
    fontSize: 9,
    lineHeight: 1.28,
    color: '#111111',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    ':not(#___unused___) h2': {
      color: '#111111',
      fontWeight: 700,
      fontSize: 11,
      lineHeight: 1.35,
      marginTop: 3,
      borderBottom: '1px solid #999999',
    },
    ':not(#___unused___) h3': {
      fontSize: 9.5,
      fontWeight: 700,
    },
    ':not(#___unused___) a': {
      color: '#0b3d91',
      textDecoration: 'none',
      wordBreak: 'break-word',
    },
    ':not(#___unused___) a:hover': {
      textDecoration: 'underline',
    },
    ':not(#___unused___) i': {
      color: '#444444',
    },
    ':not(#___unused___) ul': {
      paddingLeft: 16,
      margin: 0,
    },
    // Decorative SVG icons add nothing for ATS parsers; the text next to
    // each icon already carries the information.
    ':not(#___unused___) .Parsed_Icon': {
      display: 'none',
    },
  },
  headerRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
  },
  photo: {
    flexShrink: 0,
    width: 60,
    overflow: 'hidden',
  },
  name: {
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 1.2,
    margin: 0,
  },
  pronouns: {
    fontSize: 10,
    fontWeight: 400,
    marginLeft: 5,
  },
  pronunciation: {
    color: '#444444',
    fontSize: 11,
    marginLeft: 5,
    verticalAlign: 'middle',
  },
  jobTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    marginTop: 1,
    marginBottom: 3,
  },
});

const AtsHeader = () => {
  const resume = useResume();
  const photo = stylex.props(styles.photo);

  return (
    <div {...stylex.props(styles.headerRow)}>
      <div className={`ats-photo ${photo.className}`} style={photo.style}>
        <NodesParser tree={resume.photo} />
      </div>
      <div>
        <h1 {...stylex.props(styles.name)}>
          {resume.name} {resume.lastName}
          {resume.pronouns && <span {...stylex.props(styles.pronouns)}>({resume.pronouns})</span>}
          <a
            href={NAME_PRONUNCIATION_URL}
            target="_blank"
            rel="noreferrer"
            title="How to pronounce Enrique"
            {...stylex.props(styles.pronunciation)}
          >
            <MdHeadphones />
          </a>
        </h1>
        <div {...stylex.props(styles.jobTitle)}>{resume.title}</div>
        <div className="ats-info">
          <NodesParser tree={resume.info} />
        </div>
      </div>
    </div>
  );
};

const AtsLinks = () => {
  const resume = useResume();

  return (
    <div>
      {resume.qrLinks.map(({ title, url }) => (
        <div key={url}>
          {title}
          {': '}
          <a href={url} target="_blank" rel="noreferrer">{url}</a>
        </div>
      ))}
    </div>
  );
};

const AtsResume = () => {
  const resume = useResume();
  const { className, style } = stylex.props(styles.root);

  return (
    <div className={`ats-resume ${className}`} style={style}>
      <Helmet>
        <title>{`${resume.name} ${resume.lastName} · ${resume.title}`}</title>
      </Helmet>
      <AtsHeader />
      <div>
        <NodesParser tree={resume.intro} />
      </div>
      <h2>Impact Highlights</h2>
      <div>
        <NodesParser tree={resume.selectedImpact} />
      </div>
      <div className="ats-body">
        <NodesParser tree={resume.body} />
      </div>
      <h2>Links</h2>
      <AtsLinks />
    </div>
  );
};

export default AtsResume;
