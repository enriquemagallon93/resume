import NodesParser, { MaybeTree, TreeNode } from '../NodesParser';
import React, { CSSProperties } from 'react';

export const TEXT_NODE_TYPE = 'TEXT';

type TextNode = TreeNode & {
  type: typeof TEXT_NODE_TYPE,
  children?: MaybeTree;
  props?: React.HTMLAttributes<HTMLSpanElement>
  bold: boolean,
  italic: boolean,
  underline: boolean;
  code: boolean;
  verticalAlign?: CSSProperties['verticalAlign'];
}

const isBooleanOfUndefined = (maybeBoolean: any): maybeBoolean is boolean | undefined =>
  typeof maybeBoolean === 'boolean' || typeof maybeBoolean === 'undefined';

const isATextNode = (node: any): node is TextNode =>
  node.type === TEXT_NODE_TYPE
  && (typeof node.props === 'object' || typeof node.props === 'undefined')
  && isBooleanOfUndefined(node.bold)
  && isBooleanOfUndefined(node.italic)
  && isBooleanOfUndefined(node.underlined)
  && isBooleanOfUndefined(node.code);

const TextParser = (node: MaybeTree) => {

  if (!isATextNode(node)) {
    const textNodeError = new Error('The provided node is not a TextNode');

    textNodeError.stack = `Provided node: ${JSON.stringify(node, undefined, 2)}`;

    throw textNodeError;
  }


  const { children, props, bold, code, italic, underline, verticalAlign } = node;
  let text = children ? <NodesParser tree={children} /> : '';

  const style = {
    ...props?.style,
    ...(verticalAlign ? {
      verticalAlign,
    } : {}),
  };

  if (underline) {
    text = <u>{text}</u>;
  }

  if (italic) {
    text = <i>{text}</i>;
  }

  if (code) {
    text = <code>{text}</code>;
  }

  if (bold) {
    text = <b>{text}</b>;
  }

  return <span {...props} style={style}>
    {text}
  </span>;
};

export default TextParser;
