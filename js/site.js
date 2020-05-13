


/*fetch(request).then(response => {
    if (response.ok) {
        console.log("Contenuto ricevuto");
        //response.json() fornisce la risposta del server in formato json
        return response.json();
    } 
    if (response.status >= 100 && response.status < 200) {
        console.log("Informazioni per il client");
    }
    if (response.status >= 300 && response.status < 399) {
        console.log("Redirezione");
    }
    if (response.status >= 400 && response.status < 499) {
        console.log("Richiesta errata");
    }
    if (response.status >= 500 && response.status < 599) {
        console.log("Errore sul server");
    }
}).catch(error => console.log("Si è verificato un errore!"))*/

/*var requst = new Request("http://192.168.11.142:83/api/FISWrapper/RunCommand", {
    method: "POST",
    headers: new Headers({
        "Content-Type": "application/json"
    }),
    body: JSON.stringify(
        {
            Action: 3,
            Parameters: {
                name: "CSA_UBI_XXX_SITRADE_26207_MOSTRA_SALDO_DEMO_TESI",
                address: "192.168.10.131"
            }
        }
    )
});*/

//function prova() {
//    var uri = "http://localhost:50808/api/fis/status?address=192.168.10.131";
//    fetch(uri)
//        .then(
//            function (response) {
//                obj = (response.json());
//                console.log(obj);
//            })
//        .catch(error => error('Unable to get items.', error));
//}


//-------------------------------------------------------------------------------------------------------------------
// Lancia il comando e ne prende la Promise restituita (tramite la function httpGet), il cui oggetto contenente la response è tfsCommandResponse
async function runTestSetAsync() {
    var parametriQuery = window.location.search.split("?")[1].split("&");
    var testPlanId = "test" + parametriQuery[0];
    var testSuiteId = "test" + parametriQuery[1];
    var address = "address=192.168.10.131";
    var uri = "http://localhost:50808/api/fis/runTestSet?";
    uri = uri.concat(testPlanId + "&");
    uri = uri.concat(testSuiteId + "&");
    uri = uri.concat(address);
    console.log("link per il run del test set: " + uri);
    httpGet(uri)
        .then(
            function (tfsCommandResponse) {
                console.log("Parametro Command: " + tfsCommandResponse.Command);
                console.log("Parametro ExecutionTime: " + tfsCommandResponse.ExecutionTime);
                console.log("Parametro Message: " + tfsCommandResponse.Message);
                console.log("Parametro ReturnCode: " + tfsCommandResponse.ReturnCode);
                console.log("Parametro Success: " + tfsCommandResponse.Success);
                if (tfsCommandResponse.ReturnCode == 0) {
                    alert("Il lancio del test set è andato a buon fine, per vederne l'esito clicca il button Status");
                }
            })
        .catch(error => console.log(error.message));
}

async function statusAsync() {
    var uri = "http://localhost:50808/api/fis/status";
    var address = getAddress();
    uri = uri.concat("?address=" + address);
    httpGet(uri)
        .then(
            function (tfsCommandResponse) {
                console.log("Parametro Command: " + tfsCommandResponse.Command);
                console.log("Parametro ExecutionTime: " + tfsCommandResponse.ExecutionTime);
                console.log("Parametro Message: " + tfsCommandResponse.Message);
                console.log("Parametro ReturnCode: " + tfsCommandResponse.ReturnCode);
                console.log("Parametro Success: " + tfsCommandResponse.Success);
                switch (tfsCommandResponse.ReturnCode) {
                    case 0:
                        alert("L'esito del test è SUPERATO");
                        break;
                    case -1:
                        alert("Il test è ancora in esecuzione, attendi qualche minuto e riprova");
                        break;
                    case -2:
                        alert("L'esito del test è FALLITO");
                        break;
                    case -3:
                        alert("L'esito del test è SKIPPATO");
                        break;
                    case -4:
                        alert("Lo stato è sconosciuto");
                        break;
                }
            })
        .catch(error => console.log(error.message));
}

async function reportGenerationAsync() {
    var uri = "http://localhost:50808/api/fis/reportGeneration?address=192.168.10.131";
    httpGet(uri)
        .then(
            function (tfsCommandResponse) {
                console.log("Parametro Command: " + tfsCommandResponse.Command);
                console.log("Parametro ExecutionTime: " + tfsCommandResponse.ExecutionTime);
                console.log("Parametro Message: " + tfsCommandResponse.Message);
                console.log("Parametro ReturnCode: " + tfsCommandResponse.ReturnCode);
                console.log("Parametro Success: " + tfsCommandResponse.Success);
                if (tfsCommandResponse.ReturnCode == 0) {
                    alert("Il report è stato generato correttamente");
                }
            })
        .catch(error => console.log(error.message));
}

