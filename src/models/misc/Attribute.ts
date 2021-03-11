import AttributeUtils from '../../utils/AttributeUtils'

export default class Attribute {

	public readonly id: number
	public readonly name: string

	private _increaseRate: number | string

	constructor(id: number, name: string, increaseRate: number | string) {
		this.id = id
		this.name = name
		this._increaseRate = increaseRate
	}

	getIncreaseRate(level: number): number {
		return typeof this._increaseRate === 'string' ?
			AttributeUtils.evaluateIncreaseRateExpression(this._increaseRate, level) :
			this._increaseRate
	}

}