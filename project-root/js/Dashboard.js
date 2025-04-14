let add = document.getElementById("body1");
let arr = JSON.parse(localStorage.getItem("arrlist"));
let addlist = document.getElementById("up");
let addlist2 = document.getElementById("up2");
let list = document.getElementById("list");
let close = document.getElementById("close");
let sign = document.getElementById("sign-out");
let createboardbtn = document.getElementById("btn");
let createboard = document.getElementById("createboard");
let repairboard = document.getElementById("repairboard");
let x = document.getElementById("x");
let x2 = document.getElementById("x2");
let closeboard = document.getElementById("closeboard");
let deleteboard = document.getElementById("closeboard2");
let saveboard = document.getElementById("saveboard");
let saveboard2 = document.getElementById("saveboard2");
let background = document.getElementById("background");
let background2 = document.getElementById("background2");
let share = document.getElementById("share");
let colorboard = document.getElementById("color");
let colorboard2 = document.getElementById("color2");
let input = document.getElementById("text2");
let input2 = document.getElementById("text");
let boardbtn = document.getElementById("boardbtn");
let colortitle;
let background3;
let arr2 = JSON.parse(localStorage.getItem("list2")) || [{ id: 1, img: "https://cdn-media.sforum.vn/storage/app/media/ctv_seo3/mau-background-dep-12.jpg", name: "Important Board 01" }, { id: 2, img: "https://cdn-media.sforum.vn/storage/app/media/ctv_seo3/mau-background-dep-5.jpg", name: "Important Board 02" }];
let color = ["red", "green", "Yellow", "Grey", "Orange", "Maroon"];
let arr3 = [{ id: 1, img: "https://cdn-media.sforum.vn/storage/app/media/ctv_seo3/mau-background-dep-12.jpg", name: "Important Board 01" },{ id: 2, img: "/project-root/addset/img/pexels-pixabay-33109.jpg", name: "Board Title 02" }, { id: 3, img: "/project-root/addset/img/pexels-pixabay-414144.jpg", name: "Board Title 03" }, { id: 4, img: "/project-root/addset/img/pexels-eberhardgross-443446.jpg", name: "Board Title 04" }];
function renderList() {
    addlist.innerHTML = "";
    arr[0].board.forEach(element => {
        if (!element.img) {
            addlist.innerHTML = "";
        } else {
            addlist.innerHTML += `
        <div class="img2"  onclick="repair(${element.id})">
         <div class="boderimg"><img src="${element.img}"></div>
         <div class="titleimg" id="titletext" style="color:${element.color}">${element.name}</div>
        </div>
        `
        }
    });
};
renderList();
let colortitle2 = document.getElementById("titletext");
function renderList2() {
    addlist2.innerHTML = "";
    arr2.forEach(element => {
        addlist2.innerHTML += `
        <div class="img2" onclick="savebackground4('${element.img}')">
         <div><img src="${element.img}"></div>
         <div class="titleimg">${element.name}</div>
        </div>  `
    });
};
renderList2();
list.onclick = function () {
    document.getElementById("head").style.display = "block";
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
};
close.onclick = function () {
    document.getElementById("head").style.display = "none";
    document.body.style.backgroundColor = "";
};
sign.onclick = function () {
    window.location.href = "../log-in.html";
};
createboardbtn.onclick = function () {
    createboard.style.display = "block";
    createboard.style.borderRadius = "3px";
    document.body.classList.add("dark-overlay");
    background.innerHTML = "";
    colorboard.innerHTML = "";
    arr3.forEach(element => {
        background.innerHTML += `<div class="background-img" onclick="savebackground('${element.img}')">
         <img src="${element.img}" >
         <div class="background-icon"><i class="fa-solid fa-circle-check"></i></div>
        </div>`
    });
    color.forEach(element => {
        colorboard.innerHTML += `<div class="background-img2" style="background-color:${element}" onclick="savecolor('${element}')">
         <div class="background-icon2"><i class="fa-solid fa-circle-check"></i></div>
        </div>`
    });

};
x.onclick = function () {
    document.body.classList.remove("dark-overlay");
    createboard.style.display = "none";
};
closeboard.onclick = function () {
    document.body.classList.remove("dark-overlay");
    createboard.style.display = "none";
};
share.onclick = function () {
    navigator.share({
        url: 'http://127.0.0.1:5500/project-root/pages/Dashboard.html'
    });
};
function savebackground(id) {
    background3 = id;
    let index = arr3.filter(element => element.img == id);
    background.innerHTML = "";
    index.forEach(element => {
        background.innerHTML = `<div class="background-img" onclick="savebackground('${element.img}')">
         <img src="${element.img}" >
         <div class="background-icon"><i class="fa-solid fa-circle-check"></i></div>
        </div>`
    });

};
function savebackground2(id) {
    background3 = id;
    let index = arr3.filter(element => element.img == id);
    background2.innerHTML = "";
    index.forEach(element => {
        background2.innerHTML = `<div class="background-img" onclick="savebackground2('${element.img}')">
         <img src="${element.img}" >
         <div class="background-icon"><i class="fa-solid fa-circle-check"></i></div>
        </div>`
    });

};
function savecolor(id) {
    colortitle = id;
    let index = color.filter(element => element == id);
    colorboard.innerHTML = "";
    index.forEach(element => {
        colorboard.innerHTML = `<div class="background-img2" style="background-color:${element}" onclick="savecolor('${element}')">
         <div class="background-icon2"><i class="fa-solid fa-circle-check"></i></div>
        </div>`;
    });
};
function savecolor2(id) {
    colortitle = id;
    let index = color.filter(element => element == id);
    colorboard2.innerHTML = "";
    index.forEach(element => {
        colorboard2.innerHTML = `<div class="background-img2" style="background-color:${element}" onclick="savecolor('${element}')">
         <div class="background-icon2"><i class="fa-solid fa-circle-check"></i></div>
        </div>`;
    });
};
let boardToDeleteId = null;

