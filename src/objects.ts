import { TSESTree } from '@typescript-eslint/utils';
import { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint';

export type FunctionesqueNode = TSESTree.FunctionDeclaration
| TSESTree.FunctionExpression
| TSESTree.ArrowFunctionExpression
| TSESTree.TSEmptyBodyFunctionExpression
| TSESTree.TSFunctionType
| TSESTree.TSMethodSignature;

export type MaxOptionalParamsContext = Readonly<RuleContext<'tooManyOptionalParams', [number]>>;
