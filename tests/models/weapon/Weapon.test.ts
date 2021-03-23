import { Attribute, ElementType, Rarity, Weapon, WeaponType } from "../../../src"

describe('Weapon class', () => {

	let atkAttribute: Attribute
	let attributes: Map<Attribute, number>
	let weapon: Weapon

	beforeAll(() => {
		atkAttribute = new Attribute(1, 'ATK', 10, 2)
		attributes = new Map<Attribute, number>()
		attributes.set(atkAttribute, 10)
		weapon = new Weapon(10, 'w', Rarity.Epic, WeaponType.Bow, ElementType.None, attributes)
	})

	it('has specific weapon properties', () => {
		expect(weapon.id).toBe(10)
		expect(weapon.name).toBe('w')
		expect(weapon.rarity).toBe(Rarity.Epic)
		expect(weapon.type).toBe(WeaponType.Bow)
		expect(weapon.element).toBe(ElementType.None)
	})

	it('has attributes', () => {
		const weaponAttributes = weapon.getAttributes()
		expect(weaponAttributes.get(atkAttribute)).toBe(10)
	})

})