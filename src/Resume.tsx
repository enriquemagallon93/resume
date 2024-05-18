import './Resume.scss'

import Header from './Header';
import Info from './Info';
import Body from './Body';
import Pages from './Pages/Pages';

const Resume = () => {
  return (
    <>
      <Pages>
        <Header />
        <Info />
        <Body />
      </Pages>
    </>
  )
}

export default Resume
