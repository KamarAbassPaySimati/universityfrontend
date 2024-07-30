export default function getInitials (name, count) {
    if (!name) {
        return null;
    }
    const initials = name?.split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase();

    return initials?.length > count ? initials.slice(0, 3) : initials;
}
