export function lat(context, value) {
	context.commit('lat', value)
}

export function lng(context, value) {
	context.commit('lng', value)
}

export function zoom(context, value) {
	context.commit('zoom', value)
}
