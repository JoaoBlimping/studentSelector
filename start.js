function reqListener()
{
	var parser = new DOMParser();
	var doc = parser.parseFromString(this.responseText,"text/html");
	document.body.innerHTML = doc.body.innerHTML;
}


function loadPage(pageName)
{
	//clear old junk
	document.body.innerHTML = "";

	//get new data via a xmlhttprequest
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load",reqListener);
	oReq.open("GET", "pages/"+pageName,true);
	oReq.send();
}
