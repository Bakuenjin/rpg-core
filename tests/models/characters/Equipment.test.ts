import { Armor, ArmorType, Attribute, ElementType, Equipment, Rarity, Weapon, WeaponType } from "../../../src"

describe('Equipment class', () => {

	const atkAttribute: Attribute = new Attribute(1, 'ATK', 10, 1)
	const defAttribute: Attribute = new Attribute(2, 'DEF', 5, 2)
	const weaponAttributes: Map<Attribute, number> = new Map<Attribute, number>()
	const armorAttributes: Map<Attribute, number> = new Map<Attribute, number>()

	weaponAttributes.set(atkAttribute, 20)
	armorAttributes.set(atkAttribute, 5)
	armorAttributes.set(defAttribute, 25)

	const weapon1: Weapon = new Weapon(1, 'weapon1', Rarity.Common, WeaponType.Bow, ElementType.Fire, weaponAttributes)
	const weapon2: Weapon = new Weapon(2, 'weapon2', Rarity.Uncommon, WeaponType.Sword, ElementType.Nature, weaponAttributes)
	const weapon3: Weapon = new Weapon(3, 'weapon3', Rarity.Uncommon, WeaponType.Sword, ElementType.Nature, weaponAttributes)

	const armor1: Armor = new Armor(1, 'armor1', Rarity.Epic, ArmorType.Boot, ElementType.Nature, armorAttributes)
	const armor2: Armor = new Armor(2, 'armor2', Rarity.Rare, ArmorType.Boot, ElementType.Water, armorAttributes)
	const armor3: Armor = new Armor(3, 'armor3', Rarity.Rare, ArmorType.Boot, ElementType.Water, armorAttributes)

	const currentArmor: Map<ArmorType, Armor> = new Map<ArmorType, Armor>()
	currentArmor.set(armor1.type, armor1)

	let equipment: Equipment
	let emptyEquipment: Equipment

	beforeEach(() => {
		// equipment = new Equipment([ weapon1, weapon2 ], [ armor1, armor2 ], weapon1, currentArmor)
		equipment = new Equipment({
			weapons: [ weapon1, weapon2 ],
			armors: [ armor1, armor2 ],
			currentWeapon: weapon1,
			currentArmor: currentArmor
		})

		emptyEquipment = new Equipment()
	})

	it('can calculate the sum of all attribute stats of the current weapon and armors', () => {
		const sumAttributes = equipment.getCurrentAttributes()

		expect(sumAttributes.get(atkAttribute)).toBe(25)
		expect(sumAttributes.get(defAttribute)).toBe(25)
	})

	it('has no attributes if the equipment is empty', () => {
		const sumAttributes = emptyEquipment.getCurrentAttributes()
		expect(sumAttributes.size).toBe(0)
	})

	it('can return all owned weapons', () => {
		const weapons = equipment.getWeapons()
		expect(weapons.length).toBe(2)
	})

	it('can return all owned armor', () => {
		const armors = equipment.getArmors()
		expect(armors.length).toBe(2)
	})

	it('can return the currently equipped weapon', () => {
		const currentWeapon = equipment.getCurrentWeapon()
		expect(currentWeapon).toBe(weapon1)
	})

	it('can return the currently equipped armor set', () => {
		const currentArmorSet = equipment.getCurrentArmor()
		expect(currentArmorSet.get(armor1.type)).toBe(armor1)
	})

	it('can set the current weapon', () => {
		expect(equipment.getCurrentWeapon()).toBe(weapon1)
		expect(equipment.setCurrentWeapon(weapon2)).toBe(true)
		expect(equipment.getCurrentWeapon()).toBe(weapon2)
	})

	it('cannot set the current weapon to an unowned weapon', () => {
		expect(equipment.getCurrentWeapon()).toBe(weapon1)
		expect(equipment.setCurrentWeapon(weapon3)).toBe(false)
		expect(equipment.getCurrentWeapon()).toBe(weapon1)
	})

	it('can set the current armor', () => {
		expect(equipment.getCurrentArmor().get(armor1.type)).toBe(armor1)
		expect(equipment.setCurrentArmor(armor2)).toBe(true)
		expect(equipment.getCurrentArmor().get(armor2.type)).toBe(armor2)
	})

	it('cannot set the current armor to an unowned armor', () => {
		expect(equipment.getCurrentArmor().get(armor1.type)).toBe(armor1)
		expect(equipment.setCurrentArmor(armor3)).toBe(false)
		expect(equipment.getCurrentArmor().get(armor1.type)).toBe(armor1)
	})

	it('can unset the current weapon', () => {
		expect(equipment.getCurrentWeapon()).toBe(weapon1)
		equipment.unsetCurrentWeapon()
		expect(equipment.getCurrentWeapon()).toBe(undefined)
	})

	it('can unset the complete current armor', () => {
		expect(equipment.getCurrentArmor().size).toBe(1)
		equipment.unsetCurrentArmor()
		expect(equipment.getCurrentArmor().size).toBe(0)
	})

	it('can unset a single armor piece from the current armor', () => {
		expect(equipment.getCurrentArmor().size).toBe(1)
		equipment.unsetCurrentArmor(armor1.type)
		expect(equipment.getCurrentArmor().size).toBe(0)
	})

	it('can add additional weapons to the list of owned weapons', () => {
		expect(equipment.getCurrentWeapon()).toBe(weapon1)
		expect(equipment.setCurrentWeapon(weapon3)).toBe(false)
		equipment.addWeapon(weapon3)
		expect(equipment.setCurrentWeapon(weapon3)).toBe(true)
		expect(equipment.getCurrentWeapon()).toBe(weapon3)
	})

	it('can set the added weapon directly as the current weapon', () => {
		equipment.addWeapon(weapon3, true)
		expect(equipment.getCurrentWeapon()).toBe(weapon3)
	})

	it('can remove a weapon from the list of owned weapons', () => {
		expect(equipment.removeWeapon(weapon2)).toBe(true)
		expect(equipment.setCurrentWeapon(weapon2)).toBe(false)
		expect(equipment.getCurrentWeapon()).toBe(weapon1)
	})

	it('cannot remove a weapon from the list of owned weapons, if it isnt owned', () => {
		expect(equipment.getWeapons().length).toBe(2)
		expect(equipment.removeWeapon(weapon3)).toBe(false)
		expect(equipment.getWeapons().length).toBe(2)
	})

	it('unsets the current weapon, if it is removed', () => {
		expect(equipment.getCurrentWeapon()).toBe(weapon1)
		expect(equipment.removeWeapon(weapon1)).toBe(true)
		expect(equipment.getCurrentWeapon()).toBeUndefined()
	})

	it('can add additional armor to the list of owned armor', () => {
		expect(equipment.getCurrentArmor().get(armor1.type)).toBe(armor1)
		expect(equipment.setCurrentArmor(armor3)).toBe(false)
		equipment.addArmor(armor3)
		expect(equipment.setCurrentArmor(armor3)).toBe(true)
		expect(equipment.getCurrentArmor().get(armor3.type)).toBe(armor3)
	})

	it('can set the added armor directly as the current armor', () => {
		equipment.addArmor(armor3, true)
		expect(equipment.getCurrentArmor().get(armor3.type)).toBe(armor3)
	})

	it('can remove armor from the list of owned armor', () => {
		expect(equipment.removeArmor(armor2)).toBe(true)
		expect(equipment.setCurrentArmor(armor2)).toBe(false)
		expect(equipment.getCurrentArmor().get(armor1.type)).toBe(armor1)
	})

	it('cannot remove armor from the list of owned armor, if it isnt owned', () => {
		expect(equipment.getArmors().length).toBe(2)
		expect(equipment.removeArmor(armor3)).toBe(false)
		expect(equipment.getArmors().length).toBe(2)
	})

	it('unsets current armor piece, if it is removed', () => {
		expect(equipment.getCurrentArmor().get(armor1.type)).toBe(armor1)
		expect(equipment.removeArmor(armor1)).toBe(true)
		expect(equipment.getCurrentArmor().get(armor1.type)).toBe(undefined)
	})

})