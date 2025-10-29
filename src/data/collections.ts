export interface Collection {
  id: string;
  name: string;
  description: string;
  curatorStatement: string;
  featuredArtworkIds: string[];
  releaseDate: string;
  status: "now-showing" | "upcoming" | "past";
  audioUrl?: string;
  audioTitle?: string;
}

export const collections: Collection[] = [
  {
    id: "between-structure-emotion",
    name: "Between Structure and Emotion",
    description: "An exploration of digital art that balances geometric precision with human feeling—where algorithms meet intuition and order discovers warmth.",
    curatorStatement: "What happens when mathematics learns to feel? This collection brings together three visionary artists who have each found their own answer to that question. Elena Voss's architectural backgrounds breathe with unexpected softness. Marcus Chen's generative systems pulse with organic life. Sofia Laurent's minimal compositions hold entire worlds in their silence.\n\nThese works remind us that digital art is not cold, not distant. In the hands of thoughtful creators, it becomes a medium for expressing the most human of experiences: wonder, longing, peace. Each piece in this collection is an invitation—to slow down, to look closer, to feel deeply.",
    featuredArtworkIds: ["geometric-harmony", "liquid-gold", "minimal-forms"],
    releaseDate: "2024-10-15",
    status: "now-showing",
  },
  {
    id: "digital-meditation",
    name: "Digital Meditation",
    description: "A curated selection of works designed to create space for contemplation in our accelerated world.",
    curatorStatement: "In an age of constant stimulation, these artworks offer something radical: stillness. Not as absence, but as presence. Not as emptiness, but as possibility.\n\nThis collection gathers pieces that function as visual meditations—works that don't demand your attention but gently hold it, creating space for reflection, breathing room in a crowded digital landscape. They remind us that screens can be sanctuaries too.",
    featuredArtworkIds: ["digital-serenity", "minimal-forms"],
    releaseDate: "2024-11-01",
    status: "upcoming",
  },
];

export const getCollectionById = (id: string): Collection | undefined => {
  return collections.find((collection) => collection.id === id);
};

export const getCurrentCollection = (): Collection | undefined => {
  return collections.find((collection) => collection.status === "now-showing");
};
