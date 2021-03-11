import { RngUtils } from "../../src"

describe('RngUtils class', () => {

	it('can generate random integer', () => {
		const result = RngUtils.integer(1, 4)
		expect(result > 0).toBe(true)
		expect(result < 4).toBe(true)
	})

	it('floors float min max params when generating integer', () => {
		const result = RngUtils.integer(1.6, 4.2)
		expect(result > 0).toBe(true)
		expect(result < 4).toBe(true) 
	})

	it('can generate random floats', () => {
		const result = RngUtils.float(1, 4)
		expect(result >= 1).toBe(true)
		expect(result <= 4).toBe(true)
	})

})