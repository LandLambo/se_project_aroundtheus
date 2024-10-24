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
  document.querySelector("#card__template").content.firstElementChild;

//Buttons and other DOM nodes//
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#modal__profile-edit");
const profileEditModalCloseButton = document.querySelector(
  "#modal__profile-close-button"
);
const addModalCloseButton = document.querySelector("#modal__add-close-button");
const previewPopUpCloseButton = document.querySelector(
  "#modal__preview-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//Add New Card
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#modal__add-card");

// preview Image
const previewImagePopup = document.querySelector("#modal__preview-popup");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewPopUpCaption = document.querySelector(".modal__caption");

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

// Correction
function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
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
  const deleteButton = cardElement.querySelector(".card__delete-Button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //previewImagePopup

  cardImageEl.addEventListener("click", () => {
    previewImageElement.src = cardData.link;
    previewImageElement.alt = cardData.name;
    previewPopUpCaption.textContent = cardData.name;
    openPopup(previewImagePopup);
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
  e.target.reset();
  closePopup(profileEditModal);
}

function handleAddButtonSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  e.target.reset();
  closePopup(addCardModal);
}

function handlePreviewPopupSubmit(e) {
  e.preventDefault();
  closePopup(addCardModal);
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
addModalCloseButton.addEventListener("click", () => closePopup(addCardModal));
previewPopUpCloseButton.addEventListener("click", () =>
  closePopup(previewImagePopup)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addModalform.addEventListener("submit", handleAddButtonSubmit);

//add new button//
addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
