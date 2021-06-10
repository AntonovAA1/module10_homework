
// Задание 10.2
/*Сверстайте кнопку, 
клик на которую будет выводить данные о размерах экрана с помощью alert. .*/


// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.button');

btnNode.addEventListener('click', () => {
  alert (`Ширина -${window.screen.width} px, Высота -  ${window.screen.height} px`)
  });
