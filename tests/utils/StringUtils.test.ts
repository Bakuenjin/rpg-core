import { StringUtils } from "../../src"

describe('StringUtils class', () => {

	it('can replace all occourences in a string', () => {
		const str = 'He11o Wor1d'
		const result = StringUtils.replaceAll(str, '1', 'l')

		expect(result).toBe('Hello World')
	})

})