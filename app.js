/*

Family Wealth AI OS

V6.0.6 Stable Integration Build

Main Application

*/

import assetsAgent from "./agents/assetsAgent.js";

import incomeAgent from "./agents/incomeAgent.js";

import investmentAgent from "./agents/investmentAgent.js";

import liabilityAgent from "./agents/liabilityAgent.js";

import wealthEngine from "./agents/wealthEngine.js";

import cfoAgent from "./agents/cfoAgent.js";

import taxAgent from "./agents/taxAgent.js";

import retirementAgent from "./agents/retirementAgent.js";

// ======================

// 系统启动

// ======================

function startSystem(){

    try{

        assetsAgent.init();

    }catch(e){

        console.log(e);

    }

    try{

        incomeAgent.init();

    }catch(e){

        console.log(e);

    }

    try{

        investmentAgent.init();

    }catch(e){

        console.log(e);

    }

    try{

        if(liabilityAgent.init){

            liabilityAgent.init();

        }

    }catch(e){

        console.log(e);

    }

    try{

        if(taxAgent.init){

            taxAgent.init();

        }

    }catch(e){

        console.log(e);

    }

    try{

        if(retirementAgent.init){

            retirementAgent.init();

        }

    }catch(e){

        console.log(e);

    }

    try{

        if(cfoAgent.init){

            cfoAgent.init();

        }

    }catch(e){

        console.log(e);

    }

    refreshAll();

}

// ======================

// 工具

// ======================

function getValue(id){

    let el =

    document.getElementById(id);

    if(!el){

        return "";

    }

    return el.value.trim();

}

// ======================

// 总刷新

// ======================

function refreshAll(){

    try{

        updateDashboard();

    }catch(e){

        console.log(

            "dashboard error",

            e

        );

    }

    try{

        updateAssetDisplay();

    }catch(e){

        console.log(

            "asset error",

            e

        );

    }

    try{

        updateIncomeDisplay();

    }catch(e){

        console.log(

            "income error",

            e

        );

    }

    try{

        updateInvestmentDisplay();

    }catch(e){

        console.log(

            "investment error",

            e

        );

    }

    try{

        updateLiabilityDisplay();

    }catch(e){

        console.log(

            "liability error",

            e

        );

    }

}

// ======================

// 页面启动

// ======================

if(

    document.readyState === "loading"

){

    document.addEventListener(

        "DOMContentLoaded",

        startSystem

    );

}

else{

    startSystem();

}

// ======================

// 财富驾驶舱

// ======================

function updateDashboard(){

    let wealth =

    wealthEngine.summary(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    );

    let report =

    cfoAgent.report(

        assetsAgent,

        incomeAgent,

        investmentAgent,

        liabilityAgent

    );

    let data={

        totalAssets:

        wealth.totalAssets || 0,

        netWorth:

        wealth.netWorth || 0,

        totalLiability:

        wealth.totalLiability || 0,

        totalIncome:

        wealth.totalIncome || 0,

        investmentReturn:

        wealth.investmentProfit || 0,

        wealthScore:

        report.wealthScore || 0

    };

    Object.keys(data)

    .forEach(id=>{

        let el =

        document.getElementById(id);

        if(el){

            if(id==="wealthScore"){

                el.innerHTML =

                data[id];

            }

            else{

                el.innerHTML =

                "¥" +

                Number(data[id])

                .toLocaleString();

            }

        }

    });

}

// ======================

// 资产中心

// ======================

function addNewAsset(){

    let asset={

        name:

        getValue("assetName"),

        category:

        getValue("assetCategory"),

        value:

        Number(

            getValue("assetValue")

        )

    };

    if(!asset.name){

        alert(

            "请输入资产名称"

        );

        return;

    }

    assetsAgent.add(asset);

    refreshAll();

}

