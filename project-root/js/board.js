let arr = JSON.parse(localStorage.getItem("arrlist"));
let addlist = document.getElementById("upyourboards");
let titleboard = document.getElementById("titleboard");
let bodytodo = document.getElementById("bodytodo");
let todo = document.getElementById("todo");
let another = document.getElementById("another");
let inproress = document.getElementById("inproress");
let bodyinproress = document.getElementById("bodyin");
let bodyanother = document.getElementById("bodyanother");
let addtodo = document.getElementById("add-todo");
let addinproress = document.getElementById("add-inproress");
let addanother = document.getElementById("add-another");
let script = document.getElementById("script");
let statuss = document.getElementById("status");
let movecard = document.getElementById("move-card");
let createlabel = document.getElementById("create-label");
let labelbtn = document.getElementById("labelbtn");
let closecard = document.getElementById("closecard");
let closeanother = document.getElementById("closeanother");
let cancel = document.getElementById("cancel");
let savebutton = document.getElementById("save-button");
let inputboard = document.getElementById("input-board");
let position = document.getElementById("position");
let moretodo = document.getElementById("more-todo");
let morein = document.getElementById("more-in");
let inputtodo = document.getElementById("input-todo");
let moreanother = document.getElementById("more-another");
let fottertodo = document.getElementById("fottertodo");
let savetodo = document.getElementById("savetodo");
let textscript = document.getElementById("textscript");
let inputbox = document.getElementById("input-box");
let footerin = document.getElementById("fotterin");
let savein = document.getElementById('savein');
let closein = document.getElementById("closein");
let inputin = document.getElementById("input-in");
let bodyin = document.getElementById("bodyin");
let inputanother = document.getElementById("input-another");
let saveanother = document.getElementById("save-another");
let cancelanother = document.getElementById('cancel-another');
let fotteranother = document.getElementById("fotteranother");
let input = document.getElementById("input");
let editlable = document.getElementById("Edit-lable");
let btndelete = document.getElementById("btn-delete");
let btnsave = document.getElementById("btn-save");
let color2 = document.getElementById("color2");
const a = new FroalaEditor('#inputscript');
let more1 = document.getElementById("more1");
let addlable = document.getElementById("add-lable");
let createtitle = document.getElementById("create-title");
let deletelist = document.getElementById("deleteslist");
let createtitlebtn = document.getElementById("create-titlebtn");
let textcreatelable = document.getElementById("textcreatelable");
let textcreatelable2 = document.getElementById("textcreatelable2");
let colorcheck;
let datebtn = document.getElementById("datebtn");
let btncreate = document.getElementById("btn-create");
let checkstartdate = document.getElementById("checkbox-start-date");
let checkduedate = document.getElementById("checkbox-due-date");
let startdate = document.getElementById("start-date");
let duedate = document.getElementById("due-date");
let endtime = document.getElementById("end-time");
const pastelColors = ["#C8F4DD", "#FBECA8", "#FED7B0", "#FFC8C8", "#DDD7FA", "#54D29A", "#F7C843", "#FFA060", "#FF6F6F", "#9087E5"];
let color = document.getElementById("color");
let customStatusContainer = document.getElementById("status-columns");
arr[0].board.forEach(element => {
    if (!element.status || element.status.length === 0) {
        element.status = [{ name: "todo", list: [], id: 1, }, { name: "inprogress", list: [], id: 2, title: [] }];
        save();
    }
});
function renderList() {
    addlist.innerHTML = "";
    arr[0].board.forEach(element => {
        addlist.innerHTML += `
            <div class="img2" onclick="addbody(${element.id})">
                <div><img src="${element.img}" alt=""></div>
                <div class="titleimg">${element.name}</div>
            </div>
        `;
    });
    let index = document.querySelectorAll(".img2");
    index.forEach(element => {
        element.addEventListener("click", () => {
            index.forEach(el => el.style.backgroundColor = "transparent");
            element.style.backgroundColor = "lightblue";
            input.style.display = "none";
            document.querySelectorAll(".task-column").forEach(c => c.style.display = "none");
        });
    });
}

