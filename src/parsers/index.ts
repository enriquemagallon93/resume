import { lazy } from 'react';

import { type TreeNode } from '../NodesParser';
import { BLOCK_NODE_TYPE } from './BlockParser';
import { BULLETED_LIST_NODE_TYPE } from './BulletedListParser';
import { HEADING_NODE_TYPE } from './HeadingParser';
import { ICON_NODE_TYPE } from './IconParser';
import { IMAGE_NODE_TYPE } from './ImageParser';
import { LINK_NODE_TYPE } from './LinkParser';
import { PARAGRAPH_NODE_TYPE } from './ParagraphParser';
import { QR_LINK_NODE_TYPE } from './QRLinkParser';
import { TEXT_NODE_TYPE } from './TextParser';

const IconParser = lazy(() => import('./IconParser'));
const LinkParser = lazy(() => import('./LinkParser'));
const BlockParser = lazy(() => import('./BlockParser'));
const TextParser = lazy(() => import('./TextParser'));
const HeadingParser = lazy(() => import('./HeadingParser'));
const ParagraphParser = lazy(() => import('./ParagraphParser'));
const BulletedListParser = lazy(() => import('./BulletedListParser'));
const ImageParser = lazy(() => import('./ImageParser'));
const QRLinkParser = lazy(() => import('./QRLinkParser'));

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