function updateAssetDisplay(){

    let box =

    document.getElementById(

        "assetList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    assetsAgent.view()

    .forEach(item=>{

        let div =

        document.createElement(

            "div"

        );

        div.innerHTML = `

        <hr>

        <h3>

        ${item.name}

        </h3>

        类别：

        ${item.category || "其他"}

        <br>

        价值：

        ¥${Number(

            item.value || 0

        )

        .toLocaleString()}

        <br><br>

        <button onclick="editAsset(${item.id})">

        编辑

        </button>

        <button onclick="deleteAsset(${item.id})">

        删除

        </button>

        `;

        box.appendChild(div);

    });

}
// ======================

// 资产编辑删除

// ======================

function editAsset(id){

    let item =

    assetsAgent.view()

    .find(

        x=>x.id===id

    );

    if(!item){

        return;

    }

    let value =

    prompt(

        "修改资产价值",

        item.value

    );

    if(value!==null){

        assetsAgent.edit(

            id,

            {

                value:

                Number(value)

            }

        );

        refreshAll();

    }

}

function deleteAsset(id){

    if(confirm("删除资产？")){

        assetsAgent.delete(id);

        refreshAll();

    }

}

// ======================

// 收入中心

// ======================

function addIncome(){

    let income={

        name:

        getValue("incomeName"),

        category:

        getValue("incomeCategory"),

        source:

        getValue("incomeSource"),

        amount:

        Number(

            getValue("incomeAmount")

        )

    };

    if(!income.name){

        alert(

            "请输入收入名称"

        );

        return;

    }

    incomeAgent.add(income);

    refreshAll();

}

function updateIncomeDisplay(){

    let box =

    document.getElementById(

        "incomeList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    incomeAgent.view()

    .forEach(item=>{

        let div =

        document.createElement(

            "div"

        );

        div.innerHTML = `

        <hr>

        <h3>

        ${item.name}

        </h3>

        类别：

        ${item.category || "其他"}

        <br>

        金额：

        ¥${Number(

            item.amount || 0

        )

        .toLocaleString()}

        <br>

        来源：

        ${item.source || ""}

        <br><br>

        <button onclick="editIncome(${item.id})">

        编辑

        </button>

        <button onclick="deleteIncome(${item.id})">

        删除

        </button>

        `;

        box.appendChild(div);

    });

}

function editIncome(id){

    let item =

    incomeAgent.view()

    .find(

        x=>x.id===id

    );

    if(!item){

        return;

    }

    let amount =

    prompt(

        "修改收入金额",

        item.amount

    );

    if(amount!==null){

        incomeAgent.edit(

            id,

            {

                amount:

                Number(amount)

            }

        );

        refreshAll();

    }

}

function deleteIncome(id){

    if(confirm("删除收入？")){

        incomeAgent.delete(id);

        refreshAll();

    }

}

// ======================

// 投资中心

// ======================

function addInvestment(){

    let investment={

        name:

        getValue("investmentName"),

        ticker:

        getValue("investmentTicker"),

        buyDate:

        getValue("investmentBuyDate"),

        buyPrice:

        Number(

            getValue("investmentBuyPrice")

        ),

        buyQuantity:

        Number(

            getValue("investmentBuyQuantity")

        ),

        sellDate:

        getValue("investmentSellDate"),

        sellPrice:

        Number(

            getValue("investmentSellPrice")

        ),

        sellQuantity:

        Number(

            getValue("investmentSellQuantity")

        ),

        currentPrice:

        Number(

            getValue("investmentCurrentPrice")

        ),

        note:

        getValue("investmentNote")

    };

    if(!investment.name){

        alert(

            "请输入投资名称"

        );

        return;

    }

    investmentAgent.add(

        investment

    );

    refreshAll();

}

function updateInvestmentDisplay(){

    let box =

    document.getElementById(

        "investmentList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    investmentAgent.inventory()

    .forEach(item=>{

        let div =

        document.createElement(

            "div"

        );

        div.innerHTML = `

        <hr>

        <h3>

        ${item.name}

        </h3>

        代码：

        ${item.ticker || ""}

        <br>

        买入日期：

        ${item.buyDate || ""}

        <br>

        买入价格：

        ¥${Number(

            item.buyPrice || 0

        )

        .toLocaleString()}

        <br>

        买入数量：

        ${item.buyQuantity || 0}

        <br>

        卖出日期：

        ${item.sellDate || ""}

        <br>

        卖出价格：

        ¥${Number(

            item.sellPrice || 0

        )

        .toLocaleString()}

        <br>

        卖出数量：

        ${item.sellQuantity || 0}

        <br>

        剩余数量：

        ${item.remainingQuantity || 0}

        <br>

        当前市值：

        ¥${Number(

            item.marketValue || 0

        )

        .toLocaleString()}

        <br>

        已实现收益：

        ¥${Number(

            item.realizedProfit || 0

        )

        .toLocaleString()}

        <br>

        未实现收益：

        ¥${Number(

            item.unrealizedProfit || 0

        )

        .toLocaleString()}

        <br>

        总收益：

        ¥${Number(

            item.totalProfit || 0

        )

        .toLocaleString()}

        <br><br>

        <button onclick="editInvestment(${item.id})">

        编辑

        </button>

        <button onclick="deleteInvestment(${item.id})">

        删除

        </button>

        `;

        box.appendChild(div);

    });

}

function editInvestment(id){

    let item =

    investmentAgent.view()

    .find(

        x=>x.id===id

    );

    if(!item){

        return;

    }

    let price =

    prompt(

        "修改当前价格",

        item.currentPrice

    );

    if(price!==null){

        investmentAgent.edit(

            id,

            {

                currentPrice:

                Number(price)

            }

        );

        refreshAll();

    }

}

function deleteInvestment(id){

    if(confirm("删除投资记录？")){

        investmentAgent.delete(id);

        refreshAll();

    }

}
// ======================

// 负债中心

// ======================

function addNewLiability(){

    let liability={

        name:

        getValue("liabilityName"),

        category:

        getValue("liabilityCategory"),

        principal:

        Number(

            getValue("liabilityPrincipal")

        ),

        interest:

        Number(

            getValue("liabilityInterest")

        )

    };

    if(!liability.name){

        alert(

            "请输入负债名称"

        );

        return;

    }

    if(liabilityAgent.add){

        liabilityAgent.add(

            liability

        );

    }

    refreshAll();

}

function updateLiabilityDisplay(){

    let box =

    document.getElementById(

        "liabilityList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    if(!liabilityAgent.view){

        return;

    }

    liabilityAgent.view()

    .forEach(item=>{

        let div =

        document.createElement(

            "div"

        );

        div.innerHTML=`

        <hr>

        <h3>

        ${item.name}

        </h3>

        类别：

        ${item.category || "其他"}

        <br>

        金额：

        ¥${Number(

            item.principal ||

            item.amount ||

            0

        )

        .toLocaleString()}

        <br><br>

        <button onclick="deleteLiability(${item.id})">

        删除

        </button>

        `;

        box.appendChild(div);

    });

}

function deleteLiability(id){

    if(confirm("删除负债？")){

        if(liabilityAgent.delete){

            liabilityAgent.delete(id);

        }

        refreshAll();

    }

}

// ======================

// AI CFO

// ======================

function generateCFOReport(){

    let report =

    cfoAgent.report(

        assetsAgent,

        incomeAgent,

        investmentAgent,

        liabilityAgent

    );

    let box =

    document.getElementById(

        "cfoReport"

    );

    if(!box){

        return;

    }

    box.innerHTML = `

    <hr>

    <h3>

    AI CFO 财富分析报告

    </h3>

    总资产：

    ¥${Number(

        report.totalAssets || 0

    )

    .toLocaleString()}

    <br>

    总负债：

    ¥${Number(

        report.totalLiability || 0

    )

    .toLocaleString()}

    <br>

    净资产：

    ¥${Number(

        report.netWorth || 0

    )

    .toLocaleString()}

    <br>

    年度收入：

    ¥${Number(

        report.totalIncome || 0

    )

    .toLocaleString()}

    <br>

    投资收益：

    ¥${Number(

        report.investmentProfit || 0

    )

    .toLocaleString()}

    <br>

    财富评分：

    ${report.wealthScore || 0}

    <br><br>

    <h4>

    AI建议

    </h4>

    <ul>

    ${

        report.advice

        ?

        report.advice

        .map(

            x=>

            `<li>${x}</li>`

        )

        .join("")

        :

        "<li>持续优化资产配置</li>"

    }

    </ul>

    `;

}

// ======================

// 税务中心

// ======================

function generateTaxReport(){

    let box =

    document.getElementById(

        "taxCenter"

    );

    if(box){

        box.innerHTML=

        "税务中心 V6.1 接入";

    }

}

// ======================

// 退休中心

// ======================

function generateRetirementReport(){

    let box =

    document.getElementById(

        "retirementCenter"

    );

    if(box){

        box.innerHTML=

        "退休规划中心 V6.1 接入";

    }

}

// ======================

// 暴露给 HTML

// ======================

window.addNewAsset =

addNewAsset;

window.editAsset =

editAsset;

window.deleteAsset =

deleteAsset;

window.addIncome =

addIncome;

window.editIncome =

editIncome;

window.deleteIncome =

deleteIncome;

window.addInvestment =

addInvestment;

window.editInvestment =

editInvestment;

window.deleteInvestment =

deleteInvestment;

window.addNewLiability =

addNewLiability;

window.deleteLiability =

deleteLiability;

window.generateCFOReport =

generateCFOReport;

window.generateTaxReport =

generateTaxReport;

window.generateRetirementReport =

generateRetirementReport;
