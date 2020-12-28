const { MSICreator } = require('electron-wix-msi');
const path = require('path');

(async () => {
    // Step 1: Instantiate the MSICreator
    const msiCreator = new MSICreator({
        appDirectory: path.resolve('./win-build-2/win-unpacked'),
        description: 'Config Driver',
        exe: 'Config',
        name: 'Config',
        shortName: 'Config',
        shortcutFolderName: "Config",
        shortcutName: "Config",
        programFilesFolderName: "Config",
        manufacturer: 'Abdalah',
        version: '1.0.0',
        appIconPath: path.resolve('./assets/img/setting.ico'),
        outputDirectory: path.resolve('./app-exe'),
        appUserModelId: 'com.ISEC2.app',
        ui: {
            chooseDirectory: true,
            // images: {
            //     background: path.resolve('./assets/img/setting.jpg'),
            //     banner: path.resolve('./assets/img/setting.jpg'),
            //     exclamationIcon: path.resolve('./assets/img/setting.ico'),
            //     infoIcon: path.resolve('./assets/img/setting.ico'),
            //     newIcon: path.resolve('./assets/img/setting.ico'),
            //     upIcon: path.resolve('./assets/img/setting.ico')
            // },
        },
        features: {
            autoLaunch: true
        },
        defaultInstallMode: 'perUser',
        extensions: ['WixUtilExtension', 'WixUIExtension'],

    });

    // Step 2: Create a .wxs template file
    await msiCreator.create();

    // Step 3: Compile the template to a .msi file
    await msiCreator.compile();
})().then(() => console.log('sucsses build')).catch((error) => console.log(error))



// const builder = require("electron-builder");
// const path = require('path');
// const Platform = builder.Platform.WINDOWS;

// // Promise is returned

// builder.build({
//     targets: Platform.createTarget(),
//     config: {
//         appId: "com.ISEC.app",
//         productName: "PKCS11",
//         directories: {
//             "output": "./win-build-2"
//         },
//         win: {
//             icon: "./assets/img/setting.ico",
//             artifactName: "PKCS11 win",
//             compression: 'maximum',
//         },
//         nsis: {
//             perMachine: true,
//             oneClick: false,
//             allowElevation: true,
//             allowToChangeInstallationDirectory: true,
//             createDesktopShortcut: true,
//             createStartMenuShortcut: true,
//             shortcutName: "pkcs11",
//             artifactName: "pkcs11 nsis",
//             uninstallDisplayName: "uninstallDisplayName pkcs11",
//             deleteAppDataOnUninstall: true,
//             // differentialPackage: true,
//             // displayLanguageSelector: true,
//             // installerLanguages: [`ar-EG`],
//             // language: `3073`,
//             // multiLanguageInstaller: true,
//             runAfterFinish: true,
//             installerIcon: path.resolve('./assets/img/setting.ico'),
//             uninstallerIcon: path.resolve('./assets/img/setting.ico'),
//             installerHeaderIcon: path.resolve('./assets/img/setting.ico'),
//             installerHeader: path.resolve('./assets/img/setting.ico'),
//         },
//         msi: {
//             oneClick: false,
//             artifactName: "pkcs11 msi",
//             createDesktopShortcut: true,
//             createStartMenuShortcut: true,
//             perMachine: true,
//             runAfterFinish: true,
//             shortcutName: "pkcs11",
//         }
//     }
// })
//     .then(() => {
//         // handle result
//         console.log('build done');
//     })
//     .catch((error) => {
//         // handle error
//         console.log(error, 'error');
//     })