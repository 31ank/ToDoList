const zeroPad = (num, places) => String(num).padStart(places, '0');

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

// Get all data once dom is interactive
document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        setupCalender();
        getData();
    }
};

var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var day = new Date();
day.setHours(0, 0, 0, 0);
var calenderEnd = new Date(day);
calenderEnd = calenderEnd.addDays(5);

// Function to fetch all data
function getData(){
    fetch('https://todo.blankbit.net/Backend/api.php')
    .then(function(response){
        if(!response.ok){
            throw new Error('Response error');
        }
        return response.json();
    }).then(function(data){
        // fill calender with returned json data
        fillCalender(data);
    })
    .catch(function(error){
        console.log("Error: " + error);
        return null;
    }).then(function(){
        // hide loading message and display calender
        document.getElementById('loading').style.display = 'none';
        document.getElementById('calender').style.display = 'flex';
    });
}

// Create calender headers
function setupCalender(){
    let dates = document.getElementsByClassName('header');
    let counter = 0;
    for (let date = day; date < calenderEnd; date = date.addDays(1)) {
        dates[counter].innerHTML = weekdays[date.getDay()] + " " + zeroPad(date.getDate(), 2) + "." + (date.getMonth() + 1);
        counter++;
    }
}

// Fill calender with data
function fillCalender(data){
    let dates = document.getElementsByClassName('date');

    let counter = 0;
    let entries = 0;
    for(let date = day; date < calenderEnd; date = date.addDays(1)){
        data.forEach(element => {
            let submissionDate = new Date(element['submissionDate']);
            submissionDate.setHours(0, 0, 0, 0);
            if(submissionDate.getTime() == date.getTime()){
                entries++;
                let newElement = document.createElement('div');
                newElement.className = 'element';
                let innerHTML = '<div class="subject">' + element['subject'] + '</div>' + element['description'] + '<br><a href="' + element['url'] + '" target="_blank">Link</a>';
                newElement.innerHTML = innerHTML;
                dates[counter].append(newElement);
            }
            
        });
        // If no entries in one day -> display none
        if(entries == 0){
            let noToDo = document.createElement('div');
            noToDo.className = 'element';
            noToDo.innerHTML = '<i>None</i>'
            dates[counter].append(noToDo);
        }
        entries = 0;
        counter++;
    }
}