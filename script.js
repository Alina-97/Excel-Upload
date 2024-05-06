document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        // Parse the content (e.g., using a CSV parsing library)
        // For simplicity, let's assume the data is an array of objects:
        const data = [
            { name: 'John', age: 30 },
            { name: 'Alice', age: 25 },
            // ... more data
        ];

        // Generate table rows
        const tableBody = document.getElementById('dataTable');
        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach((item) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.age}</td>
            `;
            tableBody.appendChild(row);
        });
    };
    reader.readAsText(file); // Read the file as text
}
