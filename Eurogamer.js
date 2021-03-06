addKiller("Eurogamer", {

"canKill": function(data) {
	return data.src.indexOf("eurogamer.net/scripts") !== -1;
},

"process": function(data, callback) {
	var flashvars = parseFlashVariables(data.params.flashvars);
	var matches = /\[\[JSON\]\]\[(.*?)\]/.exec(decodeURIComponent(flashvars.playlist));

	if( !matches || matches < 2 )
		return;

	var payload = JSON.parse(matches[1]);

	var sources = [];

	if( payload['hd.file'] )
		sources.push({"url": payload['hd.file'] , "format":  "HD", "height": 720, "isNative": true});

	if( payload['hd.original'] )
		sources.push({"url": payload['hd.original'] , "format":  "SD", "height": 406, "isNative": true});
		
	callback({
		"playlist": [{
			"title": data.title,
			"poster": payload.image,
			"sources": sources
	 }]});
}

});