# FutureNova Cleaning Services website

React (Create React App, no Vite) + Bootstrap grid + plain CSS.

Single-page site: every section lives in src/pages/Home.js (the Contact section is src/pages/Contact.js).
Animations: bubbles, water ripples/waves/droplets in the Contact hero, scroll reveal, before/after wipe slider, scrolling strip.
All animations respect the visitor's reduced-motion setting.

## Run it
1. Install Node.js (version 18 or newer) from nodejs.org
2. In this folder run:

       npm install
       npm start

   The site opens at http://localhost:3000
3. For the live version run `npm run build` and upload the `build` folder.
   Your host must send every URL to index.html (a "single page app" setting).

## Where to change things
| I want to change...                 | Open this file             |
|-------------------------------------|----------------------------|
| phone numbers, WhatsApp, Instagram  | src/data/siteData.js       |
| services, prices, reviews, FAQs     | src/data/siteData.js       |
| colours and fonts                   | top of src/index.css       |
| menu / footer links                 | navLinks in src/data/siteData.js |
| contact page look and animations    | src/contact-premium.css    |
| footer look                         | section 10 of src/index.css |
| add a new page                      | src/pages + src/App.js (add routes first) |

## Folder map
- src/components  small reusable pieces (Button, ServiceCard, FAQItem ...)
- src/pages       Home (all sections) and Contact (the #contact section)
- src/data        all website text and numbers

## Before going live
- Check the starting prices in siteData.js are correct.
- Swap SolarScene in Home.js for real before/after photos if you have them.
- Add your email to `company.email` in siteData.js and it will appear automatically in the Contact section and footer.
- Booking form sends the request to WhatsApp. When the Django API is ready, use the
  commented fetch() block in src/components/BookingForm.js.
