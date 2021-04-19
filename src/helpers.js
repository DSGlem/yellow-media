export function sortFromHigh(array) {
    return array.sort((a, b) => {
        return b[1] - a[1];
    });
}

export function getFreqncyCharacters(str) {
    let newStr = str
        .toLowerCase()
        .trim()
        .split(' ')
        .join(''); // white spaces remove

    const counter = [].reduce.call(
        newStr,
        (acc, item) => {
            acc[item] = acc[item] ? acc[item] + 1 : 1;
            return acc;
        },
        {}
    );
    return counter;
}

export function isEvenNumber(value) {
    return value % 2 === 0;
}

export function isNumber(value) {
    const regex = /^[+-]?\d+((e\d+)|(\.\d+)?)$/;
    return value === 0 || (value && parseFloat(value) && regex.test(value));
}

export function parseURLSearch(value) {
    let queryParams = value.slice(value.indexOf(`?`) + 1).split(`&`);
    queryParams = queryParams.reduce((acc, item) => {
        const [key, value] = item.split(/=/);
        acc[key] = value ? value : null;
        return acc;
    }, {});
    return queryParams;
}

export function formatPrice(value, currency = '$') {
    if (!isNumber(value)) {
        return value;
    }
    if (Number.isInteger(value)) {
        return `${value}.00 ${currency}`;
    }
    return `${value} ${currency}`;
}

export function getOptionName(name) {
    const newName = name.replace('_', ' ');
    return `${newName[0].toUpperCase()}${newName.slice(1)}`;
}

export function transformProductFromBack(item) {
    const options = item.options.map((item) => {
        const innerOption = Object.entries(item);
        return innerOption.map((item) => {
            return { name: getOptionName(item[0]), value: item[1] };
        });
    });

    return {
        id: item.id,
        title: item.title,
        src: item.image,
        sku: item.sku,
        options: options.flat(),
        currency: item.currency,
        price: parseFloat(new Number(item.price).toFixed(2)),
    };
}
