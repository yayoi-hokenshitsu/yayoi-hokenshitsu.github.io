/* やよいのキレイ保健室 かんたんチェック 共通の部品
 * - TOOLS: ツールの一覧（TOP のカードと、各ツールの名前）
 * - VIDEOS: 動画の一覧。publishAt を過ぎた動画だけカードに出す（公開予約中の動画は出さない）
 */
(function () {
  var CHANNEL_URL = "https://www.youtube.com/channel/UC_R4JbM6m2IzSkHAtEOCXyQ";

  var TOOLS = [
    { id: "diet", title: "そのダイエット、急すぎない？", sub: "BMIと、ダイエットのペースが分かります", ready: true },
    { id: "protein", title: "1日に必要なたんぱく質", sub: "体重から、1日の目安の量が分かります", ready: false },
    { id: "sugar", title: "その飲み物、角砂糖何個分？", sub: "いつもの飲み物の砂糖を、角砂糖で数えます", ready: true },
    { id: "water", title: "その水、足りてる？飲みすぎ？", sub: "飲む量とおしっこの色から、足りているかが分かります", ready: true },
    { id: "caffeine", title: "カフェイン、とりすぎてない？", sub: "コーヒーやお茶のカフェインを合計します", ready: false },
    { id: "undou", title: "運動、足りてる？", sub: "1週間の運動を、世界の目安とくらべます", ready: false },
    { id: "hiyakedome", title: "日焼け止め、足りてる？", sub: "顔に塗るときの、ちょうどいい量が分かります", ready: false },
    { id: "nemuri", title: "眠りのチェック", sub: "8つの質問で、眠りの状態を見ます", ready: false }
  ];

  var VIDEOS = [
    { id: "xmkWRkCIAbA", title: "【水の飲みすぎ】美容のために1日4リットル飲んだ女の末路｜2週間後、いちばん通った場所は…", publishAt: "2026-10-31T18:00:00+09:00", tools: ["water"] },
    { id: "f50Uwmjthlg", title: "【甘い飲み物】「私、砂糖ゼロ生活♡」先輩のカフェオレに付箋を貼った女の末路｜はちみつラテの裏を見たら…", publishAt: "2026-11-01T18:00:00+09:00", tools: ["sugar"] },
    { id: "aG16MeNKuR0", title: "【水素水】「飲むだけで10歳若返る♡」を信じた夫、水に月1万5千円｜冷蔵庫から夕飯が消えた…", publishAt: "2026-11-04T18:00:00+09:00", tools: ["water"] },
    { id: "WRJ99UY4_SY", title: "【急激なダイエット】2週間で5キロ痩せた女の末路｜2日後、体重計を見たら…", publishAt: "2026-11-08T18:00:00+09:00", tools: ["diet"] }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }

  function publishedVideos(toolId) {
    var now = Date.now();
    return VIDEOS.filter(function (v) {
      return Date.parse(v.publishAt) <= now && (!toolId || v.tools.indexOf(toolId) >= 0);
    });
  }

  function videoCard(v) {
    return '<a class="vcard" href="https://www.youtube.com/watch?v=' + v.id + '" target="_blank" rel="noopener">' +
      '<img src="https://i.ytimg.com/vi/' + v.id + '/mqdefault.jpg" alt="" loading="lazy" width="320" height="180">' +
      '<span>' + esc(v.title) + '</span></a>';
  }

  function ytButton(label) {
    return '<a class="yt-btn" href="' + CHANNEL_URL + '" target="_blank" rel="noopener">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z"/></svg>' +
      esc(label) + '</a>';
  }

  // 各ツールの「関係する動画」。動画がまだなければチャンネルへのボタン
  function renderVideos(el, toolId) {
    var list = publishedVideos(toolId);
    if (list.length) {
      el.innerHTML = '<h3 class="sec">関係する動画</h3><div class="vgrid">' + list.map(videoCard).join("") + '</div>';
    } else {
      el.innerHTML = '<h3 class="sec">関係する動画</h3><div class="vnone"><p>このチェックに関係する動画は、まもなく公開します。</p>' + ytButton("チャンネルを見る") + '</div>';
    }
  }

  function channelCard(rel) {
    return '<div class="channel"><div class="ch-head">' +
      '<img class="ch-icon" src="' + rel + 'img/yayoi-icon.jpg" alt="やよいのキレイ保健室のアイコン" width="60" height="60">' +
      '<div class="ch-name">やよいのキレイ保健室<small>健康と美容を、漫画で楽しく</small></div></div>' +
      ytButton("YouTubeで動画を見る") + '</div>';
  }

  function toolList() {
    return TOOLS.map(function (t) {
      if (t.ready) {
        return '<a class="tcard" href="' + t.id + '/"><b>' + esc(t.title) + '</b><small>' + esc(t.sub) + '</small><i>›</i></a>';
      }
      return '<div class="tcard soon"><b>' + esc(t.title) + '</b><small>' + esc(t.sub) + '</small><em>準備中</em></div>';
    }).join("");
  }

  window.YH = {
    TOOLS: TOOLS,
    renderVideos: renderVideos,
    channelCard: channelCard,
    toolList: toolList
  };
})();
