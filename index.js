
//class GeneratePerson
class GeneratePerson {
    constructor(nome, id, genero, dataNasc, email, telefone, pais, estado, cidade, rua, numero, cep) {
        this.nome = nome
        this.id = id
        this.genero = genero
        this.dataNasc = dataNasc
        this.email = email
        this.telefone = telefone
        this.pais = pais
        this.estado = estado
        this.cidade = cidade
        this.rua = rua
        this.numero = numero
        this.cep = cep
    }
}

//dropdown menu
//gender
let dropdownChooseGender;
const dropdownGenero = document.querySelector(".dropdown-genero")
dropdownGenero.addEventListener('change', (e) => {
    dropdownChooseGender = dropdownGenero.options[dropdownGenero.selectedIndex].text
    dropdownChooseGender === 'masculino' ? dropdownChooseGender = 'male' : dropdownChooseGender 
    dropdownChooseGender === 'feminino' ? dropdownChooseGender = 'female': dropdownChooseGender
})
//country 
let dropdownChooseCountry;
const dropdownCountry = document.querySelector('.dropdown-country')
dropdownCountry.addEventListener('click', (e) => {
    dropdownChooseCountry = dropdownCountry.options[dropdownCountry.selectedIndex].value
})
//generate dates
let seeDate, seeLocalization, seePhoto, getAge;
const dropdownMenu = document.querySelector('.dropdown-menu')
const loadercss = document.querySelector('.loader')
const generateButton = document.querySelector('.gerar_dados')
generateButton.addEventListener('click', (e) => {
    //handleButtons
    e.preventDefault()
    generateButton.disabled = true
    generateButton.style.cursor = 'not-allowed'
    loadercss.classList.remove('hidden')
    setTimeout(() => {
        loadercss.classList.add('hidden')
        dropdownMenu.classList.add('hidden')
        generateButton.classList.add('hidden')
        generateNewDatesButton.classList.remove('hidden')
    }, 2000)
    
    dropdownChooseGender === 'undefined' ? dropdownChooseGender = 'both' : dropdownChooseGender
    dropdownChooseCountry === 'undefined' ? dropdownChooseCountry = 'both' : dropdownChooseCountry
    fetch(`https://randomuser.me/api/?inc=gender,name,location,dob,email,phone,cell,id,picture&nat=${dropdownChooseCountry}&gender=${dropdownChooseGender}`).then(data => data.json()).then(data => {
        getAge = generateAge(data)
        seeDate = generateData(data)
        seePhoto = generatePhoto(data)
        seeLocalization = generateLatAndLong(data)

    })
    setTimeout(() => {
        insertDataHtml(seeDate)
        insertPhoto(seePhoto)
    }, 2000)
    setTimeout(() => mapLocalization(seeLocalization), 2300)
   
})
const generateNewDatesButton = document.querySelector('.gerar_novos_dados')
generateNewDatesButton.addEventListener('click', (e) => {
    location.reload()
})

