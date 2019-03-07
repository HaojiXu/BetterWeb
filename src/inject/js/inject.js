var pageData = {};
pageData.hostName = location.hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/, "")[0]

chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    if ((msg.from === 'popup') && (msg.subject === 'getData')) {
        response(pageData);
    }
});