// 1. 食材資料庫：引入無限巢狀結構 (isFolder 與 parentId 的極致運用)
let foods = [
    // ===== 四間都有 =====
{ id: 1, name: "🥛 鮮乳", store: "all" },
    { id: 2, name: "🍜 統一麵", store: "all" },
    { id: 3, name: "🍮 統一布丁", store: "all" },
    
    // 🌟 修正 1：這裡補上了 isFolder: true，讓大腦知道這是一個要打開的資料夾
    { id: 4, name: "🍪 零食餅乾 ▾", store: "all", isFolder: true },        
    
    // 🌟 修正 2：把這些最終食材後面的 isFolder: true 和 ▾ 拿掉，這樣點擊才會加入購物車
      { id: 401, name: "樂事▾", store: "711", parentId: 4, isFolder: true },
    { id: 4011, name: "原味洋芋片", store: "all", parentId: 401 },
      { id: 402, name: "卡迪那▾", store: "711", parentId: 4, isFolder: true },
    { id: 4021, name: "原味洋芋片", store: "all", parentId: 402 },
       { id: 403, name: "波的多▾", store: "711", parentId: 4, isFolder: true },
    { id: 4031, name: "原味洋芋片", store: "all", parentId: 403 },
        { id: 404, name: "品客▾", store: "711", parentId: 4, isFolder: true },
    { id: 4041, name: "原味洋芋片", store: "all", parentId: 404 },
         { id: 405, name: "湖池屋▾", store: "711", parentId: 4, isFolder: true },
    { id: 4051, name: "原味洋芋片", store: "all", parentId: 405 },
  
    // ===== 7-11 =====
    { id: 5, name: "🍱 7-11 特色便當 ▾", store: "711", isFolder: true },
    { id: 501, name: "🌟 星級饗宴系列 ▾", store: "711", parentId: 5, isFolder: true },
    { id: 502, name: "💪 極饗大份量系列 ▾", store: "711", parentId: 5, isFolder: true },
    { id: 503, name: "🥗 健康輕食餐盒 ▾", store: "711", parentId: 5, isFolder: true },
    
    { id: 5011, name: "🍱 晶華-府城風味排骨飯", store: "711", parentId: 501 },
    { id: 5012, name: "🍱 頌丹露-香草烤雞腿飯", store: "711", parentId: 501 },
    { id: 5013, name: "🍓 草莓佐糖醋排骨便當 (隱藏版)", store: "711", parentId: 501 }, 
    
    { id: 5021, name: "🍱 奮起湖雙拼便當", store: "711", parentId: 502 },
    { id: 5022, name: "🍱 蒜香鐵板豬肉飯", store: "711", parentId: 502 },
    { id: 5031, name: "🥗 烤雞地瓜健康餐", store: "711", parentId: 503 },
    
    { id: 6, name: "🥤 思樂冰", store: "711" },
    { id: 7, name: "🍓 草莓牛奶", store: "711" },
   
    // ===== 全家 =====
    { id: 8, name: "🍦 霜淇淋", store: "family" },
    { id: 9, name: "🍠 夯番薯", store: "family" },
    { id: 10, name: "🥪 匠土司", store: "family" },
    
    // 全家便當資料夾結構
    { id: 80, name: "🍱 全家 夯便當 ▾", store: "family", isFolder: true },
    { id: 801, name: "🌟 金飯糰與手卷 ▾", store: "family", parentId: 80, isFolder: true },
    { id: 802, name: "🍝 義大利麵系列 ▾", store: "family", parentId: 80, isFolder: true },
    
    { id: 8011, name: "🍙 鮪魚明太子金飯糰", store: "family", parentId: 801 },
    { id: 8012, name: "🍙 泡菜燒肉手卷", store: "family", parentId: 801 },
    { id: 8021, name: "奶油起司蝦仁通心粉", store: "family", parentId: 802 },
    { id: 8022, name: "奶油蒜香雞", store: "family", parentId: 802 }, 
    
    // ===== 萊爾富 =====
    { id: 11, name: "🍗 轟炸雞腿", store: "hilife" },
    { id: 12, name: "🍢 關東煮", store: "hilife" },
    
    // 萊爾富便當資料夾結構
    { id: 110, name: "🍱 萊爾富 飽胃站 ▾", store: "hilife", isFolder: true },
    { id: 1101, name: "🌟 鐵板麵系列 ▾", store: "hilife", parentId: 110, isFolder: true },
    { id: 1102, name: "🍱 懷舊便當 ▾", store: "hilife", parentId: 110, isFolder: true },
    
    { id: 11011, name: "🍝 黑胡椒鐵板麵", store: "hilife", parentId: 1101 },
    { id: 11021, name: "🍱 懷舊滷排骨便當", store: "hilife", parentId: 1102 },
    { id: 11022, name: "🍓 草莓起司厚片便當 (隱藏版)", store: "hilife", parentId: 1102 }, 
    
    // ===== OK =====
    { id: 13, name: "🍗 哈燒熱點炸雞", store: "ok" },
    { id: 14, name: "🥚 窯烤茶葉蛋", store: "ok" },
    
    // OK 便當資料夾結構
    { id: 130, name: "🍱 OK 鮮食館 ▾", store: "ok", isFolder: true },
    { id: 1301, name: "🍛 異國咖哩 ▾", store: "ok", parentId: 130, isFolder: true },
    { id: 1302, name: "🥣 燴飯系列 ▾", store: "ok", parentId: 130, isFolder: true },
    
    { id: 13011, name: "🍛 日式蘋果豬肉咖哩", store: "ok", parentId: 1301 },
    { id: 13012, name: "🍓 草莓醬炸雞咖哩 (隱藏版)", store: "ok", parentId: 1301 }, 
    { id: 13021, name: "🥣 沙茶牛肉燴飯", store: "ok", parentId: 1302 }
];
let selectedMethod = "微波爐";
let currentStore = "all";
let selectedFoodIds = [];

