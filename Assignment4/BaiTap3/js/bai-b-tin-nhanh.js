/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document
  .querySelector("#searchbar form")
  .addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
const oTimKiem = document.getElementById("o-tim-kiem");
const danhSachTin = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

function capNhatBoDem() {
  const cacTin = danhSachTin.querySelectorAll("li");
  const soTinHien = danhSachTin.querySelectorAll("li:not(.an)").length;
  boDem.textContent = `Đang hiển thị ${soTinHien}/${cacTin.length} tin`;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
  const tuKhoa = oTimKiem.value;
  const tuKhoaThuong = tuKhoa.toLowerCase();
  let soTinHien = 0;

  for (const tin of danhSachTin.querySelectorAll("li")) {
    const tieuDe = tin.querySelector("h3").textContent;
    const noiDung = tin.querySelector("p").textContent;
    const khop = (tieuDe + " " + noiDung).toLowerCase().includes(tuKhoaThuong);
    if (khop) {
      soTinHien++;
      tin.classList.remove("an");
    } else {
      tin.classList.add("an");
    }
  }

  khongThay.classList.toggle("an", soTinHien !== 0);
  if (soTinHien === 0) {
    khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
  }
  capNhatBoDem();
}

oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
danhSachTin.addEventListener("click", (e) => {
  if (!e.target.matches("button.more")) {
    return;
  }

  const tin = e.target.closest("li");
  const doan = tin.querySelector("p");
  const dangMo = doan.classList.toggle("day-du");
  e.target.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
  const tieuDe = oTieuDe.value;
  const noiDung = oNoiDung.value;

  if (tieuDe === "" || noiDung === "") {
    baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
    return;
  }

  const tinMoi = document.createElement("li");
  const thoiGian = document.createElement("span");
  const tieuDeMoi = document.createElement("h3");
  const noiDungMoi = document.createElement("p");
  const nutMoRong = document.createElement("button");

  thoiGian.className = "time";
  thoiGian.textContent = homNay();
  tieuDeMoi.textContent = tieuDe;
  noiDungMoi.textContent = noiDung;
  nutMoRong.type = "button";
  nutMoRong.className = "more";
  nutMoRong.textContent = "Read more >>";

  tinMoi.append(thoiGian, tieuDeMoi, noiDungMoi, nutMoRong);
  danhSachTin.prepend(tinMoi);

  oTieuDe.value = "";
  oNoiDung.value = "";
  baoLoi.textContent = "";
  locTin();
});

locTin();
