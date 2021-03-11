import Attribute from "../misc/Attribute";
import Item from "../item/Item";
import WeaponType from "./WeaponType";
import ElementType from "../misc/ElementType";
import Rarity from "../item/Rarity";

export default class Weapon extends Item {

	public readonly type: WeaponType
	public readonly element: ElementType

	private _attributes: Map<Attribute, number>

	constructor(id: number, name: string, rarity: Rarity, type: WeaponType, element: ElementType, attributes: Map<Attribute, number>) {
		super(id, name, rarity)

		this.type = type
		this.element = element
		this._attributes = new Map<Attribute, number>(attributes)
	}

	getAttributes(): Map<Attribute, number> {
		return new Map<Attribute, number>(this._attributes)
	}

}