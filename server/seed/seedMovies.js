const seedMovies = [
  {
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    genre: ["Sci-Fi", "Adventure", "Action"],
    rating: 8.8,
    duration: "2h 46m",
    language: "English",
    releaseDate: "March 2024",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"],
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
    featured: true,
    price: { standard: 220, premium: 350, vip: 520 },
    cities: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    theaters: [
      {
        name: "PVR IMAX Phoenix Marketcity",
        location: "Kurla, Mumbai",
        showtimes: ["10:15 AM", "01:45 PM", "05:30 PM", "09:15 PM"]
      },
      {
        name: "INOX Megaplex Laser",
        location: "Malad West, Mumbai",
        showtimes: ["11:00 AM", "02:30 PM", "06:45 PM", "10:30 PM"]
      },
      {
        name: "Cinepolis VIP",
        location: "Andheri, Mumbai",
        showtimes: ["12:00 PM", "04:15 PM", "08:00 PM"]
      }
    ]
  },
  {
    title: "Oppenheimer",
    tagline: "The world forever changes.",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, exploring the moral paradox and intense geopolitical friction that followed.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    genre: ["Drama", "Biography", "History"],
    rating: 8.9,
    duration: "3h 00m",
    language: "English",
    releaseDate: "July 2023",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    featured: true,
    price: { standard: 200, premium: 320, vip: 480 },
    cities: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    theaters: [
      {
        name: "PVR Director's Cut",
        location: "Vasant Kunj, Delhi",
        showtimes: ["10:00 AM", "02:00 PM", "06:00 PM", "09:45 PM"]
      },
      {
        name: "Miraj Cinemas 4K",
        location: "Connaught Place, Delhi",
        showtimes: ["11:30 AM", "03:45 PM", "07:30 PM"]
      }
    ]
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    tagline: "It's how you wear the mask that matters.",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=80",
    genre: ["Animation", "Action", "Adventure"],
    rating: 8.7,
    duration: "2h 20m",
    language: "English",
    releaseDate: "June 2023",
    director: "Joaquim Dos Santos, Kemp Powers",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac", "Daniel Kaluuya"],
    trailerUrl: "https://www.youtube.com/watch?v=cqGjhVJWtEg",
    featured: false,
    price: { standard: 180, premium: 280, vip: 450 },
    cities: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    theaters: [
      {
        name: "PVR Superplex",
        location: "Koramangala, Bengaluru",
        showtimes: ["10:30 AM", "01:15 PM", "04:30 PM", "07:45 PM"]
      },
      {
        name: "INOX Forum South",
        location: "Kanakapura, Bengaluru",
        showtimes: ["11:45 AM", "03:00 PM", "06:15 PM", "09:30 PM"]
      }
    ]
  },
  {
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans through a mysterious wormhole near Saturn.",
    poster: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80",
    genre: ["Sci-Fi", "Drama", "Adventure"],
    rating: 8.7,
    duration: "2h 49m",
    language: "English",
    releaseDate: "November 2014",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    featured: true,
    price: { standard: 200, premium: 320, vip: 480 },
    cities: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    theaters: [
      {
        name: "Prasads IMAX Screen Large",
        location: "Necklace Road, Hyderabad",
        showtimes: ["10:00 AM", "01:30 PM", "05:00 PM", "08:45 PM"]
      },
      {
        name: "AMB Cinemas Super Screen",
        location: "Gachibowli, Hyderabad",
        showtimes: ["11:15 AM", "03:00 PM", "06:45 PM", "10:15 PM"]
      }
    ]
  },
  {
    title: "The Dark Knight",
    tagline: "Why so serious?",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80",
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    duration: "2h 32m",
    language: "English",
    releaseDate: "July 2008",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    featured: false,
    price: { standard: 190, premium: 300, vip: 460 },
    cities: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    theaters: [
      {
        name: "PVR Icon Pavillion Mall",
        location: "SB Road, Pune",
        showtimes: ["10:45 AM", "02:15 PM", "06:00 PM", "09:30 PM"]
      },
      {
        name: "Cinepolis Seasons Mall",
        location: "Magarpatta, Pune",
        showtimes: ["12:30 PM", "04:00 PM", "07:30 PM"]
      }
    ]
  },
  {
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    duration: "2h 28m",
    language: "English",
    releaseDate: "July 2010",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    featured: false,
    price: { standard: 200, premium: 320, vip: 480 },
    cities: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    theaters: [
      {
        name: "SPI Palazzo The Forum Vijaya Mall",
        location: "Vadapalani, Chennai",
        showtimes: ["11:00 AM", "02:45 PM", "06:30 PM", "10:00 PM"]
      },
      {
        name: "PVR Grand Mall",
        location: "Velachery, Chennai",
        showtimes: ["10:15 AM", "01:30 PM", "05:15 PM", "09:00 PM"]
      }
    ]
  },
  {
    title: "Deadpool & Wolverine",
    tagline: "Everyone deserves a happy ending.",
    description: "Wolverine is recovering from his injuries when he crosses paths with the loudmouth, unpredictable Deadpool. They team up to defeat a common enemy in a high-octane multiversal romp filled with humor and wild action.",
    poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80",
    genre: ["Action", "Comedy", "Sci-Fi"],
    rating: 8.1,
    duration: "2h 08m",
    language: "English",
    releaseDate: "July 2024",
    director: "Shawn Levy",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin", "Matthew Macfadyen"],
    trailerUrl: "https://www.youtube.com/watch?v=73_1biulkYk",
    featured: true,
    price: { standard: 250, premium: 380, vip: 550 },
    cities: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    theaters: [
      {
        name: "PVR ECX",
        location: "Chanakyapuri, Delhi",
        showtimes: ["10:30 AM", "01:45 PM", "05:15 PM", "08:30 PM", "11:15 PM"]
      },
      {
        name: "Cinepolis DLF Place",
        location: "Saket, Delhi",
        showtimes: ["11:00 AM", "02:15 PM", "06:00 PM", "09:15 PM"]
      }
    ]
  },
  {
    title: "RRR",
    tagline: "Rise, Roar, Revolt.",
    description: "A fearless warrior on a perilous mission comes face to face with a steely cop serving British forces in pre-independent India. A profound brotherhood forms between the two before their opposing loyalties ignite an explosive conflict.",
    poster: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
    genre: ["Action", "Drama", "History"],
    rating: 8.8,
    duration: "3h 07m",
    language: "Telugu",
    releaseDate: "March 2022",
    director: "S. S. Rajamouli",
    cast: ["N. T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt", "Ajay Devgn"],
    trailerUrl: "https://www.youtube.com/watch?v=f_vbAtFSEc0",
    featured: false,
    price: { standard: 210, premium: 340, vip: 500 },
    cities: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    theaters: [
      {
        name: "Prasads Multiplex",
        location: "Hyderabad",
        showtimes: ["10:15 AM", "02:00 PM", "06:30 PM", "10:15 PM"]
      },
      {
        name: "PVR Irrum Manzil",
        location: "Khairatabad, Hyderabad",
        showtimes: ["11:30 AM", "03:15 PM", "07:00 PM"]
      }
    ]
  }
];

module.exports = seedMovies;
