// Copyright 2010 Google Inc. All Rights Reserved.

function injection() {
  var pageLang = '{{$pageLang}}';
  var userLang = '{{$userLang}}';

  var uid = '1E07F158C6FA4460B352973E9693B329';
  var teId = 'TE_' + uid;
  var cbId = 'TECB_' + uid;

  function show() {
    window.setTimeout(function() {
      window[teId].showBanner(true);
    }, 10);
  }

  function newElem() {
    var elem = new google.translate.TranslateElement({
      autoDisplay: false,
      floatPosition: 0,
      multilanguagePage: true,
      pageLanguage: pageLang
    });
    return elem;
  }

  if (window[teId]) {
    show();
  } else {
    if (!window.google || !google.translate ||
        !google.translate.TranslateElement) {
      if (!window[cbId]) {
        window[cbId] = function() {
          window[teId] = newElem();
          show();
        };
      }
      let ttPolicy = {createScriptURL: s => s};
      if (typeof trustedTypes != 'undefined') {
        ttPolicy = trustedTypes.createPolicy('gtx', ttPolicy);
      }
      var s = document.createElement('script');
      // We couldn't use safedom because this function is stringified and then
      // passed to executeScript in main.js.
      s.src = ttPolicy.createScriptURL(
          'https://translate.google.com/translate_a/element.js?cb=' +
          encodeURIComponent(cbId) + '&client=tee&hl=' + userLang + '&nsc=1');
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  }
}

function injector() {
  var s = document.createElement('script');
  s.textContent = '{{$content}}';
  document.getElementsByTagName('head')[0].appendChild(s);
}
