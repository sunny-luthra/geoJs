function init(){
	geoJs = new geoJs();
	
	/*
	//create a point;
	var point1 = geoJs.point();//creates origin
	var point2 = geoJs.point(4, 6);
	var point3 = geoJs.point({x:4, y:6});
	alert(point1.x)
	alert(point2.x)
	alert(point3.x)
	 */
	
	/*
	//get mid-point between two points
	var point1 = geoJs.point(0, 10);
	var point2 = geoJs.point({x:-20, y:10});
	alert(geoJs.midPoint(point1, point2).x)
	*/
	
	/*
	//convert/get radian from degree
	var radian1 = geoJs.radian();
	var radian2 = geoJs.radian(180);
	alert(radian1 == radian2);
	 */
	 
	/*
	//convert/get degree from radian
	var degree1 = geoJs.degree();
	var degree2 = geoJs.degree(Math.PI);
	alert(degree1)
	alert(degree2);
	 */

	/*
	//get distance between two points
	var point1 = geoJs.point(4, 6);
	var point2 = geoJs.point({x:5, y:6});
	alert(geoJs.distance(point1, point2))
	*/
	
	/*
	//get angle (degree/radian) between two points
	var point1 = geoJs.point(0, 10);
	var point2 = geoJs.point({x:-20, y:10});
	alert(geoJs.angle(point1, point2, false))
	*/

	/*
	//get angle (degree/radian) of a slope
	var point1 = geoJs.point(0, 10);
	var point2 = geoJs.point({x:-20, y:10});
	alert(geoJs.slopeAngle(1))
	alert(geoJs.slopeAngle(1, false))
	*/

	/*
	//get angular point wrt a point,a given angle and a distance
	var point = geoJs.point(0, 0);
	alert(geoJs.angularPoint(point, 0, 10, true).x)
	alert(geoJs.angularPoint(point, 90, 20, true).y)
	*/
	
	//linesIntersectionPoint
	//pointLineDistance
}
init();