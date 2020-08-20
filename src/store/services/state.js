const govtOption = [
  "Capitol Building",
  "Municipality/City Hall",
  "Baranggay Hall",
  "Fire Station",
  "Police Station",
  "Bridge",
  "Library",
  "Bakeshop",
  "Winery",
  "Marketplace",
  "Store",
  "Bank",
  "Government Agency Building",
  "Fortress",
  "Rice Mill",
  "Sugar Mill",
  "Ice Plant",
  "Dam/Dike",
  "Gymnasium",
  "Hotel",
  "Train/Bus Station",
  "Airport",
  "Seaport",
  "Prison/Correctional Facilty",
  "Factory",
  "Cockpit",
  "Laboratory",
  "Power Plant",
  "Recreation/Sports Center",
  "Museum",
  "Other",
];
const schoolOption = ["Gabaldon", "Marcos Type", "Other"];
const hospitalOption = [
  "Hospital",
  "Sanitarium",
  "Nursing Home",
  "Health Center",
  "Clinic",
  "Leprosarium",
  "Other",
];
const churchesOption = ["Church", "Temple", "Mosque", "Other"];
const monumentsOption = [
  "Statue",
  "Welcome Maker",
  "Well",
  "Bandstand",
  "Shrine",
  "Fountain",
  "Other",
];
const sitesOption = [
  "Plaza",
  "Archaeological Site",
  "Cemetery",
  "Sports Complex",
  "Park",
  "Heritage Landscape",
  "Burial Site",
  "Pilgrimage Site",
  "Street",
  "Heritage Waterscape",
  "Railway System",
  "Other",
];
const heritageOption = [
  "Indigenous",
  "Spanish Period",
  "American Period",
  "World War II Period",
  "Postwar",
  "Other",
];
const archaeOption = [
  "Stone Tools",
  "Stone Ornaments",
  "Meteorites",
  "Metal",
  "Glass",
  "Modified Shell",
  "Modified Bone",
  "Ceramics (Earthenware)",
  "Ceramics (Stoneware)",
  "Ceramics (Porcelain)",
  "Shells",
  "Bones",
  "Fossils",
  "Plant remains",
  "Other",
];
const ethnoOption = [
  "Work Implement",
  "Crafts",
  "Decorative Articles",
  "Household Items",
  "Weaponry",
  "Games and Hobbies",
  "Clothing",
  "Other",
];
const religiousOption = [
  "Image Object",
  "Vestment",
  "Liturgical",
  "Sculpture",
  "Relic",
  "Other",
];
const worksOption = [
  "Wood Heraldic Item",
  "Metal Heraldic Item",
  "Furniture",
  "Ceramic",
  "Medal",
  "Badge",
  "Coin",
  "Ingsinias",
  "Coat of Arms",
  "Crest",
  "Flag",
  "Buttons",
  "Arms and Ammunition",
  "Vehicle",
  "Ship/Boat",
  "Other",
];
const artworkOption = [
  "Painting",
  "Sculpture",
  "Printwork",
  "Carving",
  "Photo",
  "Sketch",
  "Drawing",
  "Other",
];
const archivalOption = [
  "Paper",
  "Manuscript",
  "Parchment/Vellum",
  "Books",
  "Photographs",
  "Negatives",
  "Magnetic Media",
  "Other",
];
// Natural
const naturalClassOption = [
  "Biological",
  "Geological",
  "Paleontological",
  "Environmental",
  "Endangered Species",
  "Holotype",
  "Other",
];
const naturalBioOption = [
  "Algae",
  "Mosses and liverworts",
  "Club mosses",
  "Horsetails",
  "Ferns",
  "Conifers/other evergreens",
  "Fungi",
  "Flower",
  "Seed",
  "Leaf",
  "Root",
  "Stem",
  "Fruit",
  "Other",
];
const naturalGeoOption = [
  "Rocks",
  "Soil",
  "Ore, minerals or crystals",
  "Extraterrestrial materials",
  "Other",
];
const naturalPaleonOption = [
  "Mummified Species",
  "Fossils",
  "Mounted Skeletons",
  "Taxidermy Specimen",
  "Palynology Specimens (Pollen)",
  "Frozen specimens – collected from permafrost areas",
  "Reproductions made for study or exhibits",
  "Specimens in fluid – in spirit/alcohol/formaldehyde",
  "Other",
];
const naturalEnvironmentalOption = [
  "Eggshell and Mollusk shell samples",
  "Specimen parts collected according to special protocols",
  "Other",
];
const conservationOption = [
  "Yellowing",
  "Stains",
  "Fading",
  "Foxing (Brown Spots)",
  "Accretions",
  "Holes",
  "Fingerprints",
  "Tears/Break",
  "Losses",
  "Creases",
  "Brittle",
  "Abrasion",
  "Missing Part",
  "Folds",
  "Wrinkles",
  "Molds",
  "Insect Infestation",
  "Other",
];
//

