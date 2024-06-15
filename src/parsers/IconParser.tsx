import { IconBaseProps, type IconType } from 'react-icons'
import { MdRocketLaunch } from 'react-icons/md'
import { MaybeTree, TreeNode } from '../NodesParser';
import { MdEmail, MdOutlinePhoneAndroid, MdLocationPin } from 'react-icons/md'
import { IoLogoLinkedin } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import { FaReact, FaNodeJs, FaSass, FaHtml5, FaCss3, FaTerminal } from "react-icons/fa";
import { SiStorybook, SiTypescript, SiJest, SiWebpack, SiCypress, SiContentful, SiStyledcomponents, SiRedux, SiRubyonrails } from "react-icons/si";

export const ICON_NODE_TYPE = 'ICON';

const icons: { [key in string]?: IconType } = {
  rocket: MdRocketLaunch,
  email: MdEmail,
  phone: MdOutlinePhoneAndroid,
  locationPin: MdLocationPin,
  linkedIn: IoLogoLinkedin,
  language: FaLanguage,
  react: FaReact,
  node: FaNodeJs,
  sass: FaSass,
  html5: FaHtml5,
  css3: FaCss3,
  terminal: FaTerminal,
  storybook: SiStorybook,
  typescript: SiTypescript,
  jest: SiJest,
  webpack: SiWebpack,
  cypress: SiCypress,
  contentful: SiContentful,
  styledComponents: SiStyledcomponents,
  redux: SiRedux,
  rubyOnRails: SiRubyonrails
}

type IconNode = TreeNode & {
    type: typeof ICON_NODE_TYPE,
    children: undefined;
    name: string;
    props?: IconBaseProps
}

const isIconNode = (node: any): node is IconNode  => 
  node.type === ICON_NODE_TYPE && typeof node.name === 'string' && (typeof node.props === 'object' || typeof node.props === 'undefined')

const IconParser = (node: MaybeTree) => {

  if (!isIconNode(node)) {
    const iconNodeError = new Error('The provided node is not an IconNode');

    iconNodeError.stack = `Provided node: ${JSON.stringify(node, undefined, 2)}`

    throw iconNodeError;
  }

  const Icon = icons[node.name];

  if (!Icon) return <></>;

  return <Icon className='Parsed_Icon' {...node.props} />;
}

export default IconParser