export default function objectToQueryString (obj) {
    const keys = Object.keys(obj);
    let str = '';
    keys.forEach((key, i) => {
        str += `${i === 0 ? '?' : '&'}${encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])}`;
    });
    return str;
};
