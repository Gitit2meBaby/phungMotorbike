# Overview
Phung Motorbikes is built with Nextjs 14 with a Firebase backend.
A heavy emphasis on SSR was made to enable better SEO.


## For Devs
- /lib/getBikesFromFirebase handles the Firebase request
- /lib/getBikes handles caching all the data for the rest of the website navigation.
- /lib/clearCache is a function that is only called from the admin panel, it occurs when a new bike is uploaded, deleted or edited.
- Contact Form, booking form and purchase form are handled by PostMark.
- app/api/bookings/route.js - recieves form data and sends an email to both the client and the .env FROM_EMAIL. both HTML and plain text.
- app/api/buy-online/route.js is very similar
- Bikes are divided into URL's via their rental/sale type. req provides 'bikes' which are currently generated on the server, and filtered client side.
- Dynamic slugs for each URL return to a base URL with bikeId as a param, the param is found and the data populated from that. This is how each individual bike page (/components/BikeDetails.jsx) recieves data.
- static images are hosted locally in the /public folder, while the rest remains in Firebase, a script is provided (imageScript.js) that can be run on node to create two images from each upload (one thumbUrl 300 x 225 and the other fullURL 600x450, both optimized to webp format)
- Admin dashboard is currently accessed via hardcoded password and email keys, the decision was made to leave Firebase auth out to keep the code slim.
Within the dashboard (/admin) add bike directly calls a setDoc function to Firebase, images are parsed through /components/ImageUploader to create the two webp files and upload to storage.
Edit/Remove bike fetches all matching params with firebase, users can use setDoc to alter the database or remove listings completely. The function should map through ids of images that map in Firebase storage and delete them at the same time.
- A JSON file was provided and should be part of this repo for the initial data upload, currently nothing is updating that JSON, so it could become stale in the future.
- /components/SimilarBikes.jsx filters for 3 variables depending on availability and basePath, highest priority is cityPrice
- basePath also dictates what order bikes are shown in /components/BikeList.jsx (ie cityPrice for /motorbike-rentals-hanoi)

## Design
- The 'polaroid' old school design was chosen. 
- SCSS was used with modules to make naming conventions easier, most jsx or page.js files should have a coresponding .module.scss file
- globals.scss handles minimal variants, but also the media queries. @include desktop, tablet etc are outlined in this file.
- There are just 4 major breakpoints, some fine tuning could be added particularly for extra wide screens and smaller tablets that sit between the current 'tablet' and 'phoneLandscape' breakpoints.


# To Do
Change postMark account to client address
Paypal account
Style mobile nav
sitemap
robots.txt