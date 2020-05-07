{-# LANGUAGE OverloadedStrings #-}
import Web.Scotty
import Network.HTTP.Types


-- TODO relative file paths

main = scotty 3000 $ do
    get "/" $ do        -- handle get request on root
        status status200
        setHeader "Testing" "123"
        file "/home/mitch/git/portfolioRebalancer/build/index.html"
    get "/:fileName" $ do
        status status200
        fileName <- param "fileName"
        file $ "/home/mitch/git/portfolioRebalancer/build/" ++ fileName
        -- haskell dont like this ^
    delete "/" $ do        -- handle get request on root
        text "this was a delete request!"
    post "/" $ do        -- handle get request on root
        text "this was a post request!"
    put "/" $ do        -- handle get request on root
        text "this was a put request!"
