import { Attribute } from "../../../src"

describe('Attribute class', () => {

	it('has id and name', () => {
		const attr = new Attribute(42, 'test_attr', 1)

		expect(attr.id).toBe(42)
		expect(attr.name).toBe('test_attr')
	})

	it('can have increase rate as a number', () => {
		const attr = new Attribute(1, 'a', 42)

		expect(attr.getIncreaseRate(0)).toBe(42)
		expect(attr.getIncreaseRate(1)).toBe(42)
	})

	it('can have increase rate as a math expression string', () => {
		const attr = new Attribute(1, 'a', '3*x^2')
		
		expect(attr.getIncreaseRate(1)).toBe(3)
		expect(attr.getIncreaseRate(2)).toBe(12)
	})

})