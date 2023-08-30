// SPアコーディオン
$(function () {
  $(".ac-parent").on("click", function () {
    $(".ac-child").not($(this).next(".ac-child")).slideUp();
    $(".ac-parent").not($(this)).removeClass("open");
    $(this).next(".ac-child").slideToggle();
    $(this).toggleClass("open");
  });
});

// 位置情報取得
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        console.log("緯度: " + latitude + ", 経度: " + longitude);
      },
      function (error) {
        console.error("Error occurred. Code: " + error.code);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

document
  .getElementById("serch-location-btn")
  .addEventListener("click", getLocation);
document
  .getElementById("serch-location-sp-btn")
  .addEventListener("click", getLocation);

// #serch-btnをクリックした場合の処理
$(document).ready(function () {
  $("#serch-btn").on("click", function (e) {
    e.preventDefault();
    if ($("select").val() === "選択してください") {
      $("#message").text("※都道府県を選択してください").show();
    } else {
      $("#message").hide();
    }
  });
});

// ボタンアイコン制御
$(document).ready(function () {
  $(".location-info-modal .flex > div > a").hover(
    function () {
      const img = $(this).find("img");
      $(img).data("original-src", $(img).attr("src"));
      const newSrc = $(this).data("hover-image");
      $(img).attr("src", newSrc);
    },
    function () {
      const img = $(this).find("img");
      $(img).attr("src", $(img).data("original-src"));
    }
  );
});
$(document).ready(function () {
  $(".cta-area .flex > div > a").hover(
    function () {
      const img = $(this).find("img");
      $(img).data("original-src", $(img).attr("src"));
      const newSrc = $(this).data("hover-image");
      $(img).attr("src", newSrc);
    },
    function () {
      const img = $(this).find("img");
      $(img).attr("src", $(img).data("original-src"));
    }
  );
});
// resultまでスクロール
$(document).ready(function () {
  $("html, body").animate(
    {
      scrollTop: $(".results-area").offset().top,
    },
    1000
  );
});
