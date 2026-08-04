/*

Family Wealth AI OS

V6.4.2 Stable Recovery Build

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

    assetsAgent.init();

    incomeAgent.init();

    investmentAgent.init();

    liabilityAgent.init();

    if(taxAgent.init){

        taxAgent.init();

    }

    if(retirementAgent.init){

        retirementAgent.init();

    }

    if(cfoAgent.init){

        cfoAgent.init();

    }

    refreshAll();

}

// ======================

// 工具函数

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

    updateDashboard();

    updateAllocationDisplay();

    updateAssetDisplay();

    updateIncomeDisplay();

    updateInvestmentDisplay();

    updateLiabilityDisplay();

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

        investmentAgent,

        incomeAgent,

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

                el.innerHTML=data[id];

            }

            else{

                el.innerHTML=

                "¥"+

                Number(data[id])

                .toLocaleString(

                    "zh-CN"

                );

            }

        }

    });

}

// ======================

// 资产配置分析

// V6.4.2 修复

// ======================

function updateAllocationDisplay(){

    let box =

    document.getElementById(

        "allocationAnalysis"

    );

    if(!box){

        return;

    }

    let analysis =

    wealthEngine.allocationAnalysis(

        assetsAgent,

        investmentAgent

    );

    if(

        !analysis

        ||

        !analysis.ratio

    ){

        box.innerHTML=

        "暂无资产配置数据";

        return;

    }

    let html="";

    Object.keys(analysis.ratio)

    .forEach(key=>{

        html +=

        `

        ${key}：

        ${analysis.ratio[key]}%

        <br>

        `;

    });

    if(

        analysis.risk

        &&

        analysis.risk.length

    ){

        html +=

        "<br>风险提示：<br>";

        analysis.risk

        .forEach(item=>{

            html +=

            "• "+item+"<br>";

        });

    }

    box.innerHTML=html;

}

// ======================

// 资产中心

// ======================

function addNewAsset(){

    let asset={

        name:getValue("assetName"),

        category:getValue("assetCategory"),

        type:getValue("assetType"),

        owner:getValue("assetOwner"),

        country:getValue("assetCountry"),

        currency:getValue("assetCurrency"),

        institution:getValue("assetInstitution"),

        account:getValue("assetAccount"),

        value:Number(

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

        box.innerHTML +=

        `

        <div class="item">

        <h3>${item.name}</h3>

        类别：

        ${item.category || "其他"}

        <br>

        价值：

        ¥${Number(

            item.value||0

        ).toLocaleString("zh-CN")}

        <br><br>

        <button onclick="editAsset(${item.id})">

        编辑

        </button>

        <button onclick="deleteAsset(${item.id})">

        删除

        </button>

        </div>

        `;

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

                value:Number(value)

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

        box.innerHTML +=

        `

        <div class="item">

        <h3>

        ${item.name}

        </h3>

        类别：

        ${item.category || "其他"}

        <br>

        金额：

        ¥${Number(

            item.amount||0

        ).toLocaleString("zh-CN")}

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

        </div>

        `;

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

                amount:Number(amount)

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

        type:

        getValue("investmentType"),

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

        )

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

        box.innerHTML +=

        `

        <div class="item">

        <h3>

        ${item.name}

        </h3>

        代码：

        ${item.ticker || ""}

        <br>

        买入价格：

        ¥${Number(

            item.buyPrice||0

        ).toLocaleString("zh-CN")}

        <br>

        数量：

        ${item.buyQuantity || 0}

        <br>

        当前价格：

        ¥${Number(

            item.currentPrice||0

        ).toLocaleString("zh-CN")}

        <br>

        当前市值：

        ¥${Number(

            item.marketValue||0

        ).toLocaleString("zh-CN")}

        <br>

        收益：

        ¥${Number(

            item.totalProfit||0

        ).toLocaleString("zh-CN")}

        <br><br>

        <button onclick="editInvestment(${item.id})">

        编辑

        </button>

        <button onclick="deleteInvestment(${item.id})">

        删除

        </button>

        </div>

        `;

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

    if(confirm("删除投资？")){

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

        ),

        period:

        getValue("liabilityPeriod"),

        owner:

        getValue("liabilityOwner"),

        currency:

        getValue("liabilityCurrency")

    };

    if(!liability.name){

        alert(

            "请输入负债名称"

        );

        return;

    }

    liabilityAgent.add(

        liability

    );

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

    liabilityAgent.view()

    .forEach(item=>{

        box.innerHTML +=

        `

        <div class="item">

        <h3>

        ${item.name}

        </h3>

        本金：

        ¥${Number(

            item.principal||0

        ).toLocaleString("zh-CN")}

        <br>

        利率：

        ${item.interest || 0}%

        <br>

        周期：

        ${item.period || ""}

        <br><br>

        <button onclick="editLiability(${item.id})">

        编辑

        </button>

        <button onclick="deleteLiability(${item.id})">

        删除

        </button>

        </div>

        `;

    });

}

function editLiability(id){

    let item =

    liabilityAgent.view()

    .find(

        x=>x.id===id

    );

    if(!item){

        return;

    }

    let amount =

    prompt(

        "修改负债本金",

        item.principal

    );

    if(amount!==null){

        liabilityAgent.edit(

            id,

            {

                principal:

                Number(amount)

            }

        );

        refreshAll();

    }

}

function deleteLiability(id){

    if(confirm("删除负债？")){

        liabilityAgent.delete(id);

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

        investmentAgent,

        incomeAgent,

        liabilityAgent

    );

    let box =

    document.getElementById(

        "cfoReport"

    );

    if(!box){

        return;

    }

    box.innerHTML =

    `

    <h3>

    AI CFO 财富分析报告

    </h3>

    总资产：

    ¥${Number(

        report.totalAssets||0

    ).toLocaleString("zh-CN")}

    <br>

    总负债：

    ¥${Number(

        report.totalLiability||0

    ).toLocaleString("zh-CN")}

    <br>

    净资产：

    ¥${Number(

        report.netWorth||0

    ).toLocaleString("zh-CN")}

    <br>

    财富评分：

    ${report.wealthScore || 0}

    <br><br>

    AI建议：

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

        "<li>暂无建议</li>"

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

        box.innerHTML =

        "税务中心 V6.4 已接入";

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

        box.innerHTML =

        "退休规划中心 V6.4 已接入";

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

window.editLiability =

editLiability;

window.deleteLiability =

deleteLiability;

window.generateCFOReport =

generateCFOReport;

window.generateTaxReport =

generateTaxReport;

window.generateRetirementReport =

generateRetirementReport;
