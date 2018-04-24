// -*- js-indent-level: 2; -*-

(function() {

  const extensionEnabledSelector = "#extension-enabled";
  const defaultOptions = {
    enabled: true
  };

  function saveOptions(e) {
    e.preventDefault();
    const thumbNavOptions = defaultOptions;

    thumbNavOptions.enabled =
      document.querySelector(extensionEnabledSelector).checked;

    browser.storage.local.set(thumbNavOptions);
  }

  function restoreOptions() {

    function updateUI(options) {
      document
        .querySelector(extensionEnabledSelector)
        .checked = options.enabled;
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

})();
