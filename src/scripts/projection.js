function degToRad(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function getSTMat(left, right, bottom, top, near, far){
    var a = right - left;
    b = top - bottom;
    c = far - near;

    return [
        [2/a,0,0,(left + right)/a],
        [0,2/b,0,(top + bottom)/b],
        [0,0,2/c,(far + near )/c],
        [0,0,0,1]
    ]
}

function getProjection(angle, aspect, zMin, zMax, zDist) {
    var top = Math.tan(degToRad(angle)/2) * zMin;
    var right = top * aspect;
    var translationMatrix = [    [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, -zDist],
      [0, 0, 0, 1]
    ];
    var projectionMatrix = [    [zMin/right, 0, 0, 0],
      [0, zMin/top, 0, 0],
      [0, 0, -(zMax+zMin)/(zMax-zMin), (-2*zMax*zMin)/(zMax-zMin)],
      [0, 0, -1, 0]
    ];
    return multiplyMatrix(projectionMatrix, translationMatrix);
}
  

 function changeToOrtho(){
     var stMatrix = getSTMat(-1,1,-1,1,-1,1);

    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            globalProjectionMatrix[i][j] = stMatrix[i][j]
        }
    }
     
     for(let i in shapes){
         shapes[i].setProjectionMatrix(stMatrix);
        }
        redraw();
}

function changeToPerspective(){
    var newProj = getProjection(40, canvas.width/canvas.height, -1, 100, 4);

    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            globalProjectionMatrix[i][j] = newProj[i][j]
        }
    }

    for(let i in shapes){
        shapes[i].setProjectionMatrix(newProj);
    }
    
    redraw();
}

function changeToOblique(){
    var shtMat = [ [1,0,0,0], [0,1,0,0], [0.3,0.3,1,0], [0,0,0,1] ];

    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            globalProjectionMatrix[i][j] = shtMat[i][j]
        }
    }

    for(let i in shapes){
        shapes[i].setProjectionMatrix(shtMat);
    }
    redraw();
}