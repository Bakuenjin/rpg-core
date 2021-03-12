import AttributeUtils from '../../utils/AttributeUtils'
import Identifiable from './Identifiable'

export default class Attribute implements Identifiable {

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