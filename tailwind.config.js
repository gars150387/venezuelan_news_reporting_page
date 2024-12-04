/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        backgroundImage: {
          'venezuela-flag': "url('https://leydeajustevenezolano.org/wp-content/uploads/2021/05/COVER-WEB.png')",
          'lav-title': "url('https://leydeajustevenezolano.org/wp-content/uploads/2024/04/LOGO-LEY-DE-AJUSTE-7-STARS-07-1024x233.png')",
        }
      },
    },
    plugins: [],
  };
  