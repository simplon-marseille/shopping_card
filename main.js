const products = [
{
  id: '1',
  name: 'Iphone6',
  img: 'phone.jpg',
  price: '600',
  color: 'white',
  company: 'apple',
  description: 'lorem ipsum'
},
{
 id: '2',
  name: 'Iphone5',
  price: '600',
  img: 'phone.jpg',
  color: 'white',
  company: 'apple',
  description: 'lorem ipsum'
},
{
  id: '3',
  name: 'Iphone4',
  img: 'phone.jpg',
  price: '400',
  color: 'golden',
  company: 'apple',
  description: 'lorem ipsum'
},
{
  id: '4',
  name: 'Iphone6',
  img: 'phone.jpg',
  price: '300',
  color: 'gray',
  company: 'apple',
  description: 'lorem ipsum'
},
{
  id: '5',
  name: 'Iphone6',
  img: 'phone.jpg',
  price: '300',
  color: 'gray',
  company: 'apple',
  description: 'lorem ipsum'
},
{
  id: '6',
  name: 'Iphone6',
  img: 'phone.jpg',
  price: '300',
  color: 'gray',
  company: 'apple',
  description: 'lorem ipsum'
},
{
  id: '7',
  name: 'Iphone6',
  img: 'phone.jpg',
  price: '300',
  color: 'gray',
  company: 'apple',
  description: 'lorem ipsum'
}
];

const card = [];
let counterCard = 0;
const counter = document.querySelector('#counter');
const productDiv = document.querySelector('#rowProduct');


//Injection et affichage de notre HTML dynamique
products.forEach((product) => {
  productDiv.insertAdjacentHTML('beforeend', `
<div class="col-xs-12 col-sm-4 col-md-4">
          <div class="thumbnail shadow" id="thumbnail${product.id}">
            <img src="${product.img}" alt="...">
            <div class="caption">
              <h3>${product.name}</h3><span>${product.price} € </span>
              <p>${product.description}</p>
              <p><a href="#" class="btn btn-primary" id="product-description" role="button">Voir le produit</a>
                <span><a href="#" class="btn btn-default" id=${product.id} role="button">Ajouter au panier</a></span</p>
            </div>
          </div>
        </div>
      </div>
    `);
});

//Je stocke tout mes liens dans un tableau
const allLinkOfProducts = document.querySelectorAll('.thumbnail span a');
const panier = document.querySelector('#panier');
const modal = document.querySelector('#modal');
const close = document.querySelector('#close');
const modalBody = document.querySelector('#modal-body');
const total = document.querySelector('#total');
const resetCard = document.querySelector('#reset-card');
const arrayPrice = [];
let totalItem = 0;

//Cette fonction permet de calcluler la somme de notre panier
const totalPrice = (item) => {
  arrayPrice.push(parseInt(item));
  totalItem = 0;
  for(let i = 0; i < arrayPrice.length; i++){
    totalItem = totalItem + arrayPrice[i];
  };
  return totalItem;
};


//Je parcours mon tableau de liens
allLinkOfProducts.forEach((link) => {
  //Je place un événement 'click' un chaque lien
  link.addEventListener('click', (event) => {
    //j'empèche le comportement par défaut
    event.preventDefault();
    //je récupère l'id de mon bouton
    const id = link.getAttribute("id");
    //je le stocke dans un tableau:
    //ici ce code ne sert qu'à stocker les id des articles dans
    //le cas d'une fonctionnalité de paiement en ligne
    card.push(id);
    //j'incrémente mon compteur
    counterCard = counterCard + 1;
    //affichage du compteur
    counter.innerHTML = counterCard;
    //je trouve dans la liste de produit l'id de l'article sur le quel je viens de cliquer.
    products.forEach((item) => {
      if(item.id === id){
        //J'appel la fonction qui permet de calculer la somme de mon panier
        const response = totalPrice(item.price);
        total.innerHTML = '';
        //J'insère mon article et le total dans ma modal
        modalBody.insertAdjacentHTML('beforeend', `<p><img src="${item.img}" style="width: 10%;"> ${item.name} ${item.price} €</p><hr>`);
        total.insertAdjacentHTML('beforeend', `${response} €`);
      };
    });
  });
});

//J'affiche ma modal 'panier'
panier.addEventListener('click', (event) => {
  modal.style.display = 'block';
});

//Je ferme ma modal panier
close.addEventListener('click', (event) => {
  modal.style.display = 'none';
});

//Reset général: on remet les compteurs à zero
resetCard.addEventListener('click', (event) => {
  modalBody.innerHTML = '';
  total.innerHTML = '0';
  counter.innerHTML = '0';
  counterCard = 0;
  arrayPrice.splice(0, arrayPrice.length);

});

//Et voila ;)

