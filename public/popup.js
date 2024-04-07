document.addEventListener('DOMContentLoaded', function() {
    var activateBtn = document.getElementById('activateBtn');
  
    activateBtn.addEventListener('click', function() {
      // Open a new window with the debugger.html file without the address bar
      window.open('index.html', '_blank', 'width=400,height=200,toolbar=no,location=no,status=no,menubar=no');
    });
  });
  

//   now lets talk about how to send debug  information on server side language (php) in wordpress to the application,

// the way that I believe would be nice to handle this is by having a json file that logs all the things that I want to debug and fetching that file and rendered in the window of the extension

// ho