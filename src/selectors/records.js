const find = (text, query) => Boolean(text.toLowerCase().indexOf(query.toLowerCase()) + 1);

export const search = (state) => {
    const { searchQuery, list } = state.records;
    return list.filter((item) => (find(item.title, searchQuery)
        || item.tags.some((tag) => find(tag, searchQuery))));
};
