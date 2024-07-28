const path = require('path')
const fs = require('fs')
module.exports = {
  hooks: {
    packageAfterCopy: async (
      config,
      buildPath,
      electronVersion,
      platform,
      arch
    ) => {
      const src = path.join(__dirname, 'node_modules/dotenv')
      const dst = path.join(buildPath, 'node_modules/dotenv')
      fs.cpSync(src, dst, { recursive: true })
    }
  },
  packagerConfig: {
    ignore: [
      /^\/src/,
      /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)/,
      /(idea)|(tsconfig.*)|(.browserslistrc)|(.editorconfig)|(.env)/,
      /(.eslintignore)|(.eslintrc.cjs)|(.gitmodules)|(.npmrc)|(.prettierignore)|(.prettierrc.yaml)/,
      /(cypress.json)|(electron.vite.README.md)|(electron-builder.yml)|(stiljira-database.json)/,
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
