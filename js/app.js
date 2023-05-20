document.addEventListener('DOMContentLoaded', init, false);

let data, dataTab, sortCol;
let sortAsc = false;
const pageSize = 20;
let curPage = 1;
let table = document.getElementById('table');
let tbody = document.querySelector('#tableNames tbody');
let thead = document.querySelector('#tableNames thead');

async function init() {
    let response = await fetch('json/posortowane_imiona.json');
    dataTab = await response.json();
    dataTab = Object.values(dataTab);
    data = dataTab;

    createTable();

    let input = document.getElementById('name');
    let btnGr = document.querySelector('.btn-group');
    
    input.addEventListener('input', function() {
        dataTab = data;
        btnGr.style.display = "inline-flex";
        thead.style.display = "table-header-group";
        if(this.value.length === 0) {
            createTable();
        }
        else if(check(this.value)) {
            dataTab = dataTab.filter(x => x.name.startsWith(this.value.toUpperCase()));
            curPage = 1;
            createTable();
        }
        else {
            tbody.innerHTML = "<div class='alert alert-danger' role='alert'>Nie znaleziono żadnych wyników dla wybranych kryteriów.</div>";
            thead.style.display = "none";
            btnGr.style.display = "none";
        }
    });

    document.querySelectorAll('#tableNames thead tr th').forEach(t => {
        t.addEventListener('click', sort, false);
    });

    document.querySelector('#next').addEventListener('click', nextPage, false);
    document.querySelector('#prev').addEventListener('click', previousPage, false);
}

function createTable() {
    let result = '';
    dataTab.filter((row, index) => {
        let start = (curPage-1)*pageSize;
        let end =curPage*pageSize;
        if(index >= start && index < end) return true;
    }).forEach(x => {
        result += `<tr>
        <td>${x.nr}</td>
        <td>${x.name}</td>
        <td>${x.s}</td>
        <td>${x.count.toLocaleString()}</td>
        </tr>`;
    });
    tbody.innerHTML = result;
}

function sort(e) {
    let thisSort = e.target.dataset.sort;
    if(sortCol === thisSort) sortAsc = !sortAsc;
    sortCol = thisSort;
    dataTab.sort((a, b) => {
      if(a[sortCol] < b[sortCol]) return sortAsc?1:-1
      if(a[sortCol] > b[sortCol]) return sortAsc?-1:1;
      return 0;
    });
    createTable();
}

function previousPage() {
    if(curPage > 1) curPage--;
    createTable();
}
  
function nextPage() {
    if((curPage * pageSize) < dataTab.length) curPage++;
    createTable();
}

function check(value) {
    return dataTab.some(x => x.name.startsWith(value.toUpperCase()));
}
