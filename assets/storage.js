const CHACHE_KEY = "calculation_history";
// variabel digunakan untuk mengakses dan menyimpan data pada localStorage

function checkForStorage() {
  return typeof Storage !== "undefined";
}

function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CHACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CHACHE_KEY));
    }

    historyData.unshift(data);

    if (historyData.length > 5) {
      //  fungsi pop() digunakan untuk menghapus nilai index terakhir pada array
      historyData.pop();
    }

    localStorage.setItem(CHACHE_KEY, JSON.stringify(historyData));
  }
}

// fungsi digunakan untuk mengembalikan nilai array dari localStorage jika sudah memiliki nilai sebelumnya melalui JSON>parse()
function showHistory() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(CHACHE_KEY)) || [];
  } else {
    return [];
  }
}

// membuat fungsi untuk merender data riwayat kalkulasi pada tabel
function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
  historyList.innerHTML = "";

  for (let history of historyData) {
    let row = document.createElement("tr");
    row.innerHTML = "<td>" + history.firstNumber + "</td>";
    row.innerHTML += "<td>" + history.operator + "</td>";
    row.innerHTML += "<td>" + history.secondNumber + "</td>";
    row.innerHTML += "<td>" + history.result + "</td>";

    historyList.appendChild(row);
  }
}

// memanggil fungsi renderHistory agar dapat menampilkan riwayat kalkulasi
renderHistory();
