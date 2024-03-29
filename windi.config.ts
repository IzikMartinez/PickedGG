import {defineConfig} from 'windicss/helpers'

export default defineConfig({
    attributify: true,
    theme: {
        extend: {
            colors: {
                darkteal: '#004543',
                out: '#1C2442',
                upr: '#3A0101',
            },
            fontFamily: {
                'display': ['"Bebas Neue"'],
            }
        }
    },
    shortcuts: {
        'cardbox-small': 'flex flex-wrap lg:w-[84rem] w-[30rem] gap-1 justify-center overflow-auto',
        'cardbox-medium': 'flex flex-wrap xl:w-[85rem] w-[34rem] justify-center items-center overflow-auto translate-y-0 transition-all duration-150 ease-linear'
    },
    plugins: [
        require('@windicss/plugin-scrollbar')
    ]
})