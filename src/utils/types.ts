import Armor from "../models/armor/Armor"
import ArmorType from "../models/armor/ArmorType"
import BaseEnemy from "../models/dungeon/Enemy"
import BaseStage from "../models/dungeon/Stage"
import Inventory from "../models/item/Inventory"
import InventorySortType from "../models/item/InventorySortType"
import Item from "../models/item/Item"
import Attribute from "../models/misc/Attribute"
import ElementType from "../models/misc/ElementType"
import Weapon from "../models/weapon/Weapon"
import IRewardHandler from "../models/dungeon/RewardHandler"
import Stage from "../models/dungeon/Stage"

export type BasicLevelInfo = {
	level: number
	currentExp: number
}

export type AttributeInfo = {
	readonly level: number
	readonly value: number
}

export type InventoryItemInfo = {
	item: Item,
	amount: number
}

export type InventorySortFunction = (a: InventoryItemInfo, b: InventoryItemInfo) => number

export type InventorySorter = {
	[key in keyof typeof InventorySortType]: InventorySortFunction
}

export type RequirementFulfilledInfo = {
	info: string
	isFulfilled: boolean
}

export type EquipmentOptions = {
	weapons?: Weapon[]
	armors?: Armor[]
	currentWeapon?: Weapon
	currentArmor?: Map<ArmorType, Armor>
}

export type CharacterOptions = {
	id: number
	name: string
	level?: number
	experience?: number
	attributes?: Map<Attribute, AttributeInfo>
	skillPoints?: number
	balance?: number
	inventory?: Map<Item, number>
	weapons: Weapon[]
	armors: Armor[]
	currentWeapon: Weapon
	currentArmor: Map<ArmorType, Armor>
}

export type ItemDropChance = {
    readonly item: Item;
    readonly weight: number;
}

export type NumberRange = {
	min: number
	max: number
}

export type Reward = {
	inventory: Inventory
	balance: number
	experience: number
}

export type EnemyOptions = {
	id: number
	name: string
	element: ElementType
	level: number
	attributes: Map<Attribute, number>
	rewardHandler: IRewardHandler
}

export type DungeonOptions = {
	id: number
	name: string
	stages: Stage[]
	rewardHandler: IRewardHandler
}

export type RewardHandlerOptions = {
	loot: ItemDropChance[] | Map<Item, number>
	lootAmount: number | NumberRange
	balance: number | NumberRange
	experience?: number | NumberRange
}
