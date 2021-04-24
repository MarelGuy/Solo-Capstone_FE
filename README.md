# Getting Started with scpwiki

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and so it includes every react script to start or build the application

## Available Pages

In the project, you can see:

### `/home`

That's the homepage of the website, you can navigate to `/new/scp` and/or `/new/forum`.

### `/new/scp`

In this page you can create a new SCP. An SCP it's an entity that defies the laws of physics, in the lore of the official website, you will contain and protect the world from these anomalies by containing them with various types of containment room or procedures. By creating one you will add it to the database and it will be visible in the page `/scp/:scpId`.

### `/new/forum`

In this page you can create a new thread in the forum. This is still a feature in beta and so it may have some bugs, I'll update it in some time. By creating one you will add it to the database and it will be visible in the page `/forum/:forumId`.

### `/new/doc`

In this page you can create a new document for a previously created SCP. By creating one you will add it to the database and it will be visible in the page `/doc/:docId`.

### `/scp/:scpId`

In this page you can see one of the scps you or someone else created. Right now we have two versions of scp:

- v0: Beta version of an scp created before the first major update of the scps pages, doesn't support the edit feature and the document feature.

- v1: First version of an scp created before the second major update of the scps pages, doesn't support the edit feature and supports the document feature.

- v2: Second version of an scp created before the major update of the scps pages, it supports the edit feature and the document feature.

The majority of the scps are in v2 state but i might add a new version of SCP (v3) that might have more available features.

### `/forum/:forumId`

In this page you can see one of the threads you or someone else created. Right now we have two versions of the forums:

- v0: First version of an scp created before the first major update of the threads pages, doesn't support the edit feature.

- v1: Second version of an scp created after the first major update of the threads pages, it supports the edit feature.

The majority of the threads are in v1 state since this is a secondary feature, i will add the support for the v2 in the next major update.

### `/doc/:docId`

In this page you can see one of the documents you or someone else created. Right now we have two versions of the documents:

- v0: Beta version of a document created before the second major update of the scps pages, doesn't support the edit feature.

- v1: Second version of a document created before the major update of the scps pages, it supports the edit feature.

The majority of the documents are in v1 state, I will add a v2 in the next major update to add external addendums to the documents.

### `/me`

In this page you can see your profile information. Also you can add/remove or change your account informations. You can change you profile picture too.

### `/user/:userId`

In this page you can see someone else's profile information. Also if that's you it will say that the account you are watching is your account.

### `/search/:data`

In this page you can search in the whole database of the website. You can write anything in it and if it finds a match it will display it.

### `/login`

In this page you can login with a previously created account.

### `/signup`

In this page you can create an account. After the creation you will wait 5 seconds to be then redirected to `/login`.

## Known problems

### Navbar is broken and acting like a placeholder

The navbar is meant to be a navigator for the website, right now it's just a placeholder.

### Major bugs in the forum editing

When you want to edit a forum sometimes it crashes and/or doesn't redirect to the edit page.
