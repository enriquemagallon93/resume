
import Header from './Header';
import Info from './Info';
import Body from './Body';
import Pages from './Pages/Pages';
import Settings from './Settings/Settings';

const Resume = () => {
  return (
    <Settings>
      <Pages>
        <Header />
        <Info />
        <Body />
      </Pages>
    </Settings>
  );
};

export default Resume;
