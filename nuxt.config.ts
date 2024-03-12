// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        'nuxt-windicss',
        '@nuxt/devtools',
        'nuxt-vitest',
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
    },
    vite: {
        build: {
            target: "esnext"
        }
    },
    devtools: {
        enabled: true,
        vscode: {}
    }
})
