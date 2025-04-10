//會員登入視窗
function openLogin() {
    document.getElementById("loginModal").style.display = "block";
}   // 顯示登入視窗

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}   //隱藏登入視窗

// 配單網頁用JS
// 選擇商品後更新價格在小計
let totalPrice = 0;  // 總價格初始為 0
let totalItems = 0;  // 總商品數量初始為 0

// 更新價格的函式
function updatePrice(selectId, priceId) {
    const selectElement = document.getElementById(selectId);  // 取得選擇框
    const priceElement = document.getElementById(priceId);  // 取得顯示價格的元素
    const selectValue = selectElement.value;  // 取得選擇的價格值（即單價）

    const quantityElement = priceElement.parentElement.querySelector('.quantity');  // 取得數量選擇框
    const quantityValue = parseInt(quantityElement.value);  // 取得選擇的數量

    // 先獲取之前的價格（如果有選擇的話）
    const previousPrice = parseInt(priceElement.textContent.replace('$', '').replace(',', ''));
    const previousQuantity = previousPrice > 0 ? previousPrice / parseInt(selectElement.options[selectElement.selectedIndex].value) : 0;  // 計算之前的數量

    // 如果選擇了某個項目
    if (selectValue) {
        const itemPrice = parseInt(selectValue);  // 轉換選擇的價格為數字
        const totalItemPrice = itemPrice * quantityValue;  // 計算小計（單價 × 數量）
        priceElement.textContent = `$${totalItemPrice.toLocaleString()}`;  // 顯示格式化後的小計價格

        // 更新總價格，先減去舊價格，再加上新價格
        totalPrice = totalPrice - previousPrice + totalItemPrice;

        // 每當選擇商品，計算商品數量並更新 totalItems
        if (totalItemPrice > 0) {
            totalItems = totalItems - previousQuantity + quantityValue;  // 減去舊的數量，再加上新的數量
        }
    } else {
        priceElement.textContent = '$0';  // 如果選擇框是空的，顯示 $0

        // 如果選擇被清空，從總價格中減去對應的價格
        totalPrice = totalPrice - previousPrice;

        // 如果選擇框被清空，小計為 0，則不減少 totalItems
        if (previousPrice > 0) {
            totalItems = totalItems - previousQuantity;  // 小計之前有價格就減去商品數量
        }
    }

    // 更新商品數量
    updateTotalItemsDisplay();  

    // 更新顯示總價格與商品數量
    updateTotalPrice();  // 調用更新總價格的函式
    updateTotalItemsDisplay();  // 更新顯示的商品數量
}

// 更新顯示商品總數量的函式
function updateTotalItemsDisplay() {
    const totalItemsElement = document.getElementById('total_buy');  // 取得顯示商品數量的元素
    totalItemsElement.textContent = totalItems;  // 顯示總商品數量
}

// 更新總價格顯示的函式
function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total_price');  // 取得顯示總價格的元素
    totalPriceElement.textContent = `$${totalPrice.toLocaleString()}`;  // 顯示總價格，並加上千位逗號
}

// 重置所有選擇框與價格的函式
function resetSelections() {
    const selects = document.querySelectorAll('select');  // 取得所有的選擇框
    selects.forEach(select => select.value = '');  // 清空所有選擇框的值

    const priceElements = document.querySelectorAll('td[id^="price_"]');  // 取得所有顯示價格的元素
    priceElements.forEach(priceElement => priceElement.textContent = '$0');  // 清空所有價格顯示，設為 $0

    // 設置所有數量選擇框的值為 1
    const quantityElements = document.querySelectorAll('.quantity');  // 取得所有數量選擇框
    quantityElements.forEach(quantityElement => {
        quantityElement.value = '1';  // 將每個數量選擇框的值設為 1
    });

    // 手動觸發價格更新
    const priceIds = ['price_setpc', 'price_accessories', 'price_software'];  // 所有價格的 ID
    priceIds.forEach(priceId => {
        const selectId = priceId.replace('price_', '');  // 取得對應的 selectId
        updatePrice(selectId, priceId);  // 呼叫 updatePrice 函式更新價格
    });

    totalPrice = 0;  // 重置總價格為 0
    totalItems = 0;  // 重置總商品數量為 0
    updateTotalPrice();  // 更新總價格顯示
    updateTotalItemsDisplay();  // 更新商品數量顯示
}

// 頁面加載時確保數量為 1，並且總價清空
document.addEventListener("DOMContentLoaded", () => {
    // 初始化所有數量選擇框的值為 1
    const quantityElements = document.querySelectorAll('.quantity');
    quantityElements.forEach(quantityElement => {
        quantityElement.value = '1';
    });

    totalItems = 0;  // 重置商品數量為 0
    totalPrice = 0;  // 重置總價格為 0
    updateTotalItemsDisplay();  // 更新商品數量顯示
    updateTotalPrice();  // 更新總價格顯示
});