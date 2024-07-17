import { MaybeTree, TreeNode } from "../NodesParser";
import IsomorphicQRCode from "../IsomorphicQRCode";
import * as stylex from '@stylexjs/stylex';
import { colors } from "../themes/palette.stylex";

export const QR_LINK_NODE_TYPE = 'QR_LINK';

const styles = stylex.create({
  container: {
    flexBasis: 255,
    flexGrow: 1,
    flexShrink: 1,
    maxHeight: 255,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  link: {
    color: colors.hyper,
    textDecoration: {
      ":hover": 'underline'
    }
  }
});

type QRLinkNode = TreeNode & {
    type: typeof QR_LINK_NODE_TYPE,
    children: undefined;
    title: string;
    url: string
}

const isQRLinkNode = (node: any): node is QRLinkNode  => 
  node.type === QR_LINK_NODE_TYPE && typeof node.title === 'string' && typeof node.url === 'string';

const QRLinkParser = (node: MaybeTree) => {

  if (!isQRLinkNode(node)) {
    const qrLinkNodeError = new Error('The provided node is not a QRLink node');

    qrLinkNodeError.stack = `Provided node: ${JSON.stringify(node, undefined, 2)}`;

    throw qrLinkNodeError;
  }

  return (
    <a href={node.url} target="_blank" {...stylex.props(styles.container, styles.link)}>
      <IsomorphicQRCode
        src={node.url}
      />
      <span>{node.title}</span>
    </a>
  );
};

export default QRLinkParser;
