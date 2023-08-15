// SPアコーディオン
$(function () {
  $(".ac-parent").on("click", function () {
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

//地方選択モーダル
$(document).ready(function () {
  // クリックでモーダルを開く
  $(".text-wrapper > div").on("click", function (e) {
    e.stopPropagation(); // イベント伝播を停止して、documentのclickイベントが発生しないようにする
    $(".location-selection-modal").fadeIn("slow"); // モーダルをゆっくりと表示
  });

  // ドキュメント全体をクリックした場合、モーダルを閉じる
  $(document).on("click", function () {
    $(".location-selection-modal").fadeOut("slow"); // モーダルをゆっくりと非表示
  });

  // モーダル内のリスト項目をクリックした場合の処理
  $(".map .location-selection-modal ul li").on("click", function () {
    $(".results-area").fadeIn(); // results-areaを表示
  });
  // モーダル内のリスト項目をクリックした場合の処理
  $("#serch-location-btn").on("click", function () {
    $(".results-area").fadeIn(); // results-areaを表示
  });

  // #serch-btnをクリックした場合の処理
  $("#serch-btn").on("click", function (e) {
    e.preventDefault(); // デフォルトのイベントをキャンセル（例えば、ページ遷移を防ぐ）

    // プルダウンの選択値を取得
    const selectedPrefecture = $(".pulldown-wrapper select").val();

    // プルダウンで「選択してください」が選択されている場合は何もせず、
    // 都道府県が選択されている場合のみresults-areaを表示
    if (selectedPrefecture !== "選択してください") {
      $(".results-area").fadeIn(); // results-areaを表示
      $("#message").text(""); // エラーメッセージをクリア
    } else {
      $("#message").text("都道府県を選択してください。"); // エラーメッセージを表示
    }
  });
});

// TOPスクロール
$(document).ready(function () {
  $('span:contains("マップ検索")')
    .css("cursor", "pointer")
    .click(function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

$(document).ready(function () {
  $("#serch-btn").on("click", function (e) {
    e.preventDefault();
    if ($("select").val() === "選択してください") {
      $("#message").text("※都道府県を選択して下さい").show();
    } else {
      $("#message").hide();
    }
  });
});

// 文字制御
$(document).ready(function () {
  function checkWindowSize() {
    if ($(window).width() <= 768) {
      $(".results-area .contents .cards .card > div > p span").text(
        "エリア検索"
      );
    } else {
      $(".results-area .contents .cards .card > div > p span").text(
        "マップ検索"
      );
    }
  }
  checkWindowSize();
  $(window).resize(checkWindowSize);
});

// 該当店舗なし、位置情報未取得モーダル制御
$(document).ready(function () {
  $(".close-button").on("click", function () {
    $(".no-store-modal , .location-info-modal, .modal-bg").fadeOut();
  });
});
