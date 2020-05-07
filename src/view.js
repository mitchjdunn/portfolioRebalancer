const $ = require("jquery")

module.exports = {

    // What does the $ in $view and $tabs mean?
    View ($view, $tabs, pages, requestedPageKey, tryLocal) {
        console.log(`view ${requestedPageKey}`)
        console.log(pages)
        const viewId = $view.prop("id")
        const storageKey = `view-${viewId}`
        //  while messing around with viewID, incorrect page key can be stored in web browser.
        //      Temp fix Ctrl-F5 will clear cache on reload
        const pageKey = (tryLocal && localStorage.getItem(storageKey)) || requestedPageKey
        localStorage.setItem(storageKey, pageKey)
        $view.children().detach()
        $view.append(pages[pageKey].view)
        if ($tabs)
            $tabs.activate(pages[pageKey])
    }
}
