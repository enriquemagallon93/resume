import { useLayoutEffect, useState } from 'react';
import useSettings from '../Settings/useSettings';
import { getCloningFunctions, getPathsToSplit } from '../utils/htmlPaginator';

type PagesCutProps = {
    fallbackContent?: React.ReactNode;
    fullPageRef: React.MutableRefObject<HTMLDivElement | null>
}

const PagesCut = ({ fullPageRef, fallbackContent}: PagesCutProps) => {
  const [pages, setPages] = useState([] as string[]);
  const [isReady, setIsReady] = useState(false);

  const [isServerSide, setIsServerSide] = useState(true);

  const {
    width,
    height,
    horizontalMargin,
    verticalMargin,
  } = useSettings();

  useLayoutEffect(() => {
    setIsServerSide(false);
  }, []);

  useLayoutEffect(() => {
    setIsReady(false);
    setPages([]);
  }, [fallbackContent, width, height, horizontalMargin, verticalMargin]);

  useLayoutEffect(() => {
    if (isReady) return;
    const fullPage = fullPageRef.current;

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
  }, [fullPageRef, isReady]);

  return isServerSide || !isReady ? fallbackContent : (
    <>
      {pages.map((page, index) => {
        return <div key={index} dangerouslySetInnerHTML={{ __html: page }} />;
      })}
    </>
  );
};

export default PagesCut;
