/*
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 * 
 * Example usage:
 * var mySphere = new Sphere(new Vector3(1, 2, 3), 4.23);
 * var myRay = new Ray(new Vector3(0, 1, -10), new Vector3(0, 1, 0));
 * var result = mySphere.raycast(myRay);
 * 
 * if (result.hit) {
 *   console.log("Got a valid intersection!");
 * }
 */

var Sphere = function(center, radius) {
  // Sanity checks (your modification should be below this where indicated)
  if (!(this instanceof Sphere)) {
    console.error("Sphere constructor must be called with the new operator");
  }
  if(!(center instanceof Vector3)||(center == null)){
      this.center = new Vector3(0,0,0);
  }else{
    this.center = center;
  }
  if(radius == null){
    this.radius =1;
  }else{
    this.radius = radius;
  } 
  

  // todo - make sure this.center and this.radius are replaced with default values if and only if they
  // are invalid or undefined (i.e. center should be of type Vector3 & radius should be a Number)
  // - the default center should be the zero vector
  // - the default radius should be 1
  // YOUR CODE HERE

  // Sanity checks (your modification should be above this)
  if (!(this.center instanceof Vector3)) {
    console.error("The sphere center must be a Vector3");
  }

  if ((typeof(this.radius) != 'number')) {
    console.error("The radius must be a Number");
  }
};

Sphere.prototype = {
  
  //----------------------------------------------------------------------------- 
  raycast: function(r1) {
    // todo - determine whether the ray intersects has a VALID intersection with this
	//        sphere and if so, where. A valid intersection is on the is in front of
	//        the ray and whose origin is NOT inside the sphere

   


    // Recommended steps
    // ------------------
    // 0. (optional) watch the video showing the complete implementation of plane.js
    //    You may find it useful to see a different piece of geometry coded.

    // 1. review slides/book math
    
    // 2. identity the vectors needed to solve for the coefficients in the quadratic equation
    
    // 3. calculate the discriminant
    var a = r1.direction.clone().dot(r1.direction);
    var b = r1.direction.clone().multiplyScalar(2).dot(r1.origin.clone().subtract(this.center));
    var c = (r1.origin.clone().subtract(this.center).dot(r1.origin.clone().subtract(this.center))- (this.radius*this.radius));
    
    var discriminiant = (b*b)-(4*a*c);
    var x0 = 0;
    var x1 = 0;
    if(discriminiant<0){
      return { hit: false, point: null };
    }else if(discriminiant == 0){
      x0 = -1*(b/(2*a));
      x1 = x0;
    }else{
      var q = 0.0;
      if(b>0){
        q = -0.5 *(b+Math.sqrt(discriminiant));
      }else{
        q = -0.5 *(b-Math.sqrt(discriminiant));
      }
      x0 = q/a;
      x1 = c/q;
    }
    if(x0>x1){
      var tmp = x0;
      x0 = x1;
      x1 = tmp;
    }
    if(x0<0 && x1>0){
      return { hit: false, point: null };
    }
    if(x0>0 && x1<0){
      return { hit: false, point: null };
    }
    if(x0<0){
      x0 = x1;
      if(x0<0){
        return { hit: false, point: null };
      }
    }
    var hitpoint = r1.direction.clone().multiplyScalar(x0)
    hitpoint = r1.origin.clone().add(hitpoint);
    
    var result = {
           hit: true,
           point: hitpoint,
           normal: (hitpoint.clone().subtract(this.center)).normalize(),
           distance: r1.direction.clone().multiplyScalar(x0).length()
         }
         console.log(result);
         console.log(x0);
    return result

    //|O−C|2−R2
    // 4. use the discriminant to determine if further computation is necessary 
    //    if (discriminant...) { ... } else { ... }

    // 5. return the following object literal "result" based on whether the intersection
    //    is valid (i.e. the intersection is in front of the ray AND the ray is not inside
    //    the sphere)
    //    case 1: no VALID intersections
    //      var result = { hit: false, point: null }
    //    case 2: 1 or more intersections
    //      var result = {
    //        hit: true,
    //        point: 'a Vector3 containing the CLOSEST VALID intersection',
    //        normal: 'a vector3 containing a unit length normal at the intersection point',
    //        distance: 'a scalar containing the intersection distance from the ray origin'
    //      }
      
    // An object created from a literal that we will return as our result
    // Replace the null values in the properties below with the right values
    /*var result = {
      hit: null,      // should be of type Boolean
      point: null,    // should be of type Vector3
      normal: null,   // should be of type Vector3
      distance: null, // should be of type Number (scalar)
    };

    return result;*/
  }
}

// EOF 00100001-10