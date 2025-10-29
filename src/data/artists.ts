import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";

export interface Artist {
  id: string;
  name: string;
  location: string;
  bio: string;
  specialization: string;
  image: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  audioUrl?: string;
}

export const artists: Artist[] = [
  {
    id: "elena-voss",
    name: "Elena Voss",
    location: "Berlin, Germany",
    bio: "Elena Voss explores the intersection of geometry and emotion in her digital works. Her practice combines architectural precision with intuitive color theory, creating pieces that resonate with both collectors and critics alike. With a background in architecture and fine arts, Elena brings a unique perspective to digital creation, treating each pixel as a deliberate choice in a larger composition.",
    specialization: "Geometric Abstraction",
    image: artist1,
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    location: "Tokyo, Japan",
    bio: "Working at the forefront of generative art, Marcus Chen crafts ethereal digital sculptures that challenge our perception of form and space. His work has been exhibited in galleries across Asia and Europe. Marcus's practice combines cutting-edge algorithmic techniques with a deep appreciation for natural beauty, creating works that feel both technological and organic.",
    specialization: "Generative Art",
    image: artist2,
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  },
  {
    id: "sofia-laurent",
    name: "Sofia Laurent",
    location: "Paris, France",
    bio: "Sofia Laurent's minimalist approach to digital art draws inspiration from architectural forms and natural light. Her work is characterized by its refined simplicity and emotional depth. Trained at École des Beaux-Arts, Sofia brings classical sensibilities to digital media, creating works that honor both tradition and innovation.",
    specialization: "Minimal Art",
    image: artist3,
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  },
];

export const getArtistById = (id: string): Artist | undefined => {
  return artists.find((artist) => artist.id === id);
};
