import Item from "../item/Item"
import Rarity from "../item/Rarity"
import Attribute from "../misc/Attribute"
import ElementType from "../misc/ElementType"
import ArmorType from "./ArmorType"

export default class Armor extends Item {

	public readonly type: ArmorType
	public readonly element: ElementType

	private _attributes: Map<Attribute, number>

	constructor(id: number, name: string, rarity: Rarity, type: ArmorType, element: ElementType, attributes: Map<Attribute, number>) {
		super(id, name, rarity)

		this.type = type
		this.element = element
		this._attributes = new Map<Attribute, number>(attributes)
	}

	getAttributes(): Map<Attribute, number> {
		return new Map<Attribute, number>(this._attributes)
	}

}