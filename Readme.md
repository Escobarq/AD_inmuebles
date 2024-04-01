
![Logo](https://drive.google.com/file/d/1hfKMctu47WxmcKI-y-HZFnphfQ5URkrM/view?usp=sharing)


# Tauri - Adminmuebles

Guia para rapida para correr el proyecto y ejecutarlo de manera correcta sin errores



## Autores

- [@Arenasssss](https://github.com/Arenasssss)
- [@Jeison](https://github.com/jeisonwaldir)
- [@IngSg](https://github.com/IngSg)
## Ejecutar
Notas:
Por favor tener instalado el lenguaje de rust y librerias de c++ de visual studio 2019 el 2022 no funcionan 

1.Clonar con git el repositrio e instala las dependencias en la ruta del proyecto 

```bash
  git clone https://github.com/Escobarq/AD_inmuebles.git
  cd frontend
```

2.Ya en la carpeta Instalar las dependencias en la ruta del proyecto 

```bash
  npm install
```
2.Despues de instalar las dependencias solo ejecutas el sigueinte comando

```bash
  npm run tauri dev
```
Gracias a este comando primero ejecuta el proyecto en web en segundo plano y despues ejecuta la ventana de tauri la primera vez demorara bastante ten paciencia

3.Ya que estas terminando de ejecutar el poryecto en frontend ahora es turno de l backend es casi el mismo proceso del paso 1 con la unica diferencia que te moveras a backend de la siguiente forma

```bash
  cd backend
```
4.Instala las dependencias en esa misma carpeta con

```bash
  npm install
```

5.Ahora para ejecutar solo necesitas este comando ya que esta configurado con nodemon

```bash
  nodemon src/index.js 
```
## Imagenes

![App Screenshot](https://github.com/Escobarq/AD_inmuebles/blob/31e65ddafb518b803cd43699fd03e58747c3dd40/public/Home.png)

