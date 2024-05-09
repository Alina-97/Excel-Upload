let currentPage = 1;
const rowsPerPage = 10;
let totalRows = 0;

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const content = event.target.result;
            const extension = file.name.split('.').pop().toLowerCase();
            if (extension === 'csv') {
                displayCSV(content, currentPage, rowsPerPage);
            } else if (extension === 'xls' || extension === 'xlsx') {
                displayExcel(content, currentPage, rowsPerPage);
            } else {
                alert('Unsupported file format.');
            }

            // Show pagination and current page after document is loaded
            document.getElementById('paginationContainer').style.display = 'block';
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

document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        document.getElementById('currentPage').textContent = currentPage;
        reloadTable();
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    if (currentPage < Math.ceil(totalRows / rowsPerPage)) {
        currentPage++;
        document.getElementById('currentPage').textContent = currentPage;
        reloadTable();
    }
});

function reloadTable() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const content = event.target.result;
            const extension = file.name.split('.').pop().toLowerCase();
            if (extension === 'csv') {
                displayCSV(content, currentPage, rowsPerPage);
            } else if (extension === 'xls' || extension === 'xlsx') {
                displayExcel(content, currentPage, rowsPerPage);
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
}

function displayCSV(content, page, rowsPerPage) {
    const tableContainer = document.getElementById('tableContainer');
    const lines = content.split('\n');
    totalRows = lines.length - 1; // subtract header row

    const start = (page - 1) * rowsPerPage + 1;
    const end = Math.min(page * rowsPerPage, totalRows) + 1;

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const tbody = document.createElement('tbody');

    for (let i = start; i < end; i++) {
        const row = document.createElement('tr');
        const cells = lines[i].split(',');

        cells.forEach(cell => {
            const cellElement = document.createElement(i === start ? 'th' : 'td');
            cellElement.textContent = cell;
            row.appendChild(cellElement);
        });

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

function displayExcel(content, page, rowsPerPage) {
    const workbook = XLSX.read(content, { type: 'binary' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    totalRows = XLSX.utils.sheet_to_json(sheet).length;

    const start = (page - 1) * rowsPerPage;
    const end = Math.min(page * rowsPerPage, totalRows);

    const tableContainer = document.getElementById('tableContainer');
    tableContainer.classList.add('table', 'table-striped');
    const table = XLSX.utils.sheet_to_html(sheet, { range: start + ":" + end });
    tableContainer.innerHTML = table;
}
