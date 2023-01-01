# XPlayn-sample

Excerpts from *XPlayn*, a **content management system** (CMS) **web app** that I created to helps users *build interactive stories that come to life as they scroll*, using **Python** and **Django** on the back end, **JavaScript**, **HTML**, **CSS** on the front end and wrote my own **API routes** to query the database from the client-side. 


These coding segments implement adding a story to the database. Each story consists of: 
- a title, 
- a subtitle, and 
- chapters (with a text description, an image url and a caption).


**FUNCTIONALITIES & PAGE INTERACTIVITY:**
- When pressed, the button triggers the appearance of an input form on the page. 
- The user can input information about the story, add or remove chapters.
- When the form is submitted, the information is sent to the database via a custom JavaScript API route that I wrote: the story (title, subtitle) is saved first, then the chapters.

**FILES:**
- *index.html*
Pared-down web page.

- *main.js*
Handles the button interactivity.

- *admin.py*
Registers models and makes them accessible in the Django admin panel.

- *models.py*
Defines the web app’s 3 models (User, Story, Chapter) and their serializers.

- *urls.py*
Handles the URL schemes and the API routes for the web app.

- *views.py*
Contains the Python functions that handle the API’s querying of the database: *newstory*, *newchapter*.
