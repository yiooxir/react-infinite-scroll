# В разработке

Требования к компоненту
* Отображает часть (страницу) из выборки.
* Следит за скроллом и при определенном пороге делает запрос на добавление элементов
* Умеет следить за скролом вверх и вниз
* Умеет делать заданные смещения скрола


Компонент принимает список реакт-объектов для отрисовки.
В качестве параметров принимает:

 page {number} 1 - страница отрисовки
 pages {number} 1 - общее количество объектов в системе.
 shift {number} 30 - процент смещения скрола вниз.
 load {function} - коллбэк. в аргументы передает текущую страницу и следующую (запрашиваемую) страницу.
 children {ReactComponents}
 threshold: {number} - процент при котором будет очередной запрос на добавление элементов
 loader: - элемент для отображения, если объекты не успели подгрузиться

##Принцип работы:

if pages > page при смещении на shift будет вызван load(page, reqPage).  При этом верхний компонент должен будет добавить в children новые объекты запрашиваемой страницы.

if pages == page просто отрисовка. слежение за скролом не подключается. => load не работает.

if page > 1.  Автоматическое смещение скрола на величину shift

if page == pages  load на нижнюю страницу не сработает

if page == 1 shift нет, лоадер 


```js
gulp develop
```


# ReactJS + JEST + GULP + JSPM - Seed

Seed project for writing ReactJS components in TDD fashion. This seed uses Jest for unit testing, Gulp for building and JSPM as the browser package manager.

**Note:** We use System.js ( comes with JSPM ) for module loading.

## Install

Clone this repo and run npm install
```
git clone git@github.com:shidhincr/react-jest-gulp-jspm-seed.git

npm install
```

## Usage 

There are two main gulp tasks. Run both tasks in two different terminal tabs, so that you can develop the component in TDD way.

**Develop**

```js 
gulp develop
```

This task will open the browser ( using BrowserSync ) and load the `index.html`. It will then wait for any changes in the scripts folder, and reload the browser.

**Test**

```js 
gulp test
```

This task runs the unit tests using `jest`. It will also wait for any changes in the `__tests__` or `scripts` folder to re-run the tests.