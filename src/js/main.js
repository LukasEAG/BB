// const { info } = require('sass')
const body = document.querySelector('body')
const main = document.querySelector('main')
// function headerHeight() {
// 	const vh = window.innerHeight - (96 + 62)
// 	main.style.minHeight = `${vh}px`
// }

// const windowHeightHandler = () => {
// 	if ( window.innerWidth > 769) {
// 		headerHeight()
// 	} else {
// 		main.style.height = `100%`
// 	}
// }

// window.addEventListener('resize', () => {
// 	windowHeightHandler()
// })

// windowHeightHandler()

const colorTable = ['--bb-pink', '--bb-green', '--bb-fluo', '--bb-blue', '--bb-salmon', '--bb-grey']
const colorOb = {
	lineUp: '--bb-pink',
	info: '--bb-blue',
	partners: '--bb-salmon',
	tickets: '--bb-fluo',
	contact: '--bb-purple',
}
let setBgColor
let colorIndex
let btnAttribute
window.addEventListener('load', () => {
	const randoNumber = Math.floor(Math.random() * colorTable.length)
	const randomColor = colorTable[randoNumber]
	document.body.style.setProperty('--bg-color', `var(${randomColor})`)
	setBgColor = randomColor
})

// const listLink = document.querySelectorAll('.body-menu__card')
const menuBtns = document.querySelectorAll('[btn-name]')

menuBtns.forEach((link, index) => {
	link.addEventListener('mouseover', () => {
		btnAttribute = link.getAttribute('btn-name')

		addBodyColor(btnAttribute)
	})

	link.addEventListener('mouseleave', () => {
		document.body.style.setProperty('--bg-color', `var(${setBgColor})`)
	})

	link.addEventListener('click', () => {
		btnAttribute = link.getAttribute('btn-name')

		if (main.classList.contains('active')) {
			defaultPageHeight()
			pageHendler(btnAttribute)
		} else {
			pageHendler(btnAttribute)
		}
	})
})

const addBodyColor = btnAttribute => {
	console.log(colorOb[btnAttribute])

	document.body.style.setProperty('--bg-color', `var(${colorOb[btnAttribute]})`)
}
// const addBodyColor = index => {
// 	document.body.style.setProperty('--bg-color', `var(${colorHover[index]})`)
// }

const btnMobileMenu = document.querySelector('[mobile-menu-btn]')
const mobileMenu = document.querySelector('[mobile-menu]')

btnMobileMenu.addEventListener('click', () => {
	const isMenuOpen = body.classList.contains('show-menu')

	if (isMenuOpen) {
		closeMobileMenu()
	} else {
		openMobileMenu()
	}
})

const mainPage = document.querySelector('#main-page')
const titleBox = document.querySelector('.title-menu-checked')
const h2Title = document.createElement('h2')
let currentPage

const pageHendler = pageAttr => {
	body.classList.contains('show-menu') ? closeMobileMenu() : undefined;
	
	const page = document.querySelector(`[page-name=${pageAttr}]`)
	const pageH = page.offsetHeight + 'px'
	main.classList.add('active')
	page.classList.add('active')
	currentPage = page
	addPageHeight(pageH)
	titleBoxHendler(pageAttr)
}

const closeMobileMenu = () => {
window.body.classList.remove('show-menu', 'stop-scrolling')
		btnMobileMenu.innerText = 'Menu'
		btnMobileMenu.removeAttribute('btn-close-mobileMenu')
}

const openMobileMenu = () => {
	window.body.classList.add('show-menu', 'stop-scrolling')
		btnMobileMenu.innerText = 'X'
		btnMobileMenu.setAttribute('btn-close-mobileMenu', '')
}

const addPageHeight = pageH => {
	mainPage.style.height = pageH
}

const defaultPageHeight = () => {
	main.classList.remove('active')
	currentPage.classList.remove('active')
	mainPage.removeAttribute('style')
	titleBox.removeChild(h2Title)
}
const titleBoxHendler = name => {
	console.log(colorIndex)
	titleBox.style.setProperty('--title-bg-color', `var(${colorOb[name]})`)
	titleBox.appendChild(h2Title)
	h2Title.innerText = name
}
const btnClosePage = document.querySelector('.close-menu__btn')

btnClosePage.addEventListener('click', () => {
	defaultPageHeight()
})
