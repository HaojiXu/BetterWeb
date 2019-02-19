function getBiasData(origin) {
    return new Promise(function(resolve) {
        chrome.storage.local.get(['media_urls'], function(result) {
            var websites = JSON.parse(result.media_urls).media_urls;
            var website = websites[origin]; //This is an array with [0] as data!
            resolve(website);
        }); 
    });
}

function inject(mediafacts) {
    var htmlString = `<div id="betterweb-injected-banner"><div id="betterweb-injected-banner-content">Bias: ${mediafacts.bias}, factual: ${mediafacts.factual}</div></div>`
    document.body.insertAdjacentHTML('beforeend', htmlString)
}

chrome.extension.sendMessage({}, function() { // DOM is not available without this call fsr
    window.addEventListener('load', async function() {
        var settingsData = await retrieve.getStoredSettings(["extension_enabled", "media_bias_enabled"])
        if(settingsData.extension_enabled == "false") return;

        if(settingsData.media_bias_enabled == "true"){
            var biasData = await getBiasData(location.hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/, "")[0]);
            if (biasData !== void 0) {
                inject(biasData[0]);
            }
        }
    });
})