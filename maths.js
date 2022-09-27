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
