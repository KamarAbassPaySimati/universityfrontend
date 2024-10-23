const formatID = (id) => {
    if (!id) {
        return '';
    }
    // Check if the id starts with the specified prefixes
    const validPrefixes = ['CMR', 'AGT', 'MCT', 'PMT'];
    const prefix = id.substring(0, 3);

    if (validPrefixes.includes(prefix)) {
        // Extract the numeric part
        const numericPart = id.substring(3);

        // Split the numeric part into two sections
        const firstSection = numericPart.slice(0, 4);
        const secondSection = numericPart.slice(4);

        // Return the formatted string
        return `${prefix} ${firstSection} ${secondSection}`;
    }

    // Return the original id if the prefix is not valid
    return id;
};

export default formatID;
