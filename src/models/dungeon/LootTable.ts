import RngUtils from "../../utils/RngUtils"
import { ItemDropChance } from "../../utils/types"
import Item from "../item/Item"

export default class LootTable {

	private _table: ItemDropChance[]
	private _totalWeight: number

	constructor(table: ItemDropChance[]) {
		this._table = [...table]
		this._totalWeight = this._table.reduce((p, c) => p + c.weight, 0)
	}

	private chooseOne(): Item {
		const randomNumber = RngUtils.integer(0, this._totalWeight) + 1
		let currentWeight = 0
		let item: Item = this._table[0].item

		for (const itemDrop of this._table) {
			currentWeight += itemDrop.weight
			if (randomNumber <= currentWeight) {
				item = itemDrop.item
				break
			}
		}
		
		return item
	}

	public choose(amount: number = 1): Map<Item, number> {
		const items = new Map<Item, number>()

		if (this._table.length < 1)
			return items

		let item: Item
		let quantity: number | undefined

		for (let i = 0; i < amount; i++) {
			item = this.chooseOne()
			quantity = items.get(item)
			
			if (quantity)
				items.set(item, quantity + 1)
			else items.set(item, 1)
		}

		return items
	}

}