# XPlayn-sample

Extracts from *XPlayn*, a **content management system** (CMS) **web app** that I created that helps users build interactive stories that come to life as they scroll. These coding excerpts focus on implementing adding a story to the database. Each story consists of a title, a subtitle and chapters (with a text description, an image url and a caption).

I used Django and Python for the back end, I used JavaScript for the front end to dynamically manipulate the HTML DOM and I wrote my own JavaScript API routes to query the database on the client-side. This enables me to expose data in JSON format without having to access the server. I used CSS / Bootstrap for styling. 

**FUNCTIONALITIES & PAGE INTERACTIVITY:**
- When pressed, the button triggers the appearance of an input form on the page. 
- The user can input information about the story, add or remove chapters.
- Upon submition, the information inputed in the form is sent to the database via a custom JavaScript API route that I wrote to query the database from the client-side. First, the story (title, subtitle) is saved then, I loop over all the chapters and save them to the story in the database.

**FILES:**
*index.html*
Pared-down web page.

*main.js*
Handles the button interactivity.

*admin.py*
Registers models and makes them accessible in the Django admin panel.

*models.py*
Defines the web app’s 3 models (User, Story, Chapter) and their serializers.

*urls.py*
Handles the URL schemes and the API routes for the web app.

*views.py*
Contains the Python functions that take the web requests and return Http response or Json responses or render HTML templates. The other functions handle the API’s querying of the database: *newstory*, *newchapter*.
