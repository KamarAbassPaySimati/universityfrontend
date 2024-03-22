export function Slugify (str) {
    return str.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s]+/g, '-')
        .replace(/[-]+/g, '-');
}
