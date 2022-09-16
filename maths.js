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