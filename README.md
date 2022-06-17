#####instalacion de dependecias

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
  
  
  
  