renderList();

function addbody(id) {
    let index = arr[0].board.findIndex(element => element.id === id);
    titleboard.innerHTML = `
        <div class="header">
            <div>${arr[0].board[index].name}</div>
            <button class="boardbtn" onclick="renderboard(${id})"><i class="fa-solid fa-chess-board"></i> Board</button>
            <button class="boardbtn" onclick="exit()"><i class="fa-solid fa-square-xmark"></i> Close this board</button>
        </div>
        <div class="filters">
            <button><i class="fa-solid fa-filter"></i> Filters</button>
        </div>
    `;

    let btn = document.querySelectorAll(".boardbtn");
    btn.forEach(button => {
        button.addEventListener("click", () => {
            btn.forEach(b => b.classList.remove("addbtn"));
            button.classList.add("addbtn");
        });
    });
}
function renderboard(id) {
    let i = arr[0].board.findIndex(element => element.id == id);
    input.style.display = "flex";
    todo.style.display = "block";
    inproress.style.display = "block";
    another.style.display = "block";
    input.style.backgroundColor = `${arr[0].board[i].color}`;
    customStatusContainer.style.display = "flex";
    bodytodo.innerHTML = "";
    bodyin.innerHTML = "";
    rendertodo(i);
    renderinprogress(i);
    renderstatus(i);

    document.querySelectorAll(".task-column").forEach(c => {
        c.style.display = "block";
    });
    addtodo.onclick = function () {
        moretodo.style.display = "block";
        fottertodo.style.display = "none";
        savetodo.onclick = function () {
            pushtodo(i);
            rendertodo(i);
        }
    }
    addinproress.onclick = function () {
        morein.style.display = "block";
        footerin.style.display = "none";
        savein.onclick = function () {
            pushinprogress(i);
            renderinprogress(i);
        }
    }
    addanother.onclick = function () {
        moreanother.style.display = "block";
        fotteranother.style.display = "none";
        saveanother.onclick = function () {
            pushanother(i);
            renderboard(arr[0].board[i].id);
        }
    }
}
function save() {
    localStorage.setItem('arrlist', JSON.stringify(arr));
};
let selectedIndex = null;
function addcolor() {
    color.innerHTML = "";
    pastelColors.forEach((colorCode, index) => {
        color.innerHTML += `
            <div class="size-color" style="background-color:${colorCode}" onclick="selectColor(${index},'${colorCode}')" id="color-${index}">
                <span class="checkmark" id="check-${index}">✓</span>
            </div>`;
    });
};
addcolor();
statuss.onclick = function () {
    movecard.style.display = "block";
}
closecard.onclick = function () {
    movecard.style.display = "none";
}
closeanother.onclick = function () {
    createlabel.style.display = "none";
}
cancel.onclick = function () {
    script.style.display = "none";
    document.body.classList.remove("dark-overlay");
    createlabel.style.display = "none";
    movecard.style.display = "none";
    createtitle.style.display = "none"
    document.getElementById("date-container").style.display = "none";
}
function repair(i, id) {
    let index = arr[0].board[i].status.findIndex(element => element.name == "todo");
    let index2 = arr[0].board[i].status[index].list.findIndex(element => element.id == id);
    inputboard.innerHTML = arr[0].board[i].name;
    textscript.value = arr[0].board[i].status[index].list[index2].name;
    statuss.innerHTML = "";
    arr[0].board[i].status.forEach(status => {
        statuss.innerHTML += `<option value="${status.name}" ${status.name === "todo" ? "selected" : ""} style="display: none;">${status.name}</option>`;
    });
    addboard(i, "todo");
    inputbox.value = "todo";
    inputbox.onchange = function () {
        addboard(i, inputbox.value);
    }
    repairvalue(i, index2, index);
    script.style.display = "block";
    document.body.classList.add("dark-overlay");
    repairtodovalue(i, index2, index);
    repairelement(i, index2, index);
    createlabelblock(i, index, index2);
    labelbtn.onclick = function () {
        renderlable(i, index, index2);
        createtitle.style.display = "block";
    }
    date(i, index, index2);
}

