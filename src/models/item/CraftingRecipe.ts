import { RequirementFulfilledInfo } from "../../utils/types";
import Character from "../character/Character";
import Identifiable from "../misc/Identifiable";
import IRequirement from "./IRequirement";

export default class CraftingRecipe<T> implements Identifiable {

	public readonly id: number
	public readonly result: T
	private _requirements: IRequirement[]

	constructor(id: number, result: T, requirements: IRequirement[]) {
		this.id = id
		this.result = result
		this._requirements = requirements
	}

	getFulfilledInfo(char: Character): RequirementFulfilledInfo[] {
		return this._requirements.map(req => ({
			info: req.getInfo(),
			isFulfilled: req.isFulfilled(char)
		}))
	}

	isFulfilled(char: Character): boolean {
		return this._requirements.every(req => req.isFulfilled(char))
	}

	craft(char: Character): boolean {
		return this._requirements.every(req => req.apply(char))
	}

}