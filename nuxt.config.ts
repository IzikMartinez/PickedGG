// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        'nuxt-windicss',
        '@nuxtjs/supabase',
        [
        '@pinia/nuxt',
            { 
                autoImports: [
                    'defineStore',
                    'StateTree',
                    ['defineStore', 'definePiniaStore']
                ],
            },
        ]
    ],
    imports: {
        dirs: [
            'composables/types/*.ts',
            'state/*.ts'
        ]
    },
    typescript: {
        shim: false
    }
})
