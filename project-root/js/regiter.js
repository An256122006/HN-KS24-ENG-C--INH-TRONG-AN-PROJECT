let btn = document.getElementById('btn');
let emailvalue = document.getElementById("email");
let username = document.getElementById("username");
let pass = document.getElementById("password");
let div = document.getElementById("head");

let arr = JSON.parse(localStorage.getItem('arrlist')) || [];

btn.onclick = function () {
    let emails = emailvalue.value.trim();
    let names = username.value.trim();
    let passvalue = pass.value;
    if (!names && !passvalue && !emails) {
        showError("dữ liệu không được để trống");
        clearInputs();
        return;
    }
    if (!names && !passvalue) {
        showError("Họ tên và mật khẩu không được để trống ");
        clearInputs();
        return;
    }
    if (!names) {
        showError("Họ và tên không được để trống");
        clearInputs();
        return;
    }

    if (!emails) {
        showError("Email không được để trống");
        clearInputs();
        return;
    } else if (!validateEmail(emails)) {
        showError("Email không đúng định dạng");
        clearInputs();
        return;
    }

    if (!passvalue) {
        showError("Mật khẩu không được để trống");
        clearInputs();
        return;
    }

    if (passvalue.length < 8) {
        showError("Mật khẩu phải có ít nhất 8 ký tự");
        clearInputs();
        return;
    }

    let index = arr.findIndex(element => element.email === emails);
    if (index !== -1) {
        showError("Email đã tồn tại");
        clearInputs();
        return;
    }
    if (!validatePassword(passvalue)) {
        showError("Mật khẩu phải bắt đầu bằng chữ in hoa");
        clearInputs();
        return;
    }
    if (!validatePassword2(passvalue)) {
        showError("Mật khẩu phải chua 1 ky tu");
        clearInputs();
        return;
    }

    arr.push({
        id: arr.length + 1,
        email: emails,
        password: passvalue,
        name: names,
        board: []
    });

    div.innerHTML = `
        <div class="row2">✅ Đăng ký thành công</div>`;

    save();
    setTimeout(() => {
        window.location.href = "../log-in.html";
    }, 1000);
};

function showError(message) {
    div.style.display = "flex";
    div.innerHTML = `
        <div class="error">
            <div class="row1">
                <div><i>⛔</i>error</div>
                <button onclick="closeError()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div>${message}</div>
        </div>`;
}

function save() {
    localStorage.setItem('arrlist', JSON.stringify(arr));
}

function clearInputs() {
    emailvalue.value = "";
    pass.value = "";
    username.value = "";
}

function closeError() {
    div.style.display = "none";
}

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function validatePassword(pass) {
    const u = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return u.includes(pass[0]);
}
function validatePassword2(pass) {
    const u = [
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
        '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|',
        ';', ':', '\'', '"', ',', '.', '<', '>', '/', '?',
        '`', '~'
    ];
    for (let i = 0; i < u.length; i++) {
        if (pass.includes(u[i])) {
            return true;
        }
    }
    return false;
}