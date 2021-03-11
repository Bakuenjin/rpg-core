import Character from "../character/Character";

export default interface IRequirement {

	getInfo(): string
	isFulfilled(char: Character): boolean
	apply(char: Character): boolean

}