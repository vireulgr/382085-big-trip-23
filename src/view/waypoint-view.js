import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';
import { EVENT_TYPE_ICONS } from '../constants.js';
import { getDurationString } from '../utils/common.js';

/**
* @param {import('../constants.js').Offer} offer
* @returns {string} вёрстка одной дополнительной опции
*/
function createOfferMarkup(offer) {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
  );
}


/**
* @param {import('../constants.js').Waypoint} waypoint
* @param {import('../constants.js').Destination} destination объект Destination соответствующий назначению пункта путешествия
* @param {import('../constants.js').Offer[]} offers опции для текущего типа точки путешествия
* @returns {string} вёрстка для одного пункта в путешествии
*/
function createWaypointTemplate(waypoint, destination, offers) {

  const totalPrice = waypoint.basePrice;
  const offersItems = [];

  // тут надо отобразить только подключённые в данной точке путешествия офферы
  for (const offerId of waypoint.offers) {
    const offer = offers.find(({id}) => id === offerId);
    offersItems.push(createOfferMarkup(offer));
  }

  const eventIcon = EVENT_TYPE_ICONS[waypoint.type];

  const dateTimeFrom = dayjs(waypoint.dateFrom);
  const dateTimeTo = dayjs(waypoint.dateTo);

  const humanizedInterval = getDurationString(dateTimeFrom, dateTimeTo);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${waypoint.dateFrom}">${dateTimeFrom.format('MMM DD')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${eventIcon}" alt="Event type icon">
        </div>
        <h3 class="event__title">${waypoint.type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${waypoint.dateFrom}">${dateTimeFrom.format('HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${waypoint.dateTo}">${dateTimeTo.format('HH:mm')}</time>
          </p>
          <p class="event__duration">${humanizedInterval}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${totalPrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersItems.join(' ')}
        </ul>
        <button class="event__favorite-btn ${waypoint.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class WaypointView extends AbstractView {
  #waypoint = null;
  #destination = null;
  #offers = [];

  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({waypoint, destination, offers, onOpenClick, onFavoriteClick}) {
    super();
    this.#waypoint = waypoint;
    this.#destination = destination;
    this.#offers = offers;
    this.#handleEditClick = onOpenClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onOpenClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteClick);
  }

  get template() {
    return createWaypointTemplate(this.#waypoint, this.#destination, this.#offers);
  }

  #onOpenClick = (evt) => {
    evt.preventDefault();
    this.#handleEditClick(evt);
  };

  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
