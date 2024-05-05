import NodesParser, { MaybeTree, TreeNode } from '../NodesParser';
import React from 'react';

export const LINK_NODE_TYPE = 'LINK';

type LinkNode = TreeNode & {
    type: typeof LINK_NODE_TYPE,
    to: string;
    children?: MaybeTree;
    props?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'>
}

const isLinkNode = (node: any): node is LinkNode  => 
    node.type === LINK_NODE_TYPE && (typeof node.props === 'object' || typeof node.props === 'undefined') && typeof node.to === 'string'

const LinkParser = (node: MaybeTree) => {

    if (!isLinkNode(node)) {
        const linkNodeError = new Error('The provided node is not a LinkNode');

        linkNodeError.stack = `Provided node: ${JSON.stringify(node, undefined, 2)}`

        throw linkNodeError;
    }

    const { children, props, to } = node;

    return <a {...props} href={to}>
        {children ? <NodesParser tree={children} /> : ''}
    </a>
}

export default LinkParser