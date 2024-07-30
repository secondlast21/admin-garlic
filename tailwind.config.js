/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: { max: '640px' },
      md: { max: '890px' },
      lg: { min: '1023px' },
    },
    extend: {
      colors: {
        s1: '#10a063', //hijau mocca
        s2: '#ffcd42', //kuning mocca
        s3: '#e99b5C', //orange mocca
        n: '#ce5050', //merah mocca
        bl: '#6f6f6f',
        title: '#40a02b', //hijau
        pfp: '#f7f7f7', //abu
        accent: '#a6e3a1',
        primaryLight: '#e8f1ed',
        primaryLightHover: '#dceae4',
        primaryLightActive: '#b7d4c8',
        primary: '#17754d',
        primaryHover: '#156945',
        primaryActive: '#125e3e',
        secondaryLight: '#fcf6e9',
        secondaryLightHover: '#faf2de',
        secondaryLightActive: '#f5e4bc',
        secondary: '#dfa926',
        secondaryHover: '#c99822',
        secondaryActive: '#b2871e',
        tertieryLight: '#edeff4',
        tertieryLightHover: '#e4e7ee',
        tertieryLightActive: '#c6ccdc',
        tertiery: '#485c8e',
        tertieryHover: '#415380',
        tertieryActive: '#3a4a72',
        successLight: '#c8e6c9',
        success: '#4caf50',
        warningLight: '#fedfbc',
        warning: '#fd9726',
        dangerLight: '#f4c1be',
        danger: '#dc326e',
        informationLight: '#e6f7ff',
        information: '#69c0ff',
        greyLight: '#f0f2f5',
        grey: '#a3a3a3',
        black: '#1c1c1c',
      },
      height: {
        128: '32rem',
      },
      width: {
        128: '32rem',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#eff1f5', //putih abu latte
          secondary: '#6c6f85', //abu muda
          accent: '#a6e3a1', // hijau mocca
          neutral: '#4c4f69', // abu tua latte
          'base-100': '#ffffff', // putih abu latte
          info: '#04a5e5', // biru langit latte
          success: '#40a02b', // hijau latte
          warning: '#df8e1d', // kuning latte
          error: '#ce5050',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}

