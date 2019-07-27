// -*- js-indent-level: 2; -*-

(function() {

  const extensionEnabledSelector = "#extension-enabled";
  const alphaValueSelector = "#alpha-value";
  const zoomValueSelector = "#zoom-value";
  const defaultOptions = {
    enabled: true,
    alpha: 1.0,
    zoom: 100
  };

  function saveOptions(e) {
    e.preventDefault();
    const thumbNavOptions = defaultOptions;

    thumbNavOptions.enabled =
      document.querySelector(extensionEnabledSelector).checked;

    thumbNavOptions.alpha =
      document.querySelector(alphaValueSelector).value;

    thumbNavOptions.zoom =
      document.querySelector(zoomValueSelector).value;

    browser.storage.local.set(thumbNavOptions);
  }

  function restoreOptions() {

    function updateUI(options) {
      document
        .querySelector(extensionEnabledSelector)
        .checked = options.enabled;

      document
        .querySelector(alphaValueSelector)
        .value = options.alpha;

      document
        .querySelector(zoomValueSelector)
        .value = options.zoom;
    }

    function setCurrentChoice(options) {
      updateUI(options);
    }

    function onError() {
      updateUI(defaultOptions);
    }

    const getting = browser.storage.local.get(defaultOptions);
    getting
      .then(setCurrentChoice, onError)
      .catch(onError);
  }

  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector(extensionEnabledSelector)
    .addEventListener("change", saveOptions);
  document.querySelector(alphaValueSelector)
    .addEventListener("change", saveOptions);
  document.querySelector(zoomValueSelector)
    .addEventListener("change", saveOptions);

})();