function openDeleteModal(id) {
    boardToDeleteId = id;
    document.getElementById('deleteConfirmModal').style.display = 'flex';
}

function closeDeleteModal() {
    document.getElementById('deleteConfirmModal').style.display = 'none';
    boardToDeleteId = null;
}

function confirmDelete() {
    if (boardToDeleteId !== null) {
        if (!arr || !arr[0] || !arr[0].board) {
            return;
        }
        const boardIndex = arr[0].board.findIndex(element => element.id === boardToDeleteId);
        if (boardIndex !== -1) {
            arr[0].board.splice(boardIndex, 1);
            renderList();  
            repairboard.style.display = "none";
            document.body.classList.remove("dark-overlay");
            save();  
        } 
        closeDeleteModal();
    }
}

function repair(id) {
    repairboard.style.display = "block";
    document.body.classList.add("dark-overlay");
    let selectedBoard = arr[0].board.find(element => element.id === id);
    if (!selectedBoard) return;
    background2.innerHTML = "";
    arr3.forEach(element => {
        background2.innerHTML += `<div class="background-img" onclick="savebackground2('${element.img}')">
            <img src="${element.img}">
            <div class="background-icon"><i class="fa-solid fa-circle-check"></i></div>
        </div>`;
    });

    colorboard2.innerHTML = "";
    color.forEach(element => {
        colorboard2.innerHTML += `<div class="background-img2" style="background-color:${element}" onclick="savecolor2('${element}')">
            <div class="background-icon2"><i class="fa-solid fa-circle-check"></i></div>
        </div>`;
    });

    if (input) {
        input.value = selectedBoard.name;
    }

    deleteboard.onclick = function () {
        openDeleteModal(id);  
    };
    saveboard2.onclick = function () {
        let index = arr[0].board.findIndex(element => element.id === id);
    
        if (!input.value || !background3 || !colortitle) {
            Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin!',
                text: 'Vui lòng nhập tiêu đề, chọn nền và màu tiêu đề.',
                confirmButtonText: 'OK'
            });
            return;
        }
    
        if (index !== -1) {
            arr[0].board[index].img = background3;
            arr[0].board[index].name = input.value;
            arr[0].board[index].color = colortitle;
            renderList();
            input.value="";
            document.body.classList.remove("dark-overlay");
            repairboard.style.display = "none";
            save();  
        }
    };
}

x2.onclick = function () {
    document.body.classList.remove("dark-overlay");
    repairboard.style.display = "none";
};
saveboard.onclick = function () {
    const newId = arr[0].board.length > 0 ? Math.max(...arr[0].board.map(board => board.id)) + 1 : 1;
    let inputvalue = input2.value;

    if (!inputvalue || !background3 || !colortitle) {
        Swal.fire({
            icon: 'warning',
            title: 'Thiếu thông tin!',
            text: 'Vui lòng nhập tiêu đề, chọn nền và màu tiêu đề.',
            confirmButtonText: 'OK'
        });
        return;
    }

    arr[0].board.push({
        id: newId,
        img: background3,
        name: inputvalue,
        color: colortitle,
    });

    renderList();  
    save();
    input2.value=""; 
    document.body.classList.remove("dark-overlay");
    createboard.style.display = "none";
};
boardbtn.onclick = function () {
    window.location.href = "/project-root/pages/board.html";
}
function save() {
    localStorage.setItem('arrlist', JSON.stringify(arr));
};
function save2() {
    localStorage.setItem('list2', JSON.stringify(arr2));
};
function savebackground4(img){
    createboard.style.display = "block";
    createboard.style.borderRadius = "3px";
    document.body.classList.add("dark-overlay");
    background.innerHTML = `<div class="background-img">
         <img src="${img}" >
         <div class="background-icon"><i class="fa-solid fa-circle-check"></i></div>
        </div>`;
        background3=img;
    colorboard.innerHTML = "";
    color.forEach(element => {
        colorboard.innerHTML += `<div class="background-img2" style="background-color:${element}" onclick="savecolor('${element}')">
         <div class="background-icon2"><i class="fa-solid fa-circle-check"></i></div>
        </div>`
    });
}