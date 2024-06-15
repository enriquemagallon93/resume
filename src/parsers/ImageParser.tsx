import { MaybeTree, TreeNode } from '../NodesParser';
import React from 'react';

export const IMAGE_NODE_TYPE = 'IMAGE';

type ImageNode = TreeNode & {
    type: typeof IMAGE_NODE_TYPE,
    children?: undefined;
    title: string
    props?: React.HTMLAttributes<HTMLImageElement>
    source: string;
}

const isAnImageNode = (node: any): node is ImageNode  => 
  node.type === IMAGE_NODE_TYPE && typeof node.source === "string" && typeof node.title === 'string' && (typeof node.props === 'object' || typeof node.props === 'undefined');

const ImageParser = (node: MaybeTree) => {

  if (!isAnImageNode(node)) {
    const imageNodeError = new Error('The provided node is not an ImageNode');

    imageNodeError.stack = `Provided node: ${JSON.stringify(node, undefined, 2)}`;

    throw imageNodeError;
  }

  const { props, title, source } = node;

  return <img {...props} title={title} src={source} />;
};

export default ImageParser;
