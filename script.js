// Функция переключения вкладок
// Функция переключения вкладок (Меню, Игра, Настройки и т.д.)
function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

// Изменение цвета доски
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

// Начальная расстановка
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

// Переменная для хранения выбранной клетки
let selectedSquare = null;

function createBoard() {
    boardElement.innerHTML = ''; 

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            
            // Чередование клеток
            if ((row + col) % 2 === 0) {
                square.classList.add('light');
            } else {
                square.classList.add('dark');
            }

            square.textContent = initialBoard[row][col];
            square.dataset.row = row;
            square.dataset.col = col;

            // ДОБАВЛЯЕМ СЛУШАТЕЛЬ КЛИКОВ
            square.addEventListener('click', handleSquareClick);

            boardElement.appendChild(square);
        }
    }
}

// Логика движения фигур
function handleSquareClick(event) {
    const clickedSquare = event.currentTarget;

    // 1. Если кликнули на ту же самую клетку - снимаем выделение
    if (selectedSquare === clickedSquare) {
        clickedSquare.classList.remove('selected');
        selectedSquare = null;
        return;
    }

    // 2. Если фигура еще не выбрана, и кликнули по непустой клетке
    if (!selectedSquare && clickedSquare.textContent !== '') {
        selectedSquare = clickedSquare;
        clickedSquare.classList.add('selected');
    } 
    // 3. Если фигура уже выбрана - делаем ход
    else if (selectedSquare) {
        // Переносим символ фигуры в новую клетку (даже если там враг - он заменяется, то есть рубится)
        clickedSquare.textContent = selectedSquare.textContent;
        // Очищаем старую клетку
        selectedSquare.textContent = '';
        
        // Убираем подсветку
        selectedSquare.classList.remove('selected');
        selectedSquare = null;
    }
}

// Запускаем
createBoard();rd();
