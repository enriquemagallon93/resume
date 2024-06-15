import NodesParser, { MaybeTree, TreeNode } from '../NodesParser';
import React from 'react';

export const TEXT_NODE_TYPE = 'TEXT';

type TextNode = TreeNode & {
    type: typeof TEXT_NODE_TYPE,
    children?: MaybeTree;
    props?: React.HTMLAttributes<HTMLSpanElement>
    bold: boolean,
    italic: boolean,
    underline: boolean;
    code: boolean;
}

const isBooleanOfUndefined = (maybeBoolean: any): maybeBoolean is boolean | undefined =>
  typeof maybeBoolean === 'boolean' || typeof maybeBoolean === 'undefined';

const isATextNode = (node: any): node is TextNode =>
  node.type === TEXT_NODE_TYPE
    && (typeof node.props === 'object' || typeof node.props === 'undefined')
    && isBooleanOfUndefined(node.bold)
    && isBooleanOfUndefined(node.italic)
    && isBooleanOfUndefined(node.underlined)
    && isBooleanOfUndefined(node.code)

const TextParser = (node: MaybeTree) => {

  if (!isATextNode(node)) {
    const textNodeError = new Error('The provided node is not a TextNode');

    textNodeError.stack = `Provided node: ${JSON.stringify(node, undefined, 2)}`

    throw textNodeError;
  }

  const { children, props, bold, code, italic, underline, type } = node;

  if (underline) {
    return (
      <u>
        <TextParser type={type} children={children} bold={bold} code={code} italic={italic} />
      </u>
    );
  }

  if (italic) {
    return (
      <i>
        <TextParser type={type} children={children} bold={bold} code={code} />
      </i>
    )
  }

  if (code) {
    return (
      <code>
        <TextParser type={type} children={children} bold={bold} />
      </code>
    )
  }

  if (bold) {
    return (
      <b>
        <TextParser type={type} children={children} />
      </b>
    )
  }

  return <span {...props}>
    {children ? <NodesParser tree={children} /> : ''}
  </span>
}

export default TextParser
