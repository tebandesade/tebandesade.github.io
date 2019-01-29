//////////////////////////////////////////////////////////////////////////////
// M is an object containing methods that let you manipulate 4x4 matrices.
//////////////////////////////////////////////////////////////////////////////

var M = {};


//////////////////////////////////////////////////////////////////////////////
// Your task is to implement the following methods of object M:
//////////////////////////////////////////////////////////////////////////////

M.identity  = function(m)          {           } // Set m values to identity matrix.
M.restore   = function(m)          {           } // Pop from a stack to set the 16 values of m.
M.rotateX   = function(m, radians) {           } // Modify m, rotating about the X axis.
M.rotateY   = function(m, radians) {           } // Modify m, rotating about the Y axis.
M.rotateZ   = function(m, radians) {           } // Modify m, rotating about the Z axis.
M.save      = function(m)          {           } // Push the 16 values of m onto a stack.
M.scale     = function(m, v)       {           } // Modify m, scaling by v[0],v[1],v[2].
M.transform = function(m, v)       { return m; } // Return vec v transformed by matrix m.
M.translate = function(m, v)       {           } // Modify m, translating by v[0],v[1],v[2].

//////////////////////////////////////////////////////////////////////////////
// I have given you a head start by implementing some of the methods for you.
//
// Notice how I use M.matrixMultiply() to help implement other methods.
//////////////////////////////////////////////////////////////////////////////

M.translate = function(m, v) {
   M.matrixMultiply(m, M.translationMatrix(v), m);
}

M.translationMatrix = function(v) {
   return [ 1,0,0,0, 0,1,0,0, 0,0,1,0, v[0],v[1],v[2],1 ];
}

M.matrixMultiply = function(a, b, dst) {
   var n, tmp = []; 

   // PUT THE RESULT OF a x b INTO TEMPORARY MATRIX tmp.

   for (n = 0 ; n < 16 ; n++)
      tmp.push( a[n&3     ] * b[    n&12] +
                a[n&3 |  4] * b[1 | n&12] +
                a[n&3 |  8] * b[2 | n&12] +
                a[n&3 | 12] * b[3 | n&12] );

   // COPY tmp VALUES INTO DESTINATION MATRIX dst.

   for (n = 0 ; n < 16 ; n++)
      dst[n] = tmp[n];
}

M.transform = function(m, v)  {

    // IF v[3] IS UNDEFINED, SET IT TO 1 (THAT IS, ASSUME v IS A POINT).

    var x = v[0], y = v[1], z = v[2], w = v[3] === undefined ? 1 : v[3];

    // RETURN RESULT OF TRANSFORMING v BY MATRIX m.

    return [ x * m[0] + y * m[4] + z * m[ 8] + w * m[12],
             x * m[1] + y * m[5] + z * m[ 9] + w * m[13],
             x * m[2] + y * m[6] + z * m[10] + w * m[14],
             x * m[3] + y * m[7] + z * m[11] + w * m[15] ];
}

M.identity = function(m){
    for (var i = 0; i < 16; i++) {
    m[i] = i % 5 ? 0 : 1
  }
  return m
}

M.scale = function(m,v){
  var x,y,z = 0;
   if (v instanceof Array) {
      x = v[0];
      y = v[1];
      z = v[2];
   }
   else{
      x = y = z = v;
    }
    temp = [ x,0,0,0, 0,y,0,0, 0,0,z,0, 0,0,0,1 ];
    return M.matrixMultiply(m,temp,m);
 }
 
 M.rotateZ = function(m,radians){
    temp =rotationZMatrix(radians);
    return M.matrixMultiply(m,temp,m);
 }
 
 M.rotateY = function(m,radians){
    temp = rotationYMatrix(radians);
    return M.matrixMultiply(m,temp,m);
 }
 
 M.rotateX = function(m,radians){
    temp = rotationXMatrix(radians);;
    return M.matrixMultiply(m,temp,m);
 }
 
 M.stack = [];
 M.save = function (m) {
  var n = []
  for (var i = 0; i < m.length; i++) {
    n[i] = m[i]
  }
  M.stack.push(n)
}

M.restore = function (m) {
  var n = M.stack.pop()
  for (var i = 0; i < m.length; i++) {
    m[i] = n[i]
  }
}

M.perspective = function(m, v) {
    temp = perspectiveMatrix(v);
    M.matrixMultiply(m, temp, m);
}

var perspectiveMatrix = function(v) {
    var x, y, z = 0;
    if (v instanceof Array) {
       x = v[0];
       y = v[1];
       z = v[2];
    }
    else {
       x = y = z = v;
    }
    
    return [1,0,0,x, 0,1,0,y, 0,0,1,z, 0,0,0,1];
}
var rotationXMatrix = function(radians) {
    var c = Math.cos(radians);
    var s = Math.sin(radians);
    return [1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1];
}

var rotationZMatrix = function(radians) {
    var c = Math.cos(radians);
    var s = Math.sin(radians);
    return [c,s,0,0, -s,c,0,0, 0,0,1,0, 0,0,0,1];
}

var rotationYMatrix = function(radians) {
    var c = Math.cos(radians);
    var s = Math.sin(radians);
    return [c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1];
}
 
 