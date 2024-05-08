import { type TreeNode } from '../NodesParser';
import BlockParser, { BLOCK_NODE_TYPE } from './BlockParser';
import HeadingParser, { HEADING_NODE_TYPE } from './HeadingParser';
import IconParser, { ICON_NODE_TYPE } from './IconParser';
import LinkParser, {LINK_NODE_TYPE} from './LinkParser';
import TextParser, { TEXT_NODE_TYPE } from './TextParser';

export default {
    [ICON_NODE_TYPE]: IconParser,
    [LINK_NODE_TYPE]: LinkParser,
    [BLOCK_NODE_TYPE]: BlockParser,
    [TEXT_NODE_TYPE]: TextParser,
    [HEADING_NODE_TYPE]: HeadingParser
} as { [key in string]?: (props: TreeNode) => JSX.Element }