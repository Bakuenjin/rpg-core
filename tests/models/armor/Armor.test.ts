import { Armor, ArmorType, Attribute, ElementType, Rarity } from "../../../src"

describe('Armor class', () => {

	let defAttribute: Attribute
	let attributes: Map<Attribute, number>
	let armor: Armor

	beforeAll(() => {
		defAttribute = new Attribute(1, 'DEF', 10, 2)
		attributes = new Map<Attribute, number>()
		attributes.set(defAttribute, 10)
		armor = new Armor(10, 'a', Rarity.Rare, ArmorType.Helmet, ElementType.Nature, attributes)
	})

	it('has specific armor properites', () => {
		expect(armor.id).toBe(10)
		expect(armor.name).toBe('a')
		expect(armor.rarity).toBe(Rarity.Rare)
		expect(armor.type).toBe(ArmorType.Helmet)
		expect(armor.element).toBe(ElementType.Nature)
	})

	it('has attributes', () => {
		const armorAttributes = armor.getAttributes()
		expect(armorAttributes.get(defAttribute)).toBe(10)
	})

})