
// Задание 10.3
/*1. Реализовать чат на основе эхо-сервера wss://echo.websocket.org/
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
Эхо-сервер будет отвечать вам тем же сообщением, 
его также необходимо выводить в чат:
2. Добавить в чат механизм отправки гео-локации
При клике на кнопку «Гео-локация» необходимо отправить данные серверу и
 в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. 
 Сообщение, которое отправит обратно эхо-сервер, не выводить. */


// Ищем кнопки
const btnSend = document.querySelector('.button_1');
const btnGEO = document.querySelector('.button_2');
// Ищем ноду для вставки результата запроса
const result = document.querySelector('.result');
const infoOutput = document.querySelector('.info_output');
// создаем пустой объект, в который запишем объект соединения с севером - websocket
let websocket;
// API эхо-сервера
const wsUri = "wss://echo.websocket.org/";


function pageLoaded () {
  //* реализация чата
  websocket = new WebSocket(wsUri);
  websocket.onopen = (event) => {
    infoOutput.innerText = "Соединение установлено";
  }
  websocket.onerror = (event) => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  }
  websocket.onmessage = (event) => {
    result.innerHTML += '<span class = "mass_serv"> СЕРВЕР: ' + event.data + '</span>'; /*вставка нового Элемента в result*/
  }
  
  btnSend.addEventListener('click', () => {
    massege_user = document.querySelector('.input_1').value; /** поиск и получение данных из input. */
    if (!massege_user) {return} 
    else {
      websocket.send(massege_user); // *отправляем сообщение эхо-серверу
      result.innerHTML += `<span class = "mass_user"> ПОЛЬЗОВАТЕЛЬ: ${massege_user} </span>`; /*вставка нового Элемента d result*/
    }
})

// реализация гео-локации
// Функция, выводящая текст об ошибке (передается объек position после запуска метода getCurrentPosition)
const error = (position) => {
  // result.innerHTML += 'Невозможно получить местоположение пользователя';
  alert ('Невозможно получить местоположение пользователя');
}

// Функция, срабатывающая при успешном получении геолокации, передается объек position (после запуска метода getCurrentPosition)
const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  result.innerHTML += `<a class = "geo" href = https://www.openstreetmap.org/#map=18/${latitude}/${longitude} target="_blank">Пользователь находится здесь </a>`;
}

btnGEO.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert ("Geolocation не поддерживается вашим браузером")
  } else {
    alert ("Определение местоположения...")
    navigator.geolocation.getCurrentPosition(success, error); // с помощью метода getCurrentPosition получения geo-данные пользователя и запускаем функции
  }
});
}

// После загрузки страницы, запускаем функцию pageLoaded
document.addEventListener("DOMContentLoaded", pageLoaded); 