import { ESLintUtils } from '@typescript-eslint/utils/dist';

export const optionalParams = ESLintUtils.RuleCreator.withoutDocs({
	meta: {
		messages: {
			tooManyOptionalParams: "Only '{{quantity}}' optional params are allowed",
		},
		hasSuggestions: true,
		schema: {
			type: 'array',
			minItems: 0,
			maxItems: 1,
			items: [
				{
					type: 'number',
					minimum: 0,
				},
			],
		},
		type: 'problem',
	},
	create(context) {
		return {};
	},
	defaultOptions: [],
});
