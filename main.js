function create_story() {

    document.querySelector('#index-stories').style.display = 'none';

    // Creates a form where users can input information about the story, add or remove chapters
    document.querySelector('#index-actions').innerHTML = `
        <h1 id="index-actions-title">New Story</h1>
        <br>
        <form id="newstoryform" class="general-form" action="" return false;>
            <div class="form-group">
                Title:
                <input autofocus class="form-control" type="text" id="newstorytitle" name="title" placeholder="" required>
            </div>
            <div class="form-group">
                Subtitle:
                <input class="form-control" type="text" id="newstorysubtitle" name="subtitle" placeholder="">
            </div>
            <br>
            <div class="controls">
            <button type="button" class="btn btn-outline-secondary" id="add_chapter">
                <i class="fa fa-plus"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg></i> Add chapter
            </button>
                
            <button type="button" class="btn btn-outline-secondary" id="remove_chapter">
                <i class="fa fa-minus"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                </svg></i> Remove chapter
            </button>
            </div>
            <br>
            <div id="chapters">
            </div>
            <br>
            <input class="btn btn-primary" type="submit" value="Save"> <u onclick="cancel()">Cancel</u>
        </form>
        <br>
        <br>
    `;

    // Accesses the different elements of the form
    const newstoryform = document.getElementById("newstoryform");
    var chapters_form = document.getElementById("chapters");
    var add_chapter = document.getElementById("add_chapter");
    var remove_chapter = document.getElementById("remove_chapter");
    var counter = 0

    // Handles adding a chapter to the form
    add_chapter.onclick = function () {
        counter += 1;
        var newChapter = document.createElement("div");
        newChapter.setAttribute("class", "chapter-" + counter);
        newChapter.innerHTML = `
            <p id="chapter-${counter}">Chapter ${counter}:</p>
            <input class="form-control" type="text" id="chapter-${counter}-description" name="chapter" placeholder="Description">
            <br>
            <input class="form-control" type="url" id="chapter-${counter}-imageurl" name="chapterimageurl" placeholder="Image url">
            <br>
            <input class="form-control" type="text" id="chapter-${counter}-imagecaption" name="chapterimagecaption" placeholder="Image caption">
            <br>
        `;
        console.log(newChapter);
        chapters_form.append(newChapter);
    }

    // Handles removing a chapter from the form
    remove_chapter.onclick = function () {
        var allchapters = chapters_form.getElementsByTagName("div");
        console.log("allchapters: ", allchapters);
        var numberofchapters = allchapters.length;
        console.log("numberofchapters: " + numberofchapters);
        var lastchapter = allchapters[numberofchapters - 1];
        // Remove last chapter
        if (numberofchapters > 0) {
            lastchapter.remove();
            console.log("remove last chapter: " + lastchapter);
            counter -= 1;
        }

    }

    // Saves values inputed by the user to the database.
    newstoryform.addEventListener('submit', function () {
        // Prevent default reload of the page upon form submission
        event.preventDefault()

        // Store the title and the subtitle in variables
        const newstorytitle = document.getElementById('newstorytitle').value;
        const newstorysubtitle = document.getElementById('newstorysubtitle').value;

        var allchapters = chapters_form.getElementsByTagName("div");
        var numberofchapters = allchapters.length;

        // Loop over the form chapters and store the description, image and caption in different arrays
        function createChapterVariables() {
            for (var i = 1; i <= numberofchapters; ++i) {
                var chapter_description_id = `chapter-${i}-description`;
                var chapter_imageurl_id = `chapter-${i}-imageurl`;
                var chapter_imagecaption_id = `chapter-${i}-imagecaption`;

                chapter_descriptions.push(document.getElementById(chapter_description_id).value);
                chapter_imageurls.push(document.getElementById(chapter_imageurl_id).value);
                chapter_imagecaptions.push(document.getElementById(chapter_imagecaption_id).value);
            }

            return chapter_descriptions, chapter_imageurls, chapter_imagecaptions;
        }


        var chapter_descriptions = [];
        var chapter_imageurls = [];
        var chapter_imagecaptions = [];

        createChapterVariables();

        // Handle CSRF Token for security reasons to prevent cross forgery requests
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        const csrftoken = getCookie('csrftoken');


        // Trigger the fetch(`/newstory`) API route to save the story (title and subtitle) in the database
        fetch(`/newstory`, {
            method: 'POST',
            headers: {
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({
                "title": newstorytitle,
                "subtitle": newstorysubtitle

            })
        }).then(response => response.json())
            .then(data =>
                refreshpage(data)
            )
            .catch(error => {
                console.log('Error:', error)
            });

        // Saves chapters (description, image, caption) in database and refreshes the page's user interface
        function refreshpage(data) {
            var story_id = data["id"];

            // Trigger the fetch(`/newchapter`) API route to save each chapter in the database
            for (var i = 0; i <= (numberofchapters - 1); ++i) {

                fetch(`/newchapter`, {
                    method: 'POST',
                    headers: {
                        "X-CSRFToken": csrftoken
                    },
                    body: JSON.stringify({
                        "story": story_id,
                        "chapter_number": i,
                        "description": chapter_descriptions[i],
                        "image": chapter_imageurls[i],
                        "caption": chapter_imagecaptions[i]
                    })
                }).then(response => response.json())
                    .then(data => console.log(data)
                    )
                    .catch(error => {
                        console.log("Error:", error)
                    });
            }
        }
    });
}