import AttributeUtils from '../../utils/AttributeUtils'
import Identifiable from './Identifiable'

export default class Attribute implements Identifiable {

	public readonly id: number
	public readonly name: string
	
	private _baseValue: number
	private _increaseRate: number | string

	constructor(id: number, name: string, baseValue: number, increaseRate: number | string) {
		this.id = id
		this.name = name
		this._baseValue = baseValue
		this._increaseRate = increaseRate
	}

	getIncreaseRate(level: number): number {
		if (level < 1) return 0
		if (level === 1) return this._baseValue

		return typeof this._increaseRate === 'string' ?
			AttributeUtils.evaluateIncreaseRateExpression(this._increaseRate, level) :
			this._increaseRate
	}

}