import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

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

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//Add New Card
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#modal__add-card");

// preview Image
const previewImagePopup = document.querySelector("#modal__preview-popup");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewPopUpCaption = document.querySelector(".modal__caption");
const cardSelector = "#card__template";

//Form Data//
const profileTitleInput = document.querySelector("#modal__form-input-name");
const profileDescriptionInput = document.querySelector(
  "#modal__form-input-description"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addModalForm = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = addModalForm.querySelector(".modal__form-input-title");
const cardUrlInput = addModalForm.querySelector("#modal__form-input-url");

//close popup by pressing screen
const modals = document.querySelectorAll(".modal");
const handlePopupClose = (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
};
modals.forEach((modal) => {
  modal.addEventListener("mousedown", handlePopupClose);
});
//ESC button
function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".modal_opened");
    closePopup(popup);
  }
}

function createCard(item) {
  const cardElement = new Card(item, cardSelector, handleImageClick);
  return cardElement.getView();
}

function renderCard(item, cardListWrapper) {
  const card = createCard(item);
  cardListWrapper.prepend(card);
}

// Validation
const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addModalForm);

// Enable validation
editFormValidator.enableValidation();
addFormValidator.enableValidation();

//Event Handlers//

function handleImageClick(name, link) {
  previewImageElement.src = link;
  previewImageElement.alt = name;
  previewPopUpCaption.textContent = name;
  openPopup(previewImagePopup);
}

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
  addFormValidator.toggleButtonState();

  closePopup(addCardModal);
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addModalForm.addEventListener("submit", handleAddButtonSubmit);

//add new button//
addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

initialCards.forEach((item) => renderCard(item, cardListEl));