//2.2-) generate age
function generateAge(data) {
    return data.results[0].dob.age
}
//2.1-) generatePhoto
function generatePhoto(data) {
    return data.results[0].picture
}
//3-) generate Data Latitude and Longitude (API MAP)
function generateLatAndLong(data) {
    return [data.results[0].location.coordinates, data.results[0].name]
}
///1-) generate Data Insert HTML (API RND DATA)
function generateData(data) {
    let dataResult = data.results[0]
    let nameResult = dataResult.name
    let idResult = dataResult.id 
    let dobResult = dataResult.dob
    let locationResult = dataResult.location 

    
    let personGenerate = new GeneratePerson(
        `${nameResult.first} ${nameResult.last}`,
        `${idResult.value}`,
        `${dataResult.gender}`,
        `${dobResult.date}`,
        `${dataResult.email}`,
        `${dataResult.phone}`,
        `${locationResult.country}`,
        `${locationResult.state}`,
        `${locationResult.city}`,
        `${locationResult.street.name}`,
        `${locationResult.street.number}`,
        `${locationResult.postcode}`
        )
    return personGenerate
}
//2-) insert data to html (API RND DATA)
function insertDataHtml(data) {
    const randomDatesCont = document.querySelector(".random-dates__container")
    randomDatesCont.style.border = `1px solid white`
    const dataArr = Object.keys(data)
    
    //create Element 
    const listElement = document.createElement('ul')
    listElement.classList.add('random-dates__list')
    //create Button
    const buttonElement = document.createElement('button')
    buttonElement.classList.add('person-anser__button-seeData')
    buttonElement.classList.add('btn-dados')
    buttonElement.innerText = 'VER/FECHAR IDENTIDADE'
    buttonElement.addEventListener('click', e => generateCardImg(seeDate))
    //format data
    data['dataNasc'] = convertDate(data['dataNasc'])
  //add list html
   dataArr.forEach(el=> {
    //fix strings  
    let copyEl = [el]
    let copyData = [data[el]]
    copyEl[0] === 'dataNasc' ?  copyEl[0] = 'Data de Nascimento' : copyEl[0]
    copyData[0] === 'female' ? copyData[0] = 'Feminino' : copyData[0]
    copyData[0] === 'male' ? copyData[0] = 'Masculino' : copyData[0]
  
    //create Element
    let liElement = document.createElement('li')
    const spanElement = document.createElement('span')
    //create Class Element
    spanElement.classList.add(`person-answer__${el}`)
    //insert Element
    liElement.innerText = `${firstElementUpperCase(...copyEl)}: `
    spanElement.innerText = firstElementUpperCase(...copyData)
    //insert Element To Html
    liElement.appendChild(spanElement)
    listElement.appendChild(liElement)
    listElement.appendChild(buttonElement)
    randomDatesCont.append(listElement)

    
   }) 
   //addEventButton
  
   //insert flag
function insertFlag(dataFLAG) {
    const country = document.querySelector('.person-answer__pais')
    const countryImg = document.createElement('img')
    countryImg.classList.add('country-img')
    fetch(`https://restcountries.com/v3.1/name/${dataFLAG.pais}`).then(data => data.json()).then(el => {
        let flags;
        dataFLAG.pais === 'United States' ? flags = el[1].flags.svg : flags = el[0].flags.svg
        dataFLAG.pais === 'Netherlands' ? flags = el[1].flags.svg : flags
        dataFLAG.pais === 'India' ? flags = el[1].flags.svg : flags = flags
        countryImg.setAttribute('src', flags)
        country.appendChild(countryImg)
    })
    
}
 insertFlag(data)
}
//insert photo
function insertPhoto(data) {
    let rndDadosContainer = document.querySelector(".random-dates__container")
    //createElement
    let createDivPhoto = document.createElement('div')
    let createPhoto = document.createElement('img')
    //instance Class
    createDivPhoto.classList.add('random-dates__photo')
    createPhoto.classList.add('date-photo')
    //insert Elements
    createPhoto.setAttribute('src', data.large)
    createDivPhoto.appendChild(createPhoto)
    rndDadosContainer.prepend(createDivPhoto)
}
//localization map
function mapLocalization(el) {
    const section = document.querySelector('.random-dates__list')
    //getDates
    let {title, first, last} = el[1]
    let {latitude, longitude} = el[0] 
    let latlong = [latitude, longitude]
    //createElement
    let divMap = document.createElement('div')
    divMap.setAttribute('id', 'map')
    section.appendChild(divMap)

    //createMap
    const map = L.map('map').setView(latlong, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker(latlong).addTo(map)
    .bindPopup(`${title}.${first} ${last} localization`)
    .openPopup();

    //createAvisoMap
    let divMapAviso = document.createElement('div')
    divMapAviso.classList.add('map-alert')
    divMapAviso.innerText = `Atenção: A localização do mapa está baseada na Latitude e Longitude[${latitude}, ${longitude}] vindo da API, então os lugares (endereços principais), não estão batendo com a informação descrita na geração de dados!`
    section.appendChild(divMapAviso)
}
//convert data
function convertDate(element) {
    return Intl.DateTimeFormat('pt-br').format(new Date(element))
}
//transform first Letter to UpperCase
function firstElementUpperCase(text) {
    return `${text.split('')[0].toUpperCase()}${text.slice(1)}`
}
//canvas identify
function generateCardImg(data) {
    const identifyUser = document.querySelector('.identifyUser')
    identifyUser.classList.toggle('hidden')
const canvas = document.querySelector('#myCanvas')
let ctx = canvas.getContext('2d')
let img = new Image()

img.onload = function() {
    //style
    ctx.drawImage(img, 0, 0)
    ctx.fillStyle = "black";
    ctx.font = "14px sans-serif";
    //text
    ctx.fillText(`${data.nome}`, 58, 28); //name
    ctx.fillText(`${data.id === 'null' ? 'Não consta' : data.id}`, 35, 53); //id
    ctx.fillText(`${data.dataNasc}`, 97, 79); //data
    ctx.fillText(getAge, 52, 103); //idade
    ctx.fillText(`${data.genero[0].toUpperCase()}`, 55, 128); //sexo
    ctx.fillText(`${data.email}`, 53, 153); //email
    //text bottom
    ctx.fillText(`${data.pais}`, 45, 190); //pais
    ctx.fillText(`${data.estado}`, 222, 190); //estado
}

img.src = './img/img.png'
}