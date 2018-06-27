Page({
  data: {
    evaluate_contant: ['评价一', '评价二', '评价三',],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/images/empty.png',
    selectedSrc: '/images/full.png',
    halfSrc: '/images/half.png',
    score: 0,
    scores: [0, 0, 0],
  },
  onLoad:function(){
    wx.vibrateLong()
  },
  // 提交事件
  submit_evaluate: function () {
    console.log('评价得分' + this.data.scores)
    wx.redirectTo({
      url: '../systemevaluation/systemevaluation',
    })
  },

  //点击左边,半颗星
  selectLeft: function (e) {
    var score = e.currentTarget.dataset.score
    if (this.data.score == 0.5 && e.currentTarget.dataset.score == 0.5) {
      score = 0;
    }

    this.data.scores[e.currentTarget.dataset.idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score
      })

  },

  //点击右边,整颗星
  selectRight: function (e) {
    var score = e.currentTarget.dataset.score

    this.data.scores[e.currentTarget.dataset.idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score
      })
  },

})