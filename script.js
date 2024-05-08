document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const content = event.target.result;
        displayTable(content);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a file.');
    }
  });

  function displayTable(content) {
    const tableContainer = document.getElementById('tableContainer');
    const lines = content.split('\n');
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const tbody = document.createElement('tbody');

    lines.forEach((line, index) => {
      const row = document.createElement('tr');
      const cells = line.split(',');

      cells.forEach(cell => {
        const cellElement = document.createElement(index === 0 ? 'th' : 'td');
        cellElement.textContent = cell;
        row.appendChild(cellElement);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
  }
