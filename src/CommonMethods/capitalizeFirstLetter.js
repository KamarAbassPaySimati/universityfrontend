function capitalizeFirstLetter (input) {
    return input.replace(/^([a-zA-Z])(.*)$/, (_, first, rest) =>
        first.toUpperCase() + rest.toLowerCase()
    );
}

export default capitalizeFirstLetter;
