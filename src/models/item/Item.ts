import Rarity from "./Rarity"

export default class Item {

	public readonly id: number
	public readonly name: string
	public readonly rarity: Rarity

	constructor(id: number, name: string, rarity: Rarity) {
		this.id = id
		this.name = name
		this.rarity = rarity
	}

}