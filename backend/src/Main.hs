{-# LANGUAGE OverloadedStrings #-}
import Web.Scotty
import Network.HTTP.Types
import Portfolio


-- TODO relative file paths

main = scotty 3000 $ do
    get "/" $ do        -- handle get request on root
        status status200
        setHeader "Testing" "123"
        file "/home/mitch/git/portfolioRebalancer/build/index.html"
    get "/index.js" $ do
        status status200
        file "/home/mitch/git/portfolioRebalancer/build/index.js"
    get "/portfolio/snapshot" $ do
        status status200
        json testSnapshot

    delete "/" $ do        -- handle get request on root
        text "this was a delete request!"
    post "/" $ do        -- handle get request on root
        text "this was a post request!"
    put "/" $ do        -- handle get request on root
        text "this was a put request!"
