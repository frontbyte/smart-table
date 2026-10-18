import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    // Получаем ключи из объекта
    Object.keys(indexes)
        // Перебираем по именам
        .forEach((elementName) => {
            // в каждый элемент добавляем опции
            elements[elementName].append(
                // формируем массив имён, значений опций
                ...Object.values(indexes[elementName])
                    // используйте name как значение и текстовое содержимое
                    .map((name) => {
                        // @todo: создать и вернуть тег опции <option value="name">name</option>
                        const optionElement = document.createElement("option");
                        optionElement.value = name;
                        optionElement.textContent = name;
                        return optionElement;
                    }),
            );
        });
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        // проверяем наличие действия и имя кнопки 'clear'
        if (action && action.name === "clear") {
            //находим input рядом с нашей кнопкой через родительский элемент кнопки
            const clearButtonContainer = action.parentElement;
            const input = clearButtonContainer.querySelector("input");
            // Для найденного поля ввода сбрасываем value
            input.value = "";
            //для соответствующего поля в state также сбрасываем значение
            const searchField = action.dataset.field;
            state[searchField] = "";
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter((row) => compare(row, state));
    };
}
