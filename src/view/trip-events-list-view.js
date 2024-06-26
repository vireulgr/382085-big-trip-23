import AbstractView from '../framework/view/abstract-view';

function createTripEventsListMarkup() {
  return '<ul class="trip-events__list"> </ul>';
}

export default class TripEventsListView extends AbstractView {
  get template() {
    return createTripEventsListMarkup();
  }
}
