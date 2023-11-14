const { app , BrowserWindow, Menu} = require ('electron');
const path = require('path');
const url = require('url');

/*reiniciara cuando no este en produccion */
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname,{
     electron: path.join(__dirname, '../node_modules','.bin','electron')
    })
};
/* */

let mainWindow 
let newProductWindow

/*inicio de aplicacion index.html*/
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/index.html'),
        protocol: 'file',
        slashes: true
    }))
/**/
    
/* Uso del  menu */
   const mainMenu =  Menu.buildFromTemplate(templateMenu)
   Menu.setApplicationMenu(mainMenu);
/**/
});

/*Crear nueva ventana*/
function createNewProductWindow(){
    newProductWindow = new BrowserWindow({  
        width:400,
        height:400,
        title: 'New Product'
    });
    newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }))
}
/**/

/* Creacion del Menu */
const templateMenu = [
    {
        label: 'File',
        submenu: [{

            label:'New Product',
            accelerator: 'Ctrl+N',
            click(){
                createNewProductWindow()
            }
        }]
    }
];
/**/
