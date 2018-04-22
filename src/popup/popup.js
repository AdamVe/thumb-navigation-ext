// -*- js-indent-level: 2; -*-
function listenForClicks() {
  document.addEventListener("click", (e) => {
    function show_thumb_navigation(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "show_thumb_navigation"
      });
    }

    function hide_thumb_navigation(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "hide_thumb_navigation",
      });
    }

    function reportError(error) {
      console.error(`Could not handle thumb navigation: ${error}`);
    }

    if (e.target.classList.contains("show")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(show_thumb_navigation)
        .catch(reportError);
    }
    else if (e.target.classList.contains("hide")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(hide_thumb_navigation)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Thumb-navigation script error: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/thumb-navigation.js"})
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
