import NodesParser, { MaybeTree, TreeNode } from '../NodesParser';
import React from 'react';

export const PARAGRAPH_NODE_TYPE = 'PARAGRAPH';

type ParagraphNode = TreeNode & {
    type: typeof PARAGRAPH_NODE_TYPE,
    children?: MaybeTree;
    props?: React.HTMLAttributes<HTMLParagraphElement>
}

const isAParagraphNode = (node: any): node is ParagraphNode  => 
  node.type === PARAGRAPH_NODE_TYPE && (typeof node.props === 'object' || typeof node.props === 'undefined')

const ParagraphParser = (node: MaybeTree) => {

  if (!isAParagraphNode(node)) {
    const paragraphNodeError = new Error('The provided node is not a Paragraph');

    paragraphNodeError.stack = `Provided node: ${JSON.stringify(node, undefined, 2)}`

    throw paragraphNodeError;
  }

  const { children, props, } = node;

  return <p {...props}>
    {children ? <NodesParser tree={children} /> : ''}
  </p>
}

export default ParagraphParser
