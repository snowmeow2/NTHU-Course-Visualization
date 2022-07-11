# NTHU 個人修課紀錄
由於強迫症和一些無謂的因素，我寫了這個 Chrome 擴充元件來視覺化校務系統裡那串沉悶（而且還會無止盡延長）的修課紀錄列表。現在所有重要的資訊都在一個簡潔而活潑的畫面裡了。

還可以向大家分享你修過哪些名稱響亮的課！

## 安裝
在 Chrome 應用程式商店中[下載](https://chrome.google.com/webstore/detail/nthu-%E5%80%8B%E4%BA%BA%E4%BF%AE%E8%AA%B2%E7%B4%80%E9%8C%84/cnembmeggfhckmbifgbppjihoadhambj)。

或直接從這裡下載未封裝的內容（需要自己載入）。

## 說明
使用前需先登入校務系統取得課程資料，打開 **成績查詢**，然後再開啟擴充元件。所有的計算和資料儲存皆在本機進行，保護隱私。如果有人會偷看你的電腦，你也可以選擇 **刪除資料**。

你修過（以及正在修）的所有課程會以各色方塊表示－
- 不同顏色表示不同系所
- 顏色深淺代表成績高低（越深越高）
- 方塊大小顯示學分多寡

體育課、服務學習與操行不列入計算。

你可以點擊不同學期／年來顯示個別學期／年的修課歷史。長條圖會顯示目前樹狀圖中的各系所比例與平均成績。點擊按鈕可以切換顯示資訊。

## 計畫
受到拖延症的影響，這邊應該只是列好看的
- 歷年成績／排名折線圖
- 修課系所比例折線圖
- 顯示課程清單
- 增加說明與工具提示
- 對應英文
- 能直接匯出截圖的功能
- GPA 換算小工具

## 已知問題
我是 Javascript 新手。歡迎PR。
- 視窗縮放可能讓樹狀圖跟長條圖的位置跑掉
- 視窗縮放後，長條圖的滑動範圍不會跟著縮放
- 可能有無法對應到的成績
- 尚未確認 **抵免** 與 **跨校選修** 類課程能否正確顯示
