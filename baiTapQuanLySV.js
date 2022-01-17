var dssv = [];
var LOCALSTORAGE_DSSV = "dssvLocalStorage";
function kiemTraMaSv(newSV, arrSV) {
  var maNewSV = newSV.ma;
  for (var index = 0; index < arrSV.length; index++) {
    var currentSV = arrSV[index];
    if (currentSV.ma == maNewSV) {
      return false;
    }
  }

  return true;
}

function renderTableSV(dssv) {
  var contentHML = "";

  for (let index = 0; index < dssv.length; index++) {
    const sv = dssv[index];
    contentHML += `
          <tr>
              <td>${sv.ma}</td>
              <td>${sv.ten}</td>
              <td>${sv.email}</td>
              <td>${sv.ngaySinh}</td>
              <td>${sv.khoaHoc}</td>
              <td>${sv.tinhTDB()}</td>
              <td>
                  <button class="btn btn-success" onclick="suaSV('${
                    sv.ma
                  }')" >Sửa</button>
                  <button class="btn btn-danger"  onClick="xoaSV('${
                    sv.ma
                  }')">Xoá</button>
              </td>
              
           </tr>
          `;
  }

  document.getElementById("tbodySinhVien").innerHTML = contentHML;
}

function luuLocalStorage(arr) {
  var dssvJson = JSON.stringify(arr);

  localStorage.setItem(LOCALSTORAGE_DSSV, dssvJson);
}

function layThongTinSv() {
  var maSvValue = document.getElementById("txtMaSV").value;
  var tenSvValue = document.getElementById("txtTenSV").value;
  var emailSvValue = document.getElementById("txtEmail").value;
  var matKhauSvValue = document.getElementById("txtPass").value;
  var ngaySinhSvValue = document.getElementById("txtNgaySinh").value;
  var khoaHocSvValue = document.getElementById("khSV").value;
  var diemToanValue = document.getElementById("txtDiemToan").value * 1;
  var diemHoaValue = document.getElementById("txtDiemLy").value * 1;
  var diemDiemLyValue = document.getElementById("txtDiemHoa").value * 1;

  var sinhVien = new SinhVien(
    maSvValue,
    tenSvValue,
    emailSvValue,
    matKhauSvValue,
    ngaySinhSvValue,
    khoaHocSvValue,
    diemToanValue,
    diemDiemLyValue,
    diemHoaValue
  );

  return sinhVien;
}

function themSV() {
  var sinhVien = layThongTinSv();
  let checkMaSV = kiemTraMaSv(sinhVien, dssv);

  if (checkMaSV) {
    dssv.push(sinhVien);

    // var dssvJson = JSON.stringify(dssv);

    // localStorage.setItem(LOCALSTORAGE_DSSV, dssvJson);
    luuLocalStorage(dssv);
  }

  renderTableSV(dssv);
}

function timViTri(maSV, arr) {
  console.log(maSV, arr);
  var viTri = -1;

  for (let index = 0; index < arr.length; index++) {
    const sv = arr[index];
    if (sv.ma.toString() === maSV.toString()) {
      viTri = index;
    }
  }
  return viTri;
}

function suaSV(maSV) {
  console.log(maSV);
  var viTri = timViTri(maSV, dssv);
  if (viTri !== -1) {
    console.log(dssv[viTri]);

    var currentSv = dssv[viTri];

    document.getElementById("txtMaSV").value = currentSv.ma;

    document.getElementById("txtMaSV").disabled = true;

    document.getElementById("txtTenSV").value = currentSv.ten;
    document.getElementById("txtEmail").value = currentSv.email;
    document.getElementById("txtPass").value = currentSv.matkhau;
    document.getElementById("txtNgaySinh").value = currentSv.ngaySinh;
    document.getElementById("khSV").value = currentSv.khoaHoc;
    document.getElementById("txtDiemToan").value = currentSv.toan;
    document.getElementById("txtDiemLy").value = currentSv.ly;
    document.getElementById("txtDiemHoa").value = currentSv.hoa;
  }
}

function capNhatSV() {
  var sinhVien = layThongTinSv();
  var viTri = timViTri(sinhVien.ma, dssv);
  console.log(viTri);
  if (viTri !== -1) {
    dssv[viTri] = sinhVien;

    renderTableSV(dssv);
    luuLocalStorage(dssv);
  }
}

function xoaSV(maSV) {
  var viTri = timViTri(maSV, dssv);
  if (viTri !== -1) {
    dssv.splice(viTri, 1);
    console.log(dssv);
    renderTableSV(dssv);
    luuLocalStorage(dssv);
  }
}

var dssvJson = localStorage.getItem(LOCALSTORAGE_DSSV);

var newDssv = JSON.parse(dssvJson);
if (newDssv) {
  var dssv = newDssv.map(function (item) {
    return new SinhVien(
      item.ma,
      item.ten,
      item.email,
      item.matKhau,
      item.ngaySinh,
      item.khoaHoc,
      item.toan,
      item.ly,
      item.hoa
    );
  });
  renderTableSV(dssv);
}
