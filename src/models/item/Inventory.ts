import InventoryUtils from "../../utils/InventoryUtils";
import { InventoryItemInfo } from "../../utils/types";
import InventorySortType from "./InventorySortType";
import Item from "./Item";

export default class Inventory {

	private _content: Map<Item, number>

	constructor(content?: Map<Item, number>) {
		if (content)
			this._content = new Map<Item, number>(content)
		else this._content = new Map<Item, number>()
	}

	asArray(sortType: InventorySortType = InventorySortType.None): InventoryItemInfo[] {
		return InventoryUtils.sort(this._content, sortType)
	}

	getItems(): Map<Item, number> {
		return new Map<Item, number>(this._content)
	}

	getItemAmount(item: Item): number {
		const amount = this._content.get(item)
		return amount ? amount : 0
	}

	has(item: Item): boolean {
		return this.getItemAmount(item) > 0
	}

	hasAmount(item: Item, amount: number): boolean {
		return this.getItemAmount(item) >= amount
	}

	add(item: Item, amount: number): number {
		if (amount <= 0)
			return this.getItemAmount(item)
		
		const currentAmount = this.getItemAmount(item)
		const newAmount = currentAmount + amount

		this._content.set(item, newAmount)
		return newAmount
	}

	remove(item: Item, amount: number): number {
		if (amount <= 0)
			return this.getItemAmount(item)

		const currentAmount = this.getItemAmount(item)
		const newAmount = currentAmount - amount

		if (newAmount > 0) {
			this._content.set(item, newAmount)
			return newAmount
		}
		else this._content.delete(item)
		return 0
	}

	merge(inv: Inventory): void {
		inv._content.forEach((amount, item) => {
			this.add(item, amount)
		})
	}

}