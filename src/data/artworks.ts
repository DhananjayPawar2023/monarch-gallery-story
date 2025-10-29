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
  description: string; // Short concept/story for cards
  story: string; // Long-form narrative about the piece
  dimensions?: string;
  price?: string;
  available: boolean;
  featured?: boolean; // For "Now Showing"
  audioUrl?: string;
  audioTitle?: string;
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
    dimensions: "4096 × 4096 px",
    image: artwork1,
    description: "An exploration of balance through minimal geometric forms and soft gradients.",
    story: "There's a moment in the Swiss Alps, just before sunrise, when the mountains seem to hold their breath. The light hasn't arrived yet, but you can feel it coming—a tension in the air, a sense of something about to unfold. That's the feeling Elena Voss wanted to capture in Geometric Harmony.\n\nCreated during a month-long residency in Grindelwald, this piece emerged from Elena's daily practice of observation. Each morning, she would sit by the window of her studio, watching the interplay of light and shadow across the peaks. She noticed how geometric the natural world truly is—sharp ridges, triangular slopes, the perfect curve of a valley.\n\nBut what struck her most was the space in between. Not the mountains themselves, but the air around them. The negative space that gave them form. In Geometric Harmony, she translates this revelation into pure abstraction: simple shapes suspended in a gradient field, each one carefully positioned to create a sense of equilibrium. The composition breathes. It doesn't demand attention—it invites contemplation.\n\n'I wanted to capture stillness,' Elena says. 'Not as absence, but as presence. The quiet before something begins.'",
    price: "2.5 ETH",
    available: true,
    featured: true,
  },
  {
    id: "liquid-gold",
    title: "Liquid Gold",
    artist: "Marcus Chen",
    artistId: "marcus-chen",
    year: "2024",
    edition: "15",
    medium: "Generative Art",
    dimensions: "3840 × 2160 px",
    image: artwork2,
    description: "Flowing forms that capture the essence of transformation and fluidity.",
    story: "Marcus Chen has always been fascinated by gold—not for its monetary value, but for what it represents. Permanence. Transformation. The way it catches light. For centuries, artists have used gold leaf to elevate their work, to signal the sacred. But how do you capture that feeling in a digital space?\n\nLiquid Gold is his answer. The piece is built on a custom algorithm that simulates fluid dynamics—the way liquids move, merge, and separate. But instead of water, Marcus imagined molten gold, flowing through an infinite digital void. The result is mesmerizing: swirling, organic forms that feel alive, constantly shifting yet somehow eternal.\n\nEach edition of Liquid Gold is a unique snapshot—a single frame pulled from an infinite sequence. The algorithm runs continuously, generating endless variations, but Marcus hand-selects only 15 moments where everything aligns: composition, flow, light. These are the pieces he releases into the world.\n\n'I think of it as collaboration with the machine,' Marcus explains. 'The algorithm creates possibilities, and I curate. It's not about control—it's about knowing when to listen, when to trust the process.'\n\nThe golden hues are deliberate, referencing both traditional art and the digital age. In a world where value is increasingly virtual, Liquid Gold asks: What does precious mean now?",
    price: "3.8 ETH",
    available: true,
    featured: true,
  },
  {
    id: "minimal-forms",
    title: "Minimal Forms",
    artist: "Sofia Laurent",
    artistId: "sofia-laurent",
    year: "2024",
    edition: "20",
    medium: "Digital Art",
    dimensions: "3000 × 4000 px",
    image: artwork3,
    description: "Architectural elegance meets digital craftsmanship in this refined series.",
    story: "Sofia Laurent spent a winter in Reykjavik, and it changed everything. The light there—soft, diffused, endlessly grey—made her see color differently. Or rather, see the absence of color. She realized that what she'd been chasing all along wasn't vibrancy, but restraint.\n\nMinimal Forms is the culmination of that revelation. Inspired by the brutalist architecture of her native Paris and the stark beauty of the Nordic landscape, the series strips away everything unnecessary. No ornamentation. No excess. Just form, light, and space.\n\nEach composition is deceptively simple: a few geometric shapes, subtle gradients, negative space. But the process is painstaking. Sofia will work on a single piece for weeks, adjusting the placement of a rectangle by a single pixel, tweaking a gradient until the transition is imperceptible. She's looking for something elusive—the point where simplicity becomes profound.\n\n'There's a Japanese concept called ma,' Sofia says, 'which refers to the space between things. Not emptiness, but a pause, a breath. That's what I want people to feel when they look at my work—not what's there, but what isn't.'\n\nMinimal Forms sold out within hours of its release, a testament to the power of stillness in a chaotic world.",
    price: "1.9 ETH",
    available: false,
    featured: false,
  },
  {
    id: "digital-serenity",
    title: "Digital Serenity",
    artist: "Elena Voss",
    artistId: "elena-voss",
    year: "2024",
    edition: "30",
    medium: "Digital Art",
    dimensions: "4096 × 4096 px",
    image: artwork1,
    description: "A meditation on space, light, and contemporary digital aesthetics.",
    story: "In a world that never stops, Digital Serenity is an invitation to pause. Elena Voss created this piece during a particularly turbulent period—not in her personal life, but in the world around her. News cycles, social media, endless notifications. She found herself craving quiet, and realized others might too.\n\nThe composition is intentionally calm: soft gradients, balanced forms, a color palette that doesn't demand attention but gently holds it. There's no focal point, no hierarchy—your eye can rest anywhere and find peace. It's the visual equivalent of a deep breath.\n\n'I wanted to create a space that felt like sanctuary,' Elena explains. 'Not an escape from the digital world, but a reminder that it can be a place of refuge too.'\n\nDigital Serenity has found a devoted audience among collectors who display it in their homes as a kind of visual meditation—a reminder to slow down, to be present, to breathe.",
    price: "2.2 ETH",
    available: true,
    featured: false,
  },
  {
    id: "abstract-momentum",
    title: "Abstract Momentum",
    artist: "Marcus Chen",
    artistId: "marcus-chen",
    year: "2024",
    edition: "18",
    medium: "Generative Art",
    dimensions: "3840 × 2160 px",
    image: artwork2,
    description: "Dynamic energy captured in elegant digital strokes.",
    story: "Tokyo never sleeps, and neither does Marcus Chen's algorithm. Abstract Momentum was born from his fascination with urban rhythm—the constant flow of people, trains, information. He wanted to capture that feeling of perpetual motion, but in a way that felt elegant rather than chaotic.\n\nThe piece uses real-time data as its input—specifically, the movement patterns of trains through Tokyo's transit system. Each sweeping form corresponds to a train line, each color shift to a change in velocity. But Marcus isn't interested in literal representation. The data is transformed, abstracted, turned into something that feels more like music than mathematics.\n\n'It's not about visualizing data,' he says. 'It's about feeling it. The algorithm translates numbers into emotion—speed becomes urgency, density becomes texture.'\n\nThe result is kinetic without being jarring, energetic without being overwhelming. Abstract Momentum captures the essence of a city in motion—a reminder that even in chaos, there can be beauty.",
    price: "3.5 ETH",
    available: true,
    featured: false,
  },
  {
    id: "form-function",
    title: "Form & Function",
    artist: "Sofia Laurent",
    artistId: "sofia-laurent",
    year: "2024",
    edition: "22",
    medium: "Digital Art",
    dimensions: "3000 × 4000 px",
    image: artwork3,
    description: "Where architectural precision meets artistic expression.",
    story: "The Bauhaus taught that form and function are not opposites—they're inseparable. Beauty without purpose is decoration; utility without elegance is mere mechanics. Sofia Laurent has always believed this, and Form & Function is her manifesto.\n\nThe piece is structured like architecture: every element serves a purpose, every line has intention. But it's also unmistakably art—emotionally resonant, visually compelling, impossible to look away from. The composition achieves that rare balance where intellectual rigor and aesthetic pleasure coexist.\n\nSofia describes it as 'functional beauty'—work that doesn't just look good, but means something. Each shape in the composition relates to the others in a precise way, creating a system that feels both logical and poetic.\n\n'I don't believe in art for art's sake,' Sofia says. 'Everything should have a reason. But that reason doesn't have to be practical—it can be emotional, philosophical, existential. Form & Function is about finding purpose in beauty and beauty in purpose.'",
    price: "2.0 ETH",
    available: true,
    featured: false,
  },
];

export const getArtworkById = (id: string): Artwork | undefined => {
  return artworks.find((artwork) => artwork.id === id);
};

export const getArtworksByArtist = (artistId: string): Artwork[] => {
  return artworks.filter((artwork) => artwork.artistId === artistId);
};
