class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //card__like-button//
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeButton());
    //card__delete-button//
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteButton());
    //card__image//
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick(this._name, this._link)
      );
  }

  _handleAddButtonSubmit(e) {
    e.preventDefault();
    this._name = cardTitleInput.value;
    this._link = cardUrlInput.value;
    renderCard(this._name, this._link, cardListEl);
    e.target.reset();
    closePopup(addCardModal);
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  _handleCardImageEL() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._image = this._cardElement.querySelector(".card__image");
    this._image.src = this._link;
    this._description = this._cardElement.querySelector(".card__title");
    this._description.textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
