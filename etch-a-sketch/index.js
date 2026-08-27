const gridContainer = document.querySelector("#gridContainer")
const input = document.querySelector("#input")
const submitBtn = document.querySelector("#submitBtn")

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const numberOfGrids = +input.value
    if (!Number.isInteger(numberOfGrids) || numberOfGrids <= 0 || numberOfGrids > 100) return;
    clearGrid()
    renderGrid(numberOfGrids)
    input.value = ''
    input.focus()
})

gridContainer.addEventListener("mouseover", (e) => {
    if (e.target.parentElement !== gridContainer) return
    const div = e.target

    if (!div.classList.contains('draw')) {
        div.classList.add('draw')
        const [r, g, b] = generateRandomColor()
        div.style.background = `rgb(${r},${g},${b})`
        div.style.opacity = 0.1
    } else {
        const opacity = Number(getComputedStyle(div).opacity)
        div.style.opacity = Math.min(opacity + 0.1, 1)
    }
})

function renderGrid(quantity = 16) {
    const gridWidth = gridContainer.offsetWidth
    gridContainer.style.height = gridWidth + 'px';
    const totalGrid = quantity ** 2

    for (let i = 0; i < totalGrid; i++) {
        const div = document.createElement("div")
        div.style.height = `${gridWidth / quantity}px`
        div.style.width = `${gridWidth / quantity}px`
        gridContainer.appendChild(div)
    }
}

function clearGrid() {
    gridContainer.innerHTML = ''
}

function generateRandomColor() {
    return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
}

renderGrid()