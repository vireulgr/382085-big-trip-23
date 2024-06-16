import { remove, render, replace } from '../framework/render';
import WaypointView from '../view/waypoint';
import EditWaypointView from '../view/edit-waypoint/edit-waypoint';

const Mode = {
  VIEW: 'view',
  EDIT: 'edit',
};

export default class WaypointPresenter {
  #waypointViewComponent = null;
  #waypointEditComponent = null;

  #waypointsListContainer = null;

  #destinationsModel = null;
  #offersModel = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #waypoint = null;
  #mode = Mode.VIEW;

  constructor({waypointsListContainer, destinationsModel, offersModel, onDataChange, onModeChange}) {
    this.#waypointsListContainer = waypointsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  #createWaypointViewComponent() {
    const destination = this.#destinationsModel.getDestination(this.#waypoint.destination);
    const offersForType = this.#offersModel.getOffersForEventType(this.#waypoint.type);
    const waypointViewData = {
      waypoint: this.#waypoint,
      destination,
      offers: offersForType,
      onOpenClick: this.#handleOpenEdit,
      onFavoriteClick: this.#handleDataChange,
    };
    return new WaypointView(waypointViewData);
  }

  #createWaypointEditComponent() {
    const editWaypointData = {
      waypoint: this.#waypoint,
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormCancel: this.#handleFormCancel,
    };
    return new EditWaypointView(editWaypointData);
  }

  #renderViewWaypoint() {
    render(this.#waypointViewComponent, this.#waypointsListContainer.element);
  }

  #renderEditWaypoint() {
    render(this.#waypointEditComponent, this.#waypointsListContainer.element);
  }

  #setEditMode() {
    this.#renderEditWaypoint();
    replace(this.#waypointEditComponent, this.#waypointViewComponent);
    document.addEventListener('keydown', this.#handleEscapeKeyPress);
    this.#handleModeChange(); // важно чтобы это было до смены режима!

    this.#mode = Mode.EDIT;
  }

  #setViewMode() {
    replace(this.#waypointViewComponent, this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#handleEscapeKeyPress);
    this.#mode = Mode.VIEW;
  }

  #handleFormCancel = () => {
    this.#setViewMode();
  };

  #handleEscapeKeyPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#setViewMode();
    }
  };

  #handleFormSubmit = (waypoint) => {
    this.#handleDataChange(waypoint);
    // TODO тут потом будет POST запрос
    this.#setViewMode();
  };

  #handleOpenEdit = () => {
    this.#setEditMode();
  };

  init(waypoint) {
    this.#waypoint = waypoint;

    const prevViewComponent = this.#waypointViewComponent;
    const prevEditComponent = this.#waypointEditComponent;

    this.#waypointViewComponent = this.#createWaypointViewComponent();
    this.#waypointEditComponent = this.#createWaypointEditComponent();

    if (prevViewComponent === null || prevEditComponent === null) {
      this.#renderViewWaypoint();
      return;
    }

    if (this.#mode === Mode.VIEW) {
      replace(this.#waypointViewComponent, prevViewComponent);
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#waypointEditComponent, prevEditComponent);
    }

    remove(prevViewComponent);
    remove(prevEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.VIEW) {
      this.#setViewMode();
    }
  }

  destroy() {
    remove(this.#waypointViewComponent);
    remove(this.#waypointEditComponent);
  }
}