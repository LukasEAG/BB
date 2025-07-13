const body = document.querySelector('body')
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {
	flatpickr('#birthDate', {
		dateFormat: 'Y-m-d',
		maxDate: '2004-07-19',
		disableMobile: true,
		monthSelectorType: 'dropdown',
		locale: 'pl',
	})
})

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
	news: '--bb-dark-blue',
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

window.addEventListener('load', () => {
	getNewsItems()
})

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
	partnersBarHendler(pageTitle.trim())
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

	typeof currentPage === 'string' && currentPage.trim() === 'PARTNERZY'
		? partnersBar.classList.add('active')
		: partnersBar.classList.remove('active')
}
const btnClosePage = document.querySelector('.close-menu__btn')

btnClosePage.addEventListener('click', () => {
	defaultPageHeight()
	partnersBarHendler()
})

const phoneInput = document.querySelector('[name="userPhone"]')

phoneInput.addEventListener('focus', () => {
	if (!phoneInput.value.startsWith('+48')) {
		phoneInput.value = '+48'
	}
})

phoneInput.addEventListener('keydown', e => {
	if (phoneInput.selectionStart <= 3 && (e.key === 'Backspace' || e.key === 'Delete')) {
		e.preventDefault()
	}
})

const regFormPopup = document.querySelector('[registration-form-popup]')
const regFormMsg = document.querySelector('[registration-form-msg]')
const sendingProccede = document.querySelector('.sendingProceed')
const closePopupBtn = document.querySelector('[close-popup-btn]')

async function checkLimit() {
	const res = await fetch('/api/check_limit')
	const data = await res.json()

	if (!data.allowed) {
		const span = document.createElement('span')
		span.classList.add('tickets__form-popup--msg')
		span.innerText = `Rejestracja została zakończona – mamy komplet! Dziękujemy za zaufanie i ogromne zainteresowanie. Tych, którym nie udało się zapisać, zapraszamy do śledzenia naszych social mediów – być może jeszcze w tym roku pojawi się dodatkowa szansa.`
		regFormPopup.appendChild(span)
		regFormPopup.classList.add('limit')
	} else {
		regFormPopup.classList.remove('limit')
	}
}

const createSpanHendler = msg => {
	const span = document.createElement('span')
	span.classList.add('tickets__form-popup--msg')
	span.innerText = msg
	regFormPopup.appendChild(span)
	regFormPopup.classList.add('active')
}
const registrationForm = document.querySelector('[registration-form')
let lastErrors = {}

registrationForm.addEventListener('submit', e => {
	e.preventDefault()
	sendFormToBackend(e)
})
const sendFormToBackend = async e => {
	const form = e.target
	console.log(form)
	const checkboxs = Array.from(form.querySelectorAll('input[name="checkbox"]:checked')).map(checkbox => checkbox.value)
	const data = {
		name: form.querySelector('[name="userName"]')?.value || '',
		surname: form.querySelector('[name="userSurName"]')?.value || '',
		phone: form.querySelector('[name="userPhone"]')?.value || '',
		email: form.querySelector('[name="userEmail"]')?.value || '',
		birthdate: form.querySelector('[name="birthDate"]')?.value || '',

		checkbox: checkboxs,
	}
	const birth = new Date(data.birthdate)
	const eventDate = new Date('2025-07-19')
	const ageLimitDate = new Date(eventDate.getFullYear() - 21, eventDate.getMonth(), eventDate.getDate())

	if (!data.birthdate || isNaN(birth.getTime()) || birth > ageLimitDate) {
		createSpanHendler('Musisz mieć ukończone 21 lat na dzień 19.07.2025.')
		sendingProccede.classList.remove('active')
		return
	}
	sendingProccede.classList.add('active')
	try {
		const res = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
		const json = await res.json()

		if (res.ok) {
			createSpanHendler(`📩 Witaj, ${json.user_name} 
Twoje zgłoszenie zostało przyjęte ✅
Sprawdź swoją skrzynkę mailową – a także folder SPAM – i dokładnie przeczytaj instrukcję, jak postępować dalej z wejściówką.
W razie jakichkolwiek problemów, pisz śmiało na:
📧 ticket@bliskobrzegu.pl
Do zobaczenia nad wodą!
#BliskoBrzegu #DoZobaczenia`)

			lastErrors = {}
		} else {
			if (typeof json.errors === 'object') {
				const errors = json.errors || {}

				Object.values(errors).forEach(err => {
					createSpanHendler(err)
				})

				lastErrors = errors
			} else if (json.error) {
				createSpanHendler(json.error)
			} else {
				createSpanHendler('Wystąpił nieznany błąd')
			}
		}
	} catch (err) {
		createSpanHendler('Błąd połączenia z serwerem, spróbuj ponownie')
	}
}

