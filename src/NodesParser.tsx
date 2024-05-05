import Parsers from './parsers';

export type TreeNode = {
    type: string;
    children?: TreeNode | TreeNode[]
};

type Tree = string | TreeNode | TreeNode[];

export type MaybeTree = string | Record<string, any> | Record<string, any>[];

const isATree = (maybeTree: any): maybeTree is Tree => {
    if (typeof maybeTree === 'string') return true;

    if (typeof maybeTree !== 'object') return false;

    if (Array.isArray(maybeTree)) return true;

    return typeof maybeTree.type === 'string';
}

const NodesParser = ({ tree }: { tree: MaybeTree }) => {

    if (!isATree(tree)) {
        const treeError = new Error('The provided tree is not a tree');

        treeError.stack = JSON.stringify(tree, undefined, 2);

        return;
    }

    if (typeof tree == 'string') return tree;

    if (Array.isArray(tree)) {
        return (
            <>
                {tree.map((node, index) =>
                    <NodesParser key={index} tree={node} />
                )}
            </>
        )
    }

    const Parser = Parsers[tree.type];

    if (!Parser) {
        const noParserError = new Error('No parser found');

        noParserError.stack = `node type: ${tree.type}`;

        throw noParserError;
    }

    return <Parser {...tree} />
}

export default NodesParser