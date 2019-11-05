// 串接API
var url = 'data/datastore_search.json';//'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';


var initialData = $.ajax({
    type: "GET",
    url: url,
    data: {},
    dataType: "json",
    async: false, // 取消非同步
    success: function (msg) {
        console.log('success')
    }
})
console.log(initialData);
// 全域變數
var data = initialData.responseJSON.result.records;
var noDataText = '查無資料'
var selectValue = document.querySelector('.selectDistrict');
var dataLen = data.length;
var contentBox = document.querySelector('.box');
console.log(data);

// 首次載入所有卡片
loadAll();

// 選單 value 變更時重新載入
selectValue.addEventListener('change', mainFunction)

function mainFunction(e) {
    let title = document.querySelector('.titleName');
    let titleContent = e.target.value;
    title.textContent = titleContent;
    if (titleContent === "高雄市景點") {
        loadAll()
    } else {
        loadRegion(titleContent)
    }
};

// 載入所有卡片內容
function loadAll() {
    contentBox.innerHTML = '';
    for (let i = 0; i < dataLen; i++) {
        // 卡片字串
        let id = data[i].Id
        let siteBox =
            '<div class="col-md-6 col-lg-4 mb-3">' +
            '<div class="card bg-light h-100">' +
            '<div class="card-body d-flex flex-column">' +
            '<img class="card-img-top" style="height: 12rem;" src="' + data[i].Picture1 + '" alt="">' +
            '<span class="card-title"><b>' + data[i].Name + '</b></span>' +
            '<span class="card-span"><i class="fas fa-map-marker-alt" style="width: 18px"></i><b>地址:</b>' + data[i].Add + '</span>' +
            '<span class="card-span"><i class="fas fa-phone-square-alt" style="width: 18px"></i><b>電話:</b>' + data[i].Tel + '</span>' +
            '<span class="card-span"><i class="far fa-clock" style="width: 18px"></i><b>時間:</b>' + data[i].Opentime + '</span>' +
            '</div>' +
            '<div class="card-body d-flex flex-column">' +
            '<button type="button" class="introBtn button button-info mt-auto btn btn-info" data-toggle="modal" data-target="#ModalCenter" onclick="showIntro(&#39;' + id + '&#39;)">景點介紹</button>' +
            '</div>' +
            '</div>' +
            '</div>';
        contentBox.innerHTML += siteBox;
    }
}
// 載入區域卡片內容
function loadRegion(region) {
    contentBox.innerHTML = '';
    data.filter(function (item, index, array) {
        if (item.Zone === region) {
            console.log(item.Name)
            let id = item.Id
            let siteBox =
                '<div class="col-md-6 col-lg-4 mb-3">' +
                '<div class="card bg-light h-100">' +
                '<div class="card-body d-flex flex-column">' +
                '<img class="card-img-top" style="height: 12rem;" src="' + item.Picture1 + '" alt="">' +
                '<span class="card-title"><b>' + item.Name + '</b></span>' +
                //'<span class="card-span"><b>' + item.Zone + '</b></span>' +
                '<span class="card-span"><i class="fas fa-map-marker-alt" style="width: 18px"><b>地址:</b>' + item.Add + '</span>' +

                '<span class="card-span"><i class="fas fa-phone-square-alt" style="width: 18px"></i><b>電話:</b>' + item.Tel + '</span>' +
                '<span class="card-span"><i class="far fa-clock" style="width: 18px"></i><b>時間:</b>' + item.Opentime + '</span>' +
                '</div>' +
                '<div class="card-body d-flex flex-column">' +
                '<button type="button" class="introBtn button button-info mt-auto btn btn-info" data-toggle="modal" data-target="#ModalCenter" onclick="showIntro(&#39;' + id + '&#39;)">景點介紹</button>' +
                '</div>' +
                '</div>' +
                '</div>';
            contentBox.innerHTML += siteBox;
        }
    });
}

// 載入 modal 內容
function showIntro(id) {
    console.log(id)
    document.querySelector('.modal-body').innerHTML = '';
    for (let i = 0; i < dataLen; i++) {
        if (id === data[i].Id) {
            console.log(id)
            let modal = '<p class="card-span">' + data[i].Toldescribe + '</p>';
            document.querySelector('.modal-body').innerHTML += modal;
        }
    }
}
