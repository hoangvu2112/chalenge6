$(document).ready(function () {
  // Mảng chứa đường dẫn đến các hình ảnh sẽ được sử dụng ngẫu nhiên
  const imageArray = [
    "/images/team1.svg",
    "/images/team2.svg",
    "/images/team3.svg",
    "/images/team4.svg",
    "/images/team5.svg",
    "/images/team6.svg",
  ];

  // Hàm kiểm tra xem trường có bị trống hay không
  function isEmpty(value) {
    return value.trim() === "";
  }

  // Hàm kiểm tra định dạng email
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

  // Hàm kiểm tra định dạng số điện thoại
  function validatePhoneNumber(phone) {
    const phonePattern = /^[0-9]{10,15}$/;
    return phonePattern.test(phone);
  }

  // Xử lý khi nhấn nút Add Now
  $(".contact-form__button button").click(function (e) {
    e.preventDefault();

    const firstName = $("input[placeholder='Enter first name']").val();
    const lastName = $("input[placeholder='Enter last name']").val();
    const email = $("input[placeholder='Enter email']").val();
    const phone = $("input[placeholder='Enter phone number']").val();
    const position = $("input[placeholder='Enter position']").val();
    const gender = $("select").val();

    let valid = true;

    // Kiểm tra từng trường
    if (isEmpty(firstName)) {
      $("input[placeholder='Enter first name']").css("border", "2px solid red");
      valid = false;
    } else {
      $("input[placeholder='Enter first name']").css("border", "");
    }

    if (isEmpty(lastName)) {
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

    if (isEmpty(phone) || !validatePhoneNumber(phone)) {
      $("input[placeholder='Enter phone number']").css(
        "border",
        "2px solid red"
      );
      valid = false;
    } else {
      $("input[placeholder='Enter phone number']").css("border", "");
    }

    if (isEmpty(position)) {
      $("input[placeholder='Enter position']").css("border", "2px solid red");
      valid = false;
    } else {
      $("input[placeholder='Enter position']").css("border", "");
    }

    // Nếu tất cả các trường hợp đều hợp lệ, thêm vào localStorage
    if (valid) {
      const team = {
        id: new Date().getTime(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        position: position,
        gender: gender,
        creatAt: new Date().toISOString(),
      };

      // Lưu danh sách team vào localStorage
      let teams = JSON.parse(localStorage.getItem("TEAM")) || [];
      teams.push(team);
      localStorage.setItem("TEAM", JSON.stringify(teams));

      // Tùy chọn: Xóa các trường dữ liệu sau khi lưu
      $("input[type='text'], input[type='email'], input[type='tel']").val("");
      $("select").val("male");

      // Chuyển hướng sang trang danh sách nhóm
      window.location.href = "/listteam.html";
    }
  });

  // Thêm sự kiện click vào nút "Team" trong menu
  $(".dashboard__nav-item:contains('Team')").click(function () {
    renderTeamList();
  });

  // ** Thêm sự kiện click vào nút "Add New Member" để chuyển hướng **
  $(".content__button").click(function () {
    window.location.href = "/addteam.html"; // Chuyển đến trang thêm thành viên mới
  });

  // Hàm hiển thị danh sách team từ LocalStorage
  function renderTeamList() {
    // Lấy danh sách team từ LocalStorage
    let teams = JSON.parse(localStorage.getItem("TEAM")) || [];
    const teamListContainer = $(".contact-list");

    // Xóa danh sách cũ trước khi thêm mới
    teamListContainer.empty();

    if (teams.length === 0) {
      // Nếu không có thành viên nào, hiển thị thông báo
      teamListContainer.append("");
    } else {
      // Lặp qua từng thành viên trong danh sách và thêm vào phần contact-list
      teams.reverse().forEach((teamMember, index) => {
        // Chọn một hình ảnh ngẫu nhiên từ mảng imageArray
        const randomImage =
          imageArray[Math.floor(Math.random() * imageArray.length)];

        const teamCard = `
                <div class="contact-card" data-index="${index}" data-id="${teamMember.id}">
                  <div class="contact-card__image">
                    <img src="${randomImage}" alt="${teamMember.firstName} ${teamMember.lastName}" />
                  </div>
                  <div class="contact-card__info">
                    <div class="contact-card__name">${teamMember.firstName} ${teamMember.lastName}</div>
                    <div class="contact-card__position">${teamMember.position}</div>
                  
                    <div class="contact-card__email">${teamMember.email}</div>
                  </div>
                  <div class="contact-card__delete">
                    <img src="/images/Action.svg" class="delete-contact" data-index="${index}" alt="Delete">
                  </div>
                </div>
              `;
        teamListContainer.append(teamCard);
      });
    }

    // Thêm sự kiện click cho nút xóa
    $(".delete-contact").click(function (e) {
      e.stopPropagation();
      const index = $(this).data("index");
      deleteTeamMember(index);
    });

    $(".contact-card").click(function () {
      const id = $(this).data("id");
      window.location.href = "/viewdetailsteam.html?id=" + id;
    });
  }

  // Hàm xóa thành viên
  function deleteTeamMember(index) {
    // Lấy danh sách hiện tại từ LocalStorage
    let teams = JSON.parse(localStorage.getItem("TEAM")) || [];
    // Xóa thành viên theo chỉ số
    teams.splice(index, 1);
    // Cập nhật lại localStorage sau khi xóa
    localStorage.setItem("TEAM", JSON.stringify(teams));
    // Cập nhật lại danh sách hiển thị
    renderTeamList();
  }

  // Hiển thị danh sách team khi tải trang
  renderTeamList();
});
$(document).ready(function () {
  // Thêm sự kiện click vào nút "Team" để chuyển hướng về trang listteam
  $(".dashboard__nav-item:contains('Team')").click(function () {
    window.location.href = "/listteam.html"; // Điều hướng đến trang listteam
  });

  // Thêm sự kiện click vào nút "Contact" để chuyển hướng về trang listcontact
  $(".dashboard__nav-item:contains('Contact')").click(function () {
    window.location.href = "/listcontact.html"; // Điều hướng đến trang listcontact
  });

  // Các đoạn mã khác nếu cần
  // Lấy chuỗi query string từ URL
  const queryString = window.location.search;

  // Sử dụng URLSearchParams để phân tích chuỗi query string
  const urlParams = new URLSearchParams(queryString);

  // Lấy giá trị của tham số 'teamId'
  const id = urlParams.get("id");

  const listTeam = localStorage.getItem("TEAM");

  if (id && listTeam) {
    const listTeamParse = JSON.parse(listTeam);

    const userDetail = listTeamParse.find((user) => user.id === Number(id));

    console.log(userDetail);
  }
});
$(document).ready(function () {
  // Lấy chuỗi query string từ URL
  const queryString = window.location.search;

  // Sử dụng URLSearchParams để phân tích chuỗi query string
  const urlParams = new URLSearchParams(queryString);

  // Lấy giá trị của tham số 'id'
  const id = urlParams.get("id");

  // Lấy danh sách thành viên từ localStorage
  const listTeam = localStorage.getItem("TEAM");

  // Kiểm tra nếu có id và danh sách trong localStorage
  if (id && listTeam) {
    const listTeamParse = JSON.parse(listTeam); // Parse dữ liệu từ localStorage

    // Tìm thông tin thành viên dựa trên id
    const userDetail = listTeamParse.find((user) => user.id === Number(id));

    if (userDetail) {
      // Điền thông tin thành viên vào form
      $("input[placeholder='Enter first name']").val(userDetail.firstName);
      $("input[placeholder='Enter last name']").val(userDetail.lastName);
      $("input[placeholder='Enter email']").val(userDetail.email);
      $("input[placeholder='Enter phone number']").val(userDetail.phone);
      $("input[placeholder='Enter position']").val(userDetail.position);
      $("select").val(userDetail.gender);
    }
  }
});
function loginUser(username, email) {
  const user = {
    name: username,
    email: email,
    avatar: getRandomAvatar(),
  };
  localStorage.setItem("USER", JSON.stringify(user)); // Lưu người dùng vào localStorage
}
$(document).ready(function () {
  // Mảng chứa các đường dẫn đến hình ảnh avatar ngẫu nhiên
  const imageArray = [
    "/images/avatar1.svg",
    "/images/avatar2.svg",
    "/images/avatar3.svg",
    "/images/avatar4.svg",
    "/images/avatar5.svg",
  ];

  // Hàm để lấy hoặc lưu hình ảnh avatar ngẫu nhiên
  function getOrSetRandomAvatar() {
    // Kiểm tra xem avatar đã có trong localStorage chưa
    let avatar = localStorage.getItem("avatar");

    console.log("Avatar hiện tại trong localStorage: ", avatar); // Kiểm tra giá trị avatar trong localStorage

    // Nếu chưa có avatar nào được lưu trữ, chọn ngẫu nhiên và lưu lại
    if (!avatar) {
      const randomIndex = Math.floor(Math.random() * imageArray.length);
      avatar = imageArray[randomIndex]; // Chọn một hình ảnh ngẫu nhiên
      localStorage.setItem("avatar", avatar); // Lưu avatar đã chọn vào localStorage

      console.log("Avatar mới được chọn và lưu vào localStorage: ", avatar); // Log avatar đã lưu
    }

    return avatar; // Trả về avatar từ localStorage
  }

  // Hiển thị avatar ngẫu nhiên nhưng giữ nguyên sau khi reload
  const avatar = getOrSetRandomAvatar(); // Lấy avatar từ localStorage
  console.log("Avatar sẽ hiển thị: ", avatar); // Hiển thị thông báo về avatar đang được hiển thị
  $(".dashboard__user-avatar img").attr("src", avatar); // Gán avatar vào thẻ img

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
    console.log("Đã xóa avatar và thông tin người dùng khỏi localStorage."); // Log sau khi xóa
    window.location.href = "/signin.html"; // Điều hướng về trang đăng nhập
  });
});

$(document).ready(function () {
  // Bắt sự kiện khi người dùng nhập vào ô tìm kiếm
  $(".content__search").on("input", function () {
    // Lấy giá trị từ ô input
    let searchValue = $(this).val().toLowerCase();

    // Lặp qua từng thẻ contact-card và so khớp email
    $(".contact-card").each(function () {
      // Lấy email trong thẻ contact-card
      let email = $(this).find(".contact-card__email").text().toLowerCase();

      // Nếu email chứa giá trị tìm kiếm thì hiển thị, nếu không thì ẩn
      if (email.includes(searchValue)) {
        $(this).show(); // Hiển thị thẻ phù hợp
      } else {
        $(this).hide(); // Ẩn thẻ không phù hợp
      }
    });
  });
});
