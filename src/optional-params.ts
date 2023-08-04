import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint';

export const optionalParams: unknown = ESLintUtils.RuleCreator.withoutDocs({
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
		const allowedOptionalParamCount = context.options[0];

		return {
			FunctionDeclaration(node): void {
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
			},
		};
	},
	defaultOptions: [1],
});
