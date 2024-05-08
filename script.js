document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const content = event.target.result;
        const extension = file.name.split('.').pop().toLowerCase();
        if (extension === 'csv') {
          displayCSV(content);
        } else if (extension === 'xls' || extension === 'xlsx') {
          displayExcel(content);
        } else {
          alert('Unsupported file format.');
        }
      };
      reader.onerror = function(event) {
        console.error('File could not be read! Code ' + event.target.error.code);
      };
      if (file.type === 'text/csv') {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    } else {
      alert('Please select a file.');
    }
  });

  function displayCSV(content) {
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

  function displayExcel(content) {
    const workbook = XLSX.read(content, { type: 'binary' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.classList.add('table', 'table-striped');
    const table = XLSX.utils.sheet_to_html(sheet);
    tableContainer.innerHTML = table;
  }