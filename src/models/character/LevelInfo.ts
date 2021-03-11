import LevelUtils from "../../utils/LevelUtils"

export default class LevelInfo {

	public readonly allExp: number
	public readonly levelExp: number
	public readonly currentExp: number
	public readonly level: number

	constructor(level: number, currentExp: number) {
		this.allExp = LevelUtils.calculateAllExp(level, currentExp)
		this.levelExp = LevelUtils.expToReachNextLevel(level)
		this.currentExp = currentExp
		this.level = level
	}

}