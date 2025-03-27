import { EDITION_DATA } from './edition-data.js';

document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.closest('.title')) {
            const titleElement = event.target.closest('.title');
            const parentNode = titleElement.closest('.node');
            const childNodes = parentNode.querySelectorAll(`.node`);

            if (childNodes.length > 0) {
                const isHidden = childNodes[0].style.display === 'none';
                childNodes.forEach(node => {
                    node.style.display = isHidden ? 'block' : 'none';
                });

                const plusMinusSpan = titleElement.querySelector('.plusminus');
                if (plusMinusSpan) {
                    plusMinusSpan.textContent = isHidden ? '–' : '+';
                }
            } else {
                getChildren(parentNode);
                const plusMinusSpan = titleElement.querySelector('.plusminus');
                if (plusMinusSpan.textContent === '+') {
                    plusMinusSpan.textContent = '–';
                }
            }
        }
    });
});

function getChildren(parentNode) {
    const parentNodeId = parentNode.dataset.id;
    const childNodes = EDITION_DATA.nodes
        .filter(node => node.parent_id === parseInt(parentNodeId, 10))
        .sort((a, b) => a.sort - b.sort);
    if (childNodes.length > 0) {
        addChildren(parentNode, childNodes);
    }
}

function addChildren(parentNode, nodes) {
    nodes.forEach(node => {
        if (document.getElementById(`node_${node.id}`)) return;

        const spacerWidth = (node.depth - 1) * 20;
        const titleWidth = 580 - spacerWidth;

        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.id = `node_${node.id}`;
        nodeElement.dataset.id = node.id;

        const itemElement = document.createElement('div');
        itemElement.className = 'item';

        const spacerElement = document.createElement('div');
        spacerElement.className = 'spacer';
        spacerElement.style.width = `${spacerWidth}px`;
        spacerElement.innerHTML = '&nbsp;';

        const titleElement = document.createElement('div');
        titleElement.className = 'title';

        const plusMinusSpan = document.createElement('span');
        plusMinusSpan.className = 'plusminus';
        plusMinusSpan.textContent = node.rightnr - node.leftnr > 1 ? '+' : '';

        const textSpan = document.createElement('span');
        textSpan.className = 'text';
        textSpan.style.width = `${titleWidth}px`;
        textSpan.innerHTML = node.url ? `<a href="${node.url}" target="_blank">${node.title}</a>` : node.title;

        titleElement.appendChild(plusMinusSpan);
        titleElement.appendChild(textSpan);

        itemElement.appendChild(spacerElement);
        itemElement.appendChild(titleElement);

        nodeElement.appendChild(itemElement);
        parentNode.appendChild(nodeElement);

        nodeElement.style.display = 'block';
    });

    if (nodes.length > 0) {
        const plusMinusSpan = parentNode.querySelector('.item .title .plusminus');
        if (plusMinusSpan) {
            plusMinusSpan.textContent = '–';
        }
    }
}
