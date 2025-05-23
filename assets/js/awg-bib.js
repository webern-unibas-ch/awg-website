// This script processes the author and publication details in the BibBase template
// It normalizes the text, formats it according to specific rules, and updates the DOM accordingly
// The script is executed when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const authors = document.querySelectorAll('.bibbase_paper_author');
    authors.forEach(author => {
        author.textContent = _processAuthor(author.textContent);

        const detailsElement = author.closest('.bibbase_paper_titleauthoryear');
        const details = _getPublicationDetails(detailsElement);
        _replacePublicationDetails(detailsElement, details);
    });

    const titles = document.querySelectorAll('.bibbase_paper_title');
    titles.forEach(title => {
        title.textContent = _processTitle(title.textContent.trim());
    });
});

// Extracts and processes publication details from title siblings
function _getPublicationDetails(element) {
    let details = '';
    let sibling = element.nextSibling;

    // Iterate through all siblings until the `.note` span is reached
    while (sibling && !(sibling.classList && sibling.classList.contains('note'))) {
        if (sibling.nodeType === Node.TEXT_NODE && sibling.textContent.trim() !== '') {
            details += sibling.textContent.trim();
        } else if (sibling.nodeType === Node.ELEMENT_NODE) {
            details += ' ' + sibling.outerHTML.trim();
        }
        sibling = sibling.nextSibling;
    }

    const normalizedDetails = _normalizeText(details);
    return _processPublicationDetails(normalizedDetails);
}

// Normalize multiple spaces & line feeds with a single space
function _normalizeText(text) {
    return text.replace(/\s+/g, ' ').trim();
}

// Process author string
function _processAuthor(author) {
    const normalizedAuthor = _normalizeText(author);

    if (normalizedAuthor.endsWith('editor.')) {
        return normalizedAuthor.slice(0, -9) + ' (Hg.):';
    } else if (normalizedAuthor.endsWith('editors.')) {
        return normalizedAuthor.slice(0, -10) + ' (Hg.):';
    } else {
        return normalizedAuthor + ':';
    }
}

// Process publication details string
function _processPublicationDetails(text) {
    // Replace "In" with ", in:"
    text = text.replace(/^In\s+/, 'in: ');
    // Replace ", editor(s)," with " (Hg.),"
    text = text.replace(/, editor\(s\),/g, ' (Hg.),');
    // Replace pages with S.
    text = text.replace(/, pages/g, ', S.');
    // Move pages to the end
    text = text.replace(/, S\. ([^.,]+)\.\s*([^.,]+),\s*([^,]+),\s*(\d{4})\./, ', $3: $2, $4, S. $1.');
    // Change order of publisher and address if not already handled
    text = text.replace(/\.\s*([^.,]+),\s*([^.,]+),\s*(\d{4})\.$/, '. $2: $1, $3. ');
    // Replace series in papers
    text = text.replace(/, volume ([^,]+), of ([^,]+),/g, ' (= $2 $1),');
    // Replace series in books
    text = text.replace(/Volume ([^]+) of ([^.]+)./g, ' (= $2 $1),');

    return text;
}

// Process title string
function _processTitle(title) {
    if (title.endsWith('“.')) {
        return title.slice(0, -1) + ',';
    }
    return title;
}

// Replace publication details in DOM
function _replacePublicationDetails(element, updatedDetails) {
    let sibling = element.nextSibling;

    // Iterate through all siblings until the `.note` span is reached
    while (sibling && !(sibling.classList && sibling.classList.contains('note'))) {
        const next = sibling.nextSibling;
        sibling.remove();
        sibling = next;
    }

    // Insert the updated content as a new span
    const detailsSpan = document.createElement('span');
    detailsSpan.className = 'bibbase_paper_details';
    detailsSpan.innerHTML = _sanitizeHtml(updatedDetails);

    element.parentNode.insertBefore(detailsSpan, sibling);
}

// Sanitize HTML to allow only wanted tags
function _sanitizeHtml(html) {
    const allowedTags = ['I', 'EM', 'B', 'STRONG'];
    const doc = new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html');
    const container = doc.body.firstChild; // This is the <div> we created

    // Walk all elements inside the container
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, null, false);

    let node = walker.nextNode();
    while (node) {
        if (!allowedTags.includes(node.tagName)) {
            // Replace disallowed element with its text content
            const text = doc.createTextNode(node.textContent);
            node.parentNode.replaceChild(text, node);
            // After replacement, walker will continue with the next node
        } else {
            // Remove all attributes from allowed tags
            while (node.attributes.length > 0) {
                node.removeAttribute(node.attributes[0].name);
            }
        }
        node = walker.nextNode();
    }
    // Return the sanitized inner HTML of the container
    return container.innerHTML;
}
