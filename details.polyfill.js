/* Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php */
(function (doc, win) {
    'use strict';
    var i, // a generic iterator
        idCount = 0, //for generating unique identifiers
        detailsID, //a unique identifier for each detail element
        detailElem,
        summaryElem,
        height, //height of the summary element
        headElem = (doc.getElementsByTagName('head')) ? doc.getElementsByTagName('head')[0] : doc.documentElement, //assume nothing
        bodyElem = (doc.getElementsByTagName('body')) ? doc.getElementsByTagName('body')[0] : doc.documentElement, //assume nothing
        detailElems = doc.getElementsByTagName('details'), //list of all details elements on the page
        detailStyleTag = doc.createElement('style'),
        rules = 'details { display: block; overflow:hidden; } \n' +
                'details[open] { height: auto; } \n' +
                'summary { display: block; }',
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
            //makes sure the target is a summary element
            if (e.target.nodeName.toLowerCase() === 'summary') {
                detailElmnt = e.target;
                //find the parent details node of the summary that was clicked
                while (detailElmnt.nodeName.toLowerCase() !== 'details') {
                    detailElmnt = detailElmnt.parentNode;
                    //Break if we can't find a details element
                    if (detailElmnt.nodeName.toLowerCase() === 'body') {
                        detailElmnt = null;
                        break;
                    }
                }
                //Double check we didn't fail in finding a details element
                if (detailElmnt) {
                    //toggle the open attribute
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
    headElem.appendChild(detailStyleTag);
    //W3C
    if (bodyElem.addEventListener) {
        bodyElem.addEventListener('click', toggle, false);
    //IE
    } else if (bodyElem.attachEvent) {
        bodyElem.attachEvent('onclick', toggle);
    // Don't overwrite a preexisting "onclick" attribute.
    } else if (bodyElem.onclick === null) {
        bodyElem.onclick = toggle;
    }
}(document, window, undefined));