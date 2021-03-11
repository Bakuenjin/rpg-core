import LevelUtils from "../../utils/LevelUtils"
import { AttributeInfo, CharacterOptions } from "../../utils/types"
import Inventory from "../item/Inventory"
import Attribute from "../misc/Attribute"
import CharacterStats from "./CharacterStats"
import Equipment from "./Equipment"
import LevelInfo from "./LevelInfo"

export default class Character {

	public readonly id: number
	public readonly name: string
	public inventory: Inventory
	public equipment: Equipment

	private _balance: number
	private _level: number
	private _experience: number
	private _stats: CharacterStats
	private _skillPoints: number

	constructor(options: CharacterOptions) {
		this.id = options.id
		this.name = options.name
		this._balance = options.balance ? options.balance : 0
		this._level = options.level ? options.level : 1
		this._experience = options.experience ? options.experience : 0
		this._skillPoints = options.skillPoints ? options.skillPoints : 0
		this._stats = new CharacterStats(options.attributes)

		this.inventory = new Inventory(options.inventory)
		this.equipment = new Equipment(options.weapons, options.armors, options.currentWeapon, options.currentArmor)
	}

	getLevelInfo(): LevelInfo {
		return new LevelInfo(this._level, this._experience)
	}

	addExperience(amount: number): LevelInfo {
		const { level, currentExp } = LevelUtils.recalculateLevelAndCurrentExp(this._level, this._experience + amount)

		if (this._level < level)
			this._skillPoints++

		this._level = level
		this._experience = currentExp
		return this.getLevelInfo()
	}

	getAvailableSkillPoints(): number {
		return this._skillPoints
	}

	getCharacterStats(): Map<Attribute, AttributeInfo> {
		return this._stats.getAttributeInfos()
	}

	applySkillPoint(attribute: Attribute): AttributeInfo {
		if (this._skillPoints > 0) {
			this._skillPoints--
			return this._stats.increase(attribute)
		}
		
		return this._stats.getAttributeInfo(attribute)
	}

	getBalance(): number {
		return this._balance
	}

	addToBalance(amount: number): number {
		if (amount <= 0)
			return this._balance

		this._balance += Math.floor(amount)
		return this._balance
	}

	removeFromBalance(amount: number): number {
		if (amount <= 0)
			return this._balance

		this._balance -= Math.floor(amount)

		if (this._balance < 0)
			this._balance = 0
		return this._balance
	}

}