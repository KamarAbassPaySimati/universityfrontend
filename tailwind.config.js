/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'primary-light': '#EBEAF1',
                'primary-light-hover': '#E2DFE9',
                'primary-light-active': '#C2BDD2',
                'primary-normal': '#3B2A6F',
                'primary-normal-hover': '#352664',
                'primary-normal-active': '#2F2259',
                'primary-dark': '#2C2053',
                'primary-dark-hover': '#231943',
                'primary-dark-active': '#1B1332',
                'primary-darker': '#150F27',

                'secondary-light': '#FDF1E9',
                'secondary-light-hover': '#FCEADE',
                'secondary-light-active': '#F8D3BB',
                'secondary-normal': '#EA7024',
                'secondary-normal-hover': '#D36520',
                'secondary-normal-active': '#BB5A1D',
                'secondary-dark': '#B0541B',
                'secondary-dark-hover': '#8C4316',
                'secondary-dark-active': '#693210',
                'secondary-darker': '#52270D',

                'neutral-primary': '#4F5962',
                'neutral-secondary': '#A4A9AE',
                'neutral-disable': '#D1D4D7',
                'neutral-outline': '#E5E9EB',

                'accent-positive': '#13B681',
                'accent-information': '#0066F6',
                'background-light': '#F0ECFF',
                'background-dark': '#67389A',
                'neutral-grey': '#F8F8F8',
                'accent-positive-secondary': '#DDF7F0',
                error: '#FF4343',
                background: '#F6F8F9',
                'header-dark': '#252C32'
            },
            height: {
                tableHeight: 'calc(100vh - 370px)',
                tablebodyHeight: 'calc(100vh - 411px)',
                heightFullWithPadding: 'calc(100vh - 57px)',
                noDataError: 'calc(100vh - 240px)' // tableHeight + tobbar height 49px
            },
            minHeight: {
                tableHeight: 'calc(100vh - 370px)',
                tablebodyHeight: 'calc(100vh - 411px)',
                noDataError: 'calc(100vh - 240px)'
            },
            maxHeight: {
                tableHeight: 'calc(100vh - 370px)',
                tablebodyHeight: 'calc(100vh - 411px)',
                noDataError: 'calc(100vh - 240px)'
            }
        }
    },
    plugins: []
};
