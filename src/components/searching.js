import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
    // настроим компаратор
    const compare = createComparison(
        ["skipEmptyTargetValues"],
        [
            rules.searchMultipleFields(
                searchField,
                ["date", "customer", "seller"],
                false,
            ),
        ],
    );
    return (data, state, action) => {
        // применим компаратор
        return data.filter((row) => {
            return compare(row, state);
        });
    };
}
