/**
* @typedef {Object} Offer
* @prop {string} id
* @prop {string} title
* @prop {number} price
*/

/**
* @typedef {Object} OffersListItem
* @prop {import("./trip").WaypointType} type
* @prop {Offer[]} offers
*/

/** @typedef {OffersListItem[]} OffersList */

// GET big-trip/offers
/** @type OffersList */
export const OFFERS = [
  {
    type: 'check-in',
    offers: [
      {
        id: 'apartment-lux',
        title: 'Rent lux apartment',
        price: 120
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'excursion',
        title: 'Have an excursion',
        price: 5
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'taxi',
    offers: [
      {
        id: 'taxi-comfort',
        title: 'Upgrade to a comfort class',
        price: 5
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'train-meal',
        title: 'Have a meal in train',
        price: 10
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'flight-business',
        title: 'Upgrade to a business class',
        price: 100
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  }
];