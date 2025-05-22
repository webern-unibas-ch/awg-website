document.addEventListener('DOMContentLoaded', function () {
    const authors = document.querySelectorAll('.bibbase_paper_author');
    authors.forEach(author => {
        author.textContent = processAuthor(author.textContent);

        const publicationDetailsElement = author.closest('.bibbase_paper_titleauthoryear');
        const publicationDetails = getPublicationDetails(publicationDetailsElement);
        replacePublicationDetails(publicationDetailsElement, publicationDetails);
    });

    const titles = document.querySelectorAll('.bibbase_paper_title');
    titles.forEach(title => {
        title.textContent = processTitle(title.textContent.trim());
    });
});

function getPublicationDetails(element) {
    let content = '';
    let sibling = element.nextSibling;

    // Iterate through all siblings until the `.note` span is reached
    while (sibling && !(sibling.classList && sibling.classList.contains('note'))) {
        if (sibling.nodeType === Node.TEXT_NODE && sibling.textContent.trim() !== '') {
            content += sibling.textContent.trim();
        } else if (sibling.nodeType === Node.ELEMENT_NODE) {
            content += ' ' + sibling.outerHTML.trim();
        }
        sibling = sibling.nextSibling;
    }

    const normalizedContent = normalizeText(content);
    return processPublicationDetails(normalizedContent);
}

function normalizeText(text) {
    // Replace multiple spaces & line feeds with a single space
    return text.replace(/\s+/g, ' ').trim();
}

function processAuthor(author) {
    const normalizedText = normalizeText(author);

    if (normalizedText.endsWith('editor.')) {
        return normalizedText.slice(0, -9) + ' (Hg.):';
    } else if (normalizedText.endsWith('editors.')) {
        return normalizedText.slice(0, -10) + ' (Hg.):';
    } else {
        return normalizedText + ':';
    }
}

function processPublicationDetails(text) {
    // Replace "In" with ", in:"
    text = text.replace(/^In \b/, 'in: ');
    // Replace ", editor(s)," with " (Hg.),"
    text = text.replace(/, editor\(s\),/g, ' (Hg.),');
    // Replace pages with S.
    text = text.replace(/, pages/g, ', S.');
    // Change order of publisher and address
    text = text.replace(/\.\s([^,]+),\s*([^,]+),\s*(\d{4})\./, '$2: $1, $3.');

    return text;
}

function processTitle(title) {
    if (title.endsWith('“.')) {
        return title.slice(0, -1) + ',';
    }
    return title;
}

function replacePublicationDetails(element, updatedContent) {
    let sibling = element.nextSibling;

    // Iterate through all siblings until the `.note` span is reached
    while (sibling && !(sibling.classList && sibling.classList.contains('note'))) {
        const nextSibling = sibling.nextSibling; // Save reference to the next sibling
        sibling.remove(); // Remove the current sibling
        sibling = nextSibling; // Move to the next sibling
    }

    // Insert the updated content as a new span
    const detailsSpan = document.createElement('span');
    detailsSpan.className = 'bibbase_paper_details';
    detailsSpan.innerHTML = updatedContent;

    element.parentNode.insertBefore(detailsSpan, sibling);
}
