// Функция переключения вкладок
function openTab(tabId) {
    // Скрываем все секции
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Показываем нужную
    document.getElementById(tabId).classList.add('active');
}

// Изменение цвета доски из настроек
function changeTheme(themeName) {
    const board = document.getElementById('chessboard');
    if (themeName === 'blue') {
        board.classList.add('theme-blue');
    } else {
        board.classList.remove('theme-blue');
    }
}

// Генерация шахматной доски
const boardElement = document.getElementById('chessboard');

// Начальная расстановка фигур
const initialBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

function createBoard() {
    boardElement.innerHTML = ''; // Очищаем доску

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            
            // Чередование черных и белых клеток
            if ((row + col) % 2 === 0) {
                square.classList.add('light');
            } else {
                square.classList.add('dark');
            }

            // Устанавливаем фигуру, если она есть в массиве
            square.textContent = initialBoard[row][col];
            
            // Добавляем координаты для будущего программирования ходов
            square.dataset.row = row;
            square.dataset.col = col;

            boardElement.appendChild(square);
        }
    }
}

// Запускаем отрисовку доски при загрузке страницы
createBoard();
