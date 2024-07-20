document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employee-form');
    const employeeListContainer = document.getElementById('employee-list');
    const employeeTableBody = document.querySelector('#employees-table tbody');
    const viewEmployeesButton = document.getElementById('view-employees');
    const homeButton = document.getElementById('home');
    const homeEditButton = document.getElementById('home-edit');
    const editEmployeeContainer = document.getElementById('edit-employee');
    const editEmployeeForm = document.getElementById('edit-employee-form');
    
    let employees = [];
    let editingIndex = -1;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const employee = {
            name: form.name.value,
            birthDate: new Date(form.birth_date.value),
            address: form.address.value,
            phone: form.phone.value,
            email: form.email.value,
            jobTitle: form.job_title.value,
            department: form.department.value,
        };

        if (editingIndex > -1) {
            employees[editingIndex] = employee;
            editingIndex = -1;
        } else {
            employees.push(employee);
        }

        form.reset();
        toggleView('form');
        renderEmployeeList();
    });

    viewEmployeesButton.addEventListener('click', () => {
        toggleView('list');
    });

    homeButton.addEventListener('click', () => {
        toggleView('form');
    });

    homeEditButton.addEventListener('click', () => {
        toggleView('list');
    });

    function renderEmployeeList() {
        employeeTableBody.innerHTML = '';
        employees.forEach((employee, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${getAge(employee.birthDate)}</td>
                <td>${employee.phone}</td>
                <td>${employee.email}</td>
                <td><button data-index="${index}" class="edit-btn">Editar</button></td>
            `;
            employeeTableBody.appendChild(row);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                startEdit(parseInt(index));
            });
        });
    }

    function startEdit(index) {
        const employee = employees[index];
        form.name.value = employee.name;
        form.birth_date.value = employee.birthDate.toISOString().split('T')[0];
        form.address.value = employee.address;
        form.phone.value = employee.phone;
        form.email.value = employee.email;
        form.job_title.value = employee.jobTitle;
        form.department.value = employee.department;

        editingIndex = index;
        toggleView('edit');
    }

    function getAge(birthDate) {
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function toggleView(view) {
        if (view === 'form') {
            form.style.display = 'block';
            employeeListContainer.style.display = 'none';
            editEmployeeContainer.style.display = 'none';
        } else if (view === 'list') {
            form.style.display = 'none';
            employeeListContainer.style.display = 'block';
            editEmployeeContainer.style.display = 'none';
        } else if (view === 'edit') {
            form.style.display = 'none';
            employeeListContainer.style.display = 'none';
            editEmployeeContainer.style.display = 'block';
        }
    }
});