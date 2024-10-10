document.addEventListener("DOMContentLoaded", function () {
  // Hàm kiểm tra định dạng email
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email); // Trả về true nếu email hợp lệ
  }

  // Hàm kiểm tra mật khẩu (ít nhất 6 ký tự, phải có 1 chữ cái viết hoa)
  function validatePassword(password) {
    return password.length >= 6 && /[A-Z]/.test(password); // Phải có ít nhất 1 chữ hoa và 6 ký tự
  }

  // Hàm kiểm tra email trùng lặp trong Local Storage (cho đăng ký)
  function isEmailDuplicate(email) {
    const accounts = JSON.parse(localStorage.getItem("ACCOUNT")) || [];
    return accounts.some((account) => account.email === email);
  }

  // Hàm xử lý hiển thị lỗi và thêm viền đỏ
  function showError(inputId, errorMessage, show) {
    const input = document.getElementById(inputId);
    const errorElement = document.querySelector(`.${inputId}-error`);

    if (show) {
      input.classList.add("input--error");
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = "block";
      }
    } else {
      input.classList.remove("input--error");
      if (errorElement) {
        errorElement.style.display = "none";
      }
    }
  }

  function validateCheckbox(checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    if (!checkbox.checked) {
      checkbox.classList.add("checkbox--error"); // Thêm lớp lỗi cho checkbox
      return false;
    } else {
      checkbox.classList.remove("checkbox--error");
      return true;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Hàm kiểm tra checkbox có được chọn hay không và hiển thị lỗi

    // Hàm xử lý hiển thị lỗi và thêm viền đỏ cho các trường khác (nếu có)
    function showError(inputId, errorMessage, show) {
      const input = document.getElementById(inputId);
      const errorElement = document.querySelector(`.${inputId}-error`);

      if (show) {
        input.classList.add("input--error");
        if (errorElement) {
          errorElement.textContent = errorMessage;
          errorElement.style.display = "block";
        }
      } else {
        input.classList.remove("input--error");
        if (errorElement) {
          errorElement.style.display = "none";
        }
      }
    }

    // Xử lý khi người dùng nhấn nút Sign Up
    document
      .querySelector(".create-button")
      .addEventListener("click", function (e) {
        e.preventDefault();

        // Kiểm tra checkbox
        if (!validateCheckbox("remember-checkbox")) {
          alert("You must accept the terms and conditions.");
          return;
        }

        // Nếu tất cả hợp lệ thì submit form hoặc thực hiện hành động tiếp theo
        alert("Form is valid and submitted!");
      });
  });

  // Hàm kiểm tra username
  function validateUsername(username) {
    return username.trim() !== ""; // Username không được để trống
  }

  // Xử lý đăng ký
  if (document.body.classList.contains("signUp")) {
    document
      .querySelector(".create-button")
      .addEventListener("click", function (e) {
        e.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let username = document.getElementById("name").value; // Lấy giá trị của username
        let valid = true;

        // Kiểm tra email
        if (email === "" || !validateEmail(email)) {
          $("#email").css("border", "2px solid red");
          valid = false;
        } else if (isEmailDuplicate(email)) {
          $("#email").css("border", "2px solid red");
          alert("Email đã được đăng ký!"); // Hiển thị thông báo nếu email đã tồn tại
          valid = false;
        } else {
          $("#email").css("border", ""); // Trở lại trạng thái bình thường nếu email hợp lệ
        }

        // Kiểm tra username
        if (!validateUsername(username)) {
          $("#name").css("border", "2px solid red"); // Nếu username rỗng, hiển thị viền đỏ
          valid = false;
        } else {
          $("#name").css("border", ""); // Trở lại trạng thái bình thường nếu hợp lệ
        }

        // Kiểm tra mật khẩu (bắt buộc có chữ hoa, số và ký tự đặc biệt)
        if (!validatePassword(password)) {
          $("#password").css("border", "2px solid red");
          valid = false;
        } else {
          $("#password").css("border", "");
        }

        // Kiểm tra checkbox
        if (!validateCheckbox("remember-checkbox")) {
          valid = false;
        }

        // Nếu tất cả hợp lệ, lưu tài khoản vào Local Storage
        if (valid) {
          let accounts = JSON.parse(localStorage.getItem("ACCOUNT")) || [];
          accounts.push({
            email: email,
            username: username,
            password: password,
          });
          localStorage.setItem("ACCOUNT", JSON.stringify(accounts));
          alert("Registration successful! Redirecting to login page...");
          window.location.href = "/signin.html"; // Chuyển đến trang đăng nhập
        }
      });
  }

  // Xử lý đăng nhập
  if (document.body.classList.contains("signIn")) {
    document
      .querySelector(".create-button")
      .addEventListener("click", function (e) {
        e.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();

        let listAccout = JSON.parse(localStorage.getItem("ACCOUNT")) || [];
        let valid = true;

        // Kiểm tra email
        if (email === "" || !validateEmail(email)) {
          $("#email").css("border", "2px solid red");
          valid = false;
        } else {
          $("#email").css("border", "");
        }

        // Kiểm tra mật khẩu
        if (password === "" || !validatePassword(password)) {
          $("#password").css("border", "2px solid red");
          valid = false;
        } else {
          $("#password").css("border", "");
        }

        // Tìm tài khoản trong danh sách LocalStorage
        const user = listAccout.find((user) => user.email === email);

        if (user) {
          // Nếu email tồn tại, kiểm tra mật khẩu
          if (user.password === password) {
            valid = true;
          } else {
            $("#password").css("border", "2px solid red");
            valid = false;
          }
        } else {
          $("#email").css("border", "2px solid red");
          valid = false;
        }

        // Nếu thông tin hợp lệ, lưu thông tin người dùng và chuyển sang trang liên hệ
        if (valid) {
          localStorage.setItem("USER", JSON.stringify(user));
          window.location.href = "/contact.html";
        }
      });
  }

  // Hàm để lấy avatar ngẫu nhiên cho tài khoản
  function getRandomAvatar() {
    const avatarArray = [
      "/images/avatar.svg",
      "/images/avatar-2.svg",
      "/images/avatar-1.svg",
    ];
    const randomIndex = Math.floor(Math.random() * avatarArray.length);
    return avatarArray[randomIndex]; // Trả về một avatar ngẫu nhiên
  }

  // Nếu đang ở trang đăng ký
  // if ($("body").hasClass("signUp")) {
  //   $(".create-button").click(function (e) {
  //     e.preventDefault(); // Ngăn form không submit ngay lập tức
  //     let email = $("#email").val();
  //     let username = $("#name").val();
  //     let password = $("#password").val();
  //     let valid = true;

  //     // Kiểm tra email
  //     if (email === "" || !validateEmail(email)) {
  //       $("#email").css("border", "2px solid red");
  //       valid = false;
  //     } else if (isEmailDuplicate(email)) {
  //       $("#email").css("border", "2px solid red");
  //       alert("Email đã được đăng ký!"); // Hiển thị thông báo nếu email đã tồn tại
  //       valid = false;
  //     } else {
  //       $("#email").css("border", ""); // Trở lại trạng thái bình thường nếu email hợp lệ
  //     }

  //     // Kiểm tra username
  //     if (!validateUsername(username)) {
  //       $("#name").css("border", "2px solid red"); // Nếu username rỗng, hiển thị viền đỏ
  //       valid = false;
  //     } else {
  //       $("#name").css("border", ""); // Trở lại trạng thái bình thường nếu hợp lệ
  //     }

  //     // Kiểm tra mật khẩu (bắt buộc có chữ hoa, số và ký tự đặc biệt)
  //     if (!validatePassword(password)) {
  //       $("#password").css("border", "2px solid red");
  //       valid = false;
  //     } else {
  //       $("#password").css("border", "");
  //     }

  //     // Nếu tất cả hợp lệ thì lưu vào Local Storage và chuyển hướng sang trang đăng nhập
  //     if (valid) {
  //       let listAccout = JSON.parse(localStorage.getItem("ACCOUNT")) || [];

  //       const data = {
  //         name: username,
  //         email: email,
  //         password: password,
  //         avatar: getRandomAvatar(), // Gán avatar ngẫu nhiên cho tài khoản
  //       };

  //       listAccout.push(data); // Thêm tài khoản vào danh sách
  //       localStorage.setItem("ACCOUNT", JSON.stringify(listAccout)); // Lưu vào LocalStorage
  //       window.location.href = "/signin.html"; // Chuyển hướng sang trang đăng nhập
  //     }
  //   });
  // } else {
  //   // Nếu đang ở trang đăng nhập
  //   $(".create-button").click(function (e) {
  //     e.preventDefault();
  //     let email = $("#email").val();
  //     let password = $("#password").val();

  //     let listAccout = JSON.parse(localStorage.getItem("ACCOUNT")) || [];
  //     let valid = true;

  //     // Kiểm tra email
  //     if (email === "" || !validateEmail(email)) {
  //       $("#email").css("border", "2px solid red");
  //       valid = false;
  //     } else {
  //       $("#email").css("border", "");
  //     }

  //     // Kiểm tra mật khẩu
  //     if (password === "" || !validatePassword(password)) {
  //       $("#password").css("border", "2px solid red");
  //       valid = false;
  //     } else {
  //       $("#password").css("border", "");
  //     }

  //     // Tìm tài khoản trong danh sách LocalStorage
  //     const user = listAccout.find((user) => user.email === email);

  //     if (user) {
  //       // Nếu email tồn tại, kiểm tra mật khẩu
  //       if (user.password === password) {
  //         valid = true;
  //       } else {
  //         $("#password").css("border", "2px solid red");
  //         valid = false;
  //       }
  //     } else {
  //       $("#email").css("border", "2px solid red");
  //       valid = false;
  //     }

  //     // Nếu thông tin hợp lệ, lưu thông tin người dùng và chuyển sang trang liên hệ
  //     if (valid) {
  //       localStorage.setItem("USER", JSON.stringify(user));
  //       window.location.href = "/contact.html";
  //     }
  //   });
  // }

  // Kiểm tra xem ô có bị trống không
  function isEmpty(value) {
    return value.trim() === ""; // Loại bỏ khoảng trắng và kiểm tra rỗng
  }

  // Hàm kiểm tra định dạng số điện thoại
  function validatePhoneNumber(phone) {
    const phonePattern = /^[0-9]{10,15}$/; // Kiểm tra số điện thoại từ 10-15 số
    return phonePattern.test(phone);
  }

  // Xử lý khi nhấn nút Thêm liên hệ
  $(".contact-form__button button").click(function (e) {
    e.preventDefault();
    if ($("body").hasClass("contact")) {
      const firstName = $("input[placeholder='Enter first name']").val();
      const lastName = $("input[placeholder='Enter last name']").val();
      const email = $("input[placeholder='Enter email']").val();
      const phone = $("input[placeholder='Enter phone number']").val();
      const birthdate = $("input[placeholder='Enter birthdate']").val();
      const gender = $("select").val();

      let valid = true;

      // Kiểm tra từng trường và báo lỗi nếu không hợp lệ
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

      if (email === "" || !validateEmail(email)) {
        $("input[placeholder='Enter email']").css("border", "2px solid red");
        valid = false;
      } else {
        $("input[placeholder='Enter email']").css("border", "");
      }

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

      // Nếu tất cả các trường đều hợp lệ, lưu thông tin liên hệ vào localStorage
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

        let contacts = JSON.parse(localStorage.getItem("CONTACTS")) || [];
        contacts.push(contact); // Thêm liên hệ vào danh sách
        localStorage.setItem("CONTACTS", JSON.stringify(contacts));

        $(
          "input[type='text'], input[type='email'], input[type='tel'], input[type='']"
        ).val("");
        $("select").val("male");
        window.location.href = "/listcontact.html"; // Chuyển hướng đến danh sách liên hệ
      }
    }
  });

  $(document).ready(function () {
    // Hàm hiển thị danh sách liên hệ từ LocalStorage
    function renderContacts() {
      let contacts = JSON.parse(localStorage.getItem("CONTACTS")) || [];
      const contactList = $(".contact-list");
      contactList.empty(); // Xóa danh sách cũ trước khi hiển thị danh sách mới

      const imageArray = [
        "images/Image1.svg",
        "images/Image2.svg",
        "images/Image3.svg",
        "images/Image4.svg",
        "images/Image5.svg",
        "images/Image6.svg",
      ];

      // Kiểm tra nếu hình ảnh đã được lưu trữ trong localStorage
      let savedImages =
        JSON.parse(localStorage.getItem("CONTACT_IMAGES")) || {};

      contacts.forEach((contact, index) => {
        let randomImage;

        // Nếu liên hệ đã có hình ảnh được lưu trữ, sử dụng lại
        if (savedImages[contact.id]) {
          randomImage = savedImages[contact.id];
        } else {
          // Chọn một hình ảnh ngẫu nhiên và lưu vào localStorage
          randomImage =
            imageArray[Math.floor(Math.random() * imageArray.length)];
          savedImages[contact.id] = randomImage;
          localStorage.setItem("CONTACT_IMAGES", JSON.stringify(savedImages));
        }

        const contactCard = `
          <div class="contact-card" data-index="${index}" data-id="${contact.id}">
            <div class="contact-card__image">
              <img src="${randomImage}" alt="${contact.firstName} ${contact.lastName}" />
            </div>
            <div class="contact-card__info">
              <div class="contact-card__name">${contact.firstName} ${contact.lastName}</div>
              <div class="contact-card__email">${contact.email}</div>
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
      localStorage.setItem("CONTACTS", JSON.stringify(contacts));
      renderContacts(); // Cập nhật danh sách sau khi xóa
    }

    // Hiển thị danh sách liên hệ khi tải trang
    renderContacts();
  });
  // Lấy thông tin người dùng từ LocalStorage và hiển thị
  const user = JSON.parse(localStorage.getItem("USER"));

  if (user && user.avatar) {
    $(".dashboard__user-avatar img").attr("src", user.avatar); // Hiển thị avatar từ tài khoản
  }

  if (user && user.name) {
    $(".dashboard__user-name").text(user.name);
  } else {
    $(".dashboard__user-name").text("Guest");
  }

  // Chức năng logout
  $(".dashboard__logout-button").click(function () {
    localStorage.removeItem("USER");
    window.location.href = "/signin.html";
  });
});
$(document).ready(function () {
  // Xử lý sự kiện khi nhấn nút "Add Now" để thêm liên hệ
  $(".btn__add").click(function (e) {
    e.preventDefault(); // Ngăn form submit ngay lập tức

    // Lấy giá trị của các trường input
    const firstName = $("input[placeholder='Enter first name']").val().trim();
    const lastName = $("input[placeholder='Enter last name']").val().trim();
    const email = $("input[placeholder='Enter email']")
      .val()
      .trim()
      .toLowerCase(); // Trim và chuyển sang chữ thường
    const phone = $("input[placeholder='Enter phone number']").val().trim();
    const birthdate = $("input[placeholder='Enter birthdate']").val().trim();
    const gender = $("select").val();

    let valid = true;

    // Kiểm tra từng trường input và hiển thị lỗi nếu không hợp lệ
    if (!firstName) {
      $("input[placeholder='Enter first name']").css("border", "2px solid red");
      valid = false;
    } else {
      $("input[placeholder='Enter first name']").css("border", "");
    }

    if (!lastName) {
      $("input[placeholder='Enter last name']").css("border", "2px solid red");
      valid = false;
    } else {
      $("input[placeholder='Enter last name']").css("border", "");
    }

    if (email === "" || !validateEmail(email)) {
      $("input[placeholder='Enter email']").css("border", "2px solid red");
      valid = false;
    } else {
      $("input[placeholder='Enter email']").css("border", "");
    }

    if (!phone || !validatePhoneNumber(phone)) {
      $("input[placeholder='Enter phone number']").css(
        "border",
        "2px solid red"
      );
      valid = false;
    } else {
      $("input[placeholder='Enter phone number']").css("border", "");
    }

    if (!birthdate) {
      $("input[placeholder='Enter birthdate']").css("border", "2px solid red");
      valid = false;
    } else {
      $("input[placeholder='Enter birthdate']").css("border", "");
    }

    // Lấy danh sách liên hệ từ localStorage
    let contacts = JSON.parse(localStorage.getItem("CONTACTS")) || [];

    // Kiểm tra email trùng lặp
    const isEmailDuplicate = contacts.some(
      (contact) => contact.email.trim().toLowerCase() === email
    );

    // Nếu email đã tồn tại
    if (isEmailDuplicate) {
      alert("Email đã tồn tại! Vui lòng nhập email khác.");
      $("input[placeholder='Enter email']").css("border", "2px solid red");
      valid = false;
    }

    // Nếu tất cả các trường hợp hợp lệ và email không trùng lặp thì lưu vào LocalStorage
    if (valid && !isEmailDuplicate) {
      const contact = {
        id: new Date().getTime(), // Tạo ID duy nhất cho liên hệ
        firstName: firstName,
        lastName: lastName,
        email: email, // Email đã được chuẩn hóa về chữ thường
        phone: phone,
        birthdate: birthdate, // Ngày sinh
        gender: gender,
        createdAt: new Date().toISOString(), // Thời gian tạo liên hệ
      };

      // Lưu thông tin liên hệ vào localStorage
      contacts.push(contact);
      localStorage.setItem("CONTACTS", JSON.stringify(contacts));

      // Xóa sạch form sau khi lưu
      $("input[type='text'], input[type='email'], input[type='tel']").val("");
      $("select").val("male");

      // Thông báo thành công và chuyển hướng
      alert("Liên hệ đã được thêm thành công!");
      window.location.href = "/listcontact.html"; // Chuyển hướng sang trang danh sách liên hệ
    }
  });

  // Hàm kiểm tra định dạng email
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email); // Trả về true nếu email hợp lệ
  }

  // Hàm kiểm tra định dạng số điện thoại
  function validatePhoneNumber(phone) {
    const phonePattern = /^[0-9]{10,15}$/; // Kiểm tra số điện thoại từ 10-15 số
    return phonePattern.test(phone);
  }
});

$(document).ready(function () {
  // Khi nhấn vào nút "Add New Contact" sẽ chuyển hướng đến trang contact.html
  $(".btn__add-new-contact").click(function () {
    window.location.href = "/contact.html"; // Thay đổi URL để điều hướng đến trang thêm liên hệ
  });
});
$(document).ready(function () {
  // Bắt sự kiện click vào nút Team
  $(".dashboard__nav-item:contains('Team')").click(function () {
    // Chuyển hướng sang trang listteam.html
    window.location.href = "/listteam.html"; // Đảm bảo trang listteam.html có trong dự án của bạn
  });
});
$(document).ready(function () {
  // Bắt sự kiện khi người dùng nhấn vào thẻ liên hệ
  $(".contact-card").click(function () {
    const contactId = $(this).data("id"); // Lấy ID liên hệ từ thẻ

    // Lưu ID liên hệ vào localStorage
    localStorage.setItem("SELECTED_CONTACT_ID", contactId);

    // Chuyển hướng đến trang xem chi tiết liên hệ
    window.location.href = "/viewdetailscontact.html";
  });
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
document.addEventListener("DOMContentLoaded", function () {
  // Khai báo biến để lưu trạng thái của checkbox
  let isChecked = false;

  // Lấy checkbox bằng ID
  const checkbox = document.getElementById("remember-checkbox");
  const submitButton = document.getElementById("submit-button");

  // Sự kiện thay đổi giá trị checkbox
  checkbox.addEventListener("change", function () {
    isChecked = checkbox.checked; // Cập nhật biến khi checkbox thay đổi
    console.log("Checkbox checked:", isChecked);
  });

  // Sự kiện khi người dùng nhấn nút submit
  submitButton.addEventListener("click", function (e) {
    if (!isChecked) {
      e.preventDefault(); // Ngăn không cho submit nếu checkbox chưa được chọn
      alert("Please accept the terms and conditions before proceeding.");
    } else {
      console.log("Form submitted successfully!");
    }
  });
});
