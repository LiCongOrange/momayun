export default {
	state: {
		areaList: []
	},
	mutations: {
		getArea(state, val) {
			state.areaList = val
		}
	}
}