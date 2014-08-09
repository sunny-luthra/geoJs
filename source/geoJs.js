/*
 * JavaScript geoJs
 * 
 * Version: 0.1.01
 * 
 * Author: Sunny Luthra
 * 
 * Copyright (c): Sunny Luthra sunnyluthra@gmail.com
 * 
 * License: MIT
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Disclaimer:
 * USE @ YOUR OWN RISK. This library is distributed on as is basis. Please report any issue (if found) @ aforesaid email address.
 */
var geoJs = function(){
	this.arbitraryNumber = 10;//Don't rely on this number
	//Utility calls	
	//INTERNAL
	this.getAttr = function(targetO, attrS){ 
		return targetO[attrS];
	}
	this.default = function(target, value){ 
		return ((this.undefined(target)) ? value : target);
	}
	this.undefined = function(value){
		return (value == 'undefined' || value == undefined)
	}
	this.__proto__.M = function(){ 
		var args = this.M.arguments;

		var point1 = this.point(args[0]);
		var point2 = this.point(args[1]);
		
		return ((point2.y - point1.y) / (point2.x - point1.x));
	}
	this.__proto__.B = function(){ 
		var args = this.B.arguments;

		var point = this.point(args[0]);
		var m = this.default(args[1], 0);
		
		return (point.y - m * point.x);
	}
	//PUBLIC 
	this.__proto__.point = function(){ 
		var objectToReturn = {x:0, y:0};
		var args = this.point.arguments;

		switch(typeof args){
			case 'string'://User has passed incorrect data so nothing is required
							break;
			case 'object':
							if(args.length > 0){
								objectToReturn.x = (args.length == 1) ? this.getAttr(args[0], 'x') : args[0];
								objectToReturn.y = (args.length == 1) ? this.getAttr(args[0], 'y') : args[1];
							}
							break;
		}

		return objectToReturn;
	}
	this.__proto__.equal = function(){
		var args = this.equal.arguments;
		
		return (this.distance(this.point(args[1]), this.point(args[0])) == 0);
	}
	this.__proto__.midPoint = function(){ 
		var args = this.midPoint.arguments;

		var point1 = this.point(args[0]);
		var point2 = this.point(args[1]);

		return this.point((point2.x + point1.x)/2, (point2.y + point1.y)/2);
	}
	this.__proto__.radian = function(){ 
		var args = this.radian.arguments;

		return ((args.length == 0) ? Math.PI : parseFloat(args[0]) * Math.PI/180)
	}
	this.__proto__.degree = function(){ 
		var args = this.degree.arguments;

		return ((args.length == 0) ? 0 : parseFloat(args[0]) * 180/Math.PI)
	}
	this.__proto__.distance = function(){ 
		var args = this.distance.arguments;

		var point1 = this.point(args[0]);
		var point2 = this.point(args[1]);
		
		return Math.sqrt(	Math.pow(point2.y - point1.y, 2) + Math.pow(point2.x - point1.x, 2));
	}
	this.__proto__.angle = function(){ 
		var args = this.angle.arguments;

		var point1 = this.point(args[0]);
		var point2 = this.point(args[1]);
		var degreeB = this.default(args[2], true);

		var angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
		return (degreeB) ? this.degree(angle) : angle;
	}
	this.__proto__.slopeAngle = function(){ 
		var args = this.slopeAngle.arguments;

		var slope = this.default(args[0], 0);
		var degreeB = this.default(args[1], true);

		angle = Math.atan(slope);
		return (degreeB) ? this.degree(angle) : angle;
	}
	this.__proto__.angularPoint = function(){ 
		var args = this.angularPoint.arguments;

		var point = this.point(args[0]);
		var angle = this.default(args[1], 0);
		var distance = this.default(args[2], 0);
		var degreeB = this.default(args[3], true);
		
		angle = (degreeB) ? this.radian(angle) : angle;
		return this.point(point.x + distance * Math.cos(angle), point.y + distance * Math.sin(angle));
	}
	this.__proto__.linesIntersectionPoint = function(){ 
		var args = this.linesIntersectionPoint.arguments;

		var line1Point1 = this.point(args[0]);
		var line1Point2 = this.point(args[1]);
		
		var line2Point1 = this.point(args[2]);
		var line2Point2 = this.point(args[3]);
		
		//slopes of lines
		var m1 = this.M(line1Point1, line1Point2);
		var m2 = this.M(line2Point1, line2Point2);

		//y intercepts of lines
		var b1 = this.B(line1Point1, m1);
		var b2 = this.B(line2Point1, m2);
	
		//intersection point
		var xPosition = (b2 - b1) / (m1 - m2);
		var yPosition = m1 * xPosition + b1;
	
		//error handling
		if(m1 == Number.NEGATIVE_INFINITY || m1 == Number.POSITIVE_INFINITY){
			xPosition = line1Point1.x;
			yPosition = m2 * xPosition + b2;
		}
		if(m2 == Number.NEGATIVE_INFINITY || m2 == Number.POSITIVE_INFINITY){
			xPosition = line2Point1.x;
			yPosition = m1 * xPosition + b1;
		}
		if (m1 == 0 && m2 == 0){
			var _midPoint = this.midPoint(this.midPoint(line1Point1, line2Point1), this.midPoint(line1Point2, line2Point2))
			xPosition = _midPoint.x;
			yPosition = _midPoint.y;
		}
		return this.point(xPosition, yPosition);		
	}
	this.__proto__.pointLineDistance = function(){ 
		var args = this.pointLineDistance.arguments;

		var outerPoint = this.point(args[0]);
		var linePoint1 = this.point(args[1]);
		var linePoint2 = this.point(args[2]);

		angle = this.angle(linePoint1, linePoint2) + 90;
		dropPoint = this.angularPoint(outerPoint, angle, this.arbitraryNumber);
		dropPoint = this.linesIntersectionPoint(linePoint1, linePoint2, outerPoint, dropPoint);
		return this.distance(outerPoint, dropPoint)
	}
	
	
	this.__proto__.isPointOnLineSegment = function(){ 
		var args = this.isPointOnLineSegment.arguments;

		var outerPoint = this.point(args[0]);
		var linePoint1 = this.point(args[1]);
		var linePoint2 = this.point(args[2]);

		var distanceN = Math.round(this.pointLineDistance(outerPoint, linePoint1, linePoint2) * 100)/100;
		if(distanceN != 0){
			return false;
		}else{
			return ((this.distance(outerPoint, linePoint1) + this.distance(outerPoint, linePoint2)) == this.distance(linePoint1, linePoint2))
		}
	}
	this.__proto__.getBoundaryPoint = function(){ 
		var args = this.getBoundaryPoint.arguments;
		
		args = (args.length == 1) ? args[0] : args;

		var linePoint1 = this.point(args[0]);
		var linePoint2 = this.point(args[1]);
		
		for(var i=0; i<args.length - 2; i++){
			var boundaryP1 = this.point(args[i+2])
			var boundaryP2 = this.point((i == (args.length - 3)) ? args[2] : args[i+3]);
			var intersectionP = this.linesIntersectionPoint(linePoint1, linePoint2, boundaryP1, boundaryP2)

			if(this.isPointOnLineSegment(intersectionP, boundaryP1, boundaryP2)){
				if(this.pointLineDistance(linePoint2, boundaryP1, boundaryP2) < this.pointLineDistance(linePoint1, boundaryP1, boundaryP2)){
					return intersectionP;
				}
			}
		}
	}
	this.__proto__.isInsideBoundary = function(){//MUDIT
		var args = this.isInsideBoundary.arguments;
		
		var point = this.point(args[0]);
		var leftTopBoundaryCorner = this.point(args[1]);
		var rightBottomBoundaryCorner = this.point(args[2]);
		
		if(point.x < leftTopBoundaryCorner.x || point.y < leftTopBoundaryCorner.y || point.x > rightBottomBoundaryCorner.x || point.y > rightBottomBoundaryCorner.y ){
			return false;
		}else{
			return true;
		}
	}
	this.__proto__.getBoundaryBox = function(){ 
		var args = this.getBoundaryBox.arguments;
		
		var pointsA = args[0];

		var minX, maxX, minY, maxY;
		for(var i=0; i<pointsA.length; i++){
			minX = (this.undefined(minX)) ? pointsA[i].x : Math.min(minX, pointsA[i].x);
			minY = (this.undefined(minY)) ? pointsA[i].y : Math.min(minY, pointsA[i].y);
	
			maxX = (this.undefined(maxX)) ? pointsA[i].x : Math.max(maxX, pointsA[i].x);
			maxY = (this.undefined(maxY)) ? pointsA[i].y : Math.max(maxY, pointsA[i].y);
		}
		return {
				left:minX
				, top:minY
				, width:(maxX - minX)
				, height:(maxY - minY)
			};
	}
	this.__proto__.getCenterPoint = function(){ 
		var args = this.getCenterPoint.arguments;

		var pointsA = args[0];

		if(pointsA.length == 4){
			return this.linesIntersectionPoint(pointsA[0], pointsA[2], pointsA[1], pointsA[3]);
			//that's it
		}else{
			var boundaryBox = this.getBoundaryBox(pointsA)
			return {
						x: boundaryBox.left + boundaryBox.width/2
						, y: boundaryBox.top + boundaryBox.height/2
			}
		}
	}
	this.__proto__.pointOnLine = function(){ 
		var args = this.pointOnLine.arguments;
		
		var exteriorPoint1 = this.point(args[0]);
		
		var linePoint1 = this.point(args[1]);
		var linePoint2 = this.point(args[2]);
		
		var arbitraryPoint = this.angularPoint(exteriorPoint1, this.angle(linePoint1, linePoint2) + 90, this.arbitraryNumber);
		
		return this.linesIntersectionPoint(exteriorPoint1, arbitraryPoint, linePoint1, linePoint2);
	}
}
