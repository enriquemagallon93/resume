import { type TreeNode } from '../NodesParser';
import BlockParser, { BLOCK_NODE_TYPE } from './BlockParser';
import BulletedListParser, { BULLETED_LIST_NODE_TYPE } from './BulletedListParser';
import HeadingParser, { HEADING_NODE_TYPE } from './HeadingParser';
import IconParser, { ICON_NODE_TYPE } from './IconParser';
import ImageParser, { IMAGE_NODE_TYPE } from './ImageParser';
import LinkParser, {LINK_NODE_TYPE} from './LinkParser';
import ParagraphParser, { PARAGRAPH_NODE_TYPE } from './ParagraphParser';
import QRLinkParser, { QR_LINK_NODE_TYPE } from './QRLinkParser';
import TextParser, { TEXT_NODE_TYPE } from './TextParser';

export default {
  [ICON_NODE_TYPE]: IconParser,
  [LINK_NODE_TYPE]: LinkParser,
  [BLOCK_NODE_TYPE]: BlockParser,
  [TEXT_NODE_TYPE]: TextParser,
  [HEADING_NODE_TYPE]: HeadingParser,
  [PARAGRAPH_NODE_TYPE]: ParagraphParser,
  [BULLETED_LIST_NODE_TYPE]: BulletedListParser,
  [IMAGE_NODE_TYPE]: ImageParser,
  [QR_LINK_NODE_TYPE]: QRLinkParser
} as { [key in string]?: (props: TreeNode) => JSX.Element };
