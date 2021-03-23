import Identifiable from "../misc/Identifiable"
import Rarity from "./Rarity"

export default class Item extends Identifiable {

	public readonly rarity: Rarity

	constructor(id: number, name: string, rarity: Rarity) {
		super(id, name)
		this.rarity = rarity
	}

}