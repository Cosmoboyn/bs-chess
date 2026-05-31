// Переключение вкладок (оставляем как было)
function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

// === ЛОГИКА LICHESS ===

// Инициализируем "судью" (правила)
const game = new Chess();

// Настройки для графической доски
const config = {
    draggable: true, // Включаем перетаскивание фигур
    position: 'start', // Начальная расстановка
    onDragStart: onDragStart, // Что делать при попытке взять фигуру
    onDrop: onDrop, // Что делать при опускании фигуры
    onSnapEnd: onSnapEnd // Для правильной анимации рокировок
};

// Создаем доску
const board = Chessboard('chessboard', config);

// 1. Проверка: можно ли вообще брать эту фигуру?
function onDragStart (source, piece, position, orientation) {
    // Если игра окончена (мат/ничья) — запрещаем трогать фигуры
    if (game.game_over()) return false;

    // Запрещаем белым трогать черные фигуры и наоборот
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

// 2. Проверка: можно ли так сходить?
function onDrop (source, target) {
    // "Судья" пытается сделать ход
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Если пешка дошла до конца, автоматически делаем ферзя (q - queen)
    });

    // Если ход противоречит правилам (например, конь так не ходит или открывается шах)
    // Судья возвращает null. Тогда мы отменяем ход ('snapback' - вернуть фигуру на место)
    if (move === null) return 'snapback';
}

// 3. Синхронизация доски после хода (нужно для сложных ходов вроде взятия на проходе)
function onSnapEnd () {
    board.position(game.fen());
}
