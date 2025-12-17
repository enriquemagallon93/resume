import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import Page from './Page';
import Theme from '../themes/Theme';
import { getCloningFunctions, getPathsToSplit } from '../utils/htmlPaginator';

import * as stylex from '@stylexjs/stylex';
import useSettings from '../Settings/useSettings';

const styles = stylex.create({
  noJs: {
    height: 'auto',
  }
});

const Pages= ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState([] as string[]);
  const [isReady, setIsReady] = useState(false);
  const [isServerSide, setIsServerSide] = useState(true);
  const {
    width,
    height,
    horizontalMargin,
    verticalMargin,
  } = useSettings();

  const originalPage = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setIsServerSide(false);
  },[]);

  useLayoutEffect(() => {
    setIsReady(false);
    setPages([]);
  }, [children, width, height, horizontalMargin, verticalMargin]);

  useLayoutEffect(() => {
    if (isReady) return;
    const fullPage = originalPage.current;

    if (!fullPage) return;

    const delayToCalculatePages = setTimeout(() => {
      const pathsToSplit = getPathsToSplit(fullPage);
      const { cloneFromPathToLimit } = getCloningFunctions(fullPage);

      const pageElements = pathsToSplit.map((path, index) => {
        return cloneFromPathToLimit(path, pathsToSplit[index + 1]).outerHTML;
      });

      setPages(pageElements);
      setIsReady(true);

    }, 100);

    return () => {
      clearTimeout(delayToCalculatePages);
    };
  }, [isReady]);

  return (
    <Theme>
      <main>
        {isReady ? (
          pages.map((page, index) => {
            return <div key={index} dangerouslySetInnerHTML={{ __html: page }} />;
          })
        ) : (
          <div >
            <Page style={[ isServerSide && styles.noJs]} ref={originalPage}
              width={width}
              height={height}
              horizontalMargin={horizontalMargin}
              verticalMargin={verticalMargin}
            >
              {children}
            </Page>
          </div>
        )}
      </main>
    </Theme>
  );
};

export default Pages;
