/* Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php */
(function (doc) {
    'use strict';
    var i,
        idCount = 0,
        detailsID,
        detailElem,
        summaryElem,
        height, //height of the summary element
        headElem = (doc.getElementsByTagName('head')) ? doc.getElementsByTagName('head')[0] : doc.documentElement,
        bodyElem = (doc.getElementsByTagName('body')) ? doc.getElementsByTagName('body')[0] : doc.documentElement,
        detailElems = doc.getElementsByTagName('details'),
        detailStyleTag = doc.createElement('style'),
        rules = 'details { display: block; overflow:hidden; } \n' +
                'details[open] { height: auto; } \n' +
                'summary { display: block; cursor: pointer; }',
                /* TODO: 
                 *      Technically, a summary element has a "Phrasing content" model and should be displayed inline.
                 *      see http://dev.w3.org/html5/spec/Overview.html#the-summary-element,
                 *          http://dev.w3.org/html5/spec/Overview.html#phrasing-content
                 *
                 *      Implimenting that with CSS creates a problem of hiding any content that may be on the same line
                 *      as the summary element. Thought needs to be given as to how to adhere to the spec more closely.
                 */
        addRule = function (styleTag, rule) {
            rule = '\n' + rule;
            if (styleTag.nodeName.toLowerCase() === 'style') {
                if (styleTag.styleSheet && styleTag.styleSheet.cssText !== undefined) { //for MSIE
                    styleTag.styleSheet.cssText = rule;
                } else { styleTag.appendChild(doc.createTextNode(rule)); }
            }
        },
        toggle = function (e) {
            var detailElmnt;
            /* When a <summary> element is clicked the parent <details>
             * element's "open" attribute needs to be toggled.
            */
            if (e.target.nodeName.toLowerCase() === 'summary') {
                detailElmnt = e.target;
                while (detailElmnt.nodeName.toLowerCase() !== 'details') {
                    detailElmnt = detailElmnt.parentNode;
                    //Break if we get to the root node without finding a details element.
                    if (detailElmnt === bodyElem) {
                        detailElmnt = null;
                        break;
                    }
                }
                if (detailElmnt) {
                    /* Via http://dev.w3.org/html5/spec/Overview.html#attr-details-open
                     * 
                     *      The open content attribute is a boolean attribute. If present, it indicates that both the 
                     *      summary and the additional information is to be shown to the user. If the attribute is  
                     *      absent, only the summary is to be shown.
                     * 
                     * The open attribute is reflective and should always accurately represent the current state of 
                     * the element
                    */
                    if (detailElmnt.getAttribute('open')) {
                        detailElmnt.removeAttribute('open');
                    } else { detailElmnt.setAttribute('open', 'open'); }
                }
            }
        };

    addRule(detailStyleTag, rules);
    for (i = 0; i < detailElems.length; i++) {
        detailElem = detailElems[i];
        detailsID = 'd' + (idCount++);
        detailElem.setAttribute('data-detailsID', detailsID);
        /* For details to toggle, the details element needs to have at least 
         * one summary element, but only the first one is of any concern.
         */
        summaryElem = detailElem.getElementsByTagName('summary')[0];
        if (!summaryElem) {
            summaryElem = doc.createElement('summary');
            summaryElem.appendChild(doc.createTextNode('Details'));
            detailElem.insertBefore(summaryElem, detailElem.firstChild);
        }
        height = summaryElem.offsetHeight;
        addRule(detailStyleTag, 'details[data-detailsid="' + detailsID + '"] { height: ' + height + 'px; }\n' +
                            'details[data-detailsid="' + detailsID + '"][open] { height: auto; }');
    }
    /* The inserted stylesheet needs to be first so as to have a minimal cascading coeffecient. 
     * The polyfill only adds default styling and should not interfere with other style rules.
     */
    headElem.insertBefore(detailStyleTag, headElem.firstChild);
    //W3C event biding
    if (bodyElem.addEventListener) {
        bodyElem.addEventListener('click', toggle, false);
    //IE event binding
    } else if (bodyElem.attachEvent) {
        bodyElem.attachEvent('onclick', toggle);
    // Fallback, but don't overwrite a preexisting "onclick" attribute.
    } else if (bodyElem.onclick === null) {
        bodyElem.onclick = toggle;
    }
}(document, undefined));