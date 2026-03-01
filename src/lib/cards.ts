export interface WordCard {
  id: string;
  word: string;
  image: string;
}

export interface ColorCard {
  id: string;
  name: string;
  hex: string;
}

export interface ObjectCard {
  id: string;
  object: string;
  image: string;
}

export const wordCards: WordCard[] = [
  { id: "w-threshold", word: "Threshold", image: "/card-word-threshold.svg" },
  { id: "w-remnant", word: "Remnant", image: "/card-word-remnant.svg" },
  { id: "w-unnamed", word: "Unnamed", image: "/card-word-unnamed.svg" },
  { id: "w-fallow", word: "Fallow", image: "/card-word-fallow.svg" },
  { id: "w-carried", word: "Carried", image: "/card-word-carried.svg" },
  { id: "w-unraveling", word: "Unraveling", image: "/card-word-unraveling.svg" },
  { id: "w-waiting", word: "Waiting", image: "/card-word-waiting.svg" },
  { id: "w-searching", word: "Searching", image: "/card-word-searching.svg" },
  { id: "w-mending", word: "Mending", image: "/card-word-mending.svg" },
  { id: "w-hollow", word: "Hollow", image: "/card-word-hollow.svg" },
  { id: "w-becoming", word: "Becoming", image: "/card-word-becoming.svg" },
  { id: "w-held", word: "Held", image: "/card-word-held.svg" },
  { id: "w-weathered", word: "Weathered", image: "/card-word-weathered.svg" },
  { id: "w-suspended", word: "Suspended", image: "/card-word-suspended.svg" },
  { id: "w-wandering", word: "Wandering", image: "/card-word-wandering.svg" },
  { id: "w-uncovered", word: "Uncovered", image: "/card-word-uncovered.svg" },
  { id: "w-rooted", word: "Rooted", image: "/card-word-rooted.svg" },
  { id: "w-breaking", word: "Breaking", image: "/card-word-breaking.svg" },
  { id: "w-returning", word: "Returning", image: "/card-word-returning.svg" },
  { id: "w-still", word: "Still", image: "/card-word-still.svg" },
  { id: "w-abandoned", word: "Abandoned", image: "/card-word-abandoned.svg" },
  { id: "w-chosen", word: "Chosen", image: "/card-word-chosen.svg" },
  { id: "w-unseen", word: "Unseen", image: "/card-word-unseen.svg" },
  { id: "w-rebuild", word: "Rebuild", image: "/card-word-rebuild.svg" },
  { id: "w-surrendered", word: "Surrendered", image: "/card-word-surrendered.svg" },
  { id: "w-tender", word: "Tender", image: "/card-word-tender.svg" },
  { id: "w-forgotten", word: "Forgotten", image: "/card-word-forgotten.svg" },
  { id: "w-known", word: "Known", image: "/card-word-known.svg" },
  { id: "w-emerging", word: "Emerging", image: "/card-word-emerging.svg" },
  { id: "w-tested", word: "Tested", image: "/card-word-tested.svg" },
];

export const colorCards: ColorCard[] = [
  { id: "c-before-dawn", name: "Before Dawn", hex: "#1a2744" },
  { id: "c-ember", name: "Ember", hex: "#c45e2c" },
  { id: "c-still-water", name: "Still Water", hex: "#7a9e8e" },
  { id: "c-worn-gold", name: "Worn Gold", hex: "#b89a4a" },
  { id: "c-first-light", name: "First Light", hex: "#e8d5a3" },
  { id: "c-deep-water", name: "Deep Water", hex: "#1a4d5e" },
  { id: "c-after-rain", name: "After Rain", hex: "#8ba4b0" },
  { id: "c-dry-ground", name: "Dry Ground", hex: "#8b6e4e" },
  { id: "c-tender-green", name: "Tender Green", hex: "#8faa7e" },
  { id: "c-midnight", name: "Midnight", hex: "#0f1526" },
  { id: "c-healed-scar", name: "Healed Scar", hex: "#c4949a" },
  { id: "c-dust-and-bone", name: "Dust and Bone", hex: "#e8ddd0" },
  { id: "c-shelter", name: "Shelter", hex: "#a8a098" },
  { id: "c-held-breath", name: "Held Breath", hex: "#c4b8d6" },
  { id: "c-wilderness", name: "Wilderness", hex: "#6b7a4e" },
  { id: "c-refining-fire", name: "Refining Fire", hex: "#8b2020" },
  { id: "c-new-mercies", name: "New Mercies", hex: "#e0907a" },
  { id: "c-hidden-spring", name: "Hidden Spring", hex: "#6ec5c5" },
  { id: "c-broken-open", name: "Broken Open", hex: "#4a2d6e" },
  { id: "c-carried", name: "Carried", hex: "#d4b896" },
];

export const objectCards: ObjectCard[] = [
  { id: "o-anchor", object: "Anchor", image: "/card-anchor.png" },
  { id: "o-lantern", object: "Lantern", image: "/card-lantern.png" },
  { id: "o-open-door", object: "Open Door", image: "/card-opendoor.png" },
  { id: "o-cracked-vessel", object: "Cracked Vessel", image: "/card-crackedvessel.png" },
  { id: "o-compass", object: "Compass", image: "/card-compass.png" },
  { id: "o-bread", object: "Bread", image: "/card-bread.png" },
  { id: "o-well", object: "Well", image: "/card-well.png" },
  { id: "o-candle", object: "Candle", image: "/card-candle.png" },
  { id: "o-torn-cloth", object: "Torn Cloth", image: "/card-torncloth.png" },
  { id: "o-staff", object: "Staff", image: "/card-staff.png" },
  { id: "o-seed", object: "Seed", image: "/card-seed.png" },
  { id: "o-mirror", object: "Mirror", image: "/card-mirror.png" },
  { id: "o-bridge", object: "Bridge", image: "/card-bridge.png" },
  { id: "o-worn-shoes", object: "Worn Shoes", image: "/card-wornshoes.png" },
  { id: "o-cup", object: "Cup", image: "/card-cup.png" },
  { id: "o-net", object: "Net", image: "/card-net.png" },
  { id: "o-cloak", object: "Cloak", image: "/card-cloak.png" },
  { id: "o-stone", object: "Stone", image: "/card-stone.png" },
  { id: "o-key", object: "Key", image: "/card-key.png" },
  { id: "o-flame", object: "Flame", image: "/card-flame.png" },
  { id: "o-loom", object: "Loom", image: "/card-loom.png" },
  { id: "o-shelter", object: "Shelter", image: "/card-shelter.png" },
  { id: "o-boat", object: "Boat", image: "/card-boat.png" },
  { id: "o-path", object: "Path", image: "/card-path.png" },
  { id: "o-wings", object: "Wings", image: "/card-wings.png" },
];

/** Look up cards by their IDs */
export function findWordCards(ids: string[]): WordCard[] {
  return ids.map((id) => wordCards.find((c) => c.id === id)).filter(Boolean) as WordCard[];
}

export function findColorCards(ids: string[]): ColorCard[] {
  return ids.map((id) => colorCards.find((c) => c.id === id)).filter(Boolean) as ColorCard[];
}

export function findObjectCards(ids: string[]): ObjectCard[] {
  return ids.map((id) => objectCards.find((c) => c.id === id)).filter(Boolean) as ObjectCard[];
}
