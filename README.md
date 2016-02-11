# studentSelector
Lets you put students into groups and also randomly select them and stuff

# TODO
 - create groups which have a list of students which should probably contain actual
   editable entries
 - edit group screen
 - let you go between each screen nicely
 - make the ui less stupid

# pages.js
You put the pages into the pages folder, and then call loadPage("pageName") to load a new
page. the nice thing about this is that it allows you to write html files that focus
solely on the layout of that particular screen, rather than creating it with javascript or
posting data around, then you can call javascript functions with onclick events since it
doesn't support scripts.
