export function drawerState(state, opened) {
	state.drawerState = opened;
}

export function miniState(state, opened) {
	state.miniState = opened;
}


export function notifDrawerState(state, opened) {
	state.notifDrawerState = opened
}


export function vieHeritageDrawerState(state, opened) {
	state.vieHeritageDrawerState = opened
}

export function showFilterSearchSetting(state, showed) {
	state.showFilterSearchSetting = showed
}

export function addCulturalHeritage(state, opened) {
	state.addCulturalHeritage = opened	
}

export function viewList(state, viewed) {
	state.viewList = viewed
}

export function viewMyContribution(state, viewed) {
	state.viewMyContribution = viewed
}

export function toogleMap(state, toogle) {
	state.toogleMap = toogle
}

export function closePopup(state, close) {
	state.closePopup = close
}

export function successPopup(state, success) {
	state.successDialog = success
}

export function isLoggedIn(state, loggedIn) {
	state.isLoggedIn = loggedIn

}

export function updateProfile(state, opened) {
	state.updateProfile = opened
}

export function culturalHeritages(state, opened) {
	state.culturalHeritages = opened
}

export function manageHeritages(state, opened) {
	state.manageHeritages = opened
}

export function manageAddHeritage(state, opened) {
	state.manageAddHeritage = opened
}

export function refreshPage(state, opened) {
	state.refreshPage = opened
}

export function reviewFormDialog(state, opened) {
	state.reviewFormDialog = opened
}

export function viewCulturalHeritageDetails(state, opened) {
	state.viewCulturalHeritageDetails = opened
}

export function editHeritages(state, opened) {
	state.editHeritages = opened
}

export function feedbackDialog(state, opened) {
	state.feedbackDialog = opened
}

export function viewHeritageFromNotif(state, opened) {
	state.viewHeritageFromNotif = opened
}
