module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'public/neulab-icon.png',
        author: 'Aleksei Drobkov abkommem@gmail.com https://github.com/AlexeyDrobkovStrikesBack/neulab-release-0.1.0',
        description: "analysis of spontaneous alliterations",
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD
      },
    },
    {
      name: '@electron-forge/maker-zip'
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: 'public/neulab-icon.png',
          homepage: "https://github.com/AlexeyDrobkovStrikesBack/neulab-release-0.1.0",
          description: "analysis of spontaneous alliterations"
        }
      }
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
