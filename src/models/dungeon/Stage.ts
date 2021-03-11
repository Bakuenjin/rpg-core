import { Reward } from "../../utils/types";
import Enemy from "./Enemy";
import RewardHandler from "./RewardHandler";

export default class Stage {

	private _enemies: Enemy[]
	private _rewardHandler: RewardHandler

	constructor(enemies: Enemy[], rewardHandler: RewardHandler) {
		this._enemies = [ ...enemies ]
		this._rewardHandler = rewardHandler
	}

	getEnemies(): Enemy[] {
		return [ ...this._enemies ]
	}

	getReward(): Reward {
		return this._rewardHandler.generateReward()
	}

}