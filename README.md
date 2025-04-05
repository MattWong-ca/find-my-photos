# 📸 FindMyPhotos.app
⚡Instantly find photos you're in from ETHGlobal events using AI facial recognition tech!


# About

Ever scroll tirelessly through a photo album just to find photos with you in them?

After ETHGlobal Bangkok, a friend spent 40 minutes searching for his photos! This inspired me to build FindMyPhotos.app, which lets you find your photos from Flickr albums in seconds.

⚡ Upload a photo / take a live pic and find results in seconds
<br/>
⛓️ Gated by ETHGlobal Packs to benefit past event attendees (discount)
<br/>
📱 Easily download all photos and share them on X
<br/>
👤 Anons can use it to ask for removal from albums 

In the future, this project can be scaled to outside of IRL ETHGlobal events too — any event, conference, or hackathon organizers can provide this service to their attendees!

# How it's built

Tools: v0, Cursor
<br/>
APIs: Flickr API, AWS Rekognition
<br/>
Blockchain: Flow, Polygon, Zircuit, Ethers, Hardhat, Alchemy, ETHGlobal NFT Packs

1. Use the Flickr API to find the album IDs of ETHGlobal events, then use the album ID to retrieve the list of HD photos. Photos are stored as URLs in a txt file
2. Iterate through the txt file to index each face in a photo, and then upload each as a vector to an AWS collection
3. Set up AWS Rekognition on the frontend so users can upload images, and the backend will obtain the vector of their image to compare with the list in the AWS collection
4. Solidity smart contracts are used for token-gating the UX and the payments flow

The payments flow is multichain to enable users from any network to interact and pay in the dapp. Owners of the contract (eg. event organizers in the future) will be able to withdraw these payments. The contracts were specifically deployed on Flow, Polygon, Zircuit, Base, and ETH Sepolia, with their respective native tokens used as payment.

The Zircuit contract is [verified](https://explorer.garfield-testnet.zircuit.com/address/0xb861d6d79123ADa308E5F4030F458b402E2D131A#code) on Zircuit's block explorer. Verifying the contract was easy through Zircuit's docs; all the steps were clearly outlined and I encountered no issues.

# Team

Solo project by Matt Wong, a 3rd year engineering student @ UWaterloo. Incoming PM @ Notable Health, previously contributed to Protocol Labs and interned @ Shopify, theScore, & startups.

X: @mattwong_ca