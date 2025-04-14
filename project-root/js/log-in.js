let btn = document.getElementById('btn');
let emailvalue = document.getElementById("email");
let pass = document.getElementById("password");
let div = document.getElementById("head");
let check = document.getElementById("checkbox");
let arr = JSON.parse(localStorage.getItem('arrlist')) || [];

if (arr.length > 0 && arr[0].check == "true") {
    emailvalue.value = arr[0].email;
    pass.value = arr[0].password;
    check.checked = true;
} else {
    emailvalue.value = "";
    pass.value = "";
}

btn.onclick = function () {
    let emails = emailvalue.value.trim();
    let passvalue = pass.value.trim();

    let user = arr.find(element => element.email === emails && element.password === passvalue);
    if(!emails && !passvalue){
        showError("email và mật khẩu không được để trống!!!");
        return;
    }
    if(!emails){
        showError("email không được để trống !!!");
        return;
    };
    if(!passvalue){
        showError("Mật khẩu không được để trống !!!");
        return;
    }

    if (!validateEmail(emails)) {
        showError("Email không đúng định dạng");
        clearInputs();
        return;
    }

    if (user) {
        showSuccess("✅ Đăng nhập thành công");

        user.check = check.checked ? "true" : "false";

        arr = arr.filter(element => element.email !== emails);
        arr.unshift(user);

        save();

        setTimeout(() => {
            window.location.href = "./pages/load.html";
        }, 1000);
    } else {
        showError("Tài khoản không tồn tại hoặc mật khẩu sai");
    }
};

function save() {
    localStorage.setItem('arrlist', JSON.stringify(arr));
}

function showError(message) {
    div.style.display = "flex";
    div.innerHTML = `
        <div class="error">
            <div class="row1">
                <div><i>⛔</i> error</div>
                <button onclick="closeError()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div>${message}</div>
        </div>`;
    clearInputs();
}

function showSuccess(message) {
    div.style.display = "flex";
    div.innerHTML = `<div class="row2">${message}</div>`;
    clearInputs();
}

function clearInputs() {
    emailvalue.value = "";
    pass.value = "";
}

function closeError() {
    div.style.display = "none";
}
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}