import NodesParser, { MaybeTree, TreeNode } from '../NodesParser';
import React from 'react';

export const HEADING_NODE_TYPE = 'HEADING';

type HeadingNode = TreeNode & {
    type: typeof HEADING_NODE_TYPE,
    children?: MaybeTree;
    props?: React.HTMLAttributes<HTMLHeadingElement>
    number: Number;
}

const Headings: { [key in string]?: (props: HeadingNode['props']) => JSX.Element } = {
    1: (props) => <h1 {...props} />,
    2: (props) => <h2 {...props} />,
    3: (props) => <h3 {...props} />,
    4: (props) => <h4 {...props} />,
    5: (props) => <h5 {...props} />,
    6: (props) => <h6 {...props} />
}

const isAHeadingNode = (node: any): node is HeadingNode  => 
    node.type === HEADING_NODE_TYPE && (typeof node.props === 'object' || typeof node.props === 'undefined') && typeof node.number === 'number'

const HeadingParser = (node: MaybeTree) => {

    if (!isAHeadingNode(node)) {
        const headingNodeError = new Error('The provided node is not a HeadingNode');

        headingNodeError.stack = `Provided node: ${JSON.stringify(node, undefined, 2)}`

        throw headingNodeError;
    }

    const { children, props, number } = node;

    const Heading = Headings[`${number}`]

    if (!Heading) return null;

    return <Heading {...props}>
        {children ? <NodesParser tree={children} /> : ''}
    </Heading>
}

export default HeadingParser