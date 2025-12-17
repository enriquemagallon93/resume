import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Page from './Page';
import Theme from '../themes/Theme';

import * as stylex from '@stylexjs/stylex';
import useSettings from '../Settings/useSettings';
import PagesCut from './PagesCut';

const styles = stylex.create({
  noJs: {
    height: 'auto',
  }
});

const Pages = ({ children }: { children: ReactNode }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  const {
    width,
    height,
    horizontalMargin,
    verticalMargin,
  } = useSettings();

  const originalPage = useRef<HTMLDivElement | null>(null);

  const fullPage = useMemo(() => (
    <div >
      <Page style={[isFirstRender && styles.noJs]} ref={originalPage}
        width={width}
        height={height}
        horizontalMargin={horizontalMargin}
        verticalMargin={verticalMargin}
      >
        {children}
      </Page>
    </div>
  ), [children, isFirstRender, width, height, horizontalMargin, verticalMargin]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <Theme>
      <main>
        {isFirstRender ? (
          fullPage
        ) : (
          <PagesCut fullPageRef={originalPage} fallbackContent={fullPage} />
        )}
      </main>
    </Theme>
  );
};

export default Pages;
