function showAnimation(ranx, rany, randomNumber) {
    let numberCell = $(`#numbercell-${ranx}-${rany}`);
    numberCell.css("background-color", getNumberCellBackgroundColor(randomNumber));
    numberCell.css("color", getNumberColor(randomNumber));
    numberCell.text(randomNumber);

    numberCell.animate({
        width: "100px",
        height: "100px",
        top: 20 + ranx * 120,
        left: 20 + rany * 120,
    }, 100)
}

function showAnimation2(x0, y0, x, y) {
    let numberCell = $(`#numbercell-${x0}-${y0}`);
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: 20 + x * 120,
        left: 20 + y * 120,
    }, 200)

}
