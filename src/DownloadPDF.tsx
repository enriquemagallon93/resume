
import { MdDownload } from 'react-icons/md';

import * as stylex from '@stylexjs/stylex';

import { useResumePdf } from './resume/useResume';

const styles = stylex.create({
  downloadButton: {
    position: 'fixed',
    top: 16,
    right: 16,
    height: 36,
    zIndex: 1000,
    padding: '8px 16px',
    backgroundColor: '#313131',
    color: 'white',
    borderRadius: 4,
    textDecoration: 'none',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    '@media print': {
      display: 'none'
    },
    ':hover': {
      backgroundColor: '#444444',
    }
  }
});

const DownloadPDF = () => {
  const pdf = useResumePdf();
  return (
    <a href={`./${pdf}`} download {...stylex.props(styles.downloadButton)}>
      Download PDF <MdDownload />
    </a>
  );
};

export default DownloadPDF;
