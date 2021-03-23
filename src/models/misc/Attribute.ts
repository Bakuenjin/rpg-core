import AttributeUtils from '../../utils/AttributeUtils'
import Identifiable from './Identifiable'

export default class Attribute extends Identifiable {
	
	private _baseValue: number
	private _increaseRate: number | string

	constructor(id: number, name: string, baseValue: number, increaseRate: number | string) {
		super(id, name)
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