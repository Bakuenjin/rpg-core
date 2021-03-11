import { Attribute, Dungeon, ElementType, Enemy, Item, Rarity, RewardHandler, Stage } from "../../../src"

describe('Dungeon class', () => {

	let item: Item
	let rewardHandler: RewardHandler
	let enemy1: Enemy
	let enemy2: Enemy
	let enemy3: Enemy
	let stage1: Stage
	let stage2: Stage
	let stage3: Stage
	let dungeon: Dungeon

	beforeAll(() => {
		item = new Item(1, 'item', Rarity.Common)
		rewardHandler = new RewardHandler({
			loot: [ { item: item, weight: 5 } ],
			lootAmount: 2,
			balance: 42,
			experience: 69
		})

		enemy1 = new Enemy({
			id: 1, name: 'fire enemy', element: ElementType.Fire,
			level: 10, attributes: new Map<Attribute, number>(),
			rewardHandler: rewardHandler
		})
		
		enemy2 = new Enemy({
			id: 3, name: 'fire enemy', element: ElementType.Fire,
			level: 12, attributes: new Map<Attribute, number>(),
			rewardHandler: rewardHandler
		})

		enemy3 = new Enemy({
			id: 2, name: 'water enemy', element: ElementType.Water,
			level: 15, attributes: new Map<Attribute, number>(),
			rewardHandler: rewardHandler
		})

		stage1 = new Stage([ enemy1 ], rewardHandler)
		stage2 = new Stage([ enemy1, enemy2 ], rewardHandler)
		stage3 = new Stage([ enemy3 ], rewardHandler)

		dungeon = new Dungeon({
			id: 1, name: 'dungeon',
			rewardHandler: rewardHandler,
			stages: [ stage1, stage2, stage3 ]
		})
	})

	it('has specific dungeon properties', () => {
		expect(dungeon.id).toBe(1)
		expect(dungeon.name).toBe('dungeon')
	})

	it('can return the list of stages', () => {
		const stages = dungeon.getStages()
		expect(stages.length).toBe(3)
		expect(stages[0]).toBe(stage1)
		expect(stages[1]).toBe(stage2)
		expect(stages[2]).toBe(stage3)
	})

	it('can return a list of enemies that are included in the dungeon', () => {
		const enemyPool = dungeon.getEnemyPool()
		expect(enemyPool.length).toBe(3)
	})

	it('can return a list of elements that are included in the dungeon', () => {
		const elements = dungeon.getElements()
		expect(elements.length).toBe(2)
	})

	it('can give out rewards', () => {
		const reward = dungeon.getReward()
		const invLength = reward.inventory.asArray().reduce((p, c) => p + c.amount, 0)

		expect(invLength).toBe(2)
		expect(reward.balance).toBe(42)
		expect(reward.experience).toBe(69)
	})

})