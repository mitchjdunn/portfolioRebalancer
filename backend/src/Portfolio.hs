{-# LANGUAGE DeriveGeneric #-}
module Portfolio
(
Snapshot(..)
,AssetSnapshot(..)
,testSnapshot
)where

import GHC.Generics
import Data.Aeson (FromJSON, ToJSON)


data Snapshot = Snapshot { assetSnapshots :: [AssetSnapshot]} deriving(Show, Generic)
instance FromJSON Snapshot
instance ToJSON Snapshot
data AssetSnapshot = AssetPercentSnapshot {ticker :: String, quantity :: Float, tickerValue :: Float, targetAllocationPercent :: Float, currentAllocationPercent :: Float}
                    | AssetAmountSnapshot {ticker :: String, quantity :: Float, tickerValue :: Float, targetAllocationAmount :: Float} deriving (Show, Generic)
instance FromJSON AssetSnapshot
instance ToJSON AssetSnapshot

voo :: AssetSnapshot
voo = AssetPercentSnapshot { ticker = "VOO", quantity = 36, tickerValue = 265.17,  targetAllocationPercent = 85, currentAllocationPercent = 0}

bnd :: AssetSnapshot
bnd = AssetPercentSnapshot { ticker = "BND", quantity = 14, tickerValue = 87.09,  targetAllocationPercent = 15, currentAllocationPercent = 0}

cash :: AssetSnapshot
cash = AssetAmountSnapshot { ticker = "Cash", quantity = 3600, tickerValue = 1,  targetAllocationAmount = 5000}

testSnapshot :: Snapshot
testSnapshot = Snapshot {assetSnapshots = [voo, bnd, cash]}
