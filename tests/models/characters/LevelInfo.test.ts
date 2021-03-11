import { LevelInfo, LevelUtils } from "../../../src"

describe('LevelInfo class', () => {

	it('generates complete level and exp information based on current level and current exp', () => {
		const level = 10
		const exp = 50
		const info = new LevelInfo(level, exp)

		expect(info.level).toBe(level)
		expect(info.currentExp).toBe(exp)
		expect(info.allExp).toBe(LevelUtils.calculateAllExp(level, exp))
		expect(info.levelExp).toBe(LevelUtils.expToReachNextLevel(level))
	})

})