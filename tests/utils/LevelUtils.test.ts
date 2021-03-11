import { LevelUtils } from "../../src"

describe('LevelUtils class', () => {

	it('can calculate the sum of exp collected', () => {
		const level = 3
		const currentExp = 50
		const sumExp = LevelUtils.calculateAllExp(level, currentExp)

		expect(sumExp).toBe(180)
	})

	it('can calculate the exp needed to reach next level', () => {
		const currentLevel = 3
		const neededExp = LevelUtils.expToReachNextLevel(currentLevel)

		expect(neededExp).toBe(130)
	})

	it('can check if a level up has occoured with the current exp', () => {
		const currentLevel = 3
		const insufficentExp = 129
		const justEnoughExp = 130
		const sufficentExp = 131

		expect(LevelUtils.hasLevelUp(currentLevel, insufficentExp)).toBe(false)
		expect(LevelUtils.hasLevelUp(currentLevel, justEnoughExp)).toBe(true)
		expect(LevelUtils.hasLevelUp(currentLevel, sufficentExp)).toBe(true)
	})

	it('can recalculate level and current exp to reflect level up', () => {
		const currentLevel = 3
		const currentExp = 175

		const recalc = LevelUtils.recalculateLevelAndCurrentExp(currentLevel, currentExp)
		expect(recalc.level).toBe(4)
		expect(recalc.currentExp).toBe(45)
	})

})