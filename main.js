const { app, BrowserWindow, nativeImage } = require('electron');

require('electron-reload')(__dirname, {
  electron: require(`${ __dirname }/node_modules/electron`)
});

function createWindow() {
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/src/img/icon.png`);

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  // CRIA A JANELA
  const janela = new BrowserWindow({
    icon,
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // CARREGA A JANELA
  janela.loadFile('index.html');

  // CONSOLE
  janela.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});