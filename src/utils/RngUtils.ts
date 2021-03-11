class RNGUtils {
	
	/**
	 * @param min inclusive
	 * @param max exclusive
	 */
	integer(min: number, max: number): number {
		min = Number.isInteger(min) ? min : Math.floor(min)
		max = Number.isInteger(max) ? max : Math.floor(max)

		return Math.floor(Math.random() * (max - min)) + min
	}

	float(min: number, max: number) {
		return Math.random() * (max - min) + min
	}

}

export default new RNGUtils()