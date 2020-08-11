chrome.app.runtime.onLaunched.addListener(function () {
    chrome.browserAction.onClicked.addListener(function(tab){  
        chrome.app.window.create('window.html', {
            'outerBounds': {
                'width': 1000,
                'height': 720
            }
        });
    });
    
    chrome.app.window.create('login.html', {
        'outerBounds': {
            'width': 1000,
            'height': 720
        }
    });
});
