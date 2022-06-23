##dependencias
Your global Angular CLI version (13.0.4) is greater than your local version (12.2.12). The local Angular CLI version is used.

To disable this warning use "ng config -g cli.warnings.versionMismatch false".

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 12.2.12
Node: 14.18.1
Package Manager: npm 6.14.15
OS: win32 x64

Angular: 12.2.12
... animations, cli, common, compiler, compiler-cli, core, forms
... localize, platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1202.12
@angular-devkit/build-angular   12.2.12
@angular-devkit/core            12.2.12
@angular-devkit/schematics      12.2.12
@angular/cdk                    13.0.0
@schematics/angular             12.2.12
rxjs                            6.6.7
typescript                      4.3.5

#node https://nodejs.org/download/release/v14.18.1/node-v14.18.1-x64.msi
#angualr
npm install -g angular-cli
##### angular-devkit
npm i @angular-devkit/build-angular


# akdrilling-SAS
mantenedor proceso akdrilling
Compilar
cd .\akdrilling\
ng build  --build-optimizer=true
despues de la compilacion se realizar los siguientes cambios

archivo index.html

cambiar
<base href="/">
por 
<base href="/SASStoredProcess/do?_action=form,properties,execute,newwindow&_program=&_program=%2FAKD+International%2FSTP%2FakdrillingU">

<link rel="icon" type="image/x-icon" href="favicon.ico">
por 
<link rel="icon" type="image/x-icon" href="/akdrilling/favicon.ico">

el numero 156835ed4512ae7b1048 cambia segun la compilación 

<link rel="stylesheet" href="styles.156835ed4512ae7b1048.css" media="print" onload="this.media='all'"><noscript>
  por
<link rel="stylesheet" href="styles.156835ed4512ae7b1048.css" media="print" onload="this.media='all'"><noscript>
  

<link rel="stylesheet" href="styles.156835ed4512ae7b1048.css">
por  
<link rel="stylesheet" href="/akdrilling/styles.156835ed4512ae7b1048.css">
  
<script src="runtime.f713547debce43449c46.js" defer></script>
por
<script src="/akdrilling/runtime.f713547debce43449c46.js" defer></script>
  
<script src="polyfills.e17ac4faa66348c5f0fd.js" defer></script>
por 
<script src="/akdrilling/polyfills.e17ac4faa66348c5f0fd.js" defer></script>
  
<script src="scripts.e9377bcb9b349cc088ea.js" defer></script>
por 
<script src="/akdrilling/scripts.e9377bcb9b349cc088ea.js" defer></script>
  
  
<script src="main.29661f5f494d9ce2ac39.js" defer></script>
por
<script src="/akdrilling/main.29661f5f494d9ce2ac39.js" defer></script>
  
archivo runtime.js
buscar u=e=>e
 
cambiarla por 
  u=e=>"../../akdrilling/"+e+
  
instalar las fuentes en la ruta:
     /sasbin/config/Lev1/Web/WebServer/htdocs/akdrilling
     antes respaldar 
     rm -rf bkp
     mkdir bkp 
     mv * bkp

y el archivo index.html
     /sasdata/akdrilling
     
    
  
  
  
