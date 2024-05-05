import NodesParser, { MaybeTree, TreeNode } from '../NodesParser';
import React from 'react';

export const BLOCK_NODE_TYPE = 'BLOCK';

type LinkNode = TreeNode & {
    type: typeof BLOCK_NODE_TYPE,
    children?: MaybeTree;
    props?: React.HTMLAttributes<HTMLDivElement>
}

const isABlockNode = (node: any): node is LinkNode  => 
    node.type === BLOCK_NODE_TYPE && (typeof node.props === 'object' || typeof node.props === 'undefined')

const BlockParser = (node: MaybeTree) => {

    if (!isABlockNode(node)) {
        const blockNodeError = new Error('The provided node is not a BlockNode');

        blockNodeError.stack = `Provided node: ${JSON.stringify(node, undefined, 2)}`

        throw blockNodeError;
    }

    const { children, props, } = node;

    return <div {...props}>
        {children ? <NodesParser tree={children} /> : ''}
    </div>
}

export default BlockParser