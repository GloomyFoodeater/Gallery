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

function groupModulo(collection, divisor) {
    let index = 0;
    return group(collection, () => Math.floor(index++ / divisor));
}

export {
    group,
    groupModulo
};