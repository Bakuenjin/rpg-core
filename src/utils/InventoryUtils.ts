import InventorySortType from "../models/item/InventorySortType";
import Item from "../models/item/Item";
import { InventoryItemInfo, InventorySorter } from "./types";

const INVENTORY_SORTER: InventorySorter = {
	None: () => 0,
	Alphabetical: (a, b) => a.item.name.localeCompare(b.item.name),
	ReverseAlphabetical: (a, b) => b.item.name.localeCompare(a.item.name),
	AmountIncrease: (a, b) => a.amount - b.amount,
	AmountDecrease: (a, b) => b.amount - a.amount,
	RarityIncrease: (a, b) => a.item.rarity - b.item.rarity,
	RarityDecrease: (a, b) => b.item.rarity - a.item.rarity
}

class InventoryUtils {

	sort(inventoryContent: Map<Item, number>, type: InventorySortType): InventoryItemInfo[] {
		const items: InventoryItemInfo[] = Array.from(inventoryContent, ([item, amount]) => ({ item, amount }))
		return items.sort(INVENTORY_SORTER[type])
	}

}

export default new InventoryUtils()