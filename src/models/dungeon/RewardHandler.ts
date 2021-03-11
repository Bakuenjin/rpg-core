import Item from "../item/Item";
import { NumberRange, Reward, RewardHandlerOptions } from "../../utils/types";
import LootTable from "./LootTable";
import RngUtils from "../../utils/RngUtils";
import Inventory from "../item/Inventory";

export default class RewardHandler {

	private _loot: LootTable | Map<Item, number>
	private _lootAmount: number | NumberRange
	private _balance: number | NumberRange
	private _experience: number | NumberRange

	constructor(options: RewardHandlerOptions) {
		this._loot = Array.isArray(options.loot) ?
			new LootTable(options.loot) :
			new Map<Item, number>(options.loot)

		this._lootAmount = typeof options.lootAmount === 'number' ?
			options.lootAmount : { ...options.lootAmount }

		this._balance = typeof options.balance === 'number' ?
			options.balance : { ...options.balance }

		if (options.experience)
			this._experience = typeof options.experience === 'number' ?
				options.experience : { ...options.experience }
		else this._experience = 0
	}

	generateReward(): Reward {
		const lootAmount = typeof this._lootAmount === 'number' ?
			this._lootAmount :
			RngUtils.integer(this._lootAmount.min, this._lootAmount.max)

		const inventory = this._loot instanceof LootTable ?
			new Inventory(this._loot.choose(lootAmount)) :
			new Inventory(this._loot)

		const balance = typeof this._balance === 'number' ?
			this._balance :
			RngUtils.integer(this._balance.min, this._balance.max)

		const experience = typeof this._experience === 'number' ?
			this._experience :
			RngUtils.integer(this._experience.min, this._experience.max)

		return { inventory, balance, experience }
	}

}