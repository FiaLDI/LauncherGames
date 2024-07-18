
let gameList = document.querySelectorAll('.panel-item')
let playButt = document.querySelector('#play-button')

gameList.forEach((val, key) => {
    val.addEventListener('click', (e) => {
        e.preventDefault()
        playButt.value = val.value
        gameList.forEach((val, key) => {
            if(val.classList.contains('cur-game')) {
                val.classList.remove('cur-game');
            }
        })
        val.classList.add('cur-game')
    })
})

const modal = document.querySelector('#setting-dialog')
const modalBox = document.getElementById('modal-box')
const showModalBtn = document.getElementById('setting')

let isModalOpen = false

showModalBtn.addEventListener('click', (e) => {
    modal.showModal()
    isModalOpen = true
    e.stopPropagation()
    e.preventDefault()
})

document.addEventListener('click', (e) => {
    if (isModalOpen && !modalBox.contains(e.target)) {
        modal.close()
    }
})
