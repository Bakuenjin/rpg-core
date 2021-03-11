import { Attribute, CharacterStats } from "../../../src"
import { AttributeInfo } from "../../../src/utils/types"

describe('CharacterStats class', () => {

	const atkAttribute: Attribute = new Attribute(1, 'ATK', '2*x')
	const defAttribute: Attribute = new Attribute(2, 'DEF', 'x')
	const hpAttribute: Attribute = new Attribute(3, 'HP', '10*x')
	const attributes = new Map<Attribute, AttributeInfo>()
	attributes.set(atkAttribute, { level: 1, value: atkAttribute.getIncreaseRate(1) })
	attributes.set(defAttribute, { level: 1, value: defAttribute.getIncreaseRate(1) })

	let stats: CharacterStats

	beforeEach(() => {
		stats = new CharacterStats(attributes)
	})

	it('defaults to an empty attribute map, when no constructor param is defined', () => {
		const emptyStats = new CharacterStats()
		expect(emptyStats.getAttributeInfos().size).toBe(0)
	})

	it('can increase attributes, that aren\'t part of the stats yet', () => {
		expect(stats.getAttributeInfos().get(hpAttribute)).toBeUndefined()
		stats.increase(hpAttribute)
		expect(stats.getAttributeValues().get(hpAttribute)).toBe(10)
	})

	it('can return attribute info for a single attribute', () => {
		const atkAttr = stats.getAttributeInfo(atkAttribute)
		expect(atkAttr.level).toBe(1)
		expect(atkAttr.value).toBe(2)
	})

	it('returns zero\'d attribute info obj when the attribute is not part of the stats yet', () => {
		const hpAttr = stats.getAttributeInfo(hpAttribute)
		expect(hpAttr.level).toBe(0)
		expect(hpAttr.value).toBe(0)
	})

	it('returns attribute info map', () => {
		const attributeInfos = stats.getAttributeInfos()
		const atkAttrInfo = attributeInfos.get(atkAttribute)
		const defAttrInfo = attributeInfos.get(defAttribute)
		
		if (!atkAttrInfo)
			fail('ATK Attribute is not defined.')

		if (!defAttrInfo)
			fail('DEF Attribute is not defined.')
			
		expect(atkAttrInfo.level).toBe(1)
		expect(atkAttrInfo.value).toBe(2)
		expect(defAttrInfo.level).toBe(1)
		expect(defAttrInfo.value).toBe(1)
	})

	it('returns attribute value map', () => {
		const attributeValues = stats.getAttributeValues()
		expect(attributeValues.get(atkAttribute)).toBe(2)
		expect(attributeValues.get(defAttribute)).toBe(1)
	})

	it('allows to increase attribute values', () => {
		const attributeValues = stats.getAttributeValues()
		expect(attributeValues.get(atkAttribute)).toBe(2)
		expect(attributeValues.get(defAttribute)).toBe(1)

		stats.increase(atkAttribute)
		stats.increase(defAttribute)

		const attributeInfos = stats.getAttributeInfos()
		const atkAttrInfo = attributeInfos.get(atkAttribute)
		const defAttrInfo = attributeInfos.get(defAttribute)
		
		if (!atkAttrInfo)
			fail('ATK Attribute is not defined.')

		if (!defAttrInfo)
			fail('DEF Attribute is not defined.')
			
		expect(atkAttrInfo.level).toBe(2)
		expect(atkAttrInfo.value).toBe(6)
		expect(defAttrInfo.level).toBe(2)
		expect(defAttrInfo.value).toBe(3)
	})

})