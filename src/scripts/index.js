// =================== Imports ===================
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import "../pages/index.css";
import { initialCards, validationSettings } from "../utils/constants.js";

// =================== DOM Elements ===================
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditForm = document.querySelector(
  "#modal__profile-edit .modal__form"
);
const addCardForm = document.querySelector("#modal__add-card .modal__form");

const profileTitleInput = document.querySelector("#modal__form-input-name");
const profileDescriptionInput = document.querySelector(
  "#modal__form-input-description"
);

// =================== User Info ===================
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// =================== Popups ===================
const imagePopup = new PopupWithImage("#modal__preview-popup");

const editProfilePopup = new PopupWithForm(
  "#modal__profile-edit",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      job: formData.description,
    });
  }
);

const addCardPopup = new PopupWithForm("#modal__add-card", (formData) => {
  const cardData = {
    name: formData.title,
    link: formData.url,
  };

  const card = new Card(cardData, "#card__template", handleCardClick);
  cardSection.addItem(card.getView(), true); // add new card on top
});

// =================== Validation ===================
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// =================== Card Section ===================
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card__template", handleCardClick);
      return card.getView();
    },
  },
  ".cards__list"
);

// =================== Event Handlers ===================
function handleCardClick(name, link) {
  imagePopup.open({ name, link });
}

// Open profile edit popup
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileTitleInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.job;
  editProfilePopup.open();
});

// Open add card popup
addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// =================== Initialize ===================
cardSection.renderItems();

// =================== Set Event Listeners ===================
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
