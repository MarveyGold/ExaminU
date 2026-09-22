// Everything the landing page says lives here, so you can update a number or a
// sentence without touching markup. Keep every claim true: investors, grant
// panels and sponsors will read this page closely.

export const landing = {
  meta: {
    title: "ExaminU: practise the questions your exam is most likely to ask",
    description:
      "Free exam practice for UNIBEN students. Pick your course and work through the questions most likely to come out, right in your phone browser."
  },

  hero: {
    headline: "Practise the questions your exam is most likely to ask",
    sub: "Pick a course, answer the questions most likely to come out, and check yourself as you go. Free to start, and it runs in your phone browser.",
    cta: "Start practising",
    ctaReturning: "Continue practising",
    secondary: "See how it works"
  },

  award: {
    title: "Tech Startup of the Year",
    by: "Beyond the Code Awards, NACOS UNIBEN"
  },

  // Update these as the numbers change.
  facts: [
    { value: "1,500", label: "students in the beta" },
    { value: "20+", label: "courses to practise" },
    { value: "Free", label: "to start" }
  ],

  study: {
    title: "Study wherever you already are",
    body: "Open ExaminU straight in your phone's browser, or add it to your home screen for a one-tap icon and a faster launch every time."
  },

  steps: {
    title: "How ExaminU works",
    items: [
      {
        title: "Choose your course",
        body: "Browse 20+ university courses, or the ASP subjects if you are preparing for Post-UTME."
      },
      {
        title: "Answer the likely questions",
        body: "Work through questions picked because they are the most likely to appear in your exam."
      },
      {
        title: "Check and go again",
        body: "See the correct answer, learn from what you missed, and repeat before the paper."
      }
    ]
  },

  trust: {
    title: "Practice you can trust",
    body: "ExaminU is a practice tool. We can't see your exam paper and we don't sell leaked questions. What we do is put the questions most likely to come out in front of you first, so your study hours go where they count.",
    link: "Spotted a wrong answer? Tell us."
  },

  partners: {
    title: "Build with ExaminU",
    cta: "Talk to us",
    items: [
      {
        title: "Sponsors and brands",
        body: "Exam season is when UNIBEN students spend the most time on ExaminU. Reach them while they are focused, without getting in the way of their practice."
      },
      {
        title: "Schools and student bodies",
        body: "Want ExaminU on your campus? We are looking at schools beyond UNIBEN. Tell us where you are and what your students study."
      }
    ]
  },

  // Add real student quotes here and the section appears by itself.
  // { quote: "…", name: "Ada", detail: "300 level, Microbiology" }
  testimonials: [],

  contact: {
    title: "Tell us what to fix or add",
    body: "Missing a course, a wrong answer, or an idea? It comes straight to us."
  },

  footer: {
    blurb: "Exam practice for university students, built at the University of Benin."
  },

  // Turn whole sections on or off.
  show: { partners: true },

  // Sample questions for the hero. Swap these for real questions from your
  // bank when you are ready. answer is the index of the correct option.
  samples: [
    {
      course: "Biology",
      question: "Which organelle produces most of a cell's ATP?",
      options: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Lysosome"],
      answer: 1,
      why: "Mitochondria make most of a cell's ATP during aerobic respiration."
    },
    {
      course: "Chemistry",
      question: "How many moles are in 36 g of water? (H\u00a0=\u00a01, O\u00a0=\u00a016)",
      options: ["0.5 mol", "1 mol", "2 mol", "4 mol"],
      answer: 2,
      why: "The molar mass of H₂O is 18 g/mol, so 36 g ÷ 18 g/mol = 2 mol."
    },
    {
      course: "Physics",
      question: "A car moves at a constant 20 m/s for 15 s. How far does it travel?",
      options: ["35 m", "75 m", "300 m", "3,000 m"],
      answer: 2,
      why: "Distance = speed × time, so 20 m/s × 15 s = 300 m."
    }
  ]
};
