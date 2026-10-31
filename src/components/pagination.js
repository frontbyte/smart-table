import { getPages } from "../lib/utils.js";

export const initPagination = (
    { pages, fromRow, toRow, totalRows },
    createPage,
) => {
    // подготавливаем шаблон кнопки для страницы и очистить контейнер

    // в качестве шаблона берём первый элемент из контейнера со страницами
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    // и удаляем его (предполагаем, что там больше ничего, как вариант, можно и всё удалить из pages)
    pages.firstElementChild.remove();

    return (data, state, action) => {
        // посчитаем количество страниц, объявим переменные и константы

        // будем часто обращаться, чтобы короче записывать
        const rowsPerPage = state.rowsPerPage;
        // число страниц округляем в большую сторону
        const pageCount = Math.ceil(data.length / rowsPerPage);
        // страница переменной, потому что она может меняться при обработке действий позже
        let page = state.page;
        // обрабатываем действия
        if (action)
            switch (action.name) {
                // переход на предыдущую страницу
                case "prev":
                    page = Math.max(1, page - 1);
                    break;
                // переход на следующую страницу
                case "next":
                    page = Math.min(pageCount, page + 1);
                    break;
                // переход на первую страницу
                case "first":
                    page = 1;
                    break;
                // переход на последнюю страницу
                case "last":
                    page = pageCount;
                    break;
            }
        // получим список видимых страниц и выводим их

        // Получим массив страниц, которые нужно показать, выводим только 5 страниц
        const visiblePages = getPages(page, pageCount, 5);
        // перебираем их и создаём для них кнопку
        pages.replaceChildren(
            ...visiblePages.map((pageNumber) => {
                // клонируем шаблон, который запомнили ранее
                const el = pageTemplate.cloneNode(true);
                // вызываем колбэк из настроек, чтобы заполнить кнопку данными
                return createPage(el, pageNumber, pageNumber === page);
            }),
        );
        // обновим статус пагинации

        // С какой строки выводим
        fromRow.textContent = (page - 1) * rowsPerPage + 1;
        // До какой строки выводим, если это последняя страница, то отображаем оставшееся количество
        toRow.textContent = Math.min(page * rowsPerPage, data.length);
        // Сколько всего строк выводим на всех страницах вместе (после фильтрации будет меньше)
        totalRows.textContent = data.length;
        // посчитаем сколько строк нужно пропустить и получим срез данных

        // сколько строк нужно пропустить
        const skip = (page - 1) * rowsPerPage;
        // получаем нужную часть строк (заменяем имеющийся return)
        return data.slice(skip, skip + rowsPerPage);
    };
};