async function reportConfigurationAsync() {
    var uri = "http://localhost:50808/api/fis/reportConfiguration?request.ReportingLevel=2&request.OutputDirectory=\"C:\\Users\\Administrator\\Desktop\\Report\"&request.OutputFileName=\"report.pdf\"&address=\"192.168.10.131\"";
    httpGet(uri)
        .then(
            function (tfsCommandResponse) {
                console.log("Parametro Command: " + tfsCommandResponse.Command);
                console.log("Parametro ExecutionTime: " + tfsCommandResponse.ExecutionTime);
                console.log("Parametro Message: " + tfsCommandResponse.Message);
                console.log("Parametro ReturnCode: " + tfsCommandResponse.ReturnCode);
                console.log("Parametro Success: " + tfsCommandResponse.Success);
                if (tfsCommandResponse.ReturnCode == 0) {
                    alert("La generazione del report è stata effettuata correttamente");
                }
            })
        .catch(error => console.log(error.message));
    }

function httpGet(url) {
    return new Promise(function (resolve, reject) {
        var httpReq = new XMLHttpRequest();
        httpReq.onreadystatechange = function () {
            var data;
            if (httpReq.readyState == 4) {
                if (httpReq.status == 200 ) {
                    data = JSON.parse(httpReq.responseText);
                    resolve(data);
                } else {
                    reject(new Error(httpReq.statusText));
                }
            }
        };
        httpReq.open("GET", url, true);
        httpReq.send();
    });
}

async function runTestCaseAsync() {
    var parametriQuery = window.location.search.split("?")[1].split("&");
    var testPlanId = "test" + parametriQuery[0];
    var testSuiteId = "test" + parametriQuery[1];
    var address = "address=192.168.10.131";
    var uri = "http://localhost:50808/api/fis/runTestCase?";
    uri = uri.concat(testPlanId + "&");
    uri = uri.concat(testSuiteId + "&");
    uri = uri.concat("testCaseId=" + getTestCaseId() + "&");
    uri = uri.concat(address);
    console.log("link per il run del test case: " + uri);
    httpGet(uri)
        .then(
            function (tfsCommandResponse) {
                console.log("Parametro Command: " + tfsCommandResponse.Command);
                console.log("Parametro ExecutionTime: " + tfsCommandResponse.ExecutionTime);
                console.log("Parametro Message: " + tfsCommandResponse.Message);
                console.log("Parametro ReturnCode: " + tfsCommandResponse.ReturnCode);
                console.log("Parametro Success: " + tfsCommandResponse.Success);
                if (tfsCommandResponse.ReturnCode == 0) {
                    alert("Il lancio del test set è andato a buon fine, per vederne l'esito clicca il button Status");
                }
            })
        .catch(error => console.log(error.message));
}

function getTestCaseId() {
    var myFieldVal = document.myForm.myField.value;
    return myFieldVal;
}

function getAddress() {
    var address = document.myFormDue.address.value;
    if (address == "address")
        alert("Devi scegliere l'indirizzo di una macchina dal menu a tendina");
    else
        return address;
}

//-------------------------------------------------------------------------------------------------------------------------
/*
const uri = 'http://192.168.11.142:83/api/FISWrapper/RunCommand';
let todos = [];

function reqListener() {
    console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("POST", "http://localhost:83/api/FISWrapper/RunCommand");
oReq.send();


function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');

  const command = {
    Action: 0,
      Parameters: {

      }
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

/*function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = todos.find(item => item.id === id);
  
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-isComplete').checked = item.isComplete;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    isComplete: document.getElementById('edit-isComplete').checked,
    name: document.getElementById('edit-name').value.trim()
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'to-do' : 'to-dos';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';
    isCompleteCheckbox.disabled = true;
    isCompleteCheckbox.checked = item.isComplete;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    td1.appendChild(isCompleteCheckbox);

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.name);
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    td3.appendChild(editButton);

    let td4 = tr.insertCell(3);
    td4.appendChild(deleteButton);
  });

  todos = data;
}*/