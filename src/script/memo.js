const switchElements = document.querySelectorAll('.memo__switch')
const imgElements = document.querySelectorAll('.memo__pluse-btn')
const listElements = document.querySelectorAll('.memo__list')

switchElements.forEach(function (switchElement, index) {
	switchElement.addEventListener('click', function () {
		if (window.innerWidth < 1055) {
			toggleList(index)
			imgElements[index].classList.toggle('rotated')
		}
	})
})

imgElements.forEach(function (imgElement, index) {
	imgElement.addEventListener('click', function () {
		if (window.innerWidth < 1055) {
			toggleList(index)
			imgElement.classList.toggle('rotated')
		}
	})
})

function toggleList(index) {
	listElements.forEach(function (listElement, listIndex) {
		if (listIndex === index) {
			listElement.classList.toggle('show')
		} else {
			listElement.classList.remove('show')
		}
	})
}

window.addEventListener('resize', function () {
	if (window.innerWidth >= 1025) {
		listElements.forEach(function (listElement) {
			listElement.classList.add('show')
		})
	}
})
