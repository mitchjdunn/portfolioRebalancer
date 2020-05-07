const $ = require("jquery")

module.exports = {

    // What does the $ in $view and $tabs mean?
    View ($view, $tabs, pages, requestedPageKey, tryLocal) {
        console.log(`view ${requestedPageKey}`)
        console.log(pages)
        const viewId = $view.prop("id")
        const storageKey = `view-${viewId}`
        // what is local storage
        const pageKey = (tryLocal && localStorage.getItem(storageKey)) || requestedPageKey
        console.log(pageKey)
        localStorage.setItem(storageKey, pageKey)
        $view.children().detach()
        $view.append(pages[pageKey].view)
        if ($tabs)
            $tabs.activate(pages[pageKey])
    }
}
