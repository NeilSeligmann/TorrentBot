$("#search_input").keypress(function(e) {
    if(e.which == 13) {
        doSearch();
    }
});

function doSearch(){
	console.log("Performing search..");
	$.ajax({
		type: "POST",
		url: "/search",
		data: { 
			string: $("#search_input").val(), 
		},
		success: processSearch,
		dataType: "json"
	});
}

var animated = false;

function processSearch(data){
	// $("#search_input").css("position", "absolute")
	//top: 1%;left: 5%;width: 90%;
	
	if(!animated){
		animated = true;
	    $("#search_input").attr('style',  'position: absolute;width: 0px;opacity: 0; left:50%');

		$("#search_input").animate({
			top: "1%",
			left: "5%",
			width: "90%",
			position: "absolute",
			opacity: 1,
		}, 500, function() {
			$("#results").css("display", "block");
		});
	}

	// console.log(data);
	// var data_parsed = JSON.parse(data);
	$("#results").html("");

	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i]["results"].length; j++) {
			var k = data[i]["results"][j];

			var subcat = (k.subcategory != null && typeof(k.subcategory) !== "undefined") ? ("->" + k.subcategory) : "";
			var category = (k.category != null && typeof(k.category) !== "undefined") ? "<div class='torrent_category'>"+k.category+subcat+"</div>" : "";


			var url = (typeof(k.downloadURL) == "undefined" || k.downloadURL == null) ? "" : "<a href='"+k.downloadURL+"'><i class='fa fa-download'></i></a>";
			var magnet = (typeof(k.magnet) == "undefined" || k.magnet == null) ? "" : "<a href='"+k.magnet+"'><i class='fa fa-magnet'></i></a>";

			var seeders = "<div class='torrent_info seeders'>"+ ((k.seeders == null || typeof(k.seeders) == "undefined" ) ? "?" : k.seeders) +"</div>";
			var leechers = "<div class='torrent_info leechers'>"+((k.leechers == null || typeof(k.leechers) == "undefined" ) ? "?" : k.leechers) +"</div>";
			var engine = "<div class='torrent_info torrent_engine'>"+data[i]["info"]["name"]+"</div>";

			var item = "<div class='torrent'><a href='"+k.link+"'><div class='torrent_title'>"+k.name+"</div></a>"+category+"<div class='torrent_footer'>"+url+magnet+engine+leechers+seeders+"</div></div>";
			$("#results").append(item);
		}
	}

}