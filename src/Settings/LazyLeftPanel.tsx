import { ReactNode, useEffect, useState } from 'react';
import LeftPanel from './LeftPanel';



const LazyLeftPanel = ({ children }: { children: ReactNode }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);
  return (
    isFirstRender ? children : <LeftPanel>{children}</LeftPanel>
  );
};

export default LazyLeftPanel;
