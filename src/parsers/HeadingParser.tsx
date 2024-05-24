import NodesParser, { MaybeTree, TreeNode } from '../NodesParser';
import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../themes/palette.stylex';

export const HEADING_NODE_TYPE = 'HEADING';

type HeadingNode = TreeNode & {
    type: typeof HEADING_NODE_TYPE,
    children?: MaybeTree;
    props?: React.HTMLAttributes<HTMLHeadingElement>
    number: Number;
}

export const styles = stylex.create({
    1: {
        fontSize: 30,
        lineHeight: 1,
        fontWeight: 'normal',
    },
    2: {
        color: colors.hightlight,
        fontSize: 16,
        lineHeight: '20px',
    },
    3: {},
    4: {},
    5: {},
    6: {}
})

const mergeStyles = (
    props: HeadingNode['props'],
    number: 1 | 2 | 3 | 4 | 5 | 6
): HeadingNode['props'] => {
    const { style, className } = stylex.props(styles[number] || null)

    return {
        ...props,
        style: {
            ...props?.style,
            ...style,
        },
        className: `${className} ${props?.className || ''}`
    }
}

const Headings: { [key in string]?: (props: HeadingNode['props']) => JSX.Element } = {
    1: (props) => <h1 {...mergeStyles(props, 1)} />,
    2: (props) => <h2 {...mergeStyles(props, 2)} />,
    3: (props) => <h3 {...mergeStyles(props, 3)} />,
    4: (props) => <h4 {...mergeStyles(props, 4)} />,
    5: (props) => <h5 {...mergeStyles(props, 5)} />,
    6: (props) => <h6 {...mergeStyles(props, 6)} />
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