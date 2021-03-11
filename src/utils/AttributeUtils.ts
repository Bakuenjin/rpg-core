import Mexp from "math-expression-evaluator"
import StringUtils from "./StringUtils"

class AttributeUtils {

	evaluateIncreaseRateExpression(expr: string, level: number): number {
		expr = StringUtils.replaceAll(expr, 'x', level.toString())
		return parseInt(Mexp.eval(expr))
	}

}

export default new AttributeUtils()