closePopupBtn.addEventListener('click', e => {
	e.preventDefault()
	const errorSpan = regFormPopup.querySelectorAll('.tickets__form-popup--msg')
	errorSpan.forEach(span => span.remove())
	regFormPopup.classList.remove('active')
	sendingProccede.classList.remove('active')

	if (Object.keys(lastErrors).length === 0) {
		registrationForm.reset()
	} else {
		Object.keys(lastErrors).forEach(fieldName => {
			const field = registrationForm.querySelector(`[name="${fieldName}"]`)
			if (field) field.value = ''
		})
	}
})

const newsZoomBtn = document.querySelectorAll('[news-zoom-btn')
const closNewsBtn = document.querySelector('[close-news-galley]')
const newsGallery = document.querySelector('[news-gallery]')
const newsBox = document.querySelector('.news__box')

const getNewsItems = async () => {
	try {
		const res = await fetch('news.json')
		if (!res.ok) {
			throw new Error(`Respons status: ${res.satus}`)
		}

		const itemsData = await res.json()
		createNewsItems(itemsData)
	} catch (error) {
		console.error(error.message)
	}
}

const createNewsItems = data => {
	for (const key in data) {
		const newsRow = document.createElement('div')
		newsRow.classList.add('news__row')
		const newsRowSpan = document.createElement('span')
		newsRowSpan.innerText = data[key].date
		const newsRowTitle = document.createElement('h2')
		newsRowTitle.innerText = data[key].h2
		const newsRowImg = document.createElement('img')
		newsRowImg.setAttribute('news-zoom-btn', key)
		newsRowImg.src = data[key].img
		newsRowImg.alt = data[key].alt
		const newsRowP = document.createElement('p')
		newsRowP.innerText = 'Kliknij aby powiększyć'

		newsRow.appendChild(newsRowSpan)
		newsRow.appendChild(newsRowTitle)
		newsRow.appendChild(newsRowImg)
		newsRow.appendChild(newsRowP)
		newsBox.appendChild(newsRow)

		setNewsListener(newsRowImg)
	}
}

const getNewsZoom = async key => {
	try {
		const res = await fetch('newszoom.json')
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`)
		}

		const data = await res.json()
		const selectedData = data[key]
		if (selectedData) {
			displayNewsZoom(selectedData)
		} else {
			console.error('Brak danych dla podanego klucza:', key)
		}
	} catch (error) {
		console.error(error.message)
	}
}
const zoomNewsBox = document.querySelector('.news-gallery__box')
const zoomNewsSection = document.querySelector('[news-gallery]')
const displayNewsZoom = data => {
	console.log(data)

	const zoomTitle = document.createElement('h3')
	zoomTitle.innerText = data.h3

	const zoomImg = document.createElement('img')
	zoomImg.src = data.img
	zoomImg.alt = data.alt
	zoomNewsBox.appendChild(zoomTitle)
	zoomNewsBox.appendChild(zoomImg)

	zoomNewsSection.classList.add('active')
}

const setNewsListener = btn => {
	btn.addEventListener('click', () => {
		const btnKey = btn.getAttribute('news-zoom-btn')
		newsGallery.classList.add('active')
		body.classList.add('stop-scrolling')
		getNewsZoom(btnKey)
	})
}

newsZoomBtn.forEach(btn => {
	btn.addEventListener('click', () => {
		newsGallery.classList.add('active')
	})
})

closNewsBtn.addEventListener('click', () => {
	newsGallery.classList.remove('active')
	body.classList.remove('stop-scrolling')

	zoomNewsBox.replaceChildren()
})