function closetodo() {
    moretodo.style.display = "none";
    fottertodo.style.display = "flex";
}
function rendertodo(i) {
    let index = arr[0].board[i].status.findIndex(element => element.name == "todo");
    inputtodo.value = "";
    bodytodo.innerHTML = "";
    arr[0].board[i].status[index].list.forEach(element => {
        bodytodo.innerHTML += `
        <div class="rowtodo" onclick="repair(${i},${element.id})"> <div><input type="checkbox" class="checkbox" ${element.checked ? "checked" : ""} onclick="check(${i},${index},${element.id}, this)"></div>
    <div>${element.name}</div></div>
        `
    });
}
function pushtodo(i) {
    let index = arr[0].board[i].status.findIndex(element => element.name == "todo");
    let inputvaluetodo = inputtodo.value;
    if (!inputvaluetodo) return;
    arr[0].board[i].status[index].list.push({
        id: Math.floor(Math.random() * 1000) + 1,
        name: inputvaluetodo,
        status: "todo",
        title: [],
    });
    save();
}
function addboard(i, statusName) {
    let statusIndex = arr[0].board[i].status.findIndex(element => element.name == statusName);
    let listLength = arr[0].board[i].status[statusIndex].list.length;

    position.innerHTML = "";
    for (let j = 1; j <= listLength + 1; j++) {
        position.innerHTML += `<option value="${j}">${j}</option>`;
    }
}
closein.onclick = function () {
    morein.style.display = "none";
    footerin.style.display = "flex";
}
function pushinprogress(i) {
    let index = arr[0].board[i].status.findIndex(element => element.name == "inprogress");
    let inputvaluetin = inputin.value;
    if (!inputvaluetin) return;
    arr[0].board[i].status[index].list.push({
        id: Math.floor(Math.random() * 1000) + 1,
        name: inputvaluetin,
        status: "inprogress",
        title: [],
    });
    save();
}
function renderinprogress(i) {
    let index = arr[0].board[i].status.findIndex(element => element.name == "inprogress");
    inputin.value = "";
    bodyin.innerHTML = "";
    arr[0].board[i].status[index].list.forEach(element => {
        bodyin.innerHTML += `
        <div class="rowtodo" onclick="repairin(${i},${element.id})">
         <div><input type="checkbox" class="checkbox" ${element.checked ? "checked" : ""} onclick="check(${i},${index},${element.id}, this)"></div>
         <div>${element.name}</div>
        </div>`;
    });
}
function repairin(i, id) {
    let index = arr[0].board[i].status.findIndex(element => element.name == "inprogress");
    let index2 = arr[0].board[i].status[index].list.findIndex(element => element.id == id);
    inputboard.innerHTML = arr[0].board[i].name;
    textscript.value = arr[0].board[i].status[index].list[index2].name;
    statuss.innerHTML = "";
    arr[0].board[i].status.forEach(status => {
        statuss.innerHTML += `<option value="${status.name}" ${status.name === "inprogress" ? "selected" : ""} style="display: none;">${status.name}</option>`;
    });
    addboard(i, "inprogress");
    inputbox.value = "inprogress";
    inputbox.onchange = function () {
        addboard(i, inputbox.value);
    }
    script.style.display = "block";
    document.body.classList.add("dark-overlay");
    repairvalue(i, index2, index);
    repairelement(i, index2, index);
    createlabelblock(i, index, index2);
    labelbtn.onclick = function () {
        renderlable(i, index, index2);
        createtitle.style.display = "block";
    }
    date(i, index, index2);
}
cancelanother.onclick = function () {
    fotteranother.style.display = "block";
    moreanother.style.display = "none";
}
function pushanother(i) {
    let inputvaluetanother = inputanother.value;
    if (!inputvaluetanother) return;
    arr[0].board[i].status.push({
        id: Math.floor(Math.random() * 1000) + 1,
        name: inputvaluetanother,
        list: [],
        check: false,
    });
    inputanother.value = "";
    save();
}

