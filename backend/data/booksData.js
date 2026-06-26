const booksData = [
  
  {
  img: "/book1.jpg",
  title: "Buddy",

  description: "Basic arithmetic and number system for beginners.",
  className: "Class 1",

  type: "Semester", // ✅ valid

  category: "Navbodh",
  subject: "Maths",

  fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/maths1.pdf", // ✅ still required
},
  {
    img: "/book12.jpg",
    title: "Little Lamp",
   
    description: "Basic English reading and grammar skills.",
    className: "Class 1",
    type: "Semester",
    category: "Navbodh",
    subject: "English",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/english1.pdf",
  },
  {
    img: "/book21.jpg",
    title: "Little Lamp",
    
    description: "Hindi alphabets, words and sentence building.",
    className: "Class 1",
    type: "Semester",
    category: "Navbodh",
    subject: "Hindi",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/hindi1.pdf",
  },
  {
    img: "/book22.jpg",
    title: "Buddy",
   
    description: "Introduction to science and daily life concepts.",
    className: "Class 1",
    type: "Semester",
    category: "Navbodh",
    subject: "Science",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/science1.pdf",
  },
  {
    img: "/book23.jpeg",
    title: "Little Lamp",
    
    description: "Environment and surroundings basics.",
    className: "Class 1",
    type: "Semester",
    category: "Navbodh",
    subject: "EVS",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/evs1.pdf",
  },

  {
    img: "/book24.jpeg",
    title: "Little Lamp",
   
    description: "Addition, subtraction and problem solving.",
    className: "Class 2",
    type: "Semester",
    category: "Navbodh",
    subject: "Maths",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/maths2.pdf",
  },
  {
    img: "/book21.jpg",
    title: "Little Lamp",

    description: "Grammar improvement and reading practice.",
    className: "Class 2",
    type: "Semester",
    category: "Navbodh",
    subject: "English",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/english2.pdf",
  },
  {
    img: "/book22.jpg",
    title: "Little Lamp",
  
    description: "Hindi grammar and writing practice.",
    className: "Class 2",
    type: "Semester",
    category: "Navbodh",
    subject: "Hindi",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/hindi2.pdf",
  },
  {
    img: "/book22.jpg",
    title: "Little Lamp",
   
    description: "Basic physics and chemistry concepts.",
    className: "Class 2",
    type: "Semester",
    category: "Navbodh",
    subject: "Science",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/science2.pdf",
  },
  {
    img: "/book23.jpeg",
    title: "Little Lamp",
    
    description: "Environment awareness and activities.",
    className: "Class 2",
    type: "Semester",
    category: "Navbodh",
    subject: "EVS",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/evs2.pdf",
  },

  {
    img: "/book26.jpeg",
    title: "Deep Dives",
   
    description: "Advanced arithmetic and introduction to algebra.",
    className: "Class 3",
    type: "Semester",
    category: "Gyanbodh",
    subject: "Maths",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/maths3.pdf",
  },
  {
    img: "/book25.jpeg",
    title: "Hearing Bee",
   
    description: "English comprehension and grammar skills.",
    className: "Class 3",
    type: "Semester",
    category: "Gyanbodh",
    subject: "English",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/english3.pdf",
  },
  {
    img: "/book28.jpeg",
    title: "Deep Dives",
   
    description: "Hindi literature and grammar basics.",
    className: "Class 3",
    type: "Semester",
    category: "Gyanbodh",
    subject: "Hindi",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/hindi3.pdf",
  },
  {
    img: "/book29.jpeg",
    title: "Deep Dives",
   
    description: "Physics, chemistry and biology basics.",
    className: "Class 3",
    type: "Semester",
    category: "Gyanbodh",
    subject: "Science",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/science3.pdf",
  },

  {
    img: "/book30.jpeg",
    title: "Deep Dives",
   
    description: "History and geography fundamentals.",
    className: "Class 3",
    type: "Semester",
    category: "Gyanbodh",
    subject: "Social Science",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/socialscience3.pdf",
  },

  {
    img: "/book21.jpg",
    title: "Deep Dives",
  
    description: "Fractions, decimals and geometry basics.",
    className: "Class 4",
    type: "Semester",
    category: "Gyanbodh",
    subject: "Maths",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/maths4.pdf",
  },
  {
    img: "/book22.jpg",
    title: "Hearing Bee",
   
    description: "Advanced grammar and vocabulary.",
    className: "Class 4",
    type: "Semester",
    category: "Gyanbodh",
    subject: "English",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/english4.pdf",
  },
  {
    img: "/book23.jpeg",
    title: "Deep Dives",
  
    description: "Hindi literature and essay writing.",
    className: "Class 4",
    type: "Semester",
    category: "Gyanbodh",
    subject: "Hindi",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/hindi4.pdf",
  },
  {
    img: "/book29.jpeg",
    title: "Deep Dives",
 
    description: "Advanced science concepts and experiments.",
    className: "Class 4",
    type: "Semester",
    category: "Gyanbodh",
    subject: "Science",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/science4.pdf",
  },
  {
    img: "/book30.jpeg",
    title: "Deep Dives",
  
    description: "Civics, history and geography deeper concepts.",
    className: "Class 4",
    type: "Semester",
    category: "Gyanbodh",
    subject: "Social Science",
    fileUrl: "https://flipbook-1-l2tf.onrender.com/uploads/socialscience4.pdf",
  },

];

export default booksData;