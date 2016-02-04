//some nice global variables to enjoy
currentClass = [];
selectableClass = [];
selectedStudent = document.createElement("h2");
studentGroups = [];


function getCookie(cname)//TODO: rewrite this
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}


function hash(string)
{
  var output = 0;
  for (var i = 0;i < string.length;i++)
  {
    output = (output << 1);
    output ^= string.charCodeAt(i);
  }
  return output;
}


function addNewline()
{
  var main = document.getElementById("main");
  var newline = document.createElement("br");
  main.appendChild(newline);
}


function selectStudent()
{
  //if the whole class has been selected
  if (selectableClass.length == 0)
  {
    selectableClass = randomize(currentClass);
  }

  //get the first student and delete them
  student = selectableClass[0];
  selectableClass.splice(0,1);

  selectedStudent.innerHTML = student + " selected";
}


function toGroups()
{
  var main = document.getElementById("main");

  //delete any existing groups on the screen
  for (var i = 0;i < studentGroups.length;i++)
  {
    main.removeChild(studentGroups[i]);
  }
  studentGroups = [];

  var groupSize = document.getElementById("groupSizeInput");
  var groups = groupsOf(currentClass,groupSize.value);

  //then actually put them on the screen
  for (var i = 0;i < groups.length;i++)
  {
    var groupDiv = document.createElement("div");
    for (var u = 0;u < groups[i].length;u++)
    {
      groupDiv.innerHTML += groups[i][u] + " ";
    }

    main.appendChild(groupDiv);
    studentGroups.push(groupDiv);
  }
}


function loadClass(classHash)
{
  var main = document.getElementById("main");
  main.innerHTML = "";

  //add the selected student thingo
  main.appendChild(selectedStudent);

  //add all the names
  var names = getCookie(classHash);

  var namesHolder = document.createElement("p");
  namesHolder.innerHTML = names;
  main.appendChild(namesHolder);

  //add the controls for stuff
  var randomStudentSubmit = document.createElement("a");
  randomStudentSubmit.href = "#";
  randomStudentSubmit.onclick = selectStudent;
  randomStudentSubmit.innerHTML = "Select Random Student";
  main.appendChild(randomStudentSubmit);

  var groupSizeInput = document.createElement("input");
  groupSizeInput.type = "number";
  groupSizeInput.id = "groupSizeInput";
  var groupSubmit = document.createElement("a");
  groupSubmit.href = "#";
  groupSubmit.onclick = toGroups;
  groupSubmit.innerHTML = "Create Groups";

  main.appendChild(groupSizeInput);
  main.appendChild(groupSubmit);

  currentClass = names.split(",");
}


function newClass()
{
  //save the class to cookies
  var classInput = document.getElementById("classInput");
  var classHash = hash(classInput.value);

  console.log(classHash);
  document.cookie = classHash + "=" + classInput.value +
                    ";expires=Thu, 18 Dec 2020 12:00:00 UTC";

  //load it from cookies
  loadClass(classHash);
}


function reload()
{
	location.reload();
}


function start()
{
  var main = document.getElementById("main");

  //add the new class heading
  var newClassHeading = document.createElement("h2");
  newClassHeading.innerHTML = "New Class";
  main.appendChild(newClassHeading);

  //add the new class instructions
  var newClassText = document.createElement("p");
  newClassText.innerHTML = "enter student names separated by commas";
  main.appendChild(newClassText);

  //add the text entry for new class thing
  var newClassInput = document.createElement("textarea");
  newClassInput.id = "classInput";
  main.appendChild(newClassInput);

  //add the submit button
  var newClassSubmit = document.createElement("a");
  newClassSubmit.onclick = newClass;
  newClassSubmit.href = "#";
  newClassSubmit.innerHTML = "add new class";
  main.appendChild(newClassSubmit);

  //add the old class heading
  var oldClassHeading = document.createElement("h2");
  oldClassHeading.innerHTML = "Load Old Class";
  main.appendChild(oldClassHeading);

  //add the old class things with delete buttons
  var oldClasses = document.cookie.split("; ");

  for (var i = 0;i < oldClasses.length;i++)
  {
    var classData = oldClasses[i].split("=");
    var classLink = document.createElement("a");
    classLink.innerHTML = classData[1];
    classLink.onclick = function()
    {
      loadClass(classData[0]);
    }
    classLink.href = "#";
    main.appendChild(classLink);

    addNewline();
  }
}