function renderstatus(i) {
    const customStatusContainer = document.getElementById("status-columns");
    customStatusContainer.innerHTML = "";

    arr[0].board[i].status.forEach((status, statusIndex) => {
        if (status.name !== "todo" && status.name !== "inprogress") {
            const statusId = status.id;
            const taskList = status.list;

            const column = document.createElement('div');
            column.className = "task-column";
            column.innerHTML = `
                <div class="task-header">
                    <div class="task-title">${status.name}</div>
                    <div class="task-icons">
                        <div><i class="fa-solid fa-arrow-right"></i><i class="fa-solid fa-arrow-left"></i></div>
                        <div><i class="fa-solid fa-ellipsis"></i></div>
                    </div>
                </div>
                <div class="task-body"></div>
                <div class="task-input-area">
                    <input type="text" class="task-input">
                    <div>
                        <button class="save-button" onclick="savecolum(${i},${statusId})">save</button>
                        <button class="cancel-button" onclick="closeTaskInput()">x</button>
                    </div>
                </div>
                <div class="task-footer">
                    <div class="add-card-button" onclick="repairanother(${statusId})">+ Add a card</div>
                    <div onclick="deletestatus(${i},${statusId})"><i class="fa-solid fa-credit-card"></i></div>
                </div>
            `;
            const taskBody = column.querySelector('.task-body');
            taskBody.innerHTML = "";

            taskList.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = 'rowanother';
                taskItem.innerHTML = `
                    <div><input type="checkbox" class="checkbox"></div>
                    <div>${task.name}</div>
                `;
                taskItem.onclick = () => repaircustom(i, statusId, task.id);
                taskBody.appendChild(taskItem);
            });

            customStatusContainer.appendChild(column);
        }
    });
}


