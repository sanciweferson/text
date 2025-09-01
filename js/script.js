function loadHeader() {
  fetch('header.html')
    .then(res => res.text())
    .then(data => {
      const container = document.createElement('div');
      container.innerHTML = data;
      document.body.prepend(container);

  
 

  
    });
}

loadHeader();
