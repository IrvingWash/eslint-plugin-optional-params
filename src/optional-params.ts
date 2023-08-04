import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint';

export const maxOptionalParams: unknown = ESLintUtils.RuleCreator.withoutDocs({
	meta: {
		type: 'problem',
		messages: {
			tooManyOptionalParams: 'Only {{count}} optional params are allowed',
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
	create(context: Readonly<RuleContext<'tooManyOptionalParams', [number]>>) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkOptionalParamCount(node: any, context: any): void {
	const allowedOptionalParamCount = context.options[0];

	let optionalParamCount = 0;

	for (const param of node.params) {
		if (optionalParamCount >= allowedOptionalParamCount) {
			context.report({
				messageId: 'tooManyOptionalParams',
				node,
				data: {
					count: allowedOptionalParamCount,
				},
			});

			break;
		}

		if (
			param.type === AST_NODE_TYPES.Identifier
			&& param.optional
		) {
			optionalParamCount += 1;
		}
	}
}
