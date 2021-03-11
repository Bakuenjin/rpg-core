import { AttributeInfo } from "../../utils/types";
import Attribute from "../misc/Attribute";

export default class CharacterStats {

	private _attributes: Map<Attribute, AttributeInfo>

	constructor(attributes?: Map<Attribute, AttributeInfo>) {
		if (attributes)
			this._attributes = new Map<Attribute, AttributeInfo>(attributes)
		else this._attributes = new Map<Attribute, AttributeInfo>()
	}

	increase(attribute: Attribute): AttributeInfo {
		const info = this._attributes.get(attribute)

		const newInfo: AttributeInfo = info ?
			{ level: info.level + 1, value: info.value + attribute.getIncreaseRate(info.level + 1) } :
			{ level: 1, value: attribute.getIncreaseRate(1) }

		this._attributes.set(attribute, newInfo)
		return { ...newInfo }
	}

	getAttributeInfo(attribute: Attribute): AttributeInfo {
		const attrInfo = this._attributes.get(attribute)

		return attrInfo ? attrInfo : { level: 0, value: 0 }
	}

	getAttributeInfos(): Map<Attribute, AttributeInfo> {
		const clonedMap = new Map<Attribute, AttributeInfo>()
		this._attributes.forEach((info, attr) => {
			clonedMap.set(attr, { ...info })
		})
		return clonedMap
	}
	getAttributeValues(): Map<Attribute, number> {
		const attributeValues = new Map<Attribute, number>()
		this._attributes.forEach((info, attribute) => {
			attributeValues.set(attribute, info.value)
		})

		return attributeValues
	}

}