const specialRecipes = {
    "微波爐_2,3": "⚠️ 警報！你把布丁和泡麵一起拿去微波了！湯頭融合成濃郁的甜鹹豚骨風，竟然意外地搭？！",
    "單純混合_7,5013": "🍓 草莓狂熱者降臨！草莓牛奶配上草莓糖醋排骨，這是一場粉紅色的味覺風暴！"
};

renderIngredients();
updateCart();

function setMethod(method, element) {
    selectedMethod = method;
    const buttons = document.querySelectorAll('#method-tabs .tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

function filterStore(storeKey, element) {
    currentStore = storeKey;
    const buttons = element.parentElement.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    renderIngredients();
}

function renderIngredients() {
    const grid = document.getElementById('ingredients-grid');
    grid.innerHTML = ''; 

    // 最外層畫面：只顯示沒有 parentId 的最上層食物或資料夾
    const displayFoods = foods.filter(food => food.store === currentStore && !food.parentId);

    displayFoods.forEach(food => {
        const btn = document.createElement('button');
        btn.className = 'item';
        
        if (food.isFolder) {
            btn.classList.add('folder-btn');
        } else if (selectedFoodIds.includes(food.id)) {
            btn.classList.add('selected');
        }
        
        btn.innerText = food.name;
        
        btn.onclick = () => {
            if (food.isFolder) {
                openModal(food.id, food.name);
            } else {
                toggleSelectFood(food.id, btn);
            }
        };
        grid.appendChild(btn);
    });
}

function toggleSelectFood(id, btn) {
    if (selectedFoodIds.includes(id)) {
        selectedFoodIds = selectedFoodIds.filter(i => i !== id);
        if(btn) btn.classList.remove('selected');
    } else {
        selectedFoodIds.push(id);
        if(btn) btn.classList.add('selected');
    }
    updateCart();
}

// 🌟 升級版：支援無限層級與自動返回鍵的彈出視窗
function openModal(folderId, folderName) {
    const currentFolder = foods.find(f => f.id === folderId);
    document.getElementById('modal-title').innerText = currentFolder.name.replace(' ▾', '');
    const modalGrid = document.getElementById('modal-grid');
    modalGrid.innerHTML = '';
    
    // 如果這個資料夾有「上層資料夾」，就動態生成一個返回鍵
    if (currentFolder.parentId) {
        const backBtn = document.createElement('button');
        backBtn.className = 'item folder-btn';
        backBtn.innerText = '⬅️ 返回上一層';
        backBtn.onclick = () => {
            const parentFolder = foods.find(f => f.id === currentFolder.parentId);
            openModal(parentFolder.id, parentFolder.name); // 呼叫自己，開啟上一層
        };
        modalGrid.appendChild(backBtn);
    }
    
    // 找出所有屬於這個資料夾的子選項
    const subItems = foods.filter(food => food.parentId === folderId);
    
    subItems.forEach(food => {
        const btn = document.createElement('button');
        btn.className = 'item';
        
        if (food.isFolder) {
            // 如果子選項還是資料夾，就給它資料夾外觀與開啟功能
            btn.classList.add('folder-btn');
            btn.innerText = food.name;
            btn.onclick = () => openModal(food.id, food.name);
        } else {
            // 如果是真正的食物，就給它選取功能
            if (selectedFoodIds.includes(food.id)) {
                btn.classList.add('selected');
            }
            btn.innerText = food.name;
            btn.onclick = () => toggleSelectFood(food.id, btn);
        }
        modalGrid.appendChild(btn);
    });
    
    document.getElementById('sub-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('sub-modal').style.display = 'none';
}

function updateCart() {
    const cart = document.getElementById('selected-cart');
    if (selectedFoodIds.length === 0) {
        cart.innerHTML = '<span style="color: #bdc3c7;">目前空空如也... 點擊上方食材加入！</span>';
        return;
    }
    
    cart.innerHTML = '';
    selectedFoodIds.forEach(id => {
        const food = foods.find(f => f.id === id);
        const tag = document.createElement('span');
        tag.className = 'cart-item';
        tag.innerText = food.name + ' ✖';
        
        tag.onclick = () => {
            selectedFoodIds = selectedFoodIds.filter(i => i !== id);
            updateCart();
            renderIngredients(); 
            
            // 同步更新彈出視窗內的選取狀態
            const modal = document.getElementById('sub-modal');
            if(modal.style.display === 'flex') {
                const folderId = foods.find(f => f.id === id).parentId;
                if(folderId) {
                    const folderName = foods.find(f => f.id === folderId).name;
                    openModal(folderId, folderName);
                }
            }
        };
        cart.appendChild(tag);
    });
}

function addNewFood() {
    const nameInput = document.getElementById('new-food-name');
    const storeSelect = document.getElementById('new-food-store');
    const name = nameInput.value.trim();
    const store = storeSelect.value;

    if (!name) {
        alert("請輸入食材名稱喔！");
        return;
    }

    const newId = Math.max(...foods.map(f => f.id)) + 1;

    foods.push({
        id: newId,
        name: name,
        store: store
    });

    nameInput.value = ''; 
    renderIngredients();  
}

function mixFoods() {
    if (selectedFoodIds.length === 0) {
        alert("你還沒挑選任何食材進去喔！");
        return;
    }

    selectedFoodIds.sort((a, b) => a - b);
    const foodKey = selectedFoodIds.join(',');
    const fullRecipeKey = `${selectedMethod}_${foodKey}`;

    const resultBox = document.getElementById('result-box');

    if (specialRecipes[fullRecipeKey]) {
        resultBox.innerHTML = specialRecipes[fullRecipeKey];
    } else {
        const foodNames = selectedFoodIds.map(id => {
            const f = foods.find(food => food.id === id);
            return f.name;
        });

        if (selectedMethod === "微波爐") {
            resultBox.innerHTML = `🔥 你把 <b>${foodNames.join('、')}</b> 全塞進微波爐，設定了強火微波 3 分鐘...<br><br>叮！傳出了奇怪的香味，看來完成了新型態的超商暗黑料理！`;
        } else {
            resultBox.innerHTML = `🥣 你拿了一個大碗，把 <b>${foodNames.join('、')}</b> 通通倒進去用力攪拌均勻...<br><br>這是一碗充滿實驗精神的混合物，吃下去需要極大的勇氣！`;
        }
    }
}
