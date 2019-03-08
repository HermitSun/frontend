export function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

export function getDate() {
    return new Date().toLocaleDateString();
}
