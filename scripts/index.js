const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Buttons and other DOM nodes//
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-close-button");
const addModalCloseButton = document.querySelector("#add_modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//Add New Card
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");

//Form Data//
const profileTitleInput = document.querySelector("#modal__form-input-name");
const profileDescriptionInput = document.querySelector(
  "#modal__form-input-description"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addModalform = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");

const cardTitleInput = addModalform.querySelector(".modal__form-input-title");
const cardUrlInput = addModalform.querySelector(".modal__form-input-url");
//Function//

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  addCardModal.classList.remove("modal_opened");
}

function renderCard(cardData, cardListWrapper) {
  const cardElement = getCardElement(cardData);
  cardListWrapper.prepend(cardElement);

  
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;

  return cardElement;
}

//Event Handlers//

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

function handleAddButtonSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
 renderCard({name,link},cardListEl )
  closePopup(addCardModal);
}
//Event Listerners//

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", closePopup);
addModalCloseButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addModalform.addEventListener("submit", handleAddButtonSubmit);

//add new button//
addNewCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});

initialCards.forEach((cardData) => renderCard{cardData, cardListEl});