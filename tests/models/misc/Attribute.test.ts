import { Attribute } from "../../../src"

describe('Attribute class', () => {

	it('has id and name', () => {
		const attr = new Attribute(42, 'test_attr', 0, 1)

		expect(attr.id).toBe(42)
		expect(attr.name).toBe('test_attr')
	})

	it('can have increase rate as a number', () => {
		const attr = new Attribute(1, 'a', 0, 42)

		expect(attr.getIncreaseRate(2)).toBe(42)
		expect(attr.getIncreaseRate(3)).toBe(42)
	})

	it('can have increase rate as a math expression string', () => {
		const attr = new Attribute(1, 'a', 0, '3*x^2')
		
		expect(attr.getIncreaseRate(2)).toBe(12)
		expect(attr.getIncreaseRate(3)).toBe(27)
	})

	it('returns the base value of the specified level is 1', () => {
		const attr = new Attribute(1, 'a', 10, 1)

		expect(attr.getIncreaseRate(1)).toBe(10)
		expect(attr.getIncreaseRate(2)).toBe(1)
	})

	it('returns 0 when the level is 0 or negative', () => {
		const attr = new Attribute(1, 'a', 42, 10)

		expect(attr.getIncreaseRate(-1)).toBe(0)
		expect(attr.getIncreaseRate(0)).toBe(0)
	})

})