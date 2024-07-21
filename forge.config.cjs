module.exports = {
  packagerConfig: {
    ignore: [
      /^\/src/,
      /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)/,
      /(idea)|(tsconfig.*)|(.browserslistrc)|(.editorconfig)|(.env)/,
      /(.eslintignore)|(.eslintrc.cjs)|(.gitmodules)|(.npmrc)|(.prettierignore)|(.prettierrc.yaml)/,
      /(cypress.json)|(electron.vite.README.md)|(electron-builder.yml)/,
      /(lint-staged.config.js)|(loki.config.js)|(README.md)|(yarn-error.log)/,
      /(vitest.config.ts)|(.vscode)|(resources)|(dev-app-update.yml)|(build)/
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {}
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ]
}
