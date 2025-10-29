import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  year: string;
  edition: string;
  medium: string;
  image: string;
  description: string;
  story: string;
  price?: string;
  available: boolean;
  audioUrl?: string;
}

export const artworks: Artwork[] = [
  {
    id: "geometric-harmony",
    title: "Geometric Harmony",
    artist: "Elena Voss",
    artistId: "elena-voss",
    year: "2024",
    edition: "25",
    medium: "Digital Art",
    image: artwork1,
    description: "An exploration of balance through minimal geometric forms and soft gradients.",
    story: "Created during a residency in the Swiss Alps, Geometric Harmony emerged from Elena's meditation on architectural precision and natural forms. The piece captures the tension between order and chaos, using carefully calculated geometric shapes that seem to float in an infinite digital space. Each gradient represents a moment of transition, a breath between states of being.",
    price: "2.5 ETH",
    available: true,
  },
  {
    id: "liquid-gold",
    title: "Liquid Gold",
    artist: "Marcus Chen",
    artistId: "marcus-chen",
    year: "2024",
    edition: "15",
    medium: "Generative Art",
    image: artwork2,
    description: "Flowing forms that capture the essence of transformation and fluidity.",
    story: "Liquid Gold was born from Marcus's exploration of algorithmic beauty and natural phenomena. Using custom-built generative systems, he created a piece that evolves endlessly while maintaining its core aesthetic. The golden hues reference both digital value and natural beauty, bridging the gap between technology and organic form. Each edition is a unique snapshot of an infinite algorithm.",
    price: "3.8 ETH",
    available: true,
  },
  {
    id: "minimal-forms",
    title: "Minimal Forms",
    artist: "Sofia Laurent",
    artistId: "sofia-laurent",
    year: "2024",
    edition: "20",
    medium: "Digital Art",
    image: artwork3,
    description: "Architectural elegance meets digital craftsmanship in this refined series.",
    story: "Inspired by the brutalist architecture of Paris and the soft light of Nordic winters, Minimal Forms is Sofia's ode to simplicity. The piece strips away all unnecessary elements, leaving only the essential forms that communicate pure emotion. The subtle interplay of light and shadow creates depth without complexity, inviting viewers to pause and contemplate.",
    price: "1.9 ETH",
    available: false,
  },
  {
    id: "digital-serenity",
    title: "Digital Serenity",
    artist: "Elena Voss",
    artistId: "elena-voss",
    year: "2024",
    edition: "30",
    medium: "Digital Art",
    image: artwork1,
    description: "A meditation on space, light, and contemporary digital aesthetics.",
    story: "Digital Serenity represents Elena's exploration of digital space as a place of calm and reflection. In a world of constant noise, this piece offers a moment of peace, using soft color palettes and balanced compositions to create a sense of tranquility. The work invites viewers to slow down and experience the meditative qualities of digital art.",
    price: "2.2 ETH",
    available: true,
  },
  {
    id: "abstract-momentum",
    title: "Abstract Momentum",
    artist: "Marcus Chen",
    artistId: "marcus-chen",
    year: "2024",
    edition: "18",
    medium: "Generative Art",
    image: artwork2,
    description: "Dynamic energy captured in elegant digital strokes.",
    story: "Abstract Momentum emerged from Marcus's fascination with movement and energy in digital space. The piece captures the feeling of forward motion, of progress and evolution, through sweeping forms that seem to dance across the canvas. Created using real-time data from Tokyo's urban rhythms, each element responds to the pulse of the city.",
    price: "3.5 ETH",
    available: true,
  },
  {
    id: "form-function",
    title: "Form & Function",
    artist: "Sofia Laurent",
    artistId: "sofia-laurent",
    year: "2024",
    edition: "22",
    medium: "Digital Art",
    image: artwork3,
    description: "Where architectural precision meets artistic expression.",
    story: "Form & Function is Sofia's tribute to the Bauhaus principle that beauty and utility are inseparable. The piece demonstrates how digital art can embody both aesthetic pleasure and conceptual depth. Each element serves a purpose while contributing to the overall harmony of the composition, creating a perfect balance between thought and emotion.",
    price: "2.0 ETH",
    available: true,
  },
];

export const getArtworkById = (id: string): Artwork | undefined => {
  return artworks.find((artwork) => artwork.id === id);
};

export const getArtworksByArtist = (artistId: string): Artwork[] => {
  return artworks.filter((artwork) => artwork.artistId === artistId);
};
