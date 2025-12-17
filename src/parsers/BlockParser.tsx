import NodesParser, { MaybeTree, TreeNode } from '../NodesParser';
import React, { CSSProperties } from 'react';

export const BLOCK_NODE_TYPE = 'BLOCK';

type BlockNode = TreeNode & {
  type: typeof BLOCK_NODE_TYPE;
  children?: MaybeTree;
  props?: React.HTMLAttributes<HTMLDivElement>;
  gridColumn?: CSSProperties['gridColumn'];
  gridRow?: CSSProperties['gridRow'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['justifyContent'];
  margin?: CSSProperties['margin'];
}

const isABlockNode = (node: any): node is BlockNode =>
  node.type === BLOCK_NODE_TYPE && (typeof node.props === 'object' || typeof node.props === 'undefined');

const BlockParser = (node: MaybeTree) => {

  if (!isABlockNode(node)) {
    const blockNodeError = new Error('The provided node is not a BlockNode');

    blockNodeError.stack = `Provided node: ${JSON.stringify(node, undefined, 2)}`;

    throw blockNodeError;
  }

  const { children, props, gridColumn, gridRow, justifyContent, alignItems, margin } = node;

  const style: CSSProperties = {
    ...props?.style,
    ...(gridColumn ? {
      gridColumn,
    } : {}),
    ...(gridRow ? {
      gridRow,
    } : {}),
    ...(justifyContent ? {
      justifyContent,
    } : {}),
    ...(alignItems ? {
      alignItems,
    } : {}),
    ...(margin ? {
      margin,
    } : {}),
  };

  return <div {...props} style={{
    flexWrap: 'wrap',
    ...style
  }}>
    {children ? <NodesParser tree={children} /> : ''}
  </div>;
};

export default BlockParser;
