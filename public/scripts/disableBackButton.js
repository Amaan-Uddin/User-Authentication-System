function disableBackButton() {
	history.pushState(null, null, location.href); //(state-data,title,URL)
	// we are pushing a new state to our browser's history without triggering a full page reload

	window.onpopstate = function (event) {
		history.go(1);
	};
	// on the popstate event we are telling the browser to go to navigate to the next page
	// note: there must exist a next page for it to navigate to that, if no then we would be on the current page
	// whenever the user tries to go back.
}
disableBackButton();
