$(document).ready(function () {
  // Hàm kiểm tra định dạng email
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

  // Hàm kiểm tra mật khẩu (ít nhất 6 ký tự, bao gồm số và ký tự đặc biệt)
  function validatePassword(password) {
    const passwordPattern = /^(?=.*[0-9])(?=.*\W)[A-Za-z\d\W]{6,}$/;
    return passwordPattern.test(password);
  }

  // Kiểm tra Username (không được để trống)
  function validateUsername(username) {
    return username.trim() !== ""; // Kiểm tra không trống và bỏ các khoảng trắng dư thừa
  }

  // Kiểm tra email trùng lặp trong Local Storage
  function isEmailDuplicate(email) {
    const accounts = JSON.parse(localStorage.getItem("ACCOUNT")) || [];
    return accounts.some((account) => account.email === email);
  }

  // Hàm đăng nhập người dùng
  function loginUser(username, email) {
    const user = {
      name: username,
      email: email,
    };
    localStorage.setItem("USER", JSON.stringify(user)); // Lưu người dùng vào localStorage
  }

  // Nếu đang ở trang đăng ký
  if ($("body").hasClass("signUp")) {
    $(".create-button").click(function (e) {
      e.preventDefault(); // Ngăn form không submit ngay lập tức
      let email = $("#email").val();
      let username = $("#name").val();
      let password = $("#password").val();
      let valid = true;

      // Kiểm tra email
      if (email === "" || !validateEmail(email)) {
        $("#email").css("border", "2px solid red");
        valid = false;
      } else if (isEmailDuplicate(email)) {
        $("#email").css("border", "2px solid red");
        alert("Email đã được đăng ký!");
        valid = false;
      } else {
        $("#email").css("border", "");
      }

      // Kiểm tra username
      if (!validateUsername(username)) {
        $("#name").css("border", "2px solid red");
        valid = false;
      } else {
        $("#name").css("border", "");
      }

      // Kiểm tra mật khẩu
      if (!validatePassword(password)) {
        $("#password").css("border", "2px solid red");
        valid = false;
      } else {
        $("#password").css("border", "");
      }
      // Nếu tất cả các trường hợp đều hợp lệ thì lưu vào Local Storage và chuyển hướng
      if (valid) {
        const listAccout = localStorage.getItem("ACCOUT") || [];

        // lay gia tri nguoi dung nhap vao o input
        const email = $("#email").val();
        const name = $("#name").val();
        const password = $("#password").val();
        const data = {
          name: name,
          email: email,
          password: password,
        };

        listAccout.push(data);
        localStorage.setItem("ACCOUNT", JSON.stringify(listAccout));
        window.location.href = "/siginin.html";
      }
    });
  } else {
    $(".create-button").click(function (e) {
      e.preventDefault(); // Ngăn form không submit ngay lập tức
      let email = $("#email").val();
      let password = $("#password").val(); // Thêm trường mật khẩu chính

      const listAccout = localStorage.getItem("ACCOUNT")
        ? JSON.parse(localStorage.getItem("ACCOUNT"))
        : [];

      let valid = true;

      // Kiểm tra email
      if (email === "" || !validateEmail(email)) {
        $("#email").css("border", "2px solid red"); // Đổi viền sang màu đỏ nếu không hợp lệ
        valid = false;
      } else {
        $("#email").css("border", ""); // Trở lại trạng thái bình thường nếu hợp lệ
        valid = true;
      }

      // Kiểm tra mật khẩu
      if (password === "" || !validatePassword(password)) {
        $("#password").css("border", "2px solid red"); // Đổi viền sang màu đỏ nếu không hợp lệ
        valid = false;
      } else {
        $("#password").css("border", ""); // Trở lại trạng thái bình thường nếu hợp lệ
        valid = true;
      }

      const user = listAccout.find((user) => user.email === email);

      if (user) {
        if (user.password === password) {
          valid = true;
        } else {
          $("#password").css("border", "2px solid red"); // Đổi viền sang màu đỏ nếu không hợp lệ
          valid = false;
        }
      } else {
        $("#email").css("border", "2px solid red"); // Đổi viền sang màu đỏ nếu không hợp lệ
        valid = false;
      }

      if (valid) {
        localStorage.setItem("USER", JSON.stringify(user));
        window.location.href = "/contact.html";
      }
    });
  }

  // Kiểm tra xem ô có bị trống không
  function isEmpty(value) {
    return value.trim() === "";
  }

  // Hàm kiểm tra định dạng số điện thoại (kiểm tra cơ bản)
  function validatePhoneNumber(phone) {
    const phonePattern = /^[0-9]{10,15}$/; // Kiểm tra từ 10 đến 15 chữ số
    return phonePattern.test(phone);
  }

  // Xử lý khi nhấn nút Thêm
  $(".contact-form__button button").click(function (e) {
    e.preventDefault(); // Ngăn form không submit ngay lập tức
    if ($("body").hasClass("contact")) {
      // Lấy giá trị của các trường
      const firstName = $("input[placeholder='Enter first name']").val();
      const lastName = $("input[placeholder='Enter last name']").val();
      const email = $("input[placeholder='Enter email']").val();
      const phone = $("input[placeholder='Enter phone number']").val();
      const birthdate = $("input[placeholder='Enter birthdate']").val();
      const gender = $("select").val();

      let valid = true;

      // Kiểm tra từng trường và áp dụng kiểm tra hợp lệ
      if (isEmpty(firstName)) {
        $("input[placeholder='Enter first name']").css(
          "border",
          "2px solid red"
        );
        valid = false;
      } else {
        $("input[placeholder='Enter first name']").css("border", "");
      }

      if (isEmpty(lastName)) {
        $("input[placeholder='Enter last name']").css(
          "border",
          "2px solid red"
        );
        valid = false;
      } else {
        $("input[placeholder='Enter last name']").css("border", "");
      }

      // Kiểm tra email thông qua hàm validateEmail
      if (email === "" || !validateEmail(email)) {
        $("input[placeholder='Enter email']").css("border", "2px solid red");
        valid = false;
      } else {
        $("input[placeholder='Enter email']").css("border", "");
      }

      // Kiểm tra số điện thoại
      if (isEmpty(phone) || !validatePhoneNumber(phone)) {
        $("input[placeholder='Enter phone number']").css(
          "border",
          "2px solid red"
        );
        valid = false;
      } else {
        $("input[placeholder='Enter phone number']").css("border", "");
      }

      if (isEmpty(birthdate)) {
        $("input[placeholder='Enter birthdate']").css(
          "border",
          "2px solid red"
        );
        valid = false;
      } else {
        $("input[placeholder='Enter birthdate']").css("border", "");
      }

      // Nếu tất cả các trường hợp đều hợp lệ, lưu vào localStorage
      if (valid) {
        const contact = {
          id: new Date().getTime(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          birthdate: birthdate,
          gender: gender,
          creatAt: new Date().toISOString(),
        };
        // Lưu vào localStorage
        let contacts = JSON.parse(localStorage.getItem("CONTACTS")) || [];
        contacts.push(contact);
        localStorage.setItem("CONTACTS", JSON.stringify(contacts));

        // Tùy chọn, có thể xóa sạch form sau khi lưu
        $(
          "input[type='text'], input[type='email'], input[type='tel'], input[type='']"
        ).val("");
        $("select").val("male");
        window.location.href = "/listcontact.html";
      }
    }
  });

  // Thêm chức năng logout
  $(".dashboard__logout-button").click(function () {
    // Xóa thông tin người dùng khỏi localStorage (nếu có)
    localStorage.removeItem("");

    // Chuyển hướng về trang đăng nhập hoặc trang chủ sau khi đăng xuất
    window.location.href = "/siginin.html"; // Đảm bảo rằng trang này tồn tại
  });

  // Thêm sự kiện click để chuyển sang trang "Contact" khi nhấn vào nút trong menu
  $(".dashboard__nav-item:contains('Contact')").click(function () {
    window.location.href = "/listcontact.html"; // Chuyển hướng sang trang "Contact"
  });

  $(".content__button").click(function () {
    window.location.href = "/contact.html";
  });
});

$(document).ready(function () {
  // Hàm hiển thị danh sách liên hệ từ LocalStorage
  function renderContacts() {
    // Lấy danh sách liên hệ từ LocalStorage
    let contacts = JSON.parse(localStorage.getItem("CONTACTS")) || [];

    // Chọn phần tử hiển thị danh sách liên hệ
    const contactList = $(".contact-list");
    contactList.empty(); // Xóa danh sách cũ trước khi thêm mới

    // Mảng các ảnh ngẫu nhiên
    const imageArray = [
      "images/Image1.svg",
      "images/Image2.svg",
      "images/Image3.svg",
      "images/Image4.svg",
      "images/Image5.svg",
      "images/Image6.svg",
    ];

    // Lặp qua từng liên hệ và thêm vào phần hiển thị
    contacts.forEach((contact, index) => {
      // Chọn một ảnh ngẫu nhiên từ mảng
      const randomImage =
        imageArray[Math.floor(Math.random() * imageArray.length)];

      const contactCard = `
        <div class="contact-card" data-index="${index}" data-id="${contact.id}" >
          <div class="contact-card__image">
            <img src="${randomImage}" alt="${contact.firstName} ${contact.lastName}" />
          </div>
          <div class="contact-card__info">
            <div class="contact-card__name">${contact.firstName} ${contact.lastName}</div>
            <div class="contactcard__email">${contact.email}</div>
          </div>
          <div class="contact-card__delete">
            <img src="./images/Action.svg" class="delete-contact" data-index="${index}" alt="Delete">
          </div>
        </div>
      `;
      contactList.append(contactCard);
    });

    // Thêm sự kiện xóa liên hệ
    $(".delete-contact").click(function () {
      const index = $(this).data("index");
      deleteContact(index);
    });

    $(".contact-card").click(function () {
      const id = $(this).data("id");
      window.location.href = "/viewdetailscontact.html?id=" + id;
    });
  }

  // Hàm xóa liên hệ
  function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem("CONTACTS")) || [];
    contacts.splice(index, 1); // Xóa liên hệ theo chỉ số
    localStorage.setItem("CONTACTS", JSON.stringify(contacts)); // Cập nhật LocalStorage
    renderContacts(); // Cập nhật danh sách hiển thị
  }

  // Hiển thị danh sách liên hệ khi tải trang
  renderContacts();
});
$(document).ready(function () {
  // Chuyển hướng sang listteam khi nhấn vào nút "Team"
  $(".dashboard__nav-item:contains('Team')").click(function () {
    window.location.href = "/listteam.html"; // Điều hướng sang listteam
  });

  // Các đoạn mã khác cần thiết cho trang listcontact hoặc addcontact...
});

