const electron = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");
const { ipcMain } = require("electron").ipcMain;
const { webContents } = require('electron')

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on("ready", function() {
  mainWindow = new BrowserWindow({});

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: false,
      slashes: true
    })
  );

  mainWindow.webContents.send('test', 123);


  const mainMenuTemplate = [
    {
      label: "File",
      submenu: [
        { label: "New" },
        { label: "Open" },
        {
          label: "Save As",
          click() {
            
            mainWindow.webContents.executeJavaScript(`saveTextAsFile()`);

          }
        },
        {
          label: "Exit",
          click() {
            app.quit();
          }
        }
      ]
    }
  ];

  mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

app.on("close", function() {
  mainWindow = null;
});

/* function saveFile(){

    fs.writeFile('message.txt', "test", (err) => {

        if (err) throw err;
        console.log('The file has been saved!');
        
    });

}; */

/*function saveToFileJS(){

    //mainWindow.loadUrl('file://' + __dirname + '/mainWindow.html');
    mainWindow.webContents.on('did-finish-load', ()=>{

        saveTextAsFile();
        
        mainWindow.webContents.executeJavaScript(saveTextAsFile);

    });

};*/

/*function saveToFileJS(){

    var htmlFile = require(url.format({

    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: '',
    slashes: false

    }));

    htmlFile.saveTextAsFile();

};*/
