const fromPixelsString = (px: string): number => Math.round(Number.parseFloat(px) * 10000) / 10000;

const getY1FromElement = (reference: Element, target: Element) => {
  const ref = reference.getBoundingClientRect();
  const tar = target.getBoundingClientRect();

  return tar.top - ref.top;
}

const getPageFunctions = (originalPage: Element) => {
  const {paddingTop, paddingBottom,} = getComputedStyle(originalPage);
  const {offsetHeight} = (originalPage as HTMLElement);

  const paddingTopN = fromPixelsString(paddingTop)

  const pageAvailableHeight = offsetHeight - paddingTopN - fromPixelsString(paddingBottom);

  const getLastPageNumber = (element: Element): number => {
    const { offsetHeight: childHeight } = element as HTMLElement
    
    const y1 = getY1FromElement(originalPage, element) - paddingTopN
    const y2 = y1 + childHeight;

    const lastPageNumber = Math.floor(y2 / pageAvailableHeight) + 1;

    return lastPageNumber;
  }

  const fitInPage = (element: Element, pageNumber: number): boolean => {
    const lastPageNumber = getLastPageNumber(element)

    return lastPageNumber === pageNumber
  }

  const removeEmptyPaths = (path: number[]) => path.join(',').replace(/(,0)+$/g, '').split(',').map(number => Number.parseInt(number))

  return {
    fitInPage,
    getLastPageNumber,
    removeEmptyPaths
  };
}

const excludedNodes = new Set(['BR'])

export const getPathsToSplit = (originalPage: Element ): number[][] => {
  const { fitInPage, getLastPageNumber, removeEmptyPaths } = getPageFunctions(originalPage);

  const numberOfPages = getLastPageNumber(originalPage);

  const pathsToSplit = [[]] as number[][];
  let pageNumber = 1;

  const iterateNodes = (currentNode: Element, ...path: number[]) => {
    if (excludedNodes.has(currentNode.tagName.toUpperCase())) {
      return;
    }
    if (fitInPage(currentNode, pageNumber)) {
      return;
    }
    if (currentNode.children.length === 0) {
      pathsToSplit.push(removeEmptyPaths([...path]));
      pageNumber += 1;
      return;
    }
    Array.from(currentNode.children).every((child, index) => {
      iterateNodes(child, ...path, index);
      return pageNumber < numberOfPages;
    })
  }

  iterateNodes(originalPage);

  return pathsToSplit;
}

export const getCloningFunctions = (originalPage: Element) => {

  const cloneFromPathToLimit = (
    currentOriginalNode: Element,
    currentClonedNode: Element,
    [initialIndex = 0, ...initialPath]: number[],
    [endLimit = Infinity, ...limit]: number[],
  ) => {
    if (typeof initialIndex !== 'number') return currentClonedNode;

    const limitIndex = Math.min(currentOriginalNode.children.length, endLimit);

    for (let i = initialIndex; i <= limitIndex; i ++) {
      const nodeToClone = currentOriginalNode.children[i];
      let newLimit: number[] = [];
      let newPath: number[] = [];
      if (!nodeToClone) {
        break;
      }
      if (i === initialIndex && i !== limitIndex) {
        if (initialPath.length === 0) {
          const deepClone = nodeToClone.cloneNode(true);
          currentClonedNode.appendChild(deepClone);
          continue;
        }
        newLimit = [];
        newPath = [...initialPath]                
      } else if (i === initialIndex && i === limitIndex) {
        newLimit = [...limit];
        newPath = [...initialPath]
      } else if (i === limitIndex && i !== initialIndex) {
        if (limit.length === 0) {
          break;
        }
        newPath = [];
        newLimit = [...limit];
      } else {
        const deepClone = nodeToClone.cloneNode(true);
        currentClonedNode.appendChild(deepClone);
        continue;
      }
      const newCurrentOriginalNode = nodeToClone;
      const newCurrentClonedNode = newCurrentOriginalNode.cloneNode() as Element;
      currentClonedNode.appendChild(newCurrentClonedNode);

      cloneFromPathToLimit( newCurrentOriginalNode, newCurrentClonedNode, newPath, newLimit );
    }
    return currentClonedNode;
  }

  const clone = (initialPath: number[], limit = [] as number[]) => {
    const result = cloneFromPathToLimit(originalPage, originalPage.cloneNode() as Element, initialPath, limit)

    return result;
  }

  return {
    cloneFromPathToLimit: clone
  }
}