$(document).ready(function () {
  // Lấy chuỗi query string từ URL
  const queryString = window.location.search;

  // Sử dụng URLSearchParams để phân tích chuỗi query string
  const urlParams = new URLSearchParams(queryString);

  // Lấy giá trị của tham số 'id'
  const id = urlParams.get("id");

  // Lấy danh sách thành viên từ localStorage
  const listcontact = localStorage.getItem("CONTACTS");

  // Kiểm tra nếu có id và danh sách trong localStorage
  if (id && listcontact) {
    const listContactParse = JSON.parse(listcontact); // Parse dữ liệu từ localStorage

    // Tìm thông tin thành viên dựa trên id
    const userDetail = listContactParse.find((user) => user.id === Number(id));

    if (userDetail) {
      // Điền thông tin thành viên vào form
      $("input[placeholder='Enter first name']").val(userDetail.firstName);
      $("input[placeholder='Enter last name']").val(userDetail.lastName);
      $("input[placeholder='Enter email']").val(userDetail.email);
      $("input[placeholder='Enter phone number']").val(userDetail.phone);
      $("input[placeholder='']").val(userDetail.birthdate);
      $("select").val(userDetail.gender);
    }
  }
});
function loginUser(username, email) {
  const user = {
    name: username,
    email: email,
  };
  localStorage.setItem("USER", JSON.stringify(user)); // Lưu người dùng vào localStorage
}
$(document).ready(function () {
  // Mảng các hình ảnh avatar ngẫu nhiên
  const imageArray = [
    "/images/avatar.svg",
    "/images/avatar2.svg",
    "/images/avatar3.svg",
    "/images/avatar4.svg",
    "/images/avatar5.svg",
  ];

  // Hàm để lấy hoặc lưu hình ảnh avatar ngẫu nhiên
  function getOrSetRandomAvatar() {
    let avatar = localStorage.getItem("avatar");

    // Nếu chưa có avatar nào được lưu trữ, random và lưu lại
    if (!avatar) {
      const randomIndex = Math.floor(Math.random() * imageArray.length);
      avatar = imageArray[randomIndex];
      localStorage.setItem("avatar", avatar); // Lưu avatar đã chọn vào localStorage
    }

    return avatar;
  }

  // Hiển thị avatar ngẫu nhiên nhưng giữ nguyên sau khi reload
  const avatar = getOrSetRandomAvatar();
  $(".dashboard__user-avatar img").attr("src", avatar);

  // Lấy thông tin người dùng từ localStorage (giả sử đã được lưu từ khi đăng nhập)
  const user = JSON.parse(localStorage.getItem("USER"));

  // Hiển thị tên người dùng nếu đã đăng nhập
  if (user && user.name) {
    $(".dashboard__user-name").text(user.name); // Thay thế tên người dùng
  } else {
    $(".dashboard__user-name").text("Guest"); // Nếu chưa đăng nhập, hiển thị Guest
  }

  // Thêm chức năng logout
  $(".dashboard__logout-button").click(function () {
    // Xóa thông tin người dùng khỏi localStorage khi logout
    localStorage.removeItem("USER");
    localStorage.removeItem("avatar"); // Xóa avatar đã lưu
    window.location.href = "/siginin.html"; // Điều hướng về trang đăng nhập
  });
});
