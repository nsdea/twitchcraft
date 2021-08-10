module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    mode: 'jit',
    darkMode: 'media',
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
        backgroundColor: ['children', 'DEFAULT', 'hover', 'focus', 'motion-save'],
        fontSize: ['DEFAULT', 'motion-save', 'hover'],
    },
    corePlugins: {
        preflight: true,
    },
    purge: [
        '*.html,*.ejs,*.ts,*.js',
        '**/*.{js,jsx,ts,tsx,vue,ejs,html}',
    ],
}