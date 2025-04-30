# 📸 FindMyPhotos.app
⚡Instantly find photos you're in from ETHGlobal events using AI facial recognition tech!

- 🥇 Most Killer App Potential 1st place - Flow
- 🥇 Best Project - Zircuit
- 🥇 Real World Anything - Polygon

ETHGlobal showcase: https://ethglobal.com/showcase/findmyphotos-app-bg143
YouTube demo: https://youtu.be/ZKlZ3A254sc

<img width="1294" alt="banner" src="https://github.com/user-attachments/assets/7895adb2-b566-4959-8f72-9ebc1cc97777" />

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

### Input
<img width="1440" alt="Upload" src="https://github.com/user-attachments/assets/22e4010b-5cd0-4ac1-a139-2419692b711f" />

### Result
<img width="1435" alt="Results" src="https://github.com/user-attachments/assets/f1f45dda-a296-4166-a718-3c2d07de4d08" />

# How it's built

Tools: v0, Cursor
<br/>
APIs: Flickr API, AWS Rekognition
<br/>
Blockchain: Flow, Polygon, Zircuit, Ethers, Hardhat, Alchemy, ETHGlobal NFT Packs

<img width="984" alt="how it works" src="https://github.com/user-attachments/assets/0aa41e1f-cc51-430f-9678-e05f4af40b08" />


1. Use the Flickr API to retrieve a list of HD photos from ETHGlobal album URLs. Photos are stored as img URLs in a txt file
2. Iterate through the txt file to index each face in a photo, and then upload each as a vector to an AWS collection
3. Set up AWS Rekognition on the frontend so users can upload images, and the backend will obtain the vector of their image to compare with the list in the AWS collection
4. Solidity smart contracts are used for token-gating the UX and the payments flow

The payments flow is multichain to enable users from any network to interact and pay in the dapp. Owners of the contract (eg. event organizers in the future) will be able to withdraw these payments. The contracts were specifically deployed on Flow, Polygon, Zircuit, Base, and ETH Sepolia, with their respective native tokens used as payment.

The Zircuit contract is [verified](https://explorer.garfield-testnet.zircuit.com/address/0xb861d6d79123ADa308E5F4030F458b402E2D131A#code) on Zircuit's block explorer. Verifying the contract was easy through Zircuit's docs; all the steps were clearly outlined and I encountered no issues.

# Team

Solo project by Matt Wong, a 3rd year engineering student @ UWaterloo. Incoming PM @ Notable Health, previously contributed to Protocol Labs and interned @ Shopify, theScore, & startups.

X: @mattwong_ca
