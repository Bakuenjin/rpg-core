import { RequirementFulfilledInfo } from "../../utils/types";
import Character from "../character/Character";
import Identifiable from "../misc/Identifiable";
import IRequirement from "./IRequirement";

export default class CraftingRecipe<T> extends Identifiable {

	public readonly result: T
	private _requirements: IRequirement[]

	constructor(id: number, name: string, result: T, requirements: IRequirement[]) {
		super(id, name)
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