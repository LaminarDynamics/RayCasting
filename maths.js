// 9-15-22

function AdjustVectorEnd(particle_pos, direction, magnatude) {
    let line_end = VectorToCartesian(magnatude, direction)
    line_end[0] += particle_pos[0] // Adjust for starting point
    line_end[1] += particle_pos[1]
    return line_end;
}

function VectorToCartesian(magnatude, direction) {
    let x = magnatude * Math.cos((direction * Math.PI) / 180.0)
    let y = magnatude * Math.sin((direction * Math.PI) / 180.0)
    return [x, y]
}


function calculateIntersection(p1, p2, p3, p4) {

    let cross = intersects(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);
    // console.log(cross);

    // https://dirask.com/posts/JavaScript-calculate-intersection-point-of-two-lines-for-given-4-points-VjvnAj
    var c2x = p3.x - p4.x; // (x3 - x4)
    var c3x = p1.x - p2.x; // (x1 - x2)
    var c2y = p3.y - p4.y; // (y3 - y4)
    var c3y = p1.y - p2.y; // (y1 - y2)

    // down part of intersection point formula
    var d = c3x * c2y - c3y * c2x;
    if (d == 0) {
        throw new Error('Number of intersection points is zero or infinity.');
        return null;
    }
    // upper part of intersection point formula
    var u1 = p1.x * p2.y - p1.y * p2.x; // (x1 * y2 - y1 * x2)
    var u4 = p3.x * p4.y - p3.y * p4.x; // (x3 * y4 - y3 * x4)

    // intersection point formula

    var px = (u1 * c2x - c3x * u4) / d;
    var py = (u1 * c2y - c3y * u4) / d;

    var p = { x: px, y: py };

    return p;
}

// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function intersects(a,b,c,d,p,q,r,s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  };




// function CreateLine(p1, p2) {
//     let A = (p1[1] - p2[1])
//     let B = (p2[0] - p1[0])
//     let C = (p1[0] * p2[1] - p2[0] * p1[1])
//     return [A, B, -C]
// }

// function intersection(L1, L2) {
//     let D = L1[0] * L2[1] - L1[1] * L2[0]
//     let Dx = L1[2] * L2[1] - L1[1] * L2[2]
//     let Dy = L1[0] * L2[2] - L1[2] * L2[0]
//     if (D != 0) {
//         let x = Dx / D
//         let y = Dy / D
//         return [x, y]
//     }
//     else {
//         return False
//     }
// }
