export function drawerState(context, opened) {
	context.commit('drawerState', opened)
}

export function miniState(context, opened) {
	context.commit('miniState', opened)
}

export function vieHeritageDrawerState(context, opened) {
	context.commit('vieHeritageDrawerState', opened)
}

export function notifDrawerState(context, opened) {
	context.commit('notifDrawerState', opened)
}

export function showFilterSearchSetting (context, showed) {
	context.commit('showFilterSearchSetting', showed)
}

export function addCulturalHeritage (context, opened) {
	context.commit('addCulturalHeritage', opened)
}

export function viewList (context, viewed) {
	context.commit('viewList', viewed)
}

export function viewMyContribution(context, viewed) {
	context.commit('viewMyContribution', viewed)
}

export function toogleMap(context, toggled) {
	context.commit('toogleMap', toggled)
}

export function closePopup(context, closed) {
	context.commit('closePopup', closed)
}

export function successPopup(context, opened) {
	context.commit('successPopup', opened)
}

export function isLoggedIn(context, loggedIn) {
	context.commit('isLoggedIn', loggedIn)
}

export function updateProfile(context, opened) {
	context.commit('updateProfile', opened)
}

export function culturalHeritages(context, opened) {
	context.commit('culturalHeritages', opened)
}

export function manageHeritages(context, opened) {
	context.commit('manageHeritages', opened)
}

export function manageAddHeritage(context, opened) {
	context.commit('manageAddHeritage', opened)
}

export function refreshPage(context, opened) {
	context.commit('refreshPage', opened)
}

export function reviewFormDialog(context, opened) {
	context.commit('reviewFormDialog', opened)
}

export function viewCulturalHeritageDetails(context, opened) {
	context.commit('viewCulturalHeritageDetails', opened)
}

export function editHeritages(context, opened) {
	context.commit('editHeritages', opened)
}

export function feedbackDialog(context, opened) {
	context.commit('feedbackDialog', opened)
}

export function viewHeritageFromNotif(context, opened) {
	context.commit('viewHeritageFromNotif', opened)
}

