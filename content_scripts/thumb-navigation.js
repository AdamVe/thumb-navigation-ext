(function() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function showThumbNavigation() {
        hideThumbNavigation();

        let thumbNavigationImage = document.createElement("img");
        thumbNavigationImage.style.display = "block";
        thumbNavigationImage.setAttribute(
            "src",
            browser.extension.getURL("images/arrow_rtl.png"));

        let thumbNavigation = document.createElement("div");
        thumbNavigation.style.padding = "0px";
        thumbNavigation.style.position = "fixed";
        thumbNavigation.style.height = "auto";
        thumbNavigation.style.top = "2em";
        thumbNavigation.style.right = "2em";
        thumbNavigation.style.background = "#aaaaffaa";
        thumbNavigation.style.zIndex = "100000";
        thumbNavigation.className = "thumb-navigation";
        thumbNavigation.style.cursor = "pointer";
        thumbNavigation.onclick = function() {
            window.history.back();
        };

        thumbNavigation.appendChild(thumbNavigationImage);
        document.body.appendChild(thumbNavigation);
    }

    function hideThumbNavigation() {
        let existingElements = document.querySelectorAll(".thumb-navigation");
        for (let element of existingElements) {
            element.remove();
        }
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "show_thumb_navigation") {
            showThumbNavigation();
        } else if (message.command === "hide_thumb_navigation") {
            hideThumbNavigation();
        }
    });

    showThumbNavigation();
})();
