class StarRater extends HTMLElement{
  constructor (){
    super()
    this.build()
  }
  build(){ //responsavel por juntar os elementos !
    const shadow = this.attachShadow({mode: 'open'}) // colocando a shadowDOM 
    shadow.appendChild(this.styles()) // capturando o estilo 
    const rater = this.createRater()
    this.stars = this.createStars()

    this.stars.forEach( star => rater.appendChild(star)) // array , para cada estrela adicione ao rater
    this.resertRating()
    shadow.appendChild(rater)
  }
  createRater(){
    const rater = document.createElement('div') // crinado a div
    rater.classList.add('star-rater') // adicionando a classe a div
    rater.addEventListener('mouseout', this.resertRating.bind(this))
    return rater 
  }
  createStars(){
    const createStar = (_, id) => { // recebendo primeiro parametro vazio e depois o id
    const star = document.createElement('span')
    star.classList.add('star')
    star.setAttribute('data-value', Number(id) +1 ) //adicionando o data-value e colocando a numeração , onde ele vai rodar 5 vezes no array e iniciando com 1
    star.innerHTML = '&#9733;'

    star.addEventListener('click',this.setRating.bind(this)) // bind significa colar , unir , recuperando a this que antes nao conseguia acessa-la
    star.addEventListener('mousemove',this.ratingHover.bind(this))
    return star
    }
    return Array.from ({length: 5},createStar) // array criando as 5 estrelas em span (length, numero de vezes que vai executar a função !)
  }
  resertRating(){ // limpando as estrelas quando nao clicadas
    this.currentRatingValue = this.getAttribute('data-rating') || 0
    this.highligthRating()
  }
  setRating(event){
    this.setAttribute(
      'data-rating', event.currentTarget.getAttribute('data-value')) // quando passa o mouse em cima captura o valor da estrela
  }
  ratingHover(event){
    this.currentRatingValue = event.currentTarget.getAttribute('data-value')
    this.highligthRating()
    
  }
  highligthRating(){
    this.stars.forEach(star => {
      star.style.color = 
      this.currentRatingValue >= star.getAttribute('data-value')
      ? 'yellow'
      : 'gray'
    })
  }
  styles(){
    const style = document.createElement('style')  // criando o estilo
    style.textContent = `
    .star{
      font-size: 5rem;
      color: gray;
      cursor: pointer;
    }`
    return style
  }
}

customElements.define('star-rater',StarRater) // star-rater obrigatoriamente separado por traços (-)


  


