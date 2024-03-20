export default function getInitials (name, count) {
    const initials = name.split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase();

    return initials.length > count ? initials.slice(0, 3) : initials;
}
