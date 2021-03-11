import { Character, IRequirement } from "../../../src";

export default class LevelRequirement implements IRequirement {

	private _level: number

	constructor(level: number) {
		this._level = level
	}

	getInfo(): string {
		return `Level: ${this._level}`
	}

	isFulfilled(char: Character): boolean {
		const charLevel = char.getLevelInfo().level
		return charLevel >= this._level
	}

	apply(char: Character): boolean {
		return this.isFulfilled(char)
	}

}