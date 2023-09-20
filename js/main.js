// spアコーディオン
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
$("#serch-btn").on("click", function (e) {
  e.preventDefault();
  const selectedPrefecture = $(".pulldown-wrapper select").val();
  if (selectedPrefecture !== "選択してください") {
    $(".results-area").fadeIn();
    $("#message").text("");
    scrollToResults();
  } else {
    $("#message").text("都道府県を選択してください。");
  }
});

//地方選択モーダル
$(document).ready(function () {
  // クリックでモーダルを開く
  $("#tohoku,#kanto,#tokai,#kinki,#shikoku,#kyusyu").on("click", function (e) {
    e.stopPropagation();
    $(".location-selection-modal").fadeIn("slow");
  });
  // ドキュメント全体をクリックした場合、モーダルを閉じる
  $(document).on("click", function () {
    $(".location-selection-modal").fadeOut("slow");
  });

  // モーダル内のリスト項目をクリックした場合の処理
  $(".map").on("click", ".location-selection-modal ul li", function () {
    $(".results-area").fadeIn();
    scrollToResults();
  });

  // モーダル内のリスト項目をクリックした場合の処理
  $("#serch-location-btn").on("click", function () {
    $(".results-area").fadeIn();
    scrollToResults();
  });
  // #hokkaido をクリックしたときの処理
  $(
    ".map .text-wrapper #hokkaido, body > main > section.map-area > div.map-sp > div > dl > dt:nth-child(1)"
  ).on("click", function () {
    $(".results-area").fadeIn();
    scrollToResults();
  });
  // #kyusyu をクリックしたときの処理
  $(".map .text-wrapper #kyusyu").on("click", function () {
    if ($(".location-selection-modal").is(":visible")) {
      updateModalForKyusyu();
    }
  });
  // #kanto をクリックしたときの処理
  $(".map .text-wrapper #kanto").on("click", function () {
    if ($(".location-selection-modal").is(":visible")) {
      updateModalForKanto();
    }
  });

  // SP
  $(".ac-child ul li ").on("click", function () {
    $(".results-area").fadeIn();
    scrollToResults();
  });

  $(".more-text").on("click", function () {
    $("#cards2").fadeIn();
    $(".more-text").hide();
  });
});
//results-areaにスクロールする関数
function scrollToResults() {
  $("html, body").animate(
    {
      scrollTop: $(".results-area").offset().top,
    },
    500
  );
}
// モーダルを九州の都道府県に変更する関数
function updateModalForKyusyu() {
  let kyusyuPrefectures = [
    { name: "福岡県", count: 10 },
    { name: "佐賀県", count: 10 },
    { name: "長崎県", count: 10 },
    { name: "熊本県", count: 10 },
    { name: "大分県", count: 10 },
    { name: "宮崎県", count: 10 },
    { name: "鹿児島県", count: 10 },
    { name: "沖縄県", count: 10 }, // 九州地方には属していませんが、一般的に含める場合があります
  ];

  let html = "<ul>";
  kyusyuPrefectures.forEach(function (prefecture) {
    html +=
      "<li>" + prefecture.name + "(<span>" + prefecture.count + "</span>)</li>";
  });
  html += "</ul>";

  $(".location-selection-modal").html(html);
}
// モーダルを関東の都道府県に変更する関数
function updateModalForKanto() {
  var kantoPrefectures = [
    { name: "東京都", count: 10 },
    { name: "神奈川県", count: 10 },
    { name: "千葉県", count: 10 },
    { name: "埼玉県", count: 10 },
    { name: "茨城県", count: 10 },
    { name: "栃木県", count: 10 },
    { name: "群馬県", count: 10 },
  ];

  var html = "<ul>";
  kantoPrefectures.forEach(function (prefecture) {
    html +=
      "<li>" + prefecture.name + "(<span>" + prefecture.count + "</span>)</li>";
  });
  html += "</ul>";

  $(".location-selection-modal").html(html);
}
// 現在地検索ボタンSPスクロール
$("#serch-location-sp-btn").on("click", function () {
  $(".results-area").fadeIn();
  scrollToResults();
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
      $("#message").text("※都道府県を選択してください").show();
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

// ボタンアイコン制御
$(document).ready(function () {
  $(".results-area .contents .cards .card > div:nth-child(3) a img").each(
    function () {
      $(this).data("original-src", $(this).attr("src"));
    }
  );

  // 予約する
  $(
    ".results-area .contents .cards .card > div:nth-child(3) a:first-child"
  ).hover(
    function () {
      var hoverImage = "./images/calendar-icon-w.webp";
      $(this).find("img").attr("src", hoverImage);
    },
    function () {
      var originalImage = $(this).find("img").data("original-src");
      $(this).find("img").attr("src", originalImage);
    }
  );
  // 地図を表示
  $(
    ".results-area .contents .cards .card > div:nth-child(3) a:nth-child(2)"
  ).hover(
    function () {
      var hoverImage = "./images/location-icon-w.webp";
      $(this).find("img").attr("src", hoverImage);
    },
    function () {
      var originalImage = $(this).find("img").data("original-src");
      $(this).find("img").attr("src", originalImage);
    }
  );

  $(".cta-area > .flex > div > a img").each(function () {
    $(this).data("original-src", $(this).attr("src"));
  });

  // オンライン予約
  $(".cta-area > .flex > div:first-child > a").hover(
    function () {
      var hoverImage = "./images/monitor-icon.webp";
      $(this).find("img").attr("src", hoverImage);
    },
    function () {
      var originalImage = $(this).find("img").data("original-src");
      $(this).find("img").attr("src", originalImage);
    }
  );
  // 電話予約
  $(".cta-area > .flex > div:nth-child(2) > a").hover(
    function () {
      var hoverImage = "./images/tel-icon.webp";
      $(this).find("img").attr("src", hoverImage);
    },
    function () {
      var originalImage = $(this).find("img").data("original-src");
      $(this).find("img").attr("src", originalImage);
    }
  );
});

// mapボタン反転
$(document).ready(function () {
  $("#serch-btn").hover(
    function () {
      // ホバー開始時
      $(this).find(".serch-icon").attr("src", "./images/serch-icon.webp");
    },
    function () {
      // ホバー終了時
      $(this).find(".serch-icon").attr("src", "./images/serch-icon-w.webp");
    }
  );

  $("#serch-location-btn").hover(
    function () {
      // ホバー開始時
      $(this).find(".serch-icon").attr("src", "./images/location-icon-w.webp");
    },
    function () {
      // ホバー終了時
      $(this).find(".serch-icon").attr("src", "./images/location-icon.webp");
    }
  );
});
