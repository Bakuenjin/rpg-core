import { EnemyOptions, Reward } from "../../utils/types"
import Attribute from "../misc/Attribute"
import ElementType from "../misc/ElementType"
import Identifiable from "../misc/Identifiable"
import RewardHandler from "./RewardHandler"

export default class Enemy extends Identifiable {

	public readonly element: ElementType
	public readonly level: number
	
	private _attributes: Map<Attribute, number>
	private _rewardHandler: RewardHandler

	constructor(options: EnemyOptions) {
		super(options.id, options.name)
		this.element = options.element
		this.level = options.level

		this._attributes = new Map<Attribute, number>(options.attributes)
		this._rewardHandler = options.rewardHandler
	}

	getAttributes(): Map<Attribute, number> {
		return new Map<Attribute, number>(this._attributes)
	}

	getReward(): Reward {
		return this._rewardHandler.generateReward()
	}

}