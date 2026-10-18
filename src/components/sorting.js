import { sortCollection, sortMap } from "../lib/sort.js";

export function initSorting(columns) {
    return (data, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === "sort") {
            // @todo: #3.1 — запомнить выбранный режим сортировки
            // Сохраним и применим как текущее следующее состояние из карты
            action.dataset.value = sortMap[action.dataset.value];
            // Информация о сортируемом поле есть также в кнопке
            field = action.dataset.field;
            // Направление заберём прямо из датасета для точности
            order = action.dataset.value;
            // @todo: #3.2 — сбросить сортировки остальных колонок
            // Перебираем элементы (в columns у нас массив кнопок)
            columns.forEach((column) => {
                // Если это не та кнопка, что нажал пользователь
                if (column.dataset.field !== action.dataset.field) {
                    // тогда сбрасываем её в начальное состояние
                    column.dataset.value = "none";
                }
            });
        } else {
            // @todo: #3.3 — получить выбранный режим сортировки
            // Перебираем все наши кнопки сортировки
            columns.forEach((column) => {
                // Ищем ту, что находится не в начальном состоянии (предполагаем, что одна)
                if (column.dataset.value !== "none") {
                    // Сохраняем в переменных поле
                    field = column.dataset.field;
                    // и направление сортировки
                    order = column.dataset.value;
                }
            });
        }

        return sortCollection(data, field, order);
    };
}
