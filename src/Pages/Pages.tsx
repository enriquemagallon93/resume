import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import Page from './Page';
import { A4 } from './constants';
import Theme from '../themes/Theme';
import { getCloningFunctions, getPathsToSplit } from '../utils/htmlPaginator';

import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
    noJs: {
        height: 'auto',
    }
});

const Pages= ({ children }: { children: ReactNode }) => {
    const [pages, setPages] = useState([] as String[]);
    const [isReady, setIsReady] = useState(false);
    const [isServerSide, setIsServerSide] = useState(true);

    const originalPage = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        setIsServerSide(false);
    },[])

    useLayoutEffect(() => {
        const fullPage = originalPage.current;

        if (!fullPage) return;

        const delayToCalculatePages = setTimeout(() => {
            const pathsToSplit = getPathsToSplit(fullPage);
            const { cloneFromPathToLimit } = getCloningFunctions(fullPage);

            const pageElements = pathsToSplit.map((path, index) => {
                return cloneFromPathToLimit(path, pathsToSplit[index + 1]).outerHTML
            })

            setPages(pageElements);
            setIsReady(true)

        }, 100);

        return () => {
            clearTimeout(delayToCalculatePages);
        }
    }, [children]);

    useLayoutEffect(() => {
        setIsReady(false);
        setPages([]);
    }, [children])

    return (
        <Theme>
            {isReady ? (
                pages.map((page, index) => {
                    return <div key={index} dangerouslySetInnerHTML={{ __html: page }} />
                })
            ) : (
                <div >
                    <Page style={[ isServerSide && styles.noJs]} ref={originalPage} {...A4}>
                        {children}
                    </Page>
                </div>
            )}
        </Theme>
    )
}

export default Pages