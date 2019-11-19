const find = (text, query) => Boolean(text.toLowerCase()
    .indexOf(query.toLowerCase()) + 1);

const filterByText = (item, query) => {
    if (!query) {
        return true;
    }
    return find(item.title, query);
};

const filterByTags = (item, query) => item.tags.some((tag) => find(tag, query));

const filterByType = (item, selectedType) => {
    if (!selectedType) {
        return true;
    }
    return item.type === selectedType;
};

export const filter = (state) => {
    const { searchQuery, list, selectedType } = state.records;
    return list.filter((item) => (
        (filterByText(item, searchQuery)
            || filterByTags(item, searchQuery))
        && filterByType(item, selectedType)
    ));
};

export const sort = (list) => list.slice()
    .sort((a, b) => {
        if (a.status === b.status) {
            if (a.title > b.title) {
                return 1;
            }
            return -1;
        }
        if (a.status > b.status) {
            return -1;
        }
        return 1;
    });
