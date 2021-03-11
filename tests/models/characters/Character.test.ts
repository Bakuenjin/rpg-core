import { Armor, ArmorType, Attribute, Character, ElementType, Equipment, Inventory, Item, Rarity, Weapon, WeaponType } from "../../../src"
import { AttributeInfo } from "../../../src/utils/types"

describe('Character class', () => {

	const atkAttribute: Attribute = new Attribute(1, 'ATK', 1)
	const defAttribute: Attribute = new Attribute(2, 'DEF', 2)
	const hpAttribute: Attribute = new Attribute(3, 'HP', '50*x')

	const weaponAttributes: Map<Attribute, number> = new Map<Attribute, number>()
	const armorAttributes: Map<Attribute, number> = new Map<Attribute, number>()
	const baseAttributes: Map<Attribute, AttributeInfo> = new Map<Attribute, AttributeInfo>()

	weaponAttributes.set(atkAttribute, 20)
	armorAttributes.set(atkAttribute, 5)
	armorAttributes.set(defAttribute, 25)
	baseAttributes.set(atkAttribute, { level: 5, value: 50 })
	baseAttributes.set(defAttribute, { level: 3, value: 40 })
	baseAttributes.set(hpAttribute, { level: 10, value: 250 })

	const weapon1: Weapon = new Weapon(1, 'weapon1', Rarity.Common, WeaponType.Bow, ElementType.Fire, weaponAttributes)
	const weapon2: Weapon = new Weapon(2, 'weapon2', Rarity.Uncommon, WeaponType.Sword, ElementType.Nature, weaponAttributes)
	const weapon3: Weapon = new Weapon(3, 'weapon3', Rarity.Uncommon, WeaponType.Sword, ElementType.Nature, weaponAttributes)
	
	const armor1: Armor = new Armor(1, 'armor1', Rarity.Epic, ArmorType.Boot, ElementType.Nature, armorAttributes)
	const armor2: Armor = new Armor(2, 'armor2', Rarity.Rare, ArmorType.Boot, ElementType.Water, armorAttributes)
	const armor3: Armor = new Armor(3, 'armor3', Rarity.Rare, ArmorType.Boot, ElementType.Water, armorAttributes)

	const currentArmor: Map<ArmorType, Armor> = new Map<ArmorType, Armor>()
	currentArmor.set(armor1.type, armor1)

	const item1: Item = new Item(1, 'item1', Rarity.Common)
	const item2: Item = new Item(2, 'item2', Rarity.Legendary)
	const invContent: Map<Item, number> = new Map<Item, number>()
	invContent.set(item1, 4)
	invContent.set(item2, 9)

	let character: Character

	beforeEach(() => {
		character = new Character({
			id: 1, name: 'Char1', level: 10, experience: 50,
			attributes: baseAttributes, skillPoints: 2,
			balance: 1500, inventory: invContent,
			weapons: [ weapon1, weapon2, weapon3 ],
			armors: [ armor1, armor2, armor3 ],
			currentWeapon: weapon1,
			currentArmor: currentArmor
		})
	})

	it('can be created with alot of omitted option values', () => {
		const anotherChar = new Character({
			id: 2, name: 'Char2',
			weapons: [ weapon1, weapon2, weapon3 ],
			armors: [ armor1, armor2, armor3 ],
			currentWeapon: weapon1,
			currentArmor: currentArmor
		})

		const levelInfo = anotherChar.getLevelInfo()
		expect(levelInfo.level).toBe(1)
		expect(levelInfo.currentExp).toBe(0)
		expect(anotherChar.getAvailableSkillPoints()).toBe(0)
	})

	it('has specific public properties', () => {
		expect(character.id).toBe(1)
		expect(character.name).toBe('Char1')
		expect(character.inventory).toBeInstanceOf(Inventory)
		expect(character.equipment).toBeInstanceOf(Equipment)
	})

	it('can return detailed level info', () => {
		const levelInfo = character.getLevelInfo()

		expect(levelInfo.level).toBe(10)
		expect(levelInfo.currentExp).toBe(50)
	})

	it('can add character exp', () => {
		const levelInfo = character.addExperience(50)

		expect(levelInfo.level).toBe(10)
		expect(levelInfo.currentExp).toBe(100)
	})

	it('can increase the level by adding character exp, which results in an additional skill point', () => {
		expect(character.getAvailableSkillPoints()).toBe(2)

		const levelInfo = character.addExperience(1000)
		expect(levelInfo.level).toBe(11)
		expect(levelInfo.currentExp).toBe(10)
		expect(character.getAvailableSkillPoints()).toBe(3)
	})

	it('can apply a skill point to a specific attribute', () => {
		const attributes = character.getCharacterStats()
		const hpAttributeInfo = attributes.get(hpAttribute)

		if (!hpAttributeInfo)
			fail('HP Attribute is not defined.')
		
		expect(hpAttributeInfo.level).toBe(10)
		expect(hpAttributeInfo.value).toBe(250)
	})

	it('can only apply a skill point if there is at least one available', () => {
		expect(character.getAvailableSkillPoints()).toBe(2)
		character.applySkillPoint(hpAttribute)
		character.applySkillPoint(hpAttribute)
		expect(character.getAvailableSkillPoints()).toBe(0)

		const attributes1 = character.getCharacterStats()
		const hpAttributeInfo1 = attributes1.get(hpAttribute)

		if (!hpAttributeInfo1)
			fail('HP Attribute is not defined.')

		character.applySkillPoint(hpAttribute)

		const attributes2 = character.getCharacterStats()
		const hpAttributeInfo2 = attributes1.get(hpAttribute)

		if (!hpAttributeInfo2)
			fail('HP Attribute is not defined.')

		expect(hpAttributeInfo1.level).toBe(hpAttributeInfo2.level)
		expect(hpAttributeInfo1.value).toBe(hpAttributeInfo2.value)
	})

	it('can show its current balance', () => {
		expect(character.getBalance()).toBe(1500)
	})

	it('can add balance', () => {
		expect(character.getBalance()).toBe(1500)
		expect(character.addToBalance(500)).toBe(2000)
	})

	it('can only add positive numbers to the current balance', () => {
		expect(character.getBalance()).toBe(1500)
		expect(character.addToBalance(-500)).toBe(1500)
	})

	it('floors float amount values when adding to balance', () => {
		expect(character.getBalance()).toBe(1500)
		expect(character.addToBalance(500.99)).toBe(2000)
	})

	it('can remove balance', () => {
		expect(character.getBalance()).toBe(1500)
		expect(character.removeFromBalance(500)).toBe(1000)
	})

	it('can only remove positive numbers from the current balance', () => {
		expect(character.getBalance()).toBe(1500)
		expect(character.removeFromBalance(-500)).toBe(1500)
	})

	it('floors float amount values when removing from balance', () => {
		expect(character.getBalance()).toBe(1500)
		expect(character.removeFromBalance(500.99)).toBe(1000)
	})

	it('sets balance to 0 when the amount removed results in negative balance', () => {
		expect(character.getBalance()).toBe(1500)
		expect(character.removeFromBalance(2000)).toBe(0)
	})

})