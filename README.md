# Generic wedding site

Unlinked fork of my own wedding website for others to use.

## Setup

### Pictures
If you wish to have the frame border use the following markup:

```
<figure>
    <img src="path/to/picture.jpg" alt="alternative text">
</figure>
```

### Pages
The `index.html` holds the template for the whole site. The pages content is loaded inside `<article id="content"></article>` via JavaScript.

To add pages on the menu just add them inside `<nav id="navigation">` like so `ul#wrapper > li > a` for page and `ul#wrapper > li > ul > li > a` for page section. Link pages like this `<a href="name-of-html-file-without-extension">` and sections like this `<a href="name-of-html-file-without-extension#anchor">`.

Don't forget to actually create the files inside the `site` folder with extension `.html`. Also add id's so that the link to the sections will work.

### Form
This is the RSVP at the home page. Add your own details in the file `processForm.php`:
```
define( "RECIPIENT_NAME", "Recipient Name" );
define( "RECIPIENT_EMAIL", "recipient.email@email.com" );
define( "EMAIL_SUBJECT", "Message from website form" );
```

### Map
- open `assets/js/google-maps.js`
- find the function `initMap()`
- edit markers:
```
addMarker(
  [type = 'venue', 'shopping', 'tourist', 'hotel' ],
  {
    name: '[Display Name]',
    position: {
      lat: [latitude],
      lng: [longitude]}
  }
);
```
- optionally, edit display attributes
```
zoom: 14,
mapTypeId: 'terrain',
scrollwheel: false
```
