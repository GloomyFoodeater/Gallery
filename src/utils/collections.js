function group(collection, getKey) {
    const table = [];
    collection.forEach((item) => {
        const key = getKey(item);
        if (!table[key])
            table[key] = [];
        table[key].push(item);
    });
    return table;
}

export {
    group
};