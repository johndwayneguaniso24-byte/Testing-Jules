const questions = [
  {
    prompt: 'Which tag is used to connect a CSS file to an HTML page?',
    answers: ['<script>', '<link>', '<style-src>', '<css>'],
    correctIndex: 1,
  },
  {
    prompt: 'In React, what hook is commonly used to store changing game state?',
    answers: ['useMap', 'useState', 'usePage', 'useStorefront'],
    correctIndex: 1,
  },
  {
    prompt: 'Which command creates a production-ready Vite build?',
    answers: ['npm run build', 'npm run dev', 'npm start vite', 'npm deploy local'],
    correctIndex: 0,
  },
  {
    prompt: 'What does responsive design help a website do?',
    answers: ['Load only on desktops', 'Work well on different screen sizes', 'Block mobile users', 'Remove all styling'],
    correctIndex: 1,
  },
  {
    prompt: 'Which CSS property is best for arranging cards in rows and columns?',
    answers: ['font-style', 'display: grid', 'text-shadow', 'cursor'],
    correctIndex: 1,
  },
  {
    prompt: 'For GitHub Pages with Vite, what config often needs the repository path?',
    answers: ['server.port', 'base', 'plugins.react', 'preview.host'],
    correctIndex: 1,
  },
  {
    prompt: 'What is the purpose of the "key" prop in React lists?',
    answers: ['To style elements', 'To uniquely identify elements for performance', 'To set the element ID', 'To create a database primary key'],
    correctIndex: 1,
  },
  {
    prompt: 'Which tool is used to manage JavaScript packages?',
    answers: ['Git', 'npm', 'Vite', 'Docker'],
    correctIndex: 1,
  },
  {
    prompt: 'What does CSS stand for?',
    answers: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Symbols', 'Colorful Style Sheets'],
    correctIndex: 0,
  },
  {
    prompt: 'Which HTML element is used for the largest heading?',
    answers: ['<heading>', '<h6>', '<h1>', '<head>'],
    correctIndex: 2,
  },
  {
    prompt: 'In JavaScript, how do you declare a constant variable?',
    answers: ['var', 'let', 'const', 'constant'],
    correctIndex: 2,
  },
  {
    prompt: 'What is the correct way to write an arrow function in JS?',
    answers: ['function => {}', '() => {}', '=> () {}', 'func() => {}'],
    correctIndex: 1,
  }
];

export default questions;