export default function() {
  return {
    govtOption: govtOption,
    schoolOption: schoolOption,
    hospitalOption: hospitalOption,
    churchesOption: churchesOption,
    monumentsOption: monumentsOption,
    sitesOption: sitesOption,
    heritageOption: heritageOption,
    archaeOption: archaeOption,
    ethnoOption: ethnoOption,
    religiousOption: religiousOption,
    worksOption: worksOption,
    artworkOption: artworkOption,
    archivalOption: archivalOption,
    naturalClassOption: naturalClassOption,
    naturalBioOption: naturalBioOption,
    naturalGeoOption: naturalGeoOption,
    naturalPaleonOption: naturalPaleonOption,
    naturalEnvironmentalOption: naturalEnvironmentalOption,
    conservationOption: conservationOption,

    selectedCategory: "",
    selectedValue: "",
    selectedValue2: "",

    // bg-info immovable
    name: "", // both
    type: "", // both
    otherType: "", // both
    ownership: "", // imm only
    location: "", // both
    latitude: "", // both
    longitude: "", // both
    totalArea: "", // imm only
    structure: "", // imm only
    date: "", // both
    ownershipJurisdiction: "", // imm only
    declarationLegislation: "", // imm only
    files: "", // both
    keyInformants: "", // both
    reference: "", // both
    mapperName: "", // both
    dateProfiled: "", // both
    physicalDescription: "",
    historyStructure: "",
    stories: "",
    significance: "",

    status: "",
    statusDes: "",
    statusRemarks: "",
    integrity: "",
    integrityRemarks: "",
    constraints: "",
    conservation: "",

    // bg-info movable
    estimatedAge: "", // excpet art, archival
    nameOfOwner: "", // all
    typeOfAquisition: "", // except art
    religion: "", // religion only
    nationalityOfArtist: "", // art
    ownerCollector: "", // art
    prevOwner: "", // art
    currentOwner: "", // art
    address: "", // art
    volumeSize: "", // archival
    arrangement: "", // archival
    officeOrigin: "", // archival
    contactPerson: "", // archival
    naturalType: "", // natural
    naturalOtherType: "", // natural
    addressOfOwner: "", // natural
    scientificName: "", // natural
    commonName: "", // natural

    // description movable
    description: "", // except art and archival
    primaryCriteria: "", //  except art
    comparativeCriteria: "", // except art
    mediumMaterial: "", // art
    height: "", // art
    width: "", // art
    length: "", // art
    diameter: "", // art
    edition: "", // art
    subject: "", // art
    provenance: "", // art
    descMaterial: "", // archival
    descRemarks: "", // archival
    rawMaterial: "", // natural
    sizeDimension: "", // natural
    surface: "", // natural
    storage: "", // natural
    original: "", // natural

    // conservation movable
    physicalConditionType: "", // e natural
    physicalConditionOtherType: "", // e natural
    generalCondition: "", // only natural

    condition: true,
  };
}
