export default function() {
  return {
    displayName: null,
    email: null,
    photoURL: null,
    lat: 0,
    lng: 0,
    zoom: 10,
    notificationsCounter: 0,
    showPopup: false,
    heritageType: "All",
    mapObject: null,
    allHeritages: "All heritages",

    recentlySearched: [
      {
        items: "Turogan",
        place: "Tugaya - Brgy. Poblacion",
      },
      {
        items: "Agong",
        place: "Malabang - Brgy. China Town",
      },
    ],

    showMaps: [
      {
        name: "Turogan",
        position: { lat: 7.956173, lng: 124.24095 },
      },
      {
        name: "Masjid",
        position: { lat: 7.736173, lng: 124.24095 },
      },
      {
        name: "Kaban",
        position: { lat: 7.756173, lng: 124.14095 },
      },
      {
        name: "Debakan",
        position: { lat: 7.956173, lng: 124.14095 },
      },
    ],

    tileProviders: [
      {
        name: "Classic Map",
        visible: true,
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      },
      {
        name: "Satellite Map",
        visible: false,
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      },
    ],

    filters: [
      {
        id: "Categories",
        color: "green",
        model: null,
        categories: ["All Categories", "Immovable", "Movable", "Artifacts"],
      },
      {
        id: "Municipalites",
        model: [],
        color: "red-5",
        categories: [
          "All Municipalites",
          "Marawi City",
          "Marantao",
          "Wato Balindong",
          "Tugaya",
          "Bacolod Kalawi",
          "Madalum",
          "Madamba",
          "Ganassi",
          "Pualas",
          "Calanogas",
          "Malabang",
          "Sultan Gumander",
          "Balabagan",
        ],
      },
      {
        id: "Type",
        model: null,
        color: "yellow-9",
        categories: ["All Types", "Turogan", "Masjid", "Debakan", "Arror"],
      },
      {
        id: "Baranggays",
        model: [],
        color: "primary",
        categories: [
          "All Baranggays",
          "Brgy. Lomidong",
          "Brgy. Gadungan",
          "Brgy. Gurain",
        ],
      },
    ],
  };
}
