import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";

export interface Artist {
  id: string;
  name: string;
  location: string;
  shortBio: string; // 2-3 lines for cards/previews
  bio: string; // Story-driven, longer form
  specialization: string;
  image: string;
  coverImage?: string;
  quote?: string; // Personal quote or artist statement
  website?: string;
  instagram?: string;
  twitter?: string;
  audioUrl?: string;
  audioTitle?: string;
}

export const artists: Artist[] = [
  {
    id: "elena-voss",
    name: "Elena Voss",
    location: "Berlin, Germany",
    shortBio: "A Berlin-based artist exploring the delicate balance between geometric precision and emotional resonance through digital abstraction.",
    bio: "Elena Voss didn't set out to become a digital artist. Trained as an architect at the Bauhaus-Universität Weimar, she spent her early career designing spaces meant to be inhabited, felt, lived in. But something was missing—a way to capture the ephemeral, the moment before a space becomes architecture. That's when she turned to the screen.\n\nHer work exists at the intersection of structure and sensation. Each piece begins with mathematical precision: grids, angles, calculated color gradients. But somewhere in the process, intuition takes over. A line softens. A hue shifts. What emerges is a geometry that breathes—rigid forms that somehow convey longing, balance, stillness.\n\nElena's practice is deeply meditative. She works slowly, often spending weeks on a single composition, adjusting pixels the way a painter might layer brushstrokes. For her, digital art is not about speed or novelty—it's about intention. Every element is a choice. Every color, a feeling.\n\nHer recent series, created during a residency in the Swiss Alps, reflects this philosophy. Surrounded by towering peaks and vast silence, she found herself drawn to the idea of 'negative space'—not as absence, but as presence. The works from this period are her most minimal yet, and perhaps her most powerful.",
    specialization: "Geometric Abstraction",
    image: artist1,
    quote: "I treat each pixel as a deliberate choice in a larger composition—digital art is an act of quiet precision.",
    instagram: "https://instagram.com/elenavoss",
    twitter: "https://twitter.com/elenavoss",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    location: "Tokyo, Japan",
    shortBio: "Tokyo-based pioneer in generative art, crafting algorithmic works that blur the line between technology and organic beauty.",
    bio: "Marcus Chen's studio is not what you'd expect. No sprawling monitors, no wall of screens. Just a single desk, a laptop, and a window overlooking a small garden in Shibuya. For someone working at the bleeding edge of generative art, his process is surprisingly analog.\n\nMarcus codes his own algorithms from scratch, building systems that can generate infinite variations of form, color, and movement. But he's not interested in automation for its own sake. Instead, he sees the algorithm as a collaborator—a way to tap into patterns and rhythms beyond human intuition. His work feels less 'made' and more 'discovered,' as if he's excavating beauty from the digital ether.\n\nEach piece begins with a question: What does flow look like in code? How can light be expressed through mathematics? Can an algorithm feel organic? The answers emerge slowly, through iteration and observation. Marcus will run a system for days, even weeks, watching thousands of outputs before selecting the one that resonates.\n\nHis recent series, Liquid Gold, reflects years of research into natural phenomena—the way water moves, how light refracts, the growth patterns of plants. But there's something else there too: a meditation on impermanence. In a medium often associated with permanence and immutability, Marcus has found a way to express the fleeting.",
    specialization: "Generative Art",
    image: artist2,
    quote: "The algorithm is not a tool—it's a conversation. I ask questions in code, and the work answers in ways I never expect.",
    instagram: "https://instagram.com/marcuschen",
    twitter: "https://twitter.com/marcuschen",
  },
  {
    id: "sofia-laurent",
    name: "Sofia Laurent",
    location: "Paris, France",
    shortBio: "Parisian artist and École des Beaux-Arts graduate, known for minimal works that distill emotion into elegant, architectural forms.",
    bio: "Sofia Laurent believes that less is not less—it's everything. A graduate of the École des Beaux-Arts in Paris, she was trained in classical painting, sculpture, and art history. But after years of working in traditional media, she felt constrained. The physical world, for all its beauty, felt too heavy. She wanted to work with light itself.\n\nHer transition to digital art was not a rejection of tradition, but an evolution. She brings the same rigor, the same attention to composition and form, but now she works with pixels instead of paint. Her minimalist aesthetic is deceptive in its simplicity—each piece is the result of countless revisions, a process of stripping away until only the essential remains.\n\nSofia is inspired by brutalist architecture, Nordic light, and the quiet moments in between. Her work is contemplative, asking viewers to slow down, to look closer, to feel the weight of empty space. In a world that demands constant stimulation, her pieces offer something rare: silence.\n\nHer recent work, Minimal Forms, was created during a winter residency in Iceland. The long, dark days and the stark landscape left a profound mark on her. The series is her most restrained yet—compositions of pure form and subtle gradients, where the absence of detail becomes a presence in itself.",
    specialization: "Minimal Art",
    image: artist3,
    quote: "In simplicity, there is clarity. In stillness, there is depth. I create spaces for the eye to rest and the mind to wander.",
    instagram: "https://instagram.com/sofialaurent",
    twitter: "https://twitter.com/sofialaurent",
  },
];

export const getArtistById = (id: string): Artist | undefined => {
  return artists.find((artist) => artist.id === id);
};
