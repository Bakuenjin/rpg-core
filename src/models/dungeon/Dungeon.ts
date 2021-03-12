import ElementType from "../misc/ElementType"
import { DungeonOptions, Reward } from "../../utils/types"
import Enemy from "./Enemy"
import RewardHandler from "./RewardHandler"
import Stage from "./Stage"
import Identifiable from "../misc/Identifiable"

export default class Dungeon implements Identifiable {
	
	public readonly id: number
	public readonly name: string
	
	private _rewardHandler: RewardHandler
	private _stages: Stage[]
	private _elements: ElementType[]
	private _enemyPool: Enemy[]

	constructor(options: DungeonOptions) {
		this.id = options.id
		this.name = options.name
		this._rewardHandler = options.rewardHandler
		this._stages = [ ...options.stages ]
		this._elements = []
		this._enemyPool = []

		for (const stage of this._stages) {
			for (const stageEnemy of stage.getEnemies()) {
				if (this._enemyPool.every(enemy => enemy.id !== stageEnemy.id))
					this._enemyPool.push(stageEnemy)
				if (this._elements.every(element => element !== stageEnemy.element))
					this._elements.push(stageEnemy.element)
			}
		}
	}

	getStages(): Stage[] {
		return [ ...this._stages ]
	}

	getEnemyPool(): Enemy[] {
		return [ ...this._enemyPool ]
	}

	getElements(): ElementType[] {
		return [ ...this._elements ]
	}

	getReward(): Reward {
		return this._rewardHandler.generateReward()
	}

}