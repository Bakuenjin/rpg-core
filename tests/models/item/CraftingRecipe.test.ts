import { Character, CraftingRecipe, ElementType, IRequirement, Rarity, Weapon, WeaponType } from "../../../src"
import LevelRequirement from "./LevelRequirement"

describe('CraftingRecipe class', () => {

	let weapon: Weapon
	let levelReq: IRequirement
	let recipe: CraftingRecipe<Weapon>
	let char1: Character
	let char2: Character

	beforeAll(() => {
		weapon = new Weapon(1, 'a', Rarity.Common, WeaponType.Sword, ElementType.Fire, new Map())
		levelReq = new LevelRequirement(12)
		recipe = new CraftingRecipe(1, 'a-recipe', weapon, [ levelReq ])

		// It is not a real Character instance,
		// but implements enough for this purpose
		char1 = <Character>{ getLevelInfo: () => ({ level: 11 }) }
		char2 = <Character>{ getLevelInfo: () => ({ level: 12 }) }
	})

	it('uses generics to be all purpose', () => {
		expect(recipe.result instanceof Weapon).toBe(true)
	})

	it('can check if a character fulfills the requirements', () => {
		expect(recipe.isFulfilled(char1)).toBe(false)
		expect(recipe.isFulfilled(char2)).toBe(true)
	})

	it('gives info regarding requirements', () => {
		const reqInfo1 = recipe.getFulfilledInfo(char1)
		const reqInfo2 = recipe.getFulfilledInfo(char2)

		expect(reqInfo1[0].info).toBe(levelReq.getInfo())
		expect(reqInfo2[0].info).toBe(levelReq.getInfo())

		expect(reqInfo1[0].isFulfilled).toBe(levelReq.isFulfilled(char1))
		expect(reqInfo2[0].isFulfilled).toBe(levelReq.isFulfilled(char2))
	})

	it('can craft, which can alter the character', () => {
		expect(recipe.craft(char1)).toBe(false)
		expect(recipe.craft(char2)).toBe(true)
	})

})