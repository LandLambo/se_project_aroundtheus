class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
  }

  _setEventListiners() {
    //card__like-button//
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeButton());
    //card__delete-Button//
    this._cardElement
      .querySelector(".card__delete-Button")
      .addEventListener("click", () => this._handleDeleteButton());
    //card__image//
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleCardImageEL());
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
      .addEventListiner("click", () => {
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
    this._description = this._cardElement.querySelector(".card__image");
    this._description.alt = this._name;

    this._setEventListiners();

    return this._cardElement;
  }
}

export default Card;
