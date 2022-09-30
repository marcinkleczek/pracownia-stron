/**
 * Poniższy kod nie jest optymalny. Celowo został napisany w taki sposób, żebyście mogli go przeanalizować i zrozumieć.
 *
 * Dla zainteresowanych, na bardzo_dobrą ocenę, można przygotować ulepszoną wersję tej biblioteki.
 *
 * @author Marcin Kłeczek <marcin.kleczek@zskocjan.pl>
 */

let results = null;

function init() {
    results = document.createElement('ol');
    results.id = 'results';
    document.body.appendChild(results);

    setTimeout(() => {
        if (0 === document.querySelectorAll('li.warning').length) {
            results.innerHTML = '<li class="all-ok">Nie znaleziono błędów</li>';
        }
    }, 3000);

    return results;
}

function log(isOk, message) {
    let p = document.createElement('li');
    p.classList.add(isOk ? 'success' : 'warning');
    p.innerHTML = (isOk ? '&#10003;' : '&#10007;') + ' ' + message;

    results.appendChild(p);
}

function wrapMessage(additionalMessage) {
    return additionalMessage ? ` <strong>${additionalMessage}</strong>` : '';
}

function selectorTextContains(selector, text, additionalMessage) {
    let element = document.querySelector(selector);
    let isOk = element && element.innerText.indexOf(text) >= 0;
    let msg = isOk ? "zawiera" : "nie zawiera";

    log(isOk, `${selector} ${msg} ${text} ` + wrapMessage(additionalMessage));
}

function selectorDontExits(selector, additionalMessage = "") {
    let elements = document.querySelectorAll(selector);
    let isOk = elements.length === 0;

    log(isOk, (isOk ? `${selector} nie istnieje` : `${selector} nie powinien istnieć`) + wrapMessage(additionalMessage) );
}

function attributeValue(selector, attribute, value, additionalMessage = "") {
    let element = document.querySelector(selector);
    let isOk = element && element.getAttribute(attribute) === ("" + value);
    let msg = isOk ? 'równa się' : 'nie równa się';

    log(isOk, `Atrybut ${attribute} selektora ${selector} ${msg} ${value}` + wrapMessage(additionalMessage));
}

function selectorExists(selector, numOf = 1, additionalMessage = "") {
    let elements = document.querySelectorAll(selector);
    let result = false;
    let message = (numOf > 1 ? "Są: " : "Jest: ") + selector + (numOf > 1 ? ` (${numOf})` : "");

    if (elements && elements.length > 0) {
        if (elements.length === numOf) {
            result = true;
        } else {
            message = "Element(y) " + selector + " niepoprawna ilość " + elements.length + " zamiast " + numOf + "";
        }
    }

    log(result, message + wrapMessage(additionalMessage));
}

function selectorsExists(...elements) {
    elements.forEach(element => selectorExists(element));
}
