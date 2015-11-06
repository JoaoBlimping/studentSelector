function randomize(input)
{
  var students = input.concat([]);
  var output = [];

  for (var i = students.length - 1;i >= 0;i--)
  {
    var selected = Math.floor(Math.random() * (i + 1));
    output[i] = students[selected];
    students.splice(selected,1);
  }
  return output;
}


function groupsOf(input,groupSize)
{
  var students = randomize(input);
  var output = [];

  while (students.length > 0)
  {
    var group = [];

    while (group.length < groupSize && students.length > 0)
    {
      group.push(students[0]);
      students.splice(0,1);
    }
    output.push(group);
  }

  return output;
}



function test()
{
  var things = ["a","b","c","d","e","f","g","h"];
  console.log(things);

  console.log(groupsOf(things,3).toString());
  console.log(randomize(things));

}
