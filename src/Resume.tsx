
import Header from './Header';
import Info from './Info';
import Body from './Body';
import Pages from './Pages/Pages';
import Settings from './Settings/Settings';
import Impact from './Impact';

const Resume = () => {
  return (
    <Settings>
      <Pages>
        <Header />
        <Impact />
        <Info />
        <Body />
      </Pages>
    </Settings>
  );
};

export default Resume;
