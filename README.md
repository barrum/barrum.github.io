# resume
Сброшены поля для удобства. Фон выводиться на печать.

Шрифты использовать только google, подключать в главном html так как будет один html 

Ширина максимальная равна 794 px для печати А4
поэтому используются только эти точки:
@media (min-width: @s), print {} 
@media (min-width: @m), print {} 

По-умолчанию используется font-family: "Open Sans", Arial, sans-serif;

Не забыть выводить ссылки на печать

Установлен плагин для кодирования img в base64 - https://www.npmjs.com/package/gulp-img64
В папке build создается подпапка base64 с файлом index.html
Не забыть перенести стили в index.html или найти плагин, который будет делать это автоматом.

![Иллюстрация](https://github.com/barrum/kp-oknarosta/raw/ma/_src/img/all-optim.png)