function repairanother(id) {
    const allColumns = document.querySelectorAll('.task-column');

    const boardIndex = arr[0].board.findIndex(board =>
        board.status.some(status => status.id === id)
    );
    if (boardIndex === -1) return;

    const statusList = arr[0].board[boardIndex].status;
    let statusIndex = statusList.findIndex(status => status.id === id);
    if (statusIndex === -1 || statusIndex < 2) return;

    statusIndex = statusIndex - 2;
    allColumns.forEach((column, index) => {
        const inputArea = column.querySelector('.task-input-area');
        if (index === statusIndex) {
            setTimeout(() => {
                inputArea.style.display = 'block';
            }, 100);
            inputArea.querySelector('.task-input').focus();
        } else {
            inputArea.style.display = 'none';
        }
    });
}
function closeTaskInput() {
    const allInputs = document.querySelectorAll('.task-input-area');
    allInputs.forEach(input => {
        input.style.display = 'none';
    });
}
function deletestatus(i, id) {
    Swal.fire({
        title: 'Bạn có chắc chắn muốn xoá?',
        text: "Cột và tất cả công việc trong đó sẽ bị xoá vĩnh viễn.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Xoá',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            arr[0].board[i].status = arr[0].board[i].status.filter(status => status.id !== id);
            save();
            renderboard(arr[0].board[i].id);
            Swal.fire(
                'Đã xoá!',
                'Cột đã được xoá khỏi bảng.',
                'success'
            );
        }
    });
}
function savecolum(i, id) {
    const statusIndex = arr[0].board[i].status.findIndex(status => status.id === id);
    if (statusIndex === -1) return;
    const allColumns = document.querySelectorAll('.task-column');
    const column = allColumns[statusIndex - 2];
    const input = column.querySelector('.task-input');
    const value = input.value.trim();
    if (!value) return;
    arr[0].board[i].status[statusIndex].list.push({
        id: Math.floor(Math.random() * 1000) + 1,
        name: value,
        status: arr[0].board[i].status[statusIndex].name,
        title: [],
    });

    input.value = "";
    input.blur();
    save();
    renderSingleColumn(i, id);
    closeTaskInput();
}
function renderSingleColumn(i, id) {
    const statusIndex = arr[0].board[i].status.findIndex(status => status.id === id);
    const status = arr[0].board[i].status[statusIndex];

    const allColumns = document.querySelectorAll('.task-column');
    const column = allColumns[statusIndex - 2];
    const taskBody = column.querySelector('.task-body');
    taskBody.innerHTML = "";
    status.list.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'rowanother';
        taskItem.innerHTML = `
             <div><input type="checkbox" class="checkbox" ${task.checked ? "checked" : ""} onclick="check(${i},${statusIndex},${task.id}, this)"></div>
             <div>${task.name}</div>
        `;
        taskItem.onclick = () => repaircustom(i, id, task.id);
        taskBody.appendChild(taskItem);
    });
}
function repaircustom(i, statusId, taskId) {
    let statusIndex = arr[0].board[i].status.findIndex(status => status.id === statusId);
    if (statusIndex === -1) return;

    let taskIndex = arr[0].board[i].status[statusIndex].list.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;

    inputboard.innerHTML = arr[0].board[i].name;
    textscript.value = arr[0].board[i].status[statusIndex].list[taskIndex].name;

    statuss.innerHTML = "";
    arr[0].board[i].status.forEach(status => {
        statuss.innerHTML += `<option value="${status.name}" ${status.name === arr[0].board[i].status[statusIndex].name ? "selected" : ""} style="display: none;">${status.name}</option>`;
    });

    addboard(i, arr[0].board[i].status[statusIndex].name);
    inputbox.value = arr[0].board[i].status[statusIndex].name;
    inputbox.onchange = function () {
        addboard(i, inputbox.value);
    }

    script.style.display = "block";
    document.body.classList.add("dark-overlay");
    const statusSelect = document.getElementById("input-box");
    statusSelect.innerHTML = "";

    arr[0].board[i].status.forEach(status => {
        statusSelect.innerHTML += `
        <option value="${status.name}" ${status.name === arr[0].board[i].status[statusIndex].name ? "selected" : ""}>
            ${status.name}
        </option>`;
    });
    statusSelect.onchange = function () {
        addboard(i, statusSelect.value);
    };
    repairelementUniversal(i, statusIndex, taskIndex);
    repairCustomValue(i, taskId, statusId);
    createlabelblock(i, statusIndex, taskIndex);
    labelbtn.onclick = function () {
        renderlable(i, statusIndex, taskIndex);
        createtitle.style.display = "block";
    };
    date(i, statusIndex, taskIndex);
}
function check(i, statusIndex, taskId, checkbox) {
    const taskList = arr[0].board[i].status[statusIndex].list;
    const task = taskList.find(task => task.id === taskId);
    if (task) {
        task.checked = checkbox.checked;
        save();
    }
}
function repairvalue(i, id, index) {
    savebutton.onclick = function () {
        let text = textscript.value;
        arr[0].board[i].status[index].list[id].name = text;
        renderinprogress(i);
        script.style.display = "none";
        document.body.classList.remove("dark-overlay");
        save();
    };
    deletelist.onclick = function () {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xoá công việc này?',
            text: "Công việc sẽ bị xoá vĩnh viễn.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                arr[0].board[i].status[index].list.splice(id, 1);
                save();
                script.style.display = "none";
                document.body.classList.remove("dark-overlay");
                renderinprogress(i);

                Swal.fire(
                    'Đã xoá!',
                    'Công việc đã được xoá.',
                    'success'
                );
            }
        });
    };
}
function repairtodovalue(i, id, index) {
    savebutton.onclick = function () {
        let text = textscript.value;
        arr[0].board[i].status[index].list[id].name = text;
        rendertodo(i);
        script.style.display = "none";
        document.body.classList.remove("dark-overlay");
        save();
    };
    deletelist.onclick = function () {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xoá công việc này?',
            text: "Công việc sẽ bị xoá vĩnh viễn.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                arr[0].board[i].status[index].list.splice(id, 1);
                save();
                script.style.display = "none";
                document.body.classList.remove("dark-overlay");
                rendertodo(i);

                Swal.fire(
                    'Đã xoá!',
                    'Công việc đã được xoá.',
                    'success'
                );
            }
        });
    };
}

