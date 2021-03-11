import { BasicLevelInfo } from './types'

class LevelUtils {

	calculateAllExp(level: number, currentExp: number): number {
		let sum = currentExp

		for (let i = 1; i < level; i++)
			sum += this.expToReachNextLevel(i)			
		
		return sum
	}

	expToReachNextLevel(level: number): number {
		return 10 * Math.pow(level, 2) + 40
	}

	hasLevelUp(level: number, currentExp: number): boolean {
		return this.expToReachNextLevel(level) <= currentExp
	}

	recalculateLevelAndCurrentExp(level: number, currentExp: number): BasicLevelInfo {
		while (this.hasLevelUp(level, currentExp)) {
			currentExp -= this.expToReachNextLevel(level)
			level++
		}

		return { level, currentExp }
	}

}

export default new LevelUtils()