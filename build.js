const builder = require('electron-builder')
const path = require('path')
const Platform = builder.Platform.WINDOWS

builder
  .build({
    targets: Platform.createTarget(),
    config: {
      appId: 'com.ISEC.AdminDriver',
      productName: 'AdminDriver',
      directories: {
        output: './win-build',
      },
      extraResources: ['./lib/**'],
      win: {
        icon: './assets/img/setting.ico',
        artifactName: 'AdminDriver',
        target: 'msi',
        // compression: 'maximum',
      },
      // nsis: {
      //   include: path.join(__dirname, './installer.nsh'),
      //   oneClick: false,
      //   allowElevation: true,
      //   perMachine: true,
      //   allowToChangeInstallationDirectory: true,
      //   createDesktopShortcut: true,
      //   createStartMenuShortcut: true,
      //   // shortcutName: 'userDriver',
      //   // artifactName: 'userDriver',
      //   // deleteAppDataOnUninstall: true,
      //   // uninstallDisplayName: 'uninstall userDriver',
      //   // differentialPackage: true,
      //   // displayLanguageSelector: true,
      //   // installerLanguages: [`ar-EG`],
      //   // language: `3073`,
      //   // multiLanguageInstaller: true,
      //   // runAfterFinish: true,
      //   // installerIcon: path.resolve('./assets/img/login.ico'),
      //   // uninstallerIcon: path.resolve('./assets/img/login.ico'),
      //   // installerHeaderIcon: path.resolve('./assets/img/login.ico'),
      //   // installerHeader: path.resolve('./assets/img/login.ico'),
      // },
      msi: {
        oneClick: false,
        perMachine: true,
        createStartMenuShortcut: true,
      },
      appx: {
        showNameOnTiles: true,
      },
    },
  })
  .then(() => {
    // handle result
    console.log('build done')
  })
  .catch((error) => {
    // handle error
    console.log(error, 'error')
  })
