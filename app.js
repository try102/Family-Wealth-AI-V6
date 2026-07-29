/*

Family Wealth AI OS

V6.2 Stable Liability Compatible Build

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

    updateDashboard();

    updateAssetDisplay();

    updateIncomeDisplay();

    updateInvestmentDisplay();

    updateLiabilityDisplay();

}

// ======================

// 页面启动

// ======================

if(

document.readyState==="loading"

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

                el.innerHTML=

                data[id];

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

    let box=

    document.getElementById(

        "assetList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    assetsAgent.view()

    .forEach(item=>{

        let div=

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

function editAsset(id){

    let item=

    assetsAgent.view()

    .find(

        x=>x.id===id

    );

    if(!item){

        return;

    }

    let value=

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

    let box=

    document.getElementById(

        "incomeList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    incomeAgent.view()

    .forEach(item=>{

        let div=

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

    let item=

    incomeAgent.view()

    .find(

        x=>x.id===id

    );

    if(!item){

        return;

    }

    let amount=

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

        .toLocaleString("zh-CN")}

        <br>

        买入数量：

        ${item.buyQuantity || 0}

        <br><br>

        卖出日期：

        ${item.sellDate || ""}

        <br>

        卖出价格：

        ¥${Number(

            item.sellPrice || 0

        )

        .toLocaleString("zh-CN")}

        <br>

        卖出数量：

        ${item.sellQuantity || 0}

        <br><br>

        剩余数量：

        ${item.remainingQuantity || 0}

        <br>

        当前市值：

        ¥${Number(

            item.marketValue || 0

        )

        .toLocaleString("zh-CN")}

        <br>

        已实现收益：

        ¥${Number(

            item.realizedProfit || 0

        )

        .toLocaleString("zh-CN")}

        <br>

        未实现收益：

        ¥${Number(

            item.unrealizedProfit || 0

        )

        .toLocaleString("zh-CN")}

        <br>

        总收益：

        ¥${Number(

            item.totalProfit || 0

        )

        .toLocaleString("zh-CN")}

        <br>

        收益率：

        ${item.returnRate || 0}%

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
// ======================

// 负债中心

// ======================

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

        let annualInterest =

        Number(item.principal || 0)

        *

        Number(item.interest || 0)

        /

        100;

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

        本金：

        ¥${Number(

            item.principal || 0

        )

        .toLocaleString("zh-CN")}

        <br>

        利率：

        ${Number(

            item.interest || 0

        )}%

        <br>

        年度利息：

        ¥${Number(

            annualInterest

        )

        .toLocaleString("zh-CN")}

        <br><br>

        <button onclick="editLiability(${item.id})">

        编辑

        </button>

        <button onclick="deleteLiability(${item.id})">

        删除

        </button>

        `;

        box.appendChild(div);

    });

}

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

    liabilityAgent.add(

        liability

    );

    refreshAll();

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
    alert("CFO开始运行");

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

    .toLocaleString("zh-CN")}

    <br>

    总负债：

    ¥${Number(

        report.totalLiability || 0

    )

    .toLocaleString("zh-CN")}

    <br>

    净资产：

    ¥${Number(

        report.netWorth || 0

    )

    .toLocaleString("zh-CN")}

    <br>

    年度收入：

    ¥${Number(

        report.totalIncome || 0

    )

    .toLocaleString("zh-CN")}

    <br>

    投资收益：

    ¥${Number(

        report.investmentProfit || 0

    )

    .toLocaleString("zh-CN")}

    <br>

    财富评分：

    ${report.wealthScore || 0}

    <br><br>

    AI建议

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

    let box=

    document.getElementById(

        "taxCenter"

    );

    if(box){

        box.innerHTML=

        "税务中心 V6.2 接入";

    }

}

// ======================

// 退休中心

// ======================

function generateRetirementReport(){

    let box=

    document.getElementById(

        "retirementCenter"

    );

    if(box){

        box.innerHTML=

        "退休规划中心 V6.2 接入";

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
