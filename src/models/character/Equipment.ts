import { EquipmentOptions } from "../../utils/types";
import Armor from "../armor/Armor";
import ArmorType from "../armor/ArmorType";
import Attribute from "../misc/Attribute";
import Weapon from "../weapon/Weapon";

export default class Equipment {

	private _weapons: Weapon[]
	private _armors: Armor[]

	private _currentWeapon?: Weapon
	private _currentArmor: Map<ArmorType, Armor>

	constructor(options?: EquipmentOptions) {
		if (!options) options = {}

		this._weapons = options.weapons ? [ ...options.weapons ] : []
		this._armors = options.armors ? [ ...options.armors ] : []
		this._currentWeapon = options.currentWeapon
		this._currentArmor = options.currentArmor ?
			new Map<ArmorType, Armor>(options.currentArmor) :
			new Map<ArmorType, Armor>()
	}

	getCurrentAttributes(): Map<Attribute, number> {
		const attributes = this._currentWeapon ?
			this._currentWeapon.getAttributes() :
			new Map<Attribute, number>()

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

	getCurrentWeapon(): Weapon | undefined {
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

	unsetCurrentWeapon(): void {
		this._currentWeapon = undefined
	}

	unsetCurrentArmor(type?: ArmorType): void {
		if (!type)
			this._currentArmor = new Map<ArmorType, Armor>()
		else
			this._currentArmor.delete(type)
	}

	addWeapon(weapon: Weapon, setAsCurrentWeapon: boolean = false): void {
		this._weapons.push(weapon)

		if (setAsCurrentWeapon)
			this._currentWeapon = weapon
	}

	removeWeapon(weapon: Weapon): boolean {
		if (this._currentWeapon === weapon)
			this.unsetCurrentWeapon()

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
			this.unsetCurrentArmor(armor.type)

		const index = this._armors.findIndex(ownedArmor => ownedArmor === armor)

		if (index >= 0) {
			this._armors.splice(index, 1)
			return true
		}

		return false
	}

}