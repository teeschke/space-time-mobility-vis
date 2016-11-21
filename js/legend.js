var LEGEND_DATA = null;
var LEGEND_CONFIG = {		"iconWidth" : 20,		"iconHeight" : 20,		"iconMargin" : 3,		"fontFamily" : "Tahoma",		"fontSize" : 14,		"fontSizePt" : "10pt"}
var currentActivityLayerId = null;var currentMovementLayerId = null;var currentBackgroundLayerId = null;
/* *  */function initLoadLegend(nextStep){	registerActiveInitLoad("initLoadLegend");	d3.json("json/config/legend.json",			function(d){				LEGEND_DATA = d;				currentActivityLayerId = "layer_possibilities";				currentMovementLayerId = "layer_modes";				currentBackgroundLayerId = "layer_POPULATION_psk";				createLayerClassColorMap();				createLayerClassLabelMap();				unregisterActiveInitLoad("initLoadLegend");				nextStep();			});
}registeredInitLoaders.push(initLoadLegend);

/* * wird einmalig von initLoadLegend() aufgerufen * erzeugt json-Objekt LEGEND_DATA.colorMap.layerIdX.expressionY=mainColorZ  */
function createLayerClassColorMap(){	LEGEND_DATA.colorMap={};	for(var i=0; i<LEGEND_DATA.groups.length; i++){		for(var j=0; j<LEGEND_DATA.groups[i].layers.length; j++){			var layer = LEGEND_DATA.groups[i].layers[j];			if(typeof layer.classes != "undefined" && layer.classes.length > 0){				//layer besitzt classes				LEGEND_DATA.colorMap[layer.id] = {};				for(var k=0; k<layer.classes.length; k++){					LEGEND_DATA.colorMap[layer.id][layer.classes[k].expression] = LEGEND_DATA.colors[layer.classes[k].mainColor]; 				}			}else if(typeof layer.mainColor != "undefined"){				//layer hat nur ein styling				LEGEND_DATA.colorMap[layer.id] = LEGEND_DATA.colors[layer.mainColor]; 			}		}	}}

/* * wird einmalig von initLoadLegend() aufgerufen * erzeugt json-Objekt LEGEND_DATA.colorMap.layerIdX.expressionY=mainColorZ  */function createLayerClassLabelMap(){	LEGEND_DATA.labelMap={};	for(var i=0; i<LEGEND_DATA.groups.length; i++){		for(var j=0; j<LEGEND_DATA.groups[i].layers.length; j++){			var layer = LEGEND_DATA.groups[i].layers[j];			if(typeof layer.classes != "undefined" && layer.classes.length > 0){				//layer besitzt classes				LEGEND_DATA.labelMap[layer.id] = {};				for(var k=0; k<layer.classes.length; k++){					LEGEND_DATA.labelMap[layer.id][layer.classes[k].expression] = {};					LEGEND_DATA.labelMap[layer.id][layer.classes[k].expression].de = layer.classes[k].de;					LEGEND_DATA.labelMap[layer.id][layer.classes[k].expression].en = layer.classes[k].en;				}			}else if(typeof layer.mainColor != "undefined"){				//layer hat nur ein styling				LEGEND_DATA.labelMap[layer.id] = {}				LEGEND_DATA.labelMap[layer.id].de = layer.de;				LEGEND_DATA.labelMap[layer.id].en = layer.en;			}		}	}}

/* * MAIN DRAW-Method */function drawLegend(){	//if(LEGEND_SVG != null){		var currentOffset = 0;		drawLegendUnderlay();		currentOffset = drawActivityLegend(currentOffset);		currentOffset = drawMovementLegend(currentOffset);		currentOffset = drawTrafficContext(currentOffset);		currentOffset = drawBackgroundLegend(currentOffset);		translateLegend();	//}}registeredDrawers.push(drawLegend);
/* * ACTIVITY */function drawActivityLegend(currentOffset){		if(showLegendLayers.indexOf("possibilities") < 0){		return currentOffset;	}		var startingOffset = currentOffset;	LEGEND_SVG.selectAll(".activityLayer").remove();	var layerSvg = LEGEND_SVG.append("g").classed("activityLayer", true);	var group = getLegendGroupOfLayerId(currentActivityLayerId);	var layer = getLegendLayerById(currentActivityLayerId);
	//append Groupname	layerSvg.append("text")		 .attr("x", 0)		 .attr("y", currentOffset)		 .style("font-weight", "bold")		 .style("font-size", LEGEND_CONFIG.fontSizePt)		 .style("font-family", LEGEND_CONFIG.fontFamily)		 .text(group.de);
	currentOffset += LEGEND_CONFIG.fontSize + 5;
	//append Layername	if(layer.de != ""){	    layerSvg.append("text")			 .attr("x", 0)			 .attr("y", currentOffset)			 .style("font-weight", "normal")			 .style("font-size", LEGEND_CONFIG.fontSizePt)			 .style("font-family", LEGEND_CONFIG.fontFamily)			 .text(layer.de);	    currentOffset += LEGEND_CONFIG.fontSize + 5;	}		//append Classes	labelOffset = LEGEND_CONFIG.iconWidth + LEGEND_CONFIG.iconMargin;	for(var i=0; i<layer.classes.length; i++){		if(typeof possibilityLayerAsCircle != "undefined" && possibilityLayerAsCircle == true){			layerSvg.append("circle")				.attr("cx", function(){return LEGEND_CONFIG.iconWidth/2})				.attr("cy", function(){return -LEGEND_CONFIG.iconHeight/2 + 9 + currentOffset})				.attr("r", 8)				.style("fill", "white");
			layerSvg.append("circle")				.attr("cx", function(){return LEGEND_CONFIG.iconWidth/2})				.attr("cy", function(){return -LEGEND_CONFIG.iconHeight/2 + 9 + currentOffset})				.attr("r", 7)				.style("fill", function(){ 					return LEGEND_DATA.colors[layer.classes[i].mainColor];				});		}else{			layerSvg.append("line")				.attr("x1", function(){return LEGEND_CONFIG.iconWidth/2})				.attr("y1", function(){return -LEGEND_CONFIG.iconHeight/2 + 3 + currentOffset})				.attr("x2", function(){return LEGEND_CONFIG.iconWidth/2})				.attr("y2", function(){return LEGEND_CONFIG.iconHeight/2 - 3 + currentOffset})				.style("stroke", "white")				.style("stroke-linecap", "round")				.style("stroke-width", 9);
			layerSvg.append("line")				.attr("x1", function(){return LEGEND_CONFIG.iconWidth/2})				.attr("y1", function(){return -LEGEND_CONFIG.iconHeight/2 + 3 + currentOffset})				.attr("x2", function(){return LEGEND_CONFIG.iconWidth/2})				.attr("y2", function(){return LEGEND_CONFIG.iconHeight/2 - 3 + currentOffset})				.style("stroke", function(){ 					return LEGEND_DATA.colors[layer.classes[i].mainColor];				})
				.style("stroke-linecap", "round")				.style("stroke-width", 5);		}
		layerSvg.append("text")			 .attr("x", labelOffset)			 .attr("y", function(){ 				 return currentOffset + LEGEND_CONFIG.iconHeight / 2 - LEGEND_CONFIG.fontSize / 2;			 })			 .style("font-weight", "normal")			 .style("font-color", "black")			 .style("font-size", LEGEND_CONFIG.fontSizePt)			 .style("font-family", LEGEND_CONFIG.fontFamily)			 .text(layer.classes[i].de);
		currentOffset += LEGEND_CONFIG.iconHeight + LEGEND_CONFIG.iconMargin;	}
	//addEditBehavior(layerSvg, openBackgroundDialog, startingOffset);
	return currentOffset;
}

/*
 * MOVEMENT
 */
function drawMovementLegend(currentOffset){	if(showLegendLayers.indexOf("movements") < 0){		return currentOffset;	}
	currentOffset += 10;	var startingOffset = currentOffset;	LEGEND_SVG.selectAll(".movementLayer").remove();	var layerSvg = LEGEND_SVG.append("g").classed("movementLayer", true);	var group = getLegendGroupOfLayerId(currentMovementLayerId);	var layer = getLegendLayerById(currentMovementLayerId);	//append Groupname	layerSvg.append("text")		 .attr("x", 0)		 .attr("y", currentOffset)		 .style("font-weight", "bold")		 .style("font-size", LEGEND_CONFIG.fontSizePt)		 .style("font-family", LEGEND_CONFIG.fontFamily)		 .text(group.de);
	currentOffset += LEGEND_CONFIG.fontSize + 5;
	//append Layername	if(layer.de != ""){	    layerSvg.append("text")			 .attr("x", 0)			 .attr("y", currentOffset)			 .style("font-weight", "normal")			 .style("font-size", LEGEND_CONFIG.fontSizePt)			 .style("font-family", LEGEND_CONFIG.fontFamily)			 .text(layer.de);	    currentOffset += LEGEND_CONFIG.fontSize + 5;	}
	//append Classes	labelOffset = LEGEND_CONFIG.iconWidth + LEGEND_CONFIG.iconMargin;	for(var i=0; i<layer.classes.length; i++){		if(layer.classes[i].de == "Zug"){			continue;		}		if(layer.classes[i].de == "Taxi"){			layer.classes[i].de = "Andere";		}		layerSvg.append("line")			.attr("x1", function(){return 3})			.attr("y1", function(){return currentOffset - 3})			.attr("x2", function(){return LEGEND_CONFIG.iconWidth -3})			.attr("y2", function(){return currentOffset - 3})			.style("stroke", "white")			.style("stroke-linecap", "round")			.style("stroke-width", 9);
		layerSvg.append("line")			.attr("x1", function(){return 3})			.attr("y1", function(){return currentOffset - 3})			.attr("x2", function(){return LEGEND_CONFIG.iconWidth -3})			.attr("y2", function(){return currentOffset - 3})			.style("stroke", function(){ 				return LEGEND_DATA.colors[layer.classes[i].mainColor];			})			.style("stroke-linecap", "round")			.style("stroke-width", 5)			.style("stroke-dasharray", "3,7");
		layerSvg.append("text")			 .attr("x", labelOffset)			 .attr("y", function(){ 				 return currentOffset + LEGEND_CONFIG.iconHeight / 2 - LEGEND_CONFIG.fontSize / 2;			 })			 .style("font-weight", "normal")			 .style("font-color", "black")			 .style("font-size", LEGEND_CONFIG.fontSizePt)			 .style("font-family", LEGEND_CONFIG.fontFamily)			 .text(layer.classes[i].de);
		currentOffset += LEGEND_CONFIG.iconHeight + LEGEND_CONFIG.iconMargin;	}
	//addEditBehavior(layerSvg, openBackgroundDialog, startingOffset);	return currentOffset;
}/* * TRAFFIC CONTEXT */function drawTrafficContext(currentOffset){	console.log("drawTrafficContext() currentOffset="+currentOffset);	if(showLegendLayers.indexOf("trafficCircles") < 0){		return currentOffset;	}		currentOffset += 10;	var startingOffset = currentOffset;	LEGEND_SVG.selectAll(".trafficContext").remove();	var layerSvg = LEGEND_SVG.append("g").classed("trafficContext", true);		//Vorgänger-Standorttyp	layerSvg.append("text")		 .attr("x", 0)		 .attr("y", currentOffset)		 .style("font-weight", "bold")		 .style("font-size", LEGEND_CONFIG.fontSizePt)		 .style("font-family", LEGEND_CONFIG.fontFamily)		 .text("Vorgänger-Standorttyp");	currentOffset += LEGEND_CONFIG.fontSize + 5;	layerSvg.append("text")		 .attr("x", 0)		 .attr("y", currentOffset)		 .style("font-weight", "normal")		 .style("font-size", LEGEND_CONFIG.fontSizePt)		 .style("font-family", LEGEND_CONFIG.fontFamily)		 .text(function(d){			 return findTrafficStandorttypName(srcLocationType);		 });	currentOffset += LEGEND_CONFIG.fontSize;	currentOffset += 10;		//Folge-Standorttyp	layerSvg.append("text")		 .attr("x", 0)		 .attr("y", currentOffset)		 .style("font-weight", "bold")		 .style("font-size", LEGEND_CONFIG.fontSizePt)		 .style("font-family", LEGEND_CONFIG.fontFamily)		 .text("Folge-Standorttyp");	currentOffset += LEGEND_CONFIG.fontSize + 5;	layerSvg.append("text")		 .attr("x", 0)		 .attr("y", currentOffset)		 .style("font-weight", "normal")		 .style("font-size", LEGEND_CONFIG.fontSizePt)		 .style("font-family", LEGEND_CONFIG.fontFamily)		 .text(function(d){			 return findTrafficStandorttypName(destLocationType);		 });	currentOffset += LEGEND_CONFIG.fontSize;	currentOffset += 10;		//Verkehrsrichtung	layerSvg.append("text")		 .attr("x", 0)		 .attr("y", currentOffset)		 .style("font-weight", "bold")		 .style("font-size", LEGEND_CONFIG.fontSizePt)		 .style("font-family", LEGEND_CONFIG.fontFamily)		 .text("Verkehrsrichtung");	currentOffset += LEGEND_CONFIG.fontSize + 5;	layerSvg.append("text")		 .attr("x", 0)		 .attr("y", currentOffset)		 .style("font-weight", "normal")		 .style("font-size", LEGEND_CONFIG.fontSizePt)		 .style("font-family", LEGEND_CONFIG.fontFamily)		 .text(function(){			 if(trafficDirection == TRAFFIC_DIRECTION_SOURCE){				 return "Quellverkehr (Wohin fließt der Verkehr?)";			 }else{				 return "Zielverkehr (Woher kommt der Verkehr?)";			 }		 });	currentOffset += LEGEND_CONFIG.fontSize;			/*	 *  TRAFFIC CIRCLES 	 */	currentOffset += 10;	//append Groupname	layerSvg.append("text")		 .attr("x", 0)		 .attr("y", currentOffset)		 .style("font-weight", "bold")		 .style("font-size", LEGEND_CONFIG.fontSizePt)		 .style("font-family", LEGEND_CONFIG.fontFamily)		 .text(function (){			 if(trafficDirection == TRAFFIC_DIRECTION_SOURCE){				return "ausgehende Ziele";			 }else{				return "eingehende Quellen";			 }		 });		currentOffset += 8;		maxR = Math.sqrt(maxTrafficValue / Math.PI) * circleScaleFactor * lastZoomScale;	maxR2 = Math.sqrt((maxTrafficValue / 2.0) / Math.PI) * circleScaleFactor * lastZoomScale;	maxR4 = Math.sqrt((maxTrafficValue / 4.0) / Math.PI) * circleScaleFactor * lastZoomScale;		layerSvg.append("circle")		    .attr("cx", maxR)		    .attr("cy", currentOffset + maxR)		    .attr("r",  maxR)		    .style("fill","black")		    .style("stroke","white");	layerSvg.append("circle")		    .attr("cx", maxR)		    .attr("cy", currentOffset + maxR + (maxR-maxR2))		    .attr("r", maxR2)		    .style("fill","black")			.style("stroke","white");	layerSvg.append("circle")		    .attr("cx", maxR)		    .attr("cy", currentOffset+ maxR + (maxR-maxR4))		    .attr("r", maxR4)		    .style("fill","black")			.style("stroke","white");		layerSvg.append("text")		    .attr("x", maxR*2+5)		    .attr("y", currentOffset + LEGEND_CONFIG.fontSize/2)		    .text(maxTrafficValue.toFixed(0) + " (Maximum)");	layerSvg.append("text")		    .attr("x", maxR*2+5)		    .attr("y", currentOffset + (maxR-maxR2)*2.5 + LEGEND_CONFIG.fontSize/2)		    .text((maxTrafficValue / 2).toFixed(0) + " (Hälfte)");	layerSvg.append("text")		    .attr("x", maxR*2+5)		    .attr("y", currentOffset + (maxR-maxR4)*3 + LEGEND_CONFIG.fontSize/2)		    .text((maxTrafficValue / 4).toFixed(0) + " (Viertel)");		currentOffset += maxR*2 + 25;	/*	 * TRAFFIC ARROWS	 */	//append Groupname	layerSvg.append("text")		 .attr("x", 0)		 .attr("y", currentOffset)		 .style("font-weight", "bold")		 .style("font-size", LEGEND_CONFIG.fontSizePt)		 .style("font-family", LEGEND_CONFIG.fontFamily)		 .text("10 stärkste Verkehrsströme");		currentOffset += LEGEND_CONFIG.fontSize + 5;	var sourcePoint = [5, currentOffset];	var targetPoint = [45, currentOffset];		layerSvg.append("path")	  .attr("d", function(d) {		  var dx = targetPoint[0] - sourcePoint[0],	      	  dy = targetPoint[1] - sourcePoint[1],	          dr = Math.sqrt(dx * dx + dy * dy)*2;	      return "M" + 	      	  sourcePoint[0] + "," + 	      	  sourcePoint[1] + "A" + 	          dr + "," + dr + " 0 0,1 " + 	          targetPoint[0] + "," + 	          targetPoint[1];	    })	  .attr("marker-end", "url(#arrowEnd)")	  .style("stroke", "black")	  .style("stroke-width", 1)	  .style("stroke-linecap", "butt")	  .style("stroke-opacity", 1)	  .style("fill","none")	  .style("pointer-events","none");		layerSvg.append("text")//Dummy, damit der gelbe Rahmen korrekt sitzt	 .attr("x", 0)	 .attr("y", currentOffset)	 .text("dummy")	 .style("opacity","0");		currentOffset += 20;		addEditBehavior(layerSvg, openTrafficDialog, startingOffset);		return currentOffset;}/*
 * BACKGROUND
 */
function drawBackgroundLegend(currentOffset){	console.log("drawBackgroundLegend() currentOffset="+currentOffset);
		currentOffset += 10;	var startingOffset = currentOffset;
	LEGEND_SVG.selectAll(".backgroundlayer").remove();	var layerSvg = LEGEND_SVG.append("g").classed("backgroundlayer", true);	var group = getLegendGroupOfLayerId(currentBackgroundLayerId);	var layer = getLegendLayerById(currentBackgroundLayerId);
	//append Groupname	layerSvg.append("text")		 .attr("x", 0)		 .attr("y", currentOffset)		 .style("font-weight", "bold")		 .style("font-size", LEGEND_CONFIG.fontSizePt)		 .style("font-family", LEGEND_CONFIG.fontFamily)		 //.text(group.de);		 .text(function(){ 			 if(layer.de != ""){				 return layer.de			 }else{				 return group.de			 }		 });	currentOffset += LEGEND_CONFIG.fontSize + 5;		//append Unit	if(layer.unit.de != ""){	    layerSvg.append("text")			 .attr("x", 0)			 .attr("y", currentOffset)			 .style("font-weight", "normal")			 .style("font-size", LEGEND_CONFIG.fontSizePt)			 .style("font-family", LEGEND_CONFIG.fontFamily)			 .text("("+layer.unit.de+")");	    currentOffset += LEGEND_CONFIG.fontSize + 5;	}
	/*	//append Layername	if(layer.de != ""){	    layerSvg.append("text")			 .attr("x", 0)			 .attr("y", currentOffset)			 .style("font-weight", "normal")			 .style("font-size", LEGEND_CONFIG.fontSizePt)			 .style("font-family", LEGEND_CONFIG.fontFamily)			 .text(layer.de);	    currentOffset += LEGEND_CONFIG.fontSize + 5;	}	*/
	var maxValue = backgroundLayerOverview["max_"+backgroundSignatureAttribute];	var minValue = backgroundLayerOverview["min_"+backgroundSignatureAttribute];	var divValue = maxValue - minValue;
	labelOffset = LEGEND_CONFIG.iconWidth + LEGEND_CONFIG.iconMargin;	for(var i=layer.alphas.length-1; i>=0; i--){
		layerSvg.append("rect")			.attr("x", function(){return 0})			.attr("y", function(){return currentOffset - LEGEND_CONFIG.iconWidth / 2})			.attr("width", function(){return LEGEND_CONFIG.iconWidth})			.attr("height", function(){return LEGEND_CONFIG.iconHeight})			.style("fill", "white")			.style("stroke", "none");
		layerSvg.append("rect")			.attr("x", function(){return 0})			.attr("y", function(){return currentOffset - LEGEND_CONFIG.iconWidth / 2})			.attr("width", function(){return LEGEND_CONFIG.iconWidth})			.attr("height", function(){return LEGEND_CONFIG.iconHeight})			.style("fill", function(){ 				return LEGEND_DATA.colors[layer.mainColor];			})			.style("fill-opacity", layer.alphas[i])			.style("stroke", "none");
		layerSvg.append("text")			 .attr("x", labelOffset)			 .attr("y", function(){ return currentOffset + LEGEND_CONFIG.iconHeight / 2 - LEGEND_CONFIG.fontSize / 2})			 .style("font-weight", "normal")			 .style("font-color", "black")			 .style("font-size", LEGEND_CONFIG.fontSizePt)			 .style("font-family", LEGEND_CONFIG.fontFamily)			 .text(function(){				 var steps = layer.alphas.length				 var stepSize = 1 / layer.alphas.length;				 var von = minValue + (divValue * (steps-i-1) * stepSize);				 var bis = minValue + (divValue * (steps-i) * stepSize);				 if(i==layer.alphas.length-1){					 return " < "+bis.toFixed(0);				 }else if(i==0){					 return " > "+von.toFixed(0);				 }				 if(i < layer.alphas.length-2){					 von+=1;				 }				 return von.toFixed(0)+" - "+bis.toFixed(0);			 });		currentOffset += LEGEND_CONFIG.iconHeight + LEGEND_CONFIG.iconMargin;	}
	addEditBehavior(layerSvg, openBackgroundDialog, startingOffset);	return currentOffset;}

function drawLegendUnderlay(){
	LEGEND_SVG.select(".underlay").remove();	LEGEND_SVG.append("rect")		.classed("underlay", true)		.attr("x", 0)		.attr("y", 0)		.attr("width", 0)		.attr("height", 0)		.style("fill","white")		.style("fill-opacity", 0.5)		.style("stroke","white")		.style("stroke-opacity",1)		.style("stroke-width",1)}

function translateLegend(){	var mapWidth = ROOT_SVG.style("width").replace("px","");	var mapHeight = ROOT_SVG.style("height").replace("px","");		var legendBuffer = 20;	var legendBbox = getBboxOfG(LEGEND_SVG);
	translateX = mapWidth-legendBbox.maxX-legendBuffer;	translateY = mapHeight-legendBbox.maxY-legendBuffer;
	LEGEND_SVG.attr("transform", function(){		return "translate("+translateX+", "+translateY+")";	});
	LEGEND_SVG.select(".underlay")		.attr("x", -legendBuffer)		.attr("y", -legendBuffer-LEGEND_CONFIG.fontSize/2+.5)		.attr("width", legendBbox.maxX+(legendBuffer*2))		.attr("height", legendBbox.maxY+(legendBuffer*2)+LEGEND_CONFIG.fontSize/2);}

/* *  */function createOverlay(svgGroup, startingY, buffer){	maxRightX = 0;	maxBottomY = 0;	svgGroup.selectAll("text").each(function(){		var rightX = this.getBBox().x + this.getBBox().width;		if(maxRightX < rightX){			maxRightX = rightX;		}		var bottomY = this.getBBox().y + this.getBBox().height;		if(maxBottomY < bottomY){			maxBottomY = bottomY;		}	});
	var overlay = svgGroup.append("rect")		.attr("x", -buffer)		.attr("y", startingY -buffer - LEGEND_CONFIG.fontSize/2 + .5)		.attr("width", maxRightX + buffer*2)		.attr("height", maxBottomY + buffer*2 + LEGEND_CONFIG.fontSize/2 - startingY)		.style("fill", "white")		.style("fill-opacity", 0);		//.style("stroke", "none");
	return overlay;}

function setOnResize(){	window.onresize = function(){		translateLegend();		if(typeof translateCharts != "undefined"){			translateCharts();		}	}}registeredDrawers.push(setOnResize);
function addEditBehavior(svgGroup, func, startingY){	console.log("addEditBehavior for svgGroup = "+svgGroup);	var overlay = createOverlay(svgGroup, startingY, 10);	overlay.on("click", func)		   .on("mouseover", function(){			   d3.select(this).style("stroke", "yellow")			   				  .style("stroke-width", 5);		   })		   .on("mouseout", function(){			   d3.select(this).style("stroke", "none");		   });}/* *  */
function getLegendGroupById(groupId){	for(var i=0; i<LEGEND_DATA.groups.length; i++){		if(LEGEND_DATA.groups[i].id == groupId){			return LEGEND_DATA.groups[i];		}	}	return null;}
/* *  */
function getLegendLayerById(layerId){	for(var i=0; i<LEGEND_DATA.groups.length; i++){		for(var j=0; j<LEGEND_DATA.groups[i].layers.length; j++)			if(LEGEND_DATA.groups[i].layers[j].id == layerId){				return LEGEND_DATA.groups[i].layers[j];			}	}	return null;}
/* *  */function getLegendGroupOfLayerId(layerId){	for(var i=0; i<LEGEND_DATA.groups.length; i++){		for(var j=0; j<LEGEND_DATA.groups[i].layers.length; j++)			if(LEGEND_DATA.groups[i].layers[j].id == layerId){				return LEGEND_DATA.groups[i];			}	}	return null;}
