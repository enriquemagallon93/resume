import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';

const FULL_FIT = 'full_fit';
const PARTIAL_FIT = 'partial_fit';
const NO_FIT = 'no_fit';

type FIT_TYPE = typeof FULL_FIT | typeof PARTIAL_FIT | typeof NO_FIT;

const fromPixelsString = (px: string): number => Number.parseFloat(px);

const fitInPageFactory = (originalPage: Element) => {
    const {paddingTop, paddingBottom,} = getComputedStyle(originalPage);
    const {offsetTop, offsetHeight} = (originalPage as HTMLElement);

    const paddingTopN = fromPixelsString(paddingTop)

    const pageAvailableHeight = offsetHeight - paddingTopN - fromPixelsString(paddingBottom);

    const fitInPage = (element: Element, pageNumber: number): FIT_TYPE => {
        const { offsetTop: childTop, offsetHeight: childHeight } = element as HTMLElement
    
            const y1 = Math.max(childTop - offsetTop - paddingTopN, 0);
            const y2 = y1 + childHeight;

            const initialPageIndex = Math.floor(y1 / pageAvailableHeight) + 1;
            const lastPageIndex = Math.floor(y2 / pageAvailableHeight) + 1;

            if (element.tagName.match(/^li$/i)) {
                console.log('li');
            }

            if (initialPageIndex === lastPageIndex && lastPageIndex === pageNumber) return FULL_FIT;

            if (initialPageIndex > pageNumber || lastPageIndex < pageNumber) return NO_FIT;

            return PARTIAL_FIT;
    }

    return fitInPage;
}

const cloneLastNodesFromRoot = (currentNode: Element, clonedTree = currentNode.cloneNode() as Element): Element => {
    const parent = currentNode.parentElement

    if(!parent) return clonedTree;

    const parentClone = parent.cloneNode() as Element;

    parentClone.appendChild(clonedTree);

    return cloneLastNodesFromRoot(parent, parentClone);
}

const lastNodeInTree = (tree: Element): Element => {
    const last = tree.lastChild as Element;

    return last ? lastNodeInTree(last) : tree
}

const splitPageIntoPages = (originalPage: Element ): string[] => {
    const pages = [] as Element[];
    const fitInPage = fitInPageFactory(originalPage);

    let currentPage: Element;
    let currentPageNumber = 1;
    let currentClonedNode = originalPage.cloneNode() as Element;

    const splitNodesToCorrectPage = (currentNode: Element): void => {
        console.log('spilting')
        if (currentNode === originalPage) {
            currentPage = currentNode.cloneNode() as Element;
            currentClonedNode = currentPage;
        } else {
            const fitMode = fitInPage(currentNode, currentPageNumber);

            if (fitMode === FULL_FIT || currentNode.tagName.match(/^br$/i)) {
                currentClonedNode.appendChild(currentNode.cloneNode(true))
                return;
            }
            
            if (fitMode == NO_FIT) {
                currentPageNumber += 1;
                pages.push(currentPage)

                currentPage = cloneLastNodesFromRoot(currentClonedNode);
                currentClonedNode = lastNodeInTree(currentPage);

                return splitNodesToCorrectPage(currentNode)
           }

           const newClonedNode = currentNode.cloneNode() as Element;
           currentClonedNode.appendChild(newClonedNode);
           currentClonedNode = newClonedNode;
        }
        for (let child of currentNode.children) {
            splitNodesToCorrectPage(child)
        }
    }

    splitNodesToCorrectPage(originalPage)

    pages.push(currentPage)

    return pages.map(page => page.innerHTML)
}

// const splitPages = (content: Element, toSplit: number[][]) => {
//     console.log({content, toSplit})

//     let firstPage = content.cloneNode(true);

//     const pages = [] as Node[];

//     toSplit.reverse().forEach(splitIndexes => {
//         const lastPage = firstPage.cloneNode();
//         let currentFirstPageNode = firstPage;
//         let currentLastPageNode = lastPage;
        
//         splitIndexes.forEach((indexToSplit) => {
//             for (let nodeIndex = indexToSplit; nodeIndex < currentFirstPageNode.childNodes.length; nodeIndex++) {
//                 const node = currentFirstPageNode.childNodes[nodeIndex];

//                 currentLastPageNode.appendChild(node.cloneNode());

//                 if (nodeIndex > indexToSplit) {
//                     currentFirstPageNode.removeChild(node);
//                 }
//             }
//             currentFirstPageNode = currentFirstPageNode.childNodes[indexToSplit];
//             currentLastPageNode = currentLastPageNode.childNodes[0];
//         });

//         pages.unshift(lastPage);
//     });

//     pages.unshift(firstPage);

//     console.log({pages})

//     return pages;
// }

const Pages= ({ children }: { children: ReactNode }) => {
    const [pages, setPages] = useState([] as String[]);
    const [isReady, setIsReady] = useState(false);

    const originalPage = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const fullPage = originalPage.current;

        if (!fullPage) return;

        const delayToCalculatePages = setTimeout(() => {
            const pageElements = splitPageIntoPages(fullPage);

            setPages(pageElements);
            setIsReady(true)

        }, 100);

        return () => {
            clearTimeout(delayToCalculatePages);
        }
    }, [children]);

    useEffect(() => {
        setIsReady(false);
    }, [children])

    return (
        <>
            {isReady ? (
                pages.map((page, index) => {
                    return <div key={index} className='page' dangerouslySetInnerHTML={{ __html: page }} />
                })
            ) : (
                <div style={{ /* visibility: 'hidden', maxWidth: 0, maxHeight: 0, overflow: 'hidden' */}} >
                    <div ref={originalPage} className='page'>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default Pages