function repairCustomValue(i, taskId, statusId) {
    savebutton.onclick = function () {
        let statusIndex = arr[0].board[i].status.findIndex(status => status.id === statusId);
        if (statusIndex === -1) return;

        let taskIndex = arr[0].board[i].status[statusIndex].list.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return;

        let text = textscript.value;
        arr[0].board[i].status[statusIndex].list[taskIndex].name = text;
        renderSingleColumn(i, statusId);
        script.style.display = "none";
        document.body.classList.remove("dark-overlay");
        save();
    };
    deletelist.onclick = function () {
        let statusIndex = arr[0].board[i].status.findIndex(status => status.id === statusId);
        if (statusIndex === -1) return;
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xoá?',
            text: "Cột và tất cả công việc trong đó sẽ bị xoá vĩnh viễn.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                arr[0].board[i].status[statusIndex].list = arr[0].board[i].status[statusIndex].list.filter(status => status.id !== taskId);
                save();
                script.style.display = "none";
                document.body.classList.remove("dark-overlay");
                renderSingleColumn(i, statusId);
                Swal.fire(
                    'Đã xoá!',
                    'Công việc đã được xoá.',
                    'success'
                );
            }
        });
    };
}
function exit() {
    Swal.fire({
        title: 'Bạn có chắc chắn muốn thoát?',
        text: "Bạn sẽ thoát khỏi trang board hiện tại!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Thoát',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "/project-root/pages/load.html";
        }
    });
}
function repairelement(i, id, index) {
    more1.onclick = function () {
        let textvalue = inputbox.value;
        let position1 = position.value;
        let index2 = arr[0].board[i].status.findIndex(element => element.name == textvalue);
        const temparr = arr[0].board[i].status[index].list[id];
        arr[0].board[i].status[index].list.splice(id, 1);
        arr[0].board[i].status[index2].list.splice(position1, 0, temparr);
        save();
        rendertodo(i);
        renderinprogress(i);
        movecard.style.display = "none";
        script.style.display = "none";
        document.body.classList.remove("dark-overlay");
    }
}
function repairelementUniversal(boardIndex, fromStatusIndex, taskIndex) {
    more1.onclick = function () {
        let targetStatusName = inputbox.value;
        let targetPosition = parseInt(position.value);
        let toStatusIndex = arr[0].board[boardIndex].status.findIndex(status => status.name === targetStatusName);
        if (toStatusIndex === -1) return;
        const task = arr[0].board[boardIndex].status[fromStatusIndex].list[taskIndex];
        arr[0].board[boardIndex].status[fromStatusIndex].list.splice(taskIndex, 1);
        const listTarget = arr[0].board[boardIndex].status[toStatusIndex].list;
        const newPosition = Math.min(targetPosition, listTarget.length);
        listTarget.splice(newPosition, 0, task);
        save();
        renderboard(arr[0].board[boardIndex].id);
        movecard.style.display = "none";
        script.style.display = "none";
        document.body.classList.remove("dark-overlay");
    }
}

function createlabelblock(i, id, index) {
    createtitlebtn.onclick = function () {
        createlabel.style.display = "block";
        renderlable(i, id, index);
        textcreatelable.value = "";
        btncreate.onclick = function () {
            arr[0].board[i].status[id].list[index].title.push({
                color: colorcheck,
                name: textcreatelable.value,
            });
            save();
            createlabel.style.display = "none";
            renderlable(i, id, index);
        }
    }
}
function selectColor(index, color1) {
    pastelColors.forEach((_, i) => {
        document.getElementById(`check-${i}`).style.display = "none";
    });
    document.getElementById(`check-${index}`).style.display = "block";
    selectedIndex = index;
    colorcheck = color1;
}
function renderlable(i, id, index) {
    addlable.innerHTML = "";
    arr[0].board[i].status[id].list[index].title.forEach((element, j) => {
        addlable.innerHTML += `
            <div class="label-row">
                <input type="checkbox" class="label-checkbox">
                <div class="label-tag" style="background-color: ${element.color}">${element.name}</div>
                <i class="fa-solid fa-pen-to-square label-edit" onclick="editLabel(${i}, ${id}, ${index}, ${j})"></i>
            </div>
        `;
    });
}

function exitcreate() {
    createtitle.style.display = "none";
}
function editLabel(i, id, index, j) {
    editlable.style.display = "block";
    textcreatelable2.value = arr[0].board[i].status[id].list[index].title[j].name;
    const currentColor = arr[0].board[i].status[id].list[index].title[j].color;
    addcolor2(currentColor);
    btnsave.onclick = function () {
        arr[0].board[i].status[id].list[index].title[j] = {
            name: textcreatelable2.value,
            color: colorcheck,
        };
        save();
        editlable.style.display = "none";
        renderlable(i, id, index);
    };
    btndelete.onclick = function () {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xoá?',
            text: "sự việc trong đó sẽ bị xoá vĩnh viễn.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                arr[0].board[i].status[id].list[index].title.splice(j, 1);
                save();
                editlable.style.display = "none";
                renderlable(i, id, index);
                Swal.fire(
                    'Đã xoá!',
                    'Công việc đã được xoá.',
                    'success'
                );
            }
        });
    };

}
function addcolor2(selectedColor) {
    color2.innerHTML = "";
    pastelColors.forEach((colorCode, index) => {
        const isSelected = colorCode === selectedColor;
        color2.innerHTML += `
            <div class="size-color" 
                 style="background-color:${colorCode}" 
                 onclick="selectColor2(${index}, '${colorCode}')" 
                 id="color2-${index}">
                <span class="checkmark" id="check2-${index}" style="display: ${isSelected ? 'block' : 'none'};">✓</span>
            </div>
        `;
        if (isSelected) {
            selectedIndex = index;
            colorcheck = colorCode;
        }
    });
}
function selectColor2(index, color1) {
    pastelColors.forEach((_, i) => {
        const checkEl = document.getElementById(`check2-${i}`);
        if (checkEl) checkEl.style.display = "none";
    });
    const selectedCheck = document.getElementById(`check2-${index}`);
    if (selectedCheck) selectedCheck.style.display = "block";

    selectedIndex = index;
    colorcheck = color1;
}
function date(i, id, index) {
    datebtn.onclick = function () {
        document.getElementById("date-container").style.display = "block";
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
        const task = arr[0].board[i].status[id].list[index];
        if (task.startdate) {
            checkstartdate.checked = true;
            startdate.disabled = false;
            startdate.value = task.startdate;
        } else {
            checkstartdate.checked = false;
            startdate.disabled = true;
        }
        if (task.duedate || task.endtime) {
            checkduedate.checked = true;
            duedate.disabled = false;
            endtime.disabled = false;
            duedate.value = task.duedate || "";
            endtime.value = task.endtime || "";
        } else {
            checkduedate.checked = false;
            duedate.disabled = true;
            endtime.disabled = true;
        }
        checkstartdate.onclick = function () {
            const checked = checkstartdate.checked;
            startdate.disabled = !checked;
            if (checked && !task.startdate) {
                task.startdate = formattedDate;
                startdate.value = formattedDate;
            }
        };
        checkduedate.onclick = function () {
            const checked = checkduedate.checked;
            duedate.disabled = !checked;
            endtime.disabled = !checked;
        };
        const savedate = document.getElementById("savedate");
        savedate.onclick = function () {
            task.startdate = checkstartdate.checked ? startdate.value : "";
            task.duedate = checkduedate.checked ? duedate.value : "";
            task.endtime = checkduedate.checked ? endtime.value : "";
            save();
            document.getElementById("date-container").style.display = "none";
        };
    };
    const removedate = document.getElementById("removedate");
    removedate.onclick = function () {
        checkstartdate.checked = false;
        checkduedate.checked = false;
        startdate.disabled = true;
        duedate.disabled = true;
        endtime.disabled = true;
        startdate.value = "";
        duedate.value = "";
        endtime.value = "";
        task.startdate = "";
        task.duedate = "";
        task.endtime = "";
        save();
        document.getElementById("date-container").style.display = "none";
    };
}
function closeedit() {
    editlable.style.display = "none";
}
function closedate() {
    document.getElementById("date-container").style.display = "none";
}
