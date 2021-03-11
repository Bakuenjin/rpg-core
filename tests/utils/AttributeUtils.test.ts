import { AttributeUtils } from '../../src'

describe('AttributeUtils class', () => {

	it('can evaluate mathematical expressions as attribute increase rates', () => {
		const expr = '2*x^3'
		const level = 4
		const result = AttributeUtils.evaluateIncreaseRateExpression(expr, level)

		expect(result).toBe(128)
	})

	it('throws an error when an invalid expression is used', () => {
		const expr = 'hello world'
		expect(() => AttributeUtils.evaluateIncreaseRateExpression(expr, 0)).toThrowError()
	})

})