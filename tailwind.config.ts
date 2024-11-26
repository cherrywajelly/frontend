import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // color palette
        'primary-main': '#DE9463',
        'secondary-main': '#A37D64',
        'success-main': '#6591FF',
        'warning-main': '#FFD66A',
        'error-main': '#FF6A6A',
        'black-main': '#272222',

        // gray scale
        'gray-05': '#F4F2F1',
        'gray-10': '#E9E6E4',
        'gray-20': '#D0C7C4',
        'gray-40': '#A79F9C',
        'gray-60': '#89827F',
        'gray-80': '#4E4540',
      },
      fontSize: {
        h1: [
          '2rem', // 32px
          {
            fontWeight: 'bold',
            lineHeight: '150%',
            letterSpacing: '-2%',
          },
        ],
        h2: [
          '1.5rem', // 24px
          {
            fontWeight: 'regular',
            lineHeight: '150%',
            letterSpacing: '-2%',
          },
        ],
        subtitle1: [
          '1.25rem', //20px
          {
            fontWeight: 'bold',
            lineHeight: '160%',
            letterSpacing: '-2%',
          },
        ],
        subtitle2: [
          '1.25rem', //20px
          {
            fontWeight: 'regular',
            lineHeight: '160%',
            letterSpacing: '-2%',
          },
        ],
        subtitle3: [
          '1.125rem', //18px
          {
            fontWeight: 'bold',
            lineHeight: '155%',
            letterSpacing: '-2%',
          },
        ],
        subtitle4: [
          '1.125rem', //18px
          {
            fontWeight: 'regular',
            lineHeight: '155%',
            letterSpacing: '-2%',
          },
        ],
        body1: [
          '1rem', //16px
          {
            fontWeight: 'bold',
            lineHeight: '150%',
            letterSpacing: '-2%',
          },
        ],
        body2: [
          '1rem', //16px
          {
            fontWeight: 'regular',
            lineHeight: '150%',
            letterSpacing: '-2%',
          },
        ],
        body3: [
          '0.875rem', //14px
          {
            fontWeight: 'bold',
            lineHeight: '140%',
            letterSpacing: '-2%',
          },
        ],
        body4: [
          '0.875rem', //14px
          {
            fontWeight: 'regular',
            lineHeight: '140%',
            letterSpacing: '-2%',
          },
        ],
        body5: [
          '0.75rem', //12px
          {
            fontWeight: 'regular',
            lineHeight: '130%',
            letterSpacing: '-2%',
          },
        ],
        navigation1: [
          '0.75rem', //12px
          {
            fontWeight: 'semibold',
            lineHeight: '130%',
            letterSpacing: '-2%',
          },
        ],
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      backgroundImage: {
        'template-pattern': "url('/images/toast/toast-template.png')",
      },
    },
  },
  plugins: [],
};
export default config;
