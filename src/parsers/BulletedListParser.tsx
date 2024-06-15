import NodesParser, { MaybeTree, TreeNode } from '../NodesParser';
import React from 'react';

export const BULLETED_LIST_NODE_TYPE = 'BULLETED_LIST';

type BulletedListNode = TreeNode & {
    type: typeof BULLETED_LIST_NODE_TYPE,
    children: MaybeTree & Array<any>;
    props?: React.HTMLAttributes<HTMLUListElement>
}

const isABulletedListNode = (node: any): node is BulletedListNode  => 
  node.type === BULLETED_LIST_NODE_TYPE && Array.isArray(node.children) && (typeof node.props === 'object' || typeof node.props === 'undefined')

const BulletedListParser = (node: MaybeTree) => {

  if (!isABulletedListNode(node)) {
    const paragraphNodeError = new Error('The provided node is not a BulletedList');

    paragraphNodeError.stack = `Provided node: ${JSON.stringify(node, undefined, 2)}`

    throw paragraphNodeError;
  }

  const { children, props, } = node;

  return <ul {...props}>
    {children.map((child, index) => (
      <li key={index}>
        <NodesParser tree={child} />
      </li>
    ))}
  </ul>
}

export default BulletedListParser