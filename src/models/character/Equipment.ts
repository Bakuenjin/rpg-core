import Armor from "../armor/Armor";
import ArmorType from "../armor/ArmorType";
import Attribute from "../misc/Attribute";
import Weapon from "../weapon/Weapon";

export default class Equipment {

	private _weapons: Weapon[]
	private _armors: Armor[]

	private _currentWeapon: Weapon
	private _currentArmor: Map<ArmorType, Armor>

	constructor(weapons: Weapon[], armors: Armor[], currentWeapon: Weapon, currentArmor: Map<ArmorType, Armor>) {
		this._weapons = weapons
		this._armors = armors
		this._currentWeapon = currentWeapon
		this._currentArmor = new Map<ArmorType, Armor>(currentArmor)
	}

	getCurrentAttributes(): Map<Attribute, number> {
		const attributes = this._currentWeapon.getAttributes()

		this._currentArmor.forEach((armor) => {
			const armorAttributes = armor.getAttributes()
			armorAttributes.forEach((value, attribute) => {
				const currentValue = attributes.get(attribute)
				const newValue = currentValue ? currentValue + value : value
				attributes.set(attribute, newValue)
			})
		})
		
		return attributes
	}

	getWeapons(): Weapon[] {
		return [ ...this._weapons ]
	}

	getArmors(): Armor[] {
		return [ ...this._armors ]
	}

	getCurrentWeapon(): Weapon {
		return this._currentWeapon
	}

	getCurrentArmor(): Map<ArmorType, Armor> {
		return new Map<ArmorType, Armor>(this._currentArmor)
	}

	setCurrentWeapon(weapon: Weapon): boolean {
		if (this._weapons.includes(weapon)) {
			this._currentWeapon = weapon
			return true
		}
		
		return false
	}

	setCurrentArmor(armor: Armor): boolean {
		if (this._armors.includes(armor)) {
			this._currentArmor.set(armor.type, armor)
			return true
		}

		return false
	}

	addWeapon(weapon: Weapon, setAsCurrentWeapon: boolean = false): void {
		this._weapons.push(weapon)

		if (setAsCurrentWeapon)
			this._currentWeapon = weapon
	}

	removeWeapon(weapon: Weapon): boolean {
		if (this._currentWeapon === weapon)
			return false

		const index = this._weapons.findIndex(ownedWeapon => ownedWeapon === weapon)

		if (index >= 0) {
			this._weapons.splice(index, 1)
			return true
		}

		return false
	}

	addArmor(armor: Armor, setAsCurrentArmor: boolean = false): void {
		this._armors.push(armor)

		if (setAsCurrentArmor)
			this._currentArmor.set(armor.type, armor)
	}

	removeArmor(armor: Armor): boolean {
		if (this._currentArmor.get(armor.type) === armor)
			return false

		const index = this._armors.findIndex(ownedArmor => ownedArmor === armor)

		if (index >= 0) {
			this._armors.splice(index, 1)
			return true
		}

		return false
	}

}