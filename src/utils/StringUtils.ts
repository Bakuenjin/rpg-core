class StringUtils {

	replaceAll(str: string, from: string, to: string): string {
		return str.split(from).join(to)
	}

}

export default new StringUtils()