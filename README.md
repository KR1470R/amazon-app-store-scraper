# amazon-app-store-scraper
Node.js module to scrape application data from the Amazon App store.

## Related Projects
* [galaxy-store-scraper](https://github.com/KR1470R/galaxy-store-scraper): a scraper with a similar interface for the Galaxy App Store.
* [roku-store-scraper](https://github.com/KR1470R/roku-store-scraper): a scraper with a similar interface for the Roku App Store.
* [samsung-app-store-scraper](https://github.com/KR1470R/samsung-app-store-scraper): a scraper with a similar interface for the Samsung App Store.

## Inspired by projects:
* [app-store-scraper](https://github.com/facundoolano/app-store-scraper): a scraper with a similar interface for the iTunes app store.
* [google-play-scraper](https://github.com/facundoolano/google-play-scraper): a scraper with a similar interface for the Google Play.

## ⚠️ Notes
This project is under development, thus a lot of things(most) are not implemented yet.\
**Feel free to contribute!**

The API contract of this module adhered to the contract of the projects listed above.

## Installation
```
npm install amazon-app-store-scraper
```

## Usage
Available methods:
- [app](#app): Retrieves the full detail of an application.

### app

Retrieves the full detail of an application. Options:

* `appId`: the ASIN of the app (the id route on the url).
* `lang` (optional, defaults to `'en_US'`): the ISO 3166-1 alpha-2 language code in which to fetch the app page.
* `currency` (optional, defaults to `'USD'`): the ISO 4217 currency code used to show up the app cost in specified currency.

Example:

```javascript
import amazonAppStoreScraper from "amazon-app-store-scraper";

amazonAppStoreScraper.app({appId:  'B00V8X7XTO'})
	.then(console.log, console.log);
```
Results:
```javascript
{ 
	id: 'B00V8X7XTO', 
	title: 'Fox News: US & World Headlines' 
}
```
If app does not exist  the following value will be resolved:
```javascript 
null
``` 
