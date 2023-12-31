import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

import { FunctionesqueNode, MaxOptionalParamsContext } from '../../objects';

export const maxOptionalParams: unknown = ESLintUtils.RuleCreator.withoutDocs({
	meta: {
		type: 'problem',
		messages: {
			tooManyOptionalParams: 'Function has too many optional params ({{actualOptionalParams}}). Allowed maximum: {{maxOptionalParams}}',
		},
		schema: {
			type: 'array',
			minItems: 1,
			maxItems: 1,
			items: [
				{
					type: 'number',
					minimum: 0,
				},
			],
		},
	},
	create(context: MaxOptionalParamsContext) {
		return {
			FunctionDeclaration(node): void {
				checkOptionalParamCount(node, context);
			},
			FunctionExpression(node): void {
				checkOptionalParamCount(node, context);
			},
			ArrowFunctionExpression(node): void {
				checkOptionalParamCount(node, context);
			},
			TSEmptyBodyFunctionExpression(node): void {
				checkOptionalParamCount(node, context);
			},
			TSFunctionType(node): void {
				checkOptionalParamCount(node, context);
			},
			TSMethodSignature(node): void {
				checkOptionalParamCount(node, context);
			},
		};
	},
	defaultOptions: [1],
});

function checkOptionalParamCount(
	node: FunctionesqueNode,
	context: MaxOptionalParamsContext
): void {
	const allowedOptionalParamCount = context.options[0];

	const optionalParamCount = node.params
		.filter((param) => param.type === AST_NODE_TYPES.Identifier && param.optional)
		.length;

	if (optionalParamCount <= allowedOptionalParamCount) {
		return;
	}

	context.report({
		messageId: 'tooManyOptionalParams',
		node,
		data: {
			actualOptionalParams: optionalParamCount,
			maxOptionalParams: allowedOptionalParamCount,
		},
	});
}
