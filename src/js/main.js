const body = document.querySelector('body')
const main = document.querySelector('main')

const colorTable = ['--bb-pink', '--bb-green', '--bb-fluo', '--bb-blue', '--bb-salmon', '--bb-grey']
const colorOb = {
	lineUp: '--bb-pink',
	info: '--bb-blue',
	partners: '--bb-salmon',
	news: '--bb-green',
	tickets: '--bb-fluo',
	contact: '--bb-purple',
}
const colorClicked = {
	lineUp: '--bb-nav',
	info: '--bb-salmon',
	partners: '--bb-dark-blue',
	tickets: '--bb-dark-blue',
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

const menuBtns = document.querySelectorAll('[btn-name]')

menuBtns.forEach((link, index) => {
	link.addEventListener('mouseover', () => {
		btnAttribute = link.getAttribute('btn-name')

		addBodyColor(btnAttribute)
	})

	link.addEventListener('mouseleave', () => {
		main.classList.contains('active') ? undefined : document.body.style.setProperty('--bg-color', `var(${setBgColor})`)
	})

	link.addEventListener('click', () => {
		btnAttribute = link.getAttribute('btn-name')

		if (main.classList.contains('active')) {
			defaultPageHeight()
			pageHendler(btnAttribute, link.innerText)
		} else {
			pageHendler(btnAttribute, link.innerText)
		}
	})
})

const addBodyColor = btnAttribute => {
	document.body.style.setProperty('--bg-color', `var(${colorOb[btnAttribute]})`)
}

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

const pageHendler = (pageAttr, pageTitle) => {
	body.classList.contains('show-menu') ? closeMobileMenu() : undefined

	const page = document.querySelector(`[page-name=${pageAttr}]`)
	const pageH = page.offsetHeight + 'px'
	main.classList.add('active')
	page.classList.add('active')
	document.body.style.setProperty('--bg-color', `var(${colorClicked[pageAttr]})`)
	currentPage = page
	addPageHeight(pageH)
	titleBoxHendler(pageAttr, pageTitle)
	partnersBarHendler(pageTitle)
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

const titleBoxHendler = (name, pageName) => {
	titleBox.style.setProperty('--title-bg-color', `var(${colorOb[name]})`)
	titleBox.appendChild(h2Title)
	h2Title.innerText = pageName
}
const partnersBarHendler = currentPage => {
	const partnersBar = document.querySelector('.partners-bar')

	currentPage.trim() !== 'PARTNERZY' ? partnersBar.classList.remove('active') : partnersBar.classList.add('active')
}
const btnClosePage = document.querySelector('.close-menu__btn')

btnClosePage.addEventListener('click', () => {
	defaultPageHeight()
	partnersBarHendler()
})
