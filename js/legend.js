var LEGEND_DATA = null;
var LEGEND_CONFIG = {
var currentActivityLayerId = null;
/*
}

/*
function createLayerClassColorMap(){

/*

/*
/*
	//append Groupname
	currentOffset += LEGEND_CONFIG.fontSize + 5;
	//append Layername
			layerSvg.append("circle")
			layerSvg.append("line")
				.style("stroke-linecap", "round")
		layerSvg.append("text")
		currentOffset += LEGEND_CONFIG.iconHeight + LEGEND_CONFIG.iconMargin;
	//addEditBehavior(layerSvg, openBackgroundDialog, startingOffset);
	return currentOffset;
}

/*
 * MOVEMENT
 */
function drawMovementLegend(currentOffset){
	currentOffset += 10;
	currentOffset += LEGEND_CONFIG.fontSize + 5;
	//append Layername
	//append Classes
		layerSvg.append("line")
		layerSvg.append("text")
		currentOffset += LEGEND_CONFIG.iconHeight + LEGEND_CONFIG.iconMargin;
	//addEditBehavior(layerSvg, openBackgroundDialog, startingOffset);
}
 * BACKGROUND
 */
function drawBackgroundLegend(currentOffset){
	
	LEGEND_SVG.selectAll(".backgroundlayer").remove();
	//append Groupname
	/*
	var maxValue = backgroundLayerOverview["max_"+backgroundSignatureAttribute];
	labelOffset = LEGEND_CONFIG.iconWidth + LEGEND_CONFIG.iconMargin;
		layerSvg.append("rect")
		layerSvg.append("rect")
		layerSvg.append("text")
	addEditBehavior(layerSvg, openBackgroundDialog, startingOffset);

function drawLegendUnderlay(){
	LEGEND_SVG.select(".underlay").remove();

function translateLegend(){
	translateX = mapWidth-legendBbox.maxX-legendBuffer;
	LEGEND_SVG.attr("transform", function(){
	LEGEND_SVG.select(".underlay")

/*
	var overlay = svgGroup.append("rect")
	return overlay;

function setOnResize(){
function addEditBehavior(svgGroup, func, startingY){
function getLegendGroupById(groupId){
/*
function getLegendLayerById(layerId